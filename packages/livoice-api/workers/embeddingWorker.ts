import { getKeystoneContext } from '../context/keystoneContext';
import { batchEmbed, fetchPendingSegments, markCompletedTranscripts } from '../lib/embeddings';
import { runForever } from './utils/loop';

const SLEEP_MS = 5_000;
const BATCH_SIZE = 500;

export const startEmbeddingWorker = async () => {
  const context = await getKeystoneContext();

  await runForever(async () => {
    const segments = await fetchPendingSegments(context, BATCH_SIZE);
    console.log(`[embedding-worker] fetched ${segments.length} pending segments...`);
    if (!segments.length) return true; // sleep before next poll

    console.log(`[embedding-worker] embedding ${segments.length} segments...`);
    await batchEmbed(context, segments);
    await markCompletedTranscripts(context);
    console.log('[embedding-worker] batch completed');
    return false; // skip sleep to continue immediately
  }, SLEEP_MS);
};
