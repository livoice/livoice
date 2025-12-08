import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import FormDrawer from '@/components/FormDrawer/FormDrawer';
import {
  GetAllUsersDocument,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useProjectsQuery,
  UserRoleType,
  useUpdateUserMutation
} from '@/gql/generated';
import { useAuth } from '@/hooks/auth/useAuth';
import { canEditUserByRole } from '@/hooks/auth/userRole';
import { useToast } from '@/hooks/useToast';
import { toUsers } from '@/services/linker';
import { Button, Input } from '@/ui';

const roleLabels: Record<UserRoleType, string> = {
  [UserRoleType.User]: 'User',
  [UserRoleType.ProjectAdmin]: 'Project Admin',
  [UserRoleType.OrgAdmin]: 'Organization Admin',
  [UserRoleType.OrgOwner]: 'Organization Owner',
  [UserRoleType.God]: 'System Admin'
};

const defaultValues = {
  email: '',
  firstName: '',
  lastName: '',
  role: UserRoleType.User,
  projectId: '',
  isActive: true
};

type UserFormValues = typeof defaultValues;

const allowedRolesByAdmin = (adminRole?: UserRoleType | null): UserRoleType[] => {
  const base = [UserRoleType.User];
  if (!adminRole) return base;
  if (adminRole === UserRoleType.ProjectAdmin) return [...base, UserRoleType.ProjectAdmin];
  if (adminRole === UserRoleType.OrgAdmin) return [...base, UserRoleType.ProjectAdmin, UserRoleType.OrgAdmin];
  if (adminRole === UserRoleType.OrgOwner || adminRole === UserRoleType.God)
    return [...base, UserRoleType.ProjectAdmin, UserRoleType.OrgAdmin, UserRoleType.OrgOwner];
  return base;
};

