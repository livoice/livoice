import type { ReactNode } from 'react';
import { useMemo } from 'react';

import { AuthContext } from './authContext';

const defaultUser = {
  id: 'user-1',
  email: 'user@example.com',
  displayName: 'Livoice User',
  isActive: true
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const value = useMemo(
    () => ({
      user: defaultUser,
      isAnyAdmin: () => true,
      canEditOrg: true,
      canEditLocation: true
    }),
    []
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
