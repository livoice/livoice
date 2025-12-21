-- AlterTable: Rename embeddingCompletedAt to embeddingAt
ALTER TABLE "Transcript" RENAME COLUMN "embeddingCompletedAt" TO "embeddingAt";

-- AlterTable: Add importAt column
ALTER TABLE "Transcript" ADD COLUMN "importAt" TIMESTAMP(3);

