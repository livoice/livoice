import { Link } from 'react-router-dom';

import type { TranscriptsQuery } from '@/gql/generated';
import { toTranscript } from '@/services/linker';

const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' });

type TranscriptGridProps = {
  transcripts: NonNullable<TranscriptsQuery['transcripts']>;
  sourceId?: string;
};

export const TranscriptGrid = ({ transcripts, sourceId }: TranscriptGridProps) => {
  if (!transcripts.length)
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-white/60 px-8 py-12 text-center text-slate-500">
        <p className="text-lg font-semibold text-slate-700">No transcripts found</p>
        <p className="text-sm">Upload a new interview or adjust your filters to see data here.</p>
      </div>
    );

  return (
    <div className="space-y-3">
      {transcripts.map(transcript => {
        const transcriptUrl =
          sourceId && transcript.id ? toTranscript({ sourceId, transcriptId: transcript.id }) : null;
        const transcriptCard = (
          <div
            key={transcript.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white/90 p-4 text-left shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-slate-900">{transcript.title || 'Untitled transcript'}</h3>
                <p className="text-sm text-slate-500">{transcript.notes || 'No notes yet'}</p>
              </div>
              <div className="text-right text-sm text-slate-500">
                <div className="font-semibold text-slate-900">{transcript.segmentsCount ?? 0} chunks</div>
                <div>{transcript.createdAt ? dateFormatter.format(new Date(transcript.createdAt)) : '—'}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                {transcript.intervieweeName || 'Unknown speaker'}
              </span>
            </div>
          </div>
        );

        return transcriptUrl ? (
          <Link key={transcript.id} to={transcriptUrl} className="block text-slate-900 transition hover:text-primary">
            {transcriptCard}
          </Link>
        ) : (
          transcriptCard
        );
      })}
    </div>
  );
};
