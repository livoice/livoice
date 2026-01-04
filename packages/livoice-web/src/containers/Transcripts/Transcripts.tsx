import { Search } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useTranscriptsQuery, type TranscriptsQuery } from '@/gql/generated';
import { Card } from '@/ui';
import InfiniteScroll from 'react-infinite-scroller';
import { SummaryStat } from './components/SummaryStat';
import { TranscriptGrid } from './components/TranscriptGrid';

type TranscriptsProps = {
  sourceId?: string;
  projectId?: string;
  title?: string;
  showSummary?: boolean;
};

const Transcripts = ({ sourceId, title, showSummary = true }: TranscriptsProps) => {
  const { t } = useTranslation('common');
  const pageSize = 10;
  const [searchValue, setSearchValue] = useQueryState('search', parseAsString.withDefault(''));
  const [debouncedSearch, setDebouncedSearch] = useState(searchValue);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchValue.trim()), 300);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  const { data, loading, error, fetchMore } = useTranscriptsQuery({
    variables: {
      sourceId,
      take: pageSize,
      skip: 0,
      search: debouncedSearch || undefined
    },
    skip: !sourceId
  });

  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const transcripts: NonNullable<TranscriptsQuery['transcripts']> = useMemo(
    () => data?.transcripts ?? [],
    [data?.transcripts]
  );

  const transcriptsCount = data?.transcriptsCount ?? 0;
  const hasMore = transcripts.length < transcriptsCount;

  const totalChunks = transcripts.reduce((sum, transcript) => sum + (transcript.segmentsCount ?? 0), 0);
  const mostRecentTimestamp = transcripts.reduce((latest, transcript) => {
    const timestamp = transcript.createdAt ? new Date(transcript.createdAt).getTime() : 0;
    return timestamp > latest ? timestamp : latest;
  }, 0);
  const formattedLastUpdated = mostRecentTimestamp ? new Date(mostRecentTimestamp).toLocaleDateString() : '—';
  const transcriptCount = transcripts.length;
  const averageChunkCount = transcriptCount ? Math.round(totalChunks / transcriptCount) : 0;

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleLoadMore = useCallback(async () => {
    if (loading || isFetchingMore || !hasMore) return;
    setIsFetchingMore(true);
    await fetchMore({
      variables: {
        sourceId,
        take: pageSize,
        skip: transcripts.length,
        search: debouncedSearch || undefined
      }
    });
    setIsFetchingMore(false);
  }, [loading, isFetchingMore, hasMore, fetchMore, sourceId, pageSize, transcripts.length, debouncedSearch]);

  if (error) return <Card>{t('transcriptStatus.error')}</Card>;

  const isInitialLoading = loading && transcripts.length === 0;

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
          {isInitialLoading ? (
            <div className="text-center text-sm text-muted-foreground">{t('transcriptStatus.loading')}</div>
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={() => void handleLoadMore()}
              hasMore={hasMore}
              threshold={300}
              loader={
                <div key="transcripts-loader" className="text-center text-sm text-muted-foreground">
                  {t('transcriptStatus.loading')}
                </div>
              }
            >
              <TranscriptGrid transcripts={transcripts} sourceId={sourceId} />
            </InfiniteScroll>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Transcripts;
