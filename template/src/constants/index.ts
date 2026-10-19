/**
 * Application-wide constants.
 * Keep this file dependency-free.
 */

export const APP_NAME = 'HBN RN Template';
export const APP_VERSION = '0.1.0';

/** The author/maintainer of this template. */
export const AUTHOR_NAME = 'Hussam Bin Noor';
/** Full GitHub profile URL — surfaced in Settings → About. */
export const AUTHOR_GITHUB_URL = 'https://github.com/hussambinnoor';

export const STORAGE_KEYS = {
  theme: '@hbn/theme-mode',
  appStore: '@hbn/app-store-v1',
} as const;

/** TanStack Query cache timings (ms). */
export const QUERY_STALE_TIME = 30_000;
export const QUERY_CACHE_TIME = 5 * 60_000;
export const QUERY_RETRY = 1;
