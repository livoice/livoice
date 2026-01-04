import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, type ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import FormDrawer from '@/components/FormDrawer/FormDrawer';
import ProjectChatPanel from '@/containers/Chat/ProjectChatPanel';
import { useIngestTranscriptMutation, useProjectTranscriptsQuery } from '@/gql/generated';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { TextField } from '@/ui/text-field';

type FormValues = {
  title: string;
  language: string;
  notes: string;
  srt: string;
};

const defaultValues: FormValues = {
  title: '',
  language: '',
  notes: '',
  srt: ''
};

export type ProjectTranscriptsProps = {
  projectId: string;
  projectName?: string | null;
};

const formatSpeakerNames = (speakerActors?: { name?: string | null }[] | null) => {
  const names = (speakerActors ?? []).map(({ name }) => name).filter(Boolean);
  if (!names.length) return '—';
  return names.join(', ');
};

export default function ProjectTranscripts({ projectId, projectName }: ProjectTranscriptsProps) {
  const { t } = useTranslation('common');
  const toast = useToast();
  const { data, loading, refetch } = useProjectTranscriptsQuery({
    variables: { projectId },
    skip: !projectId
  });
  const transcripts = data?.project?.transcripts ?? [];
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        title: z.string().trim().min(1, t('errors.required')),
        language: z.string().trim().optional(),
        notes: z.string().trim().optional(),
        srt: z.string().trim().min(1, t('errors.required'))
      }),
    [t]
  );

  const resolver = useMemo(() => zodResolver(schema as never), [schema]);
  const { control, handleSubmit, reset } = useForm<FormValues>({ defaultValues, resolver });

  const [ingestTranscript, { loading: isIngesting }] = useIngestTranscriptMutation({
    onCompleted: () => {
      toast.showToast(t('projects.transcripts.ingest.success'), 'success');
      void refetch();
      reset(defaultValues);
      setDrawerOpen(false);
    },
    onError: error => {
      toast.showToast(error?.message || t('errors.somethingWentWrong'), 'error');
    }
  });

  const onSubmit = (values: FormValues) => {
    void ingestTranscript({
      variables: {
        input: {
          projectId,
          title: values.title.trim(),
          language: values.language?.trim() || null,
          notes: values.notes?.trim() || null,
          srt: values.srt
        }
      }
    });
  };

  if (loading) {
    return <Card>{t('transcriptStatus.loading')}</Card>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
            {t('projects.transcripts.title', { project: projectName ?? '' })}
          </p>
          <p className="text-sm text-slate-500">{t('projects.transcripts.subtitle', { count: transcripts.length })}</p>
        </div>
        <Button type="button" onClick={() => setDrawerOpen(true)}>
          {t('projects.transcripts.ingest.title.create')}
        </Button>
      </div>
      {transcripts.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {transcripts.map(transcript => (
            <Card key={transcript.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">{transcript.title || 'Untitled'}</h3>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {t('fields.chunks')}: {transcript.segmentsCount ?? 0}
                </span>
              </div>
            <p className="text-sm text-slate-500">{formatSpeakerNames(transcript.speakerActors)}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {new Date(transcript.createdAt ?? Date.now()).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-sm text-slate-500">
          {t('projects.transcripts.empty', { project: projectName ?? '' })}
        </Card>
      )}

      <FormDrawer
        open={isDrawerOpen}
        title={t('projects.transcripts.ingest.title.create')}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit(onSubmit)}
        actions={
          <>
            <Button type="button" variant="outline" className="flex-1" onClick={() => setDrawerOpen(false)}>
              {t('buttons.cancel')}
            </Button>
            <Button type="submit" className="flex-1" disabled={isIngesting}>
              {isIngesting ? t('buttons.creating') : t('buttons.create')}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <FormField label={t('projects.transcripts.ingest.fields.title')} error={fieldState.error?.message}>
                <TextField {...field} placeholder={t('projects.transcripts.ingest.placeholders.title')} />
              </FormField>
            )}
          />
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <FormField label={t('projects.transcripts.ingest.fields.language')}>
                <TextField {...field} placeholder={t('projects.transcripts.ingest.placeholders.language')} />
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
      <ProjectChatPanel projectId={projectId} projectName={projectName} />
    </div>
  );
}

const FormField = ({ label, error, children }: { label: string; error?: string; children: ReactNode }) => (
  <div className="space-y-1">
    <span className="text-sm font-medium text-muted-foreground">{label}</span>
    {children}
    {error ? <p className="text-xs text-destructive">{error}</p> : null}
  </div>
);
