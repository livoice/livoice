CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE "Transcript" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "intervieweeName" TEXT,
  "transcriptDate" TIMESTAMPTZ NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "TranscriptChunk" (
  "id" TEXT PRIMARY KEY,
  "transcriptId" TEXT NOT NULL REFERENCES "Transcript"("id") ON DELETE CASCADE,
  "speaker" TEXT,
  "text" TEXT NOT NULL,
  "absolute_timestamp" DOUBLE PRECISION,
  "duration_seconds" DOUBLE PRECISION,
  "metadata" JSONB,
  "embedding" VECTOR(1536)
);

CREATE INDEX "TranscriptChunk_transcriptId_index" ON "TranscriptChunk" ("transcriptId");
CREATE INDEX "TranscriptChunk_embedding_index" ON "TranscriptChunk" USING ivfflat ("embedding") WITH (lists = 100);

CREATE TYPE "MessageRole" AS ENUM ('user', 'assistant');

CREATE TABLE "ChatSession" (
  "id" TEXT PRIMARY KEY,
  "transcriptId" TEXT NOT NULL REFERENCES "Transcript"("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "ChatMessage" (
  "id" TEXT PRIMARY KEY,
  "sessionId" TEXT NOT NULL REFERENCES "ChatSession"("id") ON DELETE CASCADE,
  "role" "MessageRole" NOT NULL,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);
