import type { ButtonHTMLAttributes } from 'react';

import { cn } from '../lib/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  size?: 'default' | 'sm';
}

export const Button = ({ variant = 'primary', size = 'default', className, ...props }: ButtonProps) => (
  <button
    className={cn(
      'inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500/80',
      variant === 'ghost'
        ? 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50'
        : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl shadow-indigo-500/20 hover:from-violet-700 hover:to-indigo-700',
      size === 'sm' ? 'px-4 py-2' : 'px-5 py-2.5',
      className
    )}
    {...props}
  />
);
