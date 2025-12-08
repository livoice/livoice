import { graphql as g } from '@keystone-6/core';
import type { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import PQueue from 'p-queue';
import { Session } from '../../auth';
import { toTranscriptSegments } from '../../lib/toTranscriptSegments';

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

          const segments = toTranscriptSegments(input.srt);
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

          const SEGMENT_CONCURRENCY = 30;
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
