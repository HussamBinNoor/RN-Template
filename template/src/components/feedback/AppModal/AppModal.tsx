import React from 'react';
import { Modal, View, Pressable, type ViewStyle, type StyleProp } from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { AppText } from '@/components/common/AppText';
import { AppButton } from '@/components/common/AppButton';
import { X } from 'lucide-react-native';

export type AppModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  dismissable?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

export function AppModal({
  visible,
  onClose,
  title,
  description,
  children,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  dismissable = true,
  contentStyle,
}: AppModalProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={() => {
        if (dismissable) onClose();
      }}
      statusBarTranslucent>
      <Pressable
        onPress={() => dismissable && onClose()}
        style={{
          flex: 1,
          backgroundColor: theme.colors.overlay,
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.layout.screenPadding,
        }}>
        <Pressable
          onPress={() => {
            /* swallow taps so they don't bubble to backdrop */
          }}
          style={{
            width: '100%',
            maxWidth: 480,
            backgroundColor: theme.colors.surfaceElevated,
            borderRadius: theme.radii.lg,
            padding: theme.layout.cardPadding,
            ...theme.shadows.lg,
          }}>
          {(title || dismissable) && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: description ? theme.spacing.xs : theme.spacing.md,
              }}>
              {title ? (
                <AppText variant="title" weight="bold" style={{ flex: 1 }}>
                  {title}
                </AppText>
              ) : (
                <View style={{ flex: 1 }} />
              )}
              {dismissable ? (
                <Pressable
                  onPress={onClose}
                  hitSlop={theme.layout.hitSlop}
                  accessibilityRole="button"
                  accessibilityLabel="Close">
                  <X size={24} color={theme.colors.textMuted} />
                </Pressable>
              ) : null}
            </View>
          )}
          {description ? (
            <AppText
              variant="body"
              color={theme.colors.textMuted}
              style={{ marginBottom: theme.spacing.md }}>
              {description}
            </AppText>
          ) : null}
          {children ? <View style={contentStyle}>{children}</View> : null}
          {primaryActionLabel || secondaryActionLabel ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: theme.spacing.sm,
                marginTop: theme.spacing.lg,
              }}>
              {secondaryActionLabel ? (
                <AppButton
                  label={secondaryActionLabel}
                  variant="outline"
                  onPress={() => onSecondaryAction?.()}
                />
              ) : null}
              {primaryActionLabel ? (
                <AppButton
                  label={primaryActionLabel}
                  variant="primary"
                  onPress={() => onPrimaryAction?.()}
                />
              ) : null}
            </View>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
