import { ROUTER_PATHS, toDashboard, toProjects, toSettingsOrg, toUsers } from '@/services/linker';

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
    key: 'projects',
    labelKey: 'sidebar.projects',
    icon: 'folder',
    path: toProjects(),
    routePath: ROUTER_PATHS.PROJECTS,
    section: 'primary'
  },
  // {
  //   key: 'transcripts',
  //   labelKey: 'sidebar.transcripts',
  //   icon: 'mic',
  //   path: toTranscripts(),
  //   routePath: ROUTER_PATHS.TRANSCRIPTS,
  //   section: 'primary'
  // },
  {
    key: 'users',
    labelKey: 'sidebar.users',
    icon: 'group',
    path: toUsers(),
    routePath: ROUTER_PATHS.USERS,
    section: 'settings'
  },
  {
    key: 'orgSettings',
    labelKey: 'sidebar.settings',
    icon: 'settings',
    path: toSettingsOrg(),
    routePath: ROUTER_PATHS.SETTINGS_ORG,
    section: 'settings'
  }
];
