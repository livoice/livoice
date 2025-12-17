-- CreateEnum
CREATE TYPE "TranscriptImportStatusType" AS ENUM ('pending', 'fetching', 'completed', 'failed', 'skipped');

-- AlterTable
ALTER TABLE "Transcript" ADD COLUMN     "importAttempts" INTEGER DEFAULT 0,
ADD COLUMN     "importError" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "importStatus" "TranscriptImportStatusType" DEFAULT 'pending';
