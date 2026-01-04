import { estimateTokens } from '../../../lib/tokenUtils';
import type { SegmentRecord, SegmentWithMeta } from '../types';
import { buildSegmentDescription } from './format';

export const selectSegmentsWithinBudget = (
  segments: SegmentRecord[],
  maxTokens: number
): { selected: SegmentWithMeta[]; totalTokens: number } => {
  const segmentWithTokens: SegmentWithMeta[] = segments.map(segment => ({
    ...segment,
    estimatedTokens: estimateTokens(buildSegmentDescription(segment))
  }));

  const { selected, totalTokens } = segmentWithTokens.reduce(
    (acc, segment) => {
      const exceeded = acc.exceeded || acc.totalTokens + segment.estimatedTokens > maxTokens;

      return {
        ...acc,
        ...(!exceeded && {
          selected: [...acc.selected, segment],
          totalTokens: acc.totalTokens + segment.estimatedTokens
        }),
        exceeded
      };
    },
    { selected: [] as SegmentWithMeta[], totalTokens: 0, exceeded: false }
  );

  return { selected, totalTokens };
};

