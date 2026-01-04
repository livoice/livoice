import type { ChatConfig } from './types';

export const DEFAULT_CHAT_CONFIG: ChatConfig = {
  name: '',
  systemPrompt: '',
  openai: {
    model: 'gpt-4o-mini',
    temperature: 0.25,
    maxOutputTokens: 700
  },
  context: {
    maxInputTokens: 16000,
    reservedTokens: 1500,
    historyTokenBudget: 4000
  },
  segments: {
    tokenBudget: 4000,
    maxCount: 30
  }
};

