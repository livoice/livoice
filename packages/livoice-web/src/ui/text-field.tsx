import {
  forwardRef,
  type ForwardedRef,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes
} from 'react';

import { cn } from '@/lib/cn';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: boolean;
  select?: boolean;
  selectProps?: SelectHTMLAttributes<HTMLSelectElement>;
  children?: React.ReactNode;
  fullWidth?: boolean;
  adornment?: React.ReactNode;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  multiline?: boolean;
  rows?: number;
}

const baseInputStyles =
  'w-full rounded-full border border-input bg-background px-4 py-3 text-sm text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const selectStyles =
  'w-full rounded-full border border-input bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

const TextField = forwardRef<HTMLInputElement | HTMLSelectElement, TextFieldProps>(
  (
    {
      label,
      helperText,
      error,
      select,
      selectProps,
      children,
      className,
      fullWidth,
      adornment,
      type,
      inputProps,
      multiline = false,
      rows,
      ...props
    },
    ref
  ) => {
    const sharedClasses = cn(
      baseInputStyles,
      error && 'border-destructive focus-visible:ring-destructive/60',
      className
    );

    const selectClasses = cn(selectStyles, error && 'border-destructive focus-visible:ring-destructive/60', className);

    const textareaClasses = cn(sharedClasses, 'min-h-[6rem] resize-none py-3');

    const content = select ? (
      <select
        ref={ref as ForwardedRef<HTMLSelectElement>}
        className={cn(selectClasses, fullWidth ? 'w-full' : '')}
        {...selectProps}
        {...(props as SelectHTMLAttributes<HTMLSelectElement>)}
        {...(inputProps as SelectHTMLAttributes<HTMLSelectElement>)}
      >
        {children}
      </select>
    ) : multiline ? (
      <textarea
        ref={ref as ForwardedRef<HTMLTextAreaElement>}
        rows={rows}
        className={cn(textareaClasses, fullWidth ? 'w-full' : '')}
        aria-invalid={error ? 'true' : undefined}
        {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        {...(inputProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    ) : (
      <input
        ref={ref as ForwardedRef<HTMLInputElement>}
        type={type}
        className={cn(sharedClasses, fullWidth ? 'w-full' : '')}
        aria-invalid={error ? 'true' : undefined}
        {...props}
        {...inputProps}
      />
    );

    return (
      <label className={cn('flex flex-col gap-1 text-sm', fullWidth ? 'w-full' : '')}>
        {label ? (
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
        ) : null}
        <div className="relative w-full">
          {content}
          {adornment ? (
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
              {adornment}
            </span>
          ) : null}
        </div>
        {helperText ? (
          <span className={cn('text-xs', error ? 'text-destructive' : 'text-muted-foreground')}>{helperText}</span>
        ) : null}
      </label>
    );
  }
);

TextField.displayName = 'TextField';

export { TextField };
