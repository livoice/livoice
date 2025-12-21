import type { TypeInfo } from '.keystone/types';
import type { KeystoneContext } from '@keystone-6/core/types';
import { Prisma } from '@prisma/client';
import { intervalToDuration } from 'date-fns';
import type { Session } from '../auth';
import { createEmbeddings, getOpenAIClient, openAiModel } from '../lib/openai';
import { formatVectorLiteral } from '../lib/pgvector';

type TranscriptSegmentWithTranscript = Pick<
  TypeInfo['lists']['TranscriptSegment']['item'],
  'id' | 'text' | 'startMs' | 'endMs' | 'speaker'
> & {
  transcript: Pick<TypeInfo['lists']['Transcript']['item'], 'title'> | null;
};

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
};

export type SegmentReference = {
  id: string;
  text: string;
  startMs: number | null;
  endMs: number | null;
  speaker?: string | null;
  transcriptTitle?: string | null;
};

export type ChatHistoryItem = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string | null;
  segments: SegmentReference[];
};

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
  projectId?: string;
  queryText?: string;
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
};

const VECTOR_LIMIT = 20;

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
    : null
});

const fetchSegments = async ({ context, projectId, queryText }: FetchSegmentsParams): Promise<SegmentRecord[]> => {
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
      take: VECTOR_LIMIT,
      query: 'id text startMs endMs speaker isMetadata transcript { id title }'
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

      const whereClause = Prisma.sql`p.id = ${projectId}`;

      const rows =
        (await sudoContext.prisma.$queryRaw<RawSegment[]>`
          SELECT
            "TranscriptSegment"."id",
            "TranscriptSegment"."text",
            "TranscriptSegment"."startMs",
            "TranscriptSegment"."endMs",
            "TranscriptSegment"."speaker",
            "TranscriptSegment"."isMetadata",
            t."id" AS "transcriptId",
            t."title" AS "transcriptTitle"
          FROM "TranscriptSegment"
          INNER JOIN "Transcript" t ON t.id = "TranscriptSegment"."transcript"
          INNER JOIN "Source" s ON s.id = t."source"
          INNER JOIN "_Project_sources" ps ON ps."B" = s.id
          INNER JOIN "Project" p ON p.id = ps."A"
          WHERE "TranscriptSegment"."isMetadata" = FALSE
            AND "TranscriptSegment"."embedding" IS NOT NULL
            AND ${whereClause}
          ORDER BY "TranscriptSegment"."embedding" <-> ${literal}
          LIMIT ${VECTOR_LIMIT}
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

const selectSegmentsWithinBudget = (segments: SegmentRecord[], maxTokens: number): SegmentRecord[] => {
  const segmentWithTokens = segments.map(segment => ({
    segment,
    tokens: estimateTokens(buildSegmentDescription(segment))
  }));

  const { selected } = segmentWithTokens.reduce(
    (acc, { segment, tokens }) => {
      const exceeded = acc.exceeded || acc.totalTokens + tokens > maxTokens;

      return {
        ...acc,
        ...(!exceeded && { selected: [...acc.selected, segment], totalTokens: acc.totalTokens + tokens }),
        exceeded
      };
    },
    { selected: [] as SegmentRecord[], totalTokens: 0, exceeded: false }
  );

  return selected;
};

export const fetchChatHistory = async (context: KeystoneContext, chatId: string): Promise<ChatHistoryItem[]> => {
  const sudoContext = context.sudo();
  const messages = await sudoContext.query.ChatMessage.findMany({
    where: { chat: { id: { equals: chatId } } },
    orderBy: [{ createdAt: 'asc' }],
    query: 'id role content createdAt segments { id text startMs endMs speaker transcript { title } }'
  });

  return messages.map(msg => ({
    id: msg.id,
    role: msg.role as 'user' | 'assistant',
    content: msg.content,
    createdAt: msg.createdAt ?? null,
    segments: (msg.segments ?? []).map((segment: TranscriptSegmentWithTranscript) => ({
      id: segment.id,
      text: segment.text,
      startMs: typeof segment.startMs === 'number' ? segment.startMs : null,
      endMs: typeof segment.endMs === 'number' ? segment.endMs : null,
      speaker: segment.speaker ?? undefined,
      transcriptTitle: segment.transcript?.title ?? undefined
    }))
  }));
};

// Rough token estimation (OpenAI uses ~1 token per 4 characters)
const estimateTokens = (text: string): number => Math.ceil(text.length / 4);

// Take messages from end while under token limit
const takeMessagesWithinLimit = (
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  tokenLimit: number
): Array<{ role: 'user' | 'assistant'; content: string }> => {
  const reversed = [...messages].reverse();

  const { included } = reversed.reduce(
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

  return included;
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
}): Array<{ role: 'system' | 'user' | 'assistant'; content: string }> => {
  const fixedTokens = estimateTokens(systemPrompt) + estimateTokens(userMessage) + reservedTokens;
  const availableTokens = maxContextTokens - fixedTokens;
  const includedHistory = takeMessagesWithinLimit(history, availableTokens);

  return [
    { role: 'system' as const, content: systemPrompt },
    ...includedHistory,
    { role: 'user' as const, content: userMessage }
  ];
};

export const getSystemPromptReplacements = async ({
  context,
  projectId,
  transcriptId
}: {
  context: KeystoneContext;
  projectId?: string | null;
  transcriptId?: string | null;
}): Promise<{ projectName: string; transcriptTitles: string[]; sourceNames: string[] }> => {
  const sudoContext = context.sudo();

  let projectName = 'project';
  let transcriptTitles: string[] = [];
  let sourceNames: string[] = [];

  if (transcriptId) {
    // Transcript context: get the single transcript and its source
    const transcript = await sudoContext.query.Transcript.findOne({
      where: { id: transcriptId },
      query: 'title source { name } project { name }'
    });

    if (transcript) {
      transcriptTitles = [transcript.title];
      if (transcript.source?.name) {
        sourceNames = [transcript.source.name];
      }
      if (transcript.project?.name) {
        projectName = transcript.project.name;
      }
    }
  } else if (projectId) {
    // Project context: get all transcripts and sources for the project
    const project = await sudoContext.query.Project.findOne({
      where: { id: projectId },
      query: 'name sources { name transcripts { title } }'
    });

    if (project) {
      projectName = project.name;

      // Get all source names
      sourceNames = project.sources?.map(source => source.name).filter(Boolean) ?? [];

      // Get all transcript titles
      transcriptTitles =
        project.sources?.flatMap(
          source => source.transcripts?.map(transcript => transcript.title).filter(Boolean) ?? []
        ) ?? [];
    }
  }

  return { projectName, transcriptTitles, sourceNames };
};

const replaceSystemPromptPlaceholders = async ({
  systemPrompt,
  context,
  projectId,
  transcriptId,
  session
}: {
  systemPrompt: string;
  context: KeystoneContext;
  projectId?: string;
  transcriptId?: string;
  session: Session;
}): Promise<string> => {
  const { projectName, transcriptTitles, sourceNames } = await getSystemPromptReplacements({
    context,
    projectId,
    transcriptId
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
    transcriptId?: string;
    projectId?: string;
    message: string;
    systemPrompt: string;
  };
}) => {
  if (!session?.id) throw new Error('Unauthorized');
  if (!session?.orgId) throw new Error('Missing organization context');
  const sudoContext = context.sudo();
  const messageText = input.message.trim();
  if (!messageText) throw new Error('Message cannot be empty');

  const fetchTranscriptContext = async () => {
    if (!input.transcriptId) throw new Error('Transcript ID is required');
    const transcript = await sudoContext.query.Transcript.findOne({
      where: { id: input.transcriptId },
      query: 'id title source { projects { id name org { id } } org { id } } org { id }'
    });
    if (!transcript) throw new Error('Transcript not found');
    const project =
      transcript.source?.projects?.find((project: ProjectWithOrg) => project.org?.id === session.orgId) ??
      transcript.source?.projects?.[0];
    if (!project?.id) throw new Error('Transcript is missing project reference');
    return { targetTranscript: transcript, targetProject: project };
  };

  const fetchProjectContext = async () => {
    if (!input.projectId) throw new Error('Project ID is required');
    const project = await sudoContext.query.Project.findOne({
      where: { id: input.projectId },
      query: 'id name org { id }'
    });
    if (!project) throw new Error('Project not found');
    return { targetProject: project, targetTranscript: null };
  };

  const isTranscriptContext = Boolean(input.transcriptId);
  const { targetProject, targetTranscript } = isTranscriptContext
    ? await fetchTranscriptContext()
    : await fetchProjectContext();

  if (!targetProject?.org?.id) {
    throw new Error('Missing organization context for chat target');
  }

  const projectId = targetProject?.id;
  const transcriptId = targetTranscript?.id;

  const segments = await fetchSegments({
    context,
    projectId,
    transcriptId,
    queryText: messageText
  });
  if (!segments.length) throw new Error('No transcript segments found for this context yet');

  const referenceSegments = segments.slice(0, 3);
  const segmentsForPrompt = selectSegmentsWithinBudget(segments, 2_000);
  const segmentsText = segmentsForPrompt.map(buildSegmentDescription).join('\n');

  const finalSystemPrompt = await replaceSystemPromptPlaceholders({
    systemPrompt: input.systemPrompt,
    context,
    projectId,
    transcriptId,
    session
  });

  const title = input.chatId
    ? ''
    : ((await generateChatTitle({
        firstMessage: messageText,
        contextName: isTranscriptContext ? targetTranscript?.title : targetProject?.name
      })) ??
      (isTranscriptContext
        ? `Transcript chat • ${targetTranscript?.title ?? 'untitled'}`
        : `Project chat • ${targetProject?.name ?? 'untitled'}`));

  const chatId = String(
    input.chatId ??
      (
        await sudoContext.db.Chat.createOne({
          data: {
            title,
            systemPrompt: input.systemPrompt,
            org: { connect: { id: session.orgId } },
            ...(projectId ? { project: { connect: { id: projectId } } } : {}),
            ...(transcriptId ? { transcript: { connect: { id: transcriptId } } } : {})
          }
        })
      )?.id
  );

  if (!chatId) throw new Error('Failed to create chat session');

  const history = await fetchChatHistory(context, chatId);

  const messages = getOpenAiMessages({
    history: history.map(item => ({ role: item.role, content: item.content })),
    systemPrompt: finalSystemPrompt,
    userMessage: `${segmentsText}\n\nQuestion: ${messageText}`,
    maxContextTokens: 8_000, // Input limit (what we SEND)
    reservedTokens: 1_500 // Reserved within maxContextTokens
  });

  const openai = getOpenAIClient();
  const completion = await openai.chat.completions.create({
    model: openAiModel,
    messages,
    temperature: 0.25,
    max_tokens: 700 // This is the OUTPUT token limit
  });

  const answer = completion.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new Error('OpenAI did not return an answer');

  await Promise.all([
    sudoContext.db.ChatMessage.createOne({
      data: {
        chat: { connect: { id: chatId } },
        role: 'user',
        content: messageText
      }
    }),
    sudoContext.db.ChatMessage.createOne({
      data: {
        chat: { connect: { id: chatId } },
        role: 'assistant',
        content: answer,
        ...(referenceSegments.length && {
          segments: { connect: referenceSegments.map((segment: SegmentRecord) => ({ id: segment.id })) }
        })
      }
    })
  ]);

  return {
    chatId,
    answer,
    messages: await fetchChatHistory(context, chatId),
    references: referenceSegments.map(mapSegmentReference)
  };
};
