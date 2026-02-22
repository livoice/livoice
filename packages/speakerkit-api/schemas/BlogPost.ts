import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { integer, relationship, text, timestamp } from '@keystone-6/core/fields';
import { isAuthenticated } from '../auth';

export default list({
  fields: {
    title: text({ validation: { isRequired: true } }),
    imageUrl: text(),
    shortDescription: text({ ui: { displayMode: 'textarea' } }),
    content: text({ ui: { displayMode: 'textarea' } }),
    interview: relationship({ ref: 'Interview.blogPosts', many: false }),
    speaker: relationship({ ref: 'Speaker.blogPosts', many: false }),
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
    labelField: 'title',
    listView: {
      initialColumns: ['title', 'sortOrder']
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
}) satisfies Lists['BlogPost'];
