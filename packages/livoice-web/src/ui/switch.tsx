import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

const Switch = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, disabled, ...props }, ref) => (
    <label className="relative inline-flex cursor-pointer items-center">
      <input ref={ref} type="checkbox" className="peer sr-only" disabled={disabled} {...props} />
      <span
        className={cn(
          'h-6 w-11 rounded-full border border-border bg-muted transition-colors duration-200',
          disabled ? 'bg-border/40' : 'peer-checked:border-primary peer-checked:bg-primary'
        )}
      />
      <span
        className={cn(
          'absolute left-0.5 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 peer-checked:translate-x-5',
          disabled ? 'bg-white/70' : ''
        )}
      />
    </label>
  )
);

Switch.displayName = 'Switch';

export { Switch };
