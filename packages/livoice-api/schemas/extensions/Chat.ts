import { graphql as g } from '@keystone-6/core';
import type { KeystoneContext } from '@keystone-6/core/types';
import type { Session } from '../../auth';
import {
  ChatConfig,
  ChatHistoryItem,
  MessageDebugData,
  SegmentReference,
  fetchChatHistory,
  runChatConversation
} from '../../services/chat';
import { replaceSystemPromptPlaceholders } from '../../services/chat/systemPrompt';

const ChatSegmentReference = g.object<SegmentReference>()({
  name: 'ChatSegmentReference',
  fields: {
    id: g.field({ type: g.nonNull(g.ID) }),
    text: g.field({ type: g.nonNull(g.String) }),
    startMs: g.field({ type: g.Int }),
    endMs: g.field({ type: g.Int }),
    speaker: g.field({ type: g.String }),
    transcriptTitle: g.field({ type: g.String })
  }
});

const ChatConfigSnapshotOpenAI = g.object<ChatConfig['openai']>()({
  name: 'ChatConfigSnapshotOpenAI',
  fields: {
    model: g.field({ type: g.nonNull(g.String) }),
    temperature: g.field({ type: g.nonNull(g.Float) }),
    maxOutputTokens: g.field({ type: g.nonNull(g.Int) })
  }
});

const ChatConfigSnapshotContext = g.object<ChatConfig['context']>()({
  name: 'ChatConfigSnapshotContext',
  fields: {
    maxInputTokens: g.field({ type: g.nonNull(g.Int) }),
    reservedTokens: g.field({ type: g.nonNull(g.Int) }),
    historyTokenBudget: g.field({ type: g.nonNull(g.Int) })
  }
});

const ChatConfigSnapshotSegments = g.object<ChatConfig['segments']>()({
  name: 'ChatConfigSnapshotSegments',
  fields: {
    tokenBudget: g.field({ type: g.nonNull(g.Int) }),
    maxCount: g.field({ type: g.nonNull(g.Int) })
  }
});

const ChatConfigSnapshotType = g.object<ChatConfig>()({
  name: 'ChatConfigSnapshot',
  fields: {
    id: g.field({ type: g.ID }),
    name: g.field({ type: g.String }),
    createdAt: g.field({ type: g.String }),
    systemPrompt: g.field({ type: g.nonNull(g.String) }),
    openai: g.field({ type: g.nonNull(ChatConfigSnapshotOpenAI) }),
    context: g.field({ type: g.nonNull(ChatConfigSnapshotContext) }),
    segments: g.field({ type: g.nonNull(ChatConfigSnapshotSegments) })
  }
});

const ChatMessageDebugHistoryMessage = g.object<{ role: 'user' | 'assistant'; content: string; tokens: number }>()({
  name: 'ChatMessageDebugHistoryMessage',
  fields: {
    role: g.field({ type: g.nonNull(g.String) }),
    content: g.field({ type: g.nonNull(g.String) }),
    tokens: g.field({ type: g.nonNull(g.Int) })
  }
});

const ChatMessageDebugHistory = g.object<MessageDebugData['history']>()({
  name: 'ChatMessageDebugHistory',
  fields: {
    messagesIncluded: g.field({ type: g.nonNull(g.Int) }),
    tokensUsed: g.field({ type: g.nonNull(g.Int) }),
    tokenBudget: g.field({ type: g.nonNull(g.Int) }),
    messages: g.field({ type: g.nonNull(g.list(g.nonNull(ChatMessageDebugHistoryMessage))) })
  }
});

const ChatMessageDebugSegment = g.object<MessageDebugData['segments'][0]>()({
  name: 'ChatMessageDebugSegment',
  fields: {
    id: g.field({ type: g.nonNull(g.ID) }),
    text: g.field({ type: g.nonNull(g.String) }),
    transcriptTitle: g.field({ type: g.String }),
    speaker: g.field({ type: g.String }),
    startMs: g.field({ type: g.Int }),
    endMs: g.field({ type: g.Int }),
    similarityScore: g.field({ type: g.Float }),
    estimatedTokens: g.field({ type: g.nonNull(g.Int) })
  }
});

const ChatMessageDebugOpenAIResponse = g.object<MessageDebugData['openaiResponse']>()({
  name: 'ChatMessageDebugOpenAIResponse',
  fields: {
    model: g.field({ type: g.nonNull(g.String) }),
    promptTokens: g.field({ type: g.Int }),
    completionTokens: g.field({ type: g.Int }),
    totalTokens: g.field({ type: g.Int })
  }
});

const ChatMessageDebugTiming = g.object<MessageDebugData['timing']>()({
  name: 'ChatMessageDebugTiming',
  fields: {
    startedAt: g.field({ type: g.nonNull(g.String) }),
    completedAt: g.field({ type: g.nonNull(g.String) })
  }
});

const ChatMessageDebugData = g.object<MessageDebugData>()({
  name: 'ChatMessageDebugData',
  fields: {
    config: g.field({ type: g.nonNull(ChatConfigSnapshotType) }),
    resolvedSystemPrompt: g.field({ type: g.nonNull(g.String) }),
    userMessageWithContext: g.field({ type: g.nonNull(g.String) }),
    history: g.field({ type: g.nonNull(ChatMessageDebugHistory) }),
    segments: g.field({ type: g.list(g.nonNull(ChatMessageDebugSegment)) }),
    segmentTokensUsed: g.field({ type: g.nonNull(g.Int) }),
    openaiResponse: g.field({ type: g.nonNull(ChatMessageDebugOpenAIResponse) }),
    timing: g.field({ type: g.nonNull(ChatMessageDebugTiming) })
  }
});

