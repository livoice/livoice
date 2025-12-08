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
  TRANSCRIPT = '/projects/:projectId/transcripts/:transcriptId',
  TRANSCRIPTS_CREATE = '/projects/:projectId/transcripts/create',
  TRANSCRIPT_CHAT = '/projects/:projectId/transcripts/:transcriptId/chat/:chatId',
  TRANSCRIPT_CHAT_NEW = '/projects/:projectId/transcripts/:transcriptId/chat/new',
  PROJECT_CHAT = '/projects/:projectId/chat/:chatId',
  PROJECT_CHAT_NEW = '/projects/:projectId/chat/new',
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
export const toTranscript = ({ projectId, transcriptId }: { projectId: string; transcriptId: string }) =>
  asPath(ROUTER_PATHS.TRANSCRIPT, { projectId, transcriptId });
export const toUsers = () => asPath(ROUTER_PATHS.USERS);
export const toUserCreate = () => asPath(ROUTER_PATHS.USERS_CREATE);
export const toUserEdit = ({ userId }: { userId: string }) => asPath(ROUTER_PATHS.USERS_EDIT, { userId });
export const toSettingsOrg = () => asPath(ROUTER_PATHS.SETTINGS_ORG);
export const toProjects = () => asPath(ROUTER_PATHS.PROJECTS);
export const toProjectCreate = () => asPath(ROUTER_PATHS.PROJECTS_CREATE);
export const toProject = ({ projectId }: { projectId: string }) => asPath(ROUTER_PATHS.PROJECT, { projectId });
export const toProjectEdit = ({ projectId }: { projectId: string }) =>
  asPath(ROUTER_PATHS.PROJECTS_EDIT, { projectId });
export const toTranscriptCreate = ({ projectId }: { projectId: string }) =>
  asPath(ROUTER_PATHS.TRANSCRIPTS_CREATE, { projectId });
export const toTranscriptChat = ({
  projectId,
  transcriptId,
  chatId
}: {
  projectId: string;
  transcriptId: string;
  chatId: string;
}) => asPath(ROUTER_PATHS.TRANSCRIPT_CHAT, { projectId, transcriptId, chatId });
export const toTranscriptChatNew = ({ projectId, transcriptId }: { projectId: string; transcriptId: string }) =>
  asPath(ROUTER_PATHS.TRANSCRIPT_CHAT_NEW, { projectId, transcriptId });
export const toProjectChat = ({ projectId, chatId }: { projectId: string; chatId: string }) =>
  asPath(ROUTER_PATHS.PROJECT_CHAT, { projectId, chatId });
export const toProjectChatNew = ({ projectId }: { projectId: string }) =>
  asPath(ROUTER_PATHS.PROJECT_CHAT_NEW, { projectId });

export const toChat = ({
  projectId,
  transcriptId,
  chatId
}: {
  projectId: string;
  transcriptId: string;
  chatId: string;
}) => asPath(projectId ? ROUTER_PATHS.PROJECT_CHAT : ROUTER_PATHS.TRANSCRIPT_CHAT, { projectId, transcriptId, chatId });
export const toChatNew = ({ projectId, transcriptId }: { projectId: string; transcriptId: string }) =>
  asPath(ROUTER_PATHS.PROJECT_CHAT_NEW, { projectId, transcriptId });
