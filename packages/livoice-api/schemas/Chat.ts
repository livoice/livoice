import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { json, relationship, text, timestamp } from '@keystone-6/core/fields';
import { filterByUserOrg, isAuthenticated, isGod, isOrgAdmin } from '../domains/auth/userRole';

export default list({
  fields: {
    title: text({ validation: { isRequired: true }, defaultValue: 'AI chat' }),
    systemPrompt: text({ ui: { displayMode: 'textarea' } }),
    config: json(),
    user: relationship({ ref: 'User.chats', many: false }),
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
      update: isAuthenticated,
      delete: isOrgAdmin
    },
    item: {
      update: async ({ session, item }) => {
        if (isGod({ session })) return true;
        if (isOrgAdmin({ session })) return true;

        // Allow the chat owner to update their own chat
        if (item.userId === session?.id) return true;

        return false;
      }
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
