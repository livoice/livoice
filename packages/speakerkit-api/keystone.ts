import { config } from '@keystone-6/core';
import { DatabaseProvider } from '@keystone-6/core/types';
import { delegatedSessionStrategy, isAuthenticated } from './auth';
import env from './config/env';
import lists from './schemas';

export default config({
  db: {
    provider: 'postgresql' as DatabaseProvider,
    url: env.SPEAKERKIT_DATABASE_URL,
    prismaClientPath: '.keystone/speakerkit-prisma-client'
  },
  lists,
  session: delegatedSessionStrategy,
  ui: {
    isAccessAllowed: ({ session }) => isAuthenticated({ session }),
    pageMiddleware: async ({ wasAccessAllowed }) => {
      if (wasAccessAllowed) return;
      return {
        kind: 'redirect',
        to: `${env.LIVOICE_API_URL}/api/auth/signin`
      };
    }
  },
  server: {
    port: env.SPEAKERKIT_PORT,
    maxFileSize: 50 * 1024 * 1024
  },
  graphql: {
    path: '/api/graphql',
    debug: false,
    bodyParser: {
      limit: '50mb'
    }
  }
});
