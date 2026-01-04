import type { TypeInfo } from '.keystone/types';
import { graphql, list } from '@keystone-6/core';
import { json, relationship, select, text, timestamp, virtual } from '@keystone-6/core/fields';
import type { KeystoneContext } from '@keystone-6/core/types';
import { canEditOrgData, filterByUserOrg, isAuthenticated, isGod, isOrgAdmin } from '../domains/auth/userRole';
import { triggerButton } from '../fields/TriggerButton';
import { virtualTypedJson } from '../fields/VirtualTypedJson';
import { aDate } from '../lib/date';
import { getSourceAdapter } from '../lib/sources';
import { SourceType } from '../lib/sources/types';
import { SourceImportHistoryEntry, SourceImportHistoryEntryGraphqlType } from './extensions/SourceImportHistoryEntry';
import {
  OverallProgressGraphqlType,
  TranscriptAnalysisProgressGraphqlType,
  TranscriptEmbeddingProgressGraphqlType,
  TranscriptImportProgressGraphqlType
} from './extensions/SourceImportProgress';
import {
  resolveImportNextAt,
  resolveOverallProgress,
  resolveTranscriptAnalysisProgress,
  resolveTranscriptEmbeddingProgress,
  resolveTranscriptImportProgress
} from './resolvers/sourceResolvers';

export type SourceItem = TypeInfo['lists']['Source']['item'];
const SOURCE_TYPES = [{ label: 'YouTube Channel', value: 'youtube_channel' }] as const;

const IMPORT_STATUSES = [
  { label: 'Idle', value: 'idle' },
  { label: 'Importing', value: 'importing' },
  { label: 'Completed', value: 'completed' },
  { label: 'Failed', value: 'failed' }
] as const;

const deriveExternalId = (type: SourceType | string | undefined, url: string | undefined | null) =>
  getSourceAdapter(type as SourceType)?.parseSourceUrl(url) ?? null;

export default list({
  fields: {
    type: select({ type: 'enum', options: SOURCE_TYPES, validation: { isRequired: true } }),
    name: text({ validation: { isRequired: true } }),
    url: text({ validation: { isRequired: true } }),
    externalId: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    importStatus: select({ type: 'enum', options: IMPORT_STATUSES, defaultValue: 'idle' }),
    importStartedAt: timestamp(),
    importCompletedAt: timestamp(),
    importCronExpression: text(),
    importNextAt: virtual({
      field: graphql.field({
        type: graphql.DateTime,
        resolve: resolveImportNextAt
      })
    }),
    importHistory: json(),
    importHistoryTyped: virtualTypedJson({
      ui: {
        query: '{ startedAt completedAt itemsFound itemsImported itemsSkipped itemsFailed error }'
      },
      field: graphql.field({
        type: SourceImportHistoryEntryGraphqlType,
        resolve: item =>
          ((item.importHistory as SourceImportHistoryEntry[]) ?? []).map(entry => ({
            ...entry,
            startedAt: aDate(entry?.startedAt),
            completedAt: aDate(entry?.completedAt)
          }))
      })
    }),
    transcriptImportProgress: virtual({
      ui: {
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' }
      },
      field: graphql.field({
        type: TranscriptImportProgressGraphqlType,
        resolve: resolveTranscriptImportProgress
      })
    }),
    transcriptAnalysisProgress: virtual({
      ui: {
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' }
      },
      field: graphql.field({
        type: TranscriptAnalysisProgressGraphqlType,
        resolve: resolveTranscriptAnalysisProgress
      })
    }),
    transcriptEmbeddingProgress: virtual({
      ui: {
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' }
      },
      field: graphql.field({
        type: TranscriptEmbeddingProgressGraphqlType,
        resolve: resolveTranscriptEmbeddingProgress
      })
    }),
    overallProgress: virtual({
      ui: {
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' }
      },
      field: graphql.field({
        type: OverallProgressGraphqlType,
        resolve: resolveOverallProgress
      })
    }),
    org: relationship({ ref: 'Organization.sources', many: false }),
    transcripts: relationship({ ref: 'Transcript.source', many: true }),
    speakerActors: relationship({ ref: 'Actor.speakerSources', many: true }),
    projects: relationship({ ref: 'Project.sources', many: true }),
    importTrigger: triggerButton()
  },
  ui: {
    labelField: 'name'
  },
  access: {
    operation: {
      query: ({ session }) => isAuthenticated({ session }),
      create: canEditOrgData,
      update: canEditOrgData,
      delete: canEditOrgData
    },
    filter: {
      query: async ({ session }) => {
        if (!isAuthenticated({ session })) return false;
        if (isGod({ session })) return true;
        return filterByUserOrg({ session });
      }
    },
    item: {
      update: async ({ session, item, context }) => {
        if (isGod({ session })) return true;
        if (!item?.id) return false;
        const sudo = context.sudo();
        const stored = (await sudo.query.Source.findOne({
          where: { id: String(item.id) },
          query: 'org { id }'
        })) as { org?: { id: string } | null } | null;
        if (!stored?.org?.id) return false;
        if (isOrgAdmin({ session })) return stored.org.id === session?.orgId;
        return false;
      },
      delete: async ({ session, item, context }) => {
        if (isGod({ session })) return true;
        if (!isOrgAdmin({ session })) return false;
        if (!item?.id) return false;
        const sudo = context.sudo();
        const stored = (await sudo.query.Source.findOne({
          where: { id: String(item.id) },
          query: 'org { id }'
        })) as { org?: { id: string } | null } | null;
        return stored?.org?.id === session?.orgId;
      }
    }
  },
  hooks: {
    resolveInput: {
      create: async ({ resolvedData, context }) => {
        if (!resolvedData.externalId) resolvedData.externalId = deriveExternalId(resolvedData.type, resolvedData.url);

        if (resolvedData.org) return resolvedData;
        const orgId = context.session?.orgId as string | undefined;
        if (!orgId) return resolvedData;
        return { ...resolvedData, org: { connect: { id: orgId } } };
      },
      update: async ({ resolvedData, item }) => {
        const type = (resolvedData.type as SourceType | undefined) ?? (item?.type as SourceType | undefined);
        const url = (resolvedData.url as string | undefined) ?? (item?.url as string | undefined);
        const externalId = deriveExternalId(type, url);
        if (externalId && !resolvedData.externalId) resolvedData.externalId = externalId;
        return resolvedData;
      }
    },
    afterOperation: {
      create: async ({ context, item }) => {
        if (!item?.id) return;

        await context.graphql.run({
          query: `mutation TriggerSourceImport($sourceId: ID!) { triggerSourceImport(sourceId: $sourceId) { id } }`,
          variables: { sourceId: item.id }
        });
      },
      delete: async ({ context, item }: { context: KeystoneContext; item?: { id?: string } }) => {
        if (!item?.id) return;
        const sudo = context.sudo();
        await sudo.prisma.transcriptSegment.deleteMany({
          where: { transcript: { source: { id: item.id } } }
        });
        await sudo.prisma.transcript.deleteMany({
          where: { source: { id: item.id } }
        });
      }
    }
  }
});
