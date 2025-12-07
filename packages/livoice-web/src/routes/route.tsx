import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router';

import { LazyRouteWrapper } from '@/components/LazyRouteWrapper/LazyRouteWrapper';
import ProtectedRoute from '@/layouts/ProtectedRoute/ProtectedRoute';
import type { RouteConfig } from './routes';

const createRouteElement = (element: ReactNode, protectedRoute: RouteConfig['protectedRoute']): ReactNode => {
  if (!element) return;

  const wrappedElement = <LazyRouteWrapper>{element}</LazyRouteWrapper>;
  return protectedRoute ? <ProtectedRoute {...protectedRoute}>{wrappedElement}</ProtectedRoute> : wrappedElement;
};

export const route = ({ element, children, protectedRoute, ...restRouteConfig }: RouteConfig): RouteObject =>
  ({
    ...restRouteConfig,
    element: createRouteElement(element, protectedRoute),
    children: children?.map(route)
  }) as RouteObject;
