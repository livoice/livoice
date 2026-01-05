import type { KeystoneContext } from '@keystone-6/core/types';
import { fetchProjectActorContext } from './actors';
import { DEFAULT_CHAT_CONFIG } from './constants';
import type { ChatConfig, SystemPromptContext } from './types';

const parseJsonArray = <T>(value: string | T[] | null | undefined): T[] => {
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to parse JSON array', error);
      return [];
    }
  }
  return Array.isArray(value) ? value : [];
};

export const normalizeChatConfig = (config?: Partial<ChatConfig>, systemPromptOverride?: string): ChatConfig => ({
  name: config?.name ?? DEFAULT_CHAT_CONFIG.name,
  systemPrompt: config?.systemPrompt ?? systemPromptOverride ?? DEFAULT_CHAT_CONFIG.systemPrompt,
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

export const getSystemPromptReplacements = async ({
  context,
  projectId,
  systemPrompt
}: {
  context: KeystoneContext;
  projectId?: string | null;
  systemPrompt?: string;
}): Promise<SystemPromptContext> => {
  const defaults: SystemPromptContext = {
    projectName: 'project',
    transcriptTitles: [],
    sourceNames: [],
    actorsSummary: '',
    speakersSummary: '',
    totalTranscripts: 0
  };
  if (!projectId) return defaults;

  const needsProjectName = !systemPrompt || systemPrompt.includes('{projectName}');
  const needsSourceNames = systemPrompt?.includes('{sourceNames}') ?? false;
  const needsTranscriptTitles = systemPrompt?.includes('{transcriptTitles}') ?? false;
  const needsActorsSummary = systemPrompt?.includes('{actorsSummary}') ?? false;
  const needsSpeakersSummary = systemPrompt?.includes('{speakersSummary}') ?? false;
  const needsTotalTranscripts = systemPrompt?.includes('{totalTranscripts}') ?? false;

  if (
    !needsProjectName &&
    !needsSourceNames &&
    !needsTranscriptTitles &&
    !needsActorsSummary &&
    !needsSpeakersSummary &&
    !needsTotalTranscripts
  )
    return defaults;

  const sudoContext = context.sudo();

  const [project, sourceRow, transcriptRow, actorContext] = await Promise.all([
    needsProjectName ? sudoContext.query.Project.findOne({ where: { id: projectId }, query: 'name' }) : null,
    needsSourceNames
      ? sudoContext.prisma.$queryRaw<{ names: string | null }[]>`
          SELECT json_agg(DISTINCT s."name") AS "names"
          FROM "Source" s
          INNER JOIN "_Project_sources" ps ON ps."B" = s.id
          WHERE ps."A" = ${projectId}
            AND s."name" IS NOT NULL
            AND s."name" != ''
        `.then((rows: { names: string | null }[]) => rows?.[0])
      : null,
    needsTranscriptTitles
      ? sudoContext.prisma.$queryRaw<{ titles: string | string[] | null }[]>`
          SELECT json_agg(DISTINCT t."title") AS "titles"
          FROM "Transcript" t
          INNER JOIN "Source" s ON s.id = t."source"
          INNER JOIN "_Project_sources" ps ON ps."B" = s.id
          WHERE ps."A" = ${projectId}
            AND t."title" IS NOT NULL
            AND t."title" != ''
        `.then((rows: { titles: string | string[] | null }[]) => rows?.[0])
      : null,
    needsActorsSummary || needsSpeakersSummary || needsTotalTranscripts
      ? fetchProjectActorContext(context, projectId)
      : null
  ]);

  if (needsProjectName && !project) return defaults;

  return {
    projectName: project?.name ?? 'project',
    sourceNames: parseJsonArray<string>(sourceRow?.names),
    transcriptTitles: parseJsonArray<string>(transcriptRow?.titles),
    actorsSummary: actorContext?.actorsSummary ?? '',
    speakersSummary: actorContext?.speakersSummary ?? '',
    totalTranscripts: actorContext?.totalTranscripts ?? 0
  };
};

export const replaceSystemPromptPlaceholders = async ({
  systemPrompt,
  context,
  projectId
}: {
  systemPrompt: string;
  context: KeystoneContext;
  projectId?: string;
}): Promise<string> => {
  const replacements = await getSystemPromptReplacements({
    context,
    projectId,
    systemPrompt
  });

  return systemPrompt
    .replace(/\{projectName\}/g, replacements.projectName)
    .replace(/\{transcriptTitles\}/g, replacements.transcriptTitles.join(', '))
    .replace(/\{sourceNames\}/g, replacements.sourceNames.join(', '))
    .replace(/\{actorsSummary\}/g, replacements.actorsSummary ?? '')
    .replace(/\{speakersSummary\}/g, replacements.speakersSummary ?? '')
    .replace(/\{totalTranscripts\}/g, replacements.totalTranscripts?.toString() ?? '');
};
