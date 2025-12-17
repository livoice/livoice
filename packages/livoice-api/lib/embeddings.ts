import { Context } from '.keystone/types';
import { Prisma } from '@prisma/client';
import { createEmbeddings } from './openai';
import { formatVectorLiteral } from './pgvector';

type PendingSegment = {
  id: string;
  text: string;
  transcriptId: string;
};

export const fetchPendingSegments = async (context: Context, limit = 500): Promise<PendingSegment[]> => {
  const prisma = context.sudo().prisma;
  const rows = await prisma.$queryRawUnsafe<{ id: string; text: string; transcriptId: string }[]>(
    `SELECT id, text, transcript as "transcriptId" FROM "TranscriptSegment" WHERE embedding IS NULL LIMIT ${Number(
      limit
    )}`
  );
  return rows;
};

export const batchEmbed = async (context: Context, segments: PendingSegment[]) => {
  if (!segments.length) return;
  const texts = segments.map(segment => segment.text);
  const embeddings = await createEmbeddings(texts);

  const updates = segments.map((segment, idx) => ({
    id: segment.id,
    embedding: formatVectorLiteral(embeddings[idx] ?? [])
  }));

  const prisma = context.sudo().prisma;
  await Promise.all(
    updates.map(
      update =>
        prisma.$executeRaw`
        UPDATE "TranscriptSegment" SET "embedding" = ${Prisma.raw(update.embedding)} WHERE id = ${update.id}
      `
    )
  );
};

export const markCompletedTranscripts = async (context: Context) =>
  context.sudo().prisma.$executeRawUnsafe(`
    UPDATE "Transcript"
    SET "embeddingStatus" = 'completed', "embeddingCompletedAt" = NOW()
    WHERE "embeddingStatus" IN ('pending', 'processing')
      AND NOT EXISTS (
        SELECT 1 FROM "TranscriptSegment"
        WHERE "TranscriptSegment"."transcript" = "Transcript"."id"
          AND "TranscriptSegment"."embedding" IS NULL
      )
  `);



