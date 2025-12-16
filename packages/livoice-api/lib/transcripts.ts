import type { Prisma, PrismaClient } from '@prisma/client';
import type { SourceAdapter } from './sources/types';
import { toTranscriptSegments } from './toTranscriptSegments';

export const MAX_TRANSCRIPT_IMPORT_ATTEMPTS = 3;

export type TranscriptWithSource = Prisma.TranscriptGetPayload<{
  include: { source: true };
}>;

export const fetchPendingTranscript = async (prisma: PrismaClient): Promise<TranscriptWithSource | null> =>
  prisma.transcript.findFirst({
    where: {
      OR: [
        { importStatus: 'pending' },
        { importStatus: 'failed', importAttempts: { lt: MAX_TRANSCRIPT_IMPORT_ATTEMPTS } }
      ]
    },
    include: { source: true },
    orderBy: { createdAt: 'asc' }
  });

export const processTranscriptImport = async (
  prisma: PrismaClient,
  transcript: TranscriptWithSource,
  adapter: SourceAdapter
) => {
  await prisma.transcript.update({
    where: { id: transcript.id },
    data: {
      importStatus: 'fetching',
      importError: ''
    }
  });

  try {
    const transcriptSegments = toTranscriptSegments(await adapter.fetchTranscript(transcript.externalId));

    const isEmpty = transcriptSegments.length === 0;

    if (!isEmpty) {
      await prisma.transcriptSegment.deleteMany({ where: { transcriptId: transcript.id } });

      await prisma.transcriptSegment.createMany({
        data: transcriptSegments.map(segment => ({
          transcriptId: transcript.id,
          index: segment.index,
          startMs: segment.startMs,
          endMs: segment.endMs,
          durationMs: segment.durationMs,
          text: segment.text,
          speaker: segment.speaker,
          isMetadata: segment.isMetadata
        }))
      });
    }

    await prisma.transcript.update({
      where: { id: transcript.id },
      data: {
        importStatus: isEmpty ? 'skipped' : 'completed',
        importError: ''
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Transcript import failed';
    await prisma.transcript.update({
      where: { id: transcript.id },
      data: {
        importStatus: 'failed',
        importAttempts: { increment: 1 },
        importError: message
      }
    });
    throw error;
  }
};
