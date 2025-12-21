import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { graphql as g } from '@keystone-6/core';
import { relationship, text, timestamp, virtual } from '@keystone-6/core/fields';
import { filterByUserOrg, isAuthenticated, isGod, isOrgAdmin } from '../domains/auth/userRole';
import { getSystemPromptReplacements } from '../services/chat';

export default list({
  fields: {
    title: text({ validation: { isRequired: true }, defaultValue: 'AI chat' }),
    systemPrompt: text({ ui: { displayMode: 'textarea' } }),
    org: relationship({ ref: 'Organization.chats', many: false }),
    project: relationship({ ref: 'Project.chats', many: false }),
    messages: relationship({ ref: 'ChatMessage.chat', many: true }),
    createdAt: timestamp({ defaultValue: { kind: 'now' }, ui: { createView: { fieldMode: 'hidden' } } }),
    updatedAt: timestamp({ db: { updatedAt: true }, ui: { createView: { fieldMode: 'hidden' } } })
  },
  access: {
    operation: {
      query: isAuthenticated,
      create: isAuthenticated,
      update: isOrgAdmin,
      delete: isOrgAdmin
    },
    filter: {
      query: async ({ session }) => {
        if (!isAuthenticated({ session })) return false;
        if (isGod({ session })) return true;
        return filterByUserOrg({ session });
      }
    }
  }
}) satisfies Lists['Chat'];
