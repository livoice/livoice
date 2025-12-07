import { ErrorBoundaryWrapper } from '@/components/ErrorBoundary/ErrorBoundaryWrapper';
import Loading from '@/components/Loading/Loading';
import { Suspense, type ReactNode } from 'react';

interface LazyRouteWrapperProps {
  children: ReactNode;
}

export const LazyRouteWrapper = ({ children }: LazyRouteWrapperProps) => (
  <Suspense fallback={<Loading />}>
    <ErrorBoundaryWrapper>{children}</ErrorBoundaryWrapper>
  </Suspense>
);
