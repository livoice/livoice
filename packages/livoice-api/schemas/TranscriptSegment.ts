import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { checkbox, integer, relationship, text } from '@keystone-6/core/fields';
import { Prisma } from '@prisma/client';
import { canEditProjectData, isAuthenticated, isGod, isOrgAdmin } from '../domains/auth/userRole';
import { createEmbeddings } from '../lib/openai';
import { formatVectorLiteral } from '../lib/pgvector';

export default list({
  fields: {
    transcript: relationship({ ref: 'Transcript.segments', many: false }),
    index: integer(),
    startMs: integer(),
    endMs: integer(),
    durationMs: integer(),
    text: text({ ui: { displayMode: 'textarea' } }),
    speaker: text(),
    isMetadata: checkbox({ defaultValue: false }),
    chatMessages: relationship({ ref: 'ChatMessage.segments', many: true })
  },
  db: {
    extendPrismaSchema: schema => {
      const schemaArray = schema.split('\n');
      const additions = [
        '  embedding Unsupported("vector(1536)")?',
        '  @@index([embedding], map: "TranscriptSegment_embedding_idx")'
      ];
      return [...schemaArray.slice(0, -1), ...additions, schemaArray.pop()].join('\n');
    }
  },
  access: {
    operation: {
      query: ({ session }) => isAuthenticated({ session }),
      create: canEditProjectData,
      update: canEditProjectData,
      delete: canEditProjectData
    },
    filter: {
      query: async ({ session }) => {
        if (!isAuthenticated({ session })) return false;
        if (isGod({ session })) return true;
        if (!session?.orgId) return false;

        // Org-level visibility
        const orgFilter = {
          transcript: { project: { org: { id: { equals: session.orgId } } } }
        };

        // Project-scoped visibility (for project admins with a projectId)
        if (session.projectId) {
          return {
            OR: [orgFilter, { transcript: { project: { id: { equals: session.projectId } } } }]
          };
        }

        return orgFilter;
      }
    },
    item: {
      update: async ({ session, item, context }) => {
        if (isGod({ session })) return true;
        if (!item?.id) return false;

        const sudoContext = context.sudo();
        const record = (await sudoContext.query.TranscriptSegment.findOne({
          where: { id: String(item.id) },
          query: 'transcript { project { org { id } } }'
        })) as { transcript?: { project?: { org?: { id: string } | null } | null } | null } | null;
        if (!record?.transcript?.project?.org?.id) return false;
        return record.transcript.project.org.id === session.orgId;
      },
      delete: async ({ session, item, context }) => {
        if (isGod({ session })) return true;
        if (!isOrgAdmin({ session })) return false;
        if (!item?.id) return false;
        const sudoContext = context.sudo();
        const record = (await sudoContext.query.TranscriptSegment.findOne({
          where: { id: String(item.id) },
          query: 'transcript { project { org { id } } }'
        })) as { transcript?: { project?: { org?: { id: string } | null } | null } | null } | null;
        return record?.transcript?.project?.org?.id === session.orgId;
      }
    }
  },
  hooks: {
    afterOperation: async ({ operation, item, resolvedData, context }) => {
      const shouldEmbed = operation === 'create' || (operation === 'update' && resolvedData?.text !== undefined);
      if (!shouldEmbed) return;
      if (!item?.id || !item?.text) return;

      try {
        const embedding = formatVectorLiteral((await createEmbeddings([item.text]))[0]);
        if (!embedding) return;

        await context.sudo().prisma.$executeRaw`
          UPDATE "TranscriptSegment" SET "embedding" = ${Prisma.raw(embedding)} WHERE id = ${item.id}
        `;
      } catch (error) {
        console.error('Failed to generate embedding for TranscriptSegment', error);
      }
    }
  }
}) satisfies Lists['TranscriptSegment'];
