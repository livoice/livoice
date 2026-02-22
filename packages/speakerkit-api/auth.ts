import type { TypeInfo } from '.keystone/types';
import { SessionStrategy } from '@keystone-6/core/types';
import { parse as parseCookies } from 'cookie';
import { decode } from 'next-auth/jwt';
import env from './config/env';

export type Session = {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
};

const isSecureCookies = env.LIVOICE_API_URL.startsWith('https://');
const cookieNames = isSecureCookies
  ? ['__Secure-next-auth.session-token', 'next-auth.session-token']
  : ['next-auth.session-token', '__Secure-next-auth.session-token'];

export const isAuthenticated = ({ session }: { session?: Session | null }) => !!session?.email;

export const delegatedSessionStrategy: SessionStrategy<Session, TypeInfo<Session>> = {
  async get({ context }) {
    const { req } = context;
    const cookieHeader = req?.headers?.cookie;
    if (!cookieHeader) return;

    const cookies = parseCookies(cookieHeader);
    const token = cookieNames.map(name => cookies[name]).find(Boolean);
    if (!token) return;

    try {
      const decoded = await decode({ token, secret: env.SESSION_SECRET });
      const userData = decoded?.userData as Record<string, string> | undefined;
      if (!userData?.email) return;

      return {
        email: userData.email,
        firstName: userData.firstName ?? null,
        lastName: userData.lastName ?? null,
        avatarUrl: userData.pictureUrl ?? null
      };
    } catch {
      // If token decryption fails (secret mismatch/stale cookie), treat as unauthenticated.
      return;
    }
  },

  async start() {
    /* empty */
  },
  async end() {
    /* empty */
  }
};
