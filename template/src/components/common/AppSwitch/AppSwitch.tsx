import React from 'react';
import { Switch, View, type ViewStyle, type StyleProp } from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { AppText } from '@/components/common/AppText';

export type AppSwitchProps = {
  value: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function AppSwitch({
  value,
  onChange,
  label,
  description,
  disabled,
  style,
}: AppSwitchProps): React.JSX.Element {
  const theme = useAppTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: theme.spacing.sm,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}>
      <View style={{ flex: 1 }}>
        {label ? <AppText variant="body">{label}</AppText> : null}
        {description ? (
          <AppText variant="caption" color={theme.colors.textMuted}>
            {description}
          </AppText>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
        thumbColor={theme.colors.surfaceElevated}
        ios_backgroundColor={theme.colors.border}
        accessibilityRole="switch"
        accessibilityState={{ checked: value, disabled: !!disabled }}
        accessibilityLabel={label}
      />
    </View>
  );
}
