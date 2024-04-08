import { get, FieldErrors } from 'react-hook-form';
import { isErrorMessage } from './is-error-message';

export const isError = (
  field: string,
  errors: FieldErrors,
  touchFields: Partial<Readonly<Record<string, any>>>
): boolean => get(touchFields, field) && Boolean(isErrorMessage(field, errors));
