import { graphql } from '@keystone-6/core';

export type TranscriptImportProgress = {
  total: number;
  pending: number;
  fetching: number;
  completed: number;
  failed: number;
  skipped: number;
  pendingPercentage: number;
  fetchingPercentage: number;
  completedPercentage: number;
  failedPercentage: number;
  skippedPercentage: number;
};

export type TranscriptEmbeddingProgress = {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  pendingPercentage: number;
  processingPercentage: number;
  completedPercentage: number;
  failedPercentage: number;
};

export type TranscriptAnalysisProgress = {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  skipped: number;
  pendingPercentage: number;
  processingPercentage: number;
  completedPercentage: number;
  failedPercentage: number;
  skippedPercentage: number;
};

export type OverallProgress = {
  importCompletedPercentage: number;
  analysisCompletedPercentage: number;
  embeddingCompletedPercentage: number;
  overallPercentage: number;
};

export type SegmentEmbeddingProgress = {
  total: number;
  embedded: number;
  notEmbedded: number;
  embeddedPercentage: number;
  notEmbeddedPercentage: number;
};

const TranscriptImportProgressGraphqlType = graphql.object<TranscriptImportProgress>()({
  name: 'TranscriptImportProgress',
  fields: {
    total: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    pending: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    fetching: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    completed: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    failed: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    skipped: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    pendingPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) }),
    fetchingPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) }),
    completedPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) }),
    failedPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) }),
    skippedPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) })
  }
});

const TranscriptEmbeddingProgressGraphqlType = graphql.object<TranscriptEmbeddingProgress>()({
  name: 'TranscriptEmbeddingProgress',
  fields: {
    total: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    pending: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    processing: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    completed: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    failed: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    pendingPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) }),
    processingPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) }),
    completedPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) }),
    failedPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) })
  }
});

const TranscriptAnalysisProgressGraphqlType = graphql.object<TranscriptAnalysisProgress>()({
  name: 'TranscriptAnalysisProgress',
  fields: {
    total: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    pending: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    processing: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    completed: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    failed: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    skipped: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    pendingPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) }),
    processingPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) }),
    completedPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) }),
    failedPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) }),
    skippedPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) })
  }
});

const OverallProgressGraphqlType = graphql.object<OverallProgress>()({
  name: 'OverallProgress',
  fields: {
    importCompletedPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) }),
    analysisCompletedPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) }),
    embeddingCompletedPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) }),
    overallPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) })
  }
});

const SegmentEmbeddingProgressGraphqlType = graphql.object<SegmentEmbeddingProgress>()({
  name: 'SegmentEmbeddingProgress',
  fields: {
    total: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    embedded: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    notEmbedded: graphql.field({ type: graphql.nonNull(graphql.Int) }),
    embeddedPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) }),
    notEmbeddedPercentage: graphql.field({ type: graphql.nonNull(graphql.Float) })
  }
});

export {
  OverallProgressGraphqlType,
  SegmentEmbeddingProgressGraphqlType,
  TranscriptAnalysisProgressGraphqlType,
  TranscriptEmbeddingProgressGraphqlType,
  TranscriptImportProgressGraphqlType
};
