import type { KeystoneContext } from '@keystone-6/core/types';
import type { Session } from '../auth';
import { chatCompletion } from '../../lib/openai';
import { fetchSegments, selectSegmentsWithinBudget, mapSegmentReference, buildSegmentDescription } from './segments';
import { fetchSegmentActors } from './actors';
import { fetchChatHistory, getOpenAiMessages } from './history';
import { normalizeChatConfig, replaceSystemPromptPlaceholders } from './systemPrompt';
import { generateChatTitle } from './titleGeneration';
import type { ChatHistoryItem, ChatConfig, MessageDebugData, SegmentRecord } from './types';

type ProjectWithOrg = {
  id: string;
  name?: string | null;
  org?: { id?: string | null } | null;
};

export const runChatConversation = async ({
  context,
  session,
  input
}: {
  context: KeystoneContext;
  session: Session;
  input: {
    chatId?: string | null;
    projectId?: string;
    message: string;
    systemPrompt?: string | null;
    config?: Partial<ChatConfig> | null;
  };
}) => {
  if (!session?.id) throw new Error('Unauthorized');
  if (!session?.orgId) throw new Error('Missing organization context');
  const sudoContext = context.sudo();
  const messageText = input.message.trim();
  if (!messageText) throw new Error('Message cannot be empty');

  const fetchProjectContext = async (): Promise<ProjectWithOrg> => {
    if (!input.projectId) throw new Error('Project ID is required');
    const project = (await sudoContext.query.Project.findOne({
      where: { id: input.projectId },
      query: 'id name org { id }'
    })) as ProjectWithOrg | null;
    if (!project) throw new Error('Project not found');
    return project;
  };

  const targetProject = await fetchProjectContext();

  if (!targetProject?.org?.id) {
    throw new Error('Missing organization context for chat target');
  }

  const projectId = targetProject.id;

  const existingChatRecord = input.chatId
    ? await sudoContext.query.Chat.findOne({
        where: { id: input.chatId },
        query: 'config systemPrompt'
      })
    : null;

  const chatConfig = normalizeChatConfig(
    input.config ?? (existingChatRecord?.config as Partial<ChatConfig> | undefined),
    input.systemPrompt ?? existingChatRecord?.systemPrompt ?? undefined
  );

  const segments = await fetchSegments({
    context,
    projectId,
    queryText: messageText,
    maxSegments: chatConfig.segments.maxCount
  });
  if (!segments.length) throw new Error('No transcript segments found for this context yet');

  const segmentActorMap = await fetchSegmentActors(
    context,
    segments.map(segment => segment.id)
  );

  const referenceSegments = segments.slice(0, 3);
  const { selected: segmentsForPrompt, totalTokens: segmentsTokensUsed } = selectSegmentsWithinBudget(
    segments,
    chatConfig.segments.tokenBudget
  );
  const segmentsText = segmentsForPrompt
    .map(segment => buildSegmentDescription(segment, segmentActorMap[segment.id]))
    .join('\n\n');
  const userMessageWithContext = `${segmentsText}\n\nQuestion: ${messageText}`;

  const finalSystemPrompt = await replaceSystemPromptPlaceholders({
    systemPrompt: chatConfig.systemPrompt,
    context,
    projectId
  });

  const defaultTitle = `Project chat • ${targetProject?.name ?? 'untitled'}`;
  const title = input.chatId
    ? ''
    : ((await generateChatTitle({
        firstMessage: messageText,
        contextName: targetProject?.name
      })) ?? defaultTitle);

  const persistChat = async (): Promise<string | null> => {
    if (input.chatId) {
      const updated = await sudoContext.db.Chat.updateOne({
        where: { id: input.chatId },
        data: { systemPrompt: chatConfig.systemPrompt, config: chatConfig }
      });
      if (!updated) throw new Error('Chat not found');
      return input.chatId;
    }

    const createdChat = await sudoContext.db.Chat.createOne({
      data: {
        title,
        systemPrompt: chatConfig.systemPrompt,
        config: chatConfig,
        user: { connect: { id: session.id } },
        org: { connect: { id: session.orgId } },
        project: { connect: { id: projectId } }
      }
    });
    return createdChat?.id ? String(createdChat.id) : null;
  };

  const chatId = await persistChat();
  if (!chatId) throw new Error('Failed to create chat session');

  await sudoContext.db.ChatMessage.createOne({
    data: {
      chat: { connect: { id: chatId } },
      role: 'user',
      content: messageText
    }
  });

  const history = await fetchChatHistory(context, chatId);

  const {
    messages: openAiMessages,
    historyTokens,
    historyCount,
    historyMessages
  } = getOpenAiMessages({
    history: history.map(item => ({ role: item.role, content: item.content })),
    systemPrompt: finalSystemPrompt,
    userMessage: userMessageWithContext,
    maxContextTokens: chatConfig.context.maxInputTokens,
    reservedTokens: chatConfig.context.reservedTokens
  });

  const startedAt = new Date().toISOString();
  const completion = await chatCompletion({
    model: chatConfig.openai.model,
    messages: openAiMessages,
    temperature: chatConfig.openai.temperature,
    max_tokens: chatConfig.openai.maxOutputTokens
  });
  const completedAt = new Date().toISOString();

  const answer = completion.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new Error('OpenAI did not return an answer');

  const mapDebugSegment = (segment: SegmentRecord) => ({
    id: segment.id,
    text: segment.text,
    transcriptTitle: segment.transcript?.title ?? null,
    publishedAt: segment.transcript?.publishedAt ?? null,
    speaker: segment.speaker ?? null,
    speakerActorName: segment.speakerActor?.name ?? null,
    speakerActorType: segment.speakerActor?.type ?? null,
    startMs: typeof segment.startMs === 'number' ? segment.startMs : null,
    endMs: typeof segment.endMs === 'number' ? segment.endMs : null,
    similarityScore: segment.similarityScore ?? null,
    estimatedTokens: segment.estimatedTokens ?? 0,
    mentions: segmentActorMap[segment.id] ?? []
  });

  const debugData: MessageDebugData = {
    config: chatConfig,
    resolvedSystemPrompt: finalSystemPrompt,
    userMessageWithContext,
    history: {
      messagesIncluded: historyCount,
      tokensUsed: historyTokens,
      tokenBudget: chatConfig.context.historyTokenBudget,
      messages: historyMessages
    },
    segments: segmentsForPrompt.map(mapDebugSegment),
    segmentTokensUsed: segmentsTokensUsed,
    openaiResponse: {
      model: chatConfig.openai.model,
      promptTokens: completion.usage?.prompt_tokens ?? null,
      completionTokens: completion.usage?.completion_tokens ?? null,
      totalTokens: completion.usage?.total_tokens ?? null
    },
    timing: {
      startedAt,
      completedAt
    }
  };

  await sudoContext.db.ChatMessage.createOne({
    data: {
      chat: { connect: { id: chatId } },
      role: 'assistant',
      content: answer,
      debugData
    }
  });

  const finalMessages: ChatHistoryItem[] = await fetchChatHistory(context, chatId);

  return {
    chatId,
    answer,
    messages: finalMessages,
    references: referenceSegments.map(mapSegmentReference)
  };
};

