import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    runOnJS,
} from 'react-native-reanimated';
import { windowwidth, windowheight, borderradius } from '../Utilities/dimensions';
import ThemeContext from '../Utilities/themecontext';
import Text from './text';
import { useIsForeground } from '../Actions/Hooks/customhook';

interface DraggableTimerProps {
    onTimeChange?: (seconds: number) => void;
    onStart?: () => void;
    onStop?: () => void;
    initialPosition?: { x: number; y: number };
    containerStyle?: StyleProp<ViewStyle>;
    starttime?: any,
    isforeground?: boolean,
    stoptrigger?: boolean
}

const TIMER_SIZE = 120;
const PADDING = 20;

const DraggableTimer: React.FC<DraggableTimerProps> = ({
    onTimeChange,
    onStart,
    onStop,
    initialPosition = { x: windowwidth - TIMER_SIZE - PADDING, y: 100 },
    containerStyle,
    starttime,
    stoptrigger
}) => {
    const theme = useContext(ThemeContext);
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef<any>(null);

    // Animated values
    const translateX = useSharedValue(initialPosition.x);
    const translateY = useSharedValue(initialPosition.y);
    const scale = useSharedValue(1);
    const contextX = useSharedValue(0);
    const contextY = useSharedValue(0);

    // Format time as HH:MM:SS
    const formatTime = (totalSeconds: number): string => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
    const isForeground = useIsForeground()
    useEffect(() => {
        if (starttime) {
            const start = new Date(starttime).getTime();
            const current = Date.now();

            const diffInSeconds = Math.floor((current - start) / 1000);

            setSeconds(diffInSeconds);
            setIsRunning(true);
        }
    }, [starttime, isForeground])

    useEffect(() => {
        if (stoptrigger) {
            setIsRunning(false)
        }
    }, [stoptrigger])
    // Timer logic
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSeconds((prev) => {
                    const newSeconds = prev + 1;
                    onTimeChange?.(newSeconds);
                    return newSeconds;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, onTimeChange]);

    // Toggle timer with animation
    const toggleTimer = () => {
        if (!isRunning) {
            // Zoom in animation on start
            scale.value = withSequence(
                withSpring(1.2, { damping: 10, stiffness: 100 }),
                withSpring(1, { damping: 10, stiffness: 100 })
            );
            onStart?.();
        } else {
            // Zoom out animation on stop
            scale.value = withSequence(
                withSpring(0.8, { damping: 10, stiffness: 100 }),
                withSpring(1, { damping: 10, stiffness: 100 })
            );
            onStop?.();
        }
        setIsRunning(!isRunning);
    };

    // Pan gesture
    const panGesture = Gesture.Pan()
        .onStart(() => {
            contextX.value = translateX.value;
            contextY.value = translateY.value;
        })
        .onUpdate((event) => {
            // Calculate new position
            let newX = contextX.value + event.translationX;
            let newY = contextY.value + event.translationY;

            // Constrain within screen boundaries
            newX = Math.max(0, Math.min(newX, windowwidth - TIMER_SIZE));
            newY = Math.max(0, Math.min(newY, windowheight - TIMER_SIZE));

            translateX.value = newX;
            translateY.value = newY;
        })
        .onEnd(() => {
            // Snap to edges if needed (optional)
            const snapThreshold = 50;
            if (translateX.value < snapThreshold) {
                translateX.value = withSpring(PADDING);
            } else if (translateX.value > windowwidth - TIMER_SIZE - snapThreshold) {
                translateX.value = withSpring(windowwidth - TIMER_SIZE - PADDING);
            }
        });

    // Tap gesture to toggle timer
    // const tapGesture = Gesture.Tap().onEnd(() => {
    //     runOnJS(toggleTimer)();
    // });

    // Combine gestures
    const composedGesture = Gesture.Race(panGesture);

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scale.value },
            ],
        };
    });

    return (
        <GestureDetector gesture={composedGesture}>
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        width: TIMER_SIZE,
                        height: TIMER_SIZE,
                        borderRadius: TIMER_SIZE / 2,
                        backgroundColor: isRunning ? theme.primarytext : theme.cardBg,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 8,
                        borderWidth: 3,
                        borderColor: isRunning ? theme.primarytext : theme.boderColor,
                    },
                    animatedStyle,
                    containerStyle,
                ]}
            >
                <Text
                    family="GBold"
                    size="medium"
                    color={isRunning ? theme.white : theme.primarytext}
                    style={{ letterSpacing: 1 }}
                >
                    {formatTime(seconds)}
                </Text>
                <Text
                    family="GRegular"
                    size="xsmall"
                    color={isRunning ? theme.white : theme.secondarytext}
                    style={{ marginTop: 4 }}
                >
                    {isRunning ? 'service start' : 'Tap to Start'}
                </Text>
            </Animated.View>
        </GestureDetector>
    );
};

export default DraggableTimer;
