import { getSourceAdapter } from 'livoice-api/lib/sources';
import { fetchPendingTranscript, processTranscriptImport, updateTranscriptStatus } from 'livoice-api/lib/transcripts';
import PQueue from 'p-queue';
import { runForever } from './utils/loop';

const SLEEP_MS = 5_000;
const transcriptImportQueue = new PQueue({ concurrency: 1 });

export const start = async () => {
  await runForever(async () => {
    const transcript = await fetchPendingTranscript();
    if (!transcript) return true;

    if (!transcript.source) return updateTranscriptStatus(transcript, 'failed', 'Transcript has no source');

    const adapter = getSourceAdapter(transcript.source.type);
    if (!adapter)
      return updateTranscriptStatus(transcript, 'failed', `No adapter for source type ${transcript.source.type}`);

    console.log(`[transcriber] processing transcript ${transcript.id}`);

    try {
      await transcriptImportQueue.add(() => processTranscriptImport(transcript, adapter));
    } catch (error) {
      console.error(`[transcriber] failed to import transcript ${transcript.id}:`, error);
    }

    return false;
  }, SLEEP_MS);
};
