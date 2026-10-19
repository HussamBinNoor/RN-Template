import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { AppText } from '@/components/common/AppText';
import { AppButton, type AppButtonProps } from '@/components/common/AppButton';

export type AppEmptyStateProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: { label: string; onPress: () => void; variant?: AppButtonProps['variant'] };
  style?: StyleProp<ViewStyle>;
};

export function AppEmptyState({
  title,
  description,
  icon,
  action,
  style,
}: AppEmptyStateProps): React.JSX.Element {
  const theme = useAppTheme();
  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.layout.screenPadding,
        },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel={`${title}${description ? `, ${description}` : ''}`}>
      <View style={{ marginBottom: theme.spacing.md }}>
        {icon ?? <Inbox size={48} color={theme.colors.textMuted} />}
      </View>
      <AppText variant="title" weight="semibold" align="center">
        {title}
      </AppText>
      {description ? (
        <AppText
          variant="body"
          color={theme.colors.textMuted}
          align="center"
          style={{ marginTop: theme.spacing.xs, maxWidth: 280 }}>
          {description}
        </AppText>
      ) : null}
      {action ? (
        <View style={{ marginTop: theme.spacing.lg }}>
          <AppButton
            label={action.label}
            variant={action.variant ?? 'primary'}
            onPress={action.onPress}
          />
        </View>
      ) : null}
    </View>
  );
}
