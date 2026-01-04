import { getSourceAdapter } from 'livoice-api/lib/sources';
import { fetchPendingTranscript, processTranscriptImport, updateTranscriptStatus } from 'livoice-api/lib/transcripts';
import PQueue from 'p-queue';
import flags from './config/flags';
import { runForever } from './utils/loop';

const SLEEP_MS = 5_000;

export const start = async () => {
  const queue = new PQueue();

  await runForever(async () => {
    queue.concurrency = await flags.getNumber('workersTranscriptImporterConcurrency', 1);

    const transcript = await fetchPendingTranscript();
    if (!transcript) return true;

    if (!transcript.source) return updateTranscriptStatus(transcript, 'failed', 'Transcript has no source');

    const adapter = getSourceAdapter(transcript.source.type);
    if (!adapter)
      return updateTranscriptStatus(transcript, 'failed', `No adapter for source type ${transcript.source.type}`);

    console.log(`[transcriptImporter] processing transcript ${transcript.id}`);

    try {
      await queue.add(() => processTranscriptImport(transcript, adapter));
    } catch (error) {
      console.error(`[transcriptImporter] failed to import transcript ${transcript.id}:`, error);
    }

    return false;
  }, SLEEP_MS);
};
