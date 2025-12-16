import { useApolloClient } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';
import FormDrawer from '@/components/FormDrawer/FormDrawer';
import {
  SourceTypeType,
  SourcesDocument,
  useCreateSourceMutation,
  useDeleteSourceMutation,
  useSourceQuery,
  useUpdateSourceMutation
} from '@/gql/generated';
import { useToast } from '@/hooks/useToast';
import { toSources } from '@/services/linker';
import { Button, TextField } from '@/ui';
import { FormField } from '@/ui/form-field';
import { CronBuilder } from '@vpfaiz/cron-builder-ui';

type SourceFormValues = {
  type: SourceTypeType | '';
  name: string;
  url: string;
  importCronExpression: string;
};

const defaultValues: SourceFormValues = {
  type: '',
  name: '',
  url: '',
  importCronExpression: ''
};

const typeOptions: { value: SourceTypeType; label: string }[] = [
  { value: SourceTypeType.YoutubeChannel, label: 'YouTube Channel' }
];

export default function SourceUpsert() {
  const { sourceId = '' } = useParams<{ sourceId: string }>();
  const isEditMode = Boolean(sourceId);
  const navigate = useNavigate();
  const { t } = useTranslation('common', { keyPrefix: 'sources.upsert' });
  const { t: tCommon } = useTranslation('common');
  const apolloClient = useApolloClient();
  const { showToast } = useToast();

  const schema = useMemo(
    () =>
      z.object({
        type: z
          .union([z.nativeEnum(SourceTypeType), z.literal('')])
          .refine(value => value !== '', t('errors.typeRequired')),
        name: z.string().trim().min(1, t('errors.nameRequired')),
        url: z.string().trim().url(t('errors.urlInvalid')),
        importCronExpression: z.string().trim().default('')
      }),
    [t]
  );

  const { control, handleSubmit, reset } = useForm<SourceFormValues>({
    defaultValues,
    resolver: zodResolver(schema) as never
  });

  const {
    data: sourceData,
    loading: isLoading,
    refetch
  } = useSourceQuery({
    variables: { id: sourceId },
    skip: !isEditMode
  });

  const onClose = () => {
    navigate(toSources());
    reset(defaultValues);
  };

  const onCompleted = () => {
    void apolloClient.refetchQueries({ include: [SourcesDocument] });
    if (isEditMode) void refetch();
    onClose();
    reset(defaultValues);
  };

  const [createSource, { loading: isCreating }] = useCreateSourceMutation({ onCompleted });
  const [updateSource, { loading: isUpdating }] = useUpdateSourceMutation({ onCompleted });
  const [deleteSource, { loading: isDeleting }] = useDeleteSourceMutation({
    onCompleted: () => {
      setDeleteDialogOpen(false);
      onCompleted();
    },
    onError: error => showToast(error?.message || tCommon('errors.somethingWentWrong'), 'error')
  });

  const { source } = sourceData ?? {};
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (!source) return;
    reset({
      type: source.type ?? '',
      name: source.name ?? '',
      url: source.url ?? '',
      importCronExpression: source.importCronExpression ?? ''
    });
  }, [source, reset]);

  const onSubmit = (values: SourceFormValues) => {
    const handler = isEditMode ? updateSource : createSource;
    if (isEditMode && !sourceId) return;
    void handler({
      variables: {
        id: sourceId,
        data: {
          type: values.type as SourceTypeType,
          name: values.name.trim(),
          url: values.url.trim(),
          importCronExpression: values.importCronExpression?.trim() || undefined
        }
      }
    });
  };

  const handleConfirmDelete = () => {
    if (!sourceId) return;
    void deleteSource({ variables: { id: sourceId } });
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
            {isEditMode ? (
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
            name="type"
            control={control}
            render={({ field, fieldState }) => (
              <FormField label={t('fields.type')} error={fieldState.error?.message}>
                <select
                  {...field}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                >
                  <option value="">{t('placeholders.type')}</option>
                  {typeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormField>
            )}
          />

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
            name="url"
            control={control}
            render={({ field, fieldState }) => (
              <FormField label={t('fields.url')} error={fieldState.error?.message}>
                <TextField {...field} placeholder={t('placeholders.url')} />
              </FormField>
            )}
          />

          <Controller
            name="importCronExpression"
            control={control}
            render={({ field, fieldState }) => (
              <FormField label={t('fields.cronExpression')} error={fieldState.error?.message}>
                <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <CronBuilder
                    defaultValue={field.value || undefined}
                    onChange={value => field.onChange(value)}
                    className="w-full"
                  />
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
