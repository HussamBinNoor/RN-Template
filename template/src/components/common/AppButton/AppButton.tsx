import React from 'react';
import {
  Pressable,
  StyleSheet,
  ActivityIndicator,
  View,
  type StyleProp,
  type ViewStyle,
  type GestureResponderEvent,
} from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { AppText } from '@/components/common/AppText';
import { AppIcon, type AppIconProps } from '@/components/common/AppIcon';

export type AppButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type AppButtonSize = 'sm' | 'md' | 'lg';

export type AppButtonProps = {
  label: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: AppIconProps['name'];
  rightIcon?: AppIconProps['name'];
  accessibilityLabel?: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
};

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  fullWidth,
  loading,
  disabled,
  leftIcon,
  rightIcon,
  accessibilityLabel,
  testID,
  style,
}: AppButtonProps): React.JSX.Element {
  const theme = useAppTheme();

  const height = theme.layout.buttonHeight[size];
  const isDisabled = disabled || loading;

  const palette = (() => {
    switch (variant) {
      case 'primary':
        return {
          bg: theme.colors.primary,
          bgPressed: theme.colors.primaryHover,
          fg: theme.colors.primaryContrast,
          border: 'transparent',
        };
      case 'secondary':
        return {
          bg: theme.colors.surfaceMuted,
          bgPressed: theme.colors.border,
          fg: theme.colors.text,
          border: 'transparent',
        };
      case 'outline':
        return {
          bg: 'transparent',
          bgPressed: theme.colors.surfaceMuted,
          fg: theme.colors.text,
          border: theme.colors.borderStrong,
        };
      case 'ghost':
        return {
          bg: 'transparent',
          bgPressed: theme.colors.surfaceMuted,
          fg: theme.colors.primary,
          border: 'transparent',
        };
      case 'destructive':
        return {
          bg: theme.colors.danger,
          bgPressed: theme.colors.danger,
          fg: theme.colors.textInverse,
          border: 'transparent',
        };
    }
  })();

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: !!isDisabled, busy: !!loading }}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: pressed ? palette.bgPressed : palette.bg,
          borderColor: palette.border,
          borderWidth: variant === 'outline' ? 1 : 0,
          height,
          paddingHorizontal: theme.spacing.lg,
          borderRadius: theme.radii.md,
          opacity: isDisabled ? 0.6 : 1,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color={palette.fg} />
      ) : (
        <View style={styles.row}>
          {leftIcon ? (
            <View style={{ marginRight: theme.spacing.sm }}>
              <AppIcon name={leftIcon} size={theme.layout.iconSize.md} color={palette.fg} />
            </View>
          ) : null}
          <AppText
            variant="button"
            color={palette.fg}
            uppercase
            weight="bold"
            style={{ fontSize: theme.fontSize.xs }}>
            {label}
          </AppText>
          {rightIcon ? (
            <View style={{ marginLeft: theme.spacing.sm }}>
              <AppIcon name={rightIcon} size={theme.layout.iconSize.md} color={palette.fg} />
            </View>
          ) : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
