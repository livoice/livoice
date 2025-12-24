-- Switch from ivfflat to HNSW index for better vector search performance
-- HNSW is generally 2-5x faster and more reliable than ivfflat

-- Step 1: Drop the existing ivfflat index (if it exists)
DROP INDEX IF EXISTS "TranscriptSegment_embedding_idx";

-- Step 2: Create HNSW index with cosine distance operator
-- m = 16: number of connections per layer (default, good balance)
-- ef_construction = 64: size of dynamic candidate list for construction
-- Note: This may take several minutes for large tables
CREATE INDEX IF NOT EXISTS "TranscriptSegment_embedding_idx" 
ON "TranscriptSegment" 
USING hnsw ("embedding" vector_cosine_ops)
WITH (m = 16, ef_construction = 64);
