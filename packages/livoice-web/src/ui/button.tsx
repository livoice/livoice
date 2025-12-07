import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_12px_30px_rgba(79,70,229,0.35)] hover:from-violet-700 hover:to-indigo-700',
        destructive: 'bg-rose-500 text-white shadow-sm hover:bg-rose-500/90',
        outline: 'border border-slate-200 bg-white/80 text-slate-800 hover:border-slate-300 hover:bg-slate-50',
        secondary: 'bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200',
        ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
        link: 'text-primary underline-offset-4 hover:underline hover:text-slate-900',
        glass: 'bg-white/40 backdrop-blur-sm border border-white/60 text-slate-900 hover:bg-white/60 shadow-sm'
      },
      size: {
        default: 'px-5 py-2.5',
        sm: 'px-4 py-2 text-xs',
        lg: 'px-6 py-3 text-base',
        icon: 'h-10 w-10 justify-center rounded-full px-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
));
Button.displayName = 'Button';

export { Button, buttonVariants };
