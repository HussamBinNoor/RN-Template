/**
 * Shared types.
 */

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

/** Common async status shape used in screens. */
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });
