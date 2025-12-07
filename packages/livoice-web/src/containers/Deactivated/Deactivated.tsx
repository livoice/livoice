import useAuth from '@/providers/auth/useAuth';
import { toDashboard } from '@/services/linker';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router';

export default function Deactivated() {
  const { user } = useAuth();
  const { t } = useTranslation('common');

  if (user?.isActive) return <Navigate to={toDashboard()} />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-lg rounded-3xl border border-white/60 bg-white/90 p-8 text-center shadow-surface">
        <p className="text-3xl font-bold text-foreground">{t('deactivated.title')}</p>
        <p className="mt-3 text-sm text-muted-foreground">{t('deactivated.message')}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t('deactivated.contactAdmin')}</p>
      </div>
    </div>
  );
}
