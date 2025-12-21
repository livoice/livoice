import { graphql as g } from '@keystone-6/core';
import type { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import type { KeystoneContext } from '@keystone-6/core/types';
import type { Session } from '../../auth';
import { ChatHistoryItem, SegmentReference, fetchChatHistory, runChatConversation } from '../../services/chat';

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

const ProjectChatInput = g.inputObject({
  name: 'ChatProjectInput',
  fields: {
    chatId: g.arg({ type: g.ID }),
    projectId: g.arg({ type: g.nonNull(g.ID) }),
    message: g.arg({ type: g.nonNull(g.String) })
  }
});

const getSession = (context: KeystoneContext) => {
  const session = context.session as Session | undefined;
  if (!session?.id) throw new Error('Unauthorized');
  return session;
};

const findLatestChat = async ({ context, where }: { context: KeystoneContext; where: Record<string, unknown> }) => {
  const chats = await context.sudo().query.Chat.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }],
    take: 1,
    query: 'id'
  });
  const record = chats?.[0];
  if (!record?.id) return null;
  const history = await fetchChatHistory(context, record.id);
  return { chatId: record.id, messages: history };
};

export const ChatExtension = (_base: BaseSchemaMeta) => ({
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
          }
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
        return runChatConversation({
          context,
          session,
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
