import { Link } from 'react-router-dom';

import type { TranscriptSummary } from '@/api/api';
import { toTranscript } from '@/services/linker';

interface TranscriptTableProps {
  transcripts?: TranscriptSummary[];
}

const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' });

export const TranscriptTable = ({ transcripts = [] }: TranscriptTableProps) => {
  if (!transcripts.length)
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-white/60 px-8 py-12 text-center text-slate-500">
        <p className="text-lg font-semibold text-slate-700">No transcripts found</p>
        <p className="text-sm">Upload a new interview or adjust your filters to see data here.</p>
      </div>
    );

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white/90 shadow-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
          <tr>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Interviewee</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4 text-right">Chunks</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {transcripts.map(transcript => (
            <tr key={transcript.id} className="transition hover:bg-slate-50/70">
              <td className="px-6 py-4">
                <Link
                  to={toTranscript({ transcriptId: transcript.id })}
                  className="text-base font-semibold text-slate-900 transition hover:text-violet-600"
                >
                  {transcript.title}
                </Link>
                <p className="text-xs text-slate-500">{transcript.description}</p>
              </td>
              <td className="px-6 py-4 text-slate-600">{transcript.intervieweeName ?? '—'}</td>
              <td className="px-6 py-4 text-slate-600">
                {transcript.transcriptDate ? dateFormatter.format(new Date(transcript.transcriptDate)) : '—'}
              </td>
              <td className="px-6 py-4 text-right text-base font-semibold text-slate-900">
                {transcript.chunkCount ?? 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

