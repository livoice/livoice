import { useApolloClient } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import FormDrawer from '@/components/FormDrawer/FormDrawer';
import { TranscriptsDocument, useIngestTranscriptMutation, useProjectsQuery } from '@/gql/generated';
import { useToast } from '@/hooks/useToast';
import { toProject, toProjects, toTranscript } from '@/services/linker';
import { Button, Input, TextField } from '@/ui';

type FormValues = {
  projectId: string;
  title: string;
  intervieweeName: string;
  language: string;
  notes: string;
  srt: string;
};

const defaultValues: FormValues = {
  projectId: '',
  title: '',
  intervieweeName: '',
  language: '',
  notes: '',
  srt: ''
};

const TranscriptUpsert = () => {
  const { projectId: routeProjectId = '' } = useParams<{ projectId: string }>();
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const toast = useToast();
  const apolloClient = useApolloClient();

  const { data: projectsData } = useProjectsQuery();

  const schema = useMemo(
    () =>
      z.object({
        projectId: z.string().trim().min(1, t('errors.required')),
        title: z.string().trim().min(1, t('errors.required')),
        intervieweeName: z.string().trim().optional(),
        language: z.string().trim().optional(),
        notes: z.string().trim().optional(),
        srt: z.string().trim().min(1, t('errors.required'))
      }),
    [t]
  );

  const resolver = useMemo(() => zodResolver(schema as never), [schema]);
  const { control, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: { ...defaultValues, projectId: routeProjectId },
    resolver
  });

  const onClose = () => {
    navigate(routeProjectId ? toProject({ projectId: routeProjectId }) : toProjects());
    reset(defaultValues);
  };

  const [ingestTranscript, { loading: isSaving }] = useIngestTranscriptMutation({
    onCompleted: result => {
      void apolloClient.refetchQueries({ include: [TranscriptsDocument] });
      const newTranscriptId = result?.ingestTranscript?.transcriptId;
      toast.showToast(t('projects.transcripts.ingest.success'), 'success');
      if (routeProjectId) {
        navigate(toProject({ projectId: routeProjectId }));
      } else if (newTranscriptId) {
        navigate(toTranscript({ transcriptId: newTranscriptId }));
      } else {
        navigate('/transcripts');
      }
      reset(defaultValues);
    },
    onError: error => {
      toast.showToast(error?.message || t('errors.somethingWentWrong'), 'error');
    }
  });

  const onSubmit = (values: FormValues) => {
    void ingestTranscript({
      variables: {
        input: {
          projectId: values.projectId,
          title: values.title.trim(),
          intervieweeName: values.intervieweeName?.trim() || null,
          language: values.language?.trim() || null,
          notes: values.notes?.trim() || null,
          srt: values.srt
        }
      }
    });
  };

  const projectOptions = (projectsData?.projects ?? []).filter(p => p?.id);
  const selectedProjectId = watch('projectId') || routeProjectId;

  return (
    <FormDrawer
      open
      title={t('projects.transcripts.ingest.title.create')}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <Button type="button" variant="outline" className="flex-1" disabled={isSaving} onClick={onClose}>
            {t('buttons.cancel')}
          </Button>
          <Button type="submit" className="flex-1" disabled={isSaving}>
            {isSaving ? t('buttons.creating') : t('buttons.create')}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {!routeProjectId ? (
          <Controller
            name="projectId"
            control={control}
            render={({ field, fieldState }) => (
              <FormField label={t('projects.transcripts.ingest.fields.project')} error={fieldState.error?.message}>
                <select
                  {...field}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                >
                  <option value="">{t('projects.transcripts.ingest.placeholders.project')}</option>
                  {projectOptions.map(project => (
                    <option key={project?.id} value={project?.id ?? ''}>
                      {project?.name ?? project?.id}
                    </option>
                  ))}
                </select>
              </FormField>
            )}
          />
        ) : (
          <input type="hidden" value={selectedProjectId} {...(control.register('projectId') as never)} />
        )}

        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <FormField label={t('projects.transcripts.ingest.fields.title')} error={fieldState.error?.message}>
              <Input {...field} placeholder={t('projects.transcripts.ingest.placeholders.title')} />
            </FormField>
          )}
        />
        <Controller
          name="intervieweeName"
          control={control}
          render={({ field }) => (
            <FormField label={t('projects.transcripts.ingest.fields.intervieweeName')}>
              <Input {...field} placeholder={t('projects.transcripts.ingest.placeholders.intervieweeName')} />
            </FormField>
          )}
        />
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <FormField label={t('projects.transcripts.ingest.fields.language')}>
              <Input {...field} placeholder={t('projects.transcripts.ingest.placeholders.language')} />
            </FormField>
          )}
        />
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <FormField label={t('projects.transcripts.ingest.fields.notes')}>
              <TextField
                {...field}
                multiline
                rows={3}
                placeholder={t('projects.transcripts.ingest.placeholders.notes')}
              />
            </FormField>
          )}
        />
        <Controller
          name="srt"
          control={control}
          render={({ field, fieldState }) => (
            <FormField label={t('projects.transcripts.ingest.fields.srt')} error={fieldState.error?.message}>
              <TextField
                {...field}
                multiline
                rows={6}
                placeholder={t('projects.transcripts.ingest.placeholders.srt')}
              />
            </FormField>
          )}
        />
      </div>
    </FormDrawer>
  );
};

const FormField = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <span className="text-sm font-medium text-muted-foreground">{label}</span>
    {children}
    {error ? <p className="text-xs text-destructive">{error}</p> : null}
  </div>
);

export default TranscriptUpsert;
