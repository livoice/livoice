import { Prisma } from '@prisma/client';
import { getPrismaSudo } from '../lib/prisma';
import { toTranscriptSegments, type ParsedSegment, type SegmentWithSpeaker } from '../lib/toTranscriptSegments';
import { extractActors, storeActors } from './analysis/actorExtraction';
import { attributeMentions, storeMentions } from './analysis/mentionAttribution';
import { assignSpeakersToSegments } from './analysis/speakerDiarization';

const createSpeakerActorsFromAssignments = async (
  assignments: Map<number, { speaker: string; role: string }>
): Promise<Map<string, string>> => {
  const prisma = await getPrismaSudo();
  const speakerNameToId = new Map<string, string>();

  // Get unique speaker names from assignments
  const uniqueSpeakers = new Set<string>();
  assignments.forEach(({ speaker }) => {
    if (speaker && speaker !== 'Unknown') uniqueSpeakers.add(speaker);
  });

  await Promise.all(
    Array.from(uniqueSpeakers).map(async speakerName => {
      const primaryName = speakerName.trim();
      const normalizedName = primaryName.toLowerCase();

      if (speakerNameToId.has(normalizedName)) return;

      const existing = await prisma.actor.findFirst({
        where: {
          type: 'person',
          name: { equals: primaryName, mode: 'insensitive' }
        }
      });

      if (existing) {
        speakerNameToId.set(normalizedName, existing.id);
        return;
      }

      const created = await prisma.actor.create({
        data: { name: primaryName, type: 'person', aliases: [normalizedName] }
      });
      speakerNameToId.set(normalizedName, created.id);
    })
  );

  return speakerNameToId;
};

const applyAssignmentsToSegments = (
  segments: ParsedSegment[],
  assignments: Map<number, { speaker: string; role: string }>
): SegmentWithSpeaker[] =>
  segments.map(segment => {
    const assignment = assignments.get(segment.index);
    return {
      ...segment,
      speaker: assignment?.speaker ?? segment.speaker ?? 'Unknown',
      speakerRole: assignment?.role ?? 'unknown'
    };
  });

const storeSegments = async (
  transcriptId: string,
  sourceId: string,
  segments: SegmentWithSpeaker[],
  speakerNameToId: Map<string, string>
) => {
  const prisma = await getPrismaSudo();

  await prisma.transcriptSegment.deleteMany({ where: { transcriptId } });

  if (segments.length) {
    await prisma.transcriptSegment.createMany({
      data: segments.map((segment, index) => ({
        transcriptId,
        sourceId,
        index: index + 1,
        startMs: segment.startMs,
        endMs: segment.endMs,
        durationMs: segment.durationMs,
        text: segment.text,
        speakerActorId: speakerNameToId.get((segment.speaker ?? '').toLowerCase()) ?? null,
        isMetadata: segment.isMetadata
      }))
    });
  }

  return prisma.transcriptSegment.findMany({ where: { transcriptId }, select: { id: true, index: true } });
};

export const updateAnalysis = async (transcriptId: string, data: Prisma.TranscriptUpdateArgs['data']) =>
  (await getPrismaSudo()).transcript.update({ where: { id: transcriptId }, data });

export const analyzeTranscript = async (transcriptId: string) => {
  const prisma = await getPrismaSudo();

  const transcript = await prisma.transcript.findUnique({ where: { id: transcriptId }, include: { source: true } });
  if (!transcript) throw new Error('Transcript not found');

  console.log(`[analyzer] start transcript=${transcriptId}`);

  const rawSrt = transcript.rawSrt?.trim() ?? '';
  if (!rawSrt) {
    await prisma.transcript.update({
      where: { id: transcriptId },
      data: { analysisStatus: 'failed', analysisError: 'rawSrt missing' }
    });
    console.warn(`[analyzer] missing rawSrt transcript=${transcriptId}`);
    return null;
  }

  await prisma.transcript.update({
    where: { id: transcriptId },
    data: { analysisStatus: 'processing', analysisAttempts: { increment: 1 }, analysisError: '' }
  });

  const metadata = {
    title: transcript.title,
    channelName: transcript.source?.name ?? '',
    description: transcript.description ?? ''
  };

  // Pass 1: Parse segments
  console.log(`[analyzer] Pass 1: Parsing segments for ${transcriptId}`);
  const rawSegments = toTranscriptSegments(rawSrt);
  console.log(`[analyzer] Parsed ${rawSegments.length} segments`);

  // Pass 2: Speaker diarization (segment-based with batching)
  console.log(`[analyzer] Pass 2: Speaker diarization for ${transcriptId}`);
  const speakerAssignments = await assignSpeakersToSegments(rawSegments, metadata, transcriptId);

  // Pass 3: Create speaker actors + apply assignments
  console.log(`[analyzer] Pass 3: Creating speaker actors for ${transcriptId}`);
  const speakerNameToId = await createSpeakerActorsFromAssignments(speakerAssignments);
  const segments = applyAssignmentsToSegments(rawSegments, speakerAssignments);
  const storedSegments = await storeSegments(transcriptId, transcript.sourceId ?? '', segments, speakerNameToId);
  const segmentIndexToId = new Map(
    storedSegments.filter(({ index }) => index !== null).map(segment => [segment.index as number, segment.id])
  );

  // Pass 4a: Actor extraction
  console.log(`[analyzer] Pass 4a: Extracting actors for ${transcriptId}`);
  const actorResult = await extractActors(segments, metadata);
  const actorNameToId = await storeActors(actorResult);
  speakerNameToId.forEach((id, name) => actorNameToId.set(name, id));

  // Pass 4b: Mention attribution (batched)
  console.log(`[analyzer] Pass 4b: Attributing mentions for ${transcriptId}`);
  const actorNames = actorResult.actors.map(actor => actor.name);
  console.log(
    `[analyzer] actorNames=${actorNames.length}: ${actorNames.slice(0, 5).join(', ')}${actorNames.length > 5 ? '...' : ''}`
  );
  console.log(
    `[analyzer] actorNameToId keys: ${Array.from(actorNameToId.keys()).slice(0, 5).join(', ')}${actorNameToId.size > 5 ? '...' : ''}`
  );
  const mentions = await attributeMentions(segments, actorNames);
  console.log(`[analyzer] received ${mentions.length} mentions from attribution`);
  console.log(mentions);
  await storeMentions(mentions, actorNameToId, segmentIndexToId, transcriptId, transcript.sourceId ?? '');

  await prisma.transcript.update({
    where: { id: transcriptId },
    data: { analysisStatus: 'completed', analysisAt: new Date(), analysisError: '' }
  });

  console.log(`[analyzer] Completed analysis for ${transcriptId}`);
  return true;
};
