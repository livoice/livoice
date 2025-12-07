import type { ReactNode } from 'react';
import { lazy } from 'react';

import { ROUTER_PATHS } from '@/services/linker';
import { route } from './route';

const Root = lazy(() => import('@/containers/Root/Root'));
const NotFound = lazy(() => import('@/containers/NotFound/NotFound'));
const TranscriptsList = lazy(() => import('@/containers/Transcripts/TranscriptsList'));
const TranscriptPage = lazy(() => import('@/containers/Transcripts/TranscriptPage'));

export interface RouteConfig {
  path?: string;
  index?: boolean;
  element?: ReactNode;
  children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
  {
    path: ROUTER_PATHS.ROOT,
    element: <Root />,
    children: [
      {
        index: true,
        element: <TranscriptsList />
      },
      {
        path: ROUTER_PATHS.TRANSCRIPT_DETAIL,
        element: <TranscriptPage />
      }
    ]
  },
  {
    path: ROUTER_PATHS.NOT_FOUND,
    element: <NotFound />
  }
];

export const processedRoutes = routes.map(route);

export const rootRoute = routes.find(routeConfig => routeConfig.path === ROUTER_PATHS.ROOT);

export default processedRoutes;
