import type { KeystoneContext } from '@keystone-6/core/types';
import { Prisma } from '@prisma/client';
import { intervalToDuration } from 'date-fns';
import type { Session } from '../auth';
import { createEmbeddings, getOpenAIClient, openAiModel } from '../lib/openai';
import { formatVectorLiteral } from '../lib/pgvector';

type SegmentRecord = {
  id: string;
  text: string;
  startMs?: number | null;
  endMs?: number | null;
  speaker?: string | null;
  isMetadata?: boolean | null;
  transcript?: {
    id: string;
    title?: string | null;
  } | null;
  similarityScore?: number | null;
  estimatedTokens?: number;
};

type ProjectWithOrg = {
  id: string;
  name?: string | null;
  org?: { id?: string | null } | null;
};

type SegmentWithMeta = SegmentRecord & {
  estimatedTokens: number;
};

export type SegmentReference = {
  id: string;
  text: string;
  startMs: number | null;
  endMs: number | null;
  speaker?: string | null;
  transcriptTitle?: string | null;
};

export type ChatConfig = {
  name?: string;
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
};

export type MessageDebugData = {
  config: ChatConfig;
  resolvedSystemPrompt: string;
  userMessageWithContext: string;
  history: {
    messagesIncluded: number;
    tokensUsed: number;
    tokenBudget: number;
    messages: Array<{ role: 'user' | 'assistant'; content: string; tokens: number }>;
  };
  segments: Array<{
    id: string;
    text: string;
    transcriptTitle: string | null;
    speaker: string | null;
    startMs: number | null;
    endMs: number | null;
    similarityScore: number | null;
    estimatedTokens: number;
  }>;
  segmentTokensUsed: number;
  openaiResponse: {
    model: string;
    promptTokens: number | null;
    completionTokens: number | null;
    totalTokens: number | null;
  };
  timing: {
    startedAt: string;
    completedAt: string;
  };
};

export type ChatHistoryItem = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string | null;
  debugData?: MessageDebugData | null;
};

export const DEFAULT_CHAT_CONFIG: ChatConfig = {
  name: '',
  systemPrompt: '',
  openai: {
    model: 'gpt-4o-mini',
    temperature: 0.25,
    maxOutputTokens: 700
  },
  context: {
    maxInputTokens: 16000,
    reservedTokens: 1500,
    historyTokenBudget: 4000
  },
  segments: {
    tokenBudget: 4000,
    maxCount: 30
  }
};

export const normalizeChatConfig = (config?: Partial<ChatConfig>, systemPromptOverride?: string): ChatConfig => ({
  name: config?.name ?? DEFAULT_CHAT_CONFIG.name,
  systemPrompt: config?.systemPrompt ?? systemPromptOverride ?? DEFAULT_CHAT_CONFIG.systemPrompt,
  openai: {
    model: config?.openai?.model ?? DEFAULT_CHAT_CONFIG.openai.model,
    temperature: config?.openai?.temperature ?? DEFAULT_CHAT_CONFIG.openai.temperature,
    maxOutputTokens: config?.openai?.maxOutputTokens ?? DEFAULT_CHAT_CONFIG.openai.maxOutputTokens
  },
  context: {
    maxInputTokens: config?.context?.maxInputTokens ?? DEFAULT_CHAT_CONFIG.context.maxInputTokens,
    reservedTokens: config?.context?.reservedTokens ?? DEFAULT_CHAT_CONFIG.context.reservedTokens,
    historyTokenBudget: config?.context?.historyTokenBudget ?? DEFAULT_CHAT_CONFIG.context.historyTokenBudget
  },
  segments: {
    tokenBudget: config?.segments?.tokenBudget ?? DEFAULT_CHAT_CONFIG.segments.tokenBudget,
    maxCount: config?.segments?.maxCount ?? DEFAULT_CHAT_CONFIG.segments.maxCount
  }
});

const formatMs = (value?: number | null) => {
  if (typeof value !== 'number') return '00:00:00';
  const { hours = 0, minutes = 0, seconds = 0 } = intervalToDuration({ start: 0, end: value });
  return [hours, minutes, seconds].map(unit => unit.toString().padStart(2, '0')).join(':');
};

const buildSegmentDescription = (segment: SegmentRecord) =>
  `${segment.speaker ?? 'Speaker'} (${formatMs(segment.startMs)} - ${formatMs(segment.endMs)}): ${segment.text}`;

