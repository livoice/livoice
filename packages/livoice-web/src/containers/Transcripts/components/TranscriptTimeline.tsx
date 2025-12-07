import type { TranscriptChunk } from '@/api/api';

interface TranscriptTimelineProps {
  chunks: TranscriptChunk[];
}

const formatTimestamp = (seconds?: number | null) => {
  if (!seconds) return '';
  const date = new Date(seconds * 1000);
  return date.toISOString().substring(11, 19);
};

export const TranscriptTimeline = ({ chunks }: TranscriptTimelineProps) => {
  if (!chunks.length)
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-6 text-center text-sm text-slate-500">
        Timeline will appear after the transcript is ingested.
      </div>
    );

  return (
    <div className="rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">Timeline</h2>
        <p className="text-xs text-slate-400">Auto-generated from transcript chunks</p>
      </div>
      <ul className="mt-4 space-y-4 text-sm text-slate-700">
        {chunks.map(chunk => (
          <li key={chunk.id} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              <span>{chunk.speaker ?? 'Speaker'}</span>
              <div className="flex items-center gap-3 text-slate-500">
                <span>{chunk.durationSeconds ? `${chunk.durationSeconds.toFixed(1)}s` : '—'}</span>
                <span>{formatTimestamp(chunk.absoluteTimestamp ?? undefined)}</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-700">{chunk.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

