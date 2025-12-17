import { useApolloClient } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';
import FormDrawer from '@/components/FormDrawer/FormDrawer';
import {
  ProjectsDocument,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useProjectQuery,
  useSourcesQuery,
  useUpdateProjectMutation
} from '@/gql/generated';
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from '@/hooks/useToast';
import { toProjects } from '@/services/linker';
import { Button, TextField } from '@/ui';
import { FormField } from '@/ui/form-field';

type ProjectFormValues = {
  name: string;
  description: string;
  sourceIds: string[];
};

const defaultValues: ProjectFormValues = {
  name: '',
  description: '',
  sourceIds: []
};

export default function ProjectUpsert() {
  const { projectId = '' } = useParams<{ projectId: string }>();
  const isEditMode = Boolean(projectId);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('common', { keyPrefix: 'projects.upsert' });
  const { t: tCommon } = useTranslation('common');
  const apolloClient = useApolloClient();
  const { showToast } = useToast();
  const { canEditOrg } = useAuth();
  const { data: sourcesData } = useSourcesQuery();

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(1, t('errors.nameRequired')),
        description: z.string().optional(),
        sourceIds: z.array(z.string()).optional()
      }),
    [t]
  );

  const resolver = useMemo(() => zodResolver(schema as never), [schema]);
  const { control, handleSubmit, reset } = useForm<ProjectFormValues>({ defaultValues, resolver });

  const {
    data: projectData,
    loading: isLoading,
    refetch
  } = useProjectQuery({
    variables: { id: projectId },
    skip: !isEditMode
  });

  const onClose = useCallback(() => {
    navigate(toProjects());
    reset(defaultValues);
  }, [navigate, reset]);

  const onCompleted = useCallback(() => {
    void apolloClient.refetchQueries({ include: [ProjectsDocument] });
    if (isEditMode) void refetch();
    onClose();
    reset(defaultValues);
  }, [apolloClient, isEditMode, onClose, refetch, reset]);

  const [createProject, { loading: isCreating }] = useCreateProjectMutation({ onCompleted });
  const [updateProject, { loading: isUpdating }] = useUpdateProjectMutation({ onCompleted });
  const [deleteProject, { loading: isDeleting }] = useDeleteProjectMutation({
    onCompleted: () => {
      setDeleteDialogOpen(false);
      onCompleted();
    },
    onError: error => {
      showToast(error?.message || tCommon('errors.somethingWentWrong'), 'error');
    }
  });

  const { project } = projectData ?? {};
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const showDeleteButton = useMemo(() => isEditMode && canEditOrg, [canEditOrg, isEditMode]);

  useEffect(() => {
    if (!project) return;
    reset({
      name: project.name ?? '',
      description: project.description ?? '',
      sourceIds: project.sources?.map(({ id }) => id ?? '').filter(Boolean) ?? []
    });
  }, [project, reset]);

  useEffect(() => {
    if (isEditMode || canEditOrg) return;
    onClose();
  }, [canEditOrg, isEditMode, onClose]);

  const onSubmit = (values: ProjectFormValues) => {
    const handler = isEditMode ? updateProject : createProject;
    if (isEditMode && !projectId) return;
    if (!isEditMode && !canEditOrg) return;

    const sourceRelations = (values.sourceIds ?? []).map(id => ({ id }));
    const sourcesPayload = sourceRelations.length
      ? isEditMode
        ? { set: sourceRelations }
        : { connect: sourceRelations }
      : undefined;

    void handler({
      variables: {
        id: projectId,
        data: {
          name: values.name.trim(),
          description: values.description?.trim() || '',
          ...(sourcesPayload ? { sources: sourcesPayload } : {})
        }
      }
    });
  };

  const handleConfirmDelete = () => {
    if (!projectId) return;
    void deleteProject({ variables: { id: projectId } });
  };

  return (
    <>
      <FormDrawer
        open
        title={t(isEditMode ? 'title.edit' : 'title.create')}
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              disabled={isCreating || isUpdating || isLoading || isDeleting}
              onClick={onClose}
            >
              {tCommon('buttons.cancel')}
            </Button>
            {showDeleteButton ? (
              <div className="flex flex-1 flex-col">
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full"
                  disabled={isCreating || isUpdating || isLoading || isDeleting}
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  {tCommon(isDeleting ? 'buttons.deleting' : 'buttons.delete')}
                </Button>
                <span className="mt-1 text-center text-xs text-muted-foreground">{t('deleteHint')}</span>
              </div>
            ) : null}
            <Button type="submit" className="flex-1" disabled={isCreating || isUpdating || isLoading || isDeleting}>
              {tCommon(
                isEditMode
                  ? isUpdating
                    ? 'buttons.updating'
                    : 'buttons.update'
                  : isCreating
                    ? 'buttons.creating'
                    : 'buttons.create'
              )}
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <FormField label={t('fields.name')} error={fieldState.error?.message}>
                <TextField {...field} placeholder={t('placeholders.name')} />
              </FormField>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <FormField label={t('fields.description')} error={fieldState.error?.message}>
                <TextField {...field} multiline rows={4} placeholder={t('placeholders.description')} />
              </FormField>
            )}
          />
          <Controller
            name="sourceIds"
            control={control}
            render={({ field }) => (
              <FormField label={t('fields.sources')}>
                <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-3">
                  {(sourcesData?.sources ?? []).map(source =>
                    source?.id ? (
                      <label key={source.id} className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          value={source.id}
                          checked={field.value?.includes(source.id) ?? false}
                          onChange={event => {
                            const checked = event.target.checked;
                            const value = event.target.value;
                            if (checked) field.onChange([...(field.value ?? []), value]);
                            else field.onChange((field.value ?? []).filter((id: string) => id !== value));
                          }}
                        />
                        <span>{source.name || source.url || source.id}</span>
                      </label>
                    ) : null
                  )}
                  {!(sourcesData?.sources?.length ?? 0) ? (
                    <p className="text-xs text-slate-500">{t('placeholders.noSources')}</p>
                  ) : null}
                </div>
              </FormField>
            )}
          />
        </div>
      </FormDrawer>
      <ConfirmDialog
        open={isDeleteDialogOpen}
        title={tCommon('buttons.delete')}
        description={t('confirmations.delete')}
        confirmLabel={tCommon(isDeleting ? 'buttons.deleting' : 'buttons.delete')}
        cancelLabel={tCommon('buttons.cancel')}
        variant="delete"
        isLoading={isDeleting}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
