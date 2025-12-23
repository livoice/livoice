import { graphql as g } from '@keystone-6/core';
import type { KeystoneContext } from '@keystone-6/core/types';
import type { Session } from '../../auth';
import {
  ChatConfig,
  ChatHistoryItem,
  MessageDebugData,
  SegmentReference,
  fetchChatHistory,
  getSystemPromptReplacements,
  runChatConversation
} from '../../services/chat';

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

const ChatConfigOpenAI = g.object<ChatConfig['openai']>()({
  name: 'ChatConfigOpenAI',
  fields: {
    model: g.field({ type: g.nonNull(g.String) }),
    temperature: g.field({ type: g.nonNull(g.Float) }),
    maxOutputTokens: g.field({ type: g.nonNull(g.Int) })
  }
});

const ChatConfigContext = g.object<ChatConfig['context']>()({
  name: 'ChatConfigContext',
  fields: {
    maxInputTokens: g.field({ type: g.nonNull(g.Int) }),
    reservedTokens: g.field({ type: g.nonNull(g.Int) }),
    historyTokenBudget: g.field({ type: g.nonNull(g.Int) })
  }
});

const ChatConfigSegments = g.object<ChatConfig['segments']>()({
  name: 'ChatConfigSegments',
  fields: {
    tokenBudget: g.field({ type: g.nonNull(g.Int) }),
    maxCount: g.field({ type: g.nonNull(g.Int) })
  }
});

const ChatConfigType = g.object<ChatConfig>()({
  name: 'ChatConfig',
  fields: {
    systemPrompt: g.field({ type: g.nonNull(g.String) }),
    openai: g.field({ type: g.nonNull(ChatConfigOpenAI) }),
    context: g.field({ type: g.nonNull(ChatConfigContext) }),
    segments: g.field({ type: g.nonNull(ChatConfigSegments) })
  }
});

const ChatConfigOpenAIInput = g.inputObject({
  name: 'ChatConfigOpenAIInput',
  fields: {
    model: g.arg({ type: g.String }),
    temperature: g.arg({ type: g.Float }),
    maxOutputTokens: g.arg({ type: g.Int })
  }
});

const ChatConfigContextInput = g.inputObject({
  name: 'ChatConfigContextInput',
  fields: {
    maxInputTokens: g.arg({ type: g.Int }),
    reservedTokens: g.arg({ type: g.Int }),
    historyTokenBudget: g.arg({ type: g.Int })
  }
});

const ChatConfigSegmentsInput = g.inputObject({
  name: 'ChatConfigSegmentsInput',
  fields: {
    tokenBudget: g.arg({ type: g.Int }),
    maxCount: g.arg({ type: g.Int })
  }
});

