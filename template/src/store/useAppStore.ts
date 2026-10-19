import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StorageHelpers } from '@/storage/mmkv';

type ThemePreference = 'light' | 'dark' | 'system';

type AppState = {
  themePreference: ThemePreference;
  hasSeenOnboarding: boolean;
  setThemePreference: (mode: ThemePreference) => void;
  markOnboardingSeen: () => void;
  reset: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      themePreference: 'system',
      hasSeenOnboarding: false,
      setThemePreference: mode => set({ themePreference: mode }),
      markOnboardingSeen: () => set({ hasSeenOnboarding: true }),
      reset: () =>
        set({
          themePreference: 'system',
          hasSeenOnboarding: false,
        }),
    }),
    {
      name: 'hbn-app-store',
      storage: createJSONStorage(() => ({
        getItem: key => StorageHelpers.getString(key) ?? null,
        setItem: (key, value) => StorageHelpers.setString(key, value),
        removeItem: key => StorageHelpers.remove(key),
      })),
      version: 1,
    },
  ),
);
