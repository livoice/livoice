import type { PathParam } from 'react-router';
import { generatePath } from 'react-router';

type ParamObject = {
  [key in PathParam<string>]: string | null;
};
type SearchObject = string | string[][] | Record<string, string | undefined> | undefined; // type from URLSearchParams

export enum ROUTER_PATHS {
  ROOT = '/',
  LOGIN = '/login',
  ONBOARDING = '/onboarding',
  CALENDAR = '/calendar',
  REQUESTS = '/requests',
  USERS = '/users',
  USERS_CREATE = '/users/create',
  USERS_EDIT = '/users/:userId',
  DEACTIVATED = '/deactivated',
  SETTINGS_ORG = '/settings/org',
  TIME_TYPES = '/time-types',
  TIME_TYPES_CREATE = '/time-types/create',
  TIME_TYPES_EDIT = '/time-types/:timeTypeId',
  LOCATIONS = '/locations',
  LOCATIONS_CREATE = '/locations/create',
  LOCATIONS_EDIT = '/locations/:locationId',
  POLICIES = '/time-policies',
  POLICIES_CREATE = '/time-policies/create',
  POLICIES_EDIT = '/time-policies/:policyId',
  PROFILE = '/profile',
  NOT_FOUND = '*'
}

const normalizeSearchParams = (searchParams: SearchObject = {}) =>
  Object.fromEntries(Object.entries(searchParams).filter(([, value]) => typeof value !== 'undefined'));

const asPath = (basePath: string, params?: ParamObject, searchParams?: SearchObject): string => {
  const path = generatePath(basePath, params);

  const searchParamsString = new URLSearchParams(normalizeSearchParams(searchParams)).toString();
  return [path, searchParamsString].filter(Boolean).join('?');
};

export const toDashboard = () => asPath(ROUTER_PATHS.ROOT);
export const toLogin = () => asPath(ROUTER_PATHS.LOGIN);
export const toOnboarding = () => asPath(ROUTER_PATHS.ONBOARDING);
export const toDeactivated = () => asPath(ROUTER_PATHS.DEACTIVATED);
export const toNotFound = () => asPath(ROUTER_PATHS.NOT_FOUND);
export const toCalendar = () => asPath(ROUTER_PATHS.CALENDAR);
export const toRequests = () => asPath(ROUTER_PATHS.REQUESTS);
export const toUsers = () => asPath(ROUTER_PATHS.USERS);
export const toUserCreate = () => asPath(ROUTER_PATHS.USERS_CREATE);
export const toUserEdit = ({ userId }: { userId: string }) => asPath(ROUTER_PATHS.USERS_EDIT, { userId });
export const toSettingsOrg = () => asPath(ROUTER_PATHS.SETTINGS_ORG);
export const toProfile = () => asPath(ROUTER_PATHS.PROFILE);
export const toTimeTypes = () => asPath(ROUTER_PATHS.TIME_TYPES);
export const toTimeTypeCreate = () => asPath(ROUTER_PATHS.TIME_TYPES_CREATE);
export const toTimeTypeEdit = ({ timeTypeId }: { timeTypeId: string }) =>
  asPath(ROUTER_PATHS.TIME_TYPES_EDIT, { timeTypeId });
export const toLocations = () => asPath(ROUTER_PATHS.LOCATIONS);
export const toLocationCreate = () => asPath(ROUTER_PATHS.LOCATIONS_CREATE);
export const toLocationEdit = ({ locationId }: { locationId: string }) =>
  asPath(ROUTER_PATHS.LOCATIONS_EDIT, { locationId });
export const toPolicies = () => asPath(ROUTER_PATHS.POLICIES);
export const toPolicyCreate = () => asPath(ROUTER_PATHS.POLICIES_CREATE);
export const toPolicyEdit = ({ policyId }: { policyId: string }) => asPath(ROUTER_PATHS.POLICIES_EDIT, { policyId });
export const toAvailabilityTypes = toTimeTypes;
export const toAvailabilityTypeCreate = toTimeTypeCreate;
export const toAvailabilityTypeEdit = ({ availabilityTypeId }: { availabilityTypeId: string }) =>
  toTimeTypeEdit({ timeTypeId: availabilityTypeId });
