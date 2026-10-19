import React from 'react';
import {
  View,
  Image,
  type StyleProp,
  type ViewStyle,
  type ImageStyle,
  type ImageSourcePropType,
} from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { AppText } from '@/components/common/AppText';
import { initials } from '@/utils/strings';

export type AppAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type AppAvatarProps = {
  name?: string;
  uri?: string | ImageSourcePropType;
  size?: AppAvatarSize;
  style?: StyleProp<ViewStyle>;
};

const sizeMap: Record<AppAvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

export function AppAvatar({ name, uri, size = 'md', style }: AppAvatarProps): React.JSX.Element {
  const theme = useAppTheme();
  const px = sizeMap[size];
  const dimension: ViewStyle = { width: px, height: px, borderRadius: theme.radii.circle };
  const innerFontSize = Math.max(10, Math.round(px * 0.42));

  if (uri) {
    const source = typeof uri === 'string' ? { uri } : uri;
    const imageDimension: ImageStyle = {
      width: dimension.width as number,
      height: dimension.height as number,
      borderRadius: dimension.borderRadius as number,
    };
    return (
      <Image
        source={source}
        style={[imageDimension, style as StyleProp<ImageStyle>]}
        accessibilityRole="image"
      />
    );
  }

  const containerStyle: StyleProp<ViewStyle> = [
    dimension,
    {
      backgroundColor: theme.colors.surfaceMuted,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    style,
  ];

  return (
    <View
      style={containerStyle}
      accessibilityRole="image"
      accessibilityLabel={name ? `Avatar for ${name}` : 'Avatar'}>
      <AppText weight="semibold" style={{ fontSize: innerFontSize }} color={theme.colors.text}>
        {initials(name ?? '?')}
      </AppText>
    </View>
  );
}
