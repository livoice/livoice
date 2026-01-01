import Bottleneck from 'bottleneck';
import OpenAI from 'openai';
import env from '../config/env';
import { estimateTokens } from './tokenUtils';

const apiKey = env.OPENAI_API_KEY.trim();
export const openAiModel = env.OPENAI_MODEL || 'gpt-4o-mini';
export const embeddingModel = env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small';

type ChatCompletionParams = OpenAI.Chat.Completions.ChatCompletionCreateParams;
type NonStreamingChatParams = Omit<ChatCompletionParams, 'stream'> & { stream?: false };

const MAX_TOKENS_PER_MINUTE = 200_000;

const estimateChatTokens = (params: ChatCompletionParams) => {
  const messages = params.messages ?? [];
  const messageTokens = messages.reduce(
    (total, message) =>
      total + estimateTokens(typeof message.content === 'string' ? message.content : JSON.stringify(message.content)),
    0
  );

  return Math.max(1, messageTokens + (params.max_tokens ?? 0));
};

const estimateEmbeddingTokens = (input: string[]) =>
  input.reduce((total, text) => total + estimateTokens(text ?? ''), 0);

let client: OpenAI | null = null;

const ensureClient = () => {
  if (!apiKey) throw new Error('OPENAI_API_KEY is not configured');

  return client ?? (client = new OpenAI({ apiKey }));
};

const limiter = new Bottleneck({
  reservoir: MAX_TOKENS_PER_MINUTE,
  reservoirRefreshAmount: MAX_TOKENS_PER_MINUTE,
  reservoirRefreshInterval: 60_000
  // maxConcurrent: null, // disable concurrent limit since we're rate-limiting by tokens
  // minTime: 100
});

const scheduleWithTokenTracking = async <
  T extends OpenAI.Chat.Completions.ChatCompletion | OpenAI.Embeddings.CreateEmbeddingResponse
>(
  estimatedTokens: number,
  task: () => Promise<T>
): Promise<T> => {
  const weight = Math.max(1, Math.round(estimatedTokens));
  const result = (await limiter.schedule({ weight }, task)) as T;

  const usageTokens = result?.usage?.total_tokens || 0;
  const delta = weight - (usageTokens as number);
  if (delta) await limiter.incrementReservoir(delta);

  return result;
};

export async function chatCompletion(params: NonStreamingChatParams): Promise<OpenAI.Chat.Completions.ChatCompletion> {
  const openai = ensureClient();
  return scheduleWithTokenTracking<OpenAI.Chat.Completions.ChatCompletion>(estimateChatTokens(params), () =>
    openai.chat.completions.create({
      ...params,
      stream: false
    })
  );
}

export async function createEmbeddings(input: string[]): Promise<number[][]> {
  if (!input.length) return [];

  const estimatedTokens = estimateEmbeddingTokens(input);
  const openai = ensureClient();

  const response = await scheduleWithTokenTracking(estimatedTokens, () =>
    openai.embeddings.create({
      model: embeddingModel,
      input
    })
  );

  if (!response.data || !response.data.length) {
    throw new Error('OpenAI returned no embeddings');
  }

  return response.data.map(item => item.embedding ?? []);
}
