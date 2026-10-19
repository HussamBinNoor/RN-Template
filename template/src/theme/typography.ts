/**
 * Typography tokens.
 * Font sizes are in pt; line heights are unit-less multipliers.
 */

export const fontFamily = {
  // RN does not ship a system font by default in 0.87; these resolve to platform defaults.
  // Replace with custom fonts by adding to `react-native.config.js` and `Info.plist` / `assets/fonts`.
  regular: undefined as string | undefined,
  medium: undefined as string | undefined,
  bold: undefined as string | undefined,
  mono: 'Menlo',
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  display: 40,
} as const;

export const lineHeight = {
  xs: 1.4,
  sm: 1.4,
  md: 1.4,
  lg: 1.35,
  xl: 1.3,
  xxl: 1.25,
  xxxl: 1.2,
  display: 1.1,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
