import { ArrowLeft } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import TranscriptsList from '@/containers/Transcripts/Transcripts';
import { useSourceQuery, useTriggerSourceImportMutation } from '@/gql/generated';
import { useToast } from '@/hooks/useToast';
import { toSources } from '@/services/linker';
import { Button, Card } from '@/ui';

const statusLabel: Record<string, string> = {
  idle: 'Idle',
  importing: 'Importing…',
  completed: 'Completed',
  failed: 'Failed'
};

const typeLabel: Record<string, string> = {
  youtube_channel: 'YouTube Channel',
  podcast_feed: 'Podcast Feed',
  vimeo_channel: 'Vimeo Channel'
};

export default function Source() {
  const { t } = useTranslation('common');
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const { sourceId = '' } = useParams<{ sourceId: string }>();
  const toast = useToast();

  const { data, loading, error, refetch } = useSourceQuery({
    variables: { id: sourceId },
    skip: !sourceId
  });

  const [triggerImport, { loading: isTriggering }] = useTriggerSourceImportMutation({
    onCompleted: () => void refetch(),
    onError: err => toast.showToast(err?.message || t('errors.somethingWentWrong'), 'error')
  });

  useEffect(() => {
    headingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  if (!sourceId) return <Card className="p-6 text-sm text-muted-foreground">{t('errors.somethingWentWrong')}</Card>;
  if (loading) return <Card className="p-6 text-sm text-muted-foreground">{t('transcriptStatus.loading')}</Card>;

  const source = data?.source;
  if (error || !source)
    return <Card className="p-6 text-sm text-muted-foreground">{t('errors.somethingWentWrong')}</Card>;

  const status = statusLabel[source.importStatus ?? ''] ?? source.importStatus ?? '—';
  const type = typeLabel[source.type ?? ''] ?? source.type ?? '—';

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            to={toSources()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('buttons.back')}
          </Link>
          <div className="flex flex-col">
            <h1 ref={headingRef} className="text-2xl font-semibold text-slate-900">
              {source.name || t('sources.detail.untitled')}
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{type}</span>
              <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">{status}</span>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          disabled={isTriggering}
          onClick={() => void triggerImport({ variables: { sourceId } })}
        >
          {isTriggering ? t('buttons.running') : t('buttons.runImport')}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-1">
        <div className="space-y-6">
          <Card className="space-y-2 p-4 text-sm text-slate-700">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">URL</span>
              <span className="break-all text-slate-900">{source.url || '—'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">External ID</span>
              <span className="text-slate-900">{source.externalId || '—'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Schedule</span>
              <span className="text-slate-900">{source.importCronExpression || '—'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Last Run</span>
              <span className="text-slate-900">
                {source.importCompletedAt ? new Date(source.importCompletedAt).toLocaleString() : '—'}
              </span>
            </div>
          </Card>

          {source.overallProgress && (
            <Card className="space-y-4 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Overall Progress</h3>
                <span className="text-sm font-semibold text-slate-600">
                  {Math.round(source.overallProgress.overallPercentage)}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${source.overallProgress.overallPercentage}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500">Import:</span>{' '}
                  <span className="font-semibold text-slate-900">
                    {Math.round(source.overallProgress.importCompletedPercentage)}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Embedding:</span>{' '}
                  <span className="font-semibold text-slate-900">
                    {Math.round(source.overallProgress.embeddingCompletedPercentage)}%
                  </span>
                </div>
              </div>
            </Card>
          )}

          {source.transcriptImportProgress && source.transcriptImportProgress.total > 0 && (
            <Card className="space-y-4 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Transcript Import Progress</h3>
                <span className="text-sm font-semibold text-slate-600">
                  {source.transcriptImportProgress.completed}/{source.transcriptImportProgress.total}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${source.transcriptImportProgress.completedPercentage}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500">Pending:</span>{' '}
                  <span className="font-semibold text-slate-900">{source.transcriptImportProgress.pending}</span>
                </div>
                <div>
                  <span className="text-slate-500">Fetching:</span>{' '}
                  <span className="font-semibold text-slate-900">{source.transcriptImportProgress.fetching}</span>
                </div>
                <div>
                  <span className="text-slate-500">Completed:</span>{' '}
                  <span className="font-semibold text-green-600">{source.transcriptImportProgress.completed}</span>
                </div>
                <div>
                  <span className="text-slate-500">Failed:</span>{' '}
                  <span className="font-semibold text-red-600">{source.transcriptImportProgress.failed}</span>
                </div>
                {source.transcriptImportProgress.skipped > 0 && (
                  <div>
                    <span className="text-slate-500">Skipped:</span>{' '}
                    <span className="font-semibold text-slate-600">{source.transcriptImportProgress.skipped}</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {source.transcriptAnalysisProgress && source.transcriptAnalysisProgress.total > 0 && (
            <Card className="space-y-4 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Transcript Analysis Progress</h3>
                <span className="text-sm font-semibold text-slate-600">
                  {source.transcriptAnalysisProgress.completed + source.transcriptAnalysisProgress.skipped}/
                  {source.transcriptAnalysisProgress.total}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-amber-500 transition-all"
                  style={{ width: `${source.transcriptAnalysisProgress.completedPercentage}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500">Pending:</span>{' '}
                  <span className="font-semibold text-slate-900">{source.transcriptAnalysisProgress.pending}</span>
                </div>
                <div>
                  <span className="text-slate-500">Processing:</span>{' '}
                  <span className="font-semibold text-slate-900">{source.transcriptAnalysisProgress.processing}</span>
                </div>
                <div>
                  <span className="text-slate-500">Completed:</span>{' '}
                  <span className="font-semibold text-green-600">{source.transcriptAnalysisProgress.completed}</span>
                </div>
                <div>
                  <span className="text-slate-500">Failed:</span>{' '}
                  <span className="font-semibold text-red-600">{source.transcriptAnalysisProgress.failed}</span>
                </div>
                {source.transcriptAnalysisProgress.skipped > 0 && (
                  <div>
                    <span className="text-slate-500">Skipped:</span>{' '}
                    <span className="font-semibold text-slate-600">{source.transcriptAnalysisProgress.skipped}</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {source.transcriptEmbeddingProgress && source.transcriptEmbeddingProgress.total > 0 && (
            <Card className="space-y-4 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Transcript Embedding Progress</h3>
                <span className="text-sm font-semibold text-slate-600">
                  {source.transcriptEmbeddingProgress.completed}/{source.transcriptEmbeddingProgress.total}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-purple-500 transition-all"
                  style={{ width: `${source.transcriptEmbeddingProgress.completedPercentage}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500">Pending:</span>{' '}
                  <span className="font-semibold text-slate-900">{source.transcriptEmbeddingProgress.pending}</span>
                </div>
                <div>
                  <span className="text-slate-500">Processing:</span>{' '}
                  <span className="font-semibold text-slate-900">{source.transcriptEmbeddingProgress.processing}</span>
                </div>
                <div>
                  <span className="text-slate-500">Completed:</span>{' '}
                  <span className="font-semibold text-green-600">{source.transcriptEmbeddingProgress.completed}</span>
                </div>
                <div>
                  <span className="text-slate-500">Failed:</span>{' '}
                  <span className="font-semibold text-red-600">{source.transcriptEmbeddingProgress.failed}</span>
                </div>
              </div>
            </Card>
          )}

          <TranscriptsList
            sourceId={sourceId}
            projectId={source.projects?.[0]?.id}
            title={source.name || t('sources.detail.untitled')}
            showSummary={false}
          />
        </div>
      </div>
    </div>
  );
}
