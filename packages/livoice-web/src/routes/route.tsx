import ConditionalWrap from 'conditional-wrap';
import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router';

import { LazyRouteWrapper } from '@/components/LazyRouteWrapper/LazyRouteWrapper';
import ProtectedRoute from '@/layouts/ProtectedRoute/ProtectedRoute';
import type { RouteConfig } from './routes';

const createRouteElement = (element: ReactNode, protectedRoute: RouteConfig['protectedRoute']): ReactNode => {
  if (!element) return;

  return (
    <ConditionalWrap
      condition={!!protectedRoute}
      wrap={children => <ProtectedRoute {...protectedRoute} children={children} />}
    >
      <LazyRouteWrapper>{element}</LazyRouteWrapper>
    </ConditionalWrap>
  );
};

export const route = ({ element, children, protectedRoute, ...restRouteConfig }: RouteConfig): RouteObject =>
  ({
    ...restRouteConfig,
    element: createRouteElement(element, protectedRoute),
    children: children?.map(route)
  }) as RouteObject;
