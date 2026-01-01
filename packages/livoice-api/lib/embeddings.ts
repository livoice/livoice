import { Prisma } from '@prisma/client';
import { createEmbeddings } from './openai';
import { formatVectorLiteral } from './pgvector';
import { getPrismaSudo } from './prisma';

type PendingSegment = {
  id: string;
  text: string;
  transcriptId: string;
};

export const fetchPendingSegments = async (limit = 500): Promise<PendingSegment[]> => {
  const rows = await (
    await getPrismaSudo()
  ).$queryRawUnsafe<{ id: string; text: string; transcriptId: string }[]>(
    `SELECT ts.id, ts.text, ts.transcript as "transcriptId"
     FROM "TranscriptSegment" ts
     INNER JOIN "Transcript" t ON ts.transcript = t.id
     WHERE ts.embedding IS NULL
       AND t."importStatus" IN ('completed', 'skipped')
       AND t."analysisStatus" = 'completed'
     LIMIT ${Number(limit)}`
  );
  return rows;
};

export const batchEmbed = async (segments: PendingSegment[]) => {
  if (!segments.length) return;
  const texts = segments.map(segment => segment.text);
  const embeddings = await createEmbeddings(texts);

  const updates = segments
    .map((segment, idx) => ({
      id: segment.id,
      embedding: formatVectorLiteral(embeddings[idx] ?? [])
    }))
    .filter((update): update is { id: string; embedding: string } => update.embedding !== undefined);

  const prisma = await getPrismaSudo();
  await Promise.all(
    updates.map(
      update =>
        prisma.$executeRaw`
        UPDATE "TranscriptSegment" SET "embedding" = ${Prisma.raw(update.embedding)} WHERE id = ${update.id}
      `
    )
  );
};

export const markCompletedTranscripts = async () =>
  (await getPrismaSudo()).$executeRawUnsafe(`
    UPDATE "Transcript"
    SET "embeddingStatus" = 'completed', "embeddingAt" = NOW()
    WHERE "embeddingStatus" IN ('pending', 'processing')
      AND "importStatus" IN ('completed', 'skipped')
      AND "analysisStatus" = 'completed'
      AND NOT EXISTS (
        SELECT 1 FROM "TranscriptSegment"
        WHERE "TranscriptSegment"."transcript" = "Transcript"."id"
          AND "TranscriptSegment"."embedding" IS NULL
      )
  `);
