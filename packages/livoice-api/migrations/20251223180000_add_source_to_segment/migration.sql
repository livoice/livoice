-- Add denormalized source column to TranscriptSegment for efficient vector search filtering
-- This avoids expensive JOINs through Transcript -> Source -> _Project_sources -> Project

-- Step 1: Add the source column (nullable initially)
ALTER TABLE "TranscriptSegment" ADD COLUMN "source" TEXT;

-- Step 2: Backfill the source column from Transcript.source
UPDATE "TranscriptSegment" ts
SET "source" = t."source"
FROM "Transcript" t
WHERE ts."transcript" = t."id"
  AND ts."source" IS NULL;

-- Step 3: Create an index on source for fast filtering
CREATE INDEX "TranscriptSegment_source_idx" ON "TranscriptSegment"("source");

-- Step 4: Add foreign key constraint
ALTER TABLE "TranscriptSegment" 
ADD CONSTRAINT "TranscriptSegment_source_fkey" 
FOREIGN KEY ("source") REFERENCES "Source"("id") 
ON DELETE SET NULL ON UPDATE CASCADE;

