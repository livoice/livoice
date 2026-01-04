import type { Prisma } from '@prisma/client';
import type { ChatCompletionRequestMessage } from 'openai/resources/chat';

export type SegmentRecord = {
  id: string;
  text: string;
  startMs?: number | null;
  endMs?: number | null;
  speaker?: string | null;
  isMetadata?: boolean | null;
  transcript?: {
    id: string;
    title?: string | null;
    publishedAt?: Date | string | null;
  } | null;
  similarityScore?: number | null;
  estimatedTokens?: number;
  speakerActor?: {
    id: string;
    name?: string | null;
    type?: string | null;
  } | null;
};

export type SegmentWithMeta = SegmentRecord & {
  estimatedTokens: number;
};

export type ActorMentionWithRelations = Prisma.ActorMentionGetPayload<{
  include: { actor: true; segment: true };
}>;

export type MentionInfo = {
  name: string;
  type?: string | null;
  mentionType?: string | null;
  sentiment?: string | null;
};

export type SegmentReference = {
  id: string;
  text: string;
  startMs: number | null;
  endMs: number | null;
  speaker?: string | null;
  transcriptTitle?: string | null;
};

export type ChatConfig = {
  name?: string;
  systemPrompt: string;
  openai: {
    model: string;
    temperature: number;
    maxOutputTokens: number;
  };
  context: {
    maxInputTokens: number;
    reservedTokens: number;
    historyTokenBudget: number;
  };
  segments: {
    tokenBudget: number;
    maxCount: number;
  };
};

export type MessageDebugData = {
  config: ChatConfig;
  resolvedSystemPrompt: string;
  userMessageWithContext: string;
  history: {
    messagesIncluded: number;
    tokensUsed: number;
    tokenBudget: number;
    messages: Array<{ role: 'user' | 'assistant'; content: string; tokens: number }>;
  };
  segments: Array<{
    id: string;
    text: string;
    transcriptTitle: string | null;
    publishedAt?: string | Date | null;
    speaker: string | null;
    speakerActorName?: string | null;
    speakerActorType?: string | null;
    startMs: number | null;
    endMs: number | null;
    similarityScore: number | null;
    estimatedTokens: number;
    mentions?: MentionInfo[];
  }>;
  segmentTokensUsed: number;
  openaiResponse: {
    model: string;
    promptTokens: number | null;
    completionTokens: number | null;
    totalTokens: number | null;
  };
  timing: {
    startedAt: string;
    completedAt: string;
  };
};

export type ChatHistoryItem = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string | null;
  debugData?: MessageDebugData | null;
};

export type FetchSegmentsParams = {
  context: any;
  projectId: string;
  queryText?: string;
  maxSegments: number;
};

export type RawSegment = {
  id: string;
  text: string;
  startMs: number | null;
  endMs: number | null;
  isMetadata: boolean | null;
  transcriptId?: string | null;
  transcriptTitle?: string | null;
  publishedAt?: Date | string | null;
  similarityScore?: number | null;
  speakerActorId?: string | null;
  speakerActorName?: string | null;
  speakerActorType?: string | null;
};

export type SystemPromptContext = {
  projectName: string;
  transcriptTitles: string[];
  sourceNames: string[];
  actorsSummary?: string;
  speakersSummary?: string;
  dateRange?: string;
  totalTranscripts?: number;
};

export type OpenAiMessagesResult = {
  messages: ChatCompletionRequestMessage[];
  historyTokens: number;
  historyCount: number;
  historyMessages: Array<{ role: 'user' | 'assistant'; content: string; tokens: number }>;
};

