import type { PathParam } from 'react-router';
import { generatePath } from 'react-router';

type ParamObject = {
  [key in PathParam<string>]: string | null;
};
type SearchObject = string | string[][] | Record<string, string | undefined> | undefined; // type from URLSearchParams

export enum ROUTER_PATHS {
  ROOT = '/',
  LOGIN = '/login',
  USERS = '/users',
  USERS_CREATE = '/users/create',
  USERS_EDIT = '/users/:userId',
  DEACTIVATED = '/deactivated',
  SETTINGS_ORG = '/settings/org',
  PROJECTS = '/projects',
  PROJECTS_CREATE = '/projects/create',
  PROJECTS_EDIT = '/projects/:projectId/edit',
  PROJECT = '/projects/:projectId',
  SOURCES = '/sources',
  SOURCES_CREATE = '/sources/create',
  SOURCES_EDIT = '/sources/:sourceId/edit',
  SOURCE = '/sources/:sourceId',
  TRANSCRIPT = '/sources/:sourceId/transcripts/:transcriptId',
  PROJECT_CHAT_ID = '/projects/:projectId/chat/:chatId',
  PROJECT_CHAT_ID_MESSAGE_DEBUG = '/projects/:projectId/chat/:chatId/:chatMessageId/debug',
  PROJECT_CHAT_NEW = '/projects/:projectId/chat/new',
  PROJECT_CHAT_NEW_CONFIG = '/projects/:projectId/chat/new/config',
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
export const toTranscript = ({ sourceId, transcriptId }: { sourceId: string; transcriptId: string }) =>
  asPath(ROUTER_PATHS.TRANSCRIPT, { sourceId, transcriptId });
export const toUsers = () => asPath(ROUTER_PATHS.USERS);
export const toUserCreate = () => asPath(ROUTER_PATHS.USERS_CREATE);
export const toUserEdit = ({ userId }: { userId: string }) => asPath(ROUTER_PATHS.USERS_EDIT, { userId });
export const toSettingsOrg = () => asPath(ROUTER_PATHS.SETTINGS_ORG);
export const toProjects = () => asPath(ROUTER_PATHS.PROJECTS);
export const toProjectCreate = () => asPath(ROUTER_PATHS.PROJECTS_CREATE);
export const toProject = ({ projectId }: { projectId: string }) => asPath(ROUTER_PATHS.PROJECT, { projectId });
export const toProjectEdit = ({ projectId }: { projectId: string }) =>
  asPath(ROUTER_PATHS.PROJECTS_EDIT, { projectId });
export const toProjectChat = ({ projectId, chatId }: { projectId: string; chatId: string }) =>
  asPath(ROUTER_PATHS.PROJECT_CHAT_ID, { projectId, chatId });
export const toProjectChatIdMessageDebug = ({
  projectId,
  chatId,
  chatMessageId
}: {
  projectId: string;
  chatId: string;
  chatMessageId: string;
}) => asPath(ROUTER_PATHS.PROJECT_CHAT_ID_MESSAGE_DEBUG, { projectId, chatId, chatMessageId });
export const toProjectChatNew = ({ projectId }: { projectId: string }) =>
  asPath(ROUTER_PATHS.PROJECT_CHAT_NEW, { projectId });
export const toProjectChatNewConfig = ({ projectId }: { projectId: string }) =>
  asPath(ROUTER_PATHS.PROJECT_CHAT_NEW_CONFIG, { projectId });
export const toChatId = ({ projectId, chatId }: { projectId: string; chatId: string }) =>
  asPath(ROUTER_PATHS.PROJECT_CHAT_ID, { projectId, chatId });
export const toChatNew = ({ projectId, transcriptId }: { projectId: string; transcriptId: string }) =>
  asPath(ROUTER_PATHS.PROJECT_CHAT_NEW, { projectId, transcriptId });
export const toSources = () => asPath(ROUTER_PATHS.SOURCES);
export const toSourceCreate = () => asPath(ROUTER_PATHS.SOURCES_CREATE);
export const toSourceEdit = ({ sourceId }: { sourceId: string }) => asPath(ROUTER_PATHS.SOURCES_EDIT, { sourceId });
export const toSource = ({ sourceId }: { sourceId: string }) => asPath(ROUTER_PATHS.SOURCE, { sourceId });
