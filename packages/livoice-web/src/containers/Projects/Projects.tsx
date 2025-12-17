import { parseAsString, useQueryState } from 'nuqs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { useProjectsQuery, type ProjectsQuery } from '@/gql/generated';
import { useAuth } from '@/hooks/auth/useAuth';
import { toProject, toProjectCreate, toProjectEdit } from '@/services/linker';
import { Button, PageHeader, TextField, buttonVariants } from '@/ui';

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

  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));

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
        <TextField
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder={t('input.searchPlaceholder', { label: t('sidebar.projects').toLowerCase() })}
          className="w-full pl-10"
        />
      </div>
    </div>
  );

  const actions = canCreateProject ? (
    <Link to={toProjectCreate()} className={buttonVariants({ className: 'shadow-lg shadow-primary/25' })}>
      <span className="material-symbols-outlined mr-2 text-lg">add</span>
      {t('buttons.create')}
    </Link>
  ) : null;

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={t('sidebar.projects')} toolbar={toolbar} actions={actions} />
      <div className="flex-1 p-6">
        {loading ? (
          <Spinner />
        ) : filteredProjects.length ? (
          <div className="space-y-3">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="rounded-2xl border border-slate-100 bg-white/90 shadow-sm transition hover:shadow-md"
              >
                <Link
                  to={toProject({ projectId: project.id })}
                  className="flex flex-col gap-3 p-4 no-underline sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-lg font-semibold uppercase text-primary">
                      {project.name?.[0] ?? '?'}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">
                        {project.name || t('projects.detail.untitled')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <span className="text-sm font-semibold text-slate-900">
                      {t('projects.list.columns.transcripts')}: {project.transcriptsCount ?? 0}
                    </span>
                    {canEditProjectById(project.id) ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={event => {
                          event.preventDefault();
                          event.stopPropagation();
                          navigate(toProjectEdit({ projectId: project.id }));
                        }}
                      >
                        {t('buttons.edit')}
                      </Button>
                    ) : null}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-white/70 p-8 text-center text-sm text-muted-foreground">
            {t('errors.noResultsFound', { label: t('sidebar.projects') })}
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}
