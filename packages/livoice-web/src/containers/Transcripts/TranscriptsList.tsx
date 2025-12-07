import { Search } from 'lucide-react';
import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useListTranscriptsQuery } from '@/api/api';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { TranscriptTable } from './components/TranscriptTable';

const TranscriptsList = () => {
  const { t } = useTranslation('common');
  const { data, isLoading, isError } = useListTranscriptsQuery();
  const [searchValue, setSearchValue] = useState('');

  const transcripts = useMemo(() => data ?? [], [data]);

  const filteredTranscripts = useMemo(() => {
    if (!searchValue.trim()) return transcripts;
    const normalized = searchValue.trim().toLowerCase();

    return transcripts.filter(transcript => {
      const haystack =
        `${transcript.title ?? ''} ${transcript.description ?? ''} ${transcript.intervieweeName ?? ''}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [searchValue, transcripts]);

  const totalChunks = filteredTranscripts.reduce((sum, transcript) => sum + (transcript.chunkCount ?? 0), 0);
  const mostRecentTimestamp = filteredTranscripts.reduce((latest, transcript) => {
    const timestamp = transcript.transcriptDate ? new Date(transcript.transcriptDate).getTime() : 0;
    return timestamp > latest ? timestamp : latest;
  }, 0);
  const formattedLastUpdated = mostRecentTimestamp ? new Date(mostRecentTimestamp).toLocaleDateString() : '—';
  const transcriptCount = filteredTranscripts.length;
  const averageChunkCount = transcriptCount ? Math.round(totalChunks / transcriptCount) : 0;

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  if (isLoading) return <Card>{t('transcriptStatus.loading')}</Card>;
  if (isError) return <Card>{t('transcriptStatus.error')}</Card>;

  return (
    <div className="space-y-6">
      <Card className="p-0">
        <div className="space-y-6 border-b border-slate-100 px-8 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">{t('sidebar.header')}</p>
              <h1 className="text-3xl font-semibold text-slate-900">{t('pageTitles.transcripts')}</h1>
              <p className="text-sm text-slate-500">Monitor interviews, uploads, and AI conversations in one place.</p>
            </div>
            <Button type="button" className="w-full md:w-auto">
              {t('buttons.uploadText')}
            </Button>
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryStat label="Transcripts" value={transcriptCount.toString()} />
            <SummaryStat label="Total chunks" value={totalChunks.toString()} />
            <SummaryStat label="Avg chunks/interview" value={averageChunkCount.toString()} />
            <SummaryStat label="Last updated" value={formattedLastUpdated} />
          </div>
          <TranscriptTable transcripts={filteredTranscripts} />
        </div>
      </Card>
    </div>
  );
};

const SummaryStat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-slate-100 bg-white/70 px-4 py-3 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">{label}</p>
    <p className="text-2xl font-semibold text-slate-900">{value}</p>
  </div>
);

export default TranscriptsList;

