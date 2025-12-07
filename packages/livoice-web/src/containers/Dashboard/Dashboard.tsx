import RequestItem, { type RequestItemProps } from '@/components/RequestItem/RequestItem';
import { useTimePlansQuery } from '@/gql/generated';
import useAuth from '@/providers/auth/useAuth';
import { PageHeader, StatCard } from '@/ui';
import { computeBusinessDays } from '@/utils/timePlans';
import { addMonths, endOfMonth, startOfMonth } from 'date-fns';

function useMonthRange(monthsBack = 1) {
  const end = endOfMonth(new Date());
  const start = startOfMonth(addMonths(new Date(), -monthsBack));
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0]
  };
}

export default function Dashboard() {
  const { user } = useAuth();
  const email = user?.user?.email ?? null;

  const { start, end } = useMonthRange(3);
  const { data } = useTimePlansQuery({ variables: { start, end } });

  const workingDays = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

  const myTimePlans = (data?.getTimePlans ?? []).filter(a => (email ? a?.user?.email === email : true));

  const computeDays = (status: 'APPROVED' | 'PENDING') =>
    myTimePlans
      .filter(a => a?.status === status)
      .map(a => {
        const s = a?.startAt ? new Date(a.startAt as unknown as string) : null;
        const e = a?.endAt ? new Date(a.endAt as unknown as string) : null;
        if (!s || !e) return 0;
        const days = computeBusinessDays({ start: s, end: e, isHalfDay: false, workingDays });
        return Number.isFinite(days) ? Math.max(days, 0) : 0;
      })
      .reduce((a, b) => a + b, 0);

  const approvedDays = computeDays('APPROVED');
  const pendingDays = computeDays('PENDING');
  const allocation = 99;
  const remainingDays = Math.max(allocation - approvedDays - pendingDays, 0);

  const recent = myTimePlans.slice(0, 5);

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title="Dashboard" />
      <div className="flex-1 p-4 sm:p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard title="Allocation" value={`${allocation} days`} subtitle="Annual planned time" />
          <StatCard title="Used" value={`${approvedDays} days`} subtitle="Approved" accent="success" />
          <StatCard
            title="Remaining"
            value={`${remainingDays} days`}
            subtitle={`Pending ${pendingDays}d`}
            accent="warning"
          />
        </div>

        <section className="mt-6 rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-foreground">Recent Requests</p>
            <span className="text-sm text-muted-foreground">Last 5 submissions</span>
          </div>
          <div className="mt-4 space-y-3">
            {recent.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border bg-white/70 p-4 text-sm text-muted-foreground">
                No requests yet
              </p>
            ) : (
              recent.map(r => <RequestItem key={r?.id} request={r as RequestItemProps['request']} />)
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
