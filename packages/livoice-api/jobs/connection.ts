import { RedisOptions } from 'bullmq';

const useTls = (process.env.REDIS_TLS ?? 'false').toLowerCase() === 'true';

export const connection: RedisOptions = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT ?? 6379),
  password: process.env.REDIS_PASSWORD || undefined,
  tls: useTls ? {} : undefined,
  maxRetriesPerRequest: null
};
