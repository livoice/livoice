import type { ControllerFieldState, FieldValues, UseFormStateReturn } from 'react-hook-form';

type MinimalFormState = Pick<UseFormStateReturn<FieldValues>, 'isSubmitted'>;

type MinimalFieldState = Pick<ControllerFieldState, 'error' | 'isDirty'>;

/**
 * Determines whether an input should surface its validation error based on the field state
 * and the overall form submission status.
 */
export function shouldShowError(fieldState: MinimalFieldState, formState: MinimalFormState): boolean {
  if (!fieldState.error) {
    return false;
  }

  return fieldState.isDirty || formState.isSubmitted;
}
