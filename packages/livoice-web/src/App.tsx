import { AuthProvider } from '@/hooks/auth/useAuth';
import { ToastProvider } from '@/hooks/useToast';
import { apolloClient } from '@/services/apolloClient';
import { combineProviders } from '@/utils/combineComponents.ts';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import Routes from './routes/routes';

const router = createBrowserRouter(Routes);

const Providers = combineProviders([
  [ApolloProvider, { client: apolloClient }],
  AuthProvider,
  SessionProvider,
  ToastProvider
]);

function App() {
  return (
    <ErrorBoundary>
      <Providers>
        <NuqsAdapter
          processUrlSearchParams={search => new URLSearchParams(search.toString().split('&').sort().join('&'))}
        >
          <RouterProvider router={router} />
        </NuqsAdapter>
      </Providers>
    </ErrorBoundary>
  );
}

export default App;
