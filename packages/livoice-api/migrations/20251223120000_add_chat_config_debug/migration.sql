-- Add config JSON to Chat table
ALTER TABLE "Chat"
ADD COLUMN "config" JSONB;

-- Add debugData JSON to ChatMessage table
ALTER TABLE "ChatMessage"
ADD COLUMN "debugData" JSONB;

-- Migrate existing systemPrompt into config JSON for existing chats
UPDATE "Chat"
SET "config" = jsonb_build_object(
  'systemPrompt', COALESCE("systemPrompt", ''),
  'openai', jsonb_build_object(
    'model', 'gpt-4o-mini',
    'temperature', 0.25,
    'maxOutputTokens', 700
  ),
  'context', jsonb_build_object(
    'maxInputTokens', 8000,
    'reservedTokens', 1500,
    'historyTokenBudget', 4000
  ),
  'segments', jsonb_build_object(
    'tokenBudget', 2000,
    'maxCount', 20
  )
)
WHERE "config" IS NULL;

