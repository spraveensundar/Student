import React, { useCallback, useEffect, useMemo } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProps,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import useCustomHooks from '../Actions/Hooks/customhook';
import { borderradius, windowheight, windowwidth } from '../Utilities/dimensions';
import Text from './text';
import { Colors } from '../Utilities/uiasset';
import Images from '../Utilities/images';


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
    headertitle?: string,
    headerdescrption?: string,
    custominterface?: boolean
}

const Sheet: React.FC<Props> = ({
    sheetref,
    children,
    snappoint = ['40%'],
    backgroundStyle = {},
    opacity = 0.7,
    onDismiss = () => { },
    onClose,
    bottomSheetProps,
    headertitle,
    headerdescrption,
    custominterface
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
            backgroundStyle={[{ backgroundColor: theme.background, paddingHorizontal: windowwidth * 0.05 }, backgroundStyle]}
            onDismiss={onDismiss}
            // keyboardBehavior={'extend'}
            keyboardBehavior='extend'
            keyboardBlurBehavior={'restore'}
            android_keyboardInputMode={'adjustResize'}
            footerComponent={() => <View style={{ height: initialWindowMetrics?.insets?.bottom }} />}
            handleComponent={null}
            enableDismissOnClose={true}
            enableDynamicSizing={false}

            {...bottomSheetProps}

        >
            {/* {children} */}
            {custominterface ?
                <View style={{ flex: 1, }} >
                    {children}
                </View> :
                <>
                    <View style={{ width: "100%", backgroundColor: theme.bottomheader, borderTopLeftRadius: borderradius * 1, borderTopRightRadius: borderradius * 1, flexDirection: "row", paddingVertical: "5%", paddingLeft: "7.5%", paddingRight: "5%", justifyContent: "center", alignItems: "center" }} >
                        <View style={{ width: "85%" }} >
                            <Text family='medium' size='medium' style={{ color: theme.inversetext }}  >{headertitle}</Text>
                            {headerdescrption &&
                                <Text family='medium' size='semimedium' style={{ color: Colors.graytext, marginTop: "2.5%" }}  >{headerdescrption}</Text>}
                        </View>

                        <Pressable onPress={() => {
                            sheetref?.current?.dismiss()
                            onClose
                        }} style={{ width: "15%", alignItems: "center", justifyContent: "center" }} >
                            <Images
                                type='svg'
                                name={theme.theme === "dark" ? "Bottomclose" : "Bottomclosedark"}
                                width={windowwidth * 0.075}
                                height={windowwidth * 0.075}
                            />
                        </Pressable>

                    </View>

                    <View style={{ flex: 1, backgroundColor: theme.background, paddingHorizontal: "7.5%" }} >
                        <BottomSheetScrollView  >
                            {children}
                        </BottomSheetScrollView>
                    </View>
                </>}
        </BottomSheetModal>
    );
};
export default Sheet;
