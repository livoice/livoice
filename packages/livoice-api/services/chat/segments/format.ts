import { intervalToDuration } from 'date-fns';
import type { MentionInfo, SegmentRecord, SegmentReference } from '../types';

const formatMs = (value?: number | null) => {
  if (typeof value !== 'number') return '00:00:00';
  const { hours = 0, minutes = 0, seconds = 0 } = intervalToDuration({ start: 0, end: value });
  return [hours, minutes, seconds].map(unit => unit.toString().padStart(2, '0')).join(':');
};

const formatPublishedAt = (value?: Date | string | null) => {
  if (!value) return null;
  const date = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return null;
  const month = date.toLocaleString('en', { month: 'short' });
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const formatMentionList = (mentions?: MentionInfo[]) => {
  if (!mentions?.length) return '';
  const list = mentions.map(({ name, sentiment, mentionType, type }) => {
    const sentimentText = sentiment ? ` (${sentiment})` : '';
    const typeText = type ? ` [${type}]` : '';
    return `${name}${typeText}${sentimentText}${mentionType ? ` (${mentionType})` : ''}`;
  });
  return list.length ? ` [Mentioned: ${list.join(', ')}]` : '';
};

export const buildSegmentDescription = (segment: SegmentRecord, mentions?: MentionInfo[]) => {
  const published = formatPublishedAt(segment.transcript?.publishedAt);
  const title = segment.transcript?.title ?? null;
  const header = published || title ? `[${[published, title ? `"${title}"` : null].filter(Boolean).join(' | ')}]` : '';

  const speakerName = segment.speakerActor?.name ?? segment.speaker ?? 'Speaker';
  const speakerRole = mentions?.find(({ mentionType }) => mentionType)?.mentionType;
  const speakerLabel = speakerRole ? `${speakerName} [${speakerRole}]` : speakerName;
  const timerange = `${formatMs(segment.startMs)} - ${formatMs(segment.endMs)}`;

  return [header, `${speakerLabel} (${timerange}): ${segment.text}${formatMentionList(mentions)}`]
    .filter(Boolean)
    .join('\n');
};

export const mapSegmentReference = (segment: SegmentRecord): SegmentReference => ({
  id: segment.id,
  startMs: typeof segment.startMs === 'number' ? segment.startMs : null,
  endMs: typeof segment.endMs === 'number' ? segment.endMs : null,
  text: segment.text,
  speaker: segment.speaker ?? segment.speakerActor?.name ?? undefined,
  transcriptTitle: segment.transcript?.title ?? undefined
});

