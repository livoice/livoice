import 'livoice-api/config/env'; // Validate environment variables at startup (fail fast)
import * as analyzer from './analyzer';
import * as embedder from './embedder';
import * as sourceImporter from './sourceImporter';
import * as transcriptImporter from './transcriptImporter';

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('[workers] Unhandled Rejection at:', promise, 'reason:', reason);
  if (reason instanceof Error) {
    console.error('[workers] Unhandled rejection error message:', reason.message);
    console.error('[workers] Unhandled rejection error stack:', reason.stack);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', error => {
  console.error('[workers] Uncaught Exception:', error);
  console.error('[workers] Uncaught exception message:', error.message);
  console.error('[workers] Uncaught exception stack:', error.stack);
  process.exit(1);
});

const start = async () => {
  // console.log('[workers] starting scheduler...');
  // void scheduler.start();

  console.log('[workers] starting source importer...');
  void sourceImporter.start();

  console.log('[workers] starting transcript importer...');
  void transcriptImporter.start();

  console.log('[workers] starting analyzer...');
  void analyzer.start();

  console.log('[workers] starting embedder...');
  await embedder.start();
};

start().catch(error => {
  console.error('Worker fatal error', error);
  process.exit(1);
});
