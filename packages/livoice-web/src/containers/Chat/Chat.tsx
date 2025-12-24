import { useApolloClient } from '@apollo/client';
import { direction } from 'direction';
import { Check, Download, Info, Pencil, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import { Link, Outlet, useMatch, useNavigate, useParams } from 'react-router-dom';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import FormDrawer from '@/components/FormDrawer/FormDrawer';
import {
  useChatProjectHistoryQuery,
  useChatProjectMutation,
  useUpdateChatMutation,
  type ChatProjectInput
} from '@/gql/generated';
import { cn } from '@/lib/cn';
import {
  ROUTER_PATHS,
  toProject,
  toProjectChat,
  toProjectChatIdMessageDebug,
  toProjectChatNewConfig
} from '@/services/linker';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { TextField } from '@/ui/text-field';
import type { ChatDebugOutletContext, ChatMessageItem } from './types';
import { useChatContext } from './useChatContext';

const markdownComponents: Components = {
  ol: ({ node, ...props }) => {
    void node;
    return <ol className="list-decimal space-y-1 pl-5 whitespace-normal" {...props} />;
  },
  ul: ({ node, ...props }) => {
    void node;
    return <ul className="list-disc space-y-1 pl-5 whitespace-normal" {...props} />;
  },
  li: ({ node, ...props }) => {
    void node;
    return <li className="ml-1" {...props} />;
  }
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

  const { chatConfig, configs, setChatConfig, configsLoading } = useChatContext();

  const [draft, setDraft] = useState('');
  const [systemPromptExpanded, setSystemPromptExpanded] = useState({ raw: false, resolved: false });
  const [inputDirection, setInputDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const canSend = Boolean(draft.trim());
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const debugMatch = useMatch(ROUTER_PATHS.PROJECT_CHAT_ID_MESSAGE_DEBUG);
  const isConfigRoute = Boolean(useMatch(ROUTER_PATHS.PROJECT_CHAT_NEW_CONFIG));
  const isDebugRoute = Boolean(debugMatch);

  const {
    data: projectHistory,
    loading: projectLoading,
    refetch: refetchProjectHistory
  } = useChatProjectHistoryQuery({
    variables: { projectId, chatId: isNewChat ? null : chatId },
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

  const [updateChat, { loading: updatingTitle }] = useUpdateChatMutation({
    onCompleted: () => {
      void refetchProjectHistory();
      void client.refetchQueries({ include: ['ProjectChats'] });
      setIsEditingTitle(false);
    }
  });

  const isLoading = sendingProject || projectLoading || configsLoading;

  const currentSystemPrompt = projectHistory?.chatProjectHistory?.systemPrompt ?? '';
  const resolvedSystemPrompt =
    (projectHistory?.chatProjectHistory as { resolvedSystemPrompt?: string })?.resolvedSystemPrompt ?? '';
  const chatTitle = isNewChat ? '' : ((projectHistory?.chatProjectHistory as { title?: string })?.title ?? '');

  const messages: ChatMessageItem[] = useMemo(() => {
    if (isNewChat) return [];
    return (projectHistory?.chatProjectHistory?.messages ?? []).map(msg => ({
      id: msg.id,
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
      createdAt: msg.createdAt ?? undefined,
      debugData: msg.debugData ?? null
    }));
  }, [isNewChat, projectHistory?.chatProjectHistory?.messages]);

  const debugModalState = useMemo(() => {
    if (!isDebugRoute) return null;
    const chatMessageId = debugMatch?.params.chatMessageId;
    if (!chatMessageId) return null;
    const foundMessage = messages.find(message => message.id === chatMessageId);
    if (!foundMessage?.debugData) return null;
    return { message: foundMessage, debugData: foundMessage.debugData };
  }, [debugMatch?.params.chatMessageId, isDebugRoute, messages]);

  const closeDebugModal = () => navigate(toProjectChat({ projectId, chatId }), { replace: true });

  const handleSubmit = async () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const input: ChatProjectInput = isNewChat
      ? {
          chatId: null,
          projectId,
          message: trimmed,
          systemPrompt: chatConfig.systemPrompt,
          config: chatConfig
        }
      : {
          chatId,
          projectId,
          message: trimmed,
          systemPrompt: currentSystemPrompt
        };

    await chatProject({ variables: { input } });

    setDraft('');
  };

  const title = t('projects.chat.title');
  const placeholder = t('projects.chat.placeholder');
  const configTitle = chatConfig.name?.trim() || 'Untitled config';
  const emptyPlaceholder = placeholder || t('chat.emptyPlaceholder');
  const inputPlaceholder = placeholder || t('chat.inputPlaceholder');
  const buttonLabel = isLoading ? t('buttons.sending') : t('buttons.sendQuestion');
  const promptPreview = (chatConfig.systemPrompt.trim() ?? '').split('\n').slice(0, 5).join(' ');
  const promptDisplay = promptPreview.length > 180 ? `${promptPreview.slice(0, 180)}...` : promptPreview;
  const configSummaryItems = [
    { label: 'Model', value: chatConfig.openai.model },
    { label: 'Temperature', value: chatConfig.openai.temperature.toFixed(2) },
    { label: 'Max output tokens', value: chatConfig.openai.maxOutputTokens.toString() },
    { label: 'Max input tokens', value: chatConfig.context.maxInputTokens.toString() },
    { label: 'History token budget', value: chatConfig.context.historyTokenBudget.toString() },
    { label: 'Segment token budget', value: chatConfig.segments.tokenBudget.toString() }
  ];

  const onClose = () => navigate(toProject({ projectId }));

  const handleStartEditing = () => {
    setEditedTitle(chatTitle || title);
    setIsEditingTitle(true);
  };

  const handleSaveTitle = () => {
    if (editedTitle.trim() && editedTitle.trim() !== chatTitle && chatId) {
      void updateChat({
        variables: {
          id: chatId,
          data: { title: editedTitle.trim() }
        }
      });
    } else {
      setIsEditingTitle(false);
    }
  };

  const handleCancelEditing = () => {
    setEditedTitle('');
    setIsEditingTitle(false);
  };

  const debugOutletContext: ChatDebugOutletContext | null = debugModalState
    ? {
        message: debugModalState.message,
        debugData: debugModalState.debugData,
        onClose: closeDebugModal
      }
    : null;

  const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSaveTitle();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      handleCancelEditing();
    }
  };

  const customTitle = isEditingTitle ? (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={editedTitle}
        onChange={e => setEditedTitle(e.target.value)}
        onKeyDown={handleTitleKeyDown}
        className="flex-1 bg-transparent border border-slate-200 rounded px-2 py-1 text-lg font-semibold text-slate-900 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
        autoFocus
        disabled={updatingTitle}
      />
      <button
        type="button"
        onClick={handleSaveTitle}
        disabled={updatingTitle || !editedTitle.trim() || editedTitle.trim() === chatTitle}
        className="p-1 rounded hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Check className="h-4 w-4 text-green-600" />
      </button>
      <button
        type="button"
        onClick={handleCancelEditing}
        disabled={updatingTitle}
        className="p-1 rounded hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <X className="h-4 w-4 text-red-600" />
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <span className="text-lg font-semibold text-slate-900">{chatTitle || title}</span>
      {chatId && (
        <button
          type="button"
          onClick={handleStartEditing}
          className="p-1 rounded hover:bg-slate-100 opacity-60 hover:opacity-100 transition-opacity"
          title="Edit title"
        >
          <Pencil className="h-4 w-4 text-slate-600" />
        </button>
      )}
    </div>
  );

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length]);

  useEffect(() => {
    if (!isNewChat) return;
    if (configsLoading) return;
    if (!configs.length) return;
    setChatConfig(configs[0].config);
  }, [configs, configsLoading, isNewChat, setChatConfig]);

  useEffect(() => {
    if (isNewChat) {
      setIsEditingTitle(false);
      setEditedTitle('');
    }
  }, [isNewChat]);

  const downloadConversation = () => {
    const lines: string[] = [];

    // Add system prompts
    if (currentSystemPrompt) {
      lines.push('=== SYSTEM PROMPT (RAW) ===');
      lines.push('');
      lines.push(currentSystemPrompt);
      lines.push('');
      lines.push('');
    }

    if (resolvedSystemPrompt) {
      lines.push('=== SYSTEM PROMPT (RESOLVED) ===');
      lines.push('');
      lines.push(resolvedSystemPrompt);
      lines.push('');
      lines.push('');
    }

    lines.push('=== CONVERSATION ===');
    lines.push('');

    messages.forEach(message => {
      const roleLabel = message.role === 'user' ? '[User]' : '[Assistant]';
      const timestamp = message.createdAt ? ` - ${new Date(message.createdAt).toLocaleString()}` : '';
      lines.push(`${roleLabel}${timestamp}`);
      lines.push(message.content);
      lines.push('');
    });

    const content = lines.join('\n');

    // Generate filename
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const filename = `chat-${chatId || 'new'}-${projectId}-${date}.txt`;

    // Create and trigger download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <FormDrawer
        open={!isConfigRoute && !isDebugRoute}
        title={customTitle}
        onClose={onClose}
        closeDisabled={isConfigRoute || isDebugRoute || Boolean(debugModalState)}
        onSubmit={event => {
          event.preventDefault();
          void handleSubmit();
        }}
      >
        <Card className="flex h-full flex-col space-y-4 border-0 shadow-none">
          <div className="sticky top-0 z-10 space-y-1 bg-white/90 px-1 pb-2 pt-1 backdrop-blur">
            <div className="flex items-center justify-between gap-2">
              <Button variant="ghost" size="sm" onClick={downloadConversation} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                {t('buttons.downloadConversation')}
              </Button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto pr-1">
            {isNewChat ? (
              <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-slate-700">Chat Config: {configTitle}</h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Configure the system prompt, model, and context before sending your first question.
                    </p>
                    <p className="text-sm text-slate-500">{promptDisplay || 'No system prompt configured yet.'}</p>
                  </div>
                  <Link
                    to={toProjectChatNewConfig({ projectId })}
                    className="text-cv inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-slate-900"
                  >
                    Chat Config
                  </Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {configSummaryItems.map(item => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-200 bg-white/70 p-3 text-xs text-slate-500"
                    >
                      <p className="font-semibold text-slate-700">{item.label}</p>
                      <p>{item.value}</p>
                    </div>
                  ))}
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
                {messages.map(message => {
                  const messageDirection = direction(message.content);
                  return (
                    <div
                      key={message.id}
                      dir={messageDirection === 'rtl' ? 'rtl' : 'ltr'}
                      className={cn(
                        'rounded-2xl border px-4 py-3 text-sm shadow-sm transition',
                        message.role === 'user'
                          ? 'border-violet-100 bg-violet-50 text-violet-900'
                          : 'border-slate-100 bg-white/80 text-slate-800'
                      )}
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                        <span>{message.role === 'user' ? t('chat.roles.you') : t('chat.roles.assistant')}</span>
                        <div className="flex items-center gap-2">
                          {message.createdAt ? <span>{new Date(message.createdAt).toLocaleTimeString()}</span> : null}
                          {message.role === 'assistant' && message.debugData && chatId ? (
                            <Link
                              to={toProjectChatIdMessageDebug({
                                projectId,
                                chatId,
                                chatMessageId: message.id
                              })}
                              className="rounded-full border border-slate-200 bg-white/80 p-1 text-slate-500 transition hover:border-violet-300 hover:text-violet-700"
                              title="View debug information"
                            >
                              <Info className="h-4 w-4" />
                            </Link>
                          ) : null}
                        </div>
                      </div>
                      <div className="mt-2 space-y-2 whitespace-pre-wrap font-normal leading-relaxed break-words">
                        <ReactMarkdown
                          components={markdownComponents}
                          remarkPlugins={[remarkGfm, remarkBreaks]}
                          skipHtml
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  );
                })}
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
              dir={inputDirection === 'rtl' ? 'rtl' : 'ltr'}
              onChange={event => {
                setDraft(event.target.value);
                const detectedDirection = direction(event.target.value);
                setInputDirection(detectedDirection === 'rtl' ? 'rtl' : 'ltr');
              }}
              onKeyDown={event => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  void handleSubmit();
                }
              }}
            />
            <Button type="button" className="w-full" disabled={!canSend || isLoading} onClick={handleSubmit}>
              {buttonLabel}
            </Button>
          </div>
        </Card>
      </FormDrawer>
      {isConfigRoute && <Outlet />}
      {isDebugRoute && debugOutletContext && <Outlet context={debugOutletContext} />}
    </>
  );
};

export default Chat;
