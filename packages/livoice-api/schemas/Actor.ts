import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { json, relationship, select, text, timestamp } from '@keystone-6/core/fields';
import { ACTOR_TYPES } from '../domains/actors/constants';
import { isAuthenticated, isGod } from '../domains/auth/userRole';

export default list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    type: select({
      type: 'enum',
      options: ACTOR_TYPES.map(({ label, value }) => ({ label, value })),
      validation: { isRequired: true }
    }),
    description: text({ ui: { displayMode: 'textarea' } }),
    aliases: json(),
    externalIds: json(),
    metadata: json(),
    imageUrl: text(),
    mentions: relationship({ ref: 'ActorMention.actor', many: true }),
    relatesTo: relationship({ ref: 'ActorLink.fromActor', many: true }),
    relatedFrom: relationship({ ref: 'ActorLink.toActor', many: true }),
    speakerSources: relationship({ ref: 'Source.speakerActors', many: true }),
    speakerTranscripts: relationship({ ref: 'Transcript.speakerActors', many: true }),
    createdAt: timestamp({ defaultValue: { kind: 'now' }, ui: { createView: { fieldMode: 'hidden' } } }),
    updatedAt: timestamp({ db: { updatedAt: true }, ui: { createView: { fieldMode: 'hidden' } } })
  },
  ui: {
    labelField: 'name',
    listView: {
      initialColumns: ['name', 'type']
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
  },
  hooks: {}
}) satisfies Lists['Actor'];
