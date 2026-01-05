/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { useChatConfigsQuery } from '@/gql/generated';
import { DEFAULT_CHAT_CONFIG } from './constants';
import type { ChatConfigEntry, ChatConfigForm } from './types';

const normalizeConfig = (raw: Record<string, unknown>): Omit<ChatConfigForm, 'name' | 'notes'> => ({
  systemPrompt: typeof raw.systemPrompt === 'string' ? raw.systemPrompt : DEFAULT_CHAT_CONFIG.systemPrompt,
  openai: {
    model:
      typeof (raw.openai as Record<string, unknown>)?.model === 'string'
        ? ((raw.openai as Record<string, unknown>).model as string)
        : DEFAULT_CHAT_CONFIG.openai.model,
    temperature:
      typeof (raw.openai as Record<string, unknown>)?.temperature === 'number'
        ? ((raw.openai as Record<string, unknown>).temperature as number)
        : DEFAULT_CHAT_CONFIG.openai.temperature,
    maxOutputTokens:
      typeof (raw.openai as Record<string, unknown>)?.maxOutputTokens === 'number'
        ? ((raw.openai as Record<string, unknown>).maxOutputTokens as number)
        : DEFAULT_CHAT_CONFIG.openai.maxOutputTokens
  },
  context: {
    maxInputTokens:
      typeof (raw.context as Record<string, unknown>)?.maxInputTokens === 'number'
        ? ((raw.context as Record<string, unknown>).maxInputTokens as number)
        : DEFAULT_CHAT_CONFIG.context.maxInputTokens,
    reservedTokens:
      typeof (raw.context as Record<string, unknown>)?.reservedTokens === 'number'
        ? ((raw.context as Record<string, unknown>).reservedTokens as number)
        : DEFAULT_CHAT_CONFIG.context.reservedTokens,
    historyTokenBudget:
      typeof (raw.context as Record<string, unknown>)?.historyTokenBudget === 'number'
        ? ((raw.context as Record<string, unknown>).historyTokenBudget as number)
        : DEFAULT_CHAT_CONFIG.context.historyTokenBudget
  },
  segments: {
    tokenBudget:
      typeof (raw.segments as Record<string, unknown>)?.tokenBudget === 'number'
        ? ((raw.segments as Record<string, unknown>).tokenBudget as number)
        : DEFAULT_CHAT_CONFIG.segments.tokenBudget,
    maxCount:
      typeof (raw.segments as Record<string, unknown>)?.maxCount === 'number'
        ? ((raw.segments as Record<string, unknown>).maxCount as number)
        : DEFAULT_CHAT_CONFIG.segments.maxCount
  }
});

export type ChatContextType = {
  selectedConfigId: string | null;
  setSelectedConfigId: (id: string | null) => void;
  configs: ChatConfigEntry[];
  configsLoading: boolean;
  refetchConfigs: () => void;
  getSelectedConfig: () => ChatConfigEntry | null;
};

export const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null);
  const { chatId, projectId } = useParams<{ chatId?: string; projectId?: string }>();

  const { data: configsData, loading: configsLoading, refetch: refetchConfigs } = useChatConfigsQuery();

  const configs: ChatConfigEntry[] = useMemo(() => {
    const rawConfigs = configsData?.chatConfigs ?? [];
    return rawConfigs.map(config => {
      const normalized = normalizeConfig({
        systemPrompt: config.systemPrompt,
        openai: config.openai,
        context: config.context,
        segments: config.segments
      });
      return {
        id: config.id,
        name: config.name ?? '',
        notes: config.notes ?? '',
        systemPrompt: normalized.systemPrompt,
        openai: normalized.openai,
        context: normalized.context,
        segments: normalized.segments,
        createdAt: config.createdAt ?? new Date().toISOString(),
        updatedAt: config.updatedAt ?? new Date().toISOString()
      };
    });
  }, [configsData?.chatConfigs]);

  const getSelectedConfig = (): ChatConfigEntry | null => {
    if (!selectedConfigId) return null;
    return configs.find(({ id }) => id === selectedConfigId) ?? null;
  };

  useEffect(() => {
    // Reset selection whenever chat changes
    setSelectedConfigId(null);
  }, [chatId, projectId]);

  // Auto-select first config when configs load and none is selected
  useEffect(() => {
    if (!configsLoading && configs.length && !selectedConfigId) {
      setSelectedConfigId(configs[0].id);
    }
  }, [configsLoading, configs, selectedConfigId]);

  return (
    <ChatContext.Provider
      value={{
        selectedConfigId,
        setSelectedConfigId,
        configs,
        configsLoading,
        refetchConfigs: () => void refetchConfigs(),
        getSelectedConfig
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
