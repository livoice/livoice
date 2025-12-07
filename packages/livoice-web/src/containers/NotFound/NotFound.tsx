import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const { t } = useTranslation('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-background px-4 text-center">
      <p className="text-sm font-semibold text-slate-500">404</p>
      <h1 className="text-3xl font-bold text-slate-900">{t('notFound')}</h1>
      <p className="text-sm text-slate-500">{t('notFoundDescription')}</p>
      <Link to="/" className="text-sm font-semibold text-sky-600 hover:underline">
        {t('buttons.goToDashboard')}
      </Link>
    </div>
  );
}
