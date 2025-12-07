import { cn } from '@/lib/cn';

interface SegmentedProps<T extends string> {
  value: T;
  onChange: (val: T) => void;
  options: { value: T; label: string }[];
}

export default function Segmented<T extends string>({ value, onChange, options }: SegmentedProps<T>) {
  return (
    <div className="flex items-center rounded-full border border-border bg-white/70 p-1 shadow-sm">
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            'rounded-full px-4 py-1 text-sm font-semibold transition-all duration-150',
            value === option.value
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
