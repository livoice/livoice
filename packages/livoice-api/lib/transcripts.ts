import type { Prisma, Transcript, TranscriptImportStatusType } from '@prisma/client';
import { getPrismaSudo } from './prisma';
import type { SourceAdapter } from './sources/types';

export const MAX_TRANSCRIPT_IMPORT_ATTEMPTS = 3;

export type TranscriptWithSource = Prisma.TranscriptGetPayload<{
  include: { source: true };
}>;

type TopicActorParams = {
  tags?: string[] | null;
  category?: string | null;
  transcriptId: string;
  sourceId: string | null;
};

const createTopicActorsFromMetadata = async ({ tags, category, transcriptId, sourceId }: TopicActorParams) => {
  const prisma = await getPrismaSudo();

  const topics = [...(tags ?? []), category ?? '']
    .map(topic => topic?.trim())
    .filter((topic): topic is string => Boolean(topic));

  const uniqueTopics = Array.from(
    topics
      .reduce((acc, topic) => {
        const key = topic.toLowerCase();
        if (!acc.has(key)) acc.set(key, topic);
        return acc;
      }, new Map<string, string>())
      .values()
  );

  if (!uniqueTopics.length) return;

  const actorIds = await Promise.all(
    uniqueTopics.map(async topic => {
      const { id } =
        (await prisma.actor.findFirst({
          where: {
            // type: 'topic',
            OR: [
              { name: { equals: topic, mode: 'insensitive' } },
              { aliases: { array_contains: [topic] } },
              { aliases: { array_contains: [topic.toLowerCase()] } }
            ]
          }
        })) || (await prisma.actor.create({ data: { name: topic, type: 'topic' } }));

      return id;
    })
  );

  await prisma.actorMention.deleteMany({ where: { transcriptId, mentionType: 'topic', detectionSource: 'youtube' } });

  await prisma.actorMention.createMany({
    data: actorIds.map(actorId => ({
      actorId,
      transcriptId,
      sourceId,
      mentionType: 'topic',
      detectionSource: 'youtube',
      verified: false
    }))
  });
};

export const updateTranscript = async (transcriptId: string, data: Prisma.TranscriptUpdateArgs['data']) =>
  (await getPrismaSudo()).transcript.update({ where: { id: transcriptId }, data });

export const updateTranscriptStatus = async (
  transcript: Transcript,
  importStatus: TranscriptImportStatusType,
  importError: string = ''
) => {
  await updateTranscript(transcript.id, {
    importStatus,
    importError,
    ...(importStatus === 'failed' && { importAttempts: { increment: 1 } })
  });
  return false;
};

export const fetchPendingTranscript = async (): Promise<TranscriptWithSource | null> =>
  (await getPrismaSudo()).transcript.findFirst({
    where: {
      OR: [
        { importStatus: 'pending' },
        { importStatus: 'failed', importAttempts: { lt: MAX_TRANSCRIPT_IMPORT_ATTEMPTS } }
      ]
    },
    include: { source: true },
    orderBy: { createdAt: 'asc' }
  });

export const processTranscriptImport = async (transcript: TranscriptWithSource, adapter: SourceAdapter) => {
  const prisma = await getPrismaSudo();
  await updateTranscriptStatus(transcript, 'fetching');

  try {
    const rawSrt = (await adapter.fetchTranscript(transcript.externalId)).trim();
    if (!rawSrt) {
      await updateTranscript(transcript.id, {
        rawSrt: '',
        importStatus: 'skipped',
        importAt: new Date(),
        importError: 'empty_transcript'
      });
      return;
    }

    const info = await adapter.fetchInfo?.(transcript.externalId);
    if (!info) {
      await updateTranscript(transcript.id, {
        importStatus: 'failed',
        importAt: new Date(),
        importError: 'failed to fetch info'
      });
      return;
    }

    console.log(`[processTranscriptImport] info:`);

    await Promise.all([
      prisma.transcriptSegment.deleteMany({ where: { transcriptId: transcript.id } }),
      updateTranscript(transcript.id, {
        rawSrt,
        description: info.description ?? undefined,
        chapters: info.chapters ?? undefined,
        ...(info.publishedAt && { publishedAt: info.publishedAt }),
        importStatus: 'completed',
        importAt: new Date(),
        analysisStatus: 'pending',
        analysisAttempts: 0,
        analysisError: ''
      }),
      createTopicActorsFromMetadata({
        tags: info.tags ?? null,
        category: info.category ?? null,
        transcriptId: transcript.id,
        sourceId: transcript.sourceId
      })
    ]);
  } catch (error) {
    if (error instanceof Error && error.message === 'Transcript not found') {
      console.error(`[processTranscriptImport] transcript not found id=${transcript.id}`);
      return;
    }

    const errorMessage = error instanceof Error ? error.message : 'Transcript import failed';
    const isSubtitleError = errorMessage.includes('Subtitle file not found');
    const isLastAttempt = (transcript.importAttempts ?? 0) >= MAX_TRANSCRIPT_IMPORT_ATTEMPTS - 1;

    // If this is the last attempt and it's a subtitle-related error, mark as skipped
    if (isLastAttempt && isSubtitleError) {
      await updateTranscript(transcript.id, {
        importStatus: 'skipped',
        importAt: new Date(),
        importError: errorMessage
      });
      console.log(
        `[processTranscriptImport] max attempts reached for subtitle error, marking as skipped id=${transcript.id}`
      );
      return;
    }

    await updateTranscriptStatus(transcript, 'failed', errorMessage);
    throw error;
  }
};
