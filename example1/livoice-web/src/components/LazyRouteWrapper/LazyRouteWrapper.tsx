import type { ReactNode } from 'react';
import { Suspense } from 'react';

interface LazyRouteWrapperProps {
  children: ReactNode;
}

export const LazyRouteWrapper = ({ children }: LazyRouteWrapperProps) => (
  <Suspense fallback={<div className="flex flex-1 items-center justify-center p-4 text-sm text-muted-foreground">Loading…</div>}>
    {children}
  </Suspense>
);

