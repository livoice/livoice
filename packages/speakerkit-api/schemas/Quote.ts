import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { integer, relationship, text, timestamp } from '@keystone-6/core/fields';
import { isAuthenticated } from '../auth';

export default list({
  fields: {
    text: text({ validation: { isRequired: true }, ui: { displayMode: 'textarea' } }),
    attribution: text(),
    interview: relationship({ ref: 'Interview.quotes', many: false }),
    speaker: relationship({ ref: 'Speaker.quotes', many: false }),
    timestampInVideo: integer(),
    sortOrder: integer({ defaultValue: 0 }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
      ui: { createView: { fieldMode: 'hidden' }, itemView: { fieldMode: 'read' } }
    }),
    updatedAt: timestamp({
      db: { updatedAt: true },
      ui: { createView: { fieldMode: 'hidden' }, itemView: { fieldMode: 'read' } }
    })
  },
  ui: {
    labelField: 'text',
    listView: {
      initialColumns: ['attribution', 'timestampInVideo', 'sortOrder']
    }
  },
  access: {
    operation: {
      query: isAuthenticated,
      create: isAuthenticated,
      update: isAuthenticated,
      delete: isAuthenticated
    }
  }
}) satisfies Lists['Quote'];
