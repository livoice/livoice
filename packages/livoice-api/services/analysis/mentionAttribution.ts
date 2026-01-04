import type {
  EmotionType,
  ExtractedMention,
  MentionAttributionResult,
  MentionType,
  SentimentType
} from '../../lib/analysis/types';
import { chatCompletion, openAiModel } from '../../lib/openai';
import { getPrismaSudo } from '../../lib/prisma';
import type { SegmentWithSpeaker } from '../../lib/toTranscriptSegments';

// Constants
const BATCH_SIZE = 40;
const MAX_TOKENS = 2048;

// Valid enum values for validation
const VALID_EMOTIONS: EmotionType[] = [
  'neutral',
  'happy',
  'excited',
  'stressed',
  'frustrated',
  'angry',
  'sad',
  'confident',
  'uncertain'
];
const VALID_SENTIMENTS: SentimentType[] = ['positive', 'negative', 'neutral'];
const VALID_MENTION_TYPES: MentionType[] = [
  'speaker',
  'mentioned',
  'host',
  'guest',
  'sponsor',
  'channel_owner',
  'topic'
];

const validateEmotion = (emotion: unknown): EmotionType | null =>
  VALID_EMOTIONS.includes(emotion as EmotionType) ? (emotion as EmotionType) : null;

const validateSentiment = (sentiment: unknown): SentimentType | null =>
  VALID_SENTIMENTS.includes(sentiment as SentimentType) ? (sentiment as SentimentType) : null;

const validateMentionType = (mentionType: unknown): MentionType =>
  VALID_MENTION_TYPES.includes(mentionType as MentionType) ? (mentionType as MentionType) : 'mentioned';

type PromptParams = {
  segments: Array<{ index: number; speaker: string; text: string }>;
  actorNames: string[];
};

const buildMentionAttributionPrompt = ({
  segments,
  actorNames
}: PromptParams) => `You are attributing actor mentions to transcript segments.

KNOWN ACTORS:
${actorNames.join(', ')}

SEGMENTS TO ANALYZE:
${segments.map(segment => `[${segment.index}] (${segment.speaker}): ${segment.text}`).join('\n')}

TASK:
For each segment, identify which actors are mentioned and how:
- speaker: The actor is speaking this segment
- mentioned: The actor is explicitly mentioned
- topic: The actor (if a topic) is being discussed
- host/guest: The actor's role

FOR SPEAKER MENTIONS ONLY, also detect the speaker's emotion:
- neutral, happy, excited, stressed, frustrated, angry, sad, confident, uncertain
- Only include emotion if clearly discernible from tone/content

RULES:
- Only attribute actors from the KNOWN ACTORS list
- CRITICAL: Always use the EXACT full name from the KNOWN ACTORS list. Do not use partial names (e.g., "Stephen" instead of "Stephen Bartlett"). Partial names will fail to match.
- Confidence: 0.0-1.0 reflecting certainty
- Sentiment: positive/negative/neutral if clearly expressed

OUTPUT:
{
  "mentions": [
    { "segmentIndex": 1, "actorName": "Jim Lesinski", "mentionType": "speaker", "emotion": "confident", "confidence": 1.0 },
    { "segmentIndex": 1, "actorName": "Google", "mentionType": "mentioned", "sentiment": "positive", "confidence": 0.9 },
    // INCORRECT (do not do this): { "segmentIndex": 1, "actorName": "Jim", "mentionType": "speaker" } // missing last name will fail matching
  ]
}
`;

const attributeMentionsByBatch = async (
  segments: SegmentWithSpeaker[],
  actorNames: string[]
): Promise<ExtractedMention[]> => {
  console.log(`[mentionAttribution] start batch segments=${segments.length} actors=${actorNames.length}`);

  const prompt = buildMentionAttributionPrompt({
    segments: segments.map(segment => ({
      index: segment.index,
      speaker: segment.speaker,
      text: segment.text
    })),
    actorNames
  });

  const completion = await chatCompletion({
    model: openAiModel,
    temperature: 0.1,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'Return strict JSON only. Attribute actor mentions to segments.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: MAX_TOKENS
  });

  const content = completion.choices?.[0]?.message?.content;
  if (!content) return [];

  try {
    const result = JSON.parse(content) as MentionAttributionResult;
    console.log(
      `[mentionAttribution] done batch segments=${segments.length} actors=${actorNames.length} mentions=${result.mentions?.length ?? 0}`
    );
    return result.mentions ?? [];
  } catch (error) {
    console.error('[mentionAttribution] Failed to parse JSON response:', content.slice(0, 500), error);
    return [];
  }
};

