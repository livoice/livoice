import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { decimal, integer, relationship, select, text, timestamp } from '@keystone-6/core/fields';
import { isAuthenticated } from '../auth';

const platformOptions = [
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'YouTube Shorts', value: 'youtube_shorts' },
  { label: 'Instagram Reels', value: 'instagram_reels' },
  { label: 'TikTok', value: 'tiktok' }
];

export default list({
  fields: {
    title: text({ validation: { isRequired: true } }),
    description: text({ ui: { displayMode: 'textarea' } }),
    interview: relationship({ ref: 'Interview.clips', many: false }),
    speaker: relationship({ ref: 'Speaker.clips', many: false }),
    startTime: integer(),
    endTime: integer(),
    videoUrl: text(),
    platform: select({
      type: 'enum',
      options: platformOptions,
      defaultValue: 'linkedin'
    }),
    sortOrder: integer({ defaultValue: 0 }),

    reachScore: decimal(),
    reachReasoning: text({ ui: { displayMode: 'textarea' } }),
    provocationScore: decimal(),
    provocationReasoning: text({ ui: { displayMode: 'textarea' } }),
    valueScore: decimal(),
    valueReasoning: text({ ui: { displayMode: 'textarea' } }),
    storytellingScore: decimal(),
    storytellingReasoning: text({ ui: { displayMode: 'textarea' } }),

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
      initialColumns: ['title', 'platform', 'sortOrder', 'reachScore', 'valueScore']
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
}) satisfies Lists['Clip'];
