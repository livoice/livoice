-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "user" TEXT;

-- CreateIndex
CREATE INDEX "Chat_user_idx" ON "Chat"("user");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
