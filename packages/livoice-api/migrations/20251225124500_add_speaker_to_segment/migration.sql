-- Add speaker text column to TranscriptSegment for storing resolved speaker names
ALTER TABLE "TranscriptSegment" ADD COLUMN IF NOT EXISTS "speaker" text DEFAULT '';

