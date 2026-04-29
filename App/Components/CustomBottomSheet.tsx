import React, { useCallback, useEffect, useMemo } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import useCustomHooks from '../Actions/Hooks/customhook';
import { windowwidth } from '../Utilities/dimensions';

interface Props {
  sheetref: React.RefObject<BottomSheet | null>;
  children?: React.ReactNode;
  snappoint?: any;
  opacity?: number;
  backgroundStyle?: StyleProp<
    Omit<ViewStyle, 'position' | 'top' | 'left' | 'bottom' | 'right'>
  >;
  onDismiss?: () => void;
  onClose?: () => void;
  bottomSheetProps?: Omit<BottomSheetProps, 'children'>;
  headertitle?: string;
  headerdescrption?: string;
  custominterface?: boolean;
  enableBackdrop?: boolean;
}

const CustomBottomSheet: React.FC<Props> = ({
  sheetref,
  children,
  snappoint = ['40%'],
  backgroundStyle = {},
  opacity = 0.7,
  onDismiss = () => {},
  onClose,
  bottomSheetProps,
  headertitle,
  headerdescrption,
  custominterface,
  enableBackdrop = false,
}) => {
  const { theme } = useCustomHooks();
  console.log(snappoint,"TEST");
  
  // const snapPointList = useMemo(() => snappoint, [snappoint]);

  const renderBackdrop = useCallback(
    (props?: any) => (
      <>
        {enableBackdrop ? (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={1}
            animatedIndex={{
              value: 1,
            }}
            opacity={opacity}
            pressBehavior="none"
          />
        ) : (
          <></>
        )}
      </>
    ),
    [opacity],
  );

  return (
    <BottomSheet
      ref={sheetref}
      snapPoints={snappoint}
      backdropComponent={renderBackdrop}
      backgroundStyle={[
        {
          backgroundColor: theme.background,
          //   paddingHorizontal: windowwidth * 0.05,
        },
        backgroundStyle,
      ]}
      // onDismiss={onDismiss}

      keyboardBehavior="extend"
      keyboardBlurBehavior={'restore'}
      android_keyboardInputMode={'adjustResize'}
      //   footerComponent={() => (
      //     <View style={{ height: initialWindowMetrics?.insets?.bottom }} />
      //   )}
      handleComponent={null}
      // enableDismissOnClose={true}
      enableDynamicSizing={false}
      {...bottomSheetProps}
    >
      {children}
    </BottomSheet>
  );
};
export default CustomBottomSheet;
