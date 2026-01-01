export type SpeakerRange = [startMs: number, endMs: number];

export type Speaker = {
  name: string;
  role: 'host' | 'guest' | 'interviewer' | 'panelist' | 'unknown';
  ranges: SpeakerRange[];
};

export type SpeakerMap = {
  speakers: Speaker[];
};

export type ActorType = 'person' | 'organization' | 'product' | 'event' | 'topic' | 'location' | 'brand' | 'book';

export type ExtractedActor = {
  name: string;
  type: ActorType;
  description?: string;
  aliases?: string[];
};

export const SEED_LINK_TYPES = [
  'employment',
  'former_employment',
  'founder',
  'co_founder',
  'board_member',
  'advisor',
  'consultant',
  'mentor',
  'mentee',
  'investor',
  'investee',
  'competitor',
  'partner',
  'customer',
  'supplier',
  'acquirer',
  'acquired_by',
  'parent',
  'subsidiary',
  'licensee',
  'licensor',
  'distributor',
  'franchisee',
  'family',
  'friend',
  'colleague',
  'classmate',
  'spokesperson',
  'endorser',
  'ambassador',
  'interviewer',
  'interviewee',
  'co_host',
  'affiliated'
] as const;

export type ExtractedRelationship = {
  fromActorName: string;
  toActorName: string;
  linkType: string;
  role?: string;
  confidence?: number;
};

export type MentionType = 'speaker' | 'mentioned' | 'host' | 'guest' | 'sponsor' | 'channel_owner' | 'topic';

export type SentimentType = 'positive' | 'negative' | 'neutral';

export type EmotionType =
  | 'neutral'
  | 'happy'
  | 'excited'
  | 'stressed'
  | 'frustrated'
  | 'angry'
  | 'sad'
  | 'confident'
  | 'uncertain';

export type ExtractedMention = {
  segmentIndex: number;
  actorName: string;
  mentionType: MentionType;
  sentiment?: SentimentType;
  emotion?: EmotionType;
  confidence?: number;
};

export type ActorExtractionResult = {
  actors: ExtractedActor[];
  relationships: ExtractedRelationship[];
};

export type MentionAttributionResult = {
  mentions: ExtractedMention[];
};
