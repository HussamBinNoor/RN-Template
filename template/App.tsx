import React from 'react';
import { StatusBar } from 'react-native';
import { AppProviders } from '@/providers/AppProviders';
import { RootNavigator } from '@/navigation/RootNavigator';
import { Splash } from '@/components/Splash';
import { useAppTheme } from '@/providers/ThemeProvider';

/**
 * Root component. Wraps everything in app-wide providers + navigation.
 * StatusBar styling follows the active theme.
 *
 * The native splash (LaunchScreen.storyboard on iOS, SplashTheme on
 * Android) covers cold start. The JS `<Splash />` mounted here covers the
 * short window between "JS bundle is ready" and "first navigation screen
 * has painted", so the user sees the HBN monogram continuously instead of
 * a black/white flash.
 */
function App(): React.JSX.Element {
  return (
    <AppProviders>
      <ThemedStatusBar />
      <RootNavigator />
      <Splash />
    </AppProviders>
  );
}

function ThemedStatusBar(): React.JSX.Element {
  const theme = useAppTheme();
  return <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} />;
}

export default App;
