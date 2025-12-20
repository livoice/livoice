import { getKeystoneContext } from 'livoice-api/context/keystoneContext';
import { batchEmbed, fetchPendingSegments, markCompletedTranscripts } from 'livoice-api/lib/embeddings';
import { runForever } from './utils/loop';

const SLEEP_MS = 5_000;
const BATCH_SIZE = 500;

export const start = async () => {
  const context = await getKeystoneContext();

  await runForever(async () => {
    const segments = await fetchPendingSegments(context, BATCH_SIZE);
    console.log(`[embedder] fetched ${segments.length} pending segments...`);
    if (!segments.length) return true;

    console.log(`[embedder] embedding ${segments.length} segments...`);
    await batchEmbed(context, segments);
    await markCompletedTranscripts(context);
    console.log('[embedder] batch completed');
    return false;
  }, SLEEP_MS);
};
