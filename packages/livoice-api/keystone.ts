import { config } from '@keystone-6/core';
import { DatabaseProvider } from '@keystone-6/core/types';
import { nextAuthSessionStrategy } from './auth';
import env from './config/env';
import providers from './lib/auth/providers';
import cors from './lib/cors';
import extendExpressApp from './routes';
import lists, { extendGraphqlSchema } from './schemas';

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
    port: env.PORT,
    host: '0.0.0.0',
    cors,
    extendExpressApp,
    maxFileSize: 50 * 1024 * 1024
  },
  graphql: {
    path: '/api/graphql',
    debug: false,
    bodyParser: {
      limit: '50mb'
    },
    // use the builder-style GraphQL extensions
    extendGraphqlSchema
  }
});
