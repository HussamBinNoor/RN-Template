import React from 'react';
import { Pressable, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { AppText } from '@/components/common/AppText';

export type AppCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  testID?: string;
};

export function AppCheckbox({
  checked,
  onChange,
  label,
  disabled,
  testID,
}: AppCheckboxProps): React.JSX.Element {
  const theme = useAppTheme();
  return (
    <Pressable
      onPress={() => !disabled && onChange(!checked)}
      disabled={disabled}
      testID={testID}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled: !!disabled }}
      accessibilityLabel={label}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
      }}>
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: theme.radii.sm,
          borderWidth: 2,
          borderColor: checked ? theme.colors.primary : theme.colors.borderStrong,
          backgroundColor: checked ? theme.colors.primary : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {checked ? <Check size={14} color={theme.colors.primaryContrast} /> : null}
      </View>
      {label ? (
        <AppText variant="body" style={{ marginLeft: theme.spacing.sm }}>
          {label}
        </AppText>
      ) : null}
    </Pressable>
  );
}
