import UserAvatar from '@/components/Avatar/Avatar';
import type {
  PendingTimePlanApprovalsQuery,
  TimePlanStatusType,
  TimePlansQuery,
  User
} from '@/gql/generated';
import { format } from 'date-fns';

import { Badge } from '@/ui';

type RequestItemRequest =
  | NonNullable<PendingTimePlanApprovalsQuery['pendingTimePlanApprovals'][number]['timePlan']>
  | NonNullable<NonNullable<TimePlansQuery['getTimePlans']>[number]>;

export interface RequestItemProps {
  request: RequestItemRequest;
  actions?: React.ReactNode;
}

const statusVariant: Record<TimePlanStatusType, 'success' | 'warning' | 'destructive'> = {
  APPROVED: 'success',
  PENDING: 'warning',
  DECLINED: 'destructive'
};

export default function RequestItem({ request, actions }: RequestItemProps) {
  const fullName =
    request.user?.displayName ||
    [request.user?.firstName, request.user?.lastName].filter(Boolean).join(' ') ||
    request.user?.email ||
    'Unknown';

  const startDate = request.startAt ?? (request as { startDateTime?: string | null }).startDateTime;
  const endDate = request.endAt ?? (request as { endDateTime?: string | null }).endDateTime;
  const dateLabel = [startDate, endDate]
    .map(d => (d ? format(new Date(d as string), 'dd MMM yyyy') : null))
    .filter(Boolean)
    .join(' → ');

  const policyName =
    request.timePolicy?.name ??
    (request as { policy?: { name?: string | null } | null }).policy?.name ??
    'Unassigned policy';
  const durationLabel =
    typeof request.duration === 'number' && request.duration > 0
      ? `${request.duration.toFixed(1)} ${String(request.durationUnit || 'DAY').toLowerCase()}(s)`
      : null;
  const requestType = request.timeType;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <UserAvatar user={request.user as Pick<User, 'displayName' | 'avatarUrl'>} size={40} />
        <div>
          <p className="font-semibold text-foreground">{fullName}</p>
          <p className="text-sm text-muted-foreground">{dateLabel}</p>
          <p className="text-sm text-muted-foreground">
            {policyName}
            {durationLabel ? ` · ${durationLabel}` : null}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {requestType?.name ? (
          <Badge variant="secondary" className="uppercase tracking-wide">
            {requestType.name}
          </Badge>
        ) : null}
        {request.status ? (
          <Badge variant={statusVariant[request.status] || 'neutral'}>{request.status}</Badge>
        ) : null}
        {actions}
      </div>
    </div>
  );
}
