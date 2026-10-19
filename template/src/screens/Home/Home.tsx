import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppScreen } from '@/components/layout/AppScreen';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppCard } from '@/components/common/AppCard';
import { AppText } from '@/components/common/AppText';
import { AppButton } from '@/components/common/AppButton';
import { AppBadge } from '@/components/common/AppBadge';
import { useAppTheme } from '@/providers/ThemeProvider';
import { APP_NAME, APP_VERSION } from '@/constants';
import { useTodosQuery } from '@/services/api/example';
import { type RootStackParamList } from '@/navigation/types';
import { AppIcon } from '@/components/common/AppIcon';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const navigation = useNavigation<Nav>();
  const { data: todos, isLoading, isError, error: fetchError, refetch } = useTodosQuery(3);

  return (
    <AppScreen>
      <AppHeader title="Home" bordered />
      <View style={{ gap: theme.spacing.lg }}>
        <AppCard>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
            <AppIcon name="Sparkles" size={28} color={theme.colors.primary} />
            <View style={{ flex: 1 }}>
              <AppText variant="heading" weight="bold">
                {APP_NAME}
              </AppText>
              <AppText variant="caption" color={theme.colors.textMuted}>
                v{APP_VERSION} · React Native 0.87.1 · New Architecture
              </AppText>
            </View>
            <AppBadge label="v0.1" variant="primary" />
          </View>
          <AppText
            variant="body"
            color={theme.colors.textMuted}
            style={{ marginTop: theme.spacing.sm }}>
            A production-ready starter template. Themeable, accessible, type-safe. Open the
            Components tab to explore the UI library, or Form to try a fully validated sign-up flow.
          </AppText>
        </AppCard>

        <AppCard>
          <AppText variant="title" weight="bold" style={{ marginBottom: theme.spacing.sm }}>
            Live API call
          </AppText>
          <AppText
            variant="caption"
            color={theme.colors.textMuted}
            style={{ marginBottom: theme.spacing.sm }}>
            TanStack Query · axios · JSONPlaceholder. Tap retry if the request failed.
          </AppText>

          {isLoading ? (
            <AppText variant="body" color={theme.colors.textMuted}>
              Loading…
            </AppText>
          ) : isError ? (
            <View>
              <AppText variant="body" color={theme.colors.danger}>
                {(fetchError as Error | undefined)?.message ?? 'Failed to load.'}
              </AppText>
              <AppButton
                label="Retry"
                variant="outline"
                size="sm"
                onPress={() => refetch()}
                style={{ marginTop: theme.spacing.sm }}
              />
            </View>
          ) : (
            <View style={{ gap: theme.spacing.sm }}>
              {(todos ?? []).map(t => (
                <View
                  key={t.id}
                  style={{
                    padding: theme.spacing.sm,
                    borderRadius: theme.radii.sm,
                    backgroundColor: theme.colors.surfaceMuted,
                  }}>
                  <AppText variant="body" weight="medium" numberOfLines={2}>
                    {t.title}
                  </AppText>
                  <AppText variant="caption" color={theme.colors.textMuted}>
                    {t.completed ? 'Completed' : 'Pending'} · id={t.id}
                  </AppText>
                </View>
              ))}
            </View>
          )}
        </AppCard>

        <AppCard>
          <AppText variant="title" weight="bold" style={{ marginBottom: theme.spacing.sm }}>
            Navigation example
          </AppText>
          <AppText
            variant="body"
            color={theme.colors.textMuted}
            style={{ marginBottom: theme.spacing.sm }}>
            Push a screen onto the stack with typed params.
          </AppText>
          <AppButton
            label="Open Details"
            variant="primary"
            onPress={() =>
              navigation.navigate('Details', { id: 'demo-1', title: 'Sample details' })
            }
          />
        </AppCard>
      </View>
    </AppScreen>
  );
}
