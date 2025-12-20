import 'livoice-api/config/env'; // Validate environment variables at startup (fail fast)
import * as embedder from './embedder';
import * as importer from './importer';
import * as scheduler from './scheduler';
import * as transcriber from './transcriber';

const start = async () => {
  console.log('[workers] starting scheduler...');
  scheduler.start();

  console.log('[workers] starting importer...');
  importer.start();

  console.log('[workers] starting transcriber...');
  void transcriber.start();

  console.log('[workers] starting embedder...');
  await embedder.start();
};

start().catch(error => {
  console.error('Worker fatal error', error);
  process.exit(1);
});
