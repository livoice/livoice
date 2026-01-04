import type { KeystoneContext } from '@keystone-6/core/types';
import { CronExpressionParser } from 'cron-parser';
import type {
  OverallProgress,
  TranscriptAnalysisProgress,
  TranscriptEmbeddingProgress,
  TranscriptImportProgress
} from '../extensions/SourceImportProgress';

type SourceItem = {
  id?: string | { toString(): string } | null;
  importCronExpression?: string | null;
};

export const resolveImportNextAt = (item: SourceItem) => {
  if (!item?.importCronExpression) return null;
  try {
    return CronExpressionParser.parse(item.importCronExpression as string)
      .next()
      .toDate();
  } catch {
    return null;
  }
};

type SourceItemWithId = {
  id?: string | { toString(): string } | null;
};

type ImportStatusCountRow = { importStatus: string | null; _count: { id: number } };
type EmbeddingStatusCountRow = { embeddingStatus: string | null; _count: { id: number } };
type AnalysisStatusCountRow = { analysisStatus: string | null; _count: { id: number } };

export const resolveTranscriptImportProgress = async (
  item: SourceItemWithId,
  _args: unknown,
  context: KeystoneContext
): Promise<TranscriptImportProgress> => {
  if (!item?.id) {
    return {
      total: 0,
      pending: 0,
      fetching: 0,
      completed: 0,
      failed: 0,
      skipped: 0,
      pendingPercentage: 0,
      fetchingPercentage: 0,
      completedPercentage: 0,
      failedPercentage: 0,
      skippedPercentage: 0
    };
  }

  const sudo = context.sudo();
  const sourceId = String(item.id);

  // Use database-level aggregation instead of loading all transcripts into memory
  const statusCounts = (await sudo.prisma.transcript.groupBy({
    by: ['importStatus'],
    where: { sourceId },
    _count: { id: true }
  })) as ImportStatusCountRow[];

  const counts = {
    pending: 0,
    fetching: 0,
    completed: 0,
    failed: 0,
    skipped: 0
  };

  statusCounts.forEach(row => {
    const status = row.importStatus || 'pending';
    if (status in counts) counts[status as keyof typeof counts] = row._count.id;
  });

  const total = statusCounts.reduce((sum, row) => sum + row._count.id, 0);
  const calculatePercentage = (count: number) => (total > 0 ? (count / total) * 100 : 0);

  return {
    total,
    pending: counts.pending,
    fetching: counts.fetching,
    completed: counts.completed,
    failed: counts.failed,
    skipped: counts.skipped,
    pendingPercentage: calculatePercentage(counts.pending),
    fetchingPercentage: calculatePercentage(counts.fetching),
    completedPercentage: calculatePercentage(counts.completed),
    failedPercentage: calculatePercentage(counts.failed),
    skippedPercentage: calculatePercentage(counts.skipped)
  };
};

export const resolveTranscriptEmbeddingProgress = async (
  item: SourceItemWithId,
  _args: unknown,
  context: KeystoneContext
): Promise<TranscriptEmbeddingProgress> => {
  if (!item?.id) {
    return {
      total: 0,
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0,
      pendingPercentage: 0,
      processingPercentage: 0,
      completedPercentage: 0,
      failedPercentage: 0
    };
  }

  const sudo = context.sudo();
  const sourceId = String(item.id);

  // Use database-level aggregation instead of loading all transcripts into memory
  const statusCounts = (await sudo.prisma.transcript.groupBy({
    by: ['embeddingStatus'],
    where: { sourceId },
    _count: { id: true }
  })) as EmbeddingStatusCountRow[];

  const counts = {
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0
  };

  statusCounts.forEach(row => {
    const status = row.embeddingStatus || 'pending';
    if (status in counts) counts[status as keyof typeof counts] = row._count.id;
  });

  const total = statusCounts.reduce((sum, row) => sum + row._count.id, 0);
  const calculatePercentage = (count: number) => (total > 0 ? (count / total) * 100 : 0);

  return {
    total,
    pending: counts.pending,
    processing: counts.processing,
    completed: counts.completed,
    failed: counts.failed,
    pendingPercentage: calculatePercentage(counts.pending),
    processingPercentage: calculatePercentage(counts.processing),
    completedPercentage: calculatePercentage(counts.completed),
    failedPercentage: calculatePercentage(counts.failed)
  };
};

