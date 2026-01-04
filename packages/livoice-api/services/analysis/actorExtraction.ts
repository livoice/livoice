import { ActorTypeType, type Prisma } from '@prisma/client';
import { ACTOR_TYPES } from '../../domains/actors/constants';
import type { ActorExtractionResult, ActorType, ExtractedRelationship } from '../../lib/analysis/types';
import { SEED_LINK_TYPES } from '../../lib/analysis/types';
import { chatCompletion, openAiModel } from '../../lib/openai';
import { getPrismaSudo } from '../../lib/prisma';
import type { SegmentWithSpeaker } from '../../lib/toTranscriptSegments';

type PromptParams = {
  transcriptText: string;
  title: string;
  channelName: string;
  description: string;
  speakers: string[];
  existingLinkTypes: string[];
};

const VALID_ACTOR_TYPES = Object.values(ActorTypeType) as ActorType[];

const normalizeActorType = (type?: string | null): ActorTypeType => {
  const normalized = type?.toLowerCase() ?? '';
  const resolved = normalized as ActorType;
  return (VALID_ACTOR_TYPES.includes(resolved) ? resolved : 'other') as ActorTypeType;
};

const buildActorExtractionPrompt = ({
  transcriptText,
  title,
  channelName,
  description,
  speakers,
  existingLinkTypes
}: PromptParams) => `You are extracting actors and relationships from a transcript.

CHANNEL METADATA:
- Name: ${channelName}

VIDEO METADATA:
- Title: ${title}
- Description: ${description}
- Identified Speakers: ${speakers.join(', ')}

TRANSCRIPT TEXT:
${transcriptText}

TASK:
1. Extract all actors mentioned in the transcript:
${ACTOR_TYPES.map(({ value, description }) => `   - ${value}: ${description}`).join('\n')}

2. Extract relationships between actors.
   PREFERRED LINK TYPES (use these if applicable):
   ${existingLinkTypes.join(', ')}
   
   If none fit, create a new snake_case type (e.g., "co_author", "distributor").

IMPORTANT:
- Take into account the channel name and description to determine the actos, their type and relationships.
- Include all speakers as person actors
- Use full names when determinable from context with good confidence (e.g., "John Doe" not just "John")
- Add spelling variations of actors to aliases if mispelled in the transcript (e.g., Steven/Stephen, John/Jon, Michael/Mike, etc.)
- Auto-generated transcripts often misspell names - capture common variants from the transcript and add to aliases
- Deduplicate actors (merge aliases)
- DO NOT create actors with names like "unknown", "unknown speaker", "unidentified", or any variation. Skip any actor where you cannot determine their identity.
- Only extract actors whose names can be confidently determined from context.
- Confidence: 0.0-1.0 based on certainty
- Always use English for the actor name. You can add original language to "aliases".

OUTPUT:
{
  "actors": [
    { "name": "John Doe", "type": "person", "description": "Host, entrepreneur", "aliases": ["John", "Jon", "Jon Doe"] },
    { "name": "Jim Lesinski", "type": "person", "description": "Professor at Northwestern", "aliases": ["Jim", "James Lesinski"] }
  ],
  "relationships": [
    { "fromActorName": "Jim Lesinski", "toActorName": "Google", "linkType": "former_employment", "role": "VP", "confidence": 0.95 }
  ]
}
`;

export const extractActors = async (
  segments: SegmentWithSpeaker[],
  metadata: { title: string; channelName: string; description: string }
): Promise<ActorExtractionResult> => {
  const prisma = await getPrismaSudo();

  const existingLinks = await prisma.actorLink.findMany({
    select: { linkType: true },
    distinct: ['linkType']
  });

  const existingLinkTypes = [...new Set([...SEED_LINK_TYPES, ...existingLinks.map(link => link.linkType)])];

  const transcriptText = segments
    .filter(segment => !segment.isMetadata)
    .map(segment => `[${segment.speaker}]: ${segment.text}`)
    .join('\n');

  const speakers = [...new Set(segments.map(segment => segment.speaker).filter(Boolean))];

  const prompt = buildActorExtractionPrompt({
    transcriptText,
    title: metadata.title,
    channelName: metadata.channelName,
    description: metadata.description,
    speakers,
    existingLinkTypes
  });

  const completion = await chatCompletion({
    model: openAiModel,
    temperature: 0.1,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'Return strict JSON only. Extract all actors and relationships.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 4096
  });

  const content = completion.choices?.[0]?.message?.content;
  if (!content) throw new Error('OpenAI returned empty content for actor extraction');

  try {
    return JSON.parse(content) as ActorExtractionResult;
  } catch (error) {
    console.error('[actorExtraction] Failed to parse JSON response:', content.slice(0, 500));
    throw new Error(
      `[actorExtraction] Failed to parse response: ${error instanceof Error ? error.message : 'unknown error'}`
    );
  }
};

