CREATE EXTENSION IF NOT EXISTS vector;
ALTER TABLE "TranscriptSegment" ADD COLUMN IF NOT EXISTS "embedding" vector(1536);
CREATE INDEX IF NOT EXISTS "TranscriptSegment_embedding_idx" ON "TranscriptSegment" USING ivfflat ("embedding" vector_cosine_ops);
