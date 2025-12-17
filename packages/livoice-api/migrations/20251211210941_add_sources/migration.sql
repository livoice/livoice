/*
  Warnings:

  - You are about to drop the column `project` on the `Transcript` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SourceTypeType" AS ENUM ('youtube_channel');

-- CreateEnum
CREATE TYPE "SourceImportStatusType" AS ENUM ('idle', 'importing', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "TranscriptEmbeddingStatusType" AS ENUM ('pending', 'processing', 'completed', 'failed');

-- DropForeignKey
ALTER TABLE "Transcript" DROP CONSTRAINT "Transcript_project_fkey";

-- DropIndex
DROP INDEX "Transcript_project_idx";

-- AlterTable
ALTER TABLE "Transcript" DROP COLUMN "project",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "embeddingAttempts" INTEGER DEFAULT 0,
ADD COLUMN     "embeddingCompletedAt" TIMESTAMP(3),
ADD COLUMN     "embeddingError" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "embeddingStatus" "TranscriptEmbeddingStatusType" DEFAULT 'pending',
ADD COLUMN     "externalId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "source" TEXT,
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "type" "SourceTypeType" NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "externalId" TEXT NOT NULL DEFAULT '',
    "importStatus" "SourceImportStatusType" DEFAULT 'idle',
    "importStartedAt" TIMESTAMP(3),
    "importCompletedAt" TIMESTAMP(3),
    "importCronExpression" TEXT NOT NULL DEFAULT '',
    "importHistory" JSONB,
    "org" TEXT,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Project_sources" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Source_externalId_key" ON "Source"("externalId");

-- CreateIndex
CREATE INDEX "Source_org_idx" ON "Source"("org");

-- CreateIndex
CREATE UNIQUE INDEX "_Project_sources_AB_unique" ON "_Project_sources"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_sources_B_index" ON "_Project_sources"("B");

-- CreateIndex
CREATE INDEX "Transcript_source_idx" ON "Transcript"("source");

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_org_fkey" FOREIGN KEY ("org") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_source_fkey" FOREIGN KEY ("source") REFERENCES "Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_sources" ADD CONSTRAINT "_Project_sources_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_sources" ADD CONSTRAINT "_Project_sources_B_fkey" FOREIGN KEY ("B") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;
