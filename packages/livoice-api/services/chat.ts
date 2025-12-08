import type { KeystoneContext } from '@keystone-6/core/types';
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
  const totalSeconds = Math.max(0, Math.floor(value / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
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
  transcriptId?: string;
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

const VECTOR_LIMIT = 40;

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

const fetchSegments = async ({ context, projectId, transcriptId, queryText }: FetchSegmentsParams) => {
  const sudoContext = context.sudo();
  const isTranscriptContext = Boolean(transcriptId);

  const fallback = async () => {
    const baseArgs = isTranscriptContext
      ? {
          where: { transcript: { id: { equals: transcriptId } } }
        }
      : {
          where: {
            transcript: {
              project: {
                id: { equals: projectId }
              }
            }
          }
        };

    const segments = await sudoContext.query.TranscriptSegment.findMany({
      ...baseArgs,
      orderBy: [{ startMs: 'asc' }],
      take: VECTOR_LIMIT,
      query: 'id text startMs endMs speaker isMetadata transcript { id title project { id } }'
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
    if (isTranscriptContext && !transcriptId) return [];
    if (!isTranscriptContext && !projectId) return [];

    try {
      const embeddings = await createEmbeddings([text]);
      const embedding = embeddings?.[0];
      if (!embedding?.length) return [];

      const literal = formatVectorLiteral(embedding);
      const joinClause = isTranscriptContext
        ? 'LEFT JOIN "Transcript" t ON t.id = "TranscriptSegment"."transcriptId"'
        : 'INNER JOIN "Transcript" t ON t.id = "TranscriptSegment"."transcriptId"';
      const whereClause = isTranscriptContext
        ? `"TranscriptSegment"."transcriptId" = '${transcriptId}'`
        : `"Transcript"."projectId" = '${projectId}'`;

      const rows =
        (await sudoContext.prisma.$queryRawUnsafe<RawSegment>(`
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
        ${joinClause}
        WHERE "TranscriptSegment"."isMetadata" = FALSE
          AND "TranscriptSegment"."embedding" IS NOT NULL
          AND ${whereClause}
        ORDER BY "TranscriptSegment"."embedding" <-> ${literal}
        LIMIT ${VECTOR_LIMIT}
      `)) ?? [];

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

const fetchChatHistory = async (context: KeystoneContext, chatId: string): Promise<ChatHistoryItem[]> => {
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
    segments: (msg.segments ?? []).map(segment => ({
      id: segment.id,
      text: segment.text,
      startMs: typeof segment.startMs === 'number' ? segment.startMs : null,
      endMs: typeof segment.endMs === 'number' ? segment.endMs : null,
      speaker: segment.speaker ?? undefined,
      transcriptTitle: segment.transcript?.title ?? undefined
    }))
  }));
};

const getOpenAiMessages = ({
  history,
  systemPrompt,
  userMessage
}: {
  history: { role: 'user' | 'assistant'; content: string }[];
  systemPrompt: string;
  userMessage: string;
}) => {
  const trimmedHistory = history.slice(-6);
  const messages = [{ role: 'system', content: systemPrompt }];
  trimmedHistory.forEach(item => messages.push({ role: item.role, content: item.content }));
  messages.push({ role: 'user', content: userMessage });
  return messages;
};

const getSystemPrompt = ({
  isTranscriptContext,
  projectName,
  transcriptName
}: {
  isTranscriptContext: boolean;
  projectName?: string | null;
  transcriptName?: string | null;
}) => {
  if (isTranscriptContext) {
    return `You are an interview intelligence assistant. Use timestamps and transcript snippets when you answer questions about "${transcriptName ?? 'this transcript'}".`;
  }

  return `You are an insights assistant for the "${projectName ?? 'project'}" workspace. Lean on the available transcript segments when summarizing or answering questions.`;
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
  };
}) => {
  if (!session?.id) throw new Error('Unauthorized');
  if (!session?.orgId) throw new Error('Missing organization context');
  const sudoContext = context.sudo();
  const messageText = input.message.trim();
  if (!messageText) throw new Error('Message cannot be empty');
  const isTranscriptContext = Boolean(input.transcriptId);

  const fetchTranscriptContext = async () => {
    if (!input.transcriptId) throw new Error('Transcript ID is required');
    const transcript = await sudoContext.query.Transcript.findOne({
      where: { id: input.transcriptId },
      query: 'id title project { id name org { id } } org { id }'
    });
    if (!transcript) throw new Error('Transcript not found');
    if (!transcript.project?.id) throw new Error('Transcript is missing project reference');
    return { targetTranscript: transcript, targetProject: transcript.project };
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

  const { targetProject, targetTranscript } = isTranscriptContext
    ? await fetchTranscriptContext()
    : await fetchProjectContext();

  if (!targetProject?.org?.id && !targetTranscript?.org?.id) {
    throw new Error('Missing organization context for chat target');
  }

  const projectId = targetProject?.id ?? null;
  const transcriptId = targetTranscript?.id ?? null;
  const segments = await fetchSegments({
    context,
    projectId: projectId ?? undefined,
    transcriptId: transcriptId ?? undefined,
    queryText: messageText
  });
  if (!segments.length) {
    throw new Error('No transcript segments found for this context yet');
  }

  const referenceSegments = segments.slice(0, 3);
  const segmentsForPrompt = segments.slice(0, 8);
  const segmentsText = segmentsForPrompt.map(buildSegmentDescription).join('\n');

  const systemPrompt = getSystemPrompt({
    isTranscriptContext,
    projectName: targetProject?.name,
    transcriptName: targetTranscript?.title
  });

  const chatId =
    input.chatId ??
    (
      await sudoContext.db.Chat.createOne({
        data: {
          title: isTranscriptContext
            ? `Transcript chat • ${targetTranscript?.title ?? 'untitled'}`
            : `Project chat • ${targetProject?.name ?? 'untitled'}`,
          org: { connect: { id: session.orgId } },
          ...(projectId ? { project: { connect: { id: projectId } } } : {}),
          ...(transcriptId ? { transcript: { connect: { id: transcriptId } } } : {})
        }
      })
    )?.id;

  if (!chatId) throw new Error('Failed to create chat session');

  const history = await fetchChatHistory(context, chatId);
  const systemMessages = getOpenAiMessages({
    history: history.map(item => ({ role: item.role, content: item.content })),
    systemPrompt,
    userMessage: `${segmentsText}\n\nQuestion: ${messageText}`
  });

  const openai = getOpenAIClient();
  const completion = await openai.chat.completions.create({
    model: openAiModel,
    messages: systemMessages,
    temperature: 0.25,
    max_tokens: 700
  });

  const answer = completion.choices?.[0]?.message?.content?.trim();
  if (!answer) {
    throw new Error('OpenAI did not return an answer');
  }

  await sudoContext.db.ChatMessage.createOne({
    data: {
      chat: { connect: { id: chatId } },
      role: 'user',
      content: messageText
    }
  });

  await sudoContext.db.ChatMessage.createOne({
    data: {
      chat: { connect: { id: chatId } },
      role: 'assistant',
      content: answer,
      ...(referenceSegments.length
        ? { segments: { connect: referenceSegments.map(segment => ({ id: segment.id })) } }
        : {})
    }
  });

  const updatedHistory = await fetchChatHistory(context, chatId);

  return {
    chatId,
    answer,
    messages: updatedHistory,
    references: referenceSegments.map(mapSegmentReference)
  };
};

export const loadChatHistory = fetchChatHistory;
