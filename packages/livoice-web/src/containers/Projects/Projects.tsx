import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router';

import { useProjectsQuery, type ProjectsQuery } from '@/gql/generated';
import { useAuth } from '@/hooks/auth/useAuth';
import { cn } from '@/lib/cn';
import { toProjectCreate, toProjectEdit } from '@/services/linker';
import { Button, Input, PageHeader } from '@/ui';
import ProjectCard from './components/ProjectCard/ProjectCard';
import ProjectTranscripts from './components/ProjectTranscripts';

type ProjectListItem = NonNullable<NonNullable<ProjectsQuery['projects']>[number]>;

const Spinner = () => (
  <div className="flex min-h-[200px] items-center justify-center">
    <span className="h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
  </div>
);

export default function Projects() {
  const { user, canEditOrg, canEditProject: canEditSelfProject } = useAuth();
  const { t } = useTranslation('common');
  const { data, loading } = useProjectsQuery();
  const navigate = useNavigate();

  const projects: ProjectListItem[] = (data?.projects ?? []).filter((candidate): candidate is ProjectListItem =>
    Boolean(candidate)
  );

  const [search, setSearch] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const filteredProjects = useMemo(() => {
    const term = search.trim().toLowerCase();
    return projects.filter(project => {
      if (term) {
        const haystack = `${project.name ?? ''} ${project.description ?? ''}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [projects, search]);

  useEffect(() => {
    if (selectedProjectId) return;
    if (projects.length) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  const selectedProject = useMemo(
    () => projects.find(project => project?.id === selectedProjectId),
    [projects, selectedProjectId]
  );

  const canCreateProject = canEditOrg;
  const canEditProjectById = (projectId: string) => {
    if (canEditOrg) return true;
    if (!canEditSelfProject || !user?.projectId) return false;
    return user.projectId === projectId;
  };

  const toolbar = (
    <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          search
        </span>
        <Input
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder={t('input.searchPlaceholder', { label: t('sidebar.projects').toLowerCase() })}
          className="w-full pl-10"
        />
      </div>
    </div>
  );

  const actions = canCreateProject ? (
    <Button onClick={() => navigate(toProjectCreate())} className="shadow-lg shadow-primary/25">
      <span className="material-symbols-outlined mr-2 text-lg">add</span>
      {t('buttons.create')}
    </Button>
  ) : null;

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={t('sidebar.projects')} toolbar={toolbar} actions={actions} />
      <div className="flex-1 p-6">
        {loading ? (
          <Spinner />
        ) : filteredProjects.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {filteredProjects.map(project => {
              const isSelected = selectedProjectId === project.id;
              return (
                <div
                  key={project.id}
                  className={cn(
                    'space-y-3 rounded-[28px] border bg-white/70 p-3 transition',
                    isSelected ? 'border-primary shadow-lg' : 'border-slate-200'
                  )}
                >
                  <ProjectCard
                    name={project.name ?? ''}
                    description={project.description ?? ''}
                    orgName={project.org?.name ?? ''}
                  />
                  <div className="flex flex-col gap-2">
                    {canEditProjectById(project.id) ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate(toProjectEdit({ projectId: project.id }))}
                      >
                        {t('buttons.edit')}
                      </Button>
                    ) : null}
                    <Button
                      type="button"
                      variant={isSelected ? 'default' : 'ghost'}
                      className="w-full"
                      onClick={() => setSelectedProjectId(project.id)}
                    >
                      {t('projects.transcripts.actions.viewTranscripts')}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-white/70 p-8 text-center text-sm text-muted-foreground">
            {t('errors.noResultsFound', { label: t('sidebar.projects') })}
          </div>
        )}
      </div>
      {selectedProjectId ? (
        <div className="px-6 pb-10">
          <ProjectTranscripts projectId={selectedProjectId} projectName={selectedProject?.name ?? ''} />
        </div>
      ) : null}
      <Outlet />
    </div>
  );
}
