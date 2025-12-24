/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { useChatConfigsQuery } from '@/gql/generated';
import { DEFAULT_CHAT_CONFIG } from './constants';
import type { ChatConfigForm, UniqueConfigEntry } from './types';

const normalizeConfig = (raw: Record<string, unknown>): ChatConfigForm => ({
  name: typeof raw.name === 'string' ? raw.name : DEFAULT_CHAT_CONFIG.name,
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
  chatConfig: ChatConfigForm;
  setChatConfig: (config: ChatConfigForm) => void;
  configs: UniqueConfigEntry[];
  configsLoading: boolean;
};

export const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chatConfig, setChatConfig] = useState<ChatConfigForm>(DEFAULT_CHAT_CONFIG);
  const { chatId, projectId } = useParams<{ chatId?: string; projectId?: string }>();

  const { data: configsData, loading: configsLoading, refetch: refetchConfigs } = useChatConfigsQuery();

  const configs = useMemo(() => {
    const chats = configsData?.chats ?? [];
    const configMap = new Map<string, UniqueConfigEntry>();

    chats.forEach(chat => {
      const rawConfig = chat?.config;
      if (!rawConfig) return;
      const normalizedConfig = normalizeConfig(rawConfig);
      const { name: configName, ...configWithoutName } = normalizedConfig;
      const key = JSON.stringify(configWithoutName);
      if (configMap.has(key)) return;
      const createdAt = chat.createdAt ?? new Date().toISOString();
      configMap.set(key, {
        key,
        config: normalizedConfig,
        chatTitle: (chat as { title?: string }).title || 'Untitled chat',
        projectName: chat.project?.name ?? null,
        createdAt
      });
    });

    return Array.from(configMap.values()).sort(
      (configA, configB) => new Date(configB.createdAt).getTime() - new Date(configA.createdAt).getTime()
    );
  }, [configsData?.chats]);

  useEffect(() => {
    // Reset to defaults and refresh available configs whenever chat changes
    setChatConfig(DEFAULT_CHAT_CONFIG);
    void refetchConfigs();
  }, [chatId, projectId, refetchConfigs]);

  return (
    <ChatContext.Provider value={{ chatConfig, setChatConfig, configs, configsLoading }}>
      {children}
    </ChatContext.Provider>
  );
}
