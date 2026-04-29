import React, { useEffect, useCallback } from "react";
import {
    Animated,
    Dimensions,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
} from "react-native";
import { borderradius, RFvalue } from "../Utilities/dimensions";
import { Colors, Fontfamily } from "../Utilities/uiasset";
import useCustomHooks from "../Actions/Hooks/customhook";



const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
};

interface SegmentedControlProps {
    tabs: string[];
    onChange: (index: number) => void;
    currentIndex: number;
    width: number;
    height: number;
    segmentedControlBackgroundColor?: string;
    activeSegmentBackgroundColor?: string;
    textColor?: string;
    activeTextColor?: string;
    paddingVertical?: number;
    elevation?: number;
    bgstyle?: StyleProp<ViewStyle>
    buttonStyle?: StyleProp<ViewStyle>
}

const SegmentedControl: React.FC<SegmentedControlProps> = (props) => {
    const { theme } = useCustomHooks()
    const { activeSegmentBackgroundColor = Colors.btnBgGreen, segmentedControlBackgroundColor = theme.card, bgstyle, buttonStyle } = props
    const translateValue = (props.width - 10) / props.tabs.length;
    const [tabTranslate] = React.useState(new Animated.Value(0));

    const memoizedTabPressCallback = useCallback(
        (index: number) => {
            props.onChange(index);
        },
        [props.onChange]
    );

    const styles = style(props.width, props.height);

    useEffect(() => {
        Animated.spring(tabTranslate, {
            toValue: props.currentIndex * translateValue,
            stiffness: 180,
            damping: 20,
            mass: 1,
            useNativeDriver: true,
        }).start();
    }, [props.currentIndex, tabTranslate, translateValue]);

    return (
        <Animated.View
            style={[
                styles.segmentedControlWrapper,
                { backgroundColor: segmentedControlBackgroundColor, borderWidth: 1, borderColor: theme.boderColor },
                { paddingVertical: props.paddingVertical },
                bgstyle
            ]}
        >
            <Animated.View
                style={[
                    {
                        ...StyleSheet.absoluteFillObject,
                        position: "absolute",
                        width: (props.width - 4) / props.tabs.length,
                        top: 0,
                        marginVertical: 2,
                        marginHorizontal: 2,
                        backgroundColor: activeSegmentBackgroundColor,
                        borderRadius: 20,
                        ...shadow,
                    },
                    {
                        transform: [{ translateX: tabTranslate }],
                    },
                    buttonStyle
                ]}
            />
            {props.tabs.map((tab, index) => {
                const isCurrentIndex = props.currentIndex === index;
                return (
                    <TouchableOpacity
                        key={index}
                        style={styles.textWrapper}
                        onPress={() => memoizedTabPressCallback(index)}
                        activeOpacity={0.7}
                    >
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <Text
                                numberOfLines={1}
                                style={[
                                    styles.textStyles,
                                    { color: props.textColor ?? (!isCurrentIndex ? theme.primarytext : Colors.white) },
                                    { fontFamily: isCurrentIndex ? Fontfamily.bold : Fontfamily.regular }
                                ]}
                            >
                                {tab}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </Animated.View>
    );
};

const style = (width: number, height: number) =>
    StyleSheet.create({
        segmentedControlWrapper: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: borderradius * 2,
            borderWidth: 0.1,
            borderColor: "transparent",
            width,
            marginVertical: 10,
            alignSelf: "center",
            height,
        },
        textWrapper: {
            flex: 1,
            paddingHorizontal: 5,
            height,
            justifyContent: "center",
        },
        textStyles: {
            fontSize: RFvalue(11.5),
            textAlign: "center",
            fontFamily: Fontfamily.medium,
        },
    });

// SegmentedControl.defaultProps = {
//   tabs: [],
//   onChange: () => {},
//   currentIndex: 0,
//   segmentedControlBackgroundColor: "#E5E5EA",
//   activeSegmentBackgroundColor: "white",
//   textColor: "black",
//   activeTextColor: "black",
//   paddingVertical: 12,
//   elevation: 5,
// };

export default SegmentedControl;
