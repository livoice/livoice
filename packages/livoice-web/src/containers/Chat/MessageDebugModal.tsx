import { X } from 'lucide-react';
import { type ReactNode, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import type { ChatMessageDebugData } from '@/gql/generated';

type TabId = 'config' | 'context' | 'segments' | 'request';

const formatMs = (value?: number | null) => {
  if (typeof value !== 'number') return '00:00:00';
  const totalSeconds = Math.floor(Math.max(0, value) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map(unit => unit.toString().padStart(2, '0')).join(':');
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const extractKeywords = (text: string) => {
  const matches = text.toLowerCase().match(/\b[a-z0-9]{3,}\b/g) ?? [];
  return Array.from(new Set(matches));
};

const highlightSegmentText = (text: string, keywords: string[]): ReactNode => {
  if (!keywords.length) return text;
  const pattern = new RegExp(`(${keywords.map(escapeRegExp).join('|')})`, 'gi');
  return text.split(pattern).map((chunk, index) => {
    if (!chunk) return '';
    const matched = keywords.find(keyword => keyword.toLowerCase() === chunk.toLowerCase());
    return matched ? (
      <mark key={`${chunk}-${index}`} className="rounded bg-yellow-100 px-1 py-0.5 text-yellow-900">
        {chunk}
      </mark>
    ) : (
      chunk
    );
  });
};

const getSimilarityLabel = (score: number | null | undefined) => {
  if (score == null) return { label: 'unknown similarity', range: 'no score' };
  if (score < 0.25) return { label: 'very similar', range: '< 0.25' };
  if (score < 0.5) return { label: 'quite similar', range: '0.25 - 0.5' };
  if (score < 0.75) return { label: 'somewhat similar', range: '0.5 - 0.75' };
  return { label: 'a little similar', range: '> 0.75' };
};

interface MessageDebugModalProps {
  open: boolean;
  onClose: () => void;
  message: { role: 'user' | 'assistant'; content: string } | null;
  debugData: ChatMessageDebugData | null;
}

const tabs: { id: TabId; label: string }[] = [
  { id: 'config', label: 'Config' },
  { id: 'context', label: 'Context' },
  { id: 'segments', label: 'Segments' },
  { id: 'request', label: 'Sent to OpenAI' }
];

export default function MessageDebugModal({ open, onClose, message, debugData }: MessageDebugModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>('config');

  const questionText = useMemo(() => {
    if (!debugData?.userMessageWithContext) return '';
    const parts = debugData.userMessageWithContext.split('Question: ');
    return parts.at(-1)?.trim() ?? '';
  }, [debugData?.userMessageWithContext]);

  const keywords = useMemo(() => extractKeywords(questionText), [questionText]);

  const sortedSegments = useMemo(() => {
    if (!debugData?.segments) return [];
    return [...debugData.segments].sort((a, b) => (a.similarityScore ?? 0) - (b.similarityScore ?? 0));
  }, [debugData?.segments]);

  if (!open || !debugData) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[1600] flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto"
      onClick={event => {
        event.stopPropagation();
        onClose();
      }}
    >
      <div
        className="w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/70 bg-white/95 p-6 shadow-elevated"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Debug Info</p>
            <h3 className="text-lg font-semibold text-slate-900">
              {message?.role === 'assistant' ? 'Assistant response' : 'Message'}
            </h3>
            {message?.content ? <p className="mt-1 max-w-2xl text-sm text-slate-500">{message.content}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:text-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                activeTab === tab.id
                  ? 'border border-violet-300 bg-violet-50 text-violet-700'
                  : 'border border-slate-200 bg-white text-slate-500'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-4" onWheel={event => event.stopPropagation()}>
          {activeTab === 'config' && (
            <section className="space-y-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-sm text-slate-700">
                <p className="text-xs uppercase text-slate-500">System Prompt</p>
                <pre className="mt-2 max-h-100 overflow-y-auto whitespace-pre-wrap text-xs text-slate-600">
                  {debugData.config.systemPrompt}
                </pre>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm text-slate-600">
                <div>
                  <p className="text-xs uppercase text-slate-500">Model</p>
                  <p className="font-semibold text-slate-900">{debugData.config.openai.model}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">Temperature</p>
                  <p>{debugData.config.openai.temperature.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">Max Output Tokens</p>
                  <p>{debugData.config.openai.maxOutputTokens}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">Max Input Tokens</p>
                  <p>{debugData.config.context.maxInputTokens}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">Reserved Tokens</p>
                  <p>{debugData.config.context.reservedTokens}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">History Token Budget</p>
                  <p>{debugData.config.context.historyTokenBudget}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">Segment Token Budget</p>
                  <p>{debugData.config.segments.tokenBudget}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">Max Segments</p>
                  <p>{debugData.config.segments.maxCount}</p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'context' && (
            <section className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 uppercase tracking-[0.3em]">
                <span>History tokens</span>
                <span>
                  {debugData.history.tokensUsed} / {debugData.history.tokenBudget}
                </span>
              </div>
              {debugData.history.messages.length ? (
                <div className="space-y-2">
                  {debugData.history.messages.map((historyMessage, index) => (
                    <div
                      key={`${historyMessage.role}-${index}`}
                      className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3"
                    >
                      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-slate-500">
                        <span>{historyMessage.role}</span>
                        <span>{historyMessage.tokens} tokens</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-700 whitespace-pre-wrap">{historyMessage.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No history messages were included.</p>
              )}
            </section>
          )}

          {activeTab === 'segments' && (
            <section className="space-y-4 max-h-[62vh] overflow-y-auto pr-1" onWheel={event => event.stopPropagation()}>
              <div className="sticky top-0 z-10 flex items-center justify-between px-3 py-2 text-xs uppercase tracking-[0.3em] text-slate-500 background-white/95 backdrop-blur">
                <span>Segments used: {sortedSegments.length}</span>
                <span>Segment tokens: {debugData.segmentTokensUsed}</span>
              </div>
              {sortedSegments.length ? (
                <div className="space-y-3">
                  {sortedSegments.map(segment => {
                    const similarity = getSimilarityLabel(segment.similarityScore);
                    return (
                      <div key={segment.id} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                          <span>{segment.transcriptTitle ?? 'Transcript'}</span>
                          <span>
                            {formatMs(segment.startMs)} — {formatMs(segment.endMs)}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span>
                            Similarity: {segment.similarityScore?.toFixed(3) ?? 'n/a'} ·{' '}
                            <span className="text-[10px] text-slate-400">
                              {similarity.label} ({similarity.range})
                            </span>
                          </span>
                          <span>Tokens: {segment.estimatedTokens}</span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">
                          {highlightSegmentText(segment.text, keywords)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No transcript segments were attached to this response.</p>
              )}
            </section>
          )}

          {activeTab === 'request' && (
            <section className="space-y-4 max-h-[62vh] overflow-y-auto pr-1" onWheel={event => event.stopPropagation()}>
              <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-sm text-slate-700">
                <details>
                  <summary className="cursor-pointer sticky top-0 font-semibold text-slate-900 background-white/95 backdrop-blur">
                    User Message + Context
                  </summary>
                  <p className="mt-2 whitespace-pre-wrap text-xs text-slate-600">{debugData.userMessageWithContext}</p>
                </details>
                <details>
                  <summary className="cursor-pointer sticky top-0 font-semibold text-slate-900 background-white/95 backdrop-blur">
                    System Prompt (resolved)
                  </summary>
                  <p className="mt-2 whitespace-pre-wrap text-xs text-slate-600">{debugData.resolvedSystemPrompt}</p>
                </details>
                <details>
                  <summary className="cursor-pointer sticky top-0 font-semibold text-slate-900 background-white/95 backdrop-blur">
                    System Prompt (raw)
                  </summary>
                  <p className="mt-2 whitespace-pre-wrap text-xs text-slate-600">{debugData.config.systemPrompt}</p>
                </details>
              </div>
              <div className="grid gap-3 md:grid-cols-3 text-sm text-slate-600">
                <div>
                  <p className="text-xs uppercase text-slate-500">Model</p>
                  <p className="font-semibold text-slate-900">{debugData.openaiResponse.model}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">Prompt Tokens</p>
                  <p>{debugData.openaiResponse.promptTokens ?? '—'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">Completion Tokens</p>
                  <p>{debugData.openaiResponse.completionTokens ?? '—'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">Total Tokens</p>
                  <p>{debugData.openaiResponse.totalTokens ?? '—'}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                <span>Started</span>
                <span>{new Date(debugData.timing.startedAt).toLocaleString()}</span>
                <span>Completed</span>
                <span>{new Date(debugData.timing.completedAt).toLocaleString()}</span>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
