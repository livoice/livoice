import env from '../config/env';

type CloudflareResponse<T> = {
  success: boolean;
  errors?: Array<{ message?: string }>;
  result: T;
};

type CopyResult = { uid?: string };
type StreamStatusResult = { readyToStream?: boolean };
type AudioStatusResult = { audio?: { status?: string; url?: string } };

const BASE_URL = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/stream`;

const callCloudflare = async <T>(path: string, init?: RequestInit) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    }
  });

  const payload = (await response.json()) as CloudflareResponse<T>;
  if (!response.ok || !payload.success) {
    const message = payload.errors?.[0]?.message ?? `Cloudflare Stream request failed (${response.status})`;
    throw new Error(message);
  }

  return payload.result;
};

export const copyVideoFromUrl = async (url: string, meta: Record<string, string> = {}) => {
  const result = await callCloudflare<CopyResult>('/copy', {
    method: 'POST',
    body: JSON.stringify({ url, meta })
  });

  if (!result?.uid) throw new Error('Cloudflare Stream did not return a stream uid');
  return result.uid;
};

export const isReady = async (streamId: string) => {
  const result = await callCloudflare<StreamStatusResult>(`/${streamId}`, { method: 'GET' });
  return Boolean(result?.readyToStream);
};

export const requestAudioDownload = async (streamId: string) => {
  await callCloudflare<AudioStatusResult>(`/${streamId}/downloads/audio`, { method: 'POST' });
};

export const isAudioReady = async (streamId: string) => {
  const result = await callCloudflare<AudioStatusResult>(`/${streamId}/downloads`, { method: 'GET' });
  return result?.audio?.status === 'ready';
};

export const getAudioUrl = async (streamId: string) => {
  const result = await callCloudflare<AudioStatusResult>(`/${streamId}/downloads`, { method: 'GET' });
  const audioUrl = result?.audio?.url;
  if (!audioUrl || result?.audio?.status !== 'ready') throw new Error(`Audio download is not ready for stream ${streamId}`);
  return audioUrl;
};
