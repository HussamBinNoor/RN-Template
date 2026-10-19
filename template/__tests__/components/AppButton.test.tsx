import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AppButton } from '@/components/common/AppButton';
import { AppProviders } from '@/providers/AppProviders';

const wrap = (ui: React.ReactElement) => <AppProviders>{ui}</AppProviders>;

describe('AppButton', () => {
  it('renders the label', () => {
    const { getByText } = render(wrap(<AppButton label="Press me" onPress={() => undefined} />));
    expect(getByText('Press me')).toBeTruthy();
  });

  it('fires onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(wrap(<AppButton label="Go" onPress={onPress} />));
    fireEvent.press(getByText('Go'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(wrap(<AppButton label="Nope" onPress={onPress} disabled />));
    fireEvent.press(getByText('Nope'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders left and right icons when provided', () => {
    const { getByText } = render(
      wrap(
        <AppButton
          label="With icons"
          leftIcon="Star"
          rightIcon="ArrowRight"
          onPress={() => undefined}
        />,
      ),
    );
    expect(getByText('With icons')).toBeTruthy();
  });
});
