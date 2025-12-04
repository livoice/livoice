import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router';

import { LazyRouteWrapper } from '@/components/LazyRouteWrapper/LazyRouteWrapper';
import ProtectedRoute from '@/layouts/ProtectedRoute/ProtectedRoute';
import type { RouteConfig } from './routes';

const ConditionalWrap = ({
  condition,
  wrap,
  children
}: {
  condition: boolean;
  wrap: (children: ReactNode) => ReactNode;
  children: ReactNode;
}) => (condition ? wrap(children) : children);

const createRouteElement = (element?: ReactNode, protectedRoute?: RouteConfig['protectedRoute']): ReactNode => {
  if (!element) return null;

  return (
    <ConditionalWrap
      condition={!!protectedRoute}
      wrap={children => <ProtectedRoute {...protectedRoute} children={children} />}
    >
      <LazyRouteWrapper>{element}</LazyRouteWrapper>
    </ConditionalWrap>
  );
};

export const route = ({ element, children, protectedRoute, ...rest }: RouteConfig): RouteObject =>
  ({
    ...rest,
    element: createRouteElement(element, protectedRoute),
    children: children?.map(route)
  }) as RouteObject;
