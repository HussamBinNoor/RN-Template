import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home as HomeIcon,
  LayoutGrid,
  FormInput as FormIcon,
  Settings as SettingsIcon,
} from 'lucide-react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import type { MainTabsParamList } from './types';
import { HomeScreen } from '@/screens/Home/Home';
import { ComponentsScreen } from '@/screens/Components/Components';
import { FormExampleScreen } from '@/screens/FormExample/FormExample';
import { SettingsScreen } from '@/screens/Settings/Settings';

const Tab = createBottomTabNavigator<MainTabsParamList>();

export function MainTabs(): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surfaceElevated,
          borderTopColor: theme.colors.border,
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: theme.fontSize.xs,
          fontWeight: theme.fontWeight.medium,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <HomeIcon size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Components"
        component={ComponentsScreen}
        options={{
          tabBarLabel: 'Components',
          tabBarIcon: ({ color, size }) => <LayoutGrid size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="FormExample"
        component={FormExampleScreen}
        options={{
          tabBarLabel: 'Form',
          tabBarIcon: ({ color, size }) => <FormIcon size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <SettingsIcon size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
