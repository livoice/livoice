import { openai } from '../../lib/openaiClient';
import { prisma } from '../../lib/prisma';

type CreateTranscriptInput = {
  title: string;
  description?: string;
  intervieweeName?: string;
  transcriptDate: string;
};

type TimelineEntry = {
  absoluteTimestamp?: number;
  durationSeconds?: number;
  speaker?: string;
  note?: string;
};

const chunkSplitRegex = /\n\n+/;

export async function createTranscript(
  payload: CreateTranscriptInput,
  initialText?: string,
  timeline?: TimelineEntry[]
) {
  const transcript = await prisma.transcript.create({
    data: { ...payload, transcriptDate: new Date(payload.transcriptDate) }
  });

  if (initialText?.trim()) {
    await ingestTranscriptText(transcript.id, initialText, timeline);
  }

  return transcript;
}

export async function ingestTranscriptText(transcriptId: string, text: string, timeline?: TimelineEntry[]) {
  const chunks = splitIntoBlocks(text);

  return Promise.all(
    chunks.map(async chunk => {
      const embedding = await createEmbedding(chunk.text);
      const record = await prisma.transcriptChunk.create({
        data: {
          transcriptId,
          text: chunk.text,
          speaker: chunk.speaker,
          absoluteTimestamp: chunk.absoluteTimestamp,
          durationSeconds: chunk.durationSeconds,
          metadata: { ...chunk.metadata, timeline: timeline ?? null }
        }
      });
      await storeEmbedding(record.id, embedding);
      return record;
    })
  );
}

type Chunk = {
  text: string;
  speaker?: string;
  absoluteTimestamp?: number;
  durationSeconds?: number;
  metadata?: Record<string, unknown>;
};

function splitIntoBlocks(text: string): Chunk[] {
  return text
    .trim()
    .split(chunkSplitRegex)
    .map(block => parseBlock(block.trim()))
    .filter(chunk => chunk.text.length);
}

function parseBlock(block: string): Chunk {
  const baseLines = block
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  const { lines: linesWithoutTimestamp, absoluteTimestamp } = extractTimestamp(baseLines);
  const { lines: contentLines, speaker } = extractSpeaker(linesWithoutTimestamp);
  const durationSeconds = extractDuration(contentLines);

  const metadata = {
    originalBlock: block
  };

  return {
    text: contentLines.join(' ').trim(),
    speaker,
    absoluteTimestamp,
    durationSeconds,
    metadata
  };
}

function extractTimestamp(lines: string[]) {
  const [firstLine, ...rest] = lines;
  if (!firstLine) return { lines, absoluteTimestamp: undefined };

  const match = firstLine.match(/^\[(\d{1,2}:\d{2}:\d{2})\]\s*(.*)$/);
  if (!match) return { lines, absoluteTimestamp: undefined };

  const [, timestamp, remainingText] = match;
  const nextLines = remainingText ? [remainingText, ...rest] : rest;

  return {
    lines: nextLines,
    absoluteTimestamp: parseTimestamp(timestamp)
  };
}

function extractSpeaker(lines: string[]) {
  const [firstLine, ...rest] = lines;
  if (!firstLine) return { lines, speaker: undefined };

  const match = firstLine.match(/^([A-Za-z ]+):\s*(.*)$/);
  if (!match) return { lines, speaker: undefined };

  const [, speaker, remainingText] = match;
  const nextLines = [remainingText || '', ...rest];

  return {
    lines: nextLines,
    speaker: speaker.trim()
  };
}

function extractDuration(lines: string[]) {
  const durationLine = lines.find(line => line.toLowerCase().startsWith('pause: '));
  if (!durationLine) return undefined;

  const value = parseFloat(durationLine.split(':')[1]?.trim() ?? '');
  return Number.isNaN(value) ? undefined : value;
}

function parseTimestamp(ts: string) {
  const [hours, minutes, seconds] = ts.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

async function createEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text
  });

  return response.data[0].embedding;
}

async function storeEmbedding(chunkId: string, embedding: number[]) {
  const formatted = embedding.map(value => (Number.isFinite(value) ? value : 0)).join(',');
  const sanitizedId = chunkId.replace(/'/g, "''");
  await prisma.$executeRawUnsafe(
    `UPDATE "TranscriptChunk" SET "embedding" = '[${formatted}]'::vector WHERE id = '${sanitizedId}'`
  );
}
