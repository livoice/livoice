import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface StatCardProps {
  title: string;
  value: ReactNode;
  subtitle?: string;
  accent?: 'primary' | 'success' | 'warning' | 'neutral';
  className?: string;
  footer?: ReactNode;
}

const accentClasses: Record<NonNullable<StatCardProps['accent']>, string> = {
  primary: 'from-primary/10 via-white to-white',
  success: 'from-success/10 via-white to-white',
  warning: 'from-warning/20 via-white to-white',
  neutral: 'from-muted via-white to-white'
};

export function StatCard({ title, value, subtitle, accent = 'primary', footer, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/60 bg-gradient-to-br p-5 shadow-card backdrop-blur-lg',
        accentClasses[accent],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
          {subtitle ? <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{subtitle}</p> : null}
        </div>
      </div>
      {footer ? <div className="mt-4 text-sm text-muted-foreground">{footer}</div> : null}
    </div>
  );
}

