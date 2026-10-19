import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AppScreen } from '@/components/layout/AppScreen';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppCard } from '@/components/common/AppCard';
import { AppText } from '@/components/common/AppText';
import { AppButton } from '@/components/common/AppButton';
import { AppCheckbox } from '@/components/common/AppCheckbox';
import { FormInput } from '@/components/forms/FormInput';
import { AppDatePicker } from '@/components/pickers/AppDatePicker';
import { AppKeyboardAvoidingView } from '@/components/layout/AppKeyboardAvoidingView';
import { useAppTheme } from '@/providers/ThemeProvider';
import { toast } from '@/hooks/useToast';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  dob: z.date({ message: 'Date of birth is required' }),
  acceptTerms: z.literal(true, {
    message: 'You must accept the terms to continue',
  }),
});

type FormValues = z.infer<typeof schema>;

export function FormExampleScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const {
    control,
    handleSubmit,
    formState,
    watch: watchAll,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      dob: undefined,
      acceptTerms: false as unknown as true, // RHF + literal-true requires a default; coerce below
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: FormValues): void => {
    setSubmitted(data);
    toast.success('Form submitted');
  };

  const acceptTermsValue = !!watchAll('acceptTerms');

  return (
    <AppScreen>
      <AppHeader title="Form example" bordered />
      <AppKeyboardAvoidingView
        scroll
        contentStyle={{ gap: theme.spacing.lg, paddingBottom: theme.spacing.xxl }}>
        <AppCard>
          <AppText variant="title" weight="bold" style={{ marginBottom: theme.spacing.xs }}>
            Sign up
          </AppText>
          <AppText
            variant="body"
            color={theme.colors.textMuted}
            style={{ marginBottom: theme.spacing.md }}>
            React Hook Form + Zod v4. Inline errors, optional blur-validation, secure password
            field, and a date picker.
          </AppText>

          <View style={{ gap: theme.spacing.md }}>
            <FormInput
              control={control}
              name="name"
              label="Full name"
              required
              placeholder="Jane Doe"
              leftIcon="User"
              autoCapitalize="words"
            />
            <FormInput
              control={control}
              name="email"
              label="Email"
              required
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="Mail"
            />
            <FormInput
              control={control}
              name="password"
              label="Password"
              required
              placeholder="••••••••"
              secureTextEntry
              helperText="At least 8 characters"
              leftIcon="Lock"
            />
            <Controller
              control={control}
              name="dob"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <AppDatePicker
                  label="Date of birth"
                  required
                  value={value ?? null}
                  onChange={onChange}
                  maximumDate={new Date()}
                  errorText={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="acceptTerms"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <View>
                  <AppCheckbox
                    checked={!!value}
                    onChange={next => onChange(next as unknown as true)}
                    label="I accept the terms and conditions"
                  />
                  {error?.message ? (
                    <AppText variant="caption" color={theme.colors.danger} style={{ marginTop: 4 }}>
                      {error.message}
                    </AppText>
                  ) : null}
                </View>
              )}
            />
            {/* RHF + literal-true is finicky; we coerce the value via the checkbox. */}
            <View style={{ display: acceptTermsValue ? 'flex' : 'none' }}>
              <AppCheckbox checked={acceptTermsValue} onChange={() => {}} label="" />
            </View>
          </View>

          <AppButton
            label={formState.isSubmitting ? 'Submitting…' : 'Create account'}
            loading={formState.isSubmitting}
            onPress={() => {
              handleSubmit(onSubmit)();
            }}
            fullWidth
            style={{ marginTop: theme.spacing.lg }}
          />
        </AppCard>

        {submitted ? (
          <AppCard>
            <AppText variant="title" weight="bold" style={{ marginBottom: theme.spacing.xs }}>
              Submission captured
            </AppText>
            <AppText variant="caption" color={theme.colors.textMuted} selectable>
              {JSON.stringify(submitted, null, 2)}
            </AppText>
          </AppCard>
        ) : null}
      </AppKeyboardAvoidingView>
    </AppScreen>
  );
}

// Inline controller alias — keeps the imports tighter.
import { Controller } from 'react-hook-form';
