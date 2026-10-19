import React from 'react';
import { View, type StyleProp, type ViewStyle, type PressableProps, Pressable } from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import type { ShadowLevel } from '@/theme/shadows';

export type AppCardProps = {
  children: React.ReactNode;
  onPress?: PressableProps['onPress'];
  elevation?: ShadowLevel;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function AppCard({
  children,
  onPress,
  elevation = 'sm',
  padded = true,
  style,
  testID,
}: AppCardProps): React.JSX.Element {
  const theme = useAppTheme();
  const contentStyle: ViewStyle = {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radii.lg,
    borderColor: theme.colors.border,
    borderWidth: 1,
    padding: padded ? theme.layout.cardPadding : 0,
    ...theme.shadows[elevation],
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        testID={testID}
        accessibilityRole="button"
        style={({ pressed }) => [contentStyle, { opacity: pressed ? 0.9 : 1 }, style]}>
        {children}
      </Pressable>
    );
  }

  return (
    <View testID={testID} style={[contentStyle, style]}>
      {children}
    </View>
  );
}
