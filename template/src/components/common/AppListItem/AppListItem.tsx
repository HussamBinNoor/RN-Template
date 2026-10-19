import React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { AppText } from '@/components/common/AppText';
import { AppAvatar, type AppAvatarSize } from '@/components/common/AppAvatar';
import { AppIcon, type AppIconProps } from '@/components/common/AppIcon';

export type AppListItemProps = {
  title: string;
  subtitle?: string;
  description?: string;
  leftIcon?: AppIconProps['name'];
  leftAvatar?: { name?: string; uri?: string; size?: AppAvatarSize };
  rightIcon?: AppIconProps['name'];
  showChevron?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function AppListItem({
  title,
  subtitle,
  description,
  leftIcon,
  leftAvatar,
  rightIcon,
  showChevron = true,
  onPress,
  disabled,
  style,
  testID,
}: AppListItemProps): React.JSX.Element {
  const theme = useAppTheme();
  const inner = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.layout.screenPadding,
          backgroundColor: theme.colors.surfaceElevated,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: 1,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      testID={testID}
      accessibilityRole={onPress ? 'button' : undefined}>
      {leftAvatar ? (
        <View style={{ marginRight: theme.spacing.md }}>
          <AppAvatar name={leftAvatar.name} uri={leftAvatar.uri} size={leftAvatar.size ?? 'md'} />
        </View>
      ) : leftIcon ? (
        <View style={{ marginRight: theme.spacing.md }}>
          <AppIcon name={leftIcon} size={theme.layout.iconSize.md} color={theme.colors.primary} />
        </View>
      ) : null}

      <View style={{ flex: 1 }}>
        <AppText variant="body" weight="medium">
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="caption" color={theme.colors.textMuted}>
            {subtitle}
          </AppText>
        ) : null}
        {description ? (
          <AppText variant="bodySmall" color={theme.colors.textMuted} style={{ marginTop: 2 }}>
            {description}
          </AppText>
        ) : null}
      </View>

      {rightIcon ? (
        <AppIcon name={rightIcon} size={theme.layout.iconSize.md} color={theme.colors.textMuted} />
      ) : showChevron ? (
        <ChevronRight size={theme.layout.iconSize.md} color={theme.colors.textMuted} />
      ) : null}
    </View>
  );

  if (!onPress) return inner;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: theme.colors.surfaceMuted }}>
      {inner}
    </Pressable>
  );
}
