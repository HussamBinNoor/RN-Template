import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { X } from 'lucide-react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { AppText } from '@/components/common/AppText';

export type AppBottomSheetHandle = {
  present: (index?: number) => void;
  dismiss: () => void;
  expand: () => void;
  collapse: () => void;
  snapTo: (index: number) => void;
};

export type AppBottomSheetProps = {
  /** Snap points as percentages or pixel heights, e.g. ['25%', '50%', '90%']. */
  snapPoints?: ReadonlyArray<string | number>;
  initialIndex?: number;
  heading?: string;
  onClose?: () => void;
  scrollable?: boolean;
  enableDynamicSizing?: boolean;
  children?: React.ReactNode;
  testID?: string;
};

const renderBackdrop =
  (_theme: ReturnType<typeof useAppTheme>) => (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.6}
      pressBehavior="close"
    />
  );

export const AppBottomSheet = forwardRef<AppBottomSheetHandle, AppBottomSheetProps>(
  function AppBottomSheet(
    {
      snapPoints = ['50%'],
      initialIndex = -1,
      heading,
      onClose,
      scrollable = true,
      enableDynamicSizing = true,
      children,
      testID: _testID,
    },
    ref,
  ) {
    const sheetRef = useRef<BottomSheet>(null);
    const theme = useAppTheme();

    const handleClose = useCallback(() => {
      onClose?.();
    }, [onClose]);

    useImperativeHandle(ref, () => ({
      present: (index = 0) => sheetRef.current?.snapToIndex(index),
      dismiss: () => sheetRef.current?.close(),
      expand: () => sheetRef.current?.expand(),
      collapse: () => sheetRef.current?.collapse(),
      snapTo: (i: number) => sheetRef.current?.snapToIndex(i),
    }));

    const memoBackdrop = useMemo(() => renderBackdrop(theme), [theme]);

    return (
      <BottomSheet
        ref={sheetRef}
        index={initialIndex}
        snapPoints={[...snapPoints]}
        enableDynamicSizing={enableDynamicSizing}
        backdropComponent={memoBackdrop}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.borderStrong,
          width: 40,
        }}
        backgroundStyle={{
          backgroundColor: theme.colors.surfaceElevated,
          borderTopLeftRadius: theme.radii.xl,
          borderTopRightRadius: theme.radii.xl,
        }}
        onClose={handleClose}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore">
        {heading ? (
          <View style={styles.heading}>
            <AppText variant="title" weight="bold" style={{ flex: 1 }}>
              {heading}
            </AppText>
            <Pressable
              onPress={() => sheetRef.current?.close()}
              hitSlop={theme.layout.hitSlop}
              accessibilityRole="button"
              accessibilityLabel="Close">
              <X size={22} color={theme.colors.text} />
            </Pressable>
          </View>
        ) : null}
        {scrollable ? (
          <BottomSheetScrollView contentContainerStyle={{ padding: theme.layout.screenPadding }}>
            {children}
          </BottomSheetScrollView>
        ) : (
          <BottomSheetView style={{ padding: theme.layout.screenPadding }}>
            {children}
          </BottomSheetView>
        )}
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
  },
});
