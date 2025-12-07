import { type Context, type Lists, type TypeInfo } from '.keystone/types';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { graphql as g, list } from '@keystone-6/core';
import { allOperations, denyAll } from '@keystone-6/core/access';
import { checkbox, json, relationship, select, text, timestamp, virtual } from '@keystone-6/core/fields';
import { randomUUID } from 'crypto';
import type { Session } from '../auth';
import env from '../config/env';
import {
  canEditUserByRole,
  filterByUserLocation,
  filterByUserOrg,
  isAnyAdmin,
  isAuthenticated,
  isGod,
  isLocationAdmin,
  isOrgAdmin,
  isOrgAdminOrAbove,
  isSelf,
  UserRole
} from '../domains/auth/userRole';

type UserItem = TypeInfo['lists']['User']['item'];
type OrganizationItem = TypeInfo['lists']['Organization']['item'];
type LocationItem = TypeInfo['lists']['Location']['item'];
type RelationshipInput =
  | { disconnect?: boolean | Array<{ id: string }> }
  | { connect?: { id: string } | Array<{ id: string }> }
  | { set?: { id: string } | Array<{ id: string }> | null }
  | null
  | undefined;

const validation = { isRequired: true };
const socialLoginOpts = [{ label: 'Google', value: 'google' }];

const userRoleOptions = [
  { label: 'User', value: UserRole.USER },
  { label: 'Location Admin', value: UserRole.LOCATION_ADMIN },
  { label: 'Organization Admin', value: UserRole.ORG_ADMIN },
  { label: 'Organization Owner', value: UserRole.ORG_OWNER },
  { label: 'System Admin', value: UserRole.GOD }
];

