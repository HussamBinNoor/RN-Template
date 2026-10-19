import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View } from 'react-native';
import {
  AppBottomSheet,
  type AppBottomSheetHandle,
} from '@/components/bottom-sheet/AppBottomSheet';
import { AppRadioGroup } from '@/components/common/AppRadioButton';
import { AppText } from '@/components/common/AppText';
import { useAppTheme } from '@/providers/ThemeProvider';
import { useAppStore } from '@/store/useAppStore';
import { AppIcon, type AppIconName } from '@/components/common/AppIcon';

export type ThemeBottomSheetHandle = AppBottomSheetHandle;

export type ThemeBottomSheetProps = {
  onClose?: () => void;
};

const options = [
  { value: 'light' as const, label: 'Light', description: 'Always use the light theme' },
  { value: 'dark' as const, label: 'Dark', description: 'Always use the dark theme' },
  { value: 'system' as const, label: 'System default', description: 'Match the device setting' },
];

const iconFor = (value: string): AppIconName =>
  value === 'light' ? 'Sun' : value === 'dark' ? 'Moon' : 'Monitor';

export const ThemeBottomSheet = forwardRef<ThemeBottomSheetHandle, ThemeBottomSheetProps>(
  function ThemeBottomSheet({ onClose }, ref) {
    const theme = useAppTheme();
    const preference = useAppStore(s => s.themePreference);
    const setPreference = useAppStore(s => s.setThemePreference);
    const [, setSelected] = useState(preference);
    const sheetRef = useRef<AppBottomSheetHandle>(null);

    useImperativeHandle(ref, () => ({
      present: (i = 0) => sheetRef.current?.present(i),
      dismiss: () => sheetRef.current?.dismiss(),
      expand: () => sheetRef.current?.expand(),
      collapse: () => sheetRef.current?.collapse(),
      snapTo: (i: number) => sheetRef.current?.snapTo(i),
    }));

    return (
      <AppBottomSheet
        ref={sheetRef}
        heading="Choose theme"
        snapPoints={['45%']}
        initialIndex={-1}
        onClose={onClose}>
        <AppText
          variant="body"
          color={theme.colors.textMuted}
          style={{ marginBottom: theme.spacing.md }}>
          Pick how the app should look. Changes apply instantly and persist across launches.
        </AppText>
        <AppRadioGroup
          options={options.map(o => ({ ...o }))}
          value={preference}
          onChange={next => {
            setSelected(next);
            setPreference(next);
            sheetRef.current?.dismiss();
          }}
          accessibilityLabel="Theme preference"
        />
        <View style={{ flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.md }}>
          {options.map(o => (
            <View
              key={o.value}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: theme.spacing.sm,
                backgroundColor: theme.colors.surfaceMuted,
                borderRadius: theme.radii.md,
                flex: 1,
              }}>
              <AppIcon name={iconFor(o.value)} size={20} color={theme.colors.primary} />
              <AppText variant="caption" style={{ marginLeft: 6 }}>
                {o.label}
              </AppText>
            </View>
          ))}
        </View>
      </AppBottomSheet>
    );
  },
);
