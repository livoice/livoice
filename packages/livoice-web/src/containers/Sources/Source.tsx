import { ArrowLeft } from 'lucide-react';
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
            <h1 className="text-2xl font-semibold text-slate-900">{source.name || t('sources.detail.untitled')}</h1>
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
