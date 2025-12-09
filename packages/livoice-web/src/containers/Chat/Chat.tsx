import { useApolloClient } from '@apollo/client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import FormDrawer from '@/components/FormDrawer/FormDrawer';
import {
  useChatProjectHistoryQuery,
  useChatProjectMutation,
  useChatTranscriptHistoryQuery,
  useChatTranscriptMutation
} from '@/gql/generated';
import { cn } from '@/lib/cn';
import { toProjectChat, toTranscriptChat } from '@/services/linker';
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

const markdownComponents: Components = {
  ol: ({ node, ...props }) => {
    void node;
    return <ol className="list-decimal space-y-1 pl-5" {...props} />;
  },
  ul: ({ node, ...props }) => {
    void node;
    return <ul className="list-disc space-y-1 pl-5" {...props} />;
  },
  li: ({ node, ...props }) => {
    void node;
    return <li className="ml-1" {...props} />;
  }
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

const Chat = () => {
  const { t } = useTranslation('common');
  const {
    projectId = '',
    transcriptId = '',
    chatId = ''
  } = useParams<{
    projectId?: string;
    transcriptId?: string;
    chatId?: string;
  }>();
  const isTranscriptContext = Boolean(transcriptId);
  const isNewChat = !chatId;
  const navigate = useNavigate();
  const client = useApolloClient();

  const [draft, setDraft] = useState('');
  const canSend = Boolean(draft.trim());
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const {
    data: transcriptHistory,
    loading: transcriptLoading,
    refetch: refetchTranscriptHistory
  } = useChatTranscriptHistoryQuery({
    variables: { transcriptId },
    skip: !isTranscriptContext || !transcriptId
  });

  const {
    data: projectHistory,
    loading: projectLoading,
    refetch: refetchProjectHistory
  } = useChatProjectHistoryQuery({
    variables: { projectId },
    skip: isTranscriptContext || !projectId
  });

  const [chatTranscript, { loading: sendingTranscript }] = useChatTranscriptMutation({
    onCompleted: result => {
      void refetchTranscriptHistory();
      void client.refetchQueries({ include: ['ProjectChats', 'TranscriptChats'] });
      const createdId = result?.chatTranscript?.chatId;
      if (createdId && isNewChat) {
        navigate(toTranscriptChat({ projectId, transcriptId, chatId: createdId }), { replace: true });
      }
    }
  });

  const [chatProject, { loading: sendingProject }] = useChatProjectMutation({
    onCompleted: result => {
      void refetchProjectHistory();
      void client.refetchQueries({ include: ['ProjectChats', 'TranscriptChats'] });
      const createdId = result?.chatProject?.chatId;
      if (createdId && isNewChat) {
        navigate(toProjectChat({ projectId, chatId: createdId }), { replace: true });
      }
    }
  });

  const messages: ChatMessageItem[] = useMemo(() => {
    if (isTranscriptContext) {
      if (isNewChat) return [];
      return (transcriptHistory?.chatTranscriptHistory?.messages ?? []).map(msg => ({
        id: msg.id,
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
        createdAt: msg.createdAt ?? undefined,
        segments: msg.segments.map(seg => ({
          id: seg.id,
          startMs: seg.startMs ?? null,
          endMs: seg.endMs ?? null,
          text: seg.text,
          speaker: seg.speaker ?? undefined,
          transcriptTitle: seg.transcriptTitle ?? undefined
        }))
      }));
    }

    if (isNewChat) return [];
    return (projectHistory?.chatProjectHistory?.messages ?? []).map(msg => ({
      id: msg.id,
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
      createdAt: msg.createdAt ?? undefined,
      segments: msg.segments.map(seg => ({
        id: seg.id,
        startMs: seg.startMs ?? null,
        endMs: seg.endMs ?? null,
        text: seg.text,
        speaker: seg.speaker ?? undefined,
        transcriptTitle: seg.transcriptTitle ?? undefined
      }))
    }));
  }, [
    isTranscriptContext,
    isNewChat,
    transcriptHistory?.chatTranscriptHistory?.messages,
    projectHistory?.chatProjectHistory?.messages
  ]);

  const isBusy = isTranscriptContext ? sendingTranscript || transcriptLoading : sendingProject || projectLoading;

  const handleSubmit = async () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    if (isTranscriptContext) {
      await chatTranscript({
        variables: {
          input: {
            chatId: isNewChat ? null : chatId,
            transcriptId: transcriptId ?? '',
            message: trimmed
          }
        }
      });
    } else {
      await chatProject({
        variables: {
          input: {
            chatId: isNewChat ? null : chatId,
            projectId: projectId ?? '',
            message: trimmed
          }
        }
      });
    }

    setDraft('');
  };

  const title = isTranscriptContext ? t('transcripts.chat.title') : t('projects.chat.title');
  const subtitle = isTranscriptContext
    ? t('transcripts.chat.subtitle', { transcript: transcriptId })
    : t('projects.chat.subtitle', { project: projectId });
  const placeholder = isTranscriptContext ? t('transcripts.chat.placeholder') : t('projects.chat.placeholder');
  const emptyPlaceholder = placeholder || t('chat.emptyPlaceholder');
  const inputPlaceholder = placeholder || t('chat.inputPlaceholder');
  const buttonLabel = isBusy ? t('buttons.sending') : t('buttons.sendQuestion');

  const open = true;
  const onClose = () => navigate(-1);

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length]);

  return (
    <FormDrawer open={open} title={title} onClose={onClose} onSubmit={() => {}}>
      <Card className="flex h-full flex-col space-y-4 border-0 shadow-none">
        <div className="sticky top-0 z-10 space-y-1 bg-white/90 px-1 pb-2 pt-1 backdrop-blur">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          </div>
          {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.length ? (
            <div className="space-y-3">
              {messages.map(message => (
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
                    <span>{message.role === 'user' ? t('chat.roles.you') : t('chat.roles.assistant')}</span>
                    {message.createdAt ? <span>{new Date(message.createdAt).toLocaleTimeString()}</span> : null}
                  </div>
                  <div className="mt-2 space-y-2 whitespace-pre-wrap font-normal leading-relaxed break-words">
                    <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm, remarkBreaks]} skipHtml>
                      {message.content}
                    </ReactMarkdown>
                  </div>
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
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <p className="text-sm text-slate-500">{emptyPlaceholder}</p>
          )}
        </div>

        <div className="sticky bottom-0 z-10 space-y-3 border-t border-slate-100 bg-white/90 px-1 pb-1 pt-3 backdrop-blur">
          <TextField
            multiline
            rows={3}
            placeholder={inputPlaceholder}
            value={draft}
            onChange={event => setDraft(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                void handleSubmit();
              }
            }}
          />
          <Button type="button" className="w-full" disabled={!canSend || isBusy} onClick={handleSubmit}>
            {buttonLabel}
          </Button>
        </div>
      </Card>
    </FormDrawer>
  );
};

export default Chat;
