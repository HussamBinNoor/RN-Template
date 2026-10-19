import React, { useRef } from 'react';
import { View, Linking } from 'react-native';
import { AppScreen } from '@/components/layout/AppScreen';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppCard } from '@/components/common/AppCard';
import { AppText } from '@/components/common/AppText';
import { AppButton } from '@/components/common/AppButton';
import { AppListItem } from '@/components/common/AppListItem';
import { AppSwitch } from '@/components/common/AppSwitch';
import { AppDivider } from '@/components/common/AppDivider';
import {
  ThemeBottomSheet,
  type ThemeBottomSheetHandle,
} from '@/components/bottom-sheet/ThemeBottomSheet';
import { AppModal } from '@/components/feedback/AppModal';
import { useAppTheme } from '@/providers/ThemeProvider';
import { useAppStore } from '@/store/useAppStore';
import { APP_NAME, APP_VERSION, AUTHOR_GITHUB_URL, AUTHOR_NAME } from '@/constants';
import { toast } from '@/hooks/useToast';
import { useState } from 'react';

export function SettingsScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const reset = useAppStore(s => s.reset);
  const markOnboardingSeen = useAppStore(s => s.markOnboardingSeen);
  const themeSheetRef = useRef<ThemeBottomSheetHandle>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const [notifEnabled, setNotifEnabled] = useState(false);

  return (
    <AppScreen>
      <AppHeader title="Settings" bordered />
      <View style={{ gap: theme.spacing.lg }}>
        <AppCard>
          <AppText
            variant="caption"
            weight="bold"
            color={theme.colors.textMuted}
            uppercase
            style={{ marginBottom: theme.spacing.sm }}>
            Appearance
          </AppText>
          <AppListItem
            title="Theme"
            subtitle={
              useAppStore.getState().themePreference === 'system'
                ? 'System default'
                : useAppStore.getState().themePreference === 'dark'
                  ? 'Dark'
                  : 'Light'
            }
            leftIcon="Palette"
            showChevron
            onPress={() => themeSheetRef.current?.present(0)}
          />
        </AppCard>

        <AppCard>
          <AppText
            variant="caption"
            weight="bold"
            color={theme.colors.textMuted}
            uppercase
            style={{ marginBottom: theme.spacing.sm }}>
            Notifications
          </AppText>
          <AppSwitch
            value={notifEnabled}
            onChange={setNotifEnabled}
            label="Push notifications"
            description="Receive updates and reminders"
          />
        </AppCard>

        <AppCard padded={false}>
          <AppText
            variant="caption"
            weight="bold"
            color={theme.colors.textMuted}
            uppercase
            style={{
              paddingHorizontal: theme.layout.cardPadding,
              paddingTop: theme.layout.cardPadding,
              paddingBottom: theme.spacing.sm,
            }}>
            About
          </AppText>
          <AppListItem
            title={APP_NAME}
            subtitle={`v${APP_VERSION}`}
            leftIcon="Info"
            showChevron={false}
          />
          <AppDivider />
          <AppListItem
            title={`By ${AUTHOR_NAME}`}
            subtitle={AUTHOR_GITHUB_URL.replace(/^https?:\/\//, '')}
            leftIcon="AtSign"
            onPress={() =>
              Linking.openURL(AUTHOR_GITHUB_URL).catch(() => toast.error('Cannot open link'))
            }
          />
          <AppDivider />
          <AppListItem
            title="Documentation"
            subtitle="Read the full README on GitHub"
            leftIcon="BookOpen"
            onPress={() =>
              Linking.openURL('https://reactnative.dev/docs/getting-started').catch(() =>
                toast.error('Cannot open link'),
              )
            }
          />
          <AppDivider />
          <AppListItem
            title="React Navigation"
            subtitle="v7.21"
            leftIcon="Compass"
            showChevron={false}
          />
        </AppCard>

        <AppCard>
          <AppText
            variant="caption"
            weight="bold"
            color={theme.colors.textMuted}
            uppercase
            style={{ marginBottom: theme.spacing.sm }}>
            Danger zone
          </AppText>
          <AppButton
            label="Reset preferences"
            variant="destructive"
            onPress={() => setResetOpen(true)}
            fullWidth
          />
        </AppCard>
      </View>

      <ThemeBottomSheet ref={themeSheetRef} />

      <AppModal
        visible={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Reset preferences?"
        description="This clears your theme preference and onboarding flag. It does not delete any account data."
        primaryActionLabel="Reset"
        secondaryActionLabel="Cancel"
        onPrimaryAction={() => {
          reset();
          markOnboardingSeen();
          toast.success('Preferences reset');
          setResetOpen(false);
        }}
        onSecondaryAction={() => setResetOpen(false)}
      />
    </AppScreen>
  );
}
