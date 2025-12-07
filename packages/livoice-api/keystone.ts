import { config } from '@keystone-6/core';
import lists, { extendGraphqlSchema } from './schemas';
import { DatabaseProvider } from '@keystone-6/core/types';
import env from './config/env';
import { nextAuthSessionStrategy } from './auth';
import providers from './lib/auth/providers';
import cors from './lib/cors';
import extendExpressApp from './routes';

export default config({
  db: {
    provider: env.DATABASE_PROVIDER as DatabaseProvider,
    url: env.DATABASE_URL
  },
  lists,
  session: nextAuthSessionStrategy,
  ui: {
    publicPages: [
      '/api/auth/csrf',
      '/api/auth/signin',
      '/api/auth/callback',
      '/api/auth/session',
      '/api/auth/providers',
      '/api/auth/signout',
      '/api/auth/error',
      ...providers.flatMap(({ id }) => [`/api/auth/signin/${id}`, `/api/auth/callback/${id}`])
    ],

    pageMiddleware: async ({ wasAccessAllowed }) => {
      if (wasAccessAllowed) return;
      return {
        kind: 'redirect',
        to: '/api/auth/signin'
      };
    }
  },
  server: {
    cors,
    extendExpressApp
  },
  graphql: {
    path: '/api/graphql',
    debug: false,
    // use the builder-style GraphQL extensions
    extendGraphqlSchema
  }
});
