import { Worker } from 'bullmq';
import { connection } from '../jobs/connection';
import { processImportSource } from '../jobs/processors/importSource';

export const startImportWorker = () => {
  const worker = new Worker('import-source', processImportSource, {
    connection,
    concurrency: 3
  });

  worker.on('completed', job => {
    console.log(`[import-worker] completed job ${job.id} (${job.name})`);
  });

  worker.on('failed', (job, err) => {
    console.error(`[import-worker] failed job ${job?.id} (${job?.name}):`, err?.message ?? err);
  });

  return worker;
};
