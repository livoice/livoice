import { TextField } from '@/ui';
import { forwardRef, type ChangeEvent, type InputHTMLAttributes } from 'react';

interface NumberFieldProps {
  value: number;
  onChange: (value: number) => void;
  allowEmpty?: boolean;
  onValueChange?: (value: number) => void;
  inputProps?: InputHTMLAttributes<HTMLInputElement> | undefined;
  [key: string]: unknown;
}

const sanitizeValue = (value: number): number => (typeof value === 'number' ? value : Number.NaN);

const coerceDisplayValue = (value: number): string | number => (Number.isNaN(value) ? '' : value);

const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ value, onChange, allowEmpty = true, onValueChange, inputProps, ...restProps }, forwardedRef) => {
    const normalizedValue = sanitizeValue(value);
    const displayValue = coerceDisplayValue(normalizedValue);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const nextInputValue = event.target.value;

      if (nextInputValue === '') {
        if (!allowEmpty) {
          return;
        }

        onChange(Number.NaN);
        onValueChange?.(Number.NaN);
        return;
      }

      const parsedValue = Number.parseInt(nextInputValue, 10);
      const nextValue = Number.isNaN(parsedValue) ? Number.NaN : parsedValue;

      onChange(nextValue);
      onValueChange?.(nextValue);
    };

    return (
      <TextField
        {...restProps}
        type="number"
        value={displayValue}
        onChange={handleChange}
        inputProps={inputProps}
        ref={forwardedRef}
      />
    );
  }
);

NumberField.displayName = 'NumberField';

export default NumberField;
