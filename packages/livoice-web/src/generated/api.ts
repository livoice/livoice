import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetcher } from '../services/apiClient';

export type TranscriptSummary = {
  id: string;
  title: string;
  description?: string | null;
  intervieweeName?: string | null;
  transcriptDate: string;
  createdAt: string;
  updatedAt: string;
  chunkCount: number;
};

export type TranscriptDetail = TranscriptSummary & {
  textPreview: string;
};

export type TranscriptChunk = {
  id: string;
  speaker?: string | null;
  text: string;
  absoluteTimestamp?: number | null;
  durationSeconds?: number | null;
};

export type ChatResponse = {
  sessionId: string;
  answer: string;
  usedChunks: TranscriptChunk[];
};

export type UploadTextRequest = {
  text: string;
  timeline?: Array<{ absoluteTimestamp?: number; durationSeconds?: number; speaker?: string }>;
};

export type ChatRequest = {
  userMessage: string;
  sessionId?: string;
};

export const useListTranscriptsQuery = (options?: UseQueryOptions<TranscriptSummary[]>) =>
  useQuery({
    queryKey: ['transcripts'],
    queryFn: () => fetcher('/transcripts') as Promise<TranscriptSummary[]>,
    ...options
  });

export const useGetTranscriptQuery = (id: string, options?: UseQueryOptions<TranscriptDetail>) =>
  useQuery({
    queryKey: ['transcripts', id],
    queryFn: () => fetcher(`/transcripts/${id}`) as Promise<TranscriptDetail>,
    ...options
  });

export const useListTranscriptChunksQuery = (id: string, options?: UseQueryOptions<TranscriptChunk[]>) =>
  useQuery({
    queryKey: ['transcripts', id, 'chunks'],
    queryFn: () => fetcher(`/transcripts/${id}/chunks`) as Promise<TranscriptChunk[]>,
    ...options
  });

export const useUploadTranscriptTextMutation = (
  options?: UseMutationOptions<{ chunksCreated: number }, unknown, { id: string; body: UploadTextRequest }>
) =>
  useMutation({
    mutationFn: async ({ id, body }: { id: string; body: UploadTextRequest }) =>
      fetcher(`/transcripts/${id}/upload-text`, {
        method: 'POST',
        body: JSON.stringify(body)
      }),
    ...options
  });

export const useChatTranscriptMutation = (
  options?: UseMutationOptions<ChatResponse, unknown, { id: string; body: ChatRequest }>
) =>
  useMutation({
    mutationFn: async ({ id, body }: { id: string; body: ChatRequest }) =>
      fetcher(`/transcripts/${id}/chat`, {
        method: 'POST',
        body: JSON.stringify(body)
      }) as Promise<ChatResponse>,
    ...options
  });
