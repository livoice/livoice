import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { checkbox, float, json, relationship, select, text, timestamp } from '@keystone-6/core/fields';
import { isAuthenticated, isGod } from '../domains/auth/userRole';

const DETECTION_SOURCE_OPTIONS = [
  { label: 'AI', value: 'ai' },
  { label: 'YouTube', value: 'youtube' }
] as const;

export default list({
  fields: {
    fromActor: relationship({ ref: 'Actor.relatesTo', many: false }),
    toActor: relationship({ ref: 'Actor.relatedFrom', many: false }),
    linkType: text({ validation: { isRequired: true } }),
    role: text(),
    metadata: json(),
    confidence: float(),
    detectionSource: select({ type: 'enum', options: DETECTION_SOURCE_OPTIONS }),
    verified: checkbox({ defaultValue: false }),
    createdAt: timestamp({ defaultValue: { kind: 'now' }, ui: { createView: { fieldMode: 'hidden' } } })
  },
  ui: {
    labelField: 'linkType',
    listView: {
      initialColumns: ['fromActor', 'toActor', 'linkType', 'confidence']
    }
  },
  access: {
    operation: {
      query: ({ session }) => isAuthenticated({ session }),
      create: isGod,
      update: isGod,
      delete: isGod
    },
    filter: {
      query: ({ session }) => isAuthenticated({ session })
    },
    item: {
      update: ({ session }) => isGod({ session }),
      delete: ({ session }) => isGod({ session })
    }
  }
}) satisfies Lists['ActorLink'];
