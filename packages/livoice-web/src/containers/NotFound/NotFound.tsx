import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button } from '@/ui';

export default function NotFound() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/90 p-8 text-center shadow-elevated">
        <p className="text-6xl font-black text-primary">404</p>
        <p className="mt-4 text-2xl font-semibold text-foreground">{t('notFound')}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t('notFoundDescription')}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button className="px-6 py-2" onClick={() => navigate('/')}>
              {t('buttons.goToDashboard')}
            </Button>
          <Button variant="outline" className="px-6 py-2" onClick={() => navigate(-1)}>
              {t('buttons.back')}
            </Button>
        </div>
      </div>
    </div>
  );
}
