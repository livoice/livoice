import { CronExpressionParser } from 'cron-parser';
import { getKeystoneContext } from 'livoice-api/context/keystoneContext';
import { enqueueSourceImport } from 'livoice-api/jobs/queues';
import { runForever } from './utils/loop';

const SLEEP_MS = 60_000;

const isDue = (cronExpression: string, lastCompletedAt?: Date | null) => {
  try {
    const interval = CronExpressionParser.parse(cronExpression);
    const previous = interval.prev().toDate();
    if (!lastCompletedAt) return true;
    return lastCompletedAt < previous;
  } catch {
    return false;
  }
};

export const start = async () => {
  const context = await getKeystoneContext();
  const prisma = context.sudo().prisma;

  await runForever(async () => {
    const sources = await prisma.source.findMany({
      where: {
        importCronExpression: { not: '' },
        NOT: { importStatus: 'importing' }
      },
      select: { id: true, importCronExpression: true, importCompletedAt: true }
    });

    const dueSources = sources.filter(({ importCronExpression, importCompletedAt }) =>
      isDue(importCronExpression, importCompletedAt)
    );

    if (!dueSources.length) return;

    const now = new Date();
    const ids = dueSources.map(({ id }) => id);

    await prisma.source.updateMany({
      where: { id: { in: ids } },
      data: { importStatus: 'importing', importStartedAt: now }
    });

    console.log(`[scheduler] enqueuing ${dueSources.length} source imports...`);
    await Promise.all(dueSources.map(({ id }) => enqueueSourceImport(id)));
    console.log('[scheduler] enqueue complete');
  }, SLEEP_MS);
};
