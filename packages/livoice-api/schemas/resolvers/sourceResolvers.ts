import type { KeystoneContext } from '@keystone-6/core/types';
import { CronExpressionParser } from 'cron-parser';
import type {
  OverallProgress,
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
  const transcripts = (await sudo.query.Transcript.findMany({
    where: { source: { id: { equals: String(item.id) } } },
    query: 'importStatus'
  })) as Array<{ importStatus?: string | null }>;

  const total = transcripts.length;
  const counts = {
    pending: 0,
    fetching: 0,
    completed: 0,
    failed: 0,
    skipped: 0
  };

  transcripts.forEach(transcript => {
    const status = transcript.importStatus || 'pending';
    if (status in counts) counts[status as keyof typeof counts]++;
  });

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
  const transcripts = (await sudo.query.Transcript.findMany({
    where: { source: { id: { equals: String(item.id) } } },
    query: 'embeddingStatus'
  })) as Array<{ embeddingStatus?: string | null }>;

  const total = transcripts.length;
  const counts = {
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0
  };

  transcripts.forEach(transcript => {
    const status = transcript.embeddingStatus || 'pending';
    if (status in counts) counts[status as keyof typeof counts]++;
  });

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
  const transcripts = (await sudo.query.Transcript.findMany({
    where: { source: { id: { equals: String(item.id) } } },
    query: 'importStatus embeddingStatus'
  })) as Array<{ importStatus?: string | null; embeddingStatus?: string | null }>;

  const total = transcripts.length;
  if (total === 0) {
    return {
      importCompletedPercentage: 0,
      embeddingCompletedPercentage: 0,
      overallPercentage: 0
    };
  }

  const importCompleted = transcripts.filter(
    t => t.importStatus === 'completed' || t.importStatus === 'skipped'
  ).length;
  const embeddingCompleted = transcripts.filter(t => t.embeddingStatus === 'completed').length;

  const importCompletedPercentage = (importCompleted / total) * 100;
  const embeddingCompletedPercentage = (embeddingCompleted / total) * 100;
  const overallPercentage = (importCompletedPercentage + embeddingCompletedPercentage) / 2;

  return {
    importCompletedPercentage,
    embeddingCompletedPercentage,
    overallPercentage
  };
};
