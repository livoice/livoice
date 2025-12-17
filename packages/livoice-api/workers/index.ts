import { startEmbeddingWorker } from './embeddingWorker';
import { startImportWorker } from './importWorker';
import { startScheduler } from './scheduler';
import { startTranscriptWorker } from './transcriptWorker';

const start = async () => {
  console.log('[workers] starting scheduler...');
  startScheduler();

  console.log('[workers] starting import worker...');
  startImportWorker();

  console.log('[workers] starting transcript worker...');
  void startTranscriptWorker();

  console.log('[workers] starting embedding worker...');
  await startEmbeddingWorker();
};

start().catch(error => {
  console.error('Worker fatal error', error);
  process.exit(1);
});
