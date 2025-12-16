import { Queue } from 'bullmq';
import { connection } from './connection';

export const importSourceQueue = new Queue('import-source', { connection });

export const enqueueSourceImport = (sourceId: string) => importSourceQueue.add('import-source', { sourceId });
