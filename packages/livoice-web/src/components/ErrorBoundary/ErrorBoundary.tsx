import { useTranslation } from 'react-i18next';
import React, { Component, type ReactNode } from 'react';

import { Button } from '@/ui';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  componentWillUnmount() {
    this.setState({ hasError: false, error: null });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
  onRetry: () => void;
}

function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  const { t } = useTranslation('common');

  const handleRetry = () => {
    onRetry();
  };

  return (
    <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
      <p className="text-base font-semibold text-destructive">{t('errors.somethingWentWrong')}</p>
      {error ? <p className="mt-1 text-sm text-destructive/80">{error.message}</p> : null}
      <Button className="mt-4" onClick={handleRetry}>
          {t('buttons.retry')}
        </Button>
    </div>
  );
} 