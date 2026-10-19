/**
 * String utilities. Pure, no React Native imports.
 */

export const truncate = (value: string, max = 50): string =>
  value.length <= max ? value : `${value.slice(0, max - 1)}…`;

export const capitalize = (value: string): string =>
  value.length === 0 ? value : value[0]!.toUpperCase() + value.slice(1);

export const initials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(s => s[0]?.toUpperCase() ?? '')
    .join('');

export const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.length > 0;
