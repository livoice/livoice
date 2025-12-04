import { ChatMessage, ChatSession, MessageRole, TranscriptChunk } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { openai } from '../../lib/openaiClient';

const CHAT_MODEL = 'gpt-4.1-mini';
const RETRIEVAL_LIMIT = 6;

export type ChatRequest = {
  transcriptId: string;
  userMessage: string;
  sessionId?: string;
};

export type ChatResponse = {
  sessionId: string;
  answer: string;
  usedChunks: TranscriptChunk[];
};

export async function chatWithTranscript({ transcriptId, userMessage, sessionId }: ChatRequest): Promise<ChatResponse> {
  const session = await ensureSession(transcriptId, sessionId);

  const queryEmbedding = await embedText(userMessage);
  const relevantChunks = await searchChunks(transcriptId, queryEmbedding);
  const history = await prisma.chatMessage.findMany({
    where: { sessionId: session.id },
    orderBy: { createdAt: 'asc' }
  });
  const openAiMessages = buildMessageHistory(history, userMessage, relevantChunks);
  await prisma.chatMessage.create({
    data: {
      sessionId: session.id,
      role: MessageRole.user,
      content: userMessage
    }
  });

  const completion = await openai.chat.completions.create({
    model: CHAT_MODEL,
    messages: openAiMessages
  });

  const answer = completion.choices[0]?.message?.content ?? '';

  await prisma.chatMessage.create({
    data: {
      sessionId: session.id,
      role: MessageRole.assistant,
      content: answer
    }
  });

  return {
    sessionId: session.id,
    answer,
    usedChunks: relevantChunks
  };
}

async function ensureSession(transcriptId: string, sessionId?: string): Promise<ChatSession> {
  if (sessionId) {
    const existing = await prisma.chatSession.findUnique({ where: { id: sessionId } });
    if (existing) {
      return existing;
    }
  }

  return prisma.chatSession.create({ data: { transcriptId } });
}

async function embedText(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({ model: 'text-embedding-3-large', input: text });
  return response.data[0].embedding;
}

async function searchChunks(transcriptId: string, queryEmbedding: number[]): Promise<TranscriptChunk[]> {
  const sanitizedTranscriptId = transcriptId.replace(/'/g, "''");
  const vectorLiteral = `[${queryEmbedding.map(value => (Number.isFinite(value) ? value : 0)).join(',')}]`;

  const rows = await prisma.$queryRawUnsafe<TranscriptChunk & { distance: number }>(
    `SELECT *, embedding <=> '${vectorLiteral}'::vector AS distance
     FROM "TranscriptChunk"
     WHERE "transcriptId" = '${sanitizedTranscriptId}'
     ORDER BY distance ASC
     LIMIT ${RETRIEVAL_LIMIT}`
  );

  return rows;
}

function formatTimestamp(seconds?: number) {
  if (!seconds) {
    return '';
  }
  const hrs = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0');
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function buildMessageHistory(existing: ChatMessage[], userMessage: string, chunks: TranscriptChunk[]) {
  const context = buildChunkContext(chunks);
  const systemInstructions = `You are the transcript subject. Stick to the provided transcript snippets and timeline clues (timestamps, pauses) when replying. Cite timing when it matters.`;
  const messages = [{ role: 'system', content: systemInstructions }];

  if (context) {
    messages.push({ role: 'system', content: `Transcript context:\n${context}` });
  }

  messages.push(...existing.map(message => ({ role: message.role, content: message.content }) as const));
  messages.push({ role: 'user' as const, content: userMessage });

  return messages;
}

function buildChunkContext(chunks: TranscriptChunk[]) {
  if (!chunks.length) {
    return '';
  }

  return chunks
    .map(chunk => {
      const timestamp = chunk.absoluteTimestamp ? formatTimestamp(chunk.absoluteTimestamp) : '';
      const speaker = chunk.speaker ? `${chunk.speaker}: ` : '';
      return `${timestamp ? `[${timestamp}] ` : ''}${speaker}${chunk.text}`;
    })
    .join('\n\n');
}
