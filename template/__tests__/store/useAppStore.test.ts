import { useAppStore } from '@/store/useAppStore';

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.setState({ themePreference: 'system' });
  });

  it('exposes a default theme preference', () => {
    expect(useAppStore.getState().themePreference).toBe('system');
  });

  it('updates the theme preference', () => {
    useAppStore.getState().setThemePreference('dark');
    expect(useAppStore.getState().themePreference).toBe('dark');
  });
});
