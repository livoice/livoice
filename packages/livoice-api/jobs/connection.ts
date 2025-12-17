import { RedisOptions } from 'bullmq';
import env from '../config/env';

const useTls = env.REDIS_TLS === 'true';

export const connection: RedisOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD || undefined,
  tls: useTls ? {} : undefined,
  maxRetriesPerRequest: null
};
