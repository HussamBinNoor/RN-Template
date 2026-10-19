import React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { AppText } from '@/components/common/AppText';

export type AppRadioOption<T extends string | number> = {
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
};

export type AppRadioGroupProps<T extends string | number> = {
  options: ReadonlyArray<AppRadioOption<T>>;
  value: T;
  onChange: (next: T) => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export type AppRadioButtonProps = {
  selected: boolean;
  onPress: () => void;
  label: string;
  description?: string;
  disabled?: boolean;
};

export function AppRadioButton({
  selected,
  onPress,
  label,
  description,
  disabled,
}: AppRadioButtonProps): React.JSX.Element {
  const theme = useAppTheme();
  return (
    <Pressable
      onPress={() => !disabled && onPress()}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled: !!disabled }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.spacing.sm,
        opacity: disabled ? 0.5 : 1,
      }}>
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          borderWidth: 2,
          borderColor: selected ? theme.colors.primary : theme.colors.borderStrong,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {selected ? (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: theme.colors.primary,
            }}
          />
        ) : null}
      </View>
      <View style={{ marginLeft: theme.spacing.sm, flex: 1 }}>
        <AppText variant="body">{label}</AppText>
        {description ? (
          <AppText variant="caption" color={theme.colors.textMuted}>
            {description}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}

export function AppRadioGroup<T extends string | number>({
  options,
  value,
  onChange,
  style,
  accessibilityLabel,
}: AppRadioGroupProps<T>): React.JSX.Element {
  return (
    <View accessibilityLabel={accessibilityLabel} style={style}>
      {options.map(opt => (
        <AppRadioButton
          key={String(opt.value)}
          selected={opt.value === value}
          onPress={() => onChange(opt.value)}
          label={opt.label}
          description={opt.description}
          disabled={opt.disabled}
        />
      ))}
    </View>
  );
}
