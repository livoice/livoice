import { parseAsString, useQueryState } from 'nuqs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { useSourcesQuery, type SourcesQuery } from '@/gql/generated';
import { toSource, toSourceCreate, toSourceEdit } from '@/services/linker';
import { Button, PageHeader, TextField, buttonVariants } from '@/ui';

type SourceListItem = NonNullable<NonNullable<SourcesQuery['sources']>[number]>;

const Spinner = () => (
  <div className="flex min-h-[200px] items-center justify-center">
    <span className="h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
  </div>
);

const statusLabel: Record<string, string> = {
  idle: 'Idle',
  importing: 'Importing…',
  completed: 'Completed',
  failed: 'Failed'
};

const typeLabel: Record<string, string> = {
  youtube_channel: 'YouTube',
  podcast_feed: 'Podcast',
  vimeo_channel: 'Vimeo'
};

export default function Sources() {
  const { t } = useTranslation('common');
  const { data, loading } = useSourcesQuery();
  const navigate = useNavigate();

  const sources: SourceListItem[] = (data?.sources ?? []).filter((candidate): candidate is SourceListItem =>
    Boolean(candidate)
  );

  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));

  const filteredSources = useMemo(() => {
    const term = search.trim().toLowerCase();
    return sources.filter(source => {
      if (term) {
        const haystack = `${source.name ?? ''} ${source.url ?? ''} ${source.type ?? ''}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [sources, search]);

  const toolbar = (
    <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          search
        </span>
        <TextField
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder={t('input.searchPlaceholder', { label: t('sidebar.sources').toLowerCase() })}
          className="w-full pl-10"
        />
      </div>
    </div>
  );

  const actions = (
    <Link to={toSourceCreate()} className={buttonVariants({ className: 'shadow-lg shadow-primary/25' })}>
      <span className="material-symbols-outlined mr-2 text-lg">add</span>
      {t('buttons.create')}
    </Link>
  );

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={t('sidebar.sources')} toolbar={toolbar} actions={actions} />
      <div className="flex-1 p-6">
        {loading ? (
          <Spinner />
        ) : filteredSources.length ? (
          <div className="space-y-3">
            {filteredSources.map(source => (
              <div
                key={source.id}
                className="rounded-2xl border border-slate-100 bg-white/90 shadow-sm transition hover:shadow-md"
              >
                <Link
                  to={toSource({ sourceId: source.id })}
                  className="flex flex-col gap-3 p-4 no-underline sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-lg font-semibold uppercase text-primary">
                      {source.name?.[0] ?? '?'}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">
                        {source.name || t('sources.detail.untitled')}
                      </span>
                      <span className="text-xs text-slate-500">{source.url}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <div className="flex flex-col items-end gap-2">
                      {source.overallProgress && (
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${source.overallProgress.overallPercentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-600">
                            {Math.round(source.overallProgress.overallPercentage)}%
                          </span>
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {typeLabel[source.type ?? ''] ?? source.type ?? '—'}
                        </span>
                        {source.overallProgress ? (
                          [
                            {
                              label: 'Import',
                              percent: source.overallProgress.importCompletedPercentage
                            },
                            {
                              label: 'Analysis',
                              percent: source.overallProgress.analysisCompletedPercentage
                            },
                            {
                              label: 'Embedding',
                              percent: source.overallProgress.embeddingCompletedPercentage
                            }
                          ].map(({ label, percent }) => (
                            <span
                              key={label}
                              className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
                            >
                              {label}: {Math.round(percent)}%
                            </span>
                          ))
                        ) : (
                          <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                            {statusLabel[source.importStatus ?? ''] ?? source.importStatus ?? '—'}
                          </span>
                        )}
                        <span className="text-sm font-semibold text-slate-900">
                          {t('sources.list.columns.transcripts')}: {source.transcriptsCount ?? 0}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={event => {
                        event.preventDefault();
                        event.stopPropagation();
                        navigate(toSourceEdit({ sourceId: source.id }));
                      }}
                    >
                      {t('buttons.edit')}
                    </Button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-white/70 p-8 text-center text-sm text-muted-foreground">
            {t('errors.noResultsFound', { label: t('sidebar.sources') })}
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}
