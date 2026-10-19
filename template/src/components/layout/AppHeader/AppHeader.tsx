import React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { AppText } from '@/components/common/AppText';
import { AppIcon, type AppIconProps } from '@/components/common/AppIcon';

export type AppHeaderAction = {
  icon: AppIconProps['name'];
  onPress: () => void;
  accessibilityLabel?: string;
};

export type AppHeaderProps = {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  centerTitle?: boolean;
  rightActions?: ReadonlyArray<AppHeaderAction>;
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function AppHeader({
  title,
  subtitle,
  showBack = true,
  onBack,
  centerTitle = false,
  rightActions,
  bordered = true,
  style,
}: AppHeaderProps): React.JSX.Element {
  const theme = useAppTheme();
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBack) onBack();
    else if (navigation.canGoBack()) navigation.goBack();
  };

  const canShowBack = showBack && (!!onBack || navigation.canGoBack());

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 56,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          backgroundColor: theme.colors.surfaceElevated,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: bordered ? 1 : 0,
        },
        style,
      ]}
      accessibilityRole="header">
      <View style={{ width: 64, alignItems: 'flex-start' }}>
        {canShowBack ? (
          <Pressable
            onPress={handleBack}
            hitSlop={theme.layout.hitSlop}
            accessibilityRole="button"
            accessibilityLabel={onBack ? 'Close' : 'Go back'}>
            <ChevronLeft size={28} color={theme.colors.text} />
          </Pressable>
        ) : null}
      </View>

      <View style={{ flex: 1, alignItems: centerTitle ? 'center' : 'flex-start' }}>
        {title ? (
          <AppText variant="title" weight="bold" numberOfLines={1}>
            {title}
          </AppText>
        ) : null}
        {subtitle ? (
          <AppText variant="caption" color={theme.colors.textMuted} numberOfLines={1}>
            {subtitle}
          </AppText>
        ) : null}
      </View>

      <View style={{ width: 64, flexDirection: 'row', justifyContent: 'flex-end' }}>
        {rightActions?.map((a, idx) => (
          <Pressable
            key={`${a.icon}-${idx}`}
            onPress={a.onPress}
            hitSlop={theme.layout.hitSlop}
            accessibilityRole="button"
            accessibilityLabel={a.accessibilityLabel ?? a.icon}
            style={idx > 0 ? { marginLeft: theme.spacing.md } : undefined}>
            <AppIcon name={a.icon} size={theme.layout.iconSize.md} color={theme.colors.text} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
