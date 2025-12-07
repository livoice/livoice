import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
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
    name: text({ validation: { isRequired: true } }),
    description: text({ ui: { displayMode: 'textarea' }, validation: { isRequired: false } }),
    org: relationship({ ref: 'Organization.projects', many: false }),
    users: relationship({ ref: 'User.project', many: true }),
    transcripts: relationship({ ref: 'Transcript.project', many: true }),
    chats: relationship({ ref: 'Chat.project', many: true })
  },
  ui: {
    labelField: 'name'
  },
  access: {
    operation: {
      query: ({ session }) => isAuthenticated({ session }),
      create: canEditOrgData,
      update: canEditProjectData,
      delete: canEditOrgData
    },
    item: {
      update: async ({ session, item, context }) => {
        if (isGod({ session })) return true;
        if (!item?.id) return false;

        const targetProjectId = String(item.id);
        const sudoContext = context.sudo();
        const project = (await sudoContext.query.Project.findOne({
          where: { id: targetProjectId },
          query: 'id org { id }'
        })) as { id: string; org: { id: string } | null } | null;

        if (!project) return false;

        if (isOrgAdmin({ session })) {
          if (!session?.orgId) return false;
          return project.org?.id ? String(project.org.id) === String(session.orgId) : false;
        }

        if (isProjectAdmin({ session })) {
          if (!session?.projectId) return false;
          return targetProjectId === String(session.projectId);
        }

        return false;
      },
      delete: async ({ session, item, context }) => {
        if (isGod({ session })) return true;
        if (!isOrgAdmin({ session })) return false;
        if (!session?.orgId || !item?.id) return false;

        const sudoContext = context.sudo();
        const project = (await sudoContext.query.Project.findOne({
          where: { id: String(item.id) },
          query: 'id org { id }'
        })) as { org: { id: string } | null } | null;

        if (!project?.org?.id) return false;
        return String(project.org.id) === String(session.orgId);
      }
    },
    filter: {
      query: async ({ session }) => {
        if (!isAuthenticated({ session })) return false;
        if (isGod({ session })) return true;
        if (isOrgAdmin({ session })) return filterByUserOrg({ session });
        if (!session?.projectId) return false;
        return { id: { equals: session.projectId } };
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
    },
    validateDelete: async ({ item, context, addValidationError }) => {
      if (!item?.id) return;

      const sudoContext = context.sudo();
      const projectId = String(item.id);

      const project = (await sudoContext.query.Project.findOne({
        where: { id: projectId },
        query: 'id org { id }'
      })) as { org: { id: string } | null } | null;

      if (!project?.org?.id) {
        addValidationError('Project is missing organization context.');
        return;
      }

      const [orgProjectCount, userCount] = await Promise.all([
        sudoContext.db.Project.count({ where: { org: { id: { equals: project.org.id } } } }),
        sudoContext.db.User.count({ where: { project: { id: { equals: projectId } } } })
      ]);

      if (userCount > 0) {
        addValidationError('You cannot delete a project that still has users.');
        return;
      }

      if (orgProjectCount <= 1) {
        addValidationError('Each organization must have at least one project.');
      }
    }
  }
}) satisfies Lists['Project'];
