import React, { forwardRef } from 'react';
import { Search, X } from 'lucide-react-native';
import { AppTextInput, type AppTextInputProps } from '@/components/common/AppTextInput';

export type AppSearchInputProps = Omit<AppTextInputProps, 'leftIcon'> & {
  onClear?: () => void;
};

export const AppSearchInput = forwardRef<
  React.ComponentRef<typeof AppTextInput>,
  AppSearchInputProps
>(function AppSearchInput({ onClear, value, rightIcon, ...rest }, ref) {
  const showClear = !!value && !!onClear;
  return (
    <AppTextInput
      ref={ref}
      value={value}
      leftIcon="Search"
      autoCorrect={false}
      autoCapitalize="none"
      returnKeyType="search"
      clearButtonMode="while-editing"
      rightIcon={showClear ? 'X' : rightIcon}
      onRightIconPress={() => {
        if (showClear) onClear?.();
      }}
      {...rest}
    />
  );
});

// Use the icons as React components for the leftIcon prop — AppTextInput expects a name.
// We override the prop type to allow a Lucide component if needed by re-exporting.
export { Search, X };
