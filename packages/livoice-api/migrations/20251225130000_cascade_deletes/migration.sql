-- Ensure transcript deletes cascade to segments and mentions
ALTER TABLE "TranscriptSegment" DROP CONSTRAINT IF EXISTS "TranscriptSegment_transcript_fkey";
ALTER TABLE "TranscriptSegment"
  ADD CONSTRAINT "TranscriptSegment_transcript_fkey"
  FOREIGN KEY ("transcript") REFERENCES "Transcript"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ActorMention" DROP CONSTRAINT IF EXISTS "ActorMention_transcript_fkey";
ALTER TABLE "ActorMention"
  ADD CONSTRAINT "ActorMention_transcript_fkey"
  FOREIGN KEY ("transcript") REFERENCES "Transcript"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Ensure source deletes cascade to transcripts, segments, and mentions
ALTER TABLE "Transcript" DROP CONSTRAINT IF EXISTS "Transcript_source_fkey";
ALTER TABLE "Transcript"
  ADD CONSTRAINT "Transcript_source_fkey"
  FOREIGN KEY ("source") REFERENCES "Source"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "TranscriptSegment" DROP CONSTRAINT IF EXISTS "TranscriptSegment_source_fkey";
ALTER TABLE "TranscriptSegment"
  ADD CONSTRAINT "TranscriptSegment_source_fkey"
  FOREIGN KEY ("source") REFERENCES "Source"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ActorMention" DROP CONSTRAINT IF EXISTS "ActorMention_source_fkey";
ALTER TABLE "ActorMention"
  ADD CONSTRAINT "ActorMention_source_fkey"
  FOREIGN KEY ("source") REFERENCES "Source"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Ensure segment deletes cascade to mentions
ALTER TABLE "ActorMention" DROP CONSTRAINT IF EXISTS "ActorMention_segment_fkey";
ALTER TABLE "ActorMention"
  ADD CONSTRAINT "ActorMention_segment_fkey"
  FOREIGN KEY ("segment") REFERENCES "TranscriptSegment"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

