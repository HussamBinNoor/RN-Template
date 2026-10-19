import React from 'react';
import { Controller, type FieldValues, type Path, type Control } from 'react-hook-form';
import { AppTextInput, type AppTextInputProps } from '@/components/common/AppTextInput';

export type FormInputProps<T extends FieldValues> = Omit<
  AppTextInputProps,
  'value' | 'onChangeText' | 'onBlur' | 'errorText'
> & {
  control: Control<T>;
  name: Path<T>;
  /** Optional transform applied before the value hits form state (e.g. trim). */
  transform?: (value: string) => unknown;
};

/**
 * React Hook Form-bound wrapper around AppTextInput.
 * Wires `value`, `onChangeText`, `onBlur`, and the field's error automatically.
 */
export function FormInput<T extends FieldValues>({
  control,
  name,
  transform,
  helperText,
  ...rest
}: FormInputProps<T>): React.JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <AppTextInput
          {...rest}
          value={typeof value === 'string' ? value : value == null ? '' : String(value)}
          onChangeText={text => onChange(transform ? transform(text) : text)}
          onBlur={onBlur}
          errorText={error?.message}
          helperText={!error?.message ? helperText : undefined}
        />
      )}
    />
  );
}
