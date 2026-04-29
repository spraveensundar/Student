import React, { useContext } from "react";
import { View } from "react-native";

import Text from "../../text";
import { FormGroupProps } from "../inputType";
import { styles } from "../styles";
import ThemeContext from "../../../Utilities/themecontext";

const FormGroup: React.FC<FormGroupProps> = (props) => {
    const {
        children = null,
        label = false,
        rightContent,
        background,
        containerprops,
        themes,
        labelStyle,
        bottom = "5%",
        leftContent,
    } = props;

    // const { theme } = useCustomHooks();
    const theme = themes ?? useContext(ThemeContext)

    const style = styles(theme)

    return (
        <View style={{ marginBottom: bottom }}>
            {
                label !== false && (
                    <View style={{ marginBottom: "3%" }}>
                        <Text style={[{ color: theme.secondarytext }, labelStyle]}>{label}</Text>
                    </View>
                )
            }
            <View style={[theme.theme === "dark" ? style.darkInput : style.lightInput, rightContent ? { paddingRight: "13%", } : null, { backgroundColor: background ?? theme.card }, leftContent ? { paddingLeft: "18%" } : "", containerprops]}>
                {children}
                {
                    rightContent && (
                        <View style={style.right}>
                            {rightContent}
                        </View>
                    )
                }
            </View>
        </View>
    );
};

export default FormGroup;