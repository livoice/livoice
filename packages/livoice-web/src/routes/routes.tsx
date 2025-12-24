import Root from '@/containers/Root/Root';
import type { TFunction } from 'i18next';
import type { ReactNode } from 'react';
import { lazy } from 'react';

import NotFound from '@/containers/NotFound/NotFound';
import type { AuthContextType } from '@/hooks/auth/authContext';
import { ROUTER_PATHS, toDashboard, toLogin, toProjects, toUsers } from '@/services/linker';
import { route } from './route';

const Login = lazy(() => import('@/containers/Login/Login'));
const Dashboard = lazy(() => import('@/containers/Dashboard/Dashboard'));
const Users = lazy(() => import('@/containers/Users/Users'));
const Projects = lazy(() => import('@/containers/Projects/Projects'));
const ProjectUpsert = lazy(() => import('@/containers/Projects/containers/ProjectUpsert'));
const Project = lazy(() => import('@/containers/Projects/Project'));
const UserUpsert = lazy(() => import('@/containers/Users/containers/UserUpsert'));
const Deactivated = lazy(() => import('@/containers/Deactivated/Deactivated'));
const Transcript = lazy(() => import('@/containers/Transcript/Transcript'));
const Chat = lazy(() => import('@/containers/Chat/Chat'));
const ChatConfig = lazy(() => import('@/containers/Chat/ChatConfig'));
const ChatMessageDebug = lazy(() => import('@/containers/Chat/ChatMessageDebug'));
const Sources = lazy(() => import('@/containers/Sources/Sources'));
const SourceUpsert = lazy(() => import('@/containers/Sources/containers/SourceUpsert'));
const Source = lazy(() => import('@/containers/Sources/Source'));

export interface RouteConfig {
  path?: string;
  index?: boolean;
  element?: ReactNode;
  protectedRoute?: {
    permissions?: (auth: AuthContextType) => boolean;
    onForbiddenRedirectTo?: string;
    onForbiddenToastI18nKey?: (t: TFunction) => string;
  };
  children?: RouteConfig[];
}

const protectedRouteEnsuringUserAuthenticated: RouteConfig['protectedRoute'] = {
  permissions: auth => !!auth.user,
  onForbiddenRedirectTo: toLogin()
};

export const routes: RouteConfig[] = [
  {
    path: ROUTER_PATHS.ROOT,
    element: <Root />,
    protectedRoute: protectedRouteEnsuringUserAuthenticated,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: ROUTER_PATHS.USERS,
        protectedRoute: {
          permissions: auth => auth.isAnyAdmin(),
          onForbiddenRedirectTo: toDashboard()
        },
        element: <Users />,
        children: [
          {
            path: ROUTER_PATHS.USERS_CREATE,
            protectedRoute: {
              permissions: auth => auth.isAnyAdmin(),
              onForbiddenRedirectTo: toUsers()
            },
            element: <UserUpsert />
          },
          {
            path: ROUTER_PATHS.USERS_EDIT,
            protectedRoute: {
              permissions: auth => auth.isAnyAdmin(),
              onForbiddenRedirectTo: toUsers()
            },
            element: <UserUpsert />
          }
        ]
      },
      {
        path: ROUTER_PATHS.PROJECTS,
        element: <Projects />,
        children: [
          {
            path: ROUTER_PATHS.PROJECTS_CREATE,
            protectedRoute: {
              permissions: auth => auth.canEditOrg,
              onForbiddenRedirectTo: toProjects()
            },
            element: <ProjectUpsert />
          },
          {
            path: ROUTER_PATHS.PROJECTS_EDIT,
            protectedRoute: {
              permissions: auth => auth.canEditOrg,
              onForbiddenRedirectTo: toProjects()
            },
            element: <ProjectUpsert />
          }
        ]
      },
      {
        path: ROUTER_PATHS.PROJECT,
        element: <Project />,
        children: [
          {
            path: ROUTER_PATHS.PROJECT_CHAT_NEW,
            element: <Chat />,
            children: [
              {
                path: ROUTER_PATHS.PROJECT_CHAT_NEW_CONFIG,
                element: <ChatConfig />
              }
            ]
          },
          {
            path: ROUTER_PATHS.PROJECT_CHAT_ID,
            element: <Chat />,
            children: [
              {
                path: ROUTER_PATHS.PROJECT_CHAT_ID_MESSAGE_DEBUG,
                element: <ChatMessageDebug />
              }
            ]
          }
        ]
      },
      {
        path: ROUTER_PATHS.SOURCES,
        element: <Sources />,
        children: [
          {
            path: ROUTER_PATHS.SOURCES_CREATE,
            element: <SourceUpsert />
          },
          {
            path: ROUTER_PATHS.SOURCES_EDIT,
            element: <SourceUpsert />
          },
          {
            path: ROUTER_PATHS.SOURCE,
            element: <Source />
          },
          {
            path: ROUTER_PATHS.TRANSCRIPT,
            element: <Transcript />
          }
        ]
      }
    ]
  },
  {
    protectedRoute: protectedRouteEnsuringUserAuthenticated,
    children: [
      {
        path: ROUTER_PATHS.DEACTIVATED,
        element: <Deactivated />
      }
    ]
  },
  {
    path: ROUTER_PATHS.LOGIN,
    element: <Login />
  },
  {
    path: ROUTER_PATHS.NOT_FOUND,
    element: <NotFound />
  }
];

const processedRoutes = routes.map(route);

export const rootRoute = routes.find(route => route.path === ROUTER_PATHS.ROOT);

export default processedRoutes;
