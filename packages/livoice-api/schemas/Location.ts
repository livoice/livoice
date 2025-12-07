import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { multiselect, relationship, select, text } from '@keystone-6/core/fields';
import { getTimeZones } from '@vvo/tzdb';
import Holidays from 'date-holidays';
import {
  canEditLocationData,
  canEditOrgData,
  filterByUserOrg,
  isAuthenticated,
  isGod,
  isLocationAdmin,
  isOrgAdmin
} from '../domains/auth/userRole';

const workingDayOptions = [
  { label: 'Monday', value: 'MON' },
  { label: 'Tuesday', value: 'TUE' },
  { label: 'Wednesday', value: 'WED' },
  { label: 'Thursday', value: 'THU' },
  { label: 'Friday', value: 'FRI' },
  { label: 'Saturday', value: 'SAT' },
  { label: 'Sunday', value: 'SUN' }
] as const;

const holidayCountryOptions = Object.entries(new Holidays().getCountries('en')).map(([value, label]) => ({
  value,
  label
}));

export default list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    org: relationship({ ref: 'Organization.locations', many: false }),
    timePolicies: relationship({ ref: 'TimePolicy.locations', many: true }),
    users: relationship({ ref: 'User.location', many: true }),
    timezone: select({
      options: getTimeZones().map(({ name, currentTimeFormat }) => ({ label: currentTimeFormat, value: name })),
      type: 'string',
      ui: { description: 'IANA timezone' }
    }),
    workingDays: multiselect({
      options: workingDayOptions,
      defaultValue: workingDayOptions.slice(0, 5).map(option => option.value),
      type: 'enum',
      ui: { description: 'Working days of the week' }
    }),
    weekStartDay: select({
      options: workingDayOptions,
      type: 'enum',
      defaultValue: workingDayOptions[0].value,
      validation: { isRequired: true },
      ui: { description: 'First day of the work week' }
    }),
    holidayCountry: select({
      options: holidayCountryOptions,
      type: 'string',
      defaultValue: 'US',
      validation: { isRequired: true },
      ui: { description: 'Select a country to apply national holidays' }
    })
  },
  ui: {
    labelField: 'name'
  },
  access: {
    operation: {
      query: ({ session }) => isAuthenticated({ session }),
      create: canEditOrgData,
      update: canEditLocationData,
      delete: canEditOrgData
    },
    item: {
      update: async ({ session, item, context }) => {
        if (isGod({ session })) return true;
        if (!item?.id) return false;

        const targetLocationId = String(item.id);
        const sudoContext = context.sudo();
        const location = (await sudoContext.query.Location.findOne({
          where: { id: targetLocationId },
          query: 'id org { id }'
        })) as { id: string; org: { id: string } | null } | null;

        if (!location) return false;

        if (isOrgAdmin({ session })) {
          if (!session?.orgId) return false;
          return location.org?.id ? String(location.org.id) === String(session.orgId) : false;
        }

        if (isLocationAdmin({ session })) {
          if (!session?.locationId) return false;
          return targetLocationId === String(session.locationId);
        }

        return false;
      },
      delete: async ({ session, item, context }) => {
        if (isGod({ session })) return true;
        if (!isOrgAdmin({ session })) return false;
        if (!session?.orgId || !item?.id) return false;

        const sudoContext = context.sudo();
        const location = (await sudoContext.query.Location.findOne({
          where: { id: String(item.id) },
          query: 'id org { id }'
        })) as { org: { id: string } | null } | null;

        if (!location?.org?.id) return false;
        return String(location.org.id) === String(session.orgId);
      }
    },
    filter: {
      query: async ({ session }) => {
        if (!isAuthenticated({ session })) return false;
        if (isGod({ session })) return true;
        if (isOrgAdmin({ session })) return filterByUserOrg({ session });
        // For LocationAdmin and regular users, they can only see their own location
        if (!session?.locationId) return false;
        return { id: { equals: session.locationId } };
      }
    }
  },
  hooks: {
    resolveInput: {
      create: async ({ resolvedData, context }) => {
        if (resolvedData.org) return resolvedData;
        const orgId = context.session?.orgId as string | undefined;
        if (!orgId) return resolvedData;
        return {
          ...resolvedData,
          org: { connect: { id: orgId } }
        };
      }
    },
    validateDelete: async ({ item, context, addValidationError }) => {
      if (!item?.id) return;

      const sudoContext = context.sudo();
      const locationId = String(item.id);

      const location = (await sudoContext.query.Location.findOne({
        where: { id: locationId },
        query: 'id org { id }'
      })) as { org: { id: string } | null } | null;

      if (!location?.org?.id) {
        addValidationError('Location is missing organization context.');
        return;
      }

      const [orgLocationCount, userCount] = await Promise.all([
        sudoContext.db.Location.count({ where: { org: { id: { equals: location.org.id } } } }),
        sudoContext.db.User.count({ where: { location: { id: { equals: locationId } } } })
      ]);

      if (userCount > 0) {
        addValidationError('You cannot delete a location that still has users.');
        return;
      }

      if (orgLocationCount <= 1) {
        addValidationError('Each organization must have at least one location.');
      }
    }
  }
}) satisfies Lists['Location'];
