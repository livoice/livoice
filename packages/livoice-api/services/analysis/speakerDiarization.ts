import PQueue from 'p-queue';
import { chatCompletion, openAiModel } from '../../lib/openai';

// Constants
const BATCH_SIZE = 100; // Larger batches = fewer API calls (10 batches instead of 20)
const CONTEXT_OVERLAP = 5; // Include last N segments from previous batch as context
const SPEAKER_EXTRACTION_TOKENS = 512;
const SEGMENT_ASSIGNMENT_TOKENS = 4096;

type Metadata = { title: string; channelName: string; description: string };

type ExtractedSpeaker = { name: string; role: string };
type ExtractedSpeakers = { speakers: ExtractedSpeaker[]; contentType: string };

const extractSpeakersFromMetadata = async (metadata: Metadata): Promise<ExtractedSpeakers> => {
  const prompt = `Analyze this content metadata and identify likely speakers.

  METADATA:
  - Title: ${metadata.title}
  - Channel: ${metadata.channelName}
  - Description: ${metadata.description}
  
  TASK:
  1. Determine the content type (e.g., interview, podcast, monologue, panel, lecture, debate, documentary, audiobook, etc.)
  2. Identify all likely speakers from the metadata
  3. For each speaker, determine their role (e.g., host, guest, speaker, panelist, interviewer, presenter, narrator, author, etc.)
  
  Return JSON:
  {
    "contentType": "descriptive content type",
    "speakers": [
      {"name": "Full Name", "role": "descriptive role"}
    ]
  }
  
  HINTS:
  - Channel name often indicates the host/creator
  - Title often mentions guests explicitly
  - Description may list participants
  - Only include names you're confident about
  - Use the most appropriate content type and role descriptions for this specific content`;

  try {
    const completion = await chatCompletion({
      model: openAiModel,
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'Extract speaker names and content type. Return strict JSON only.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: SPEAKER_EXTRACTION_TOKENS
    });
    const content = completion.choices?.[0]?.message?.content;
    if (!content) return { speakers: [], contentType: 'unknown' };
    const result = JSON.parse(content) as ExtractedSpeakers;
    return result;
  } catch {
    return { speakers: [], contentType: 'unknown' };
  }
};

// ============================================================================
// SEGMENT-BASED APPROACH (Cue-based with batching)
// ============================================================================

type SegmentInput = { index: number; startMs: number; endMs: number; text: string };
type SegmentAssignment = { index: number; speaker: string; role: string };

const buildSegmentAssignmentPrompt = (
  segments: SegmentInput[],
  contextSegments: SegmentAssignment[],
  knownSpeakers: ExtractedSpeakers,
  metadata: Metadata,
  batchInfo: string
): string => {
  const speakerList = knownSpeakers.speakers.length
    ? `KNOWN SPEAKERS:\n${knownSpeakers.speakers.map(s => `- ${s.name} (${s.role})`).join('\n')}`
    : 'No speakers pre-identified. Identify them from context.';

  const contextSection = contextSegments.length
    ? `CONTEXT (previous segments already assigned):\n${contextSegments.map(s => `[${s.index}] ${s.speaker}`).join('\n')}\n\n`
    : '';

  const segmentsSection = segments.map(s => `[${s.index}] (${Math.floor(s.startMs / 1000)}s) "${s.text}"`).join('\n');

  return `Assign a speaker to each transcript segment.

METADATA:
- Title: ${metadata.title}
- Channel: ${metadata.channelName}
- Content type: ${knownSpeakers.contentType}

${speakerList}

${contextSection}SEGMENTS TO ASSIGN (${batchInfo}):
${segmentsSection}

TASK:
For each segment index, determine who is speaking based on:
- Content and speaking style
- Context from previous segments
- Patterns (questions vs answers, introductions, etc.)
- Known speaker roles

OUTPUT:
Return compact JSON with speaker roles and segment assignments:
{
  "speakers": {"Speaker Name": "host", "Another Speaker": "guest"},
  "segments": {"1": "Speaker Name", "2": "Another Speaker", "3": "Speaker Name"}
}

- "speakers": maps each speaker name to their role (only unique speakers)
- "segments": maps segment index to speaker name
- Use exact names from KNOWN SPEAKERS. Use "Unknown" if uncertain.`;
};

type CompactAssignmentResult = {
  speakers: Record<string, string>; // speaker name -> role
  segments: Record<string, string>; // segment index -> speaker name
};

