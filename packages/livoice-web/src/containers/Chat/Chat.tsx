import { useApolloClient } from '@apollo/client';
import { direction } from 'direction';
import { Check, Download, Info, Pencil, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import FormDrawer from '@/components/FormDrawer/FormDrawer';
import type { ChatMessageDebugData } from '@/gql/generated';
import {
  useChatConfigsQuery,
  useChatProjectHistoryQuery,
  useChatProjectMutation,
  useUpdateChatMutation
} from '@/gql/generated';
import { cn } from '@/lib/cn';
import { toProjectChat } from '@/services/linker';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { TextField } from '@/ui/text-field';
import MessageDebugModal from './MessageDebugModal';
import { CONFIG_RANGES, DEFAULT_CHAT_CONFIG, OPENAI_MODELS } from './constants';

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
  debugData?: ChatMessageDebugData | null;
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

type ChatConfigForm = {
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

type UniqueConfigEntry = {
  key: string;
  config: ChatConfigForm;
  chatTitle: string;
  projectName: string | null;
  createdAt: string;
};

const normalizeConfig = (config?: ChatConfigForm | null): ChatConfigForm => ({
  systemPrompt: config?.systemPrompt ?? DEFAULT_CHAT_CONFIG.systemPrompt,
  openai: {
    model: config?.openai?.model ?? DEFAULT_CHAT_CONFIG.openai.model,
    temperature: config?.openai?.temperature ?? DEFAULT_CHAT_CONFIG.openai.temperature,
    maxOutputTokens: config?.openai?.maxOutputTokens ?? DEFAULT_CHAT_CONFIG.openai.maxOutputTokens
  },
  context: {
    maxInputTokens: config?.context?.maxInputTokens ?? DEFAULT_CHAT_CONFIG.context.maxInputTokens,
    reservedTokens: config?.context?.reservedTokens ?? DEFAULT_CHAT_CONFIG.context.reservedTokens,
    historyTokenBudget: config?.context?.historyTokenBudget ?? DEFAULT_CHAT_CONFIG.context.historyTokenBudget
  },
  segments: {
    tokenBudget: config?.segments?.tokenBudget ?? DEFAULT_CHAT_CONFIG.segments.tokenBudget,
    maxCount: config?.segments?.maxCount ?? DEFAULT_CHAT_CONFIG.segments.maxCount
  }
});

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
  const [chatConfig, setChatConfig] = useState<ChatConfigForm>(DEFAULT_CHAT_CONFIG);
  const [selectedConfigKey, setSelectedConfigKey] = useState('');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [systemPromptExpanded, setSystemPromptExpanded] = useState({ raw: false, resolved: false });
  const [inputDirection, setInputDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [debugModalState, setDebugModalState] = useState<{
    message: ChatMessageItem;
    debugData: NonNullable<ChatMessageItem['debugData']>;
  } | null>(null);
  const canSend = Boolean(draft.trim());
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const {
    data: projectHistory,
    loading: projectLoading,
    refetch: refetchProjectHistory
  } = useChatProjectHistoryQuery({
    variables: { projectId, chatId: isNewChat ? null : chatId },
    skip: !projectId
  });

  const {
    data: configsData,
    loading: configsLoading,
    refetch: refetchConfigs
  } = useChatConfigsQuery({
    skip: !isNewChat
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
      segments: msg.segments.map(seg => ({
        id: seg.id,
        startMs: seg.startMs ?? null,
        endMs: seg.endMs ?? null,
        text: seg.text,
        speaker: seg.speaker ?? undefined,
        transcriptTitle: seg.transcriptTitle ?? undefined
      })),
      debugData: msg.debugData ?? null
    }));
  }, [isNewChat, projectHistory?.chatProjectHistory?.messages]);

  const uniqueConfigs = useMemo(() => {
    const chats = configsData?.chats ?? [];
    const configMap = new Map<string, UniqueConfigEntry>();

    chats.forEach(chat => {
      const rawConfig = chat?.config;
      if (!rawConfig) return;
      const normalizedConfig = normalizeConfig(rawConfig);
      const key = JSON.stringify(normalizedConfig);
      const existing = configMap.get(key);
      const createdAt = chat.createdAt ?? new Date().toISOString();

      if (!existing || new Date(createdAt).getTime() > new Date(existing.createdAt).getTime()) {
        configMap.set(key, {
          key,
          config: normalizedConfig,
          chatTitle: chat?.title || 'Untitled Chat',
          projectName: chat.project?.name || null,
          createdAt
        });
      }
    });

    return Array.from(configMap.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [configsData]);

  const formatConfigLabel = (item: UniqueConfigEntry) => {
    const date = new Date(item.createdAt);
    const dateTimeStr = date.toLocaleString(); // e.g., "12/21/2024, 3:45:30 PM"
    const projectPart = item.projectName ? ` - ${item.projectName}` : '';
    return `${item.chatTitle}${projectPart} (${dateTimeStr})`;
  };

  const isLoading = sendingProject || projectLoading || configsLoading;

  const handleSubmit = async () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const configPayload = chatConfig;

    await chatProject({
      variables: {
        input: {
          chatId: isNewChat ? null : chatId,
          projectId,
          message: trimmed,
          systemPrompt: chatConfig.systemPrompt,
          config: configPayload
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
  const buttonLabel = isLoading ? t('buttons.sending') : t('buttons.sendQuestion');

  const open = true;
  const onClose = () => {
    console.log('onClose');
    if (debugModalState) {
      console.log('debugModalState', debugModalState);
      setDebugModalState(null);
      return;
    }
    console.log('navigate(-1)');
    navigate(-1);
  };

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
    void refetchConfigs();
  }, [isNewChat, refetchConfigs]);

  useEffect(() => {
    if (isNewChat) {
      setIsEditingTitle(false);
      setEditedTitle('');
    }
  }, [isNewChat]);

  useEffect(() => {
    if (!isNewChat) {
      setSelectedConfigKey('');
      return;
    }
    if (selectedConfigKey) return;
    if (!uniqueConfigs.length) return;
    setSelectedConfigKey(uniqueConfigs[0].key);
  }, [isNewChat, selectedConfigKey, uniqueConfigs]);

  useEffect(() => {
    if (!selectedConfigKey) return;
    const preset = uniqueConfigs.find(entry => entry.key === selectedConfigKey);
    if (!preset) return;
    setChatConfig(preset.config);
  }, [selectedConfigKey, uniqueConfigs]);

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
        open={open}
        title={customTitle}
        onClose={onClose}
        closeDisabled={Boolean(debugModalState)}
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
                    Select a previous configuration or enter a new prompt below. After setting a prompt, you can start
                    the conversation from the input at the bottom.
                  </p>

                  {uniqueConfigs.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-600">
                        Select a previous configuration
                      </label>
                      <select
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                        onChange={event => {
                          const value = event.target.value;
                          if (selectedConfigKey === value) return;
                          setSelectedConfigKey(value);
                          const preset = uniqueConfigs.find(entry => entry.key === value);
                          if (preset) {
                            setChatConfig(preset.config);
                          }
                        }}
                        value={selectedConfigKey || ''}
                      >
                        <option value="">Choose a configuration...</option>
                        {uniqueConfigs.map(item => (
                          <option key={item.key} value={item.key}>
                            {formatConfigLabel(item)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <TextField
                    id="system-prompt"
                    multiline
                    rows={14}
                    placeholder="Enter system prompt..."
                    value={chatConfig.systemPrompt}
                    onChange={event => setChatConfig(prev => ({ ...prev, systemPrompt: event.target.value }))}
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
                        <code className="bg-slate-100 px-1 rounded text-xs">{'{transcriptTitles}'}</code> - All
                        transcript titles in the project
                      </li>
                      <li>
                        <code className="bg-slate-100 px-1 rounded text-xs">{'{sourceNames}'}</code> - All source names
                        in the project
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowAdvancedSettings(prev => !prev)}
                      className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-slate-900"
                    >
                      <span>Advanced Settings</span>
                      <span className="text-xs text-slate-500">{showAdvancedSettings ? '▼' : '▶'}</span>
                    </button>
                    {showAdvancedSettings && (
                      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">OpenAI Settings</span>
                            <span className="text-xs text-slate-500">Model + response length</span>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                              Model
                            </label>
                            <select
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                              value={chatConfig.openai.model}
                              onChange={event =>
                                setChatConfig(prev => ({
                                  ...prev,
                                  openai: { ...prev.openai, model: event.target.value }
                                }))
                              }
                            >
                              {OPENAI_MODELS.map(model => (
                                <option key={model.value} value={model.value}>
                                  {model.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                              <span>Temperature</span>
                              <span>{chatConfig.openai.temperature.toFixed(2)}</span>
                            </div>
                            <input
                              type="range"
                              min={CONFIG_RANGES.temperature.min}
                              max={CONFIG_RANGES.temperature.max}
                              step={CONFIG_RANGES.temperature.step}
                              value={chatConfig.openai.temperature}
                              onChange={event => {
                                const next = Number(event.target.value);
                                if (!Number.isNaN(next)) {
                                  const bounded = Math.min(
                                    CONFIG_RANGES.temperature.max,
                                    Math.max(CONFIG_RANGES.temperature.min, next)
                                  );
                                  setChatConfig(prev => ({
                                    ...prev,
                                    openai: { ...prev.openai, temperature: bounded }
                                  }));
                                }
                              }}
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                              Max Output Tokens
                            </label>
                            <input
                              type="number"
                              min={CONFIG_RANGES.maxOutputTokens.min}
                              max={CONFIG_RANGES.maxOutputTokens.max}
                              step={CONFIG_RANGES.maxOutputTokens.step}
                              value={chatConfig.openai.maxOutputTokens}
                              onChange={event => {
                                const next = Number(event.target.value);
                                if (!Number.isNaN(next)) {
                                  const bounded = Math.min(
                                    CONFIG_RANGES.maxOutputTokens.max,
                                    Math.max(CONFIG_RANGES.maxOutputTokens.min, next)
                                  );
                                  setChatConfig(prev => ({
                                    ...prev,
                                    openai: { ...prev.openai, maxOutputTokens: bounded }
                                  }));
                                }
                              }}
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">Context Budget</span>
                            <span className="text-xs text-slate-500">Token limits for history and input</span>
                          </div>
                          <div className="grid gap-3 md:grid-cols-3">
                            {(
                              [
                                ['Max Input Tokens', 'maxInputTokens', CONFIG_RANGES.maxInputTokens],
                                ['Reserved Tokens', 'reservedTokens', CONFIG_RANGES.reservedTokens],
                                ['History Token Budget', 'historyTokenBudget', CONFIG_RANGES.historyTokenBudget]
                              ] as const
                            ).map(([label, key, range]) => (
                              <label
                                key={key}
                                className="space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600"
                              >
                                <span>{label}</span>
                                <input
                                  type="number"
                                  min={range.min}
                                  max={range.max}
                                  step={range.step}
                                  value={chatConfig.context[key]}
                                  onChange={event => {
                                    const next = Number(event.target.value);
                                    if (Number.isNaN(next)) return;
                                    const bounded = Math.min(range.max, Math.max(range.min, next));
                                    setChatConfig(prev => ({
                                      ...prev,
                                      context: { ...prev.context, [key]: bounded }
                                    }));
                                  }}
                                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                                />
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">Segment Settings</span>
                            <span className="text-xs text-slate-500">How much context we include</span>
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            <label className="space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                              <span>Segment Token Budget</span>
                              <input
                                type="number"
                                min={CONFIG_RANGES.segmentTokenBudget.min}
                                max={CONFIG_RANGES.segmentTokenBudget.max}
                                step={CONFIG_RANGES.segmentTokenBudget.step}
                                value={chatConfig.segments.tokenBudget}
                                onChange={event => {
                                  const next = Number(event.target.value);
                                  if (Number.isNaN(next)) return;
                                  const bounded = Math.min(
                                    CONFIG_RANGES.segmentTokenBudget.max,
                                    Math.max(CONFIG_RANGES.segmentTokenBudget.min, next)
                                  );
                                  setChatConfig(prev => ({
                                    ...prev,
                                    segments: { ...prev.segments, tokenBudget: bounded }
                                  }));
                                }}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                              />
                            </label>
                            <label className="space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                              <span>Max Segments</span>
                              <input
                                type="number"
                                min={CONFIG_RANGES.maxSegments.min}
                                max={CONFIG_RANGES.maxSegments.max}
                                step={CONFIG_RANGES.maxSegments.step}
                                value={chatConfig.segments.maxCount}
                                onChange={event => {
                                  const next = Number(event.target.value);
                                  if (Number.isNaN(next)) return;
                                  const bounded = Math.min(
                                    CONFIG_RANGES.maxSegments.max,
                                    Math.max(CONFIG_RANGES.maxSegments.min, next)
                                  );
                                  setChatConfig(prev => ({
                                    ...prev,
                                    segments: { ...prev.segments, maxCount: bounded }
                                  }));
                                }}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
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
                          {message.role === 'assistant' && message.debugData ? (
                            <button
                              type="button"
                              className="rounded-full border border-slate-200 bg-white/80 p-1 text-slate-500 transition hover:border-violet-300 hover:text-slate-700"
                              onClick={() => {
                                const debugData = message.debugData;
                                if (!debugData) return;
                                setDebugModalState({ message, debugData });
                              }}
                              title="View debug information"
                            >
                              <Info className="h-4 w-4" />
                            </button>
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
      <MessageDebugModal
        open={Boolean(debugModalState)}
        debugData={debugModalState?.debugData ?? null}
        message={debugModalState?.message ?? null}
        onClose={() => setDebugModalState(null)}
      />
    </>
  );
};

export default Chat;
