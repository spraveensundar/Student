import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
} from 'react-native-reanimated';
import { windowheight, windowwidth } from '../Utilities/dimensions';
import Text from './text';
import Lottie from './lottieview';
import { lotties } from '../Utilities/images';
import { Colors } from '../Utilities/uiasset';

const TOAST_HEIGHT = windowheight * 0.065;
const HIDE_POSITION = TOAST_HEIGHT + 20;

const NetworkToast: React.FC = () => {
    const translateY = useSharedValue<number>(HIDE_POSITION);
    const [isConnected, setIsConnected] = useState<boolean>(true);
    const isFirstRun = useRef<boolean>(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(
            (state: NetInfoState) => {
                // Avoid initial flicker
                if (isFirstRun.current) {
                    isFirstRun.current = false;
                    setIsConnected(Boolean(state.isConnected));
                    return;
                }

                const connected = Boolean(state.isConnected);

                if (!connected) {
                    setIsConnected(false);
                    translateY.value = withTiming(0, { duration: 300 });
                } else {
                    setIsConnected(true);

                    translateY.value = withTiming(0, { duration: 300 });
                    translateY.value = withDelay(
                        2000,
                        withTiming(HIDE_POSITION, { duration: 300 })
                    );
                }
            }
        );

        return () => unsubscribe();
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View
            style={[
                styles.toast,
                isConnected ? styles.online : styles.offline,
                animatedStyle,
            ]}
        >
             {isConnected ? 
             <Lottie
                src={lotties.Backonline}
                width={windowwidth * 0.125}
                height={windowwidth * 0.125}
                style={{ right:"5%" }}
            />:

            <Lottie
                src={lotties.Nointernet}
                width={windowwidth * 0.1}
                height={windowwidth * 0.1}
                style={{ marginRight: 10 }}
            />}
            <Text style={{marginRight:isConnected ?"10%" :0}} color={"#fff"} >{isConnected ? 'Back online' : 'No internet connection'}</Text>
        </Animated.View>
    );
};

export default NetworkToast;

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
        height: TOAST_HEIGHT,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        flexDirection: "row",

    },
    offline: {
        backgroundColor: '#D32F2F',
    },
    online: {
        backgroundColor: '#2E7D32',
    },
    text: {
        color: '#fff',
        fontWeight: '600',
    },
});
