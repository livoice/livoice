import { DiffEditor } from '@monaco-editor/react';
import { X } from 'lucide-react';
import type { editor as MonacoEditor } from 'monaco-editor/esm/vs/editor/editor.api';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';

import { cn } from '@/lib/cn';
import { toProjectChatNew } from '@/services/linker';
import { Button } from '@/ui/button';
import { CONFIG_RANGES, DEFAULT_CHAT_CONFIG, OPENAI_MODELS } from './constants';
import type { ChatConfigForm, UniqueConfigEntry } from './types';
import { useChatContext } from './useChatContext';

type TabId = 'edit' | 'compare';

interface ConfigModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (config: ChatConfigForm) => void;
  configs: UniqueConfigEntry[];
  currentConfig: ChatConfigForm;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'edit', label: 'Edit config' },
  { id: 'compare', label: 'Compare configs' }
];
const DEFAULT_CONFIG_KEY = '__default__';

const formatConfigLabel = (entry: UniqueConfigEntry) => {
  const date = new Date(entry.createdAt);
  const dateTimeStr = date.toLocaleString();
  const projectPart = entry.projectName ? ` - ${entry.projectName}` : '';
  return `${entry.chatTitle}${projectPart} (${dateTimeStr})`;
};

const resolveConfigByKey = (key: string, configs: UniqueConfigEntry[]): ChatConfigForm => {
  if (!key || key === DEFAULT_CONFIG_KEY) return DEFAULT_CHAT_CONFIG;
  return configs.find(entry => entry.key === key)?.config ?? DEFAULT_CHAT_CONFIG;
};

const highlightClass = (isDifferent: boolean) =>
  isDifferent ? 'bg-amber-50 border-amber-300' : 'bg-white border-slate-200';

