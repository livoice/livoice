import { createContext } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  isActive?: boolean;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAnyAdmin: () => boolean;
  canEditOrg: boolean;
  canEditLocation: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAnyAdmin: () => false,
  canEditOrg: false,
  canEditLocation: false
});
