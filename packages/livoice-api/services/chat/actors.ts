import type { KeystoneContext } from '@keystone-6/core/types';
import type { MentionInfo, SystemPromptContext } from './types';

export const fetchSegmentActors = async (
  context: KeystoneContext,
  segmentIds: string[]
): Promise<Record<string, MentionInfo[]>> => {
  if (!segmentIds.length) return {} as Record<string, MentionInfo[]>;
  const sudo = context.sudo();
  const mentions =
    (await sudo.prisma.actorMention.findMany({
      where: { segment: { id: { in: segmentIds } } },
      include: { actor: true, segment: true }
    })) ?? [];

  return mentions.reduce<Record<string, MentionInfo[]>>((actorMap, mention) => {
    const segmentId = mention.segment?.id ?? null;
    const actorName = mention.actor?.name;
    if (!segmentId || !actorName) return actorMap;
    const info: MentionInfo = {
      name: actorName,
      type: mention.actor?.type ?? null,
      mentionType: mention.mentionType ?? null,
      sentiment: mention.sentiment ?? null
    };
    actorMap[segmentId] = actorMap[segmentId] ? [...actorMap[segmentId], info] : [info];
    return actorMap;
  }, {});
};

export const fetchProjectActorContext = async (
  context: KeystoneContext,
  projectId?: string | null
): Promise<SystemPromptContext> => {
  const defaults: SystemPromptContext = {
    projectName: 'project',
    transcriptTitles: [],
    sourceNames: [],
    actorsSummary: '',
    speakersSummary: '',
    totalTranscripts: 0
  };

  if (!projectId) return defaults;

  const sudo = context.sudo();

  const [actors, speakers, rangeRow] = await Promise.all([
    sudo.prisma.$queryRaw<{ name: string | null; type: string | null; count: number }[]>`
      SELECT a."name" AS "name", a."type" AS "type", COUNT(*)::int AS "count"
      FROM "ActorMention" am
      INNER JOIN "Transcript" t ON t.id = am."transcript"
      INNER JOIN "Source" s ON s.id = t."source"
      INNER JOIN "_Project_sources" ps ON ps."B" = s.id
      INNER JOIN "Actor" a ON a.id = am."actor"
      WHERE ps."A" = ${projectId}
      GROUP BY a."name", a."type"
      ORDER BY COUNT(*) DESC
      LIMIT 10
    `,
    sudo.prisma.$queryRaw<{ name: string | null; type: string | null; count: number }[]>`
      SELECT a."name" AS "name", a."type" AS "type", COUNT(*)::int AS "count"
      FROM "TranscriptSegment" ts
      INNER JOIN "Transcript" t ON t.id = ts."transcript"
      INNER JOIN "Source" s ON s.id = t."source"
      INNER JOIN "_Project_sources" ps ON ps."B" = s.id
      INNER JOIN "Actor" a ON a.id = ts."speakerActor"
      WHERE ps."A" = ${projectId}
      GROUP BY a."name", a."type"
      ORDER BY COUNT(*) DESC
      LIMIT 10
    `,
    sudo.prisma.$queryRaw<{ min: Date | null; max: Date | null; total: number }[]>`
      SELECT
        MIN(t."publishedAt") AS "min",
        MAX(t."publishedAt") AS "max",
        COUNT(DISTINCT t.id)::int AS "total"
      FROM "Transcript" t
      INNER JOIN "Source" s ON s.id = t."source"
      INNER JOIN "_Project_sources" ps ON ps."B" = s.id
      WHERE ps."A" = ${projectId}
    `
  ]);

  const actorsSummary = (actors ?? [])
    .filter(item => item.name)
    .map(({ name, type, count }) => `- ${name}${type ? ` (${type})` : ''}${count ? ` • ${count}` : ''}`)
    .join('\n');

  const speakersSummary = (speakers ?? [])
    .filter(item => item.name)
    .map(({ name, type, count }) => `- ${name}${type ? ` (${type})` : ''}${count ? ` • ${count}` : ''}`)
    .join('\n');

  const range = rangeRow?.[0];
  const totalTranscripts = range?.total ?? 0;

  return {
    ...defaults,
    actorsSummary,
    speakersSummary,
    totalTranscripts
  };
};
