import type { SegmentEmbeddingProgress } from '../extensions/SourceImportProgress';

type TranscriptItem = {
  id?: string | { toString(): string } | null;
};

type ContextWithPrisma = {
  sudo: () => {
    prisma: {
      $queryRaw<T = unknown>(query: TemplateStringsArray, ...values: unknown[]): Promise<T>;
    };
  };
};

export const resolveSegmentEmbeddingProgress = async (
  item: TranscriptItem,
  _args: unknown,
  context: ContextWithPrisma
): Promise<SegmentEmbeddingProgress> => {
  if (!item?.id) {
    return {
      total: 0,
      embedded: 0,
      notEmbedded: 0,
      embeddedPercentage: 0,
      notEmbeddedPercentage: 0
    };
  }

  const sudo = context.sudo();
  const [{ total: totalRaw, embedded: embeddedRaw }] = await sudo.prisma.$queryRaw<
    { total: bigint; embedded: bigint }[]
  >`
    SELECT
      COUNT(*) as total,
      COUNT(CASE WHEN embedding IS NOT NULL THEN 1 END) as embedded
    FROM "TranscriptSegment"
    WHERE transcript = ${String(item.id)}
  `;

  const total = Number(totalRaw);
  const embedded = Number(embeddedRaw);
  const notEmbedded = total - embedded;

  const embeddedPercentage = total > 0 ? (embedded / total) * 100 : 0;
  const notEmbeddedPercentage = total > 0 ? (notEmbedded / total) * 100 : 0;

  return {
    total: total,
    embedded: embedded,
    notEmbedded,
    embeddedPercentage,
    notEmbeddedPercentage
  };
};
