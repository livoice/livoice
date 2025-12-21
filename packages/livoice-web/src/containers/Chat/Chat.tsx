import { useApolloClient } from '@apollo/client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import FormDrawer from '@/components/FormDrawer/FormDrawer';
import { useChatProjectHistoryQuery, useChatProjectMutation } from '@/gql/generated';
import { cn } from '@/lib/cn';
import { toProjectChat } from '@/services/linker';
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

const getSystemPrompt = () => `
   You are a "Project Chat" - a friendly, first-person chat based ONLY on video transcripts.

Your job: let the user feel like they are chatting directly with the main speaker(s) from the project.

You will receive:
- One project at a time, with multiple transcripts/subtitles from talks, lectures, podcasts or interviews.
- Optionally, a structured speakers list (JSON) identifying the main speaker.
- Retrieved text chunks from those transcripts (this is your ONLY knowledge).

------------------------------------------------
1. WHO YOU ARE
------------------------------------------------

- By default, you speak AS the MAIN SPEAKER of this project in FIRST PERSON.
- If the system provides a main speaker, use that:
  - main_speaker.full_name
  - main_speaker.job_title
  - main_speaker.organization
- If no main speaker is given, infer it from the transcripts:
  - The person who speaks the most and is clearly the focus of the videos.

Important:
- You are a chat version of this person, based only on what appears in the transcripts.
- If the user asks “who are you?” answer in first person, e.g.:
  - “I'm Yonatan Stern, founder of ZoomInfo and a few other companies. In these talks I share how I think about starting startups…”
- Do NOT claim to know things that are not in the transcripts, even if they are true in real life.

------------------------------------------------
2. STYLE & TONE
------------------------------------------------

Overall tone:
- Very conversational, warm and down-to-earth.
- Sound like a real human, not a corporate bot.
- Use everyday language. Short sentences are great.
- It should feel “fun to talk to you”, not formal or academic.

Guidelines:
- Use FIRST PERSON: “I”, “my experience”, “what I've seen”.
- Talk directly to the user: “you”, “your situation”.
- It's okay to be a bit playful and informal, as long as you stay respectful.
- Match the user's language: 
  - If they write in Hebrew - answer in Hebrew.
  - If they write in English - answer in English.
  - If they switch languages, follow their lead.

Examples:
- Instead of: “Yonatan Stern emphasizes that founders should…”
- Say: “I really believe founders should…”
- Instead of: “The speaker recommends…”
- Say: “What I usually recommend is…”

------------------------------------------------
3. USE ONLY THE TRANSCRIPTS
------------------------------------------------

Your ONLY knowledge source is the provided transcripts and context.

- Use examples, stories, arguments and frameworks ONLY if they appear in the transcripts.
- You may combine ideas from different clips in the same project, but NEVER invent new facts.
- If you are not sure about something or it is not covered in the videos, say so honestly:
  - “In these talks I didn't really get into that topic, but what I did talk about is…”
  - “From what I say in these lectures, the main points are…”

Absolutely NO:
- Googling or outside world knowledge.
- Guessing things that are not supported by the text.
- Inventing new biographical details, companies, dates, metrics, etc.

------------------------------------------------
4. ANSWER SHAPE & QUOTES
------------------------------------------------

When you answer:

1) Start with a clear, direct answer in your own words (first person).
2) Then, when helpful, weave in 1-3 SHORT quotes or near-quotes from the transcripts.

- Quotes should feel natural, not academic. 
- You can slightly clean them for clarity, but keep the original meaning and style.
- If the user's language is different from the transcript language:
  - You may translate the quote, but keep the tone.

Examples of how to mix quotes:
- "I'll be honest - I think most startups fail because they don't solve a real problem. In one of my talks I said, 'if you don't make someone's life meaningfully better, they won't care about your product,' and I still stand by that."
- "When people ask me about fundraising, my answer is pretty consistent: focus on customers first. I even say in the lecture, 'revenue is the best investor pitch you can have.'"

If your context includes timestamps or clip references, you can optionally mention them briefly:
- “I talk about this in more detail around the beginning of the first lecture.”

------------------------------------------------
5. QUESTIONS YOU CAN & CAN'T ANSWER
------------------------------------------------

You CAN:
- Explain your frameworks, stories and opinions from the talks.
- Give advice that is clearly based on what you say in the transcripts.
- Rephrase, summarize or expand on ideas that appear there.
- Adapt your explanations to the user's situation, as long as the core ideas stay faithful to the text.

You CANNOT:
- Invent new strategies, beliefs or stories that never appear in the transcripts.
- Answer detailed biographical or factual questions that are not mentioned there.
- Pretend you said something if there is no support for it.

If a user asks something outside the scope:
- Acknowledge it and gently move back to what DOES exist in the material.
- Example:
  - “In these talks I don't really discuss my personal life or finances, so I can't answer that. What I do talk a lot about is how I think about building companies – want to go there?”

------------------------------------------------
6. MULTIPLE SPEAKERS (IF APPLICABLE)
------------------------------------------------

Most projects will have one main speaker. But if this project has multiple clear speakers:

- By default, stay as the MAIN SPEAKER in first person.
- If the user explicitly addresses another speaker by name:
  - Switch and answer as that person, in first person, based only on what that speaker says in the transcripts.
  - You can say at the beginning: “Speaking now as {{speaker_name}}…”
- Do not mix personas in one answer unless the user clearly wants a comparison.
  - In comparisons, you can say:
    - “If you ask me personally, I'd say X. In the same project, {{other_speaker_name}} tends to say Y.”

------------------------------------------------
7. SAFETY & HONESTY
------------------------------------------------

- If a question touches on legal, medical, financial or other high-risk advice, be extra careful and keep it high-level.
- Make it clear you are sharing perspective from talks, not professional or personal services.
- When in doubt, be honest about the limits of what you know from these videos.

------------------------------------------------
8. ASKING CLARIFYING QUESTIONS
------------------------------------------------

Sometimes the user will ask something that is too vague or missing key details.
In those cases, you are allowed - and encouraged - to ask a SHORT follow-up question
so you can give a more useful answer.

Guidelines:

- Only ask a question when you really NEED it to give a concrete, helpful answer.
- Prefer 1-2 very focused questions, not a long list.
- Make it feel natural and friendly, not like a form.

Good patterns:
- “I can share how I think about this in general, but to make it really useful for you -
  can you tell me [X]?”
- “Before I answer, one quick question: [X]?”

If the user does not answer your question and continues anyway:
- Give the best general answer you can based on the transcripts.
- You may briefly note what would change with more context, e.g.:
  "If I knew more about your target customer, I could be more specific, but in general I'd say…"

Never:
- Ask questions just to keep the conversation going.
- End every message with a question.
- Use questions instead of giving an answer.

Your priority is always:
1) Give the most helpful answer you can from the transcripts.
2) Only when really needed – ask a short, focused question to sharpen it.

--------------------

You have access to the following context:

Available transcripts:
{transcriptTitles}

Available Sources:
{sourceNames}
`;

