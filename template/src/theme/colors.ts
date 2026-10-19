/**
 * Color tokens for the HBN RN Template.
 * Pure constants — no React Native imports.
 */

export const palette = {
  white: '#FFFFFF',
  black: '#000000',
  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F172A',
  primary50: '#EFF6FF',
  primary100: '#DBEAFE',
  primary200: '#BFDBFE',
  primary300: '#93C5FD',
  primary400: '#60A5FA',
  primary500: '#3B82F6',
  primary600: '#2563EB',
  primary700: '#1D4ED8',
  primary800: '#1E40AF',
  primary900: '#1E3A8A',
  accent500: '#8B5CF6',
  accent600: '#7C3AED',
  success500: '#22C55E',
  success600: '#16A34A',
  warning500: '#F59E0B',
  warning600: '#D97706',
  danger500: '#EF4444',
  danger600: '#DC2626',
  info500: '#0EA5E9',
  info600: '#0284C7',
} as const;

export type ColorToken = keyof typeof palette;

/** Theme color slot names. Values are strings (any). */
export type ThemeColorSlots = {
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceMuted: string;
  border: string;
  borderStrong: string;
  text: string;
  textMuted: string;
  textInverse: string;
  primary: string;
  primaryHover: string;
  primaryContrast: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  overlay: string;
  shadow: string;
};

export const lightColors: ThemeColorSlots = {
  background: palette.white,
  surface: palette.slate50,
  surfaceElevated: palette.white,
  surfaceMuted: palette.slate100,
  border: palette.slate200,
  borderStrong: palette.slate300,
  text: palette.slate900,
  textMuted: palette.slate500,
  textInverse: palette.white,
  primary: palette.primary600,
  primaryHover: palette.primary700,
  primaryContrast: palette.white,
  accent: palette.accent600,
  success: palette.success600,
  warning: palette.warning600,
  danger: palette.danger600,
  info: palette.info600,
  overlay: 'rgba(15, 23, 42, 0.5)',
  shadow: 'rgba(0,0,0,0.08)',
};

export const darkColors: ThemeColorSlots = {
  background: palette.slate900,
  surface: palette.slate800,
  surfaceElevated: palette.slate800,
  surfaceMuted: palette.slate700,
  border: palette.slate700,
  borderStrong: palette.slate600,
  text: palette.slate50,
  textMuted: palette.slate400,
  textInverse: palette.slate900,
  primary: palette.primary400,
  primaryHover: palette.primary300,
  primaryContrast: palette.slate900,
  accent: palette.accent500,
  success: palette.success500,
  warning: palette.warning500,
  danger: palette.danger500,
  info: palette.info500,
  overlay: 'rgba(0, 0, 0, 0.7)',
  shadow: 'rgba(0,0,0,0.4)',
};
