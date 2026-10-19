import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

export type KeyboardState = {
  isVisible: boolean;
  height: number;
};

/**
 * Tracks keyboard visibility + height. Works on both iOS and Android.
 */
export function useKeyboard(): KeyboardState {
  const [state, setState] = useState<KeyboardState>({
    isVisible: false,
    height: 0,
  });

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', (e: KeyboardEvent) => {
      setState({ isVisible: true, height: e.endCoordinates.height });
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      setState({ isVisible: false, height: 0 });
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return state;
}
