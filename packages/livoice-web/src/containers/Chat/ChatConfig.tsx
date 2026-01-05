import { DiffEditor } from '@monaco-editor/react';
import { X } from 'lucide-react';
import type * as Monaco from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';

import { useCreateChatConfigMutation, useUpdateChatConfigMutation } from '@/gql/generated';
import { cn } from '@/lib/cn';
import { toProjectChatNew } from '@/services/linker';
import { Button } from '@/ui/button';
import { CONFIG_RANGES, DEFAULT_CHAT_CONFIG, OPENAI_MODELS } from './constants';
import type { ChatConfigEntry, ChatConfigForm } from './types';
import { useChatContext } from './useChatContext';

type TabId = 'edit' | 'compare';
type EditMode = 'edit' | 'create';

interface ConfigModalProps {
  open: boolean;
  onClose: () => void;
  configs: ChatConfigEntry[];
  selectedConfigId: string | null;
  onSelectConfig: (id: string) => void;
  onRefetch: () => void;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'edit', label: 'Edit config' },
  { id: 'compare', label: 'Compare configs' }
];

const formatConfigLabel = (entry: ChatConfigEntry) => {
  const date = new Date(entry.createdAt);
  const dateTimeStr = date.toLocaleString();
  return `${entry.name} (${dateTimeStr})`;
};

const configEntryToForm = (entry: ChatConfigEntry): ChatConfigForm => ({
  name: entry.name,
  notes: entry.notes,
  systemPrompt: entry.systemPrompt,
  openai: entry.openai,
  context: entry.context,
  segments: entry.segments
});