const ValueRow = ({
  label,
  leftValue,
  rightValue,
  rightEditable,
  onRightChange,
  type = 'text',
  options,
  range
}: {
  label: string;
  leftValue: string | number;
  rightValue: string | number;
  rightEditable?: boolean;
  onRightChange?: (value: string | number) => void;
  type?: 'text' | 'number' | 'select' | 'range';
  options?: { value: string; label: string }[];
  range?: { min: number; max: number; step: number };
}) => {
  const isDifferent = String(leftValue) !== String(rightValue);

  const renderInput = (value: string | number, editable: boolean, isRight: boolean) => {
    const baseClass = cn(
      'w-full rounded-xl border px-3 py-2 text-sm text-slate-700 outline-none transition',
      highlightClass(isDifferent && isRight),
      editable ? 'focus:border-violet-300 focus:ring-2 focus:ring-violet-100' : 'cursor-default'
    );

    if (type === 'select' && options) {
      return (
        <select
          value={value}
          onChange={event => editable && onRightChange?.(event.target.value)}
          disabled={!editable}
          className={baseClass}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === 'range' && range) {
      return (
        <div className="space-y-1">
          <input
            type="range"
            min={range.min}
            max={range.max}
            step={range.step}
            value={value}
            onChange={event => editable && onRightChange?.(Number(event.target.value))}
            disabled={!editable}
            className="w-full"
          />
          <div
            className={cn(
              'text-center text-xs font-medium px-2 py-1 rounded-lg border',
              highlightClass(isDifferent && isRight)
            )}
          >
            {typeof value === 'number' ? value.toFixed(2) : value}
          </div>
        </div>
      );
    }

    if (type === 'number' && range) {
      return (
        <input
          type="number"
          min={range.min}
          max={range.max}
          step={range.step}
          value={value}
          onChange={event => {
            if (!editable) return;
            const next = Number(event.target.value);
            if (Number.isNaN(next)) return;
            const bounded = Math.min(range.max, Math.max(range.min, next));
            onRightChange?.(bounded);
          }}
          disabled={!editable}
          className={baseClass}
        />
      );
    }

    return <div className={cn(baseClass, 'min-h-[40px] flex items-center')}>{value}</div>;
  };

  return (
    <div className="grid grid-cols-2 gap-0 items-start relative">
      {/* Visual separator */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-px z-10" />

      <div className="space-y-1 pr-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
        {renderInput(leftValue, false, false)}
      </div>
      <div className="space-y-1 pl-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
        {renderInput(rightValue, rightEditable ?? false, true)}
      </div>
    </div>
  );
};

function ConfigModalWindow({ open, onClose, onApply, configs, currentConfig }: ConfigModalProps) {
  const [draftConfig, setDraftConfig] = useState<ChatConfigForm>(currentConfig);
  const [activeTab, setActiveTab] = useState<TabId>('edit');
  const [compareLeftKey, setCompareLeftKey] = useState('');
  const [compareRightKey, setCompareRightKey] = useState('');
  const [editBaseKey, setEditBaseKey] = useState('');
  const [hasEdited, setHasEdited] = useState(false);
  const diffChangeDisposable = useRef<ReturnType<MonacoEditor.IStandaloneCodeEditor['onDidChangeModelContent']> | null>(
    null
  );
  const keyDownDisposable = useRef<ReturnType<MonacoEditor.IStandaloneCodeEditor['onKeyDown']> | null>(null);
  const diffEditorOptions: MonacoEditor.IDiffEditorConstructionOptions = {
    minimap: { enabled: false },
    renderSideBySide: true,
    enableSplitViewResizing: false,
    diffWordWrap: 'on',
    wordWrap: 'on',
    wordWrapOverride1: 'on',
    wordWrapOverride2: 'on',
    wordWrapColumn: 0,
    wrappingStrategy: 'advanced',
    scrollbar: { horizontal: 'hidden' }
  };

  useEffect(() => {
    if (!open) return;
    setDraftConfig(currentConfig);
    setHasEdited(false);
  }, [open, currentConfig]);

  useEffect(() => {
    if (!open) return;
    if (!configs.length) {
      setCompareLeftKey('');
      setCompareRightKey('');
      setEditBaseKey(DEFAULT_CONFIG_KEY);
      return;
    }
    setCompareLeftKey(prev => prev || configs[0].key);
    setCompareRightKey(prev => prev || (configs[1]?.key ?? configs[0].key));
    setEditBaseKey(prev => prev || configs[0].key);
  }, [open, configs]);

  const handleEditableDiffMount = (editor: MonacoEditor.IStandaloneDiffEditor) => {
    diffChangeDisposable.current?.dispose();
    keyDownDisposable.current?.dispose();

    const modifiedEditor = editor.getModifiedEditor();

    // Force plain-text paste to avoid rich-text errors
    keyDownDisposable.current = modifiedEditor.onKeyDown(event => {
      const isPaste = (event.metaKey || event.ctrlKey) && event.code === 'KeyV';
      if (!isPaste) return;
      event.preventDefault();
      if (!navigator?.clipboard?.readText) return;
      void navigator.clipboard.readText().then(text => {
        if (typeof text !== 'string') return;
        const sanitized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        const selections = modifiedEditor.getSelections();
        const fallbackRange = modifiedEditor.getSelection() ?? modifiedEditor.getModel()?.getFullModelRange();
        const edits =
          selections?.map(selection => ({
            range: selection,
            text: sanitized,
            forceMoveMarkers: true
          })) ??
          (fallbackRange
            ? [
                {
                  range: fallbackRange,
                  text: sanitized,
                  forceMoveMarkers: true
                }
              ]
            : []);

        modifiedEditor.executeEdits('plain-paste', edits as MonacoEditor.IIdentifiedSingleEditOperation[]);
        modifiedEditor.pushUndoStop();
      });
    });

    diffChangeDisposable.current = modifiedEditor.onDidChangeModelContent(() => {
      const value = modifiedEditor.getValue();
      setDraftConfig(prev => ({ ...prev, systemPrompt: value }));
      setHasEdited(true);
    });
  };

  useEffect(
    () => () => {
      diffChangeDisposable.current?.dispose();
      keyDownDisposable.current?.dispose();
    },
    []
  );

  const leftCompareConfig = resolveConfigByKey(compareLeftKey, configs);
  const rightCompareConfig = resolveConfigByKey(compareRightKey, configs);
  const editBaseConfig = resolveConfigByKey(editBaseKey, configs);

  const hasCompareOptions = configs.length > 1;
  const isEditMode = activeTab === 'edit';

  const leftConfig = isEditMode ? editBaseConfig : leftCompareConfig;
  const rightConfig = isEditMode ? draftConfig : rightCompareConfig;

  useEffect(() => {
    if (!isEditMode) return;
    if (hasEdited) return;
    setDraftConfig(editBaseConfig);
  }, [isEditMode, editBaseConfig, hasEdited]);

  useEffect(() => {
    if (activeTab !== 'compare') return;
    const currentIndex = configs.findIndex(({ key }) => key === editBaseKey);
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    const leftKey = configs[safeIndex + 1]?.key ?? configs[safeIndex]?.key ?? configs[0]?.key ?? '';
    const rightKey = editBaseKey || configs[safeIndex]?.key || configs[0]?.key || '';
    setCompareLeftKey(leftKey);
    setCompareRightKey(rightKey);
  }, [activeTab, configs, editBaseKey]);

  if (!open) return null;

  const updateDraft = (section: 'openai' | 'context' | 'segments', key: string, value: string | number) => {
    setDraftConfig(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
    setHasEdited(true);
  };

  const modal = (
    <div
      className="fixed inset-0 z-[1600] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 pointer-events-auto"
      onClick={event => {
        event.stopPropagation();
        onClose();
      }}
    >
      <div
        className="relative flex h-full w-full max-w-[95vw] max-h-[95vh] flex-col overflow-hidden rounded-3xl bg-white shadow-elevated"
        onClick={event => event.stopPropagation()}
        onMouseDown={event => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-slate-900">Configure chat</h2>
          <button
            type="button"
            onClick={event => {
              event.stopPropagation();
              onClose();
            }}
            className="rounded-lg p-2 text-slate-500 transition hover:text-slate-900"
            aria-label="Close configuration modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-4" onWheel={event => event.stopPropagation()}>
          {/* Tabs first */}
          <div className="flex flex-wrap gap-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  activeTab === tab.id
                    ? 'border border-violet-300 bg-violet-50 text-violet-700'
                    : 'border border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Config selectors */}
          <div className="grid grid-cols-2 gap-4">
            {isEditMode ? (
              <>
                <label className="space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <span>Base config (reference)</span>
                  <select
                    value={editBaseKey}
                    onChange={event => setEditBaseKey(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                  >
                    <option value={DEFAULT_CONFIG_KEY}>Default config</option>
                    {configs.map(entry => (
                      <option key={entry.key} value={entry.key}>
                        {formatConfigLabel(entry)}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <span>Your edits</span>
                  <div className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm text-violet-700">
                    Editing...
                  </div>
                </div>
              </>
            ) : (
              <>
                <label className="space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <span>Left config</span>
                  <select
                    value={compareLeftKey}
                    onChange={event => setCompareLeftKey(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                  >
                    {!configs.length ? (
                      <option value="" disabled>
                        No saved configs yet
                      </option>
                    ) : (
                      configs.map(entry => (
                        <option key={entry.key} value={entry.key}>
                          {formatConfigLabel(entry)}
                        </option>
                      ))
                    )}
                  </select>
                </label>
                <label className="space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <span>Right config</span>
                  <select
                    value={compareRightKey}
                    onChange={event => setCompareRightKey(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                  >
                    {!configs.length ? (
                      <option value="" disabled>
                        No saved configs yet
                      </option>
                    ) : (
                      configs.map(entry => (
                        <option key={entry.key} value={entry.key}>
                          {formatConfigLabel(entry)}
                        </option>
                      ))
                    )}
                  </select>
                </label>
              </>
            )}
          </div>

          {/* System Prompt - Diff Editor */}
          <section className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <span className="text-sm font-semibold text-slate-700">System Prompt (Base)</span>
              <span className="text-sm font-semibold text-slate-700">
                System Prompt {isEditMode ? '(Editable)' : '(Right)'}
              </span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
              {isEditMode ? (
                <DiffEditor
                  key={`edit-${editBaseKey}`}
                  language="plaintext"
                  original={leftConfig.systemPrompt}
                  modified={draftConfig.systemPrompt}
                  height="400px"
                  onMount={handleEditableDiffMount}
                  options={{ ...diffEditorOptions, readOnly: false }}
                />
              ) : hasCompareOptions ? (
                <DiffEditor
                  key={`compare-${compareLeftKey}-${compareRightKey}`}
                  language="plaintext"
                  original={leftConfig.systemPrompt}
                  modified={rightConfig.systemPrompt}
                  height="400px"
                  options={{ ...diffEditorOptions, readOnly: true }}
                />
              ) : (
                <p className="p-4 text-sm text-slate-500">
                  Gather at least two previous configurations to compare them side by side.
                </p>
              )}
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <p className="font-medium">Available placeholders:</p>
              <ul className="list-disc list-inside space-y-0.5 ml-2">
                <li>
                  <code className="bg-slate-100 px-1 rounded text-xs">{'{projectName}'}</code> - Project name
                </li>
                <li>
                  <code className="bg-slate-100 px-1 rounded text-xs">{'{transcriptTitles}'}</code> - Transcript titles
                </li>
                <li>
                  <code className="bg-slate-100 px-1 rounded text-xs">{'{sourceNames}'}</code> - Source names
                </li>
              </ul>
            </div>
          </section>

          {/* OpenAI Settings */}
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">OpenAI Settings</span>
              <span className="text-xs text-slate-500">Model + response length</span>
            </div>
            <ValueRow
              label="Model"
              leftValue={leftConfig.openai.model}
              rightValue={rightConfig.openai.model}
              rightEditable={isEditMode}
              onRightChange={value => updateDraft('openai', 'model', value as string)}
              type="select"
              options={OPENAI_MODELS.map(model => ({ value: model.value, label: model.label }))}
            />
            <ValueRow
              label="Temperature"
              leftValue={leftConfig.openai.temperature}
              rightValue={rightConfig.openai.temperature}
              rightEditable={isEditMode}
              onRightChange={value => updateDraft('openai', 'temperature', value as number)}
              type="range"
              range={CONFIG_RANGES.temperature}
            />
            <ValueRow
              label="Max Output Tokens"
              leftValue={leftConfig.openai.maxOutputTokens}
              rightValue={rightConfig.openai.maxOutputTokens}
              rightEditable={isEditMode}
              onRightChange={value => updateDraft('openai', 'maxOutputTokens', value as number)}
              type="number"
              range={CONFIG_RANGES.maxOutputTokens}
            />
          </section>

          {/* Context Budget */}
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Context Budget</span>
              <span className="text-xs text-slate-500">Token limits for history and input</span>
            </div>
            <ValueRow
              label="Max Input Tokens"
              leftValue={leftConfig.context.maxInputTokens}
              rightValue={rightConfig.context.maxInputTokens}
              rightEditable={isEditMode}
              onRightChange={value => updateDraft('context', 'maxInputTokens', value as number)}
              type="number"
              range={CONFIG_RANGES.maxInputTokens}
            />
            <ValueRow
              label="Reserved Tokens"
              leftValue={leftConfig.context.reservedTokens}
              rightValue={rightConfig.context.reservedTokens}
              rightEditable={isEditMode}
              onRightChange={value => updateDraft('context', 'reservedTokens', value as number)}
              type="number"
              range={CONFIG_RANGES.reservedTokens}
            />
            <ValueRow
              label="History Token Budget"
              leftValue={leftConfig.context.historyTokenBudget}
              rightValue={rightConfig.context.historyTokenBudget}
              rightEditable={isEditMode}
              onRightChange={value => updateDraft('context', 'historyTokenBudget', value as number)}
              type="number"
              range={CONFIG_RANGES.historyTokenBudget}
            />
          </section>

          {/* Segment Settings */}
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Segment Settings</span>
              <span className="text-xs text-slate-500">How much context we include</span>
            </div>
            <ValueRow
              label="Segment Token Budget"
              leftValue={leftConfig.segments.tokenBudget}
              rightValue={rightConfig.segments.tokenBudget}
              rightEditable={isEditMode}
              onRightChange={value => updateDraft('segments', 'tokenBudget', value as number)}
              type="number"
              range={CONFIG_RANGES.segmentTokenBudget}
            />
            <ValueRow
              label="Max Segments"
              leftValue={leftConfig.segments.maxCount}
              rightValue={rightConfig.segments.maxCount}
              rightEditable={isEditMode}
              onRightChange={value => updateDraft('segments', 'maxCount', value as number)}
              type="number"
              range={CONFIG_RANGES.maxSegments}
            />
          </section>
        </div>

        <div className="border-t border-slate-200 px-6 py-4">
          <div className="flex flex-wrap gap-2 justify-end">
            <Button
              variant="ghost"
              onClick={event => {
                event.stopPropagation();
                onClose();
              }}
              type="button"
            >
              Cancel
            </Button>
            {isEditMode && (
              <Button
                onClick={event => {
                  event.stopPropagation();
                  onApply(draftConfig);
                }}
                type="button"
              >
                Apply configuration
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

export default function ChatConfig() {
  const { projectId = '' } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { chatConfig, setChatConfig, configs } = useChatContext();

  const handleClose = () => navigate(toProjectChatNew({ projectId }), { replace: true });

  const handleApply = (config: ChatConfigForm) => {
    setChatConfig(config);
    navigate(toProjectChatNew({ projectId }), { replace: true });
  };

  return (
    <ConfigModalWindow open configs={configs} currentConfig={chatConfig} onClose={handleClose} onApply={handleApply} />
  );
}
