import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  View,
  Pressable,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { AppText } from '@/components/common/AppText';
import { AppIcon, type AppIconName } from '@/components/common/AppIcon';
import { Eye, EyeOff } from 'lucide-react-native';

export type AppTextInputProps = Omit<TextInputProps, 'style'> & {
  label?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  leftIcon?: AppIconName;
  rightIcon?: AppIconName;
  onRightIconPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextInputProps['style']>;
};

export const AppTextInput = forwardRef<React.ComponentRef<typeof TextInput>, AppTextInputProps>(
  function AppTextInput(
    {
      label,
      helperText,
      errorText,
      required,
      leftIcon,
      rightIcon,
      onRightIconPress,
      containerStyle,
      inputStyle,
      secureTextEntry,
      editable = true,
      ...rest
    },
    ref,
  ) {
    const theme = useAppTheme();
    const [focused, setFocused] = useState(false);
    const [internalHidden, setInternalHidden] = useState(!!secureTextEntry);
    const showPasswordToggle = secureTextEntry !== undefined;
    const hidePassword = internalHidden;

    const borderColor = errorText
      ? theme.colors.danger
      : focused
        ? theme.colors.primary
        : theme.colors.border;

    return (
      <View style={[{ width: '100%' }, containerStyle]}>
        {label ? (
          <AppText
            variant="label"
            weight="medium"
            color={errorText ? theme.colors.danger : theme.colors.text}
            style={{ marginBottom: theme.spacing.xs }}>
            {label}
            {required ? ' *' : ''}
          </AppText>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.surfaceElevated,
            borderColor,
            borderWidth: 1,
            borderRadius: theme.radii.md,
            paddingHorizontal: theme.spacing.md,
            height: theme.layout.inputHeight,
            opacity: editable ? 1 : 0.6,
          }}>
          {leftIcon ? (
            <AppIcon
              name={leftIcon}
              size={theme.layout.iconSize.md}
              color={theme.colors.textMuted}
              style={{ marginRight: theme.spacing.sm }}
            />
          ) : null}
          <TextInput
            ref={ref}
            editable={editable}
            secureTextEntry={hidePassword}
            onFocus={e => {
              setFocused(true);
              rest.onFocus?.(e);
            }}
            onBlur={e => {
              setFocused(false);
              rest.onBlur?.(e);
            }}
            placeholderTextColor={theme.colors.textMuted}
            style={[
              {
                flex: 1,
                color: theme.colors.text,
                fontSize: theme.fontSize.md,
                paddingVertical: 0,
              },
              inputStyle,
            ]}
            accessibilityLabel={label ?? rest.placeholder}
            {...rest}
          />
          {showPasswordToggle ? (
            <Pressable
              onPress={() => {
                setInternalHidden(prev => !prev);
                onRightIconPress?.();
              }}
              hitSlop={theme.layout.hitSlop}
              accessibilityRole="button"
              accessibilityLabel={hidePassword ? 'Show password' : 'Hide password'}>
              {hidePassword ? (
                <Eye size={theme.layout.iconSize.md} color={theme.colors.textMuted} />
              ) : (
                <EyeOff size={theme.layout.iconSize.md} color={theme.colors.textMuted} />
              )}
            </Pressable>
          ) : rightIcon ? (
            <Pressable
              onPress={onRightIconPress}
              disabled={!onRightIconPress}
              hitSlop={theme.layout.hitSlop}
              accessibilityRole="button">
              <AppIcon
                name={rightIcon}
                size={theme.layout.iconSize.md}
                color={theme.colors.textMuted}
              />
            </Pressable>
          ) : null}
        </View>
        {errorText ? (
          <AppText
            variant="caption"
            color={theme.colors.danger}
            style={{ marginTop: theme.spacing.xs }}>
            {errorText}
          </AppText>
        ) : helperText ? (
          <AppText
            variant="caption"
            color={theme.colors.textMuted}
            style={{ marginTop: theme.spacing.xs }}>
            {helperText}
          </AppText>
        ) : null}
      </View>
    );
  },
);
