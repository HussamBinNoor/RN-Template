import React from 'react';
import { act, render, waitFor } from '@testing-library/react-native';
import { Splash } from '@/components/Splash';
import { AppProviders } from '@/providers/AppProviders';

const wrap = (ui: React.ReactElement) => <AppProviders>{ui}</AppProviders>;

describe('Splash', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('mounts with the splash overlay visible', () => {
    const { getByTestId } = render(wrap(<Splash />));
    expect(getByTestId('splash-overlay')).toBeTruthy();
  });

  it('exposes the testID so App.tsx-level tests can find it', () => {
    const { getByTestId, queryByTestId } = render(wrap(<Splash />));
    expect(queryByTestId('splash-overlay')).not.toBeNull();
    expect(getByTestId('splash-overlay').props.accessibilityRole).toBe('none');
  });

  it('calls onFinished after the fade-out completes', async () => {
    const onFinished = jest.fn();
    render(wrap(<Splash minDurationMs={0} onFinished={onFinished} />));

    // withTiming's callback is invoked synchronously by the reanimated mock
    // (see jest.setup.ts), and runOnJS is mocked to call-through, so the
    // splash should finish within a single microtask.
    await act(async () => {
      jest.advanceTimersByTime(0);
      await Promise.resolve();
    });
    await waitFor(() => expect(onFinished).toHaveBeenCalledTimes(1));
  });
});
