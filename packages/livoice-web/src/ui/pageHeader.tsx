import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  toolbar?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, actions, toolbar, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-4 z-40 flex flex-col gap-6 rounded-3xl border border-white/60 bg-white/70 px-6 py-5 mb-6 shadow-sm backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
        {toolbar ? <div className="flex flex-1 flex-wrap gap-3 sm:justify-end">{toolbar}</div> : null}
        {actions}
      </div>
    </header>
  );
}
