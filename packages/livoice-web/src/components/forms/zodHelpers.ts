import { z } from 'zod';

export interface NumericFieldSchemaMessages {
  requiredMessage: string;
  wholeNumberMessage: string;
  nonNegativeMessage: string;
}

export interface NumericFieldSchemaOptions extends NumericFieldSchemaMessages {
  minValue?: number;
}

/**
 * Creates a Zod schema for non-negative integers that mirrors the validation rules currently used
 * across label creation numeric fields.
 */
export function createNumericFieldSchema({
  requiredMessage,
  wholeNumberMessage,
  nonNegativeMessage,
  minValue = 0
}: NumericFieldSchemaOptions) {
  return z
    .number(requiredMessage)
    .refine(value => Number.isFinite(value))
    .int(wholeNumberMessage)
    .min(minValue, nonNegativeMessage);
}
