import { getKeystoneContext } from '../context/keystoneContext';
import { getSourceAdapter } from '../lib/sources';
import { fetchPendingTranscript, processTranscriptImport } from '../lib/transcripts';
import { runForever } from './utils/loop';

const SLEEP_MS = 5_000;

export const startTranscriptWorker = async () => {
  const context = await getKeystoneContext();
  const prisma = context.sudo().prisma;

  await runForever(async () => {
    const transcript = await fetchPendingTranscript(prisma);
    if (!transcript) return true;

    if (!transcript.source) {
      await prisma.transcript.update({
        where: { id: transcript.id },
        data: {
          importStatus: 'failed',
          importAttempts: { increment: 1 },
          importError: 'Transcript has no source'
        }
      });
      return false;
    }

    const adapter = getSourceAdapter(transcript.source.type);
    if (!adapter) {
      await prisma.transcript.update({
        where: { id: transcript.id },
        data: {
          importStatus: 'failed',
          importAttempts: { increment: 1 },
          importError: `No adapter for source type ${transcript.source.type}`
        }
      });
      return false;
    }

    console.log(`[transcript-worker] processing transcript ${transcript.id}`);

    try {
      await processTranscriptImport(prisma, transcript, adapter);
    } catch (error) {
      console.error(`[transcript-worker] failed to import transcript ${transcript.id}:`, error);
    }

    return false;
  }, SLEEP_MS);
};
