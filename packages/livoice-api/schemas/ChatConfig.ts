import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { json, relationship, text, timestamp } from '@keystone-6/core/fields';
import { isAuthenticated, isOrgAdminOrAbove } from '../domains/auth/userRole';

export default list({
  fields: {
    name: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    notes: text({ ui: { displayMode: 'textarea' } }),
    systemPrompt: text({ ui: { displayMode: 'textarea' } }),
    openai: json({
      defaultValue: {
        model: 'gpt-4o-mini',
        temperature: 0.25,
        maxOutputTokens: 700
      }
    }),
    context: json({
      defaultValue: {
        maxInputTokens: 16000,
        reservedTokens: 1500,
        historyTokenBudget: 4000
      }
    }),
    segments: json({
      defaultValue: {
        tokenBudget: 4000,
        maxCount: 30
      }
    }),
    chats: relationship({ ref: 'Chat.chatConfig', many: true }),
    createdAt: timestamp({ defaultValue: { kind: 'now' }, ui: { createView: { fieldMode: 'hidden' } } }),
    updatedAt: timestamp({ db: { updatedAt: true }, ui: { createView: { fieldMode: 'hidden' } } })
  },
  access: {
    operation: {
      query: isAuthenticated,
      create: isOrgAdminOrAbove,
      update: isOrgAdminOrAbove,
      delete: isOrgAdminOrAbove
    }
  }
}) satisfies Lists['ChatConfig'];