export default function UserUpsert() {
  const { userId = '' } = useParams<{ userId: string }>();
  const isEditMode = Boolean(userId);
  const navigate = useNavigate();
  const { t } = useTranslation('common', { keyPrefix: isEditMode ? 'users.edit' : 'users.create' });
  const { t: tCommon } = useTranslation('common');
  const { user: authUser, isSelf } = useAuth();
  const { showToast } = useToast();

  const schema = useMemo(
    () =>
      z.object({
        email: isEditMode
          ? z.string().optional()
          : z.string().trim().min(1, t('errors.emailRequired')).email(t('errors.emailInvalid')),
        firstName: z.string().trim().optional(),
        lastName: z.string().trim().optional(),
        role: z.nativeEnum(UserRoleType),
        projectId: z.string().trim().min(1, t('errors.projectRequired')),
        isActive: z.boolean()
      }),
    [isEditMode, t]
  );

  const { control, handleSubmit, reset } = useForm<UserFormValues>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const {
    data: userData,
    loading: isLoading,
    called
  } = useGetUserByIdQuery({
    variables: { id: userId },
    skip: !isEditMode
  });
  const { data: projectsData } = useProjectsQuery();

  const handleClose = useCallback(() => {
    navigate(toUsers());
    reset(defaultValues);
  }, [navigate, reset]);

  const roleOptions = useMemo(() => {
    const allowed = allowedRolesByAdmin(authUser?.role);
    const baseOptions = allowed.map(value => ({ value, label: roleLabels[value] ?? value }));
    const currentRole = userData?.user?.role;
    if (isEditMode && currentRole && !baseOptions.some(option => option.value === currentRole))
      return [{ value: currentRole, label: roleLabels[currentRole] ?? currentRole }, ...baseOptions];
    return baseOptions;
  }, [authUser?.role, isEditMode, userData?.user?.role]);

  useEffect(() => {
    if (isEditMode) {
      if (!userData?.user) return;
      reset({
        email: userData.user.email ?? '',
        firstName: userData.user.firstName ?? '',
        lastName: userData.user.lastName ?? '',
        role: userData.user.role ?? UserRoleType.User,
        projectId: userData.user.project?.id ?? '',
        isActive: userData.user.isActive ?? true
      });
      return;
    }
    reset(defaultValues);
  }, [isEditMode, userData?.user, reset]);

  useEffect(() => {
    if (!isEditMode || !called || isLoading) return;
    if (canEditUserByRole(authUser, userData?.user)) return;
    handleClose();
  }, [isEditMode, called, isLoading, userData?.user, authUser, handleClose]);

  const handleCompleted = () => {
    handleClose();
  };

  const [createUser, { loading: isCreating }] = useCreateUserMutation({
    refetchQueries: [{ query: GetAllUsersDocument }],
    onCompleted: handleCompleted
  });
  const [updateUser, { loading: isUpdating }] = useUpdateUserMutation({
    refetchQueries: [{ query: GetAllUsersDocument }],
    onCompleted: handleCompleted
  });

  const isSubmitting = isEditMode ? isUpdating : isCreating;
  const isLoadingData = isEditMode && isLoading;
  const isEditingSelf = isSelf(userData?.user);

  const onSubmit = (values: UserFormValues) => {
    if (!authUser?.orgId && !isEditMode) {
      showToast(tCommon('errors.somethingWentWrong'), 'error');
      return;
    }

    const payload = {
      firstName: values.firstName?.trim() || null,
      lastName: values.lastName?.trim() || null,
      role: values.role,
      project: { connect: { id: values.projectId } },
      isActive: values.isActive
    };

    if (isEditMode) {
      void updateUser({
        variables: {
          id: userId,
          data: payload
        }
      });
      return;
    }

    void createUser({
      variables: {
        data: {
          ...payload,
          email: values.email.trim(),
          org: { connect: { id: authUser?.orgId ?? '' } }
        }
      }
    });
  };

  return (
    <FormDrawer
      open
      title={t(isEditMode ? 'title.edit' : 'title.create')}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <Button type="button" variant="outline" className="flex-1" onClick={handleClose}>
            {tCommon('buttons.cancel')}
          </Button>
          <Button type="submit" className="flex-1" disabled={isSubmitting || isLoadingData || isEditingSelf}>
            {isEditMode
              ? tCommon(isSubmitting ? 'buttons.updating' : 'buttons.update')
              : tCommon(isSubmitting ? 'buttons.creating' : 'buttons.create')}
          </Button>
        </>
      }
    >
      {isLoadingData ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-4">
          {isEditMode ? (
            <ReadOnlyField label={t('fields.email')} value={userData?.user?.email ?? '—'} />
          ) : (
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <FormField label={t('fields.email')} error={fieldState.error?.message}>
                  <Input {...field} type="email" placeholder="jane@example.com" />
                </FormField>
              )}
            />
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <FormField label={t('fields.firstName')}>
                  <Input {...field} placeholder={t('placeholders.firstName')} />
                </FormField>
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <FormField label={t('fields.lastName')}>
                  <Input {...field} placeholder={t('placeholders.lastName')} />
                </FormField>
              )}
            />
          </div>

          <Controller
            name="role"
            control={control}
            render={({ field, fieldState }) => (
              <FormField label={t('fields.role')} error={fieldState.error?.message}>
                <select
                  {...field}
                  disabled={isEditingSelf}
                  className="h-11 w-full rounded-xl border border-border bg-white/80 px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                >
                  {roleOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormField>
            )}
          />

          <Controller
            name="projectId"
            control={control}
            render={({ field, fieldState }) => (
              <FormField label={t('fields.project')} error={fieldState.error?.message}>
                <select
                  {...field}
                  className="h-11 w-full rounded-xl border border-border bg-white/80 px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">{t('placeholders.selectProject')}</option>
                  {(projectsData?.projects ?? []).map(project => (
                    <option key={project?.id} value={project?.id ?? ''}>
                      {project?.name}
                    </option>
                  ))}
                </select>
              </FormField>
            )}
          />

          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormField label={t('fields.status')}>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={event => field.onChange(event.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span>{field.value ? t('users.active') : t('users.deactivated')}</span>
                </label>
              </FormField>
            )}
          />
        </div>
      )}
    </FormDrawer>
  );
}

const FormField = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    {children}
    {error ? <p className="text-xs text-destructive">{error}</p> : null}
  </div>
);

const ReadOnlyField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
    <p className="rounded-xl border border-border bg-white/70 p-3 text-sm font-medium text-foreground">{value}</p>
  </div>
);

const Spinner = () => (
  <div className="flex min-h-[200px] items-center justify-center">
    <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
  </div>
);
