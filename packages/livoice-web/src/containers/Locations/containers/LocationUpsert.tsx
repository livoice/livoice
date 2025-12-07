import { useApolloClient } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { getTimeZones } from '@vvo/tzdb';
import Holidays from 'date-holidays';
import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';
import FormDrawer from '@/components/FormDrawer/FormDrawer';
import {
  LocationsDocument,
  LocationWeekStartDayType,
  LocationWorkingDayType,
  useCreateLocationMutation,
  useDeleteLocationMutation,
  useLocationQuery,
  useUpdateLocationMutation
} from '@/gql/generated';
import { useToast } from '@/hooks/useToast';
import useWeekdays, { type Weekday } from '@/hooks/useWeekdays';
import { cn } from '@/lib/cn';
import useAuth from '@/providers/auth/useAuth';
import { toLocations } from '@/services/linker';
import { Button, Input } from '@/ui';
import { normalizeForForm } from '@/utils/normalizeForForm';

type LocationFormValues = {
  name: string;
  timezone: string;
  workingDays: Weekday[];
  weekStartDay: Weekday;
  holidayCountry: string;
};

const holidays = new Holidays();
const timezoneOptions: Option[] = getTimeZones().map(({ name, currentTimeFormat }) => ({
  value: name,
  label: currentTimeFormat
}));
const timezoneValues = timezoneOptions.map(option => option.value);

const defaultValues: LocationFormValues = {
  name: '',
  timezone:
    timezoneValues.find(timezone => timezone === Intl.DateTimeFormat().resolvedOptions().timeZone) ?? timezoneValues[0],
  workingDays: [
    LocationWorkingDayType.Mon,
    LocationWorkingDayType.Tue,
    LocationWorkingDayType.Wed,
    LocationWorkingDayType.Thu,
    LocationWorkingDayType.Fri
  ],
  weekStartDay: LocationWorkingDayType.Mon,
  holidayCountry: 'US'
};

