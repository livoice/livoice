import type { User } from '@/gql/generated';
import { UserRoleType } from '@/gql/generated';
import type { ExtendedSession } from './authContext';

type UserOrSession = User | ExtendedSession | null | undefined;

const getUserRole = (userOrSession: UserOrSession): UserRoleType | null => userOrSession?.role ?? null;

export const hasRole =
  (roles: UserRoleType[]) =>
  (userOrSession: UserOrSession): boolean =>
    roles.includes(getUserRole(userOrSession) ?? ('' as UserRoleType.User));

export const isGod = (userOrSession: UserOrSession): boolean => hasRole([UserRoleType.God])(userOrSession);

export const isOrgAdmin = (userOrSession: UserOrSession): boolean =>
  hasRole([UserRoleType.OrgAdmin, UserRoleType.OrgOwner])(userOrSession);

export const isProjectAdmin = (userOrSession: UserOrSession): boolean =>
  hasRole([UserRoleType.ProjectAdmin])(userOrSession);

export const isOrgAdminOrAbove = (userOrSession: UserOrSession): boolean =>
  hasRole([UserRoleType.God, UserRoleType.OrgAdmin, UserRoleType.OrgOwner])(userOrSession);

export const isAnyAdmin = (userOrSession: UserOrSession): boolean =>
  hasRole([UserRoleType.God, UserRoleType.OrgAdmin, UserRoleType.OrgOwner, UserRoleType.ProjectAdmin])(userOrSession);

export const canEditOrgData = (userOrSession: UserOrSession): boolean =>
  isGod(userOrSession) || isOrgAdmin(userOrSession);

export const canEditProjectData = (userOrSession: UserOrSession): boolean =>
  isGod(userOrSession) || isOrgAdmin(userOrSession) || isProjectAdmin(userOrSession);

export const isSelf = (
  selfUser: UserOrSession,
  targetUser: Pick<ExtendedSession, 'id'> | null | undefined
): boolean => {
  if (!selfUser?.id || !targetUser?.id) return false;
  return String(selfUser.id) === String(targetUser.id);
};

const roleHierarchy: Record<UserRoleType, number> = {
  [UserRoleType.User]: 0,
  [UserRoleType.ProjectAdmin]: 1,
  [UserRoleType.OrgAdmin]: 2,
  [UserRoleType.OrgOwner]: 3,
  [UserRoleType.God]: 4
};

/**
 * Check if a user can edit another user based on role hierarchy
 * - PROJECT_ADMIN can only edit USER or PROJECT_ADMIN
 * - ORG_ADMIN can only edit USER, PROJECT_ADMIN, ORG_ADMIN
 * - ORG_OWNER can only edit USER, PROJECT_ADMIN, ORG_ADMIN, ORG_OWNER
 * - GOD can edit anyone
 */
export const canEditUserByRole = (
  editor: UserOrSession,
  targetUser: { role?: UserRoleType | null } | null | undefined
): boolean => {
  if (!editor || !targetUser?.role) return false;

  // GOD can edit anyone
  if (isGod(editor)) return true;

  const editorRole = getUserRole(editor);
  if (!editorRole) return false;

  const editorLevel = roleHierarchy[editorRole] ?? -1;
  const targetLevel = roleHierarchy[targetUser.role] ?? Number.MAX_SAFE_INTEGER;

  // Editor can only edit users with equal or lower role level
  return targetLevel <= editorLevel;
};
