import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { checkbox, integer, relationship, text } from '@keystone-6/core/fields';
import { canEditOrgData, isAuthenticated, isGod, isOrgAdmin } from '../domains/auth/userRole';

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
      create: canEditOrgData,
      update: canEditOrgData,
      delete: canEditOrgData
    },
    filter: {
      query: async ({ session }) => {
        if (!isAuthenticated({ session })) return false;
        if (isGod({ session })) return true;
        if (!session?.orgId) return false;

        // Org-level visibility
        const orgFilter = {
          transcript: { org: { id: { equals: session.orgId } } }
        };

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
          query: 'transcript { org { id } }'
        })) as { transcript?: { org?: { id: string } | null } | null } | null;
        if (!record?.transcript?.org?.id) return false;
        return record.transcript.org.id === session.orgId;
      },
      delete: async ({ session, item, context }) => {
        if (isGod({ session })) return true;
        if (!isOrgAdmin({ session })) return false;
        if (!item?.id) return false;
        const sudoContext = context.sudo();
        const record = (await sudoContext.query.TranscriptSegment.findOne({
          where: { id: String(item.id) },
          query: 'transcript { org { id } }'
        })) as { transcript?: { org?: { id: string } | null } | null } | null;
        return record?.transcript?.org?.id === session.orgId;
      }
    }
  },
  hooks: {
    afterOperation: undefined
  }
}) satisfies Lists['TranscriptSegment'];