const mapSegmentReference = (segment: SegmentRecord): SegmentReference => ({
  id: segment.id,
  startMs: typeof segment.startMs === 'number' ? segment.startMs : null,
  endMs: typeof segment.endMs === 'number' ? segment.endMs : null,
  text: segment.text,
  speaker: segment.speaker ?? undefined,
  transcriptTitle: segment.transcript?.title ?? undefined
});

type FetchSegmentsParams = {
  context: KeystoneContext;
  projectId: string;
  queryText?: string;
  maxSegments: number;
};

type RawSegment = {
  id: string;
  text: string;
  startMs: number | null;
  endMs: number | null;
  speaker: string | null;
  isMetadata: boolean | null;
  transcriptId?: string | null;
  transcriptTitle?: string | null;
  similarityScore?: number | null;
};

const mapRawToSegment = (row: RawSegment): SegmentRecord => ({
  id: row.id,
  text: row.text,
  startMs: row.startMs ?? null,
  endMs: row.endMs ?? null,
  speaker: row.speaker ?? undefined,
  isMetadata: row.isMetadata ?? false,
  transcript: row.transcriptId
    ? {
        id: row.transcriptId,
        title: row.transcriptTitle ?? null
      }
    : null,
  similarityScore: row.similarityScore ?? null
});

const fetchSegments = async ({
  context,
  projectId,
  queryText,
  maxSegments
}: FetchSegmentsParams): Promise<SegmentRecord[]> => {
  const sudoContext = context.sudo();

  const fallback = async () => {
    const baseArgs = {
      where: {
        transcript: {
          source: {
            projects: {
              some: {
                id: { equals: projectId }
              }
            }
          }
        }
      }
    };
    const segments = await sudoContext.query.TranscriptSegment.findMany({
      ...baseArgs,
      orderBy: [{ startMs: 'asc' }],
      take: maxSegments,
      query: 'id text startMs endMs speaker isMetadata transcript { id title source { id name projects { id name } } }'
    });

    return segments
      .filter(segment => segment.text && !segment.isMetadata)
      .map(segment => ({
        id: segment.id,
        text: segment.text,
        startMs: segment.startMs,
        endMs: segment.endMs,
        speaker: segment.speaker,
        isMetadata: segment.isMetadata,
        transcript: segment.transcript
          ? {
              id: segment.transcript.id,
              title: segment.transcript.title ?? null
            }
          : null
      }));
  };

  const runVectorSearch = async (text: string) => {
    if (!text.trim()) return [];
    if (!projectId) return [];

    try {
      const embedding = (await createEmbeddings([text]))?.[0];
      if (!embedding?.length) return [];

      const literal = Prisma.raw(formatVectorLiteral(embedding) ?? '');

      const sourceIds = await sudoContext.prisma.$queryRaw<{ B: string }[]>`
        SELECT "B" FROM "_Project_sources" WHERE "A" = ${projectId}
      `;

      if (!sourceIds.length) return [];

      const sourceIdList = sourceIds.map((s: { B: string }) => s.B);

      const rows =
        (await sudoContext.prisma.$queryRaw<RawSegment[]>`
          SELECT
            ts."id",
            ts."text",
            ts."startMs",
            ts."endMs",
            ts."speaker",
            ts."isMetadata",
            t."id" AS "transcriptId",
            t."title" AS "transcriptTitle",
            (ts."embedding" <=> ${literal}) AS "similarityScore"
          FROM "TranscriptSegment" ts
          INNER JOIN "Transcript" t ON t.id = ts."transcript"
          WHERE ts."embedding" IS NOT NULL
            AND ts."isMetadata" = FALSE
            AND ts."source" IN (${Prisma.join(sourceIdList)})
          ORDER BY ts."embedding" <=> ${literal}
          LIMIT ${maxSegments}
        `) ?? [];

      return rows.map(mapRawToSegment);
    } catch (error) {
      console.error('Vector search fallback', error);
      return [];
    }
  };

  if (queryText) {
    const vectorSegments = await runVectorSearch(queryText);
    if (vectorSegments.length) return vectorSegments;
  }

  return fallback();
};

