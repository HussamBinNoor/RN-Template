import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme, type Theme, type ThemeMode } from '@/theme';
import { useAppStore } from '@/store/useAppStore';
import { StorageHelpers } from '@/storage/mmkv';
import { STORAGE_KEYS } from '@/constants';

type ThemePreference = ThemeMode | 'system';

/**
 * Returned by useAppTheme. Extends the Theme itself so consumers can do
 * `const { colors, spacing } = useAppTheme()` without going through `.theme`.
 */
export type ThemeContextValue = Theme & {
  preference: ThemePreference;
  resolvedMode: ThemeMode;
  setPreference: (mode: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export type ThemeProviderProps = { children: React.ReactNode };

export function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  const systemScheme = useColorScheme();
  const preference = useAppStore(s => s.themePreference);
  const setPreference = useAppStore(s => s.setThemePreference);

  // Bootstrap preference from MMKV on first mount.
  useEffect(() => {
    const stored = StorageHelpers.getString(STORAGE_KEYS.theme);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      if (stored !== preference) setPreference(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist preference on change.
  useEffect(() => {
    StorageHelpers.setString(STORAGE_KEYS.theme, preference);
  }, [preference]);

  const resolvedMode: ThemeMode =
    preference === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : preference;

  const activeTheme = resolvedMode === 'dark' ? darkTheme : lightTheme;

  const value = useMemo<ThemeContextValue>(
    () => ({
      ...activeTheme,
      preference,
      resolvedMode,
      setPreference,
    }),
    [activeTheme, preference, resolvedMode, setPreference],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useAppTheme must be used inside <ThemeProvider>');
  }
  return ctx;
}
