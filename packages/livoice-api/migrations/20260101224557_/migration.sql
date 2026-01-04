/*
  Warnings:

  - You are about to drop the `_Source_speakerActors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Transcript_speakerActors` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "ActorTypeType" ADD VALUE IF NOT EXISTS 'book';

-- DropForeignKey
ALTER TABLE "ActorMention" DROP CONSTRAINT IF EXISTS "ActorMention_segment_fkey";

-- DropForeignKey
ALTER TABLE "ActorMention" DROP CONSTRAINT IF EXISTS "ActorMention_source_fkey";

-- DropForeignKey
ALTER TABLE "ActorMention" DROP CONSTRAINT IF EXISTS "ActorMention_transcript_fkey";

-- DropForeignKey
ALTER TABLE "Transcript" DROP CONSTRAINT IF EXISTS "Transcript_source_fkey";

-- DropForeignKey
ALTER TABLE "TranscriptSegment" DROP CONSTRAINT IF EXISTS "TranscriptSegment_source_fkey";

-- DropForeignKey
ALTER TABLE "TranscriptSegment" DROP CONSTRAINT IF EXISTS "TranscriptSegment_transcript_fkey";

-- DropForeignKey
ALTER TABLE IF EXISTS "_Source_speakerActors" DROP CONSTRAINT IF EXISTS "_Source_speakerActors_A_fkey";

-- DropForeignKey
ALTER TABLE IF EXISTS "_Source_speakerActors" DROP CONSTRAINT IF EXISTS "_Source_speakerActors_B_fkey";

-- DropForeignKey
ALTER TABLE IF EXISTS "_Transcript_speakerActors" DROP CONSTRAINT IF EXISTS "_Transcript_speakerActors_A_fkey";

-- DropForeignKey
ALTER TABLE IF EXISTS "_Transcript_speakerActors" DROP CONSTRAINT IF EXISTS "_Transcript_speakerActors_B_fkey";

-- DropIndex
DROP INDEX IF EXISTS "Actor_name_trgm_idx";

-- DropIndex
DROP INDEX IF EXISTS "Actor_name_type_key";

-- AlterTable
ALTER TABLE "ActorLink" ALTER COLUMN "linkType" SET DEFAULT '';

-- DropTable
DROP TABLE IF EXISTS "_Source_speakerActors";

-- DropTable
DROP TABLE IF EXISTS "_Transcript_speakerActors";

-- CreateTable
CREATE TABLE IF NOT EXISTS "_Actor_speakerSources" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "_Actor_speakerTranscripts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "_Actor_speakerSources_AB_unique" ON "_Actor_speakerSources"("A", "B");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "_Actor_speakerSources_B_index" ON "_Actor_speakerSources"("B");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "_Actor_speakerTranscripts_AB_unique" ON "_Actor_speakerTranscripts"("A", "B");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "_Actor_speakerTranscripts_B_index" ON "_Actor_speakerTranscripts"("B");

-- AddForeignKey
ALTER TABLE "ActorMention" ADD CONSTRAINT "ActorMention_segment_fkey" FOREIGN KEY ("segment") REFERENCES "TranscriptSegment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActorMention" ADD CONSTRAINT "ActorMention_transcript_fkey" FOREIGN KEY ("transcript") REFERENCES "Transcript"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActorMention" ADD CONSTRAINT "ActorMention_source_fkey" FOREIGN KEY ("source") REFERENCES "Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_source_fkey" FOREIGN KEY ("source") REFERENCES "Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranscriptSegment" ADD CONSTRAINT "TranscriptSegment_transcript_fkey" FOREIGN KEY ("transcript") REFERENCES "Transcript"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranscriptSegment" ADD CONSTRAINT "TranscriptSegment_source_fkey" FOREIGN KEY ("source") REFERENCES "Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Actor_speakerSources" ADD CONSTRAINT "_Actor_speakerSources_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Actor_speakerSources" ADD CONSTRAINT "_Actor_speakerSources_B_fkey" FOREIGN KEY ("B") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Actor_speakerTranscripts" ADD CONSTRAINT "_Actor_speakerTranscripts_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Actor_speakerTranscripts" ADD CONSTRAINT "_Actor_speakerTranscripts_B_fkey" FOREIGN KEY ("B") REFERENCES "Transcript"("id") ON DELETE CASCADE ON UPDATE CASCADE;
