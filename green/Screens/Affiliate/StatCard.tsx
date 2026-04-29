import React from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";

import Text from "../../Components/text";
import { Colors } from "../../Utilities/uiasset";
import useCustomHooks from "../../Actions/Hooks/customhook";

import styles from "./styles";
import VectorIcons from "../../Utilities/vectoricons";
import { Dropdown } from "../../Components/Field";
import { windowheight, windowwidth } from "../../Utilities/dimensions";
interface StatCardProps {
    label?: React.ReactNode;
    value?: any;
    backgroundColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
    icon?: any,
    onClick?: any
}

const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    backgroundColor = "#4A6FCD",
    containerStyle,
    icon
}) => {

    const { theme } = useCustomHooks();
    const style = styles(theme);
    return (
        <View style={[style.card, { backgroundColor: backgroundColor }, containerStyle]}>
            <Text size="medium" style={{ color: Colors.white }}>{value}</Text>
            <Text size="tiny" style={{ color: Colors.white }}>{label}</Text>
            {
                icon && (
                    icon
                )
            }
        </View>
    )
}

export default StatCard;