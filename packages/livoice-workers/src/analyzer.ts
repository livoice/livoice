import { getPrismaSudo } from 'livoice-api/lib/prisma';
import { analyzeTranscript, updateAnalysis } from 'livoice-api/services/transcriptAnalysis';
import PQueue from 'p-queue';
import flags from './config/flags';
import { runForever } from './utils/loop';

const SLEEP_MS = 5_000;

const processTranscript = async (transcript: { id: string; title: string | null; sourceId: string | null }) => {
  console.log(
    `[analyzer] analyzing transcript "${transcript.title}" (transcriptId=${transcript.id}, sourceId=${transcript.sourceId})`
  );

  try {
    await analyzeTranscript(transcript.id);
    console.log(`[analyzer] completed transcript ${transcript.id}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'analysis_failed';
    await updateAnalysis(transcript.id, {
      analysisStatus: 'failed',
      analysisError: message
    });
    console.error('[analyzer] failed', message);
  }
};

export const start = async () => {
  const queue = new PQueue();

  await runForever(async () => {
    queue.concurrency = await flags.getNumber('workersAnalyzeProcessingConcurrency', 3);

    const freeSlots = queue.concurrency - queue.size - queue.pending;
    if (freeSlots <= 0) return true;

    const prisma = await getPrismaSudo();
    const transcripts = await prisma.transcript.findMany({
      where: {
        analysisStatus: 'pending',
        importStatus: { in: ['completed', 'skipped'] }
      },
      orderBy: { createdAt: 'asc' },
      take: freeSlots
    });

    if (!transcripts.length) {
      console.log('[analyzer] no pending transcripts, sleeping...');
      return true;
    }

    transcripts.forEach(transcript => queue.add(() => processTranscript(transcript)));

    return true;
  }, SLEEP_MS);
};
