import { setTimeout as sleep } from 'timers/promises';
import UserAgent from 'user-agents';

const DEFAULT_DELAY_MIN = 600;
const DEFAULT_DELAY_MAX = 1800;

export const randomDelay = (minMs = DEFAULT_DELAY_MIN, maxMs = DEFAULT_DELAY_MAX) =>
  sleep(Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs);

export const proxyFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  if (!globalThis.fetch) throw new Error('global fetch is not available; please provide a fetch implementation');

  const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : (input as Request).url;
  const isRequest = typeof Request !== 'undefined' && input instanceof Request;
  const baseOptions: RequestInit = isRequest
    ? {
        method: (input as Request).method,
        headers: (input as Request).headers,
        body: (input as Request).body as unknown as BodyInit
      }
    : (init ?? {});

  const options: RequestInit = {
    ...baseOptions,
    ...init
  };

  const userAgent = new UserAgent();
  options.headers = {
    ...options.headers,
    'User-Agent': userAgent.toString()
  };

  if (options.body) {
    options.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
    options.method = options.method ?? 'post';
  }

  const proxiedUrl = `https://req-proxy.igalst.workers.dev/${encodeURIComponent(url)}`;

  try {
    await randomDelay();
    return globalThis.fetch(proxiedUrl, options);
  } catch (error) {
    console.info('[youtubeAdapter] fetch error:', error);
    return Promise.resolve(new Response(null));
  }
};
