import { useMemo, useState, type FormEvent } from 'react';

import { cn } from '@/lib/cn';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { TextField } from '@/ui/text-field';

type SegmentReference = {
  id: string;
  startMs: number | null;
  endMs: number | null;
  text: string;
  speaker?: string | null;
  transcriptTitle?: string | null;
};

export type ChatMessageItem = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: string | null;
  segments: SegmentReference[];
};

type ChatPanelProps = {
  title: string;
  subtitle?: string;
  messages: ChatMessageItem[];
  placeholder?: string;
  isBusy?: boolean;
  onSend: (message: string) => Promise<void>;
};

const formatTime = (value?: number | null) => {
  if (typeof value !== 'number') return '00:00:00';
  const totalSeconds = Math.floor(Math.max(0, value) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map(unit => unit.toString().padStart(2, '0')).join(':');
};

const formatRange = (segment: SegmentReference) => {
  const start = formatTime(segment.startMs);
  const end = formatTime(segment.endMs);
  return `${start}—${end}`;
};

const ChatPanel = ({ title, subtitle, messages, placeholder, isBusy, onSend }: ChatPanelProps) => {
  const [draft, setDraft] = useState('');
  const canSend = Boolean(draft.trim()) && !isBusy;

  const groupedMessages = useMemo(() => messages ?? [], [messages]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    await onSend(trimmed);
    setDraft('');
  };

  return (
    <Card className="space-y-4">
      <div>
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        </div>
        {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
      </div>

      <div className="space-y-3">
        {groupedMessages.length ? (
          <div className="space-y-3">
            {groupedMessages.map(message => (
              <div
                key={message.id}
                className={cn(
                  'rounded-2xl border px-4 py-3 text-sm shadow-sm transition',
                  message.role === 'user'
                    ? 'border-violet-100 bg-violet-50 text-violet-900'
                    : 'border-slate-100 bg-white/80 text-slate-800'
                )}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                  <span>{message.role === 'user' ? 'You' : 'Assistant'}</span>
                  {message.createdAt ? <span>{new Date(message.createdAt).toLocaleTimeString()}</span> : null}
                </div>
                <p className="mt-2 whitespace-pre-line font-normal leading-relaxed">{message.content}</p>
                {message.segments.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.segments.map(segment => (
                      <span
                        key={segment.id}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600"
                      >
                        {segment.transcriptTitle ? `${segment.transcriptTitle}: ` : ''}
                        {formatRange(segment)}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">{placeholder ?? 'Start a conversation...'}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <TextField
          multiline
          rows={3}
          placeholder={placeholder ?? 'Ask anything...'}
          value={draft}
          onChange={event => setDraft(event.target.value)}
        />
        <Button type="submit" className="w-full" disabled={!canSend}>
          {isBusy ? 'Sending…' : 'Send question'}
        </Button>
      </form>
    </Card>
  );
};

export default ChatPanel;