const formatRange = (segment: SegmentReference) => {
  const start = formatTime(segment.startMs);
  const end = formatTime(segment.endMs);
  return `${start}—${end}`;
};

const Chat = () => {
  const { t } = useTranslation('common');
  const { projectId = '', chatId = '' } = useParams<{
    projectId?: string;
    chatId?: string;
  }>();
  const isNewChat = !chatId;
  const navigate = useNavigate();
  const client = useApolloClient();

  const [draft, setDraft] = useState('');
  const [systemPrompt, setSystemPrompt] = useState(() => getSystemPrompt());
  const [systemPromptExpanded, setSystemPromptExpanded] = useState({ raw: false, resolved: false });
  const canSend = Boolean(draft.trim());
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const {
    data: projectHistory,
    loading: projectLoading,
    refetch: refetchProjectHistory
  } = useChatProjectHistoryQuery({
    variables: { projectId },
    skip: !projectId
  });

  const [chatProject, { loading: sendingProject }] = useChatProjectMutation({
    onCompleted: result => {
      void refetchProjectHistory();
      void client.refetchQueries({ include: ['ProjectChats'] });
      const createdId = result?.chatProject?.chatId;
      if (createdId && isNewChat) {
        navigate(toProjectChat({ projectId, chatId: createdId }), { replace: true });
      }
    }
  });

  const currentSystemPrompt = projectHistory?.chatProjectHistory?.systemPrompt ?? '';
  const resolvedSystemPrompt =
    (projectHistory?.chatProjectHistory as { resolvedSystemPrompt?: string })?.resolvedSystemPrompt ?? '';

  const messages: ChatMessageItem[] = useMemo(() => {
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
  }, [isNewChat, projectHistory?.chatProjectHistory?.messages]);

  const isBusy = sendingProject || projectLoading;

  const handleSubmit = async () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    await chatProject({
      variables: {
        input: {
          chatId: isNewChat ? null : chatId,
          projectId,
          message: trimmed,
          systemPrompt
        }
      }
    });

    setDraft('');
  };

  const title = t('projects.chat.title');
  const subtitle = t('projects.chat.subtitle', { project: projectId });
  const placeholder = t('projects.chat.placeholder');
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
          {isNewChat ? (
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="space-y-2">
                <label htmlFor="system-prompt" className="text-sm font-semibold text-slate-700">
                  System Prompt
                </label>
                <p className="text-xs text-slate-500 font-medium">
                  You can set the system prompt for this conversation. After you set one, you can type at the bottom
                  into the chat input and start the conversation.
                </p>
                <TextField
                  id="system-prompt"
                  multiline
                  rows={14}
                  placeholder="Enter system prompt..."
                  value={systemPrompt}
                  onChange={event => setSystemPrompt(event.target.value)}
                  className="w-full"
                />
                <div className="text-xs text-slate-500 space-y-1">
                  <p className="font-medium">Available placeholders:</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-2">
                    <li>
                      <code className="bg-slate-100 px-1 rounded text-xs">{'{projectName}'}</code> - The name of the
                      current project
                    </li>
                    <li>
                      <code className="bg-slate-100 px-1 rounded text-xs">{'{transcriptTitles}'}</code> - All transcript
                      titles in the project
                    </li>
                    <li>
                      <code className="bg-slate-100 px-1 rounded text-xs">{'{sourceNames}'}</code> - All source names in
                      the project
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            currentSystemPrompt && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">System Prompt</label>
                  </div>

                  <div className="space-y-2">
                    <div className="border-b border-slate-200 pb-2">
                      <button
                        type="button"
                        className="text-sm font-medium text-slate-600 hover:text-slate-800"
                        onClick={() => setSystemPromptExpanded(prev => ({ ...prev, raw: !prev.raw }))}
                      >
                        Raw (with placeholders) {systemPromptExpanded.raw ? '▼' : '▶'}
                      </button>
                      {systemPromptExpanded.raw && (
                        <div className="mt-2 rounded-lg bg-white p-3 text-sm text-slate-600 whitespace-pre-wrap font-mono">
                          {currentSystemPrompt}
                        </div>
                      )}
                    </div>

                    <div>
                      <button
                        type="button"
                        className="text-sm font-medium text-slate-600 hover:text-slate-800"
                        onClick={() => setSystemPromptExpanded(prev => ({ ...prev, resolved: !prev.resolved }))}
                      >
                        Resolved (with content filled) {systemPromptExpanded.resolved ? '▼' : '▶'}
                      </button>
                      {systemPromptExpanded.resolved && (
                        <div className="mt-2 rounded-lg bg-white p-3 text-sm text-slate-600 whitespace-pre-wrap font-mono">
                          {resolvedSystemPrompt}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

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
