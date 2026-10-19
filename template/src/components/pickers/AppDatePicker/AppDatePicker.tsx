import React, { useState } from 'react';
import { Pressable, Platform, type StyleProp, View, type ViewStyle } from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useAppTheme } from '@/providers/ThemeProvider';
import { AppText } from '@/components/common/AppText';
import { AppIcon } from '@/components/common/AppIcon';
import { dayjs } from '@/utils/date';

export type AppDatePickerProps = {
  label?: string;
  value?: Date | null;
  onChange?: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  placeholder?: string;
  errorText?: string;
  helperText?: string;
  required?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
};

export function AppDatePicker({
  label,
  value,
  onChange,
  minimumDate,
  maximumDate,
  placeholder = 'Select a date',
  errorText,
  helperText,
  required,
  containerStyle,
  testID,
}: AppDatePickerProps): React.JSX.Element {
  const theme = useAppTheme();
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShow(false);
    if (event.type === 'set' && selectedDate) onChange?.(selectedDate);
  };

  return (
    <View style={[{ width: '100%' }, containerStyle]}>
      {label ? (
        <AppText
          variant="label"
          weight="medium"
          color={errorText ? theme.colors.danger : theme.colors.text}
          style={{ marginBottom: theme.spacing.xs }}>
          {label}
          {required ? ' *' : ''}
        </AppText>
      ) : null}
      <Pressable
        onPress={() => setShow(true)}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder}
        accessibilityState={{ expanded: show }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: theme.layout.inputHeight,
          paddingHorizontal: theme.spacing.md,
          borderColor: errorText ? theme.colors.danger : theme.colors.border,
          borderWidth: 1,
          borderRadius: theme.radii.md,
          backgroundColor: theme.colors.surfaceElevated,
        }}>
        <AppIcon
          name="Calendar"
          size={theme.layout.iconSize.md}
          color={theme.colors.textMuted}
          style={{ marginRight: theme.spacing.sm }}
        />
        <AppText color={value ? theme.colors.text : theme.colors.textMuted}>
          {value ? dayjs(value).format('MMM D, YYYY') : placeholder}
        </AppText>
      </Pressable>
      {errorText ? (
        <AppText
          variant="caption"
          color={theme.colors.danger}
          style={{ marginTop: theme.spacing.xs }}>
          {errorText}
        </AppText>
      ) : helperText ? (
        <AppText
          variant="caption"
          color={theme.colors.textMuted}
          style={{ marginTop: theme.spacing.xs }}>
          {helperText}
        </AppText>
      ) : null}
      {show ? (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={handleChange}
          themeVariant={theme.resolvedMode === 'dark' ? 'dark' : 'light'}
        />
      ) : null}
    </View>
  );
}
