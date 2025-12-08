import { UserRoleType } from '@/gql/generated';
import type { Session } from 'next-auth';
import { createContext } from 'react';

export interface ExtendedSession extends Session {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  orgId?: string | null;
  projectId?: string | null;
  providerAccountId?: string | null;
  avatarUrl?: string | null;
  displayName?: string | null;
  emailDomain?: string | null;
  isAutojoinDomainAllowed?: boolean;
  role?: UserRoleType;
  isActive?: boolean;
}

export interface AuthContextType {
  user: ExtendedSession | null;
  isLoadingAuth: boolean;
  // Computed boolean flags
  canAdmin: boolean;
  canEditOrg: boolean;
  // Utility functions
  isAnyAdmin: (userOrSession?: ExtendedSession | null) => boolean;
  canEditOrgData: (userOrSession?: ExtendedSession | null) => boolean;
  isOrgAdminOrAbove: (userOrSession?: ExtendedSession | null) => boolean;
  isGod: (userOrSession?: ExtendedSession | null) => boolean;
  isOrgAdmin: (userOrSession?: ExtendedSession | null) => boolean;
  isSelf: (userOrSession: Pick<ExtendedSession, 'id'> | null | undefined) => boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoadingAuth: true,
  canAdmin: false,
  canEditOrg: false,
  isAnyAdmin: () => false,
  canEditOrgData: () => false,
  isOrgAdminOrAbove: () => false,
  isGod: () => false,
  isOrgAdmin: () => false,
  isSelf: () => false
});
