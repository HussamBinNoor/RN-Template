/* eslint-env jest */

// react-native-gesture-handler Jest setup (required for gesture mocks).
import 'react-native-gesture-handler/jestSetup';

// Silence noisy warnings during tests.
const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  if (
    msg.includes('useNativeDriver') ||
    msg.includes('Module RCTImageLoader') ||
    msg.includes('Animated:') ||
    msg.includes('Require cycle')
  ) {
    return;
  }
  originalWarn(...(args as Parameters<typeof originalWarn>));
};

// Mock react-native-reanimated (worklets are not available in the Node test env).
// The reanimated v4 / worklets mock tries to load native code, so we stub a minimal surface.
jest.mock('react-native-reanimated', () => {
  const View = require('react-native').View;
  const noop = () => undefined;
  const identity = (v: unknown) => v;
  return {
    __esModule: true,
    default: {
      View,
      call: noop,
      Value: class {},
      createAnimatedComponent: identity,
      addWhitelistedUIProps: noop,
      addWhitelistedStyleProp: noop,
      addWhitelistedTransformProp: noop,
    },
    View,
    createAnimatedComponent: identity,
    useSharedValue: (init: unknown) => ({ value: init }),
    useDerivedValue: (fn: () => unknown) => ({ value: fn() }),
    useAnimatedStyle: () => ({}),
    withTiming: (to: unknown, _config?: unknown, callback?: (finished?: boolean) => void) => {
      if (typeof callback === 'function') callback(true);
      return to;
    },
    withSpring: (to: unknown, _config?: unknown, callback?: (finished?: boolean) => void) => {
      if (typeof callback === 'function') callback(true);
      return to;
    },
    withDelay: (_d: number, to: unknown) => to,
    runOnJS: (fn: (...a: unknown[]) => unknown) => fn,
    runOnUI: (fn: (...a: unknown[]) => unknown) => fn,
    Easing: {
      linear: identity,
      ease: identity,
      in: identity,
      out: identity,
      inOut: () => identity,
      cubic: identity,
      quad: identity,
    },
  };
});

jest.mock('react-native-worklets', () => ({
  runOnJS: (fn: (...a: unknown[]) => unknown) => fn,
  runOnUI: (fn: (...a: unknown[]) => unknown) => fn,
  createWorkletRuntime: () => ({}),
}));

// Mock MMKV with an in-memory shim.
jest.mock('react-native-mmkv', () => {
  const store = new Map<string, string | number | boolean>();
  class MMKV {
    set(key: string, value: string | number | boolean) {
      store.set(key, value);
    }
    getString(key: string) {
      const v = store.get(key);
      return typeof v === 'string' ? v : undefined;
    }
    getNumber(key: string) {
      const v = store.get(key);
      return typeof v === 'number' ? v : undefined;
    }
    getBoolean(key: string) {
      const v = store.get(key);
      return typeof v === 'boolean' ? v : undefined;
    }
    delete(key: string) {
      store.delete(key);
    }
    clearAll() {
      store.clear();
    }
    contains(key: string) {
      return store.has(key);
    }
  }
  return {
    MMKV,
    createMMKV: (_config?: { id?: string }) => new MMKV(),
    existsMMKV: () => false,
    deleteMMKV: () => undefined,
  };
});

// react-native-nitro-modules has no JS-only fallback; stub the factory.
jest.mock('react-native-nitro-modules', () => ({
  NitroModules: {
    createHybridObject: () => ({}),
  },
}));

// Mock safe-area-context for predictable insets in tests.
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  const frame = { x: 0, y: 0, width: 0, height: 0 };
  const SafeAreaContext = React.createContext({ insets: inset, frame });
  const SafeAreaInsetsContext = React.createContext(inset);
  const SafeAreaFrameContext = React.createContext(frame);
  return {
    SafeAreaContext,
    SafeAreaInsetsContext,
    SafeAreaFrameContext,
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) =>
      React.createElement(
        SafeAreaInsetsContext.Provider,
        { value: inset },
        React.createElement(
          SafeAreaFrameContext.Provider,
          { value: frame },
          React.createElement(
            SafeAreaContext.Provider,
            { value: { insets: inset, frame } },
            children,
          ),
        ),
      ),
    SafeAreaConsumer: ({ children }: { children: (i: typeof inset) => React.ReactNode }) =>
      children(inset),
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => inset,
    useSafeAreaFrame: () => frame,
    initialWindowMetrics: { insets: inset, frame },
  };
});