export default function LocationUpsert() {
  const { locationId = '' } = useParams<{ locationId: string }>();
  const isEditMode = Boolean(locationId);
  const navigate = useNavigate();
  const { t: tCommon, i18n } = useTranslation('common');
  const { t } = useTranslation('common', { keyPrefix: 'locations.upsert' });
  const apolloClient = useApolloClient();
  const { showToast } = useToast();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const nameFieldId = useId();
  const timezoneFieldId = useId();
  const weekStartDayFieldId = useId();
  const holidayCountryFieldId = useId();

  const schema = useMemo(() => {
    const validCountryCodes = Object.keys(holidays.getCountries(i18n.language));
    return z.object({
      name: z.string().trim().min(1, t('errors.nameRequired')),
      timezone: z.string(t('errors.timezoneRequired')).refine(value => timezoneValues.includes(value)),
      workingDays: z.array(z.nativeEnum(LocationWorkingDayType)).min(1, t('errors.workingDaysRequired')),
      weekStartDay: z.nativeEnum(LocationWorkingDayType),
      holidayCountry: z.string().refine(value => validCountryCodes.includes(value), t('errors.holidayCountryRequired'))
    });
  }, [t, i18n.language]);

  const resolver = useMemo(() => zodResolver(schema as never) as Resolver<LocationFormValues>, [schema]);
  const { user: authUser, canEditOrg } = useAuth();
  const { control, handleSubmit, reset } = useForm<LocationFormValues>({
    defaultValues,
    resolver,
    mode: 'onChange'
  });

  const {
    data: locationData,
    loading: isLoading,
    called,
    refetch
  } = useLocationQuery({
    variables: { id: locationId },
    skip: !isEditMode
  });

  const onClose = useCallback(() => {
    navigate(toLocations());
    reset(defaultValues);
  }, [navigate, reset]);

  const onCompleted = useCallback(() => {
    void apolloClient.refetchQueries({ include: [LocationsDocument] });
    if (isEditMode) void refetch();
    onClose();
    reset(defaultValues);
  }, [apolloClient, isEditMode, refetch, onClose, reset]);

  const [createLocation, { loading: isCreating }] = useCreateLocationMutation({ onCompleted });
  const [updateLocation, { loading: isUpdating }] = useUpdateLocationMutation({ onCompleted });
  const [deleteLocation, { loading: isDeleting }] = useDeleteLocationMutation({
    onCompleted: () => {
      setDeleteDialogOpen(false);
      onCompleted();
    },
    onError: error => {
      showToast(error?.message || tCommon('errors.somethingWentWrong'), 'error');
    }
  });

  const { location } = locationData ?? {};

  const showDeleteButton = useMemo(() => isEditMode && canEditOrg, [canEditOrg, isEditMode]);

  const { canDelete, deleteTooltip = '' } = useMemo(() => {
    const isEditModeAndCanEdit = isEditMode && canEditOrg && location;
    const hasUsers = !!location?.usersCount;
    const isLastLocation = location?.org?.locationsCount === 1;

    return !isEditModeAndCanEdit
      ? { canDelete: false }
      : {
          canDelete: !hasUsers && !isLastLocation,
          deleteTooltip: tCommon(hasUsers ? 'locations.deleteTooltip.hasUsers' : 'locations.deleteTooltip.lastLocation')
        };
  }, [canEditOrg, isEditMode, location, tCommon]);

  useEffect(() => {
    reset(normalizeForForm<LocationFormValues>(location) || defaultValues);
  }, [location, reset]);

  const canEditCurrentLocation = useMemo(() => {
    if (!isEditMode) return canEditOrg;
    if (canEditOrg) return true;
    if (!authUser?.locationId || !locationId) return false;
    return authUser.locationId === locationId;
  }, [authUser?.locationId, canEditOrg, isEditMode, locationId]);

  useEffect(() => {
    if (isEditMode || canEditOrg) return;
    onClose();
  }, [isEditMode, canEditOrg, onClose]);

  useEffect(() => {
    if (!isEditMode || isLoading || !called) return;
    if (!location || !canEditCurrentLocation) onClose();
  }, [called, isEditMode, isLoading, location, canEditCurrentLocation, onClose]);

  const onSubmit = (values: LocationFormValues) => {
    const handler = isEditMode ? updateLocation : createLocation;
    if (isEditMode && (!locationId || !canEditCurrentLocation)) return;
    if (!isEditMode && !canEditOrg) return;

    void handler({
      variables: {
        id: locationId,
        data: {
          name: values.name.trim(),
          timezone: values.timezone,
          workingDays: values.workingDays as LocationWorkingDayType[],
          weekStartDay: values.weekStartDay as LocationWeekStartDayType,
          holidayCountry: values.holidayCountry
        }
      }
    });
  };

  const handleConfirmDelete = () => {
    if (!locationId) return;
    void deleteLocation({ variables: { id: locationId } });
  };

  const { weekdayOptions } = useWeekdays();

  const countryOptions: Option[] = useMemo(
    () =>
      Object.entries(holidays.getCountries(i18n.language)).map(([value, label]) => ({
        value,
        label
      })),
    [i18n.language]
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
            <Button type="button" variant="outline" className="flex-1" disabled={isCreating || isUpdating || isLoading || isDeleting} onClick={onClose}>
              {tCommon('buttons.cancel')}
            </Button>
            {showDeleteButton ? (
              <div className="flex flex-1 flex-col">
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full"
                  disabled={isCreating || isUpdating || isLoading || isDeleting || !canDelete}
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  {tCommon(isDeleting ? 'buttons.deleting' : 'buttons.delete')}
                </Button>
                {!canDelete && deleteTooltip ? (
                  <span className="mt-1 text-center text-xs text-muted-foreground">{deleteTooltip}</span>
                ) : null}
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
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-4">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <FormField label={t('fields.name')} error={fieldState.error?.message} controlId={nameFieldId}>
                  <Input {...field} id={nameFieldId} placeholder="e.g. London Office" />
                </FormField>
              )}
            />
            <Controller
              name="timezone"
              control={control}
              render={({ field, fieldState }) => (
                <FormField label={t('fields.timezone')} error={fieldState.error?.message} controlId={timezoneFieldId}>
                  <select
                    {...field}
                    id={timezoneFieldId}
                    className="h-11 w-full rounded-xl border border-border bg-white/80 px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                  >
                    {timezoneOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              )}
            />
            <Controller
              name="workingDays"
              control={control}
              render={({ field, fieldState }) => (
                <FormField label={t('fields.workingDays')} error={fieldState.error?.message}>
                  <div className="flex flex-wrap gap-2">
                    {weekdayOptions.map(option => {
                      const checkboxId = `working-day-${option.value}`;
                      const isChecked = field.value.includes(option.value as Weekday);
                      return (
                        <label
                          key={option.value}
                          htmlFor={checkboxId}
                          className={cn(
                            'flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition',
                            isChecked
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-white/70 text-muted-foreground hover:border-primary/50'
                          )}
                        >
                          <input
                            id={checkboxId}
                            type="checkbox"
                            className="hidden"
                            checked={isChecked}
                            onChange={event => {
                              const nextValue = event.target.checked
                                ? [...field.value, option.value as Weekday]
                                : field.value.filter(day => day !== option.value);
                              field.onChange(nextValue);
                            }}
                          />
                          {option.label}
                        </label>
                      );
                    })}
                  </div>
                </FormField>
              )}
            />
            <Controller
              name="weekStartDay"
              control={control}
              render={({ field }) => (
                <FormField label={t('fields.weekStartDay')} controlId={weekStartDayFieldId}>
                  <select
                    {...field}
                    id={weekStartDayFieldId}
                    className="h-11 w-full rounded-xl border border-border bg-white/80 px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                  >
                    {weekdayOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              )}
            />
            <Controller
              name="holidayCountry"
              control={control}
              render={({ field, fieldState }) => (
                <FormField
                  label={t('fields.holidayCountry')}
                  error={fieldState.error?.message}
                  controlId={holidayCountryFieldId}
                >
                  <select
                    {...field}
                    id={holidayCountryFieldId}
                    className="h-11 w-full rounded-xl border border-border bg-white/80 px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                  >
                    {countryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              )}
            />
          </div>
        )}
      </FormDrawer>
      <ConfirmDialog
        open={isDeleteDialogOpen}
        title={tCommon('buttons.delete')}
        description={tCommon('confirmations.deleteLocation')}
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

const FormField = ({
  label,
  error,
  children,
  controlId
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  controlId?: string;
}) => (
  <div className="space-y-2">
    {controlId ? (
      <label className="text-sm font-medium text-muted-foreground" htmlFor={controlId}>
        {label}
      </label>
    ) : (
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    )}
    {children}
    {error ? <p className="text-xs text-destructive">{error}</p> : null}
  </div>
);

const Spinner = () => (
  <div className="flex min-h-[200px] items-center justify-center">
    <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
  </div>
);