const resolveConfigById = (id: string | null, configs: ChatConfigEntry[]): ChatConfigForm => {
  if (!id) return DEFAULT_CHAT_CONFIG;
  const found = configs.find(entry => entry.id === id);
  return found ? configEntryToForm(found) : DEFAULT_CHAT_CONFIG;
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

function ConfigModalWindow({ open, onClose, configs, selectedConfigId, onSelectConfig, onRefetch }: ConfigModalProps) {
  const [draftConfig, setDraftConfig] = useState<ChatConfigForm>(DEFAULT_CHAT_CONFIG);
  const [activeTab, setActiveTab] = useState<TabId>('edit');
  const [editMode, setEditMode] = useState<EditMode>('edit');
  const [baseConfigId, setBaseConfigId] = useState<string | null>(null);
  const [compareLeftId, setCompareLeftId] = useState<string | null>(null);
  const [compareRightId, setCompareRightId] = useState<string | null>(null);
  const [hasEdited, setHasEdited] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [createChatConfig] = useCreateChatConfigMutation();
  const [updateChatConfig] = useUpdateChatConfigMutation();

  const diffChangeDisposable = useRef<ReturnType<
    Monaco.editor.IStandaloneCodeEditor['onDidChangeModelContent']
  > | null>(null);
  const keyDownDisposable = useRef<ReturnType<Monaco.editor.IStandaloneCodeEditor['onKeyDown']> | null>(null);

  const diffEditorOptions: Monaco.editor.IDiffEditorConstructionOptions = {
    minimap: { enabled: false },
    renderSideBySide: true,
    enableSplitViewResizing: false,
    diffWordWrap: 'on',
    wordWrap: 'on',
    wordWrapOverride1: 'on',
    wordWrapOverride2: 'on',
    wordWrapColumn: 0,
    wrappingStrategy: 'advanced'
  };

  // Initialize state when modal opens
  useEffect(() => {
    if (!open) return;
    const firstConfigId = configs[0]?.id ?? null;
    setBaseConfigId(selectedConfigId ?? firstConfigId);
    setCompareLeftId(configs[1]?.id ?? firstConfigId);
    setCompareRightId(selectedConfigId ?? firstConfigId);
    setHasEdited(false);
    setEditMode('edit');
  }, [open, configs, selectedConfigId]);

  // Update draft when base config or edit mode changes
  useEffect(() => {
    if (!open) return;
    const baseConfig = resolveConfigById(baseConfigId, configs);
    if (editMode === 'create') {
      setDraftConfig({ ...baseConfig, name: '', notes: '' });
    } else {
      setDraftConfig(baseConfig);
    }
    setHasEdited(false);
  }, [open, baseConfigId, editMode, configs]);

  const handleEditableDiffMount = (editor: Monaco.editor.IStandaloneDiffEditor) => {
    diffChangeDisposable.current?.dispose();
    keyDownDisposable.current?.dispose();

    const modifiedEditor = editor.getModifiedEditor();

    keyDownDisposable.current = modifiedEditor.onKeyDown((event: Monaco.IKeyboardEvent) => {
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
          selections?.map((selection: Monaco.Selection) => ({
            range: selection,
            text: sanitized,
            forceMoveMarkers: true
          })) ?? (fallbackRange ? [{ range: fallbackRange, text: sanitized, forceMoveMarkers: true }] : []);

        modifiedEditor.executeEdits('plain-paste', edits as Monaco.editor.IIdentifiedSingleEditOperation[]);
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

  const baseConfig = resolveConfigById(baseConfigId, configs);
  const leftCompareConfig = resolveConfigById(compareLeftId, configs);
  const rightCompareConfig = resolveConfigById(compareRightId, configs);

  const hasCompareOptions = configs.length > 1;
  const isEditTab = activeTab === 'edit';
  const isCreateMode = editMode === 'create';

  const leftConfig = isEditTab ? baseConfig : leftCompareConfig;
  const rightConfig = isEditTab ? draftConfig : rightCompareConfig;

  const trimmedName = draftConfig.name?.trim() ?? '';
  const normalizedName = trimmedName.toLowerCase();
  const isNameDuplicate =
    isCreateMode && Boolean(normalizedName) && configs.some(({ name }) => name.trim().toLowerCase() === normalizedName);
  const isNameDuplicateOnEdit =
    !isCreateMode &&
    Boolean(normalizedName) &&
    configs.some(({ id, name }) => id !== baseConfigId && name.trim().toLowerCase() === normalizedName);

  const canSave = isEditTab && trimmedName && !isNameDuplicate && !isNameDuplicateOnEdit && hasEdited;

  const updateDraft = (section: 'openai' | 'context' | 'segments', key: string, value: string | number) => {
    setDraftConfig(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
    setHasEdited(true);
  };

  const updateField = (field: 'name' | 'notes', value: string) => {
    setDraftConfig(prev => ({ ...prev, [field]: value }));
    setHasEdited(true);
  };

  const handleSave = async () => {
    if (!canSave) return;
    setIsSaving(true);
    try {
      const data = {
        name: draftConfig.name,
        notes: draftConfig.notes,
        systemPrompt: draftConfig.systemPrompt,
        openai: draftConfig.openai,
        context: draftConfig.context,
        segments: draftConfig.segments
      };

      if (isCreateMode) {
        const result = await createChatConfig({ variables: { data } });
        const newId = result.data?.createChatConfig?.id;
        onRefetch();
        if (newId) onSelectConfig(newId);
      } else if (baseConfigId) {
        await updateChatConfig({ variables: { id: baseConfigId, data } });
        onRefetch();
      }
      onClose();
    } catch (error) {
      console.error('Failed to save config:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!open) return null;

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
          {/* Tabs */}
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

          {isEditTab ? (
            <>
              {/* Config selector */}
              <div className="flex items-end gap-3">
                <label className="flex-1 space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <span>Select config</span>
                  <select
                    value={baseConfigId ?? ''}
                    onChange={event => setBaseConfigId(event.target.value || null)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                  >
                    {!configs.length ? (
                      <option value="" disabled>
                        No saved configs yet
                      </option>
                    ) : (
                      configs.map(entry => (
                        <option key={entry.id} value={entry.id}>
                          {formatConfigLabel(entry)}
                        </option>
                      ))
                    )}
                  </select>
                </label>
                {!isCreateMode && baseConfigId && (
                  <Button
                    onClick={event => {
                      event.stopPropagation();
                      onSelectConfig(baseConfigId);
                      onClose();
                    }}
                    type="button"
                  >
                    Use this config
                  </Button>
                )}
              </div>

              {/* Mode toggle + Name/Notes */}
              <div className="grid grid-cols-2 gap-4">
                {/* Edit/Create mode toggle - Left */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">Mode</span>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="editMode"
                        value="edit"
                        checked={editMode === 'edit'}
                        onChange={() => setEditMode('edit')}
                        className="text-violet-600 focus:ring-violet-500"
                      />
                      <span className="text-sm text-slate-700">Edit existing config</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="editMode"
                        value="create"
                        checked={editMode === 'create'}
                        onChange={() => setEditMode('create')}
                        className="text-violet-600 focus:ring-violet-500"
                      />
                      <span className="text-sm text-slate-700">Create new config from selected</span>
                    </label>
                  </div>
                </div>

                {/* Name and Notes fields - Right */}
                <div className="space-y-3">
                  <label className="block space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    <span>Config name</span>
                    <input
                      type="text"
                      value={draftConfig.name}
                      onChange={event => updateField('name', event.target.value)}
                      placeholder="Enter a name for this configuration"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                    />
                    {!trimmedName && hasEdited && (
                      <p className="text-[10px] font-medium normal-case text-red-600">Name is required</p>
                    )}
                    {(isNameDuplicate || isNameDuplicateOnEdit) && (
                      <p className="text-[10px] font-medium normal-case text-amber-700">Name is already in use</p>
                    )}
                  </label>
                  <label className="block space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    <span>Notes</span>
                    <textarea
                      value={draftConfig.notes}
                      onChange={event => updateField('notes', event.target.value)}
                      placeholder="Add notes about this configuration"
                      rows={6}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 resize-none"
                    />
                  </label>
                </div>
              </div>
            </>
          ) : (
            /* Compare mode selectors */
            <div className="grid grid-cols-2 gap-4">
              <label className="space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                <span>Left config</span>
                <select
                  value={compareLeftId ?? ''}
                  onChange={event => setCompareLeftId(event.target.value || null)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                >
                  {!configs.length ? (
                    <option value="" disabled>
                      No saved configs yet
                    </option>
                  ) : (
                    configs.map(entry => (
                      <option key={entry.id} value={entry.id}>
                        {formatConfigLabel(entry)}
                      </option>
                    ))
                  )}
                </select>
              </label>
              <label className="space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                <span>Right config</span>
                <select
                  value={compareRightId ?? ''}
                  onChange={event => setCompareRightId(event.target.value || null)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                >
                  {!configs.length ? (
                    <option value="" disabled>
                      No saved configs yet
                    </option>
                  ) : (
                    configs.map(entry => (
                      <option key={entry.id} value={entry.id}>
                        {formatConfigLabel(entry)}
                      </option>
                    ))
                  )}
                </select>
              </label>
            </div>
          )}

          {/* Notes comparison (Compare mode only) */}
          {!isEditTab && hasCompareOptions && (
            <section className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Notes</span>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
                <DiffEditor
                  key={`notes-compare-${compareLeftId}-${compareRightId}`}
                  language="plaintext"
                  original={leftConfig.notes}
                  modified={rightConfig.notes}
                  height="150px"
                  options={{ ...diffEditorOptions, readOnly: true }}
                />
              </div>
            </section>
          )}

          {/* System Prompt - Diff Editor */}
          <section className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <span className="text-sm font-semibold text-slate-700">
                System Prompt {isEditTab ? '(Base)' : '(Left)'}
              </span>
              <span className="text-sm font-semibold text-slate-700">
                System Prompt {isEditTab ? '(Editable)' : '(Right)'}
              </span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
              {isEditTab ? (
                <DiffEditor
                  key={`edit-${baseConfigId}-${editMode}`}
                  language="plaintext"
                  original={leftConfig.systemPrompt}
                  modified={draftConfig.systemPrompt}
                  height="400px"
                  onMount={handleEditableDiffMount}
                  options={{ ...diffEditorOptions, readOnly: false }}
                />
              ) : hasCompareOptions ? (
                <DiffEditor
                  key={`compare-${compareLeftId}-${compareRightId}`}
                  language="plaintext"
                  original={leftConfig.systemPrompt}
                  modified={rightConfig.systemPrompt}
                  height="400px"
                  options={{ ...diffEditorOptions, readOnly: true }}
                />
              ) : (
                <p className="p-4 text-sm text-slate-500">
                  Create at least two configurations to compare them side by side.
                </p>
              )}
            </div>
            <div className="text-xs text-slate-500 space-y-2">
              <p className="font-medium">Available placeholders:</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1">
                  <code className="bg-slate-100 px-1 rounded text-xs font-mono">{'{projectName}'}</code>
                  <span className="text-slate-400">Project name</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1">
                  <code className="bg-slate-100 px-1 rounded text-xs font-mono">{'{transcriptTitles}'}</code>
                  <span className="text-slate-400">Transcript titles</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1">
                  <code className="bg-slate-100 px-1 rounded text-xs font-mono">{'{sourceNames}'}</code>
                  <span className="text-slate-400">Source names</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1">
                  <code className="bg-slate-100 px-1 rounded text-xs font-mono">{'{actorsSummary}'}</code>
                  <span className="text-slate-400">Top actors (type and frequency)</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1">
                  <code className="bg-slate-100 px-1 rounded text-xs font-mono">{'{speakersSummary}'}</code>
                  <span className="text-slate-400">Top speakers (and frequency)</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1">
                  <code className="bg-slate-100 px-1 rounded text-xs font-mono">{'{totalTranscripts}'}</code>
                  <span className="text-slate-400">Total count</span>
                </span>
              </div>
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
              rightEditable={isEditTab}
              onRightChange={value => updateDraft('openai', 'model', value as string)}
              type="select"
              options={OPENAI_MODELS.map(model => ({ value: model.value, label: model.label }))}
            />
            <ValueRow
              label="Temperature"
              leftValue={leftConfig.openai.temperature}
              rightValue={rightConfig.openai.temperature}
              rightEditable={isEditTab}
              onRightChange={value => updateDraft('openai', 'temperature', value as number)}
              type="range"
              range={CONFIG_RANGES.temperature}
            />
            <ValueRow
              label="Max Output Tokens"
              leftValue={leftConfig.openai.maxOutputTokens}
              rightValue={rightConfig.openai.maxOutputTokens}
              rightEditable={isEditTab}
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
              rightEditable={isEditTab}
              onRightChange={value => updateDraft('context', 'maxInputTokens', value as number)}
              type="number"
              range={CONFIG_RANGES.maxInputTokens}
            />
            <ValueRow
              label="Reserved Tokens"
              leftValue={leftConfig.context.reservedTokens}
              rightValue={rightConfig.context.reservedTokens}
              rightEditable={isEditTab}
              onRightChange={value => updateDraft('context', 'reservedTokens', value as number)}
              type="number"
              range={CONFIG_RANGES.reservedTokens}
            />
            <ValueRow
              label="History Token Budget"
              leftValue={leftConfig.context.historyTokenBudget}
              rightValue={rightConfig.context.historyTokenBudget}
              rightEditable={isEditTab}
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
              rightEditable={isEditTab}
              onRightChange={value => updateDraft('segments', 'tokenBudget', value as number)}
              type="number"
              range={CONFIG_RANGES.segmentTokenBudget}
            />
            <ValueRow
              label="Max Segments"
              leftValue={leftConfig.segments.maxCount}
              rightValue={rightConfig.segments.maxCount}
              rightEditable={isEditTab}
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
            {isEditTab && (
              <Button onClick={handleSave} type="button" disabled={!canSave || isSaving}>
                {isSaving ? 'Saving...' : isCreateMode ? 'Create config' : 'Save changes and use config'}
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
  const { selectedConfigId, setSelectedConfigId, configs, refetchConfigs } = useChatContext();

  const handleClose = () => navigate(toProjectChatNew({ projectId }), { replace: true });

  return (
    <ConfigModalWindow
      open
      configs={configs}
      selectedConfigId={selectedConfigId}
      onSelectConfig={setSelectedConfigId}
      onRefetch={refetchConfigs}
      onClose={handleClose}
    />
  );
}