const ChatConfigInput = g.inputObject({
  name: 'ChatConfigInput',
  fields: {
    systemPrompt: g.arg({ type: g.String }),
    openai: g.arg({ type: ChatConfigOpenAIInput }),
    context: g.arg({ type: ChatConfigContextInput }),
    segments: g.arg({ type: ChatConfigSegmentsInput })
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
    config: g.field({ type: g.nonNull(ChatConfigType) }),
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
    config: g.field({ type: ChatConfigType })
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

const TranscriptChatInput = g.inputObject({
  name: 'ChatTranscriptInput',
  fields: {
    chatId: g.arg({ type: g.ID }),
    transcriptId: g.arg({ type: g.nonNull(g.ID) }),
    message: g.arg({ type: g.nonNull(g.String) }),
    systemPrompt: g.arg({ type: g.nonNull(g.String) }),
    config: g.arg({ type: ChatConfigInput })
  }
});

const ProjectChatInput = g.inputObject({
  name: 'ChatProjectInput',
  fields: {
    chatId: g.arg({ type: g.ID }),
    projectId: g.arg({ type: g.nonNull(g.ID) }),
    message: g.arg({ type: g.nonNull(g.String) }),
    systemPrompt: g.arg({ type: g.nonNull(g.String) }),
    config: g.arg({ type: ChatConfigInput })
  }
});

type ChatConfigInputMaybe = {
  systemPrompt?: string | null;
  openai?: {
    model?: string | null;
    temperature?: number | null;
    maxOutputTokens?: number | null;
  } | null;
  context?: {
    maxInputTokens?: number | null;
    reservedTokens?: number | null;
    historyTokenBudget?: number | null;
  } | null;
  segments?: {
    tokenBudget?: number | null;
    maxCount?: number | null;
  } | null;
};

const normalizeChatConfigInput = (config?: ChatConfigInputMaybe | null): Partial<ChatConfig> | null => {
  if (!config) return null;
  const openai: Partial<ChatConfig['openai']> | undefined = config.openai ? {} : undefined;
  if (openai) {
    if (config.openai?.model != null) openai.model = config.openai.model;
    if (config.openai?.temperature != null) openai.temperature = config.openai.temperature;
    if (config.openai?.maxOutputTokens != null) openai.maxOutputTokens = config.openai.maxOutputTokens;
  }

  const context: Partial<ChatConfig['context']> | undefined = config.context ? {} : undefined;
  if (context) {
    if (config.context?.maxInputTokens != null) context.maxInputTokens = config.context.maxInputTokens;
    if (config.context?.reservedTokens != null) context.reservedTokens = config.context.reservedTokens;
    if (config.context?.historyTokenBudget != null) context.historyTokenBudget = config.context.historyTokenBudget;
  }

  const segments: Partial<ChatConfig['segments']> | undefined = config.segments ? {} : undefined;
  if (segments) {
    if (config.segments?.tokenBudget != null) segments.tokenBudget = config.segments.tokenBudget;
    if (config.segments?.maxCount != null) segments.maxCount = config.segments.maxCount;
  }

  const payload: Partial<ChatConfig> = {};
  if (config.systemPrompt != null) payload.systemPrompt = config.systemPrompt;
  if (openai) payload.openai = openai as ChatConfig['openai'];
  if (context) payload.context = context as ChatConfig['context'];
  if (segments) payload.segments = segments as ChatConfig['segments'];
  return payload;
};

const getSession = (context: KeystoneContext) => {
  const session = context.session as Session | undefined;
  if (!session?.id) throw new Error('Unauthorized');
  return session;
};

const findLatestChat = async ({
  context,
  where,
  projectId,
  transcriptId
}: {
  context: KeystoneContext;
  where: Record<string, unknown>;
  projectId?: string;
  transcriptId?: string;
}) => {
  const chats = await context.sudo().query.Chat.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }],
    take: 1,
    query: 'id title systemPrompt config'
  });
  const record = chats?.[0];
  if (!record?.id) return null;
  const history = await fetchChatHistory(context, record.id);

  const storedSystemPrompt = record.config?.systemPrompt ?? record.systemPrompt;

  let resolvedSystemPrompt = '';
  if (storedSystemPrompt) {
    const { projectName, transcriptTitles, sourceNames } = await getSystemPromptReplacements({
      context,
      projectId,
      transcriptId
    });
    resolvedSystemPrompt = storedSystemPrompt
      .replace(/\{projectName\}/g, projectName)
      .replace(/\{transcriptTitles\}/g, transcriptTitles.map(title => `- ${title}`).join(',\n'))
      .replace(/\{sourceNames\}/g, sourceNames.map(title => `- ${title}`).join(',\n'));
  }

  return {
    chatId: record.id,
    title: record.title,
    messages: history,
    systemPrompt: storedSystemPrompt,
    resolvedSystemPrompt,
    config: record.config ?? null
  };
};

export const ChatExtension = () => ({
  query: {
    chatTranscriptHistory: g.field({
      type: g.nonNull(ChatHistoryResult),
      args: {
        transcriptId: g.arg({ type: g.nonNull(g.ID) }),
        chatId: g.arg({ type: g.ID })
      },
      resolve: async (_root, { transcriptId, chatId }, context) => {
        const session = getSession(context);
        const history = await findLatestChat({
          context,
          where: {
            transcript: { id: { equals: transcriptId } },
            org: { id: { equals: session.orgId } },
            ...(chatId ? { id: { equals: chatId } } : {})
          },
          transcriptId
        });
        if (!history) return { chatId: null, messages: [] };
        return history;
      }
    }),
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
    chatTranscript: g.field({
      type: g.nonNull(ChatMutationResult),
      args: {
        input: g.arg({ type: g.nonNull(TranscriptChatInput) })
      },
      resolve: async (_root, { input }, context) => {
        const session = getSession(context);
        return runChatConversation({
          context,
          session,
          input: {
            chatId: input.chatId ?? null,
            transcriptId: input.transcriptId,
            message: input.message,
            systemPrompt: input.systemPrompt,
            config: normalizeChatConfigInput(input.config) as Partial<ChatConfig> | null
          }
        });
      }
    }),
    chatProject: g.field({
      type: g.nonNull(ChatMutationResult),
      args: {
        input: g.arg({ type: g.nonNull(ProjectChatInput) })
      },
      resolve: async (_root, { input }, context) => {
        const session = getSession(context);
        return runChatConversation({
          context,
          session,
          input: {
            chatId: input.chatId ?? null,
            projectId: input.projectId,
            message: input.message,
            systemPrompt: input.systemPrompt,
            config: normalizeChatConfigInput(input.config)
          }
        });
      }
    })
  }
});
