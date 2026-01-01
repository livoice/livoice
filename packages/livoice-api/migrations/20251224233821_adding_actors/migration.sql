/*
  Warnings:

  - You are about to drop the column `speaker` on the `TranscriptSegment` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ActorTypeType" AS ENUM ('person', 'organization', 'product', 'event', 'topic', 'location', 'brand');

-- CreateEnum
CREATE TYPE "ActorMentionMentionTypeType" AS ENUM ('speaker', 'mentioned', 'host', 'guest', 'sponsor', 'channel_owner', 'topic');

-- CreateEnum
CREATE TYPE "ActorMentionSentimentType" AS ENUM ('positive', 'negative', 'neutral');

-- CreateEnum
CREATE TYPE "ActorMentionEmotionType" AS ENUM ('neutral', 'happy', 'excited', 'stressed', 'frustrated', 'angry', 'sad', 'confident', 'uncertain');

-- CreateEnum
CREATE TYPE "ActorMentionDetectionSourceType" AS ENUM ('ai', 'youtube');

-- CreateEnum
CREATE TYPE "ActorLinkLinkTypeType" AS ENUM ('employment', 'founder', 'investor', 'competitor', 'partner', 'parent_subsidiary', 'spokesperson');

-- CreateEnum
CREATE TYPE "ActorLinkDetectionSourceType" AS ENUM ('ai', 'youtube');

-- CreateEnum
CREATE TYPE "TranscriptAnalysisStatusType" AS ENUM ('pending', 'processing', 'completed', 'failed', 'skipped');

-- AlterTable
ALTER TABLE "Transcript" ADD COLUMN     "chapters" JSONB,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "analysisAt" TIMESTAMP(3),
ADD COLUMN     "analysisAttempts" INTEGER DEFAULT 0,
ADD COLUMN     "analysisError" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "analysisStatus" "TranscriptAnalysisStatusType" DEFAULT 'pending',
ADD COLUMN     "rawSrt" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "TranscriptSegment" DROP COLUMN "speaker",
ADD COLUMN     "speakerActor" TEXT;

-- Enable trigram extension for fuzzy actor search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "type" "ActorTypeType" NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "aliases" JSONB,
    "externalIds" JSONB,
    "metadata" JSONB,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "org" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActorMention" (
    "id" TEXT NOT NULL,
    "actor" TEXT,
    "segment" TEXT,
    "transcript" TEXT,
    "source" TEXT,
    "mentionType" "ActorMentionMentionTypeType" NOT NULL,
    "sentiment" "ActorMentionSentimentType",
    "emotion" "ActorMentionEmotionType",
    "confidence" DOUBLE PRECISION,
    "detectionSource" "ActorMentionDetectionSourceType",
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActorMention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActorLink" (
    "id" TEXT NOT NULL,
    "fromActor" TEXT,
    "toActor" TEXT,
    "linkType" "ActorLinkLinkTypeType" NOT NULL,
    "role" TEXT NOT NULL DEFAULT '',
    "metadata" JSONB,
    "confidence" DOUBLE PRECISION,
    "detectionSource" "ActorLinkDetectionSourceType",
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActorLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Actor_org_idx" ON "Actor"("org");

-- CreateIndex
CREATE INDEX "ActorMention_actor_idx" ON "ActorMention"("actor");

-- CreateIndex
CREATE INDEX "ActorMention_segment_idx" ON "ActorMention"("segment");

-- CreateIndex
CREATE INDEX "ActorMention_transcript_idx" ON "ActorMention"("transcript");

-- CreateIndex
CREATE INDEX "ActorMention_source_idx" ON "ActorMention"("source");

-- CreateIndex
CREATE INDEX "ActorLink_fromActor_idx" ON "ActorLink"("fromActor");

-- CreateIndex
CREATE INDEX "ActorLink_toActor_idx" ON "ActorLink"("toActor");

-- Trigram index for fuzzy search on actor name
CREATE INDEX "Actor_name_trgm_idx" ON "Actor" USING gin ("name" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "TranscriptSegment_speakerActor_idx" ON "TranscriptSegment"("speakerActor");

-- AddForeignKey
ALTER TABLE "Actor" ADD CONSTRAINT "Actor_org_fkey" FOREIGN KEY ("org") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActorMention" ADD CONSTRAINT "ActorMention_actor_fkey" FOREIGN KEY ("actor") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActorMention" ADD CONSTRAINT "ActorMention_segment_fkey" FOREIGN KEY ("segment") REFERENCES "TranscriptSegment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActorMention" ADD CONSTRAINT "ActorMention_transcript_fkey" FOREIGN KEY ("transcript") REFERENCES "Transcript"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActorMention" ADD CONSTRAINT "ActorMention_source_fkey" FOREIGN KEY ("source") REFERENCES "Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActorLink" ADD CONSTRAINT "ActorLink_fromActor_fkey" FOREIGN KEY ("fromActor") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActorLink" ADD CONSTRAINT "ActorLink_toActor_fkey" FOREIGN KEY ("toActor") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranscriptSegment" ADD CONSTRAINT "TranscriptSegment_speakerActor_fkey" FOREIGN KEY ("speakerActor") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
