import React, { useCallback, useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import useCustomHooks from '../Actions/Hooks/customhook';
import { windowwidth } from '../Utilities/dimensions';

interface Props {
  sheetref: React.RefObject<BottomSheetModal | null>;
  children?: React.ReactNode;
  snappoint?: any;
  opacity?: number;
  backgroundStyle?: StyleProp<
    Omit<ViewStyle, 'position' | 'top' | 'left' | 'bottom' | 'right'>
  >;
  onDismiss?: () => void;
  onClose?: () => void;
  bottomSheetProps?: Omit<BottomSheetModalProps, 'children'>;
  headertitle?: string;
  headerdescrption?: string;
  custominterface?: boolean;
}

const Sheet: React.FC<Props> = ({
  sheetref,
  children,
  snappoint = ['40%'],
  backgroundStyle = {},
  opacity = 0.7,
  onDismiss = () => { },
  bottomSheetProps,
}) => {
  const { theme } = useCustomHooks();
  const snapPointList = useMemo(() => snappoint, [snappoint]);

  const renderBackdrop = useCallback(
    (props?: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
        opacity={opacity}
      />
    ),
    [opacity],
  );

  return (
    <BottomSheetModal
      ref={sheetref}
      snapPoints={snapPointList}
      backdropComponent={renderBackdrop}
      backgroundStyle={[
        {
          backgroundColor: theme.background,
          paddingHorizontal: windowwidth * 0.05,
        },
        backgroundStyle,
      ]}
      onDismiss={onDismiss}
      keyboardBehavior="extend"
      keyboardBlurBehavior={'restore'}
      android_keyboardInputMode={'adjustResize'}
      footerComponent={() => (
        <View style={{ height: initialWindowMetrics?.insets?.bottom }} />
      )}
      handleComponent={null}
      enableDismissOnClose={true}
      enableDynamicSizing={false}
      {...bottomSheetProps}
    >
      {children}
    </BottomSheetModal>
  );
};
export default Sheet;
