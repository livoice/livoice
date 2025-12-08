import { graphql as g } from '@keystone-6/core';
import type { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import PQueue from 'p-queue';
import { Session } from '../../auth';

const TIMESTAMP_RE = /(?<hours>\d{2}):(?<minutes>\d{2}):(?<seconds>\d{2}),(?<ms>\d{3})/;

type ParsedSegment = {
  index: number;
  startMs: number;
  endMs: number;
  durationMs: number;
  text: string;
  speaker?: string;
  isMetadata: boolean;
};

const parseTimestamp = (value: string): number => {
  const match = TIMESTAMP_RE.exec(value);
  if (!match) throw new Error(`Invalid timestamp: ${value}`);
  const { hours, minutes, seconds, ms } = match.groups!;
  return Number(hours) * 3_600_000 + Number(minutes) * 60_000 + Number(seconds) * 1_000 + Number(ms);
};

const parseLines = (block: string) =>
  block
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

const parseSrt = (srt: string): ParsedSegment[] => {
  const normalized = srt.replace(/\r\n/g, '\n').trim();
  if (!normalized) return [];
  const groups = normalized
    .split(/\n{2,}/)
    .map(block => block.trim())
    .filter(Boolean);

  return groups
    .map(block => {
      const lines = parseLines(block);
      if (lines.length < 2) return null;
      const [indexLine, timeLine, ...textLines] = lines;
      const timeMatch = timeLine.match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/);
      if (!timeMatch) throw new Error(`Invalid timecode line: ${timeLine}`);
      const startMs = parseTimestamp(timeMatch[1]);
      const endMs = parseTimestamp(timeMatch[2]);
      if (endMs <= startMs) throw new Error('Segment end must be greater than start');
      const textValue = textLines.join(' ').trim();
      if (!textValue) return null;
      const speakerMatch = textValue.match(/^([A-Za-z0-9 ]+):\s*(.+)$/);
      const speaker = speakerMatch ? speakerMatch[1] : undefined;
      const cleanedText = speakerMatch ? speakerMatch[2] : textValue;
      const isMetadata = /^\[.*\]$/.test(cleanedText);
      return {
        index: Number.parseInt(indexLine, 10) || 0,
        startMs,
        endMs,
        durationMs: endMs - startMs,
        text: cleanedText,
        speaker,
        isMetadata
      };
    })
    .reduce<ParsedSegment[]>((acc, segment, idx) => {
      if (!segment) return acc;
      const normalizedIndex = segment.index || idx + 1;
      acc.push({ ...segment, index: normalizedIndex });
      return acc;
    }, []);
};

export const TranscriptIngestion = (base: BaseSchemaMeta) => {
  const IngestInput = g.inputObject({
    name: 'IngestTranscriptInput',
    fields: {
      projectId: g.arg({ type: g.nonNull(g.ID) }),
      title: g.arg({ type: g.nonNull(g.String) }),
      intervieweeName: g.arg({ type: g.String }),
      sourceUrl: g.arg({ type: g.String }),
      language: g.arg({ type: g.String }),
      notes: g.arg({ type: g.String }),
      srt: g.arg({ type: g.nonNull(g.String) })
    }
  });

  const Result = g.object<{ transcriptId: string; segmentsCount: number; projectId: string }>()({
    name: 'IngestTranscriptResult',
    fields: {
      transcriptId: g.field({ type: g.nonNull(g.ID) }),
      segmentsCount: g.field({ type: g.nonNull(g.Int) }),
      projectId: g.field({ type: g.nonNull(g.ID) })
    }
  });

  return {
    mutation: {
      ingestTranscript: g.field({
        type: g.nonNull(Result),
        args: { input: g.arg({ type: g.nonNull(IngestInput) }) },
        async resolve(_root, { input }, context) {
          const session = context.session as Session | undefined;
          if (!session?.id) throw new Error('Unauthorized');
          if (!session.orgId) throw new Error('Missing organization context');

          const sudoContext = context.sudo();
          const project = await sudoContext.query.Project.findOne({
            where: { id: input.projectId },
            query: 'id org { id }'
          });
          if (!project) throw new Error('Project not found');
          if (!project.org?.id || project.org.id !== session.orgId) throw new Error('Project not in your organization');

          const segments = parseSrt(input.srt);
          if (!segments.length) throw new Error('No valid segments detected');

          const transcript = await sudoContext.db.Transcript.createOne({
            data: {
              title: input.title.trim(),
              intervieweeName: input.intervieweeName?.trim() || undefined,
              sourceUrl: input.sourceUrl?.trim() || undefined,
              language: input.language?.trim() || undefined,
              notes: input.notes?.trim() || undefined,
              project: { connect: { id: project.id } },
              org: { connect: { id: project.org.id } }
            }
          });

          const SEGMENT_CONCURRENCY = 25;
          const queue = new PQueue({ concurrency: SEGMENT_CONCURRENCY });

          await queue.addAll(
            segments.map(
              segment => () =>
                sudoContext.db.TranscriptSegment.createOne({
                  data: {
                    transcript: { connect: { id: transcript.id } },
                    index: segment.index,
                    startMs: segment.startMs,
                    endMs: segment.endMs,
                    durationMs: segment.durationMs,
                    text: segment.text,
                    speaker: segment.speaker,
                    isMetadata: segment.isMetadata
                  }
                })
            )
          );

          return {
            transcriptId: transcript.id,
            segmentsCount: segments.length,
            projectId: project.id
          };
        }
      })
    }
  };
};
