import { useApolloClient } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInCalendarDays, format } from 'date-fns';
import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import FormDrawer from '@/components/FormDrawer/FormDrawer';
import {
  GetAllUsersDocument,
  useCreateManualAllocationAdjustmentMutation,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useLocationsQuery,
  UserRoleType,
  useTimePoliciesQuery,
  useUpdateUserMutation,
  useUserAllocationBalanceQuery,
  useUserAllocationEventLogQuery,
  type TimePoliciesQuery
} from '@/gql/generated';
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/cn';
import { canEditUserByRole } from '@/providers/auth/userRole';
import { toUsers } from '@/services/linker';
import {
  Button,
  Input,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TextField
} from '@/ui';
import { normalizeForForm } from '@/utils/normalizeForForm';

type PolicyPreviewRow = {
  id: string;
  policyName: string;
  timeTypeName: string;
  annualDays: number | null;
  proratedDays: number | null;
  isAllocationManaged: boolean;
};

const formatDateForInput = (value?: string | null): string => {
  if (!value) return '';
  const [datePart] = value.split('T');
  return datePart ?? '';
};

const toDateAtUtcMidnight = (value?: string | null): Date | null => {
  if (!value) return null;
  const normalizedValue = value.includes('T') ? value : `${value}T00:00:00.000Z`;
  const parsedDate = new Date(normalizedValue);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

const getProratedAllocation = (startDateValue: string, year: number, annualAllocation: number = 0): number => {
  const parsedStartDate = toDateAtUtcMidnight(startDateValue);
  if (!parsedStartDate) return 0;

  const yearStart = new Date(Date.UTC(year, 0, 1));
  const yearEnd = new Date(Date.UTC(year, 11, 31));

  if (parsedStartDate > yearEnd) return 0;

  const effectiveStart = parsedStartDate < yearStart ? yearStart : parsedStartDate;
  const totalDaysInYear = differenceInCalendarDays(yearEnd, yearStart) + 1;
  const daysRemaining = differenceInCalendarDays(yearEnd, effectiveStart) + 1;

  if (totalDaysInYear <= 0 || daysRemaining <= 0) return 0;

  const prorated = (annualAllocation * daysRemaining) / totalDaysInYear;
  return Number(prorated.toFixed(2));
};

type UserFormValues = {
  email?: string;
  role: UserRoleType;
  location: string;
  startDate: string;
};

const userRoleOptions = [
  { value: UserRoleType.User, label: 'User' },
  { value: UserRoleType.LocationAdmin, label: 'Location Admin' },
  { value: UserRoleType.OrgAdmin, label: 'Organization Admin' },
  { value: UserRoleType.OrgOwner, label: 'Organization Owner' },
  { value: UserRoleType.God, label: 'System Admin' }
];

const defaultValues: UserFormValues = {
  email: '',
  role: UserRoleType.User,
  location: '',
  startDate: ''
};

export default function UserUpsert() {
  const { userId = '' } = useParams<{ userId: string }>();
  const isEditMode = Boolean(userId);
  const navigate = useNavigate();
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('common', { keyPrefix: isEditMode ? 'users.edit' : 'users.create' });
  const apolloClient = useApolloClient();
  const { user: authUser } = useAuth();
  const emailFieldId = useId();
  const roleFieldId = useId();
  const locationFieldId = useId();
  const startDateFieldId = useId();
  const todayInputValue = useMemo(() => new Date().toISOString().split('T')[0], []);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const schema = useMemo(
    () =>
      isEditMode
        ? z.object({
            role: z.nativeEnum(UserRoleType),
            location: z.string().min(1, t('errors.locationRequired')),
            startDate: z.string().trim().min(1, t('errors.startDateRequired'))
          })
        : z.object({
            email: z.string().trim().min(1, t('errors.emailRequired')).email(t('errors.emailInvalid')),
            role: z.nativeEnum(UserRoleType),
            location: z.string().min(1, t('errors.locationRequired')),
            startDate: z.string().trim().min(1, t('errors.startDateRequired'))
          }),
    [t, isEditMode]
  );

  const resolver = useMemo(() => zodResolver(schema as never) as Resolver<UserFormValues>, [schema]);

  const { control, handleSubmit, reset, watch } = useForm<UserFormValues>({
    defaultValues,
    resolver,
    mode: 'onChange'
  });

  const {
    data: userData,
    loading: isLoading,
    called,
    refetch
  } = useGetUserByIdQuery({
    variables: { id: userId },
    skip: !isEditMode
  });

  const { data: locationsData } = useLocationsQuery();
  const { data: policiesData } = useTimePoliciesQuery();
  const watchedLocationId = watch('location');
  const watchedStartDate = watch('startDate');
  const locationPolicies = useMemo(() => {
    if (!watchedLocationId) return [];
    return (policiesData?.timePolicies ?? []).filter(
      (policy): policy is NonNullable<NonNullable<TimePoliciesQuery['timePolicies']>[number]> =>
        Boolean(policy?.id) && Boolean(policy.locations?.some(location => location?.id === watchedLocationId))
    );
  }, [policiesData?.timePolicies, watchedLocationId]);
  const proratedPreview = useMemo(() => {
    if (!watchedStartDate || !locationPolicies.length) return [];
    return locationPolicies
      .map(policy => ({
        id: policy.id,
        policyName: policy.name || tCommon('optionLabels.untitledPolicy'),
        timeTypeName: policy.timeType?.name || tCommon('optionLabels.untitledTimeType'),
        annualDays: policy.isAllocationManaged === false ? null : (policy.timePolicyAllocations?.[0]?.allocation ?? 0),
        proratedDays:
          policy.isAllocationManaged === false
            ? null
            : getProratedAllocation(watchedStartDate, currentYear, policy.timePolicyAllocations?.[0]?.allocation ?? 0),
        isAllocationManaged: policy.isAllocationManaged !== false
      }))
      .filter((row): row is PolicyPreviewRow => Boolean(row));
  }, [locationPolicies, watchedStartDate, currentYear, tCommon]);
  const [allocationModalPolicy, setAllocationModalPolicy] = useState<{
    timePolicyId: string;
    policyName: string;
  } | null>(null);
  const previewBody = useMemo(() => {
    if (!watchedStartDate || !watchedLocationId)
      return <p className="text-sm text-muted-foreground">{tCommon('users.preview.missingInputs')}</p>;
    if (!locationPolicies.length)
      return <p className="text-sm text-muted-foreground">{tCommon('users.preview.noPolicies')}</p>;
    if (!proratedPreview.length)
      return <p className="text-sm text-muted-foreground">{tCommon('users.preview.noData')}</p>;

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-xs font-semibold uppercase text-muted-foreground sm:grid-cols-4">
          <span>{tCommon('users.preview.columns.policy')}</span>
          <span>{tCommon('users.preview.columns.timeType')}</span>
          <span className="text-right sm:text-right">{tCommon('users.preview.columns.annual')}</span>
          <span className="text-right sm:text-right">{tCommon('users.preview.columns.prorated')}</span>
        </div>
        <div className="space-y-3">
          {proratedPreview.map(row => (
            <div key={row.id} className="grid grid-cols-2 items-center gap-3 text-sm text-foreground sm:grid-cols-4">
              <span className="font-medium">{row.policyName}</span>
              <span>{row.timeTypeName}</span>
              <span className="text-right">
                {row.isAllocationManaged
                  ? (row.annualDays ?? 0).toLocaleString()
                  : tCommon('users.preview.unlimitedAllowance')}
              </span>
              <div className="flex items-center justify-end gap-2">
                <span>
                  {row.isAllocationManaged
                    ? (row.proratedDays ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })
                    : tCommon('users.preview.unlimitedAllowance')}
                </span>
                {isEditMode ? (
                  <button
                    type="button"
                    onClick={() => setAllocationModalPolicy({ timePolicyId: row.id, policyName: row.policyName })}
                    className="text-xs font-medium text-primary underline-offset-2 hover:underline"
                  >
                    {tCommon('users.preview.viewAllowance')}
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }, [watchedStartDate, watchedLocationId, locationPolicies.length, proratedPreview, isEditMode, tCommon]);

  const onClose = useCallback(() => {
    navigate(toUsers());
    reset(defaultValues);
  }, [navigate, reset]);

  const onCompleted = useCallback(() => {
    void apolloClient.refetchQueries({ include: [GetAllUsersDocument] });
    if (isEditMode) void refetch();
    onClose();
    reset(defaultValues);
  }, [apolloClient, isEditMode, refetch, onClose, reset]);

  const [createUser, { loading: isCreating }] = useCreateUserMutation({ onCompleted });
  const [updateUser, { loading: isUpdating }] = useUpdateUserMutation({ onCompleted });

  const { user } = userData ?? {};

  const { isSelf } = useAuth();
  const isEditingSelf = isSelf(user);

  const canEditOwnLocation = useMemo(() => {
    if (!isEditingSelf) return false;
    return authUser?.role === UserRoleType.OrgAdmin || authUser?.role === UserRoleType.OrgOwner;
  }, [isEditingSelf, authUser?.role]);

  // Filter available roles based on current user's role
  // LOCATION_ADMIN: USER, LOCATION_ADMIN
  // ORG_ADMIN: USER, LOCATION_ADMIN, ORG_ADMIN
  // ORG_OWNER: USER, LOCATION_ADMIN, ORG_ADMIN, ORG_OWNER
  // GOD: not assignable by anyone
  const { availableRoles, allowedRoles } = useMemo(() => {
    if (!authUser?.role) {
      const filtered = userRoleOptions.filter(opt => opt.value !== UserRoleType.God);
      return { availableRoles: filtered, allowedRoles: [] };
    }

    const allowed: UserRoleType[] = [UserRoleType.User];

    if (authUser.role === UserRoleType.LocationAdmin) {
      allowed.push(UserRoleType.LocationAdmin);
    } else if (authUser.role === UserRoleType.OrgAdmin) {
      allowed.push(UserRoleType.LocationAdmin, UserRoleType.OrgAdmin);
    } else if (authUser.role === UserRoleType.OrgOwner) {
      allowed.push(UserRoleType.LocationAdmin, UserRoleType.OrgAdmin, UserRoleType.OrgOwner);
    }
    // GOD role is never assignable via UI

    // In edit mode, include the current user's role even if not in allowed roles
    // This ensures the form displays correctly, but backend will prevent invalid changes
    let available = userRoleOptions.filter(option => allowed.includes(option.value));
    if (isEditMode && user?.role && !allowed.includes(user.role)) {
      const currentRoleOption = userRoleOptions.find(opt => opt.value === user.role);
      if (currentRoleOption) {
        available = [currentRoleOption, ...available];
      }
    }

    return { availableRoles: available, allowedRoles: allowed };
  }, [authUser?.role, isEditMode, user?.role]);

  // Filter available locations based on admin level
  const availableLocations = useMemo(() => {
    const allLocations = locationsData?.locations ?? [];
    if (!authUser?.role) return allLocations;

    // Location Admins can only see their own location
    if (authUser.role === UserRoleType.LocationAdmin && authUser.locationId) {
      return allLocations.filter(loc => loc?.id === authUser.locationId);
    }

    // Org Admins and above can see all locations in their org
    return allLocations;
  }, [locationsData?.locations, authUser?.role, authUser?.locationId]);

  useEffect(() => {
    if (isEditMode) {
      if (!user) return;
      reset(
        normalizeForForm<UserFormValues>({
          role: user.role ?? UserRoleType.User,
          location: user.location?.id ?? '',
          startDate: formatDateForInput(user.startDate)
        }) || defaultValues
      );
      return;
    }

    const baseCreateValues: UserFormValues = {
      ...defaultValues,
      location: authUser?.role === UserRoleType.LocationAdmin && authUser.locationId ? authUser.locationId : '',
      startDate: todayInputValue
    };
    reset(baseCreateValues);
  }, [isEditMode, user, authUser, reset, todayInputValue]);

  useEffect(() => {
    if (!isEditMode || isLoading || !called || canEditUserByRole(authUser, user)) return;
    onClose();
  }, [isEditMode, called, isLoading, user, authUser, onClose]);

  const onSubmit = (values: UserFormValues) => {
    const startDateIso = toDateAtUtcMidnight(values.startDate)?.toISOString();
    const handler = isEditMode ? updateUser : createUser;

    void handler({
      variables: {
        id: userId,
        data: {
          email: isEditMode ? undefined : (values.email?.trim() ?? ''),
          role: values.role,
          org: isEditMode ? undefined : { connect: { id: authUser?.orgId } },
          location: values.location ? { connect: { id: values.location } } : undefined,
          startDate: startDateIso
        }
      }
    });
  };

  const handleActivate = () => {
    if (!userId) return;
    void updateUser({
      variables: {
        id: userId,
        data: {
          isActive: true
        }
      }
    });
  };

  const handleDeactivate = () => {
    if (!userId) return;
    void updateUser({
      variables: {
        id: userId,
        data: {
          isActive: false
        }
      }
    });
  };

  const isDeactivated = user?.isActive === false;
  const isLoadingData = isEditMode ? isLoading : false;
  const isSubmitting = isEditMode ? isUpdating : isCreating;

  if (isEditMode && isDeactivated)
    return (
      <FormDrawer
        open
        title={t('title.activate')}
        onClose={onClose}
        onSubmit={event => {
          event.preventDefault();
          handleActivate();
        }}
        actions={
          <>
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              {tCommon('buttons.cancel')}
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting || isLoadingData}>
              {isSubmitting ? tCommon('buttons.activating') : t('activate')}
            </Button>
          </>
        }
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="space-y-3">
            <ReadOnlyField label={t('userInfo.name')} value={user?.displayName ?? '—'} />
            <ReadOnlyField label={t('userInfo.email')} value={user?.email ?? '—'} />
            <ReadOnlyField
              label={t('userInfo.status')}
              value={t('deactivated')}
              valueClassName="text-destructive font-semibold"
            />
          </div>
        )}
      </FormDrawer>
    );

  return (
    <>
      <FormDrawer
        open
        title={t(isEditMode ? 'title.edit' : 'title.create')}
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        actions={
          <>
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              {tCommon('buttons.cancel')}
            </Button>
            {isEditMode ? (
              <Button
                type="button"
                variant="destructive"
                className="flex-1"
                disabled={isSubmitting || isLoadingData || isEditingSelf}
                onClick={handleDeactivate}
              >
                {t('deactivate')}
              </Button>
            ) : null}
            <Button type="submit" className="flex-1" disabled={isSubmitting || isLoadingData}>
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
              <>
                <ReadOnlyField label={t('userInfo.name')} value={user?.displayName ?? '—'} />
                <ReadOnlyField label={t('userInfo.email')} value={user?.email ?? '—'} />
              </>
            ) : (
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <FormField label={t('fields.email')} error={fieldState.error?.message} controlId={emailFieldId}>
                    <Input {...field} id={emailFieldId} type="email" placeholder="jane@example.com" />
                  </FormField>
                )}
              />
            )}
            <Controller
              name="role"
              control={control}
              render={({ field, fieldState }) => {
                const currentRoleAllowed = isEditMode && user?.role ? allowedRoles.includes(user.role) : true;
                return (
                  <FormField label={t('fields.role')} error={fieldState.error?.message} controlId={roleFieldId}>
                    <select
                      {...field}
                      id={roleFieldId}
                      disabled={(isEditMode && isEditingSelf) || (isEditMode && !currentRoleAllowed)}
                      className={cn(
                        'h-11 w-full rounded-xl border border-border bg-white/80 px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {availableRoles.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormField>
                );
              }}
            />
            <Controller
              name="location"
              control={control}
              render={({ field, fieldState }) => (
                <FormField label={t('fields.location')} error={fieldState.error?.message} controlId={locationFieldId}>
                  <select
                    {...field}
                    id={locationFieldId}
                    disabled={
                      (isEditMode && isEditingSelf && !canEditOwnLocation) ||
                      (!isEditMode && authUser?.role === UserRoleType.LocationAdmin)
                    }
                    className="h-11 w-full rounded-xl border border-border bg-white/80 px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                  >
                    {(isEditMode ? (locationsData?.locations ?? []) : availableLocations).map(location => (
                      <option key={location?.id} value={location?.id ?? ''}>
                        {location?.name}
                      </option>
                    ))}
                  </select>
                </FormField>
              )}
            />
            <Controller
              name="startDate"
              control={control}
              render={({ field, fieldState }) => (
                <FormField label={t('fields.startDate')} error={fieldState.error?.message} controlId={startDateFieldId}>
                  <Input {...field} id={startDateFieldId} type="date" />
                </FormField>
              )}
            />

            <div className="rounded-2xl border border-dashed border-border bg-white/60 p-4">
              <div className="mb-2 space-y-1">
                <p className="text-sm font-semibold text-foreground">{tCommon('users.preview.title')}</p>
                <p className="text-xs text-muted-foreground">
                  {tCommon('users.preview.subtitle', { year: currentYear })}
                </p>
              </div>
              {previewBody}
            </div>
          </div>
        )}
      </FormDrawer>
      {isEditMode && userId ? (
        <AllocationHistoryModal
          open={Boolean(allocationModalPolicy)}
          onClose={() => setAllocationModalPolicy(null)}
          userId={userId}
          policy={allocationModalPolicy}
        />
      ) : null}
    </>
  );
}

type AllocationHistoryModalProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  policy: { timePolicyId: string; policyName: string } | null;
};

function AllocationHistoryModal({ open, onClose, userId, policy }: AllocationHistoryModalProps) {
  const { t } = useTranslation('common');
  const { showToast } = useToast();
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [manualForm, setManualForm] = useState({
    amount: '',
    effectiveAt: format(new Date(), 'yyyy-MM-dd'),
    notes: ''
  });
  const [manualErrors, setManualErrors] = useState<{ amount?: string; effectiveAt?: string }>({});
  const yearFieldId = useId();
  const manualAmountFieldId = useId();
  const manualEffectiveAtFieldId = useId();
  const manualNotesFieldId = useId();

  useEffect(() => {
    setYear(new Date().getFullYear());
    setManualForm({
      amount: '',
      effectiveAt: format(new Date(), 'yyyy-MM-dd'),
      notes: ''
    });
    setManualErrors({});
  }, [policy?.timePolicyId]);

  const {
    data: balanceData,
    loading: isBalanceLoading,
    refetch: refetchBalance
  } = useUserAllocationBalanceQuery({
    variables: { userId, timePolicyId: policy?.timePolicyId ?? '', year },
    skip: !open || !policy
  });
  const {
    data: eventsData,
    loading: isEventsLoading,
    refetch: refetchEvents
  } = useUserAllocationEventLogQuery({
    variables: { userId, timePolicyId: policy?.timePolicyId ?? '', year },
    skip: !open || !policy
  });
  const [createManualAdjustment, { loading: isCreatingManualAdjustment }] =
    useCreateManualAllocationAdjustmentMutation();

  const balance = balanceData?.userAllocationBalance;
  const events = eventsData?.userAllocationEventLog ?? [];
  const canSubmitManual = Boolean(policy?.timePolicyId) && !isCreatingManualAdjustment;

  const handleManualFormChange = (key: 'amount' | 'effectiveAt' | 'notes', value: string) => {
    setManualForm(prev => ({ ...prev, [key]: value }));
    setManualErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const handleManualAdjustmentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!policy?.timePolicyId) return;

    const nextErrors: typeof manualErrors = {};
    if (!manualForm.amount.trim()) nextErrors.amount = t('users.allowanceModal.errors.amountRequired');
    if (!manualForm.effectiveAt) nextErrors.effectiveAt = t('users.allowanceModal.errors.effectiveAtRequired');

    const numericAmount = Number(manualForm.amount);
    if (!Number.isFinite(numericAmount)) nextErrors.amount = t('errors.wholeNumber');

    if (Object.keys(nextErrors).length) {
      setManualErrors(nextErrors);
      return;
    }

    try {
      await createManualAdjustment({
        variables: {
          userId,
          timePolicyId: policy.timePolicyId,
          amount: Math.round(numericAmount),
          effectiveAt: manualForm.effectiveAt,
          notes: manualForm.notes.trim() || undefined
        }
      });
      await Promise.all([refetchBalance(), refetchEvents()]);
      setManualForm({
        amount: '',
        effectiveAt: format(new Date(), 'yyyy-MM-dd'),
        notes: ''
      });
      setManualErrors({});
      showToast(t('users.allowanceModal.adjustmentSuccess'), 'success');
    } catch (error) {
      showToast((error as Error)?.message ?? t('errors.somethingWentWrong'), 'error');
    }
  };

  return (
    <Sheet open={open} onOpenChange={value => (!value ? onClose() : null)}>
      <SheetContent side="right" className="w-full sm:max-w-3xl">
        <SheetHeader>
          <SheetTitle>{t('users.allowanceModal.title', { policy: policy?.policyName ?? '' })}</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col gap-4 overflow-y-auto py-4">
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase text-muted-foreground" htmlFor={yearFieldId}>
              {t('users.allowanceModal.year')}
            </label>
            <Input
              id={yearFieldId}
              type="number"
              value={year}
              onChange={event => setYear(Number(event.target.value) || new Date().getFullYear())}
              min={1900}
              className="w-32"
            />
          </div>
          {isBalanceLoading ? (
            <Spinner />
          ) : balance ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <SummaryTile label={t('users.allowanceModal.metrics.base')} value={balance.base} />
              <SummaryTile label={t('users.allowanceModal.metrics.carryover')} value={balance.carryoverIn} />
              <SummaryTile label={t('users.allowanceModal.metrics.manual')} value={balance.manualAdjustments} />
              <SummaryTile label={t('users.allowanceModal.metrics.retro')} value={balance.retroAdjustments} />
              <SummaryTile label={t('users.allowanceModal.metrics.used')} value={balance.used} />
              <SummaryTile label={t('users.allowanceModal.metrics.available')} value={balance.available} highlight />
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-border bg-white/70 p-4 text-sm text-muted-foreground">
              {t('users.allowanceModal.noData')}
            </p>
          )}

          {isEventsLoading ? (
            <Spinner />
          ) : events.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border bg-white/70 p-4 text-sm text-muted-foreground">
              {t('users.allowanceModal.noEvents')}
            </p>
          ) : (
            <div className="rounded-2xl border border-white/60 bg-white/70 p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('users.allowanceModal.headers.type')}</TableHead>
                    <TableHead>{t('users.allowanceModal.headers.amount')}</TableHead>
                    <TableHead>{t('users.allowanceModal.headers.effectiveAt')}</TableHead>
                    <TableHead>{t('users.allowanceModal.headers.notes')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map(event => (
                    <TableRow key={event?.id}>
                      <TableCell>{event?.type}</TableCell>
                      <TableCell>{event?.amount ?? 0}</TableCell>
                      <TableCell>
                        {event?.effectiveAt ? format(new Date(event.effectiveAt), 'MMM dd, yyyy') : '—'}
                      </TableCell>
                      <TableCell>{event?.notes || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="h-px bg-border/70" />

          <div className="space-y-2">
            <p className="text-base font-semibold text-foreground">{t('users.allowanceModal.manualAdjustmentTitle')}</p>
            <p className="text-sm text-muted-foreground">{t('users.allowanceModal.manualAdjustmentDescription')}</p>
          </div>
          <form className="space-y-3" onSubmit={handleManualAdjustmentSubmit}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground" htmlFor={manualAmountFieldId}>
                {t('users.allowanceModal.fields.amount')}
              </label>
              <Input
                id={manualAmountFieldId}
                type="number"
                value={manualForm.amount}
                onChange={event => handleManualFormChange('amount', event.target.value)}
                className={cn(manualErrors.amount && 'border-destructive text-destructive')}
              />
              {manualErrors.amount ? <p className="text-xs text-destructive">{manualErrors.amount}</p> : null}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground" htmlFor={manualEffectiveAtFieldId}>
                {t('users.allowanceModal.fields.effectiveAt')}
              </label>
              <Input
                id={manualEffectiveAtFieldId}
                type="date"
                value={manualForm.effectiveAt}
                onChange={event => handleManualFormChange('effectiveAt', event.target.value)}
                className={cn(manualErrors.effectiveAt && 'border-destructive text-destructive')}
              />
              {manualErrors.effectiveAt ? <p className="text-xs text-destructive">{manualErrors.effectiveAt}</p> : null}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground" htmlFor={manualNotesFieldId}>
                {t('users.allowanceModal.fields.notes')}
              </label>
              <TextField
                id={manualNotesFieldId}
                multiline
                rows={4}
                value={manualForm.notes}
                onChange={event => handleManualFormChange('notes', event.target.value)}
                className="bg-white/80"
                fullWidth
              />
            </div>
            <Button type="submit" disabled={!canSubmitManual}>
              {isCreatingManualAdjustment
                ? t('users.allowanceModal.savingAdjustment')
                : t('users.allowanceModal.addManualAdjustment')}
            </Button>
          </form>
        </div>
        <SheetFooter>
          <Button type="button" variant="outline" className="w-full" onClick={onClose}>
            {t('buttons.close')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const SummaryTile = ({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) => (
  <div
    className={cn(
      'rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm',
      highlight && 'border-primary/40 bg-primary/5'
    )}
  >
    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
    <p className="mt-1 text-xl font-semibold text-foreground">
      {value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
    </p>
  </div>
);

const FormField = ({
  label,
  error,
  children,
  description,
  controlId
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  description?: string;
  controlId?: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      {controlId ? (
        <label className="text-sm font-medium text-muted-foreground" htmlFor={controlId}>
          {label}
        </label>
      ) : (
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      )}
      {description ? <span className="text-xs text-muted-foreground">{description}</span> : null}
    </div>
    {children}
    {error ? <p className="text-xs text-destructive">{error}</p> : null}
  </div>
);

const ReadOnlyField = ({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string }) => (
  <div className="space-y-1">
    <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
    <p
      className={cn(
        'rounded-xl border border-border bg-white/70 p-3 text-sm font-medium text-foreground',
        valueClassName
      )}
    >
      {value}
    </p>
  </div>
);

const Spinner = () => (
  <div className="flex min-h-[200px] items-center justify-center">
    <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
  </div>
);
