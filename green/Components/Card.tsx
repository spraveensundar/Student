import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

import useCustomHooks from "../Actions/Hooks/customhook";

interface CardProps {
    children?: React.ReactNode;
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    containerStyle?: StyleProp<ViewStyle>;
}

const Card: React.FC<CardProps> = ({
    children,
    backgroundColor,
    borderColor,
    containerStyle,
}) => {

    const { theme } = useCustomHooks();
    const style = styles(theme, backgroundColor, borderColor)

    return (
        <View style={[theme.theme === "dark" ? style.card : style.cardLight, containerStyle]}>
            {children}
        </View>
    );
};

const styles = (theme: any, backgroundColor: any, borderColor: any) => StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: backgroundColor || theme.card,
        borderWidth: 1.8,
        borderColor: borderColor || "#1E2022",
        borderRadius: 8
    },
    cardLight: {
        backgroundColor: backgroundColor || theme.card,
        borderRadius: 8,
    }
});

export default Card;
