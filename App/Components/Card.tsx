import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, Pressable } from "react-native";

import useCustomHooks from "../Actions/Hooks/customhook";

interface CardProps {
    children?: React.ReactNode;
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
    ispress?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    backgroundColor,
    borderColor = "#CFCFCF",
    containerStyle,
    onPress,
    ispress = false,
}) => {

    const { theme } = useCustomHooks();
    const style = styles(theme, backgroundColor, borderColor)

    return (
        <Pressable onPress={onPress} disabled={!ispress} style={[style.cardLight, containerStyle]}>
            {children}
        </Pressable>

    );
};

const styles = (theme: any, backgroundColor: any, borderColor: any) => StyleSheet.create({
    cardLight: {
        backgroundColor: "#F3F3F3",
        borderWidth: 1,
        borderColor: borderColor,
        borderRadius: 8
    }
});

export default Card;
