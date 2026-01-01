-- Drop foreign key and index, then column actorLink from ActorMention
ALTER TABLE "ActorMention" DROP CONSTRAINT IF EXISTS "ActorMention_actorLink_fkey";
DROP INDEX IF EXISTS "ActorMention_actorLink_idx";
ALTER TABLE "ActorMention" DROP COLUMN IF EXISTS "actorLink";

