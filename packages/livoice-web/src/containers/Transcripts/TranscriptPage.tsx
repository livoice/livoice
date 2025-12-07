import { ArrowLeft } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import TranscriptChatPanel from '@/containers/Chat/TranscriptChatPanel';
import { useTranscriptQuery } from '@/gql/generated';
import { toTranscripts } from '@/services/linker';
import { Card } from '@/ui/card';
import { TranscriptTimeline } from './components/TranscriptTimeline';

const TranscriptPage = () => {
  const { t } = useTranslation('common');
  const { transcriptId = '' } = useParams<{ transcriptId: string }>();
  const { data, loading, error } = useTranscriptQuery({ variables: { id: transcriptId }, skip: !transcriptId });
  const transcript = data?.transcript ?? null;
  const timelineChunks = transcript?.segments ?? [];
  const chunkCount = timelineChunks.length ?? 0;

  const formattedDate = useMemo(() => {
    if (!transcript?.createdAt) return '';
    return new Date(transcript.createdAt).toLocaleDateString();
  }, [transcript?.createdAt]);

  if (loading) return <Card>{t('transcriptStatus.loading')}</Card>;
  if (error || !transcript) return <Card>{t('transcriptStatus.error')}</Card>;

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-700 text-white shadow-[0_40px_90px_rgba(15,23,42,0.45)]">
        <div className="space-y-6 px-8 py-8">
          <Link
            to={toTranscripts()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('buttons.back')}
          </Link>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
                {t('pageTitles.transcriptDetail')}
              </p>
              <h1 className="text-3xl font-semibold">{transcript.title || 'Untitled transcript'}</h1>
              <p className="max-w-3xl text-white/80">{transcript.notes || 'No notes yet'}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: t('fields.date'), value: formattedDate || '—' },
                { label: t('fields.interviewee'), value: transcript.intervieweeName ?? '—' },
                { label: t('fields.chunks'), value: chunkCount.toString() }
              ].map(stat => (
                <div key={stat.label} className="rounded-2xl bg-white/10 px-4 py-3 text-sm shadow-inner">
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">{stat.label}</p>
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <Card className="space-y-6">
          <TranscriptTimeline chunks={timelineChunks} />
        </Card>

        <TranscriptChatPanel transcriptId={transcriptId} transcriptTitle={transcript.title ?? 'Transcript'} />
      </div>
    </div>
  );
};

export default TranscriptPage;
