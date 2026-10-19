import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  type Theme as NavTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppTheme } from '@/providers/ThemeProvider';
import type { RootStackParamList } from './types';
import { MainTabs } from './MainTabs';
import { DetailsScreen } from '@/screens/Details/Details';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator(): React.JSX.Element {
  const theme = useAppTheme();

  const navTheme: NavTheme = {
    ...DefaultTheme,
    dark: theme.resolvedMode === 'dark',
    colors: {
      ...DefaultTheme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surfaceElevated,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.danger,
    },
    // v7 requires the `fonts` property.
    fonts: DefaultTheme.fonts,
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
