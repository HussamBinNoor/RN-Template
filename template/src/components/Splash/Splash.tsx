import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';

const LOGO = require('../../../assets/logo.png');

const DEFAULT_MIN_DURATION_MS = 900;
const FADE_OUT_MS = 350;

export type SplashProps = {
  /**
   * How long the splash stays fully visible before fading out.
   * The native splash (LaunchScreen.storyboard / Android theme) is what's
   * actually on screen during cold start; this JS splash mostly bridges the
   * gap until the first navigation screen paints, so 600–1200ms is plenty.
   * Default: 900ms.
   */
  minDurationMs?: number;
  /**
   * Called once the splash has finished fading out. The splash is still
   * mounted at that point (with `pointerEvents="none"`) so the caller can
   * run any post-splash work without a flicker.
   */
  onFinished?: () => void;
};

/**
 * JS splash overlay. Shows the HBN monogram on a brand-coloured background,
 * then fades out once the minimum duration has elapsed.
 *
 * This pairs with the **native** splash (iOS LaunchScreen.storyboard,
 * Android `SplashTheme`) — native covers cold start, this one covers the
 * remaining ~1s of JS boot + first paint.
 */
export function Splash({
  minDurationMs = DEFAULT_MIN_DURATION_MS,
  onFinished,
}: SplashProps): React.JSX.Element {
  const opacity = useSharedValue(1);
  const [done, setDone] = useState(false);
  // Keep the latest onFinished in a ref so the fade-out effect doesn't have
  // to re-run when the parent passes a new callback reference.
  const onFinishedRef = useRef(onFinished);
  onFinishedRef.current = onFinished;

  useEffect(() => {
    const finish = () => {
      setDone(true);
      onFinishedRef.current?.();
    };
    opacity.value = withDelay(
      minDurationMs,
      withTiming(0, { duration: FADE_OUT_MS, easing: Easing.out(Easing.cubic) }, finished => {
        if (finished) runOnJS(finish)();
      }),
    );
    // The fade is one-shot — re-running would re-fire `onFinished` and
    // restart the animation, neither of which we want.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minDurationMs]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      pointerEvents={done ? 'none' : 'auto'}
      style={[StyleSheet.absoluteFill, styles.fill, animatedStyle]}
      // The native splash already covers the first frame; this view is
      // only visible after the JS bridge hands off to React.
      accessibilityRole="none"
      testID="splash-overlay">
      <View style={styles.fill} importantForAccessibility="no-hide-descendants">
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
      </View>
    </Animated.View>
  );
}

const SPLASH_BG = '#E8EBF0';

const styles = StyleSheet.create({
  fill: {
    backgroundColor: SPLASH_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 160,
  },
});
