import React, { useContext } from "react";
import { Pressable, ViewStyle, TextStyle, ActivityIndicator, PressableProps, View } from "react-native";

import Text from "../../text";
import { Colors } from "../../../Utilities/uiasset";
import useCustomHooks from "../../../Actions/Hooks/customhook";

import { styles } from "../styles";
import ThemeContext from "../../../Utilities/themecontext";
import { windowheight } from "../../../Utilities/dimensions";

interface ButtonProps extends PressableProps {
    title: string;
    loading?: boolean;
    buttonStyle?: any;
    textStyle?: TextStyle;
    rightContent?: React.ReactNode,
    leftContent?: React.ReactNode,
    themes?: any
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    disabled = false,
    loading = false,
    buttonStyle,
    textStyle,
    rightContent,
    leftContent,
    themes,
    ...restProps
}) => {

    const theme = themes ?? useContext(ThemeContext)
    const style = styles(theme);

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                style.button,
                disabled && style.disabledButton,
                buttonStyle,
            ]}
            {...restProps}
        >
            {
                loading ? (
                    <ActivityIndicator color={Colors.white} />
                ) : (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {
                            leftContent && (
                                leftContent
                            )
                        }
                        <Text family="medium" size={"semimedium"} style={[{ color: Colors.white }, textStyle]}>{title}</Text>
                        {
                            rightContent && (
                                rightContent
                            )
                        }
                    </View>


                )
            }
        </Pressable>
    );
};

export default Button;