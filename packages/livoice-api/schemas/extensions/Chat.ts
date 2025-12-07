import { graphql as g } from '@keystone-6/core';
import type { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import type { Session } from '../../auth';
import { ChatHistoryItem, SegmentReference, loadChatHistory, runChatConversation } from '../../services/chat';

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

const ChatMessageResult = g.object<ChatHistoryItem>()({
  name: 'ChatMessageResult',
  fields: {
    id: g.field({ type: g.nonNull(g.ID) }),
    role: g.field({ type: g.nonNull(g.String) }),
    content: g.field({ type: g.nonNull(g.String) }),
    createdAt: g.field({ type: g.String }),
    segments: g.field({ type: g.nonNull(g.list(g.nonNull(ChatSegmentReference))) })
  }
});

const ChatHistoryResult = g.object<{ chatId: string | null; messages: ChatHistoryItem[] }>()({
  name: 'ChatHistoryResult',
  fields: {
    chatId: g.field({ type: g.ID }),
    messages: g.field({ type: g.nonNull(g.list(g.nonNull(ChatMessageResult))) })
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
    message: g.arg({ type: g.nonNull(g.String) })
  }
});

const ProjectChatInput = g.inputObject({
  name: 'ChatProjectInput',
  fields: {
    chatId: g.arg({ type: g.ID }),
    projectId: g.arg({ type: g.nonNull(g.ID) }),
    message: g.arg({ type: g.nonNull(g.String) })
  }
});

const getSession = (context: BaseSchemaMeta['context']) => {
  const session = context.session as Session | undefined;
  if (!session?.id) throw new Error('Unauthorized');
  return session;
};

const findLatestChat = async ({
  context,
  where
}: {
  context: BaseSchemaMeta['context'];
  where: Record<string, unknown>;
}) => {
  const chats = await context.sudo().query.Chat.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }],
    take: 1,
    query: 'id'
  });
  const record = chats?.[0];
  if (!record?.id) return null;
  const history = await loadChatHistory(context, record.id);
  return { chatId: record.id, messages: history };
};

export const ChatExtension = (base: BaseSchemaMeta) => ({
  query: {
    chatTranscriptHistory: g.field({
      type: g.nonNull(ChatHistoryResult),
      args: {
        transcriptId: g.arg({ type: g.nonNull(g.ID) })
      },
      resolve: async (_root, { transcriptId }, context) => {
        const session = getSession(context);
        const history = await findLatestChat({
          context,
          where: {
            contextType: { equals: 'TRANSCRIPT' },
            transcript: { id: { equals: transcriptId } },
            org: { id: { equals: session.orgId } }
          }
        });
        if (!history) return { chatId: null, messages: [] };
        return history;
      }
    }),
    chatProjectHistory: g.field({
      type: g.nonNull(ChatHistoryResult),
      args: {
        projectId: g.arg({ type: g.nonNull(g.ID) })
      },
      resolve: async (_root, { projectId }, context) => {
        const session = getSession(context);
        const history = await findLatestChat({
          context,
          where: {
            contextType: { equals: 'PROJECT' },
            project: { id: { equals: projectId } },
            org: { id: { equals: session.orgId } }
          }
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
          contextType: 'TRANSCRIPT',
          input: {
            chatId: input.chatId ?? null,
            transcriptId: input.transcriptId,
            message: input.message
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
          contextType: 'PROJECT',
          input: {
            chatId: input.chatId ?? null,
            projectId: input.projectId,
            message: input.message
          }
        });
      }
    })
  }
});