const assignBatch = async (
  segments: SegmentInput[],
  contextSegments: SegmentAssignment[],
  knownSpeakers: ExtractedSpeakers,
  metadata: Metadata,
  batchInfo: string
): Promise<SegmentAssignment[]> => {
  const prompt = buildSegmentAssignmentPrompt(segments, contextSegments, knownSpeakers, metadata, batchInfo);

  const completion = await chatCompletion({
    model: openAiModel,
    temperature: 0.1,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'Assign speakers to segments. Return compact JSON only.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: SEGMENT_ASSIGNMENT_TOKENS
  });

  const content = completion.choices?.[0]?.message?.content;
  if (!content) return segments.map(s => ({ index: s.index, speaker: 'Unknown', role: 'unknown' }));

  const result = JSON.parse(content) as CompactAssignmentResult;

  // Convert compact format to SegmentAssignment array
  const assignments = Object.entries(result.segments ?? {}).map(([indexStr, speaker]) => ({
    index: parseInt(indexStr, 10),
    speaker,
    role: result.speakers?.[speaker] ?? 'unknown'
  }));

  return assignments;
};

export const assignSpeakersToSegments = async (
  segments: SegmentInput[],
  metadata: Metadata,
  transcriptId?: string
): Promise<Map<number, { speaker: string; role: string }>> => {
  const logPrefix = `[speakerDiarization] transcript=${transcriptId ?? ''}`;

  console.log(`${logPrefix} Starting speaker assignment for ${segments.length} segments`);

  // Pre-extract speaker names from metadata
  console.log(`${logPrefix} Extracting speakers from metadata...`);
  const knownSpeakers = await extractSpeakersFromMetadata(metadata);
  console.log(
    `${logPrefix} Found ${knownSpeakers.speakers.length} speakers: ${knownSpeakers.speakers.map(s => s.name).join(', ')}`
  );

  const assignments = new Map<number, { speaker: string; role: string }>();
  const totalBatches = Math.ceil(segments.length / BATCH_SIZE);

  // Process batches sequentially (concurrency: 1) to maintain context flow
  const queue = new PQueue({ concurrency: 1 });

  const batches = Array.from({ length: totalBatches }, (_, batchIndex) => {
    const start = batchIndex * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, segments.length);
    return {
      batchIndex,
      start,
      segments: segments.slice(start, end),
      batchInfo: `batch ${batchIndex + 1}/${totalBatches}, segments ${start + 1}-${end}`
    };
  });

  console.log(`${logPrefix} Processing ${totalBatches} batches (${BATCH_SIZE} segments each)...`);

  await Promise.all(
    batches.map(batch =>
      queue.add(async () => {
        const batchStart = Date.now();
        console.log(`${logPrefix} ${batch.batchInfo} - starting...`);

        // Get context from previous assignments (last CONTEXT_OVERLAP segments)
        const contextStart = Math.max(0, batch.start - CONTEXT_OVERLAP);
        const contextSegments: SegmentAssignment[] = segments
          .slice(contextStart, batch.start)
          .map(segment => {
            const assigned = assignments.get(segment.index);
            return assigned ? { index: segment.index, speaker: assigned.speaker, role: assigned.role } : null;
          })
          .filter((assignment): assignment is SegmentAssignment => assignment !== null);

        try {
          const batchAssignments = await assignBatch(
            batch.segments,
            contextSegments,
            knownSpeakers,
            metadata,
            batch.batchInfo
          );
          batchAssignments.forEach(assignment => {
            const normalizedSpeaker = knownSpeakers.speakers.find(
              speaker => speaker.name.toLowerCase() === assignment.speaker.toLowerCase()
            );
            assignments.set(assignment.index, {
              speaker: normalizedSpeaker?.name ?? assignment.speaker,
              role: normalizedSpeaker?.role ?? assignment.role
            });
          });

          const elapsed = ((Date.now() - batchStart) / 1000).toFixed(1);
          console.log(
            `${logPrefix} ${batch.batchInfo} - completed in ${elapsed}s (${batchAssignments.length} assigned)`
          );
        } catch (error) {
          console.error(`${logPrefix} ${batch.batchInfo} - FAILED:`, error);
          batch.segments.forEach(segment => assignments.set(segment.index, { speaker: 'Unknown', role: 'unknown' }));
        }
      })
    )
  );

  // Summary log
  const speakerCounts = new Map<string, number>();
  assignments.forEach(({ speaker }) => speakerCounts.set(speaker, (speakerCounts.get(speaker) ?? 0) + 1));
  const speakerSummary = Array.from(speakerCounts.entries())
    .map(([name, count]) => `${name}: ${count}`)
    .join(', ');
  console.log(
    `${logPrefix} Completed! ${assignments.size}/${segments.length} segments assigned. Speakers: ${speakerSummary}`
  );

  return assignments;
};
