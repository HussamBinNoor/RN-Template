import React from 'react';
import { ScrollView, View, type ViewStyle, type StyleProp } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { useAppTheme } from '@/providers/ThemeProvider';

export type AppScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  edges?: ReadonlyArray<Edge>;
  background?: 'background' | 'surface';
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * The base screen container: safe area + theme background + optional scroll + padding.
 * Use this at the root of every screen.
 */
export function AppScreen({
  children,
  scroll = false,
  padded = true,
  edges = ['top', 'bottom', 'left', 'right'] as const,
  background = 'background',
  contentStyle,
  testID,
}: AppScreenProps): React.JSX.Element {
  const theme = useAppTheme();
  const bg = background === 'background' ? theme.colors.background : theme.colors.surface;
  const padding = padded ? { padding: theme.layout.screenPadding } : null;

  if (scroll) {
    return (
      <SafeAreaView edges={[...edges]} style={{ flex: 1, backgroundColor: bg }} testID={testID}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[{ flexGrow: 1 }, padding, contentStyle]}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={[...edges]} style={{ flex: 1, backgroundColor: bg }} testID={testID}>
      <View style={[{ flex: 1 }, padding, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}
