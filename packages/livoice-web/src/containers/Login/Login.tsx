import GoogleIcon from '@/assets/Google.svg?react';
import StandalonePageLayout from '@/layouts/StandalonePageLayout/StandalonePageLayout';
import useAuth from '@/providers/auth/useAuth';
import { toDashboard } from '@/services/linker';
import { Button, Card } from '@/ui';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router';

export default function Login() {
  const { user } = useAuth();
  const { t } = useTranslation('common');

  if (user) return <Navigate to={toDashboard()} />;

  const onSignIn = () => signIn('google');

  return (
    <StandalonePageLayout className="items-center justify-center px-4">
      <Card className="w-full max-w-sm space-y-6 p-6 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          {t('loginTo')} {t('appName')}
        </h1>
        <div className="h-px bg-border/60" />
        <Button variant="outline" className="w-full justify-center gap-3" onClick={onSignIn}>
          <GoogleIcon className="h-6 w-6" />
          {t('buttons.signInWithGoogle')}
        </Button>
      </Card>
    </StandalonePageLayout>
  );
}
