import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { AppText } from '@/components/common/AppText';
import { palette } from '@/theme/colors';

export type AppBadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

export type AppBadgeProps = {
  label: string;
  variant?: AppBadgeVariant;
  style?: StyleProp<ViewStyle>;
};

export function AppBadge({ label, variant = 'neutral', style }: AppBadgeProps): React.JSX.Element {
  const theme = useAppTheme();
  const colors = (() => {
    switch (variant) {
      case 'primary':
        return { bg: theme.colors.primary, fg: theme.colors.primaryContrast };
      case 'success':
        return { bg: palette.success500, fg: palette.white };
      case 'warning':
        return { bg: palette.warning500, fg: palette.white };
      case 'danger':
        return { bg: palette.danger500, fg: palette.white };
      case 'info':
        return { bg: palette.info500, fg: palette.white };
      case 'neutral':
      default:
        return { bg: theme.colors.surfaceMuted, fg: theme.colors.text };
    }
  })();

  return (
    <View
      style={[
        {
          backgroundColor: colors.bg,
          borderRadius: theme.radii.pill,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: 2,
          alignSelf: 'flex-start',
        },
        style,
      ]}
      accessibilityLabel={`Badge ${label}`}>
      <AppText variant="caption" weight="bold" color={colors.fg} uppercase>
        {label}
      </AppText>
    </View>
  );
}
