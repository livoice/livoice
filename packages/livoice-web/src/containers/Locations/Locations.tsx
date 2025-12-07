import { useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { useLocationsQuery, type LocationsQuery } from '@/gql/generated';
import useAuth from '@/providers/auth/useAuth';
import { toLocationCreate, toLocationEdit } from '@/services/linker';
import { Button, Input, PageHeader } from '@/ui';
import LocationCard from './components/LocationCard/LocationCard';

type LocationListItem = NonNullable<NonNullable<LocationsQuery['locations']>[number]>;

const Spinner = () => (
  <div className="flex min-h-[200px] items-center justify-center">
    <span className="h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
  </div>
);

export default function Locations() {
  const { user, canEditOrg, canEditLocation: canEditSelfLocation } = useAuth();
  const { t } = useTranslation('common');
  const { data, loading } = useLocationsQuery();
  const navigate = useNavigate();

  const locations: LocationListItem[] = (data?.locations ?? []).filter((candidate): candidate is LocationListItem =>
    Boolean(candidate)
  );

  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('ALL');

  const regionOptions = useMemo(() => {
    const unique = Array.from(
      new Set(
        locations
          .map(location => location?.holidayCountry)
          .filter((country): country is string => Boolean(country))
      )
    );
    return unique;
  }, [locations]);

  const filteredLocations = useMemo(() => {
    const term = search.trim().toLowerCase();
    return locations.filter(location => {
      if (term) {
        const matches = (location.name ?? '').toLowerCase().includes(term);
        if (!matches) return false;
      }
      if (regionFilter !== 'ALL' && location.holidayCountry !== regionFilter) return false;
      return true;
    });
  }, [locations, search, regionFilter]);

  const canCreateLocation = canEditOrg;
  const canEditLocationById = (locationId: string) => {
    if (canEditOrg) return true;
    if (!canEditSelfLocation || !user?.locationId) return false;
    return user.locationId === locationId;
  };

  const toolbar = (
    <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">search</span>
        <Input
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder={t('input.searchPlaceholder', { label: t('sidebar.locations').toLowerCase() })}
          className="w-full pl-10"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <select
          className="rounded-full border border-border bg-white/80 px-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          value={regionFilter}
          onChange={event => setRegionFilter(event.target.value)}
        >
          <option value="ALL">{t('users.filters.all')}</option>
          {regionOptions.map(region => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const actions = canCreateLocation ? (
    <Button onClick={() => navigate(toLocationCreate())} className="shadow-lg shadow-primary/25">
      <span className="material-symbols-outlined mr-2 text-lg">add</span>
      {t('buttons.create')}
    </Button>
  ) : null;

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={t('sidebar.locations')} toolbar={toolbar} actions={actions} />
      <div className="flex-1 p-6">
        {loading ? (
          <Spinner />
        ) : filteredLocations.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {filteredLocations.map(location => (
              <div key={location.id} className="space-y-3">
                <LocationCard
                  name={location.name ?? ''}
                  timezone={location.timezone}
                  workingDays={location.workingDays as string[] | null}
                  weekStartDay={location.weekStartDay}
                  holidayCountry={location.holidayCountry}
                />
                {canEditLocationById(location.id) ? (
                  <Button variant="outline" className="w-full" onClick={() => navigate(toLocationEdit({ locationId: location.id }))}>
                    {t('buttons.edit')}
                  </Button>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-white/70 p-8 text-center text-sm text-muted-foreground">
            {t('errors.noResultsFound', { label: t('sidebar.locations') })}
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}
