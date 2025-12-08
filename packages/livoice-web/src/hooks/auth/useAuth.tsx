import { getSession } from 'next-auth/react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext, type ExtendedSession } from './authContext';
import { canEditOrgData, isAnyAdmin, isGod, isOrgAdmin, isOrgAdminOrAbove, isSelf } from './userRole';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<ExtendedSession | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      setUser(session);
      setIsLoadingAuth(false);
    })();
  }, []);

  // Compute boolean flags from current user
  const canAdmin = useMemo(() => isAnyAdmin(user), [user]);
  const canEditOrg = useMemo(() => canEditOrgData(user), [user]);

  const contextValue = useMemo(
    () => ({
      user,
      isLoadingAuth,
      canAdmin,
      canEditOrg,
      isAnyAdmin: (userOrSession?: ExtendedSession | null) => isAnyAdmin(userOrSession ?? user),
      canEditOrgData: (userOrSession?: ExtendedSession | null) => canEditOrgData(userOrSession ?? user),
      isOrgAdminOrAbove: (userOrSession?: ExtendedSession | null) => isOrgAdminOrAbove(userOrSession ?? user),
      isGod: (userOrSession?: ExtendedSession | null) => isGod(userOrSession ?? user),
      isOrgAdmin: (userOrSession?: ExtendedSession | null) => isOrgAdmin(userOrSession ?? user),
      isSelf: (userOrSession: Pick<ExtendedSession, 'id'> | null | undefined) => isSelf(user, userOrSession)
    }),
    [user, isLoadingAuth, canAdmin, canEditOrg]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
