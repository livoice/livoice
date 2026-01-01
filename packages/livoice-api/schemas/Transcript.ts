import { type Lists } from '.keystone/types';
import { graphql, list } from '@keystone-6/core';
import { integer, json, relationship, select, text, timestamp, virtual } from '@keystone-6/core/fields';
import { canEditOrgData, filterByUserOrg, isAuthenticated, isGod, isOrgAdmin } from '../domains/auth/userRole';
import { SegmentEmbeddingProgressGraphqlType } from './extensions/SourceImportProgress';
import { resolveSegmentEmbeddingProgress } from './resolvers/transcriptResolvers';

export default list({
  fields: {
    title: text({ validation: { isRequired: true } }),
    sourceUrl: text({ ui: { description: 'Optional source or recording URL' } }),
    notes: text({ ui: { displayMode: 'textarea' } }),
    externalId: text(),
    publishedAt: timestamp(),
    duration: integer(),
    thumbnailUrl: text(),
    description: text({ ui: { displayMode: 'textarea' } }),
    chapters: json(),
    rawSrt: text({ ui: { displayMode: 'textarea' } }),
    importStatus: select({
      type: 'enum',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Fetching', value: 'fetching' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
        { label: 'Skipped', value: 'skipped' }
      ],
      defaultValue: 'pending'
    }),
    importAttempts: integer({ defaultValue: 0 }),
    importError: text(),
    importAt: timestamp(),
    analysisStatus: select({
      type: 'enum',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
        { label: 'Skipped', value: 'skipped' }
      ],
      defaultValue: 'pending'
    }),
    analysisAttempts: integer({ defaultValue: 0 }),
    analysisError: text(),
    analysisAt: timestamp(),

    embeddingStatus: select({
      type: 'enum',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' }
      ],
      defaultValue: 'pending'
    }),
    embeddingAttempts: integer({ defaultValue: 0 }),
    embeddingError: text(),
    embeddingAt: timestamp(),

    source: relationship({ ref: 'Source.transcripts', many: false }),
    org: relationship({ ref: 'Organization.transcripts', many: false }),
    segments: relationship({ ref: 'TranscriptSegment.transcript', many: true }),
    speakerActors: relationship({ ref: 'Actor.speakerTranscripts', many: true }),
    segmentEmbeddingProgress: virtual({
      ui: {
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' }
      },
      field: graphql.field({
        type: SegmentEmbeddingProgressGraphqlType,
        resolve: resolveSegmentEmbeddingProgress
      })
    }),
    createdAt: timestamp({ defaultValue: { kind: 'now' }, ui: { createView: { fieldMode: 'hidden' } } }),
    updatedAt: timestamp({ db: { updatedAt: true }, ui: { createView: { fieldMode: 'hidden' } } })
  },
  ui: {
    labelField: 'title',
    listView: {
      initialColumns: ['title', 'importStatus', 'embeddingStatus', 'importAttempts', 'embeddingAttempts']
    }
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

        const sudoContext = context.sudo();
        const stored = (await sudoContext.query.Transcript.findOne({
          where: { id: String(item.id) },
          query: 'id source { org { id } }'
        })) as { source?: { org?: { id: string } | null } | null } | null;
        if (!stored?.source?.org?.id) return false;

        if (isOrgAdmin({ session })) {
          return stored.source.org.id === session.orgId;
        }

        return false;
      },
      delete: async ({ session, item, context }) => {
        if (isGod({ session })) return true;
        if (!isOrgAdmin({ session })) return false;
        if (!session?.orgId || !item?.id) return false;

        const sudoContext = context.sudo();
        const stored = (await sudoContext.query.Transcript.findOne({
          where: { id: String(item.id) },
          query: 'source { org { id } }'
        })) as { source?: { org?: { id: string } | null } | null } | null;
        return stored?.source?.org?.id === session.orgId;
      }
    }
  },
  hooks: {
    resolveInput: {
      create: async ({ resolvedData, context }) => {
        if (resolvedData.org) return resolvedData;
        const sourceId = resolvedData.source?.connect?.id as string | undefined;
        if (!sourceId) {
          const orgId = context.session?.orgId as string | undefined;
          if (!orgId) return resolvedData;
          return { ...resolvedData, org: { connect: { id: orgId } } };
        }

        const sudoContext = context.sudo();
        const source = (await sudoContext.query.Source.findOne({
          where: { id: sourceId },
          query: 'org { id }'
        })) as { org?: { id: string } | null } | null;

        if (!source?.org?.id) return resolvedData;
        return { ...resolvedData, org: { connect: { id: source.org.id } } };
      },
      update: async ({ resolvedData, context, item }) => {
        const mutableResolvedData = resolvedData as Record<string, unknown>;
        const resolvedImportStatus = (resolvedData as Record<string, unknown>).importStatus as string | undefined;
        const resolvedAnalysisStatus = (resolvedData as Record<string, unknown>).analysisStatus as string | undefined;
        if (resolvedImportStatus === 'pending') mutableResolvedData.importAttempts = 0;
        if (resolvedAnalysisStatus === 'pending') mutableResolvedData.analysisAttempts = 0;

        if (!item?.id) return resolvedData;

        const sudoContext = context.sudo();
        const current = (await sudoContext.query.Transcript.findOne({
          where: { id: String(item.id) },
          query: 'embeddingStatus importStatus analysisStatus'
        })) as { embeddingStatus?: string; importStatus?: string; analysisStatus?: string } | null;

        if (current) {
          if (resolvedData.embeddingStatus !== undefined && resolvedData.embeddingStatus !== current.embeddingStatus) {
            mutableResolvedData.embeddingAt = new Date();
          }
          if (resolvedImportStatus !== undefined && resolvedImportStatus !== current.importStatus) {
            mutableResolvedData.importAt = new Date();
          }
          if (resolvedAnalysisStatus !== undefined && resolvedAnalysisStatus !== current.analysisStatus) {
            mutableResolvedData.analysisAt = new Date();
          }
        }

        return resolvedData;
      }
    },
    afterOperation: {
      delete: async ({ context, item }) => {
        const transcriptId = (item as { id?: string } | undefined)?.id;
        if (!transcriptId) return;
        const sudoContext = context.sudo();
        await sudoContext.prisma.transcriptSegment.deleteMany({
          where: { transcriptId }
        });
      }
    }
  }
}) satisfies Lists['Transcript'];
