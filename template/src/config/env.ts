/**
 * Typed environment configuration.
 * Reads `process.env.EXPO_PUBLIC_*` and `process.env.*` if present; falls back to defaults.
 */

export type Env = {
  apiBaseUrl: string;
  apiTimeout: number;
  appEnv: 'development' | 'staging' | 'production';
  enableNetworkLogs: boolean;
  sentryDsn?: string;
};

const readEnv = (key: string, fallback?: string): string | undefined => {
  // In RN, only EXPO_PUBLIC_* is statically inlined; process.env.* is available via babel at build time.
  if (typeof process !== 'undefined' && process.env && key in process.env) {
    const v = process.env[key];
    if (typeof v === 'string' && v.length > 0) return v;
  }
  return fallback;
};

export const env: Env = {
  apiBaseUrl: readEnv('API_BASE_URL', 'https://jsonplaceholder.typicode.com') ?? '',
  apiTimeout: Number(readEnv('API_TIMEOUT_MS', '15000')),
  appEnv: (readEnv('APP_ENV', 'development') as Env['appEnv']) ?? 'development',
  enableNetworkLogs: readEnv('ENABLE_NETWORK_LOGS', 'true') === 'true',
  sentryDsn: readEnv('SENTRY_DSN'),
};
