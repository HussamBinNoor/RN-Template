import React from 'react';
import { View } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { AppScreen } from '@/components/layout/AppScreen';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppCard } from '@/components/common/AppCard';
import { AppText } from '@/components/common/AppText';
import { AppBadge } from '@/components/common/AppBadge';
import { useAppTheme } from '@/providers/ThemeProvider';
import type { RootStackParamList } from '@/navigation/types';

type DetailsRoute = RouteProp<RootStackParamList, 'Details'>;

export function DetailsScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const { params } = useRoute<DetailsRoute>();

  return (
    <AppScreen>
      <AppHeader title={params.title ?? 'Details'} bordered />
      <View style={{ gap: theme.spacing.lg }}>
        <AppCard>
          <AppBadge label="Stack screen" variant="primary" />
          <AppText variant="heading" weight="bold" style={{ marginTop: theme.spacing.sm }}>
            {params.title ?? 'Untitled'}
          </AppText>
          <AppText
            variant="caption"
            color={theme.colors.textMuted}
            style={{ marginTop: theme.spacing.xs }}>
            id: {params.id}
          </AppText>
          <AppText variant="body" style={{ marginTop: theme.spacing.md }}>
            This screen demonstrates how typed route params flow through navigation. The header
            above is wired to React Navigation — tap the back arrow to return.
          </AppText>
        </AppCard>

        <AppCard>
          <AppText variant="title" weight="bold" style={{ marginBottom: theme.spacing.sm }}>
            What this template gives you
          </AppText>
          {[
            'Strict TypeScript everywhere',
            'Centralized theming (light/dark/system)',
            'Reusable component library',
            'React Hook Form + Zod v4 validation',
            'TanStack Query + Axios setup',
            'MMKV storage with Zustand persistence',
            'Bottom sheets, pickers, toasts, modals',
          ].map(line => (
            <View
              key={line}
              style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}>
              <AppText variant="body">✓ {line}</AppText>
            </View>
          ))}
        </AppCard>
      </View>
    </AppScreen>
  );
}