export const attributeMentions = async (
  segments: SegmentWithSpeaker[],
  actorNames: string[]
): Promise<ExtractedMention[]> => {
  const batches = Array.from({ length: Math.ceil(segments.length / BATCH_SIZE) }, (_, batchIndex) =>
    segments.slice(batchIndex * BATCH_SIZE, batchIndex * BATCH_SIZE + BATCH_SIZE)
  );

  console.log(
    `[mentionAttribution] total segments=${segments.length} batches=${batches.length} batchSize=${BATCH_SIZE}`
  );

  const results = await Promise.all(
    batches.map((batch, idx) => {
      console.log(`[mentionAttribution] process batch ${idx + 1}/${batches.length} size=${batch.length}`);
      return attributeMentionsByBatch(batch, actorNames);
    })
  );
  return results.flat() as ExtractedMention[];
};

export const storeMentions = async (
  mentions: ExtractedMention[],
  actorNameToId: Map<string, string>,
  segmentIndexToId: Map<number, string>,
  transcriptId: string,
  sourceId: string
) => {
  console.log(
    `[storeMentions] received mentions=${mentions.length} actors=${actorNameToId.size} segments=${segmentIndexToId.size}`
  );

  if (!mentions.length) {
    console.warn('[storeMentions] No mentions to store');
    return 0;
  }

  const prisma = await getPrismaSudo();

  const transcript = await prisma.transcript.findUnique({ where: { id: transcriptId } });
  if (!transcript) {
    console.warn(`[storeMentions] transcript not found, skipping mentions write`, { transcriptId });
    return 0;
  }

  await prisma.actorMention.deleteMany({ where: { transcriptId, detectionSource: 'ai' } });

  const mentionData = mentions
    .map(mention => {
      const actorName = mention.actorName?.trim();
      if (!actorName) {
        console.warn('[storeMentions] Missing actorName in mention', mention);
        return null;
      }

      const actorId = actorNameToId.get(actorName.toLowerCase());
      const segmentId = segmentIndexToId.get(mention.segmentIndex);
      if (!actorId) {
        console.warn(
          `[storeMentions] No actorId for "${actorName}" (available: ${Array.from(actorNameToId.keys()).join(', ')})`
        );
        return null;
      }

      return {
        actorId,
        segmentId: segmentId ?? null,
        transcriptId,
        sourceId,
        mentionType: validateMentionType(mention.mentionType),
        sentiment: validateSentiment(mention.sentiment),
        emotion: validateEmotion(mention.emotion),
        confidence: mention.confidence ?? null,
        detectionSource: 'ai' as const,
        verified: false
      };
    })
    .filter((mention): mention is NonNullable<typeof mention> => Boolean(mention));

  console.log(`[storeMentions] filtered mentions: ${mentions.length} -> ${mentionData.length} valid`);

  if (mentionData.length) {
    await prisma.actorMention.createMany({ data: mentionData });

    // Ensure transcript segments have speakerActorId set when the mention is a speaker reference.
    const speakerAssignments = mentionData
      .filter(mention => mention.mentionType === 'speaker' && mention.segmentId && mention.actorId)
      .map(({ segmentId, actorId }) => ({ segmentId, actorId }));

    await Promise.all(
      speakerAssignments.map(({ segmentId, actorId }) =>
        prisma.transcriptSegment.update({ where: { id: segmentId as string }, data: { speakerActorId: actorId } })
      )
    );

    console.log(`[storeMentions] created ${mentionData.length} ActorMentions`);
  }

  return mentionData.length;
};
