import React from 'react';
import { Text, type TextProps, type TextStyle, type StyleProp } from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import type { FontSize, FontWeight } from '@/theme/typography';

export type AppTextVariant =
  | 'display'
  | 'heading'
  | 'subheading'
  | 'title'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label'
  | 'button';

export type AppTextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';

export type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  size?: FontSize;
  weight?: FontWeight;
  color?: string;
  align?: AppTextAlign;
  uppercase?: boolean;
};

const variantToSize = (variant: AppTextVariant): FontSize => {
  switch (variant) {
    case 'display':
      return 'display';
    case 'heading':
      return 'xxxl';
    case 'subheading':
      return 'xxl';
    case 'title':
      return 'xl';
    case 'body':
      return 'md';
    case 'bodySmall':
      return 'sm';
    case 'caption':
      return 'xs';
    case 'label':
      return 'sm';
    case 'button':
      return 'sm';
  }
};

const variantToWeight = (variant: AppTextVariant): FontWeight => {
  switch (variant) {
    case 'display':
    case 'heading':
    case 'subheading':
      return 'bold';
    case 'title':
      return 'semibold';
    case 'button':
      return 'semibold';
    case 'label':
      return 'medium';
    default:
      return 'regular';
  }
};

export function AppText({
  variant = 'body',
  size,
  weight,
  color,
  align,
  uppercase,
  style,
  children,
  ...rest
}: AppTextProps): React.JSX.Element {
  const theme = useAppTheme();
  const computedSize: FontSize = size ?? variantToSize(variant);
  const computedWeight: FontWeight = weight ?? variantToWeight(variant);
  const computedColor = color ?? theme.colors.text;

  const baseStyle: TextStyle = {
    color: computedColor,
    fontSize: theme.fontSize[computedSize],
    lineHeight: theme.fontSize[computedSize] * theme.lineHeight[computedSize],
    fontWeight: theme.fontWeight[computedWeight] as TextStyle['fontWeight'],
    textAlign: align,
    textTransform: uppercase ? 'uppercase' : undefined,
  };

  const flat = Array.isArray(style)
    ? Object.assign({}, baseStyle, ...style)
    : { ...baseStyle, ...(style as object) };

  return (
    <Text {...rest} style={flat} accessibilityRole={rest.accessibilityRole ?? 'text'}>
      {children}
    </Text>
  );
}

// Helper re-export to suppress unused-import lint warnings for StyleProp in callers.
export type AppTextStyle = StyleProp<TextStyle>;
