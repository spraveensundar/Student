import React, { useContext } from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import Text from "../../text";
import VectorIcons from "../../../Utilities/vectoricons";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Fontsize, Fontfamily, Colors } from "../../../Utilities/uiasset";

import { styles } from "../styles";
import ThemeContext from "../../../Utilities/themecontext";
import { DropdownProps } from "react-native-element-dropdown/src/components/Dropdown/model";

interface LayoutProps {
    label?: string,
    placeholder?: string;
    disabled?: boolean;
    list?: { label: string; value: string | number }[];
    value?: string | number | null;
    onChange?: (item: any) => void;
    dropdownColor?: string;
    position?: any,
    background?: any
    themes?: any,
    bottom?: any,
    conatinerstyle?: StyleProp<ViewStyle>,
    height?: any,
    labelField?: string,
    valueField?: string,
    inputStyle?: any
}

const Layout: React.FC<LayoutProps> = ({
    label = false,
    placeholder = "Select an option",
    list = [],
    value,
    onChange = () => { },
    disabled = false,
    position = "bottom",
    background,
    themes,
    bottom = "5%",
    conatinerstyle,
    height = windowheight * 0.06,
    labelField = "label",
    valueField = "value",
    inputStyle
}) => {
    const theme = themes ?? useContext(ThemeContext)
    const style = styles(theme);
    return (
        <View style={[{ marginBottom: bottom }, conatinerstyle]}>
            {
                label !== false && (
                    <View style={{ marginBottom: "3%" }}>
                        <Text style={{ color: theme.secondarytext }}>{label}</Text>
                    </View>
                )
            }
            <Dropdown
                style={[
                    theme.theme === "dark"
                        ? [
                            style.darkInput,
                            { backgroundColor: background || Colors.btnBgGray }
                        ]
                        : [
                            style.lightInput,
                            { backgroundColor: background || "#F5F5F5" }
                        ],
                    , { height: height, ...inputStyle }]}
                placeholderStyle={{
                    fontSize: Fontsize.semimedium, color: Colors.grey,
                    fontFamily: Fontfamily.regular,
                }}
                selectedTextStyle={{
                    fontFamily: Fontfamily.regular,
                    fontSize: Fontsize.semimedium,
                    color: theme.darktext,
                }}
                containerStyle={{
                    backgroundColor: theme.card,
                    marginTop: position === "top" ? 0 : -25,
                    paddingVertical: 0,
                    marginBottom: 50,
                }}
                activeColor={theme.theme === "dark" ? "#2c2f33" : "#dddddd"}
                data={list.length > 0 ? list : [{ label: "No options", value: null }]}
                search={false}
                maxHeight={windowheight * 0.4}
                labelField={labelField}
                valueField={valueField}
                placeholder={placeholder}
                value={list.length > 0 ? value : null}
                onChange={onChange}
                selectedTextProps={{ numberOfLines: 1 }}
                disable={disabled}
                dropdownPosition={position}
                flatListProps={{
                    contentContainerStyle: {
                        paddingTop: 0,
                        paddingBottom: 0,
                    },
                }}
                renderRightIcon={() => (
                    <VectorIcons
                        family={'Ionicons'}
                        name={'chevron-down-outline'}
                        iconcolor={theme.darktext}
                        size={15}
                    />
                )}
            />
        </View>

    );
};

export default Layout;
