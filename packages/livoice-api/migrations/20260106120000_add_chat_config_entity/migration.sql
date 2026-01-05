DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'ChatConfig' AND relkind = 'r') THEN
        CREATE TABLE "ChatConfig" (
            "id" TEXT NOT NULL,
            "name" TEXT NOT NULL DEFAULT '',
            "notes" TEXT NOT NULL DEFAULT '',
            "systemPrompt" TEXT NOT NULL DEFAULT '',
            "openai" JSONB,
            "context" JSONB,
            "segments" JSONB,
            "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3),
            CONSTRAINT "ChatConfig_pkey" PRIMARY KEY ("id")
        );
    END IF;
END $$;

-- CreateIndex: Unique name for ChatConfig
CREATE UNIQUE INDEX IF NOT EXISTS "ChatConfig_name_key" ON "ChatConfig"("name");

-- AlterTable: Add chatConfig relation and rename config to configSnapshot in Chat
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'Chat' AND column_name = 'chatConfig'
    ) THEN
        ALTER TABLE "Chat" ADD COLUMN "chatConfig" TEXT;
    END IF;
END $$;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'Chat' AND column_name = 'config'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'Chat' AND column_name = 'configSnapshot'
    ) THEN
        ALTER TABLE "Chat" RENAME COLUMN "config" TO "configSnapshot";
    END IF;
END $$;

-- DropColumn: Remove systemPrompt from Chat (now in ChatConfig/configSnapshot)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'Chat' AND column_name = 'systemPrompt'
    ) THEN
        ALTER TABLE "Chat" DROP COLUMN "systemPrompt";
    END IF;
END $$;

-- CreateIndex: Index for chatConfig foreign key
CREATE INDEX IF NOT EXISTS "Chat_chatConfig_idx" ON "Chat"("chatConfig");

-- AddForeignKey: Chat -> ChatConfig
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'Chat_chatConfig_fkey'
    ) THEN
        ALTER TABLE "Chat"
            ADD CONSTRAINT "Chat_chatConfig_fkey"
            FOREIGN KEY ("chatConfig") REFERENCES "ChatConfig"("id")
            ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

