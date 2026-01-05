import type { ChatMessageDebugData } from '@/gql/generated';

export type ChatMessageItem = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: string | null;
  debugData?: ChatMessageDebugData | null;
};

export interface ChatConfigForm {
  name: string;
  notes: string;
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
}

export type ChatConfigEntry = {
  id: string;
  name: string;
  notes: string;
  systemPrompt: string;
  openai: ChatConfigForm['openai'];
  context: ChatConfigForm['context'];
  segments: ChatConfigForm['segments'];
  createdAt: string;
  updatedAt: string;
};

export type ChatConfigOutletContext = {
  configs: ChatConfigEntry[];
  selectedConfigId: string | null;
  onClose: () => void;
  onSelectConfig: (configId: string) => void;
};

export type ChatDebugOutletContext = {
  message: ChatMessageItem;
  debugData: NonNullable<ChatMessageItem['debugData']>;
  onClose: () => void;
};
