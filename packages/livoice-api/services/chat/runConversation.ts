import type { KeystoneContext } from '@keystone-6/core/types';
import type { Session } from '../../auth';
import { chatCompletion } from '../../lib/openai';
import { estimateTokens } from '../../lib/tokenUtils';
import { fetchSegmentActors } from './actors';
import { fetchChatHistory, getOpenAiMessages } from './history';
import { buildSegmentDescription, fetchSegments, mapSegmentReference, selectSegmentsWithinBudget } from './segments';
import { normalizeChatConfig, replaceSystemPromptPlaceholders } from './systemPrompt';
import { generateChatTitle } from './titleGeneration';
import type { ChatConfig, ChatHistoryItem, MessageDebugData, SegmentRecord } from './types';

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
    chatConfigId?: string | null;
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

  // For existing chats, use the stored configSnapshot
  const existingChatRecord = input.chatId
    ? await sudoContext.query.Chat.findOne({
        where: { id: input.chatId },
        query: 'configSnapshot chatConfig { id createdAt name }'
      })
    : null;

  // For new chats, fetch the ChatConfig by ID
  const chatConfigRecord = input.chatConfigId
    ? await sudoContext.query.ChatConfig.findOne({
        where: { id: input.chatConfigId },
        query: 'id name notes systemPrompt openai context segments createdAt'
      })
    : null;

  // Use existing snapshot for continuing chats, or fetch from ChatConfig for new chats
  const chatConfigBase = existingChatRecord?.configSnapshot
    ? normalizeChatConfig(existingChatRecord.configSnapshot as Partial<ChatConfig>)
    : chatConfigRecord
      ? normalizeChatConfig({
          id: chatConfigRecord.id,
          name: chatConfigRecord.name,
          createdAt: chatConfigRecord.createdAt as string,
          systemPrompt: chatConfigRecord.systemPrompt,
          openai: chatConfigRecord.openai as ChatConfig['openai'],
          context: chatConfigRecord.context as ChatConfig['context'],
          segments: chatConfigRecord.segments as ChatConfig['segments']
        })
      : normalizeChatConfig();

  const chatConfig = {
    ...chatConfigBase,
    id:
      chatConfigBase.id ??
      chatConfigRecord?.id ??
      (existingChatRecord?.chatConfig as { id?: string } | null)?.id ??
      input.chatConfigId ??
      undefined,
    createdAt:
      chatConfigBase.createdAt ??
      (chatConfigRecord?.createdAt as string | undefined) ??
      (existingChatRecord?.chatConfig as { createdAt?: string } | null)?.createdAt ??
      undefined,
    name:
      chatConfigBase.name ?? chatConfigRecord?.name ?? (existingChatRecord?.configSnapshot as ChatConfig | null)?.name
  };

  // Store the chatConfigId for new chats
  const chatConfigId = input.chatConfigId ?? (existingChatRecord?.chatConfig as { id?: string })?.id ?? null;

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
      // For existing chats, we don't update the config - it's frozen as snapshot
      return input.chatId;
    }

    const createdChat = await sudoContext.db.Chat.createOne({
      data: {
        title,
        configSnapshot: chatConfig,
        ...(chatConfigId ? { chatConfig: { connect: { id: chatConfigId } } } : {}),
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

  const fixedTokens =
    estimateTokens(finalSystemPrompt) + estimateTokens(userMessageWithContext) + chatConfig.context.reservedTokens;
  const effectiveMaxContextTokens = Math.max(
    chatConfig.context.maxInputTokens,
    fixedTokens + chatConfig.context.historyTokenBudget
  );

  const {
    messages: openAiMessages,
    historyTokens,
    historyCount,
    historyMessages,
    budget
  } = getOpenAiMessages({
    history: history.map(item => ({ role: item.role, content: item.content })),
    systemPrompt: finalSystemPrompt,
    userMessage: userMessageWithContext,
    maxContextTokens: effectiveMaxContextTokens,
    reservedTokens: chatConfig.context.reservedTokens,
    historyTokenBudget: chatConfig.context.historyTokenBudget
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
      messages: historyMessages,
      budget
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
