import { useTranslation } from 'react-i18next';

import { useAuth } from '@/hooks/auth/useAuth';
import { PageHeader } from '@/ui';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useTranslation('common');

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={t('sidebar.dashboard')} />
      <div className="flex-1 p-4 sm:p-6">
        {t('welcome', { name: user?.displayName || user?.email || t('appName') })}
      </div>
    </div>
  );
}
