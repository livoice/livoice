import type { Prisma, Transcript, TranscriptImportStatusType } from '@prisma/client';
import { getPrismaSudo } from './prisma';
import type { SourceAdapter } from './sources/types';
import { toTranscriptSegments } from './toTranscriptSegments';

export const MAX_TRANSCRIPT_IMPORT_ATTEMPTS = 3;

export type TranscriptWithSource = Prisma.TranscriptGetPayload<{
  include: { source: true };
}>;

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

export const updateTranscriptStatus = async (
  transcript: Transcript,
  importStatus: TranscriptImportStatusType,
  importError: string = ''
) => {
  await (
    await getPrismaSudo()
  ).transcript.update({
    where: { id: transcript.id },
    data: {
      importStatus,
      importError,
      ...(importStatus === 'failed' && { importAttempts: { increment: 1 } })
    }
  });
  return false;
};

export const processTranscriptImport = async (transcript: TranscriptWithSource, adapter: SourceAdapter) => {
  const prisma = await getPrismaSudo();
  await updateTranscriptStatus(transcript, 'fetching');

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

    await updateTranscriptStatus(transcript, isEmpty ? 'skipped' : 'completed');
  } catch (error) {
    await updateTranscriptStatus(
      transcript,
      'failed',
      error instanceof Error ? error.message : 'Transcript import failed'
    );
    throw error;
  }
};
