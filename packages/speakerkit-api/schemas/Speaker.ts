import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { relationship, text, timestamp } from '@keystone-6/core/fields';
import { isAuthenticated } from '../auth';

export default list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    bio: text({ ui: { displayMode: 'textarea' } }),
    avatarUrl: text(),
    linkedinUrl: text(),
    siteUrl: text(),
    interviews: relationship({ ref: 'Interview.speakers', many: true }),
    clips: relationship({ ref: 'Clip.speaker', many: true }),
    quotes: relationship({ ref: 'Quote.speaker', many: true }),
    blogPosts: relationship({ ref: 'BlogPost.speaker', many: true }),
    socialPosts: relationship({ ref: 'SocialPost.speaker', many: true }),
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
    labelField: 'name',
    listView: {
      initialColumns: ['name', 'linkedinUrl', 'siteUrl']
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
}) satisfies Lists['Speaker'];
