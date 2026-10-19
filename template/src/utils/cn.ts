/**
 * Tiny className concatenation helper. Avoids pulling NativeWind for plain consumers.
 * Accepts strings, undefined, null, false. Numbers are coerced to string.
 */
export type ClassValue = string | number | false | null | undefined;

export const cn = (...classes: ClassValue[]): string => classes.filter(Boolean).join(' ');
