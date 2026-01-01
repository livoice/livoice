import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { checkbox, float, relationship, select, timestamp } from '@keystone-6/core/fields';
import { canEditOrgData, isAuthenticated, isGod, isOrgAdmin } from '../domains/auth/userRole';

const MENTION_TYPES = [
  { label: 'Speaker', value: 'speaker' },
  { label: 'Mentioned', value: 'mentioned' },
  { label: 'Host', value: 'host' },
  { label: 'Guest', value: 'guest' },
  { label: 'Sponsor', value: 'sponsor' },
  { label: 'Channel Owner', value: 'channel_owner' },
  { label: 'Topic', value: 'topic' }
] as const;

const SENTIMENT_OPTIONS = [
  { label: 'Positive', value: 'positive' },
  { label: 'Negative', value: 'negative' },
  { label: 'Neutral', value: 'neutral' }
] as const;

const EMOTION_OPTIONS = [
  { label: 'Neutral', value: 'neutral' },
  { label: 'Happy', value: 'happy' },
  { label: 'Excited', value: 'excited' },
  { label: 'Stressed', value: 'stressed' },
  { label: 'Frustrated', value: 'frustrated' },
  { label: 'Angry', value: 'angry' },
  { label: 'Sad', value: 'sad' },
  { label: 'Confident', value: 'confident' },
  { label: 'Uncertain', value: 'uncertain' }
] as const;

const DETECTION_SOURCE_OPTIONS = [
  { label: 'AI', value: 'ai' },
  { label: 'YouTube', value: 'youtube' }
] as const;

export default list({
  fields: {
    actor: relationship({ ref: 'Actor.mentions', many: false }),
    segment: relationship({ ref: 'TranscriptSegment', many: false }),
    transcript: relationship({ ref: 'Transcript', many: false }),
    source: relationship({ ref: 'Source', many: false }),
    mentionType: select({ type: 'enum', options: MENTION_TYPES, validation: { isRequired: true } }),
    sentiment: select({ type: 'enum', options: SENTIMENT_OPTIONS }),
    emotion: select({ type: 'enum', options: EMOTION_OPTIONS }),
    confidence: float(),
    detectionSource: select({ type: 'enum', options: DETECTION_SOURCE_OPTIONS }),
    verified: checkbox({ defaultValue: false }),
    createdAt: timestamp({ defaultValue: { kind: 'now' }, ui: { createView: { fieldMode: 'hidden' } } })
  },
  ui: {
    labelField: 'mentionType',
    listView: {
      initialColumns: ['actor', 'mentionType', 'transcript', 'segment', 'detectionSource']
    }
  },
  access: {
    operation: {
      query: ({ session }) => isAuthenticated({ session }),
      create: canEditOrgData,
      update: canEditOrgData,
      delete: canEditOrgData
    },
    filter: {
      query: async ({ session }) => {
        if (!isAuthenticated({ session })) return false;
        if (isGod({ session })) return true;
        if (!session?.orgId) return false;
        return {
          transcript: { org: { id: { equals: session.orgId } } }
        };
      }
    },
    item: {
      update: async ({ session, item, context }) => {
        if (isGod({ session })) return true;
        if (!session?.orgId || !item?.id) return false;

        const sudo = context.sudo();
        const stored = (await sudo.query.ActorMention.findOne({
          where: { id: String(item.id) },
          query: 'transcript { org { id } }'
        })) as { transcript?: { org?: { id?: string | null } | null } | null } | null;

        if (!stored?.transcript?.org?.id) return false;
        if (isOrgAdmin({ session })) return stored.transcript.org.id === session.orgId;
        return false;
      },
      delete: async ({ session, item, context }) => {
        if (isGod({ session })) return true;
        if (!isOrgAdmin({ session })) return false;
        if (!session?.orgId || !item?.id) return false;

        const sudo = context.sudo();
        const stored = (await sudo.query.ActorMention.findOne({
          where: { id: String(item.id) },
          query: 'transcript { org { id } }'
        })) as { transcript?: { org?: { id?: string | null } | null } | null } | null;

        return stored?.transcript?.org?.id === session.orgId;
      }
    }
  }
}) satisfies Lists['ActorMention'];
