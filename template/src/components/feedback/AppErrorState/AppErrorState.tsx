import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { AppText } from '@/components/common/AppText';
import { AppButton, type AppButtonProps } from '@/components/common/AppButton';

export type AppErrorStateProps = {
  title?: string;
  message?: string;
  error?: unknown;
  onRetry?: () => void;
  style?: StyleProp<ViewStyle>;
  retryLabel?: string;
  retryVariant?: AppButtonProps['variant'];
};

function extractMessage(error: unknown): string | undefined {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return undefined;
}

export function AppErrorState({
  title = 'Something went wrong',
  message,
  error,
  onRetry,
  style,
  retryLabel = 'Try again',
  retryVariant = 'primary',
}: AppErrorStateProps): React.JSX.Element {
  const theme = useAppTheme();
  const text = message ?? extractMessage(error) ?? 'An unexpected error occurred.';
  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.layout.screenPadding,
        },
        style,
      ]}
      accessibilityRole="alert">
      <AlertCircle
        size={48}
        color={theme.colors.danger}
        style={{ marginBottom: theme.spacing.md }}
      />
      <AppText variant="title" weight="semibold" align="center">
        {title}
      </AppText>
      <AppText
        variant="body"
        color={theme.colors.textMuted}
        align="center"
        style={{ marginTop: theme.spacing.xs, maxWidth: 320 }}>
        {text}
      </AppText>
      {onRetry ? (
        <View style={{ marginTop: theme.spacing.lg }}>
          <AppButton label={retryLabel} variant={retryVariant} onPress={onRetry} />
        </View>
      ) : null}
    </View>
  );
}
