import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { createUploadLink } from 'apollo-upload-client';
import { BASE_API, BASE_API_PATH } from '@/config/env';

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
  link: from([errorLink, httpLink]),
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
