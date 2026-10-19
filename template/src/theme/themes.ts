import { darkColors, lightColors, type ThemeColorSlots } from './colors';
import { fontFamily, fontSize, fontWeight, lineHeight } from './typography';
import { layout, spacing } from './spacing';
import { radii } from './radii';
import { shadows } from './shadows';

export type ThemeMode = 'light' | 'dark';
export type ResolvedThemeMode = ThemeMode; // System mode is resolved to a concrete value.

export type Theme = {
  mode: ResolvedThemeMode;
  colors: ThemeColorSlots;
  spacing: typeof spacing;
  layout: typeof layout;
  radii: typeof radii;
  fontFamily: typeof fontFamily;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
  lineHeight: typeof lineHeight;
  shadows: typeof shadows;
};

export const lightTheme: Theme = {
  mode: 'light',
  colors: lightColors,
  spacing,
  layout,
  radii,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  shadows,
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: darkColors,
  spacing,
  layout,
  radii,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  shadows,
};

export const themes = { light: lightTheme, dark: darkTheme } as const;
