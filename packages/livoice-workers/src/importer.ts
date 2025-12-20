import { Worker } from 'bullmq';
import { connection } from 'livoice-api/jobs/connection';
import { processImportSource } from 'livoice-api/jobs/processors/importSource';

export const start = () => {
  const worker = new Worker('import-source', processImportSource, {
    connection,
    concurrency: 3
  });

  worker.on('completed', job => {
    console.log(`[importer] completed job ${job.id} (${job.name})`);
  });

  worker.on('failed', (job, err) => {
    console.error(`[importer] failed job ${job?.id} (${job?.name}):`, err?.message ?? err);
  });

  return worker;
};