const selectSegmentsWithinBudget = (
  segments: SegmentRecord[],
  maxTokens: number
): { selected: SegmentWithMeta[]; totalTokens: number } => {
  const segmentWithTokens: SegmentWithMeta[] = segments.map(segment => ({
    ...segment,
    estimatedTokens: estimateTokens(buildSegmentDescription(segment))
  }));

  const { selected, totalTokens } = segmentWithTokens.reduce(
    (acc, segment) => {
      const exceeded = acc.exceeded || acc.totalTokens + segment.estimatedTokens > maxTokens;

      return {
        ...acc,
        ...(!exceeded && {
          selected: [...acc.selected, segment],
          totalTokens: acc.totalTokens + segment.estimatedTokens
        }),
        exceeded
      };
    },
    { selected: [] as SegmentWithMeta[], totalTokens: 0, exceeded: false }
  );

  return { selected, totalTokens };
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

// Rough token estimation (OpenAI uses ~1 token per 4 characters)
const estimateTokens = (text: string): number => Math.ceil(text.length / 4);

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

const parseJsonArray = <T>(value: string | T[] | null | undefined): T[] => {
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to parse JSON array', error);
      return [];
    }
  }
  return Array.isArray(value) ? value : [];
};

const getOpenAiMessages = ({
  history,
  systemPrompt,
  userMessage,
  maxContextTokens = 6000,
  reservedTokens = 1000
}: {
  history: { role: 'user' | 'assistant'; content: string }[];
  systemPrompt: string;
  userMessage: string;
  maxContextTokens?: number;
  reservedTokens?: number;
}): {
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  historyTokens: number;
  historyCount: number;
  historyMessages: Array<{ role: 'user' | 'assistant'; content: string; tokens: number }>;
} => {
  const fixedTokens = estimateTokens(systemPrompt) + estimateTokens(userMessage) + reservedTokens;
  const availableTokens = maxContextTokens - fixedTokens;
  const { included: includedHistory, currentTokens: historyTokens } = takeMessagesWithinLimit(history, availableTokens);
  const historyMessages = includedHistory.map(msg => ({
    ...msg,
    tokens: estimateTokens(msg.content)
  }));

  return {
    historyTokens,
    historyCount: includedHistory.length,
    historyMessages,
    messages: [
      { role: 'system' as const, content: systemPrompt },
      ...includedHistory,
      { role: 'user' as const, content: userMessage }
    ]
  };
};

export const getSystemPromptReplacements = async ({
  context,
  projectId,
  systemPrompt
}: {
  context: KeystoneContext;
  projectId?: string | null;
  systemPrompt?: string;
}): Promise<{ projectName: string; transcriptTitles: string[]; sourceNames: string[] }> => {
  const defaults = { projectName: 'project', transcriptTitles: [] as string[], sourceNames: [] as string[] };
  if (!projectId) return defaults;

  // Check which placeholders are actually used in the prompt
  const needsProjectName = !systemPrompt || systemPrompt.includes('{projectName}');
  const needsSourceNames = systemPrompt?.includes('{sourceNames}') ?? false;
  const needsTranscriptTitles = systemPrompt?.includes('{transcriptTitles}') ?? false;

  if (!needsProjectName && !needsSourceNames && !needsTranscriptTitles) return defaults;

  const sudoContext = context.sudo();

  // Fetch all needed data in parallel
  const [project, sourceRow, transcriptRow] = await Promise.all([
    needsProjectName ? sudoContext.query.Project.findOne({ where: { id: projectId }, query: 'name' }) : null,
    needsSourceNames
      ? sudoContext.prisma.$queryRaw<{ names: string | null }[]>`
          SELECT json_agg(DISTINCT s."name") AS "names"
          FROM "Source" s
          INNER JOIN "_Project_sources" ps ON ps."B" = s.id
          WHERE ps."A" = ${projectId}
            AND s."name" IS NOT NULL
            AND s."name" != ''
        `.then((rows: { names: string | null }[]) => rows?.[0])
      : null,
    needsTranscriptTitles
      ? sudoContext.prisma.$queryRaw<{ titles: string | string[] | null }[]>`
          SELECT json_agg(DISTINCT t."title") AS "titles"
          FROM "Transcript" t
          INNER JOIN "Source" s ON s.id = t."source"
          INNER JOIN "_Project_sources" ps ON ps."B" = s.id
          WHERE ps."A" = ${projectId}
            AND t."title" IS NOT NULL
            AND t."title" != ''
        `.then((rows: { titles: string | string[] | null }[]) => rows?.[0])
      : null
  ]);

  if (needsProjectName && !project) return defaults;

  return {
    projectName: project?.name ?? 'project',
    sourceNames: parseJsonArray<string>(sourceRow?.names),
    transcriptTitles: parseJsonArray<string>(transcriptRow?.titles)
  };
};

