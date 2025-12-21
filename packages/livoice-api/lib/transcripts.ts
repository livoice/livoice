import type { Prisma, Transcript, TranscriptImportStatusType } from '@prisma/client';
import { getKeystoneContext } from 'livoice-api/context/keystoneContext';
import type { SourceAdapter } from './sources/types';
import { toTranscriptSegments } from './toTranscriptSegments';

export const MAX_TRANSCRIPT_IMPORT_ATTEMPTS = 3;

export type TranscriptWithSource = Prisma.TranscriptGetPayload<{
  include: { source: true };
}>;

const getPrisma = async () => (await getKeystoneContext()).sudo().prisma;

export const fetchPendingTranscript = async (): Promise<TranscriptWithSource | null> =>
  (await getPrisma()).transcript.findFirst({
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
    await getPrisma()
  ).transcript.update({
    where: { id: transcript.id },
    data: {
      importStatus,
      importAttempts: { increment: 1 },
      importError
    }
  });
  return false;
};

export const processTranscriptImport = async (transcript: TranscriptWithSource, adapter: SourceAdapter) => {
  const prisma = await getPrisma();
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
