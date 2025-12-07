import type { PathParam } from 'react-router';
import { generatePath } from 'react-router';

type ParamObject = {
  [key in PathParam<string>]: string | null;
};
type SearchObject = string | string[][] | Record<string, string | undefined> | undefined; // type from URLSearchParams

export enum ROUTER_PATHS {
  ROOT = '/',
  LOGIN = '/login',
  TRANSCRIPTS = '/transcripts',
  TRANSCRIPT_DETAIL = '/transcripts/:transcriptId',
  USERS = '/users',
  USERS_CREATE = '/users/create',
  USERS_EDIT = '/users/:userId',
  DEACTIVATED = '/deactivated',
  SETTINGS_ORG = '/settings/org',
  PROJECTS = '/projects',
  PROJECTS_CREATE = '/projects/create',
  PROJECTS_EDIT = '/projects/:projectId/edit',
  PROJECT = '/projects/:projectId',
  TRANSCRIPTS_CREATE = '/transcripts/create',
  PROJECT_TRANSCRIPTS_CREATE = '/projects/:projectId/transcripts/create',
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
export const toDeactivated = () => asPath(ROUTER_PATHS.DEACTIVATED);
export const toNotFound = () => asPath(ROUTER_PATHS.NOT_FOUND);
export const toTranscripts = () => asPath(ROUTER_PATHS.TRANSCRIPTS);
export const toTranscript = ({ transcriptId }: { transcriptId: string }) =>
  asPath(ROUTER_PATHS.TRANSCRIPT_DETAIL, { transcriptId });
export const toUsers = () => asPath(ROUTER_PATHS.USERS);
export const toUserCreate = () => asPath(ROUTER_PATHS.USERS_CREATE);
export const toUserEdit = ({ userId }: { userId: string }) => asPath(ROUTER_PATHS.USERS_EDIT, { userId });
export const toSettingsOrg = () => asPath(ROUTER_PATHS.SETTINGS_ORG);
export const toProjects = () => asPath(ROUTER_PATHS.PROJECTS);
export const toProjectCreate = () => asPath(ROUTER_PATHS.PROJECTS_CREATE);
export const toProject = ({ projectId }: { projectId: string }) => asPath(ROUTER_PATHS.PROJECT, { projectId });
export const toProjectEdit = ({ projectId }: { projectId: string }) =>
  asPath(ROUTER_PATHS.PROJECTS_EDIT, { projectId });
export const toTranscriptCreate = () => asPath(ROUTER_PATHS.TRANSCRIPTS_CREATE);
export const toProjectTranscriptCreate = ({ projectId }: { projectId: string }) =>
  asPath(ROUTER_PATHS.PROJECT_TRANSCRIPTS_CREATE, { projectId });
