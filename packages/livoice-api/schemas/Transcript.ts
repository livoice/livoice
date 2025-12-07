import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { relationship, text, timestamp } from '@keystone-6/core/fields';
import {
  canEditOrgData,
  canEditProjectData,
  filterByUserOrg,
  isAuthenticated,
  isGod,
  isOrgAdmin,
  isProjectAdmin
} from '../domains/auth/userRole';

export default list({
  fields: {
    title: text({ validation: { isRequired: true } }),
    intervieweeName: text(),
    sourceUrl: text({ ui: { description: 'Optional source or recording URL' } }),
    language: text(),
    notes: text({ ui: { displayMode: 'textarea' } }),
    project: relationship({ ref: 'Project.transcripts', many: false }),
    org: relationship({ ref: 'Organization.transcripts', many: false }),
    segments: relationship({ ref: 'TranscriptSegment.transcript', many: true }),
    chats: relationship({ ref: 'Chat.transcript', many: true }),
    createdAt: timestamp({ defaultValue: { kind: 'now' }, ui: { createView: { fieldMode: 'hidden' } } }),
    updatedAt: timestamp({ db: { updatedAt: true }, ui: { createView: { fieldMode: 'hidden' } } })
  },
  ui: {
    labelField: 'title'
  },
  access: {
    operation: {
      query: ({ session }) => isAuthenticated({ session }),
      create: canEditProjectData,
      update: canEditProjectData,
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
          query: 'id project { id org { id } }'
        })) as { project?: { id: string; org?: { id: string } | null } | null } | null;
        if (!stored?.project?.id || !stored.project.org?.id) return false;

        if (isOrgAdmin({ session })) {
          return stored.project.org.id === session.orgId;
        }

        if (isProjectAdmin({ session })) {
          return stored.project.id === session.projectId && stored.project.org.id === session.orgId;
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
          query: 'project { org { id } }'
        })) as { project?: { org?: { id: string } | null } | null } | null;
        return stored?.project?.org?.id === session.orgId;
      }
    }
  },
  hooks: {
    resolveInput: {
      create: async ({ resolvedData, context }) => {
        if (resolvedData.org) return resolvedData;
        const orgId = context.session?.orgId as string | undefined;
        if (!orgId) return resolvedData;
        return {
          ...resolvedData,
          org: { connect: { id: orgId } }
        };
      }
    }
  }
}) satisfies Lists['Transcript'];

