import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router';

import { LazyRouteWrapper } from '@/components/LazyRouteWrapper/LazyRouteWrapper';
import type { RouteConfig } from './routes';

const createRouteElement = (element?: ReactNode): ReactNode => {
  if (!element) return null;

  return <LazyRouteWrapper>{element}</LazyRouteWrapper>;
};

export const route = ({ element, children, ...rest }: RouteConfig): RouteObject =>
  ({
    ...rest,
    element: createRouteElement(element),
    children: children?.map(route)
  }) as RouteObject;
