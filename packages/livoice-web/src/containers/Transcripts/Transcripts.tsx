import { Search } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import type { FormEvent } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useTranscriptsQuery, type TranscriptsQuery } from '@/gql/generated';
import { Card } from '@/ui';
import { SummaryStat } from './components/SummaryStat';
import { TranscriptGrid } from './components/TranscriptGrid';

const getSpeakerNames = (speakerActors?: { name?: string | null }[] | null) =>
  (speakerActors ?? [])
    .map(({ name }) => name)
    .filter(Boolean)
    .join(', ');

type TranscriptsProps = {
  sourceId?: string;
  projectId?: string;
  title?: string;
  showSummary?: boolean;
};

const Transcripts = ({ sourceId, title, showSummary = true }: TranscriptsProps) => {
  const { t } = useTranslation('common');
  const { data, loading, error } = useTranscriptsQuery({
    variables: { sourceId },
    skip: !sourceId
  });
  const [searchValue, setSearchValue] = useQueryState('search', parseAsString.withDefault(''));

  const transcripts: NonNullable<TranscriptsQuery['transcripts']> = useMemo(
    () => data?.transcripts ?? [],
    [data?.transcripts]
  );

  const filteredTranscripts = useMemo(() => {
    if (!searchValue.trim()) return transcripts;
    const normalized = searchValue.trim().toLowerCase();

    return transcripts.filter(transcript => {
      const haystack =
        `${transcript.title ?? ''} ${transcript.notes ?? ''} ${getSpeakerNames(transcript.speakerActors)}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [searchValue, transcripts]);

  const totalChunks = filteredTranscripts.reduce((sum, transcript) => sum + (transcript.segmentsCount ?? 0), 0);
  const mostRecentTimestamp = filteredTranscripts.reduce((latest, transcript) => {
    const timestamp = transcript.createdAt ? new Date(transcript.createdAt).getTime() : 0;
    return timestamp > latest ? timestamp : latest;
  }, 0);
  const formattedLastUpdated = mostRecentTimestamp ? new Date(mostRecentTimestamp).toLocaleDateString() : '—';
  const transcriptCount = filteredTranscripts.length;
  const averageChunkCount = transcriptCount ? Math.round(totalChunks / transcriptCount) : 0;

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  if (loading) return <Card>{t('transcriptStatus.loading')}</Card>;
  if (error) return <Card>{t('transcriptStatus.error')}</Card>;

  return (
    <div className="space-y-6">
      <Card className="p-0">
        <div className="space-y-6 border-b border-slate-100 px-8 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">{t('sidebar.header')}</p>
              <h1 className="text-3xl font-semibold text-slate-900">{title || t('pageTitles.transcripts')}</h1>
              <p className="text-sm text-slate-500">Monitor interviews, uploads, and AI conversations in one place.</p>
            </div>
          </div>
          <form onSubmit={handleSearchSubmit} className="relative max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              name="transcriptSearch"
              type="search"
              placeholder="Search interviews or names..."
              value={searchValue}
              onChange={event => setSearchValue(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-11 py-3 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
            />
          </form>
        </div>

        <div className="space-y-6 px-8 py-6">
          {showSummary ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <SummaryStat label="Transcripts" value={transcriptCount} />
              <SummaryStat label="Total chunks" value={totalChunks} />
              <SummaryStat label="Avg chunks/interview" value={averageChunkCount} />
              <SummaryStat label="Last updated" value={formattedLastUpdated} />
            </div>
          ) : null}
          <TranscriptGrid transcripts={filteredTranscripts} sourceId={sourceId} />
        </div>
      </Card>
    </div>
  );
};

export default Transcripts;
