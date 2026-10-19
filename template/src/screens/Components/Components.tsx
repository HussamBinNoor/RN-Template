import React, { useRef, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppScreen } from '@/components/layout/AppScreen';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppText } from '@/components/common/AppText';
import { AppButton } from '@/components/common/AppButton';
import { AppCard } from '@/components/common/AppCard';
import { AppTextInput } from '@/components/common/AppTextInput';
import { AppSearchInput } from '@/components/common/AppSearchInput';
import { AppCheckbox } from '@/components/common/AppCheckbox';
import { AppSwitch } from '@/components/common/AppSwitch';
import { AppRadioGroup } from '@/components/common/AppRadioButton';
import { AppDivider } from '@/components/common/AppDivider';
import { AppAvatar } from '@/components/common/AppAvatar';
import { AppBadge } from '@/components/common/AppBadge';
import { AppListItem } from '@/components/common/AppListItem';
import { AppModal } from '@/components/feedback/AppModal';
import { AppEmptyState } from '@/components/feedback/AppEmptyState';
import { AppErrorState } from '@/components/feedback/AppErrorState';
import { AppLoader } from '@/components/feedback/AppLoader';
import { AppDatePicker } from '@/components/pickers/AppDatePicker';
import { AppTimePicker } from '@/components/pickers/AppTimePicker';
import {
  AppBottomSheet,
  type AppBottomSheetHandle,
} from '@/components/bottom-sheet/AppBottomSheet';
import {
  ThemeBottomSheet,
  type ThemeBottomSheetHandle,
} from '@/components/bottom-sheet/ThemeBottomSheet';
import { useAppTheme } from '@/providers/ThemeProvider';
import { toast as toastNotify } from '@/hooks/useToast';
import { type RootStackParamList } from '@/navigation/types';
import { formatDate } from '@/utils/date';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function ComponentsScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const navigation = useNavigation<Nav>();
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(true);
  const [switchValue, setSwitchValue] = useState(false);
  const [radio, setRadio] = useState<'a' | 'b' | 'c'>('a');
  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const sheetRef = useRef<AppBottomSheetHandle>(null);
  const themeSheetRef = useRef<ThemeBottomSheetHandle>(null);

  return (
    <AppScreen>
      <AppHeader
        title="Components"
        rightActions={[
          {
            icon: 'Palette',
            onPress: () => themeSheetRef.current?.present(0),
            accessibilityLabel: 'Choose theme',
          },
        ]}
      />
      <ScrollView
        contentContainerStyle={{ gap: theme.spacing.lg, paddingBottom: theme.spacing.xxl }}
        keyboardShouldPersistTaps="handled">
        <Section title="Buttons">
          <AppCard>
            <View style={{ gap: theme.spacing.sm }}>
              <AppButton
                label="Primary"
                variant="primary"
                onPress={() => toastNotify.success('Primary tapped')}
              />
              <AppButton
                label="Secondary"
                variant="secondary"
                onPress={() => toastNotify.info('Secondary')}
              />
              <AppButton
                label="Outline"
                variant="outline"
                onPress={() => toastNotify.info('Outline')}
              />
              <AppButton label="Ghost" variant="ghost" onPress={() => toastNotify.info('Ghost')} />
              <AppButton
                label="Destructive"
                variant="destructive"
                onPress={() => toastNotify.error('Deleted!')}
              />
              <AppButton label="Loading" loading />
              <AppButton label="Disabled" disabled />
              <AppButton label="With icon" leftIcon="Star" rightIcon="ArrowRight" />
            </View>
          </AppCard>
        </Section>

        <Section title="Inputs">
          <AppCard>
            <View style={{ gap: theme.spacing.md }}>
              <AppTextInput
                label="Name"
                required
                value={text}
                onChangeText={setText}
                placeholder="Jane Doe"
                leftIcon="User"
              />
              <AppSearchInput
                placeholder="Search components"
                value={search}
                onChangeText={setSearch}
                onClear={() => setSearch('')}
              />
              <AppTextInput
                label="Password"
                required
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                helperText="Minimum 8 characters"
              />
              <AppTextInput
                label="Email"
                value=""
                onChangeText={() => {}}
                keyboardType="email-address"
                errorText="Email is required"
              />
              <AppTextInput
                label="Multiline"
                multiline
                numberOfLines={4}
                inputStyle={{ height: 96, textAlignVertical: 'top' }}
                placeholder="Tell us about yourself…"
              />
            </View>
          </AppCard>
        </Section>

        <Section title="Selection controls">
          <AppCard>
            <View style={{ gap: theme.spacing.sm }}>
              <AppCheckbox
                checked={checkbox}
                onChange={setCheckbox}
                label="I accept the terms and conditions"
              />
              <AppDivider />
              <AppSwitch
                value={switchValue}
                onChange={setSwitchValue}
                label="Enable notifications"
                description="Get a ping when something interesting happens"
              />
              <AppDivider />
              <AppRadioGroup
                value={radio}
                onChange={setRadio}
                options={[
                  { value: 'a', label: 'Option A', description: 'First option' },
                  { value: 'b', label: 'Option B', description: 'Second option' },
                  { value: 'c', label: 'Option C', description: 'Third option', disabled: true },
                ]}
                accessibilityLabel="Pick an option"
              />
            </View>
          </AppCard>
        </Section>

        <Section title="Date & time">
          <AppCard>
            <View style={{ gap: theme.spacing.md }}>
              <AppDatePicker
                label="Date of birth"
                value={date}
                onChange={setDate}
                maximumDate={new Date()}
              />
              <AppText variant="caption" color={theme.colors.textMuted}>
                Selected: {date ? formatDate(date) : 'none'}
              </AppText>
              <AppTimePicker label="Reminder time" value={time} onChange={setTime} />
              <AppText variant="caption" color={theme.colors.textMuted}>
                Selected: {time ? formatDate(time, 'h:mm A') : 'none'}
              </AppText>
            </View>
          </AppCard>
        </Section>

        <Section title="Avatars & badges">
          <AppCard>
            <View style={{ flexDirection: 'row', gap: theme.spacing.md, alignItems: 'center' }}>
              <AppAvatar name="Jane Doe" size="xs" />
              <AppAvatar name="Bob" size="sm" />
              <AppAvatar name="Alice Wonderland" size="md" />
              <AppAvatar name="M" size="lg" />
              <AppAvatar name="X" size="xl" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: theme.spacing.sm,
                marginTop: theme.spacing.md,
                flexWrap: 'wrap',
              }}>
              <AppBadge label="Default" />
              <AppBadge label="Primary" variant="primary" />
              <AppBadge label="Success" variant="success" />
              <AppBadge label="Warning" variant="warning" />
              <AppBadge label="Danger" variant="danger" />
              <AppBadge label="Info" variant="info" />
            </View>
          </AppCard>
        </Section>

        <Section title="Lists">
          <AppCard padded={false}>
            <AppListItem
              title="Inbox"
              description="3 unread items"
              leftIcon="Inbox"
              onPress={() => toastNotify.info('Inbox pressed')}
            />
            <AppListItem
              title="Alice Wonderland"
              subtitle="alice@example.com"
              leftAvatar={{ name: 'Alice Wonderland', size: 'md' }}
              onPress={() => toastNotify.info('Profile pressed')}
            />
            <AppListItem title="Disabled item" description="Cannot tap" leftIcon="Lock" disabled />
          </AppCard>
        </Section>

        <Section title="Feedback">
          <AppCard>
            <View style={{ gap: theme.spacing.md }}>
              <AppLoader label="Loading indicator" />
              <AppDivider />
              <AppEmptyState
                title="Nothing here yet"
                description="When there is content, it will show up in this section."
              />
              <AppDivider />
              <AppErrorState
                title="Could not reach the server"
                message="Check your network and try again."
                onRetry={() => toastNotify.info('Retrying…')}
              />
              <AppButton label="Open modal" variant="outline" onPress={() => setModalOpen(true)} />
            </View>
          </AppCard>
        </Section>

        <Section title="Bottom sheet">
          <AppCard>
            <AppButton
              label="Open generic bottom sheet"
              variant="primary"
              onPress={() => sheetRef.current?.present(0)}
            />
            <View style={{ height: theme.spacing.md }} />
            <AppButton
              label="Open theme bottom sheet"
              variant="secondary"
              onPress={() => themeSheetRef.current?.present(0)}
            />
          </AppCard>
        </Section>

        <Section title="Navigation">
          <AppCard>
            <AppText variant="body" color={theme.colors.textMuted}>
              The Settings tab has a fully working theme switcher. Try opening the home screen and
              pushing the Details screen too.
            </AppText>
            <View style={{ height: theme.spacing.md }} />
            <AppButton
              label="Push details"
              variant="outline"
              onPress={() =>
                navigation.navigate('Details', {
                  id: 'from-showcase',
                  title: 'Hello from Components',
                })
              }
            />
          </AppCard>
        </Section>
      </ScrollView>

      <AppModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm action"
        description="This is a reusable modal with primary + secondary actions."
        primaryActionLabel="Confirm"
        secondaryActionLabel="Cancel"
        onPrimaryAction={() => {
          toastNotify.success('Confirmed');
          setModalOpen(false);
        }}
        onSecondaryAction={() => setModalOpen(false)}
      />

      <AppBottomSheet ref={sheetRef} heading="About this sheet" snapPoints={['40%', '70%']}>
        <AppText variant="body" color={theme.colors.textMuted}>
          Drag the handle, swipe down to dismiss, or tap the backdrop. The bottom sheet is fully
          theme-aware and supports a keyboard.
        </AppText>
      </AppBottomSheet>
      <ThemeBottomSheet ref={themeSheetRef} />
    </AppScreen>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): React.JSX.Element {
  const theme = useAppTheme();
  return (
    <View>
      <AppText
        variant="caption"
        weight="bold"
        color={theme.colors.textMuted}
        uppercase
        style={{ marginBottom: theme.spacing.sm }}>
        {title}
      </AppText>
      {children}
    </View>
  );
}
