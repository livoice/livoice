-- CreateEnum
CREATE TYPE "UserRoleType" AS ENUM ('USER', 'PROJECT_ADMIN', 'ORG_ADMIN', 'ORG_OWNER', 'GOD');

-- CreateEnum
CREATE TYPE "UserProviderType" AS ENUM ('google');

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'AI chat',
    "contextType" TEXT NOT NULL,
    "org" TEXT,
    "project" TEXT,
    "transcript" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "chat" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "content" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "autojoinDomains" JSONB DEFAULT '[]',

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "org" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transcript" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "intervieweeName" TEXT NOT NULL DEFAULT '',
    "sourceUrl" TEXT NOT NULL DEFAULT '',
    "language" TEXT NOT NULL DEFAULT '',
    "notes" TEXT NOT NULL DEFAULT '',
    "project" TEXT,
    "org" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Transcript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TranscriptSegment" (
    "id" TEXT NOT NULL,
    "transcript" TEXT,
    "index" INTEGER,
    "startMs" INTEGER,
    "endMs" INTEGER,
    "durationMs" INTEGER,
    "text" TEXT NOT NULL DEFAULT '',
    "speaker" TEXT NOT NULL DEFAULT '',
    "isMetadata" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TranscriptSegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "avatarSocialUrl" TEXT NOT NULL DEFAULT '',
    "avatarUploaded" JSONB,
    "email" TEXT NOT NULL DEFAULT '',
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "role" "UserRoleType" DEFAULT 'USER',
    "providerAccountId" TEXT NOT NULL DEFAULT '',
    "provider" "UserProviderType" NOT NULL DEFAULT 'google',
    "rawAuth" JSONB,
    "org" TEXT,
    "project" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "provisionedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "seenAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChatMessage_segments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Chat_org_idx" ON "Chat"("org");

-- CreateIndex
CREATE INDEX "Chat_project_idx" ON "Chat"("project");

-- CreateIndex
CREATE INDEX "Chat_transcript_idx" ON "Chat"("transcript");

-- CreateIndex
CREATE INDEX "ChatMessage_chat_idx" ON "ChatMessage"("chat");

-- CreateIndex
CREATE INDEX "Project_org_idx" ON "Project"("org");

-- CreateIndex
CREATE INDEX "Transcript_project_idx" ON "Transcript"("project");

-- CreateIndex
CREATE INDEX "Transcript_org_idx" ON "Transcript"("org");

-- CreateIndex
CREATE INDEX "TranscriptSegment_transcript_idx" ON "TranscriptSegment"("transcript");

-- CreateIndex
CREATE UNIQUE INDEX "User_providerAccountId_key" ON "User"("providerAccountId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_org_idx" ON "User"("org");

-- CreateIndex
CREATE INDEX "User_project_idx" ON "User"("project");

-- CreateIndex
CREATE UNIQUE INDEX "_ChatMessage_segments_AB_unique" ON "_ChatMessage_segments"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatMessage_segments_B_index" ON "_ChatMessage_segments"("B");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_org_fkey" FOREIGN KEY ("org") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_project_fkey" FOREIGN KEY ("project") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_transcript_fkey" FOREIGN KEY ("transcript") REFERENCES "Transcript"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_chat_fkey" FOREIGN KEY ("chat") REFERENCES "Chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_org_fkey" FOREIGN KEY ("org") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_project_fkey" FOREIGN KEY ("project") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_org_fkey" FOREIGN KEY ("org") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranscriptSegment" ADD CONSTRAINT "TranscriptSegment_transcript_fkey" FOREIGN KEY ("transcript") REFERENCES "Transcript"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_org_fkey" FOREIGN KEY ("org") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_project_fkey" FOREIGN KEY ("project") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatMessage_segments" ADD CONSTRAINT "_ChatMessage_segments_A_fkey" FOREIGN KEY ("A") REFERENCES "ChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatMessage_segments" ADD CONSTRAINT "_ChatMessage_segments_B_fkey" FOREIGN KEY ("B") REFERENCES "TranscriptSegment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
