import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { integer, relationship, text, timestamp } from '@keystone-6/core/fields';
import { isAuthenticated } from '../auth';

export default list({
  fields: {
    title: text({ validation: { isRequired: true } }),
    description: text({ ui: { displayMode: 'textarea' } }),
    speakers: relationship({ ref: 'Speaker.interviews', many: true }),
    originalVideoUrl: text(),
    duration: integer(),
    recordedAt: timestamp(),
    sourceId: text(),
    sourceTranscriptId: text(),
    clips: relationship({ ref: 'Clip.interview', many: true }),
    quotes: relationship({ ref: 'Quote.interview', many: true }),
    blogPosts: relationship({ ref: 'BlogPost.interview', many: true }),
    socialPosts: relationship({ ref: 'SocialPost.interview', many: true }),
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
      initialColumns: ['title', 'recordedAt', 'duration']
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
}) satisfies Lists['Interview'];
