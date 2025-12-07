import type { ComponentType, ForwardRefExoticComponent } from 'react';
import { Controller } from 'react-hook-form';
import type {
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn
} from 'react-hook-form';

import { shouldShowError } from './useFormErrorDisplay';

export interface ControlledFieldRenderArgs<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
  showError: boolean;
}

type ComponentPropsProducer<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TComponentProps
> = (args: ControlledFieldRenderArgs<TFieldValues, TName>) => TComponentProps;

interface ErrorProps {
  helperText?: string;
  error?: boolean;
}

type ControlledFieldComponent<TComponentProps extends object> =
  | ComponentType<TComponentProps>
  | ForwardRefExoticComponent<TComponentProps>;

export interface ControlledFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TComponentProps extends object
> extends Omit<ControllerProps<TFieldValues, TName>, 'render'> {
  FieldComponent: ControlledFieldComponent<TComponentProps>;
  componentProps?: Partial<TComponentProps> | ComponentPropsProducer<TFieldValues, TName, Partial<TComponentProps>>;
  errorProps?: (args: { showError: boolean; errorMessage?: string }) => Partial<TComponentProps>;
}

/**
 * Generic `Controller` wrapper that renders any field component while wiring up form state and error props.
 */
export function ControlledField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TComponentProps extends object
>({
  FieldComponent,
  componentProps,
  errorProps,
  ...controllerProps
}: ControlledFieldProps<TFieldValues, TName, TComponentProps>) {
  return (
    <Controller
      {...controllerProps}
      render={({ field, fieldState, formState }) => {
        const showError = shouldShowError(fieldState, formState);
        const sharedArgs: ControlledFieldRenderArgs<TFieldValues, TName> = {
          field,
          fieldState,
          formState,
          showError
        };

        const resolvedComponentProps =
          typeof componentProps === 'function' ? componentProps(sharedArgs) : (componentProps ?? {});

        const resolvedErrorProps: Partial<TComponentProps> = errorProps
          ? errorProps({ showError, errorMessage: fieldState.error?.message })
          : ({
              error: showError,
              helperText: showError ? fieldState.error?.message : undefined
            } as Partial<TComponentProps> & ErrorProps);

        const mergedProps: TComponentProps = {
          ...(field as unknown as TComponentProps),
          ...resolvedComponentProps,
          ...resolvedErrorProps
        };

        const FieldComponentImpl = FieldComponent as ComponentType<TComponentProps>;

        return <FieldComponentImpl {...mergedProps} />;
      }}
    />
  );
}
