import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { relationship, select, text, timestamp } from '@keystone-6/core/fields';
import { filterByUserOrg, isAuthenticated, isGod, isOrgAdmin } from '../domains/auth/userRole';

export default list({
  fields: {
    chat: relationship({ ref: 'Chat.messages', many: false }),
    role: select({
      options: [
        { label: 'User', value: 'user' },
        { label: 'Assistant', value: 'assistant' }
      ],
      validation: { isRequired: true },
      defaultValue: 'user'
    }),
    content: text({ ui: { displayMode: 'textarea' }, validation: { isRequired: true } }),
    segments: relationship({ ref: 'TranscriptSegment.chatMessages', many: true }),
    createdAt: timestamp({ defaultValue: { kind: 'now' }, ui: { createView: { fieldMode: 'hidden' } } })
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
}) satisfies Lists['ChatMessage'];

