import { Session } from '../../auth';
import { User } from '../../types/User';

export enum UserRole {
  USER = 'USER',
  LOCATION_ADMIN = 'LOCATION_ADMIN',
  ORG_ADMIN = 'ORG_ADMIN',
  ORG_OWNER = 'ORG_OWNER',
  GOD = 'GOD'
}

export const roleHierarchy: Record<UserRole, number> = {
  [UserRole.USER]: 0,
  [UserRole.LOCATION_ADMIN]: 1,
  [UserRole.ORG_ADMIN]: 2,
  [UserRole.ORG_OWNER]: 3,
  [UserRole.GOD]: 4
};

type SessionOrUserContext = { session?: Session | User | null };
type SessionContext = { session?: Session | null };

export const isAuthenticated = ({ session }: SessionOrUserContext) => !!session?.email;

export const hasRole =
  (roles: UserRole[]) =>
  ({ session }: SessionOrUserContext) => {
    if (!session?.role) return false;
    return roles.includes(session?.role);
  };

// Semantic helper functions for common role checks
export const isGod = hasRole([UserRole.GOD]);
export const isOrgAdmin = hasRole([UserRole.ORG_ADMIN, UserRole.ORG_OWNER]);
export const isLocationAdmin = hasRole([UserRole.LOCATION_ADMIN]);
export const isOrgAdminOrAbove = hasRole([UserRole.GOD, UserRole.ORG_ADMIN, UserRole.ORG_OWNER]);
export const isAnyAdmin = hasRole([UserRole.GOD, UserRole.ORG_ADMIN, UserRole.ORG_OWNER, UserRole.LOCATION_ADMIN]);

export const isOrgScoped = async ({ session }: SessionContext) => {
  if (isGod({ session })) return true;
  if (!session?.orgId) return false;
  return { org: { id: { equals: session.orgId } } };
};

export const isSelf = async ({ session }: SessionOrUserContext) => {
  if (!session?.id) return false;
  return { id: { equals: session.id } };
};

export const canEditOrgData = ({ session }: SessionOrUserContext) => isGod({ session }) || isOrgAdmin({ session });

export const canEditLocationData = ({ session }: SessionOrUserContext) =>
  isGod({ session }) || isOrgAdmin({ session }) || isLocationAdmin({ session });

export const filterByUserLocation = async ({ session }: SessionContext) => {
  if (!session?.locationId) return false;
  return { location: { id: { equals: session.locationId } } };
};

export const filterByUserOrg = async ({ session }: SessionContext) => {
  if (!session?.orgId) return false;
  return { org: { id: { equals: session.orgId } } };
};

export const filterTimeTypesByUserLocation = async ({ session }: SessionContext) => {
  if (!session?.orgId || !session?.locationId) return false;
  return {
    org: { id: { equals: session.orgId } },
    timePolicies: {
      some: {
        locations: {
          some: {
            id: { equals: session.locationId }
          }
        }
      }
    }
  };
};

export const filterPoliciesByUserLocation = async ({ session }: SessionContext) => {
  if (!session?.orgId || !session?.locationId) return false;
  return {
    org: { id: { equals: session.orgId } },
    locations: {
      some: {
        id: { equals: session.locationId }
      }
    }
  };
};

/**
 * Check if a user can edit another user based on role hierarchy
 * - LOCATION_ADMIN can only edit USER or LOCATION_ADMIN
 * - ORG_ADMIN can only edit USER, LOCATION_ADMIN, ORG_ADMIN
 * - ORG_OWNER can only edit USER, LOCATION_ADMIN, ORG_ADMIN, ORG_OWNER
 * - GOD can edit anyone
 */
export const canEditUserByRole = (
  editorRole: UserRole | null | undefined,
  targetRole: UserRole | null | undefined
): boolean => {
  if (!editorRole || !targetRole) return false;

  // GOD can edit anyone
  if (editorRole === UserRole.GOD) return true;

  const editorLevel = roleHierarchy[editorRole] ?? -1;
  const targetLevel = roleHierarchy[targetRole] ?? Number.MAX_SAFE_INTEGER;

  // Editor can only edit users with equal or lower role level
  return targetLevel <= editorLevel;
};
