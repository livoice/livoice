import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useParams } from 'react-router-dom';

import ChatList from '@/containers/Chat/ChatList';
import TranscriptsList from '@/containers/Transcripts/Transcripts';
import { useProjectQuery } from '@/gql/generated';
import { toProjectEdit, toProjects } from '@/services/linker';
import { Card } from '@/ui';

export default function Project() {
  const { t } = useTranslation('common');
  const { projectId = '' } = useParams<{ projectId: string }>();
  // const location = useLocation();

  const { data, loading, error } = useProjectQuery({
    variables: { id: projectId },
    skip: !projectId
  });

  if (!projectId) return <Card className="p-6 text-sm text-muted-foreground">{t('errors.somethingWentWrong')}</Card>;
  if (loading) return <Card className="p-6 text-sm text-muted-foreground">{t('transcriptStatus.loading')}</Card>;

  const project = data?.project;
  if (error || !project)
    return <Card className="p-6 text-sm text-muted-foreground">{t('errors.somethingWentWrong')}</Card>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            to={toProjects()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('buttons.back')}
          </Link>
          <h1 className="text-2xl font-semibold text-slate-900">{project.name || t('projects.detail.untitled')}</h1>
        </div>
        <Link
          to={toProjectEdit({ projectId })}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
        >
          {t('buttons.edit')}
        </Link>
      </div>

      <div className={`grid gap-6 lg:grid-cols-1`}>
        <div className="space-y-6">
          <ChatList projectId={projectId} />

          <TranscriptsList
            projectId={projectId}
            title={project.name || t('projects.detail.untitled')}
            showSummary={false}
          />
        </div>

        <Outlet />
      </div>
    </div>
  );
}
