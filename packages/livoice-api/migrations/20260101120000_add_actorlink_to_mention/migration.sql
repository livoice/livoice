-- AlterTable: Add actorLink column to ActorMention
ALTER TABLE "ActorMention" ADD COLUMN "actorLink" TEXT;

-- CreateIndex
CREATE INDEX "ActorMention_actorLink_idx" ON "ActorMention"("actorLink");

-- AddForeignKey
ALTER TABLE "ActorMention" ADD CONSTRAINT "ActorMention_actorLink_fkey" FOREIGN KEY ("actorLink") REFERENCES "ActorLink"("id") ON DELETE SET NULL ON UPDATE CASCADE;

