import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';

export type AppDividerProps = {
  vertical?: boolean;
  thickness?: number;
  inset?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function AppDivider({
  vertical,
  thickness = 1,
  inset = 0,
  color,
  style,
}: AppDividerProps): React.JSX.Element {
  const theme = useAppTheme();
  const computedColor = color ?? theme.colors.border;
  return (
    <View
      style={[
        vertical
          ? {
              width: thickness,
              alignSelf: 'stretch',
              marginVertical: inset,
              backgroundColor: computedColor,
            }
          : {
              height: thickness,
              alignSelf: 'stretch',
              marginHorizontal: inset,
              backgroundColor: computedColor,
            },
        style,
      ]}
      accessibilityRole="none"
    />
  );
}