const ChatMessageResult = g.object<ChatHistoryItem>()({
  name: 'ChatMessageResult',
  fields: {
    id: g.field({ type: g.nonNull(g.ID) }),
    role: g.field({ type: g.nonNull(g.String) }),
    content: g.field({ type: g.nonNull(g.String) }),
    createdAt: g.field({ type: g.String }),
    debugData: g.field({ type: ChatMessageDebugData })
  }
});

const ChatHistoryResult = g.object<{
  chatId: string | null;
  title?: string | null;
  messages: ChatHistoryItem[];
  systemPrompt?: string | null;
  resolvedSystemPrompt?: string | null;
  config?: ChatConfig | null;
}>()({
  name: 'ChatHistoryResult',
  fields: {
    chatId: g.field({ type: g.ID }),
    title: g.field({ type: g.String }),
    messages: g.field({ type: g.nonNull(g.list(g.nonNull(ChatMessageResult))) }),
    systemPrompt: g.field({ type: g.String }),
    resolvedSystemPrompt: g.field({ type: g.String }),
    config: g.field({ type: ChatConfigSnapshotType })
  }
});

const ChatMutationResult = g.object<{
  chatId: string;
  answer: string;
  messages: ChatHistoryItem[];
  references: SegmentReference[];
}>()({
  name: 'ChatMutationResult',
  fields: {
    chatId: g.field({ type: g.nonNull(g.ID) }),
    answer: g.field({ type: g.nonNull(g.String) }),
    messages: g.field({ type: g.nonNull(g.list(g.nonNull(ChatMessageResult))) }),
    references: g.field({ type: g.nonNull(g.list(g.nonNull(ChatSegmentReference))) })
  }
});

const ProjectChatInput = g.inputObject({
  name: 'ChatProjectInput',
  fields: {
    chatId: g.arg({ type: g.ID }),
    projectId: g.arg({ type: g.nonNull(g.ID) }),
    message: g.arg({ type: g.nonNull(g.String) }),
    chatConfigId: g.arg({ type: g.ID })
  }
});

const getSession = (context: KeystoneContext) => {
  const session = context.session as Session | undefined;
  if (!session?.id) throw new Error('Unauthorized');
  return session;
};

const findLatestChat = async ({
  context,
  where,
  projectId
}: {
  context: KeystoneContext;
  where: Record<string, unknown>;
  projectId?: string;
}) => {
  const chats = await context.sudo().query.Chat.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }],
    take: 1,
    query: 'id title configSnapshot chatConfig { id name createdAt }'
  });
  const record = chats?.[0];
  if (!record?.id) return null;
  const history = await fetchChatHistory(context, record.id);

  const configSnapshot = record.configSnapshot as ChatConfig | null;
  const configWithMeta = configSnapshot
    ? {
        ...configSnapshot,
        id: configSnapshot?.id ?? (record.chatConfig as { id?: string } | null)?.id ?? undefined,
        createdAt:
          configSnapshot?.createdAt ?? (record.chatConfig as { createdAt?: string } | null)?.createdAt ?? undefined,
        name: configSnapshot?.name ?? (record.chatConfig as { name?: string } | null)?.name ?? undefined
      }
    : undefined;
  const storedSystemPrompt = configSnapshot?.systemPrompt ?? '';

  let resolvedSystemPrompt = '';
  if (storedSystemPrompt) {
    resolvedSystemPrompt = await replaceSystemPromptPlaceholders({
      systemPrompt: storedSystemPrompt,
      context,
      projectId
    });
  }

  return {
    chatId: record.id,
    title: record.title,
    messages: history,
    systemPrompt: storedSystemPrompt,
    resolvedSystemPrompt,
    config: configWithMeta
  };
};

export const ChatExtension = () => ({
  query: {
    chatProjectHistory: g.field({
      type: g.nonNull(ChatHistoryResult),
      args: {
        projectId: g.arg({ type: g.nonNull(g.ID) }),
        chatId: g.arg({ type: g.ID })
      },
      resolve: async (_root, { projectId, chatId }, context) => {
        const session = getSession(context);
        const history = await findLatestChat({
          context,
          where: {
            project: { id: { equals: projectId } },
            org: { id: { equals: session.orgId } },
            ...(chatId ? { id: { equals: chatId } } : {})
          },
          projectId
        });
        if (!history) return { chatId: null, messages: [] };
        return history;
      }
    })
  },
  mutation: {
    chatProject: g.field({
      type: g.nonNull(ChatMutationResult),
      args: {
        input: g.arg({ type: g.nonNull(ProjectChatInput) })
      },
      resolve: async (_root, { input }, context) => {
        const session = getSession(context);
        if (!input.chatId && !input.chatConfigId) throw new Error('ChatConfig ID is required when creating a new chat');
        return runChatConversation({
          context,
          session,
          input: {
            chatId: input.chatId ?? null,
            projectId: input.projectId,
            message: input.message,
            chatConfigId: input.chatConfigId ?? null
          }
        });
      }
    })
  }
});
