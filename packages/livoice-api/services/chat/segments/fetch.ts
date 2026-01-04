import { Prisma } from '@prisma/client';
import { createEmbeddings } from '../../../lib/openai';
import { formatVectorLiteral } from '../../../lib/pgvector';
import type { FetchSegmentsParams, RawSegment, SegmentRecord } from '../types';

const mapRawToSegment = (row: RawSegment): SegmentRecord => ({
  id: row.id,
  text: row.text,
  startMs: row.startMs ?? null,
  endMs: row.endMs ?? null,
  isMetadata: row.isMetadata ?? false,
  transcript: row.transcriptId
    ? {
        id: row.transcriptId,
        title: row.transcriptTitle ?? null,
        publishedAt: row.publishedAt ?? null
      }
    : null,
  similarityScore: row.similarityScore ?? null,
  speakerActor: row.speakerActorId
    ? {
        id: row.speakerActorId,
        name: row.speakerActorName ?? null,
        type: row.speakerActorType ?? null
      }
    : null
});

export const fetchSegments = async ({
  context,
  projectId,
  queryText,
  maxSegments
}: FetchSegmentsParams): Promise<SegmentRecord[]> => {
  const sudoContext = context.sudo();

  const fallback = async () => {
    const segments = await sudoContext.query.TranscriptSegment.findMany({
      where: {
        transcript: {
          source: {
            projects: {
              some: {
                id: { equals: projectId }
              }
            }
          }
        }
      },
      orderBy: [{ startMs: 'asc' }],
      take: maxSegments,
      query:
        'id text startMs endMs isMetadata transcript { id title publishedAt source { id name projects { id name } } } speakerActor { id name type }'
    });

    return segments
      .filter(segment => segment.text && !segment.isMetadata)
      .map(segment => ({
        id: segment.id,
        text: segment.text,
        startMs: segment.startMs,
        endMs: segment.endMs,
        speaker: segment.speaker,
        isMetadata: segment.isMetadata,
        transcript: segment.transcript
          ? {
              id: segment.transcript.id,
              title: segment.transcript.title ?? null,
              publishedAt: segment.transcript.publishedAt ?? null
            }
          : null,
        speakerActor: segment.speakerActor
          ? {
              id: segment.speakerActor.id,
              name: segment.speakerActor.name ?? null,
              type: segment.speakerActor.type ?? null
            }
          : null
      }));
  };

  const runVectorSearch = async (text: string) => {
    if (!text.trim()) return [];
    if (!projectId) return [];

    try {
      const embedding = (await createEmbeddings([text]))?.[0];
      if (!embedding?.length) return [];

      const literal = Prisma.raw(formatVectorLiteral(embedding) ?? '');

      const sourceIds = await sudoContext.prisma.$queryRaw<{ B: string }[]>`
        SELECT "B" FROM "_Project_sources" WHERE "A" = ${projectId}
      `;

      if (!sourceIds.length) return [];

      const sourceIdList = sourceIds.map((s: { B: string }) => s.B);

      const rows =
        (await sudoContext.prisma.$queryRaw<RawSegment[]>`
          SELECT
            ts."id",
            ts."text",
            ts."startMs",
            ts."endMs",
            ts."isMetadata",
            t."id" AS "transcriptId",
            t."title" AS "transcriptTitle",
            t."publishedAt" AS "publishedAt",
            a."id" AS "speakerActorId",
            a."name" AS "speakerActorName",
            a."type" AS "speakerActorType",
            (ts."embedding" <=> ${literal}) AS "similarityScore"
          FROM "TranscriptSegment" ts
          INNER JOIN "Transcript" t ON t.id = ts."transcript"
          LEFT JOIN "Actor" a ON a.id = ts."speakerActor"
          WHERE ts."embedding" IS NOT NULL
            AND ts."isMetadata" = FALSE
            AND ts."source" IN (${Prisma.join(sourceIdList)})
          ORDER BY ts."embedding" <=> ${literal}
          LIMIT ${maxSegments}
        `) ?? [];

      return rows.map(mapRawToSegment);
    } catch (error) {
      console.error('Vector search fallback', error);
      return [];
    }
  };

  if (queryText) {
    const vectorSegments = await runVectorSearch(queryText);
    if (vectorSegments.length) return vectorSegments;
  }

  return fallback();
};
