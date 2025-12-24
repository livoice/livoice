import type { ChatMessageDebugData } from '@/gql/generated';

export type ChatMessageItem = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: string | null;
  debugData?: ChatMessageDebugData | null;
};

export type ChatConfigForm = {
  systemPrompt: string;
  openai: {
    model: string;
    temperature: number;
    maxOutputTokens: number;
  };
  context: {
    maxInputTokens: number;
    reservedTokens: number;
    historyTokenBudget: number;
  };
  segments: {
    tokenBudget: number;
    maxCount: number;
  };
};

export type UniqueConfigEntry = {
  key: string;
  config: ChatConfigForm;
  chatTitle: string;
  projectName: string | null;
  createdAt: string;
};

export type ChatConfigOutletContext = {
  configs: UniqueConfigEntry[];
  currentConfig: ChatConfigForm;
  onClose: () => void;
  onApply: (config: ChatConfigForm) => void;
};

export type ChatDebugOutletContext = {
  message: ChatMessageItem;
  debugData: NonNullable<ChatMessageItem['debugData']>;
  onClose: () => void;
};

