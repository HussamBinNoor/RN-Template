import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { AppText } from '@/components/common/AppText';

export type AppLoaderProps = {
  label?: string;
  fullScreen?: boolean;
  size?: 'small' | 'large';
};

export function AppLoader({
  label,
  fullScreen,
  size = 'large',
}: AppLoaderProps): React.JSX.Element {
  const theme = useAppTheme();
  return (
    <View
      style={{
        flex: fullScreen ? 1 : 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.layout.screenPadding,
      }}
      accessibilityLabel={label ?? 'Loading'}
      accessibilityRole="progressbar">
      <ActivityIndicator size={size} color={theme.colors.primary} />
      {label ? (
        <AppText
          variant="bodySmall"
          color={theme.colors.textMuted}
          style={{ marginTop: theme.spacing.sm }}>
          {label}
        </AppText>
      ) : null}
    </View>
  );
}
