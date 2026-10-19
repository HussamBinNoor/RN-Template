/**
 * Spacing scale (4-pt baseline grid).
 */
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
  giant: 64,
} as const;

export type Spacing = keyof typeof spacing;

/** Common layout dimensions. */
export const layout = {
  screenPadding: spacing.lg,
  cardPadding: spacing.lg,
  inputHeight: 48,
  buttonHeight: {
    sm: 36,
    md: 44,
    lg: 52,
  },
  iconSize: {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  },
  hitSlop: { top: 8, right: 8, bottom: 8, left: 8 },
} as const;
