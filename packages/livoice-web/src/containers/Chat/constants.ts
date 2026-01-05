export const OPENAI_MODELS = [
  { value: 'gpt-4o', label: 'GPT-4o (Most capable)' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Fast, cost-effective)' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo (128k context)' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo (Legacy, fastest)' }
] as const;

import type { ChatConfigForm } from './types';

export const DEFAULT_CHAT_CONFIG: ChatConfigForm = {
  name: '',
  notes: '',
  systemPrompt: '',
  openai: {
    model: 'gpt-4o-mini',
    temperature: 0.25,
    maxOutputTokens: 700
  },
  context: {
    maxInputTokens: 8000,
    reservedTokens: 1500,
    historyTokenBudget: 4000
  },
  segments: {
    tokenBudget: 2000,
    maxCount: 20
  }
};

export const CONFIG_RANGES = {
  temperature: { min: 0, max: 1, step: 0.05 },
  maxOutputTokens: { min: 100, max: 4000, step: 50 },
  maxInputTokens: { min: 1000, max: 128000, step: 500 },
  reservedTokens: { min: 100, max: 5000, step: 100 },
  historyTokenBudget: { min: 500, max: 50000, step: 500 },
  segmentTokenBudget: { min: 500, max: 10000, step: 100 },
  maxSegments: { min: 5, max: 100, step: 5 }
};

