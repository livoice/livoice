export interface OptionsGroupFieldProps {
  type: 'checkbox' | 'radio';
  label: string;
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  error?: boolean;
  helperText?: string;
  row?: boolean;
}

export default function OptionsGroupField({
  type,
  label,
  options,
  value,
  onChange,
  error = false,
  helperText,
  row = false
}: OptionsGroupFieldProps) {
  const isMulti = type === 'checkbox';
  const currentValue = isMulti ? (value as string[]) : value;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, optionValue: string) => {
    const checked = event.target.checked;
    const nextValue = isMulti
      ? checked
        ? [...currentValue, optionValue]
        : (currentValue as string[]).filter(v => v !== optionValue)
      : optionValue;
    onChange(nextValue);
  };

  const isChecked = (optionValue: string) =>
    isMulti ? (currentValue as string[]).includes(optionValue) : currentValue === optionValue;

  return (
    <fieldset className="flex flex-col gap-2 rounded-2xl border border-white/60 bg-white/60 p-4 text-sm">
      <legend className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</legend>
      <div className={row ? 'flex flex-wrap gap-3' : 'flex flex-col gap-2'}>
        {options.map(({ value: optionValue, label: optionLabel }) => (
          <label
            key={optionValue}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-foreground transition hover:bg-foreground/5"
          >
            <input
              type={type}
              className="h-4 w-4 rounded border border-border text-primary transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              checked={isChecked(optionValue)}
              onChange={event => handleChange(event, optionValue)}
            />
            <span>{optionLabel}</span>
          </label>
        ))}
      </div>
      {helperText ? (
        <p className={error ? 'text-destructive text-xs' : 'text-muted-foreground text-xs'}>{helperText}</p>
      ) : null}
    </fieldset>
  );
}
