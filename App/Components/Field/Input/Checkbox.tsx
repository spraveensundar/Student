import React, { useState, useEffect, useContext } from "react";
import { View, Pressable, Text } from "react-native";
import { FieldInputProps } from "../inputType";
import { Colors, Fontfamily, Fontsize } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectoricons";
import { styles } from "../styles";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { windowwidth } from "../../../Utilities/dimensions";
import ThemeContext from "../../../Utilities/themecontext";

const Checkbox: React.FC<FieldInputProps> = ({
    onChange,
    label = "",
    disabled = false,
    initial = 0,
    checkboxlabelprops,
    activecheckboxcolor,
    checkboxstyle,
    boxstyle
}) => {
    const theme = useContext(ThemeContext)

    const style = styles(theme);
    const [checked, setChecked] = useState<boolean>(initial);

    useEffect(() => {
        setChecked(initial);
    }, [initial]);

    const toggleValue = () => {
        if (!disabled) {
            const newValue = !checked;
            setChecked(newValue);
            onChange?.(newValue);
        }
    };

    return (
        <Pressable onPress={toggleValue}>
            <View style={[{ flexDirection: "row", alignItems: "center" }, checkboxstyle]}>
                <View style={[style.check, boxstyle]}>
                    {checked && (
                        <VectorIcons
                            family="Feather"
                            name="check"
                            iconcolor={activecheckboxcolor ?? (theme.theme === "dark" ? Colors.white : "#202020")}
                            size={windowwidth * 0.04}
                        />
                    )}
                </View>
                {
                    label && (
                        <View>
                            <Text style={{ color: theme.theme === "dark" ? "#E1E1E2" : "#202020", fontFamily: Fontfamily.regular, fontSize: Fontsize.semimedium }} {...checkboxlabelprops} >  {label}</Text>
                        </View>
                    )
                }
            </View>
        </Pressable>
    );
};

export default Checkbox;