const replaceSystemPromptPlaceholders = async ({
  systemPrompt,
  context,
  projectId
}: {
  systemPrompt: string;
  context: KeystoneContext;
  projectId?: string;
}): Promise<string> => {
  const { projectName, transcriptTitles, sourceNames } = await getSystemPromptReplacements({
    context,
    projectId,
    systemPrompt
  });

  return systemPrompt
    .replace(/\{projectName\}/g, projectName)
    .replace(/\{transcriptTitles\}/g, transcriptTitles.join(', '))
    .replace(/\{sourceNames\}/g, sourceNames.join(', '));
};

const generateChatTitle = async ({
  firstMessage,
  contextName
}: {
  firstMessage: string;
  contextName?: string | null;
}): Promise<string | null> => {
  if (!firstMessage.trim()) return null;

  const sanitizedMessage = firstMessage.replace(/\n/g, ' ').trim();
  const truncatedMessage = sanitizedMessage.length > 200 ? `${sanitizedMessage.slice(0, 197)}...` : sanitizedMessage;
  const contextValue = contextName ?? 'untitled';

  const prompt = `Generate a concise, descriptive title (3-6 words, max 60 chars) for this chat conversation.

Context: Project: "${contextValue}"
First message: "${truncatedMessage}"

IMPORTANT: The title should focus ONLY on the topic/question from the first message. Do NOT include the context name ("${contextValue}") or context type ("Project") in the title.

Title should:
- Capture the main topic/question from the first message
- Be specific and searchable
- Avoid generic terms like "chat" or "question"
- Use title case
- Focus on the content, not the context
- Not wrapped with quotes

Examples of GOOD titles:
- "Key Takeaways and Insights"
- "Identifying Participants"
- "Understanding Conversations"
- "Main Discussion Points"

Examples of BAD titles (DO NOT include context):
- "Key Takeaways for ${contextValue}" ❌
- "Understanding ${contextValue}" ❌
- "${contextValue} Analysis" ❌

Title only (no quotes, no explanation):`;

  try {
    const openai = getOpenAIClient();
    const timeoutPromise = new Promise<never>((_, reject) =>
      globalThis.setTimeout(() => reject(new Error('Title generation timeout')), 3000)
    );

    const completionPromise = openai.chat.completions.create({
      model: openAiModel,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 20
    });

    const completion = await Promise.race([completionPromise, timeoutPromise]);
    const title = completion.choices?.[0]?.message?.content?.trim();

    if (!title || title.length > 60) return null;

    return title;
  } catch (error) {
    console.error('Failed to generate chat title:', error);
    return null;
  }
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

  const referenceSegments = segments.slice(0, 3);
  const { selected: segmentsForPrompt, totalTokens: segmentsTokensUsed } = selectSegmentsWithinBudget(
    segments,
    chatConfig.segments.tokenBudget
  );
  const segmentsText = segmentsForPrompt.map(buildSegmentDescription).join('\n');
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

  const openai = getOpenAIClient();
  const startedAt = new Date().toISOString();
  const completion = await openai.chat.completions.create({
    model: chatConfig.openai.model,
    messages: openAiMessages,
    temperature: chatConfig.openai.temperature,
    max_tokens: chatConfig.openai.maxOutputTokens
  });
  const completedAt = new Date().toISOString();

  const answer = completion.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new Error('OpenAI did not return an answer');

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
    segments: segmentsForPrompt.map(segment => ({
      id: segment.id,
      text: segment.text,
      transcriptTitle: segment.transcript?.title ?? null,
      speaker: segment.speaker ?? null,
      startMs: typeof segment.startMs === 'number' ? segment.startMs : null,
      endMs: typeof segment.endMs === 'number' ? segment.endMs : null,
      similarityScore: segment.similarityScore ?? null,
      estimatedTokens: segment.estimatedTokens
    })),
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

  const finalMessages = await fetchChatHistory(context, chatId);

  return {
    chatId,
    answer,
    messages: finalMessages,
    references: referenceSegments.map(mapSegmentReference)
  };
};