export default list({
  fields: {
    avatarSocialUrl: text({
      ui: {
        createView: {
          fieldMode: 'hidden'
        },
        itemView: {
          fieldMode: 'hidden'
        }
      }
    }),
    avatarUploaded: cloudinaryImage({
      cloudinary: {
        cloudName: env.CLOUDINARY_CLOUD_NAME,
        apiKey: env.CLOUDINARY_API_KEY!,
        apiSecret: env.CLOUDINARY_API_SECRET!,
        folder: env.CLOUDINARY_API_FOLDER!
      }
    }),
    avatarUrl: virtual({
      field: g.field({
        type: g.String,
        resolve: (item: UserItem): string | null =>
          (item.avatarUploaded as { publicUrl?: string })?.publicUrl || item.avatarSocialUrl || ''
      })
    }),
    email: text({
      validation,
      isIndexed: true,
      isFilterable: true
    }),
    firstName: text(),
    lastName: text(),
    displayName: virtual({
      field: g.field({
        type: g.String,
        resolve: (item: UserItem): string => {
          const name = [item.firstName, item.lastName].filter(Boolean).join(' ');
          return name || item.email || '';
        }
      })
    }),
    role: select({
      type: 'enum',
      options: userRoleOptions,
      defaultValue: UserRole.USER,
      access: {
        ...allOperations(denyAll),
        read: isAuthenticated,
        create: isAnyAdmin,
        update: isAnyAdmin
      }
    }),
    providerAccountId: text({
      isIndexed: 'unique',
      access: {
        ...allOperations(denyAll),
        read: isGod,
        create: isGod,
        update: isGod
      },
      ui: {
        createView: { fieldMode: 'hidden' }
      }
    }),
    provider: select({
      type: 'enum',
      validation,
      options: socialLoginOpts,
      access: { ...allOperations(denyAll), read: isGod, create: isGod },
      defaultValue: socialLoginOpts[0].value
    }),
    rawAuth: json({
      access: { ...allOperations(denyAll), read: isGod, create: isGod },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' }
      }
    }),
    org: relationship({
      ref: 'Organization.users',
      many: false,
      access: {
        ...allOperations(denyAll),
        read: isAuthenticated,
        create: isAnyAdmin,
        update: isOrgAdminOrAbove
      }
    }),
    location: relationship({
      ref: 'Location.users',
      many: false,
      access: {
        ...allOperations(denyAll),
        read: isAuthenticated,
        create: isAnyAdmin,
        update: isAnyAdmin
      }
    }),
    startDate: timestamp(),
    allocations: relationship({ ref: 'UserAllocation.user', many: true }),

    isActive: checkbox({
      defaultValue: true,
      access: {
        ...allOperations(denyAll),
        read: isAuthenticated,
        create: isAnyAdmin,
        update: isOrgAdminOrAbove
      }
    }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' }
      }
    }),
    provisionedAt: timestamp({
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' }
      }
    }),
    updatedAt: timestamp({
      db: { updatedAt: true },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' }
      }
    }),
    seenAt: timestamp({
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' }
      }
    })
  },
  ui: {
    labelField: 'email'
  },
  access: {
    operation: {
      query: ({ session }) => isAuthenticated({ session }),

      create: ({ session }) => isAnyAdmin({ session }),
      update: ({ session }) => isAuthenticated({ session }),
      delete: async args => {
        const typedArgs = args as unknown as {
          session: Session | null;
          itemId: string;
          context: Context;
        };
        const { session, itemId, context } = typedArgs;
        if (isGod({ session })) return true;
        if (!isOrgAdmin({ session })) return false;
        if (!session?.orgId || !itemId) return false;

        const user = (await context.sudo().query.User.findOne({
          where: { id: itemId },
          query: 'org { id }'
        })) as (Pick<UserItem, 'id'> & { org: Pick<OrganizationItem, 'id'> | null }) | null;
        if (!user) return false;
        return user.org?.id === session.orgId;
      }
    },
    item: {
      update: async ({ session, item, context }) => {
        if (isGod({ session })) return true;
        if (!session?.id || !item?.id) return false;

        const targetUserId = String(item.id);
        const sessionId = String(session.id);

        // Users can update themselves
        if (sessionId === targetUserId) return true;

        // Query the item with relationships and role we need
        const sudoContext = context.sudo();
        const userWithRelations = (await sudoContext.query.User.findOne({
          where: { id: targetUserId },
          query: 'id org { id } location { id } role'
        })) as
          | (Pick<UserItem, 'id' | 'role'> & {
              org: Pick<OrganizationItem, 'id'> | null;
              location: Pick<LocationItem, 'id'> | null;
            })
          | null;

        if (!userWithRelations) return false;

        // Role hierarchy check: admins cannot edit users with higher roles
        if (!canEditUserByRole(session?.role as UserRole | null, userWithRelations.role as UserRole | null))
          return false;

        // Org admins (ORG_ADMIN and ORG_OWNER) can update users in their org
        if (isOrgAdmin({ session })) {
          if (!session?.orgId) return false;
          if (!userWithRelations.org?.id) return false;

          // Compare org IDs as strings to ensure proper comparison
          return String(userWithRelations.org.id) === String(session.orgId);
        }

        // Location admins can update users in their location
        if (isLocationAdmin({ session })) {
          if (!session?.locationId || !session?.orgId) return false;
          if (!userWithRelations.location?.id || !userWithRelations.org?.id) return false;

          // Must be in same location and same org
          return (
            String(userWithRelations.location.id) === String(session.locationId) &&
            String(userWithRelations.org.id) === String(session.orgId)
          );
        }

        return false;
      }
    },
    filter: {
      query: async ({ session }) => {
        if (!isAuthenticated({ session })) return false;
        if (isGod({ session })) return true;
        if (isOrgAdmin({ session })) return filterByUserOrg({ session });
        if (isLocationAdmin({ session })) return filterByUserLocation({ session });
        return isSelf({ session });
      }
    }
  },
  hooks: {
    resolveInput: {
      create: async ({ resolvedData }) => ({
        ...resolvedData,
        email: resolvedData.email?.toLowerCase(),
        providerAccountId: resolvedData.providerAccountId || randomUUID()
      }),
      update: async ({ resolvedData }) => ({
        ...resolvedData,
        email: typeof resolvedData.email === 'string' ? resolvedData.email.toLowerCase() : resolvedData.email,
        providerAccountId: resolvedData.providerAccountId || randomUUID()
      })
    },
    validateInput: async ({ operation, resolvedData, item, context, addValidationError }) => {
      const existingUser = item?.id
        ? ((await context.query.User.findOne({
            where: { id: item.id as string },
            query: 'id org { id } location { id } role'
          })) as
            | (Pick<UserItem, 'id' | 'role'> & {
                org: Pick<OrganizationItem, 'id'> | null;
                location: Pick<LocationItem, 'id'> | null;
              })
            | null)
        : null;

      // Check if user is trying to edit themselves
      const session = context.session as Session | null;
      const isEditingSelf =
        operation === 'update' && existingUser && session?.id && String(existingUser.id) === String(session.id);

      // Prevent self-editing of role (always)
      isEditingSelf && resolvedData.role && addValidationError('You cannot edit your own role.');

      // Prevent self-editing of isActive (always)
      isEditingSelf &&
        resolvedData.isActive !== undefined &&
        addValidationError('You cannot edit your own active status.');

      // Prevent self-editing of location unless ORG_OWNER/ORG_ADMIN
      isEditingSelf &&
        resolvedData.location &&
        session?.role !== UserRole.ORG_ADMIN &&
        session?.role !== UserRole.ORG_OWNER &&
        addValidationError('You cannot edit your own location.');

      const resolveRelationshipId = (input: RelationshipInput | unknown, existingId: string | null): string | null => {
        const typedInput = input as RelationshipInput;
        if (!typedInput) return existingId ?? null;

        const getDisconnectedId = (): string | null => {
          if (!('disconnect' in typedInput) || !typedInput.disconnect) return null;
          if (typedInput.disconnect === true) return null;
          if (Array.isArray(typedInput.disconnect) && typedInput.disconnect.length > 0) return null;
          return existingId ?? null;
        };

        const getConnectedId = (): string | null => {
          if (!('connect' in typedInput) || !typedInput.connect) return null;
          if (Array.isArray(typedInput.connect)) return typedInput.connect[0]?.id as string | null;
          return typedInput.connect.id as string | null;
        };

        const getSetId = (): string | null => {
          if (!('set' in typedInput) || typedInput.set === undefined) return null;
          if (typedInput.set === null) return null;
          if (Array.isArray(typedInput.set)) return typedInput.set[0]?.id as string | null;
          return typedInput.set?.id as string | null;
        };

        return getDisconnectedId() ?? getConnectedId() ?? getSetId() ?? existingId ?? null;
      };

      const getAllowedRolesForAdmin = (adminRole: UserRole): UserRole[] => {
        const baseRoles: UserRole[] = [UserRole.USER];
        const roleMap: Record<UserRole, UserRole[]> = {
          [UserRole.USER]: baseRoles,
          [UserRole.LOCATION_ADMIN]: [...baseRoles, UserRole.LOCATION_ADMIN],
          [UserRole.ORG_ADMIN]: [...baseRoles, UserRole.LOCATION_ADMIN, UserRole.ORG_ADMIN],
          [UserRole.ORG_OWNER]: [...baseRoles, UserRole.LOCATION_ADMIN, UserRole.ORG_ADMIN, UserRole.ORG_OWNER],
          [UserRole.GOD]: [...baseRoles, UserRole.LOCATION_ADMIN, UserRole.ORG_ADMIN, UserRole.ORG_OWNER]
        };
        return roleMap[adminRole] ?? baseRoles;
      };

      const validateRoleAssignment = (assignedRole: UserRole, adminRole: UserRole | null | undefined): void => {
        if (!adminRole) return;

        if (assignedRole === UserRole.GOD) {
          addValidationError('GOD role cannot be assigned via API. It can only be set directly in the database.');
          return;
        }

        const allowedRoles = getAllowedRolesForAdmin(adminRole);
        if (!allowedRoles.includes(assignedRole)) {
          addValidationError('You cannot assign this role. You can only assign roles up to your own permission level.');
        }
      };

      const validateLocationRestriction = (
        operation: string,
        nextLocationId: string | null,
        adminRole: UserRole | null | undefined,
        adminLocationId: string | null | undefined
      ): void => {
        const isLocationAdminCreating =
          operation === 'create' && adminRole === UserRole.LOCATION_ADMIN && adminLocationId;
        if (isLocationAdminCreating && nextLocationId && String(nextLocationId) !== String(adminLocationId)) {
          addValidationError('Location Admins can only create users in their own location.');
        }
      };

      const validateProvisioning = (
        operation: string,
        nextOrgId: string | null,
        nextLocationId: string | null,
        existingOrgId: string | null,
        existingLocationId: string | null
      ): void => {
        const isUnprovisioned = !nextOrgId && !nextLocationId;
        const isInitialProvision = operation === 'create' && isUnprovisioned;
        const isExistingUnprovisioned =
          operation === 'update' && isUnprovisioned && !existingOrgId && !existingLocationId;

        if (!isInitialProvision && !isExistingUnprovisioned && (!nextOrgId || !nextLocationId)) {
          addValidationError('Users must belong to both an organization and a location once provisioned.');
        }
      };

      const validateLocationOrgMatch = async (
        nextOrgId: string | null,
        nextLocationId: string | null,
        context: Context
      ): Promise<void> => {
        if (!nextOrgId || !nextLocationId) return;

        const location = (await context.query.Location.findOne({
          where: { id: nextLocationId },
          query: 'id org { id }'
        })) as (Pick<LocationItem, 'id'> & { org: Pick<OrganizationItem, 'id'> | null }) | null;

        const locationOrgId = location?.org?.id ?? null;
        if (locationOrgId && locationOrgId !== nextOrgId) {
          addValidationError("Selected location does not belong to the user's organization.");
        }
      };

      const nextOrgId = resolveRelationshipId(resolvedData.org, existingUser?.org?.id ?? null);
      const nextLocationId = resolveRelationshipId(resolvedData.location, existingUser?.location?.id ?? null);

      resolvedData.role && validateRoleAssignment(resolvedData.role as UserRole, session?.role);

      validateLocationRestriction(operation, nextLocationId, session?.role, session?.locationId);

      validateProvisioning(
        operation,
        nextOrgId,
        nextLocationId,
        existingUser?.org?.id ?? null,
        existingUser?.location?.id ?? null
      );

      await validateLocationOrgMatch(nextOrgId, nextLocationId, context);
    }
  }
}) satisfies Lists['User'];
