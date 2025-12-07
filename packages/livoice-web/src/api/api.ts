import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import {
  chatTranscript as fetchChatTranscript,
  fetchTranscriptChunks,
  fetchTranscript as fetchTranscriptDetail,
  fetchTranscripts,
  uploadTranscriptText as sendTranscriptText,
  type ChatRequest,
  type ChatResponse,
  type TranscriptChunk,
  type TranscriptDetail,
  type TranscriptSummary,
  type UploadTextRequest
} from '@/services/transcripts';

export type { ChatResponse, TranscriptChunk, TranscriptDetail, TranscriptSummary };

export const useListTranscriptsQuery = (options?: UseQueryOptions<TranscriptSummary[]>) =>
  useQuery<TranscriptSummary[]>({
    queryKey: ['transcripts'],
    queryFn: fetchTranscripts,
    ...options
  });

export const useGetTranscriptQuery = (id: string, options?: UseQueryOptions<TranscriptDetail>) => {
  const { enabled, ...restOptions } = options ?? {};

  return useQuery<TranscriptDetail>({
    queryKey: ['transcripts', id],
    queryFn: () => fetchTranscriptDetail(id),
    enabled: enabled ?? Boolean(id),
    ...restOptions
  });
};

export const useListTranscriptChunksQuery = (id: string, options?: UseQueryOptions<TranscriptChunk[]>) => {
  const { enabled, ...restOptions } = options ?? {};

  return useQuery<TranscriptChunk[]>({
    queryKey: ['transcripts', id, 'chunks'],
    queryFn: () => fetchTranscriptChunks(id),
    enabled: enabled ?? Boolean(id),
    ...restOptions
  });
};

export const useUploadTranscriptTextMutation = (
  options?: UseMutationOptions<{ chunksCreated: number }, unknown, { id: string; body: UploadTextRequest }>
) =>
  useMutation({
    mutationFn: ({ id, body }) => sendTranscriptText({ id, body }),
    ...options
  });

export const useChatTranscriptMutation = (
  options?: UseMutationOptions<ChatResponse, unknown, { id: string; body: ChatRequest }>
) =>
  useMutation({
    mutationFn: ({ id, body }) => fetchChatTranscript({ id, body }),
    ...options
  });

