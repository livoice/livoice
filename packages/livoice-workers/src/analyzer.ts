import { getPrismaSudo } from 'livoice-api/lib/prisma';
import { analyzeTranscript, updateAnalysis } from 'livoice-api/services/transcriptAnalysis';
import { runForever } from './utils/loop';

const SLEEP_MS = 5_000;

export const start = async () => {
  await runForever(async () => {
    const prisma = await getPrismaSudo();
    const transcript = await prisma.transcript.findFirst({
      where: {
        analysisStatus: 'pending',
        importStatus: { in: ['completed', 'skipped'] }
      },
      orderBy: { createdAt: 'asc' }
    });

    if (!transcript) {
      console.log('[analyzer] no pending transcripts, sleeping...');
      return true;
    }

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

    return false;
  }, SLEEP_MS);
};
