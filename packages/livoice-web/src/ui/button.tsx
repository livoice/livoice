import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-[13px] font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
        outline: 'border border-border bg-white/60 hover:bg-white text-foreground',
        secondary: 'bg-white/80 text-foreground hover:bg-white shadow-sm',
        ghost: 'hover:bg-foreground/5 text-muted-foreground hover:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        glass: 'bg-white/40 backdrop-blur-sm border border-white/50 text-foreground hover:bg-white/60 shadow-sm'
      },
      size: {
        default: 'h-9 px-4',
        sm: 'h-8 rounded-full px-3 text-[12px]',
        lg: 'h-10 rounded-full px-6 text-sm',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
);
Button.displayName = 'Button';

export { Button, buttonVariants };

