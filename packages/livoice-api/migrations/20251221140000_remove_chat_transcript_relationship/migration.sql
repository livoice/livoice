-- Drop the transcriptId column from Chat table as transcript relationship has been removed
ALTER TABLE "Chat" DROP COLUMN "transcriptId";
