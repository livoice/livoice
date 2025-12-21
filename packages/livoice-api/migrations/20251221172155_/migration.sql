/*
  Warnings:

  - You are about to drop the column `transcript` on the `Chat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_transcript_fkey";

-- DropIndex
DROP INDEX "Chat_transcript_idx";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "transcript";
