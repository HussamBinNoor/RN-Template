import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { env } from '@/config/env';

export type ApiErrorBody = {
  message?: string;
  code?: string;
  details?: unknown;
};

export class ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(message: string, status: number, code?: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/** Build the configured axios instance. */
export function createApi(baseURL = env.apiBaseUrl, timeout = env.apiTimeout): AxiosInstance {
  const instance = axios.create({ baseURL, timeout });

  // Request interceptor — log + auth header hook.
  instance.interceptors.request.use(
    config => {
      if (env.enableNetworkLogs) {
        console.log(`[api] ${config.method?.toUpperCase()} ${config.url}`);
      }
      // Example: attach auth token here when implementing auth.
      // const token = await StorageHelpers.getString('auth_token');
      // if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    error => Promise.reject(error),
  );

  // Response interceptor — normalize errors.
  instance.interceptors.response.use(
    response => response,
    (error: AxiosError<ApiErrorBody>) => {
      if (env.enableNetworkLogs) {
        console.warn(
          `[api] error ${error.response?.status ?? 'NETWORK'} ${error.config?.url ?? ''}`,
          error.message,
        );
      }
      if (error.response) {
        const body = error.response.data ?? {};
        throw new ApiError(
          body.message ?? error.message,
          error.response.status,
          body.code,
          body.details,
        );
      }
      throw new ApiError(error.message || 'Network error', 0);
    },
  );

  return instance;
}

export const api = createApi();

/** Convenience wrapper for typed responses. */
export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await api.get<T>(url, config);
  return res.data;
}

export async function apiPost<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await api.post<T>(url, body, config);
  return res.data;
}

export async function apiPut<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await api.put<T>(url, body, config);
  return res.data;
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await api.delete<T>(url, config);
  return res.data;
}
