-- Change ActorLink.linkType from enum to text
ALTER TABLE "ActorLink" ALTER COLUMN "linkType" DROP DEFAULT;
ALTER TABLE "ActorLink" ALTER COLUMN "linkType" TYPE text USING "linkType"::text;

-- Drop old enum type
DROP TYPE IF EXISTS "ActorLinkLinkTypeType";

