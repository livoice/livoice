import { type ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import type { AuthContextType } from '@/providers/auth/authContext';
import useAuth from '@/providers/auth/useAuth';
import type { TFunction } from 'i18next';

interface ProtectedRouteProps {
  children: ReactNode;
  permissions?: (auth: AuthContextType) => boolean;
  onForbiddenRedirectTo?: string;
  onForbiddenToastI18nKey?: (t: TFunction) => string;
}

const ProtectedRoute = ({
  children,
  permissions,
  onForbiddenRedirectTo,
  onForbiddenToastI18nKey
}: ProtectedRouteProps) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const hasAccess = permissions ? permissions(auth) : true;

  useEffect(() => {
    if (!hasAccess && onForbiddenRedirectTo) {
      if (onForbiddenToastI18nKey) {
        console.warn(t(onForbiddenToastI18nKey(t)));
      }
      navigate(onForbiddenRedirectTo, { replace: true });
    }
  }, [hasAccess, navigate, onForbiddenRedirectTo, onForbiddenToastI18nKey, t]);

  if (!hasAccess) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
