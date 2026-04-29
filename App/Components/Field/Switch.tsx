import React from "react";
import { View, Text, StyleProp, ViewStyle, StyleSheet, TextStyle } from "react-native";
import SwitchToggle from "react-native-switch-toggle";

import { Colors } from "../../Utilities/uiasset";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { borderradius, RFvalue, windowheight, windowwidth } from "../../Utilities/dimensions";

interface SwitchProps {
    value: boolean;
    onChange: (newValue: boolean) => void;
    label?: string;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    circleStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    oncolor?: string
    offcolor?: string


}

const Switch: React.FC<SwitchProps> = ({
    value,
    onChange,
    label,
    disabled = false,
    containerStyle,
    circleStyle,
    labelStyle,
    oncolor,
    offcolor
}) => {
    const { theme } = useCustomHooks();
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            {label && (
                <Text style={[{ marginRight: 8, color: theme.secondarytext }, labelStyle]}>
                    {label}
                </Text>
            )}
            <SwitchToggle
                switchOn={value}
                onPress={() => !disabled && onChange(!value)}
                containerStyle={StyleSheet.flatten([
                    {
                        width: windowwidth * 0.11,
                        height: windowheight * 0.028,
                        borderRadius: borderradius * 3,
                        padding: 2.5,
                        borderWidth: 1,
                        borderColor: theme.boderColor,
                        backgroundColor: theme.card,
                    },
                    containerStyle,
                ])}
                circleStyle={StyleSheet.flatten(
                    [
                        {
                            width: RFvalue(14),
                            height: RFvalue(14),
                            borderRadius: borderradius * 5,
                            backgroundColor: theme.theme === "dark" ? Colors.green : "#FFFFFF",
                        },
                        circleStyle,
                    ]
                )}
                backgroundColorOn={oncolor ?? Colors.green}
                backgroundColorOff={offcolor ?? theme.card}
                circleColorOff={Colors.green}
            />
        </View>
    );
};

export default Switch;