export const resolveTranscriptAnalysisProgress = async (
  item: SourceItemWithId,
  _args: unknown,
  context: KeystoneContext
): Promise<TranscriptAnalysisProgress> => {
  if (!item?.id) {
    return {
      total: 0,
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0,
      skipped: 0,
      pendingPercentage: 0,
      processingPercentage: 0,
      completedPercentage: 0,
      failedPercentage: 0,
      skippedPercentage: 0
    };
  }

  const sudo = context.sudo();
  const sourceId = String(item.id);

  const statusCounts = (await sudo.prisma.transcript.groupBy({
    by: ['analysisStatus'],
    where: { sourceId },
    _count: { id: true }
  })) as AnalysisStatusCountRow[];

  const counts = {
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0,
    skipped: 0
  };

  statusCounts.forEach(row => {
    const status = row.analysisStatus || 'pending';
    if (status in counts) counts[status as keyof typeof counts] = row._count.id;
  });

  const total = statusCounts.reduce((sum, row) => sum + row._count.id, 0);
  const calculatePercentage = (count: number) => (total > 0 ? (count / total) * 100 : 0);

  return {
    total,
    pending: counts.pending,
    processing: counts.processing,
    completed: counts.completed,
    failed: counts.failed,
    skipped: counts.skipped,
    pendingPercentage: calculatePercentage(counts.pending),
    processingPercentage: calculatePercentage(counts.processing),
    completedPercentage: calculatePercentage(counts.completed),
    failedPercentage: calculatePercentage(counts.failed),
    skippedPercentage: calculatePercentage(counts.skipped)
  };
};

export const resolveOverallProgress = async (
  item: SourceItemWithId,
  _args: unknown,
  context: KeystoneContext
): Promise<OverallProgress> => {
  if (!item?.id) {
    return {
      importCompletedPercentage: 0,
      embeddingCompletedPercentage: 0,
      overallPercentage: 0
    };
  }

  const sudo = context.sudo();
  const sourceId = String(item.id);

  // Use database-level aggregation instead of loading all transcripts into memory
  const [importCounts, embeddingCounts, analysisCounts] = (await Promise.all([
    sudo.prisma.transcript.groupBy({
      by: ['importStatus'],
      where: { sourceId },
      _count: { id: true }
    }),
    sudo.prisma.transcript.groupBy({
      by: ['embeddingStatus'],
      where: { sourceId },
      _count: { id: true }
    }),
    sudo.prisma.transcript.groupBy({
      by: ['analysisStatus'],
      where: { sourceId },
      _count: { id: true }
    })
  ])) as [ImportStatusCountRow[], EmbeddingStatusCountRow[], AnalysisStatusCountRow[]];

  const total = importCounts.reduce((sum, row) => sum + row._count.id, 0);

  if (total === 0) {
    return {
      importCompletedPercentage: 0,
      analysisCompletedPercentage: 0,
      embeddingCompletedPercentage: 0,
      overallPercentage: 0
    };
  }

  const importCompleted = importCounts
    .filter(row => row.importStatus === 'completed' || row.importStatus === 'skipped')
    .reduce((sum, row) => sum + row._count.id, 0);
  const embeddingCompleted = embeddingCounts
    .filter(row => row.embeddingStatus === 'completed')
    .reduce((sum, row) => sum + row._count.id, 0);
  const analysisCompleted = analysisCounts
    .filter(row => row.analysisStatus === 'completed' || row.analysisStatus === 'skipped')
    .reduce((sum, row) => sum + row._count.id, 0);

  const importCompletedPercentage = (importCompleted / total) * 100;
  const analysisCompletedPercentage = (analysisCompleted / total) * 100;
  const embeddingCompletedPercentage = (embeddingCompleted / total) * 100;
  const overallPercentage = (importCompletedPercentage + analysisCompletedPercentage + embeddingCompletedPercentage) / 3;

  return {
    importCompletedPercentage,
    analysisCompletedPercentage,
    embeddingCompletedPercentage,
    overallPercentage
  };
};
