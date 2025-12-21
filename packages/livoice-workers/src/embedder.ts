import { batchEmbed, fetchPendingSegments, markCompletedTranscripts } from 'livoice-api/lib/embeddings';
import { runForever } from './utils/loop';

const SLEEP_MS = 5_000;
const BATCH_SIZE = 500;

export const start = async () => {
  await runForever(async () => {
    const segments = await fetchPendingSegments(BATCH_SIZE);
    console.log(`[embedder] fetched ${segments.length} pending segments...`);
    if (!segments.length) return true;

    console.log(`[embedder] embedding ${segments.length} segments...`);
    await batchEmbed(segments);
    await markCompletedTranscripts();
    console.log('[embedder] batch completed');
    return false;
  }, SLEEP_MS);
};
