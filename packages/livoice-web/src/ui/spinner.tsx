import { cn } from '@/lib/cn';

interface SpinnerProps {
  className?: string;
  size?: number;
}

export function Spinner({ className, size = 5 }: SpinnerProps) {
  return (
    <span className={cn('inline-flex items-center justify-center', className)}>
      <span
        className="inline-block animate-spin rounded-full border-2 border-primary border-t-transparent"
        style={{ width: `${size}rem`, height: `${size}rem` }}
      />
    </span>
  );
}
