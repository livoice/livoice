import Loading from '@/components/Loading/Loading';
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from '@/hooks/useToast';
import type { AuthContextType } from '@/providers/auth/authContext';
import { ROUTER_PATHS, toDeactivated } from '@/services/linker';
import type { TFunction } from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permissions?: (auth: AuthContextType) => boolean;
  onForbiddenRedirectTo?: string;
  onForbiddenToastI18nKey?: (t: TFunction) => string;
}

export default function ProtectedRoute({
  children,
  permissions,
  onForbiddenRedirectTo,
  onForbiddenToastI18nKey
}: ProtectedRouteProps) {
  const auth = useAuth();
  const location = useLocation();
  const { showToast } = useToast();
  const { t } = useTranslation('common');
  const isOnboardingRoute = false; //location.pathname.startsWith(ROUTER_PATHS.ONBOARDING);

  const permissionsDefined = typeof permissions === 'function';
  const hasPermission = permissionsDefined ? permissions(auth) : true;

  useEffect(() => {
    if (auth.isLoadingAuth || !permissionsDefined || !onForbiddenRedirectTo || hasPermission) return;
    showToast(onForbiddenToastI18nKey?.(t) || t('permissions.noPermission'), 'error');
  }, [
    auth.isLoadingAuth,
    permissionsDefined,
    onForbiddenRedirectTo,
    hasPermission,
    onForbiddenToastI18nKey,
    showToast,
    t
  ]);

  if (auth.isLoadingAuth) return <Loading />;
  if (!auth.user) return <Navigate to={ROUTER_PATHS.LOGIN} replace />;

  if (!auth.user.isActive && !location.pathname.startsWith(ROUTER_PATHS.DEACTIVATED))
    return <Navigate to={toDeactivated()} replace />;
  if (auth.user.orgId && isOnboardingRoute) return <Navigate to={ROUTER_PATHS.ROOT} replace />;
  if (permissionsDefined && onForbiddenRedirectTo && !hasPermission)
    return <Navigate to={onForbiddenRedirectTo} replace />;

  return children;
}
