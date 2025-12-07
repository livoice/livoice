import { useAuth } from '@/hooks/auth/useAuth';
import { PageHeader } from '@/ui';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title="Dashboard" />
      <div className="flex-1 p-4 sm:p-6">Hello {user?.displayName}</div>
    </div>
  );
}
