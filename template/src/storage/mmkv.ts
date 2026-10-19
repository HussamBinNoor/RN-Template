import { createMMKV, type MMKV } from 'react-native-mmkv';

/**
 * Singleton MMKV storage instance.
 * Uses the default storage ID; pass a custom `id` to `createMMKV` for per-feature sandboxes.
 */
export const storage: MMKV = createMMKV({
  id: 'hbn-default',
});

/** Strongly-typed get/set helpers. */
export const StorageHelpers = {
  setString(key: string, value: string): void {
    storage.set(key, value);
  },
  getString(key: string): string | undefined {
    return storage.getString(key);
  },
  setNumber(key: string, value: number): void {
    storage.set(key, value);
  },
  getNumber(key: string): number | undefined {
    return storage.getNumber(key);
  },
  setBoolean(key: string, value: boolean): void {
    storage.set(key, value);
  },
  getBoolean(key: string): boolean | undefined {
    return storage.getBoolean(key);
  },
  setJSON<T>(key: string, value: T): void {
    storage.set(key, JSON.stringify(value));
  },
  getJSON<T>(key: string): T | undefined {
    const raw = storage.getString(key);
    if (!raw) return undefined;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return undefined;
    }
  },
  remove(key: string): void {
    storage.remove(key);
  },
  clear(): void {
    storage.clearAll();
  },
};

export type StorageHelpers = typeof StorageHelpers;
