import { useLocation } from 'react-router';
import { ErrorBoundary } from './ErrorBoundary';
import type { ReactNode } from 'react';

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
}

export function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  const location = useLocation();
  
  return (
    <ErrorBoundary key={location.pathname}>
      {children}
    </ErrorBoundary>
  );
} 