const dedupeRelationships = (relationships: ExtractedRelationship[]) => {
  const seen = new Set<string>();
  return relationships.filter(({ fromActorName, toActorName, linkType, role }) => {
    const key = `${fromActorName.toLowerCase()}|${toActorName.toLowerCase()}|${(linkType ?? '').toLowerCase()}|${role ?? ''}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const normalizeName = (name: string) => name.trim().toLowerCase();

const addNameMappings = (map: Map<string, string>, id: string, names: string[]) => {
  names.forEach(name => map.set(normalizeName(name), id));
};

export const storeActors = async (result: ActorExtractionResult): Promise<Map<string, string>> => {
  const prisma = await getPrismaSudo();
  const actorNameToId = new Map<string, string>();

  await Promise.all(
    result.actors.map(async actor => {
      const primaryName = actor.name.trim();
      const normalizedPrimary = normalizeName(primaryName);
      const rawAliases = actor.aliases ?? [];
      const normalizedAliases = [...new Set(rawAliases.map(alias => normalizeName(alias)).filter(Boolean))];
      const searchAliases = [...new Set([...rawAliases, ...normalizedAliases].filter(Boolean))];
      const actorType = normalizeActorType(actor.type);
      const normalizedInputType = actor.type?.toLowerCase() ?? '';
      if (actorType === ('other' as ActorTypeType) && normalizedInputType !== 'other') {
        console.warn(`[actorExtraction] defaulting actor type to other`, { name: primaryName, type: actor.type });
      }

      // Reuse already mapped actor in this batch by normalized name/aliases
      const existingMappedId =
        actorNameToId.get(normalizedPrimary) ||
        searchAliases.map(alias => actorNameToId.get(normalizeName(alias))).find(Boolean);

      if (existingMappedId) {
        addNameMappings(actorNameToId, existingMappedId, [primaryName, ...searchAliases]);
        return;
      }

      const existing = await prisma.actor.findFirst({
        where: {
          type: actorType,
          name: { equals: primaryName, mode: 'insensitive' }
        }
      });

      if (existing) {
        addNameMappings(actorNameToId, existing.id, [primaryName, ...searchAliases]);
        return;
      }

      const created = await prisma.actor.create({
        data: {
          name: primaryName,
          type: actorType,
          description: actor.description,
          aliases: normalizedAliases
        }
      });
      addNameMappings(actorNameToId, created.id, [primaryName, ...searchAliases]);
    })
  );

  const relationships = dedupeRelationships(result.relationships ?? []);

  await Promise.all(
    relationships.map(async relationship => {
      const fromActorId = actorNameToId.get(relationship.fromActorName.toLowerCase());
      const toActorId = actorNameToId.get(relationship.toActorName.toLowerCase());
      if (!fromActorId || !toActorId) return;

      const exists = await prisma.actorLink.findFirst({
        where: { fromActorId, toActorId, linkType: relationship.linkType }
      });

      if (exists) return;

      const linkData: Prisma.ActorLinkCreateManyInput = {
        fromActorId,
        toActorId,
        linkType: relationship.linkType,
        role: relationship.role ?? undefined,
        metadata: undefined,
        confidence: relationship.confidence ?? null,
        detectionSource: 'ai',
        verified: false
      };

      await prisma.actorLink.create({ data: linkData });
    })
  );

  return actorNameToId;
};
