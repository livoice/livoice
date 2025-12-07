import { Card, CardContent } from '@/ui';

export interface LocationCardProps {
  name: string;
  timezone?: string | null;
  workingDays?: string[] | null;
  weekStartDay?: string | null;
  holidayCountry?: string | null;
}

export default function LocationCard({ name, timezone, workingDays, weekStartDay, holidayCountry }: LocationCardProps) {
  const workingDaysLabel = Array.isArray(workingDays) && workingDays.length ? workingDays.join(', ') : null;

  return (
    <Card className="border-white/60 bg-white/70 shadow-sm">
      <CardContent className="space-y-4 p-5">
        <div>
          <p className="text-lg font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">Week starts on {weekStartDay || '—'}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {timezone ? (
            <span className="rounded-full border border-border bg-white/80 px-3 py-1 text-[11px]">TZ: {timezone}</span>
          ) : null}
          {holidayCountry ? (
            <span className="rounded-full border border-border bg-white/80 px-3 py-1 text-[11px]">Holidays: {holidayCountry}</span>
          ) : null}
        </div>
        {workingDaysLabel ? (
          <div className="rounded-2xl border border-dashed border-border/70 bg-white/70 p-3 text-sm text-muted-foreground">
            Working days: <span className="font-medium text-foreground">{workingDaysLabel}</span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
