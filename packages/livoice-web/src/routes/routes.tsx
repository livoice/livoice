import Root from '@/containers/Root/Root';
import type { TFunction } from 'i18next';
import type { ReactNode } from 'react';
import { lazy } from 'react';

import { ROUTER_PATHS, toLogin, toTimeTypes } from '@/services/linker';

import NotFound from '@/containers/NotFound/NotFound';
import type { AuthContextType } from '@/providers/auth/authContext';
import { toDashboard, toLocations, toPolicies, toUsers } from '@/services/linker';
import { route } from './route';

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

const Login = lazy(() => import('@/containers/Login/Login'));
const Onboarding = lazy(() => import('@/containers/Onboarding/Onboarding'));
const Dashboard = lazy(() => import('@/containers/Dashboard/Dashboard'));
const Calendar = lazy(() => import('@/containers/Calendar/Calendar'));
const Requests = lazy(() => import('@/containers/Requests/Requests'));
const Users = lazy(() => import('@/containers/Users/Users'));
const Locations = lazy(() => import('@/containers/Locations/Locations'));
const LocationUpsert = lazy(() => import('@/containers/Locations/containers/LocationUpsert'));
const TimeTypes = lazy(() => import('@/containers/TimeTypes/TimeTypes'));
const TimeTypeUpsert = lazy(() => import('@/containers/TimeTypes/containers/TimeTypeUpsert'));
const Policies = lazy(() => import('@/containers/Policies/Policies'));
const PolicyUpsert = lazy(() => import('@/containers/Policies/containers/PolicyUpsert'));
const SettingsOrg = lazy(() => import('@/containers/Settings/Org'));
const Profile = lazy(() => import('@/containers/Profile/Profile'));
const UserUpsert = lazy(() => import('@/containers/Users/containers/UserUpsert'));
const Deactivated = lazy(() => import('@/containers/Deactivated/Deactivated'));

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
        path: ROUTER_PATHS.CALENDAR,
        element: <Calendar />
      },
      {
        path: ROUTER_PATHS.REQUESTS,
        protectedRoute: {
          permissions: auth => auth.isAnyAdmin(),
          onForbiddenRedirectTo: toDashboard()
        },
        element: <Requests />
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
        path: ROUTER_PATHS.TIME_TYPES,
        protectedRoute: {
          permissions: auth => auth.isAnyAdmin(),
          onForbiddenRedirectTo: toDashboard()
        },
        element: <TimeTypes />,
        children: [
          {
            path: ROUTER_PATHS.TIME_TYPES_CREATE,
            protectedRoute: {
              permissions: auth => auth.canEditOrg,
              onForbiddenRedirectTo: toTimeTypes()
            },
            element: <TimeTypeUpsert />
          },
          {
            path: ROUTER_PATHS.TIME_TYPES_EDIT,
            protectedRoute: {
              permissions: auth => auth.canEditOrg,
              onForbiddenRedirectTo: toTimeTypes()
            },
            element: <TimeTypeUpsert />
          }
        ]
      },
      {
        path: ROUTER_PATHS.LOCATIONS,
        element: <Locations />,
        children: [
          {
            path: ROUTER_PATHS.LOCATIONS_CREATE,
            protectedRoute: {
              permissions: auth => auth.canEditOrg,
              onForbiddenRedirectTo: toLocations()
            },
            element: <LocationUpsert />
          },
          {
            path: ROUTER_PATHS.LOCATIONS_EDIT,
            protectedRoute: {
              permissions: auth => auth.canEditLocation,
              onForbiddenRedirectTo: toLocations()
            },
            element: <LocationUpsert />
          }
        ]
      },
      {
        path: ROUTER_PATHS.POLICIES,
        element: <Policies />,
        children: [
          {
            path: ROUTER_PATHS.POLICIES_CREATE,
            protectedRoute: {
              permissions: auth => auth.canEditOrg,
              onForbiddenRedirectTo: toPolicies()
            },
            element: <PolicyUpsert />
          },
          {
            path: ROUTER_PATHS.POLICIES_EDIT,
            protectedRoute: {
              permissions: auth => auth.canEditOrg,
              onForbiddenRedirectTo: toPolicies()
            },
            element: <PolicyUpsert />
          }
        ]
      },
      {
        path: ROUTER_PATHS.SETTINGS_ORG,
        element: <SettingsOrg />
      },
      {
        path: ROUTER_PATHS.PROFILE,
        element: <Profile />
      }
    ]
  },
  {
    protectedRoute: protectedRouteEnsuringUserAuthenticated,
    children: [
      {
        path: ROUTER_PATHS.ONBOARDING,
        element: <Onboarding />
      },
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
