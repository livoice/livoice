import type { ReactNode } from 'react';

import { cn } from '../lib/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <div
    className={cn(
      'w-full rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.15)] backdrop-blur',
      className
    )}
  >
    {children}
  </div>
);
