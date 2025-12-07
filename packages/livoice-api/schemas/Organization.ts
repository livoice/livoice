import { type Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { json, relationship, text } from '@keystone-6/core/fields';
import freeEmailDomains from 'free-email-domains';
import type { Session } from '../auth';
import { hasRole, isAuthenticated, isGod, UserRole } from '../domains/auth/userRole';

const freeEmailDomainSet = new Set<string>((freeEmailDomains as string[]).map(domain => domain.toLowerCase()));

const normalizeDomains = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const result: string[] = [];
  value
    .map(domain => (typeof domain === 'string' ? domain.trim().toLowerCase() : ''))
    .filter(Boolean)
    .forEach(domain => {
      if (seen.has(domain)) return;
      seen.add(domain);
      result.push(domain);
    });
  return result;
};

export default list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    autojoinDomains: json({
      defaultValue: [],
      ui: {
        description: 'Array of domains allowed to auto-join (e.g. ["example.com"])'
      }
    }),
    users: relationship({ ref: 'User.org', many: true }),
    timePolicies: relationship({ ref: 'TimePolicy.org', many: true }),
    timeTypes: relationship({ ref: 'TimeType.org', many: true }),
    locations: relationship({ ref: 'Location.org', many: true })
  },
  ui: {
    labelField: 'name'
  },
  access: {
    operation: {
      query: isAuthenticated,
      create: isAuthenticated,
      update: hasRole([UserRole.GOD, UserRole.ORG_OWNER]),
      delete: isGod
    },
    item: {
      update: async ({ session, item }) => {
        if (isGod({ session })) return true;
        return session?.orgId === item.id;
      }
    }
  },
  hooks: {
    resolveInput: {
      create: async ({ resolvedData }) => ({
        ...resolvedData,
        autojoinDomains: normalizeDomains(resolvedData.autojoinDomains)
      }),
      update: async ({ resolvedData }) => {
        if (!Object.prototype.hasOwnProperty.call(resolvedData, 'autojoinDomains')) return resolvedData;
        return {
          ...resolvedData,
          autojoinDomains: normalizeDomains(resolvedData.autojoinDomains)
        };
      }
    },
    afterOperation: {
      create: async ({ item, context }) => {
        const session = context.session as Session | null;
        if (session?.id && item?.id) {
          const sudo = context.sudo();
          const user = await sudo.query.User.findOne({
            where: { id: session.id },
            query: 'id location { id }'
          });

          // Only auto-connect if user already has a location (not in onboarding flow)
          // During onboarding, the completeOnboarding mutation will handle connecting both org and location
          if (user?.location?.id) {
            await sudo.db.User.updateOne({
              where: { id: session.id },
              data: {
                role: UserRole.ORG_OWNER,
                org: { connect: { id: item.id as string } }
              }
            });
          }
        }
      }
    },
    validateInput: async ({ resolvedData, item, addValidationError }) => {
      const candidate = Object.prototype.hasOwnProperty.call(resolvedData, 'autojoinDomains')
        ? normalizeDomains(resolvedData.autojoinDomains)
        : normalizeDomains(item?.autojoinDomains);

      const invalidDomain = candidate.find(domain => freeEmailDomainSet.has(domain));
      if (invalidDomain) {
        addValidationError(`Domain ${invalidDomain} is a free email provider and cannot be used for auto-join.`);
      }
    }
  }
}) satisfies Lists['Organization'];
