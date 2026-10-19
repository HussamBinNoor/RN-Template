/**
 * Border radius tokens.
 */
export const radii = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 999,
  circle: 9999,
} as const;

export type Radius = keyof typeof radii;
