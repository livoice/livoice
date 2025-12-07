import type { TypeInfo } from '.keystone/types';
import { JSONValue, SessionStrategy } from '@keystone-6/core/types';
import { parse as parseCookies } from 'cookie';
import freeEmailDomains from 'free-email-domains';
import { getServerSession, NextAuthOptions } from 'next-auth';
import env from './config/env';
import { getKeystoneContext } from './context/keystoneContext';
import { UserRole } from './domains/auth/userRole';
import extractUserData from './lib/auth/extractUserData';
import providers from './lib/auth/providers';

const freeEmailDomainSet = new Set<string>((freeEmailDomains as string[]).map(domain => domain.toLowerCase()));

const extractDomain = (email?: string | null) => {
  if (!email) return null;
  const [, domain] = email.toLowerCase().split('@');
  return domain || null;
};

type ProviderType = 'google';

type UserItem = TypeInfo['lists']['User']['item'];
type OrganizationItem = TypeInfo['lists']['Organization']['item'];
type ProjectItem = TypeInfo['lists']['Project']['item'];

export type Session = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string | null;
  displayName?: string | null;
  role: UserRole;
  orgId: string | null;
  projectId: string | null;
  providerAccountId: string | null;
  emailDomain: string | null;
  isAutojoinDomainAllowed: boolean;
  isActive: boolean;
};

const isSecureCookies = env.NEXTAUTH_URL.startsWith('https://');
const cookiePrefix = isSecureCookies ? '__Secure-' : '';

const cookiesMappingConfig = {
  sessionToken: `${cookiePrefix}next-auth.session-token`,
  callbackUrl: `${cookiePrefix}next-auth.callback-url`,
  csrfToken: `${cookiePrefix}next-auth.csrf-token`,
  pkceCodeVerifier: `${cookiePrefix}next-auth.pkce.code_verifier`,
  state: `${cookiePrefix}next-auth.state`,
  nonce: `${cookiePrefix}next-auth.nonce`
};

const cookies: NextAuthOptions['cookies'] = Object.fromEntries(
  Object.entries(cookiesMappingConfig).map(([key, name]) => [
    key,
    {
      name,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isSecureCookies,
        domain: env.COOKIE_DOMAIN
      }
    }
  ])
);

