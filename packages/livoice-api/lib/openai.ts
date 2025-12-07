import OpenAI from 'openai';
import env from '../config/env';

const apiKey = env.OPENAI_API_KEY.trim();
let client: OpenAI | null = null;

const ensureClient = () => {
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  if (!client) {
    client = new OpenAI({ apiKey });
  }

  return client;
};

export const getOpenAIClient = () => ensureClient();
export const openAiModel = env.OPENAI_MODEL || 'gpt-4o-mini';
export const embeddingModel = env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small';

export const createEmbeddings = async (input: string[]): Promise<number[][]> => {
  if (!input.length) return [];

  const openai = ensureClient();
  const response = await openai.embeddings.create({
    model: embeddingModel,
    input
  });

  if (!response.data || !response.data.length) {
    throw new Error('OpenAI returned no embeddings');
  }

  return response.data.map(item => item.embedding ?? []);
};
