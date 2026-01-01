import SrtParser from 'srt-parser-2';
import type { SpeakerMap, SpeakerRange } from './analysis/types';

export type ParsedSegment = {
  index: number;
  startMs: number;
  endMs: number;
  durationMs: number;
  text: string;
  speaker?: string;
  isMetadata: boolean;
  isSpeakerChange: boolean;
};

const parser = new SrtParser();
const SENTENCE_END_RE = /[.!?…]["”’]?$/;
const MAX_SEGMENT_CHARS = 1000;
const MAX_SEGMENT_DURATION_MS = 60_000 * 1.5;
const MAX_GAP_MS = 1_500;

const toMilliseconds = (value: string): number => {
  const match = value.match(/(?<hours>\d{2}):(?<minutes>\d{2}):(?<seconds>\d{2})(?<separator>[,\.])(?<ms>\d{1,3})/);
  if (!match || !match.groups) throw new Error(`Invalid timestamp: ${value}`);
  const { hours, minutes, seconds, ms } = match.groups;
  const milliseconds = ms.padEnd(3, '0').slice(0, 3);
  return Number(hours) * 3_600_000 + Number(minutes) * 60_000 + Number(seconds) * 1_000 + Number(milliseconds);
};

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim();

const stripSpeakerMarker = (value: string) => value.replace(/^>+\s*/, '');

const extractSpeaker = (value: string) => {
  const match = value.match(/^([A-Za-z0-9 ]+):\s*(.+)$/);
  if (!match) return { speaker: undefined as string | undefined, text: value };
  return { speaker: match[1], text: match[2] };
};

const parseSrt = (srt: string): ParsedSegment[] =>
  parser
    .fromSrt(srt)
    .map(
      (
        cue: { id?: string | number; startTime: string; endTime: string; text: string },
        index: number
      ): ParsedSegment | null => {
        const startMs = toMilliseconds(cue.startTime);
        const endMs = toMilliseconds(cue.endTime);
        if (endMs < startMs)
          throw new Error(
            `Segment end must be greater than start: got ${endMs} < ${startMs} ( ${cue.startTime} -> ${cue.endTime})`
          );

        const joinedText = normalizeWhitespace(cue.text.replace(/\n+/g, ' '));
        if (!joinedText) return null;

        const isSpeakerChange = /^>+/.test(joinedText);
        const withoutMarker = isSpeakerChange ? stripSpeakerMarker(joinedText) : joinedText;
        const { speaker, text } = extractSpeaker(withoutMarker);
        const isMetadata = /^\[.*\]$/.test(text);

        return {
          index: Number.parseInt(String(cue.id ?? index + 1), 10) || index + 1,
          startMs,
          endMs,
          durationMs: endMs - startMs,
          text,
          speaker,
          isMetadata,
          isSpeakerChange
        };
      }
    )
    .filter((segment: ParsedSegment | null): segment is ParsedSegment => Boolean(segment))
    .map((segment: ParsedSegment, idx: number) => ({ ...segment, index: idx + 1 }))
    .sort((a, b) => a.startMs - b.startMs || a.index - b.index);

const hasSentenceBoundary = (text: string) => SENTENCE_END_RE.test(text.trim());

const mergeSegmentsBySentence = (segments: ParsedSegment[]): ParsedSegment[] => {
  if (!segments.length) return [];

  const { merged, buffer } = segments.reduce(
    (state, segment) => {
      const { merged: accumulated, buffer: current } = state;
      if (!current) return { merged: accumulated, buffer: { ...segment } };

      const nonSequential = segment.startMs < current.startMs;
      const hasGap = segment.startMs - current.endMs > MAX_GAP_MS;

      const speakerChanged =
        segment.isSpeakerChange || (current.speaker && segment.speaker && current.speaker !== segment.speaker);

      const combinedText = `${current.text} ${segment.text}`.trim();
      const combinedDuration = segment.endMs - current.startMs;
      const combinedLength = combinedText.length;

      const shouldFlush =
        current.isMetadata ||
        segment.isMetadata ||
        speakerChanged ||
        nonSequential ||
        hasGap ||
        combinedLength > MAX_SEGMENT_CHARS ||
        combinedDuration > MAX_SEGMENT_DURATION_MS ||
        hasSentenceBoundary(current.text);

      if (shouldFlush) return { merged: [...accumulated, current], buffer: { ...segment } };

      return {
        merged: accumulated,
        buffer: {
          ...current,
          endMs: segment.endMs,
          durationMs: segment.endMs - current.startMs,
          text: combinedText,
          speaker: current.speaker ?? segment.speaker,
          isMetadata: false,
          isSpeakerChange: current.isSpeakerChange || segment.isSpeakerChange
        }
      };
    },
    { merged: [] as ParsedSegment[], buffer: null as ParsedSegment | null }
  );

  const finalMerged = buffer ? [...merged, buffer] : merged;
  return finalMerged.map((segment, idx) => ({ ...segment, index: idx + 1 }));
};

export const toTranscriptSegments = (srt: string): ParsedSegment[] => mergeSegmentsBySentence(parseSrt(srt));

const isInRange = (ms: number, ranges: SpeakerRange[]): boolean =>
  ranges.some(([start, end]) => ms >= start && ms <= end);

export type SegmentWithSpeaker = ParsedSegment & {
  speaker: string;
  speakerRole: string;
};

export const assignSpeakersFromMap = (segments: ParsedSegment[], speakerMap: SpeakerMap): SegmentWithSpeaker[] =>
  segments.map(segment => {
    if (segment.speaker) {
      const matchedByName = speakerMap.speakers.find(
        speaker => speaker.name.toLowerCase() === segment.speaker?.toLowerCase()
      );
      if (matchedByName) return { ...segment, speaker: matchedByName.name, speakerRole: matchedByName.role };
    }

    const midpoint = (segment.startMs + segment.endMs) / 2;
    const matchedByTime = speakerMap.speakers.find(speaker => isInRange(midpoint, speaker.ranges));

    return {
      ...segment,
      speaker: matchedByTime?.name ?? segment.speaker ?? 'Unknown',
      speakerRole: matchedByTime?.role ?? 'unknown'
    };
  });
