import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { useToasts } from '@/hooks/useToast';
import { useAppTheme } from './ThemeProvider';
import { AppText } from '@/components/common/AppText';
import { X } from 'lucide-react-native';
import { palette } from '@/theme/colors';

const variantPalette = {
  info: palette.info500,
  success: palette.success500,
  warning: palette.warning500,
  error: palette.danger500,
};

export type ToastProviderProps = { children: React.ReactNode };

export function ToastProvider({ children }: ToastProviderProps): React.JSX.Element {
  const { toasts, dismiss } = useToasts();
  const theme = useAppTheme();

  return (
    <View style={styles.root}>
      {children}
      <View pointerEvents="box-none" style={styles.viewport}>
        {toasts.map(t => (
          <Animated.View
            key={t.id}
            entering={FadeInDown.duration(220)}
            exiting={FadeOutUp.duration(180)}
            style={[
              styles.toast,
              {
                backgroundColor: theme.colors.surfaceElevated,
                borderColor: variantPalette[t.variant],
                borderLeftWidth: 4,
                borderRadius: theme.radii.md,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.md,
                marginBottom: theme.spacing.sm,
              },
              theme.shadows.md,
            ]}>
            <View style={{ flex: 1 }}>
              <AppText style={{ color: theme.colors.text, fontWeight: theme.fontWeight.semibold }}>
                {t.message}
              </AppText>
            </View>
            <Pressable
              onPress={() => dismiss(t.id)}
              hitSlop={theme.layout.hitSlop}
              accessibilityLabel="Dismiss notification">
              <X size={18} color={theme.colors.textMuted} />
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  viewport: {
    position: 'absolute',
    top: 60,
    right: 16,
    left: 16,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
});
