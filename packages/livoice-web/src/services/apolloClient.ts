import { ApolloClient, ApolloLink, from, InMemoryCache, Observable } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import env from '@/config/env';
import { loadingIndicator } from '@/utils/loadingIndicator';
import { createUploadLink } from 'apollo-upload-client';

const loadingLink = new ApolloLink((operation, forward) => {
  if (!forward) return null;

  return new Observable(observer => {
    loadingIndicator.start();

    const subscription = forward(operation).subscribe({
      next: value => observer.next(value),
      error: error => {
        loadingIndicator.stop();
        observer.error(error);
      },
      complete: () => {
        loadingIndicator.stop();
        observer.complete();
      }
    });

    return () => {
      loadingIndicator.stop();
      subscription.unsubscribe();
    };
  });
});

const httpLink = createUploadLink({
  uri: `${env.VITE_BASE_API}${env.VITE_BASE_API_PATH}/graphql`,
  credentials: 'include',
  headers: {
    'Apollo-Require-Preflight': 'true'
  }
});

const errorLink = onError(({ graphQLErrors: graphQlErrors = [], networkError }) => {
  const prettyPrint = (json: unknown) => JSON.stringify(json, null, 2);
  graphQlErrors.forEach(({ message, locations, path, ...rest }) =>
    console.info(
      '\x1b[31m%s\x1b[0m',
      `[GraphQL error]: Message: ${message}, Location: ${prettyPrint(locations)}, Path: ${path} ${prettyPrint(rest)}`
    )
  );

  if (networkError) {
    console.info('\x1b[36m%s\x1b[0m', `[Network error]: ${networkError}`);
  }
});

const apolloClient = new ApolloClient({
  link: from([loadingLink, errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          transcripts: {
            keyArgs: ['where', 'orderBy'],
            merge(existing = [], incoming, { args }) {
              const start = args?.skip ?? 0;
              const existingList = existing ?? [];
              const end = start + incoming.length;
              const length = Math.max(existingList.length, end);
              return Array.from({ length }, (_value, index) => {
                const isIncomingRange = index >= start && index < end;
                const incomingIndex = index - start;
                return isIncomingRange ? incoming[incomingIndex] : existingList[index];
              });
            }
          }
        }
      }
    }
  })
});

export { apolloClient };
