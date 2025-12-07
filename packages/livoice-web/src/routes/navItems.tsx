import {
  ROUTER_PATHS,
  toCalendar,
  toDashboard,
  toLocations,
  toPolicies,
  toProfile,
  toRequests,
  toSettingsOrg,
  toTimeTypes,
  toUsers
} from '@/services/linker';

export type NavSection = 'primary' | 'settings' | 'secondary';

export interface NavItemConfig {
  key: string;
  labelKey: string;
  icon: string;
  path: string;
  routePath: string | null;
  section: NavSection;
}

export const NAV_ITEMS: NavItemConfig[] = [
  {
    key: 'dashboard',
    labelKey: 'sidebar.dashboard',
    icon: 'grid_view',
    path: toDashboard(),
    routePath: ROUTER_PATHS.ROOT,
    section: 'primary'
  },
  {
    key: 'calendar',
    labelKey: 'sidebar.calendar',
    icon: 'calendar_month',
    path: toCalendar(),
    routePath: ROUTER_PATHS.CALENDAR,
    section: 'primary'
  },
  {
    key: 'requests',
    labelKey: 'sidebar.requests',
    icon: 'list_alt',
    path: toRequests(),
    routePath: ROUTER_PATHS.REQUESTS,
    section: 'primary'
  },
  {
    key: 'users',
    labelKey: 'sidebar.users',
    icon: 'group',
    path: toUsers(),
    routePath: ROUTER_PATHS.USERS,
    section: 'settings'
  },
  {
    key: 'timeTypes',
    labelKey: 'sidebar.timeTypes',
    icon: 'event_note',
    path: toTimeTypes(),
    routePath: ROUTER_PATHS.TIME_TYPES,
    section: 'settings'
  },
  {
    key: 'locations',
    labelKey: 'sidebar.locations',
    icon: 'location_on',
    path: toLocations(),
    routePath: ROUTER_PATHS.LOCATIONS,
    section: 'settings'
  },
  {
    key: 'policies',
    labelKey: 'sidebar.policies',
    icon: 'policy',
    path: toPolicies(),
    routePath: ROUTER_PATHS.POLICIES,
    section: 'settings'
  },
  {
    key: 'orgSettings',
    labelKey: 'sidebar.settings',
    icon: 'settings',
    path: toSettingsOrg(),
    routePath: ROUTER_PATHS.SETTINGS_ORG,
    section: 'settings'
  },
  {
    key: 'profile',
    labelKey: 'sidebar.profile',
    icon: 'person',
    path: toProfile(),
    routePath: ROUTER_PATHS.PROFILE,
    section: 'secondary'
  }
];