export const nextAuthOptions: NextAuthOptions = {
  providers,
  cookies,
  secret: env.SESSION_SECRET,
  pages: {
    error: '/api/auth/error'
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const sudoContext = (await getKeystoneContext()).sudo();

      if (!account) throw new Error('Missing account param');
      const { providerAccountId, provider } = account;

      const email = user.email?.toLowerCase();
      if (!email) return false;

      const domain = extractDomain(email);
      const nowIso = new Date().toISOString();
      const extractedData = extractUserData(provider, { user, profile }) as Record<string, unknown>;

      const existingUsers = (await sudoContext.query.User.findMany({
        where: { email: { equals: email } },
        query: 'id org { id } project { id }'
      })) as (Pick<UserItem, 'id'> & {
        org: Pick<OrganizationItem, 'id'> | null;
        project: Pick<ProjectItem, 'id'> | null;
      })[];

      const baseUserData = {
        email,
        firstName: extractedData.firstName ?? '',
        lastName: extractedData.lastName ?? '',
        avatarSocialUrl: extractedData.pictureUrl ?? '',
        role: UserRole.USER,
        providerAccountId,
        provider: provider as ProviderType,
        rawAuth: {
          user: user as unknown as Record<string, unknown>,
          profile: profile as unknown as Record<string, unknown>,
          account: account as unknown as Record<string, unknown>
        } as JSONValue
      } satisfies Record<string, unknown>;

      let matchedOrgId: string | null = null;
      if (domain && !freeEmailDomainSet.has(domain)) {
        const orgs = (await sudoContext.query.Organization.findMany({
          query: 'id autojoinDomains'
        })) as (Pick<OrganizationItem, 'id'> & { autojoinDomains: unknown })[];
        const matchedOrg = orgs.find(candidate => {
          const domains = Array.isArray(candidate.autojoinDomains) ? (candidate.autojoinDomains as string[]) : [];
          return domains.map(value => value?.toLowerCase?.() || '').includes(domain);
        });
        matchedOrgId = matchedOrg?.id ?? null;
      }

      let projectToConnect: { id: string } | null = null;
      if (matchedOrgId) {
        const candidateProjects = (await sudoContext.query.Project.findMany({
          where: { org: { id: { equals: matchedOrgId } } },
          take: 1,
          query: 'id'
        })) as Pick<ProjectItem, 'id'>[];
        const primaryProject = candidateProjects?.[0];
        if (!primaryProject?.id) {
          throw new Error('Auto-join target organization does not have a project configured.');
        }
        projectToConnect = { id: primaryProject.id };
      }

      if (existingUsers.length > 0) {
        const existingUser = existingUsers[0] as Pick<UserItem, 'id'> & {
          org: Pick<OrganizationItem, 'id'> | null;
          project: Pick<ProjectItem, 'id'> | null;
        };
        const { role: _, ...userDataWithoutRole } = baseUserData;
        await sudoContext.db.User.updateOne({
          where: { id: existingUser.id },
          data: {
            ...userDataWithoutRole,
            provisionedAt: nowIso,
            ...(matchedOrgId && !existingUser.org?.id ? { org: { connect: { id: matchedOrgId } } } : {}),
            ...(projectToConnect && !existingUser.project?.id ? { project: { connect: projectToConnect } } : {})
          },
          query: 'id'
        } as Parameters<typeof sudoContext.db.User.updateOne>[0] & { query: string });

        return true;
      }

      const created = await sudoContext.db.User.createOne({
        data: {
          ...baseUserData,
          provisionedAt: nowIso,
          ...(matchedOrgId ? { org: { connect: { id: matchedOrgId } } } : {}),
          ...(projectToConnect ? { project: { connect: projectToConnect } } : {})
        },
        query: 'id'
      } as Parameters<typeof sudoContext.db.User.createOne>[0] & { query: string });

      return !!created?.id;
    },

    async jwt({ token, user, account, profile }) {
      if (!account) return token;

      const extracted = extractUserData(account.provider, { user, profile }) as Record<string, unknown>;
      const normalizedEmail = typeof extracted.email === 'string' ? extracted.email.toLowerCase() : null;

      return {
        ...token,
        userData: {
          ...extracted,
          email: normalizedEmail ?? extracted.email ?? null
        }
      };
    },

    async session({ session, token }) {
      type UserData = {
        email?: string | null;
        firstName?: string | null;
        lastName?: string | null;
      };
      const userData = (token.userData as UserData | undefined) ?? {};

      const normalizedEmail = typeof userData?.email === 'string' ? userData.email.toLowerCase() : null;
      if (!normalizedEmail) {
        throw new Error('Invalid session: no email found');
      }

      const sudoContext = (await getKeystoneContext()).sudo();

      const dbUser = (await sudoContext.query.User.findMany({
        where: { email: { equals: normalizedEmail } },
        query: 'id email org { id } project { id } role providerAccountId isActive seenAt avatarUrl displayName'
      })) as (Pick<UserItem, 'id' | 'email' | 'role' | 'providerAccountId' | 'isActive' | 'seenAt'> & {
        org: Pick<OrganizationItem, 'id'> | null;
        project: Pick<ProjectItem, 'id'> | null;
        avatarUrl?: string | null;
        displayName?: string | null;
      })[];

      if (!dbUser || dbUser.length === 0) {
        throw new Error('User not found in database');
      }

      const user = dbUser[0];

      const isDeactivated = !user.isActive;

      const seenAt = new Date().toISOString();
      await sudoContext.db.User.updateOne({
        where: { id: user.id },
        data: { seenAt },
        query: 'id'
      } as Parameters<typeof sudoContext.db.User.updateOne>[0] & { query: string });

      const emailDomain = extractDomain(user?.email ?? normalizedEmail);
      const isAutojoinDomainAllowed = !!(emailDomain && !freeEmailDomainSet.has(emailDomain));

      // Default to USER if role is not set
      const userRole: UserRole = (user?.role as UserRole) || UserRole.USER;

      return {
        ...session,
        id: user?.id,
        email: normalizedEmail,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        avatarUrl: user?.avatarUrl || null,
        displayName: user?.displayName || null,
        providerAccountId: user?.providerAccountId || null,
        orgId: user?.org?.id || null,
        projectId: user?.project?.id || null,
        role: userRole,
        emailDomain,
        isAutojoinDomainAllowed,
        isActive: user.isActive ?? true
      };
    },

    async redirect({ url, baseUrl }) {
      // If this is an error redirect, we can modify it to include additional parameters
      if (url.includes('/api/auth/error')) {
        // The error page will handle displaying the email from the error context
        return url;
      }

      if (!url.startsWith(env.APP_URL) && !url.startsWith(baseUrl)) return baseUrl;
      return url;
    }
  }
};

export const nextAuthSessionStrategy: SessionStrategy<Session, TypeInfo<Session>> = {
  async get({ context }) {
    const { req, res } = context;
    const { headers } = req ?? {};

    if (!headers?.cookie || !res) return;

    const nextAuthSession = await getServerSession<NextAuthOptions, Session>(
      { headers, cookies: parseCookies(headers.cookie) } as any,
      res,
      nextAuthOptions
    );
    if (!nextAuthSession) return;

    // Should we verify user line in examples?
    // const user = await context.sudo().db.User.findOne({ where: { email: nextAuthSession.email } });
    // if (!user) return;

    return nextAuthSession;
  },

  // we don't need these as next-auth handle start and end for us
  async start() {
    /* empty */
  },
  async end() {
    /* empty */
  }
};
