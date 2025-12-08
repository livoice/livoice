import { ApolloClient, ApolloLink, from, InMemoryCache, Observable } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { BASE_API, BASE_API_PATH } from '@/config/env';
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
  uri: `${BASE_API}${BASE_API_PATH}/graphql`,
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
      CloudinaryImage_File: {
        keyFields: ['id'],
        fields: {
          id: {
            read(id) {
              return id || null;
            }
          }
        }
      },
      Influencer: {
        fields: {
          avatar: {
            merge(_existing, incoming) {
              return incoming;
            }
          }
        }
      },
      Client: {
        fields: {
          avatar: {
            merge(_existing, incoming) {
              return incoming;
            }
          }
        }
      }
    }
  })
});

export { apolloClient };
