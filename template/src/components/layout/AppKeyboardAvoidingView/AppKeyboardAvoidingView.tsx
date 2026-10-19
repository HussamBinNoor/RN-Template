import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  type KeyboardAvoidingViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { ScrollView } from 'react-native';

export type AppKeyboardAvoidingViewProps = Omit<KeyboardAvoidingViewProps, 'behavior'> & {
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

/**
 * Wraps inputs in KeyboardAvoidingView (padding) and an optional ScrollView
 * with keyboardShouldPersistTaps="handled" so taps on background dismiss the
 * keyboard and taps on buttons don't get swallowed.
 */
export function AppKeyboardAvoidingView({
  scroll = false,
  contentStyle,
  children,
  style,
  ...rest
}: AppKeyboardAvoidingViewProps): React.JSX.Element {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[{ flex: 1 }, style]}
      {...rest}>
      {scroll ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[{ flexGrow: 1 }, contentStyle]}>
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </KeyboardAvoidingView>
  );
}
