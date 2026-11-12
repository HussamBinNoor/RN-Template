import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { AppProviders } from '@/providers/AppProviders';
import { RootNavigator } from '@/navigation/RootNavigator';
import { Splash } from '@/components/Splash';
import { useAppTheme } from '@/providers/ThemeProvider';

// Reanimated 4.6+ warns when @gorhom/bottom-sheet passes dependency arrays on
// native (ignored there; web-only). Sheet still works — library mismatch
// (gorhom/react-native-bottom-sheet#2785). Quiet this message only; do not use
// configureReanimatedLogger to silence all Reanimated logs. Remove after a
// bottom-sheet release that stops passing native dependency arrays.
if (__DEV__) {
  LogBox.ignoreLogs([
    '[Reanimated] Dependencies should only be used on the web',
  ]);
}

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
