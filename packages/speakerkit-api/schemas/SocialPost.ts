import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { integer, relationship, select, text, timestamp } from '@keystone-6/core/fields';
import { isAuthenticated } from '../auth';

const platformOptions = [
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Twitter/X', value: 'twitter' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' }
];

export default list({
  fields: {
    platform: select({
      type: 'enum',
      options: platformOptions,
      defaultValue: 'linkedin'
    }),
    content: text({ ui: { displayMode: 'textarea' } }),
    imageUrl: text(),
    interview: relationship({ ref: 'Interview.socialPosts', many: false }),
    speaker: relationship({ ref: 'Speaker.socialPosts', many: false }),
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
    labelField: 'platform',
    listView: {
      initialColumns: ['platform', 'sortOrder']
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
}) satisfies Lists['SocialPost'];
