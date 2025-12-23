/*
  Warnings:

  - You are about to drop the `_ChatMessage_segments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ChatMessage_segments" DROP CONSTRAINT "_ChatMessage_segments_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatMessage_segments" DROP CONSTRAINT "_ChatMessage_segments_B_fkey";

-- DropTable
DROP TABLE "_ChatMessage_segments";
