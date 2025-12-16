import { graphql } from '@keystone-6/core';
import { aDate } from '../../lib/date';

export type SourceImportHistoryEntry = {
  startedAt: string | Date | null;
  completedAt: string | Date | null;
  itemsFound: number;
  itemsImported: number;
  itemsSkipped: number;
  itemsFailed: number;
  error: string | null;
};

export const SourceImportHistoryEntryGraphqlType = graphql.list(
  graphql.object<SourceImportHistoryEntry>()({
    name: 'ImportHistoryEntry',
    fields: {
      startedAt: graphql.field({
        type: graphql.DateTime,
        resolve: entry => aDate(entry?.startedAt)
      }),
      completedAt: graphql.field({
        type: graphql.DateTime,
        resolve: entry => aDate(entry?.completedAt)
      }),
      itemsFound: graphql.field({ type: graphql.Int }),
      itemsImported: graphql.field({ type: graphql.Int }),
      itemsSkipped: graphql.field({ type: graphql.Int }),
      itemsFailed: graphql.field({ type: graphql.Int }),
      error: graphql.field({ type: graphql.String })
    }
  })
);
