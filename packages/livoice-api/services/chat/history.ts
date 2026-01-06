import type { KeystoneContext } from '@keystone-6/core/types';
import { estimateTokens } from '../../lib/tokenUtils';
import type { ChatHistoryItem, OpenAiMessagesResult } from './types';

// Take messages from end while under token limit
const takeMessagesWithinLimit = (
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  tokenLimit: number
): { included: Array<{ role: 'user' | 'assistant'; content: string }>; currentTokens: number } => {
  const reversed = [...messages].reverse();

  const { included, currentTokens } = reversed.reduce(
    (acc, msg) => {
      if (acc.exceeded) return acc;

      const msgTokens = estimateTokens(msg.content);
      const newTotal = acc.currentTokens + msgTokens;

      return newTotal <= tokenLimit
        ? {
            included: [msg, ...acc.included],
            currentTokens: newTotal,
            exceeded: false
          }
        : { ...acc, exceeded: true };
    },
    { included: [] as typeof messages, currentTokens: 0, exceeded: false }
  );

  return { included, currentTokens };
};

export const fetchChatHistory = async (context: KeystoneContext, chatId: string): Promise<ChatHistoryItem[]> => {
  const sudoContext = context.sudo();
  const messages = await sudoContext.query.ChatMessage.findMany({
    where: { chat: { id: { equals: chatId } } },
    orderBy: [{ createdAt: 'asc' }],
    query: 'id role content createdAt debugData'
  });

  return messages.map(msg => ({
    id: msg.id,
    role: msg.role as 'user' | 'assistant',
    content: msg.content,
    createdAt: msg.createdAt ?? null,
    debugData: msg.debugData ?? null
  }));
};

export const getOpenAiMessages = ({
  history,
  systemPrompt,
  userMessage,
  maxContextTokens = 6000,
  reservedTokens = 1000,
  historyTokenBudget = 4000
}: {
  history: { role: 'user' | 'assistant'; content: string }[];
  systemPrompt: string;
  userMessage: string;
  maxContextTokens?: number;
  reservedTokens?: number;
  historyTokenBudget?: number;
}): OpenAiMessagesResult => {
  const fixedTokens = estimateTokens(systemPrompt) + estimateTokens(userMessage) + reservedTokens;
  const availableTokens = Math.max(maxContextTokens - fixedTokens, 0);
  const historyBudget = Math.min(historyTokenBudget, availableTokens);
  const { included: includedHistory, currentTokens: historyTokens } = takeMessagesWithinLimit(history, historyBudget);
  const historyMessages = includedHistory.map(msg => ({
    ...msg,
    tokens: estimateTokens(msg.content)
  }));

  return {
    historyTokens,
    historyCount: includedHistory.length,
    historyMessages,
    budget: {
      fixedTokens,
      maxContextTokens,
      availableTokens,
      historyBudget,
      reservedTokens
    },
    messages: [
      { role: 'system' as const, content: systemPrompt },
      ...includedHistory,
      { role: 'user' as const, content: userMessage }
    ]
  };
};
