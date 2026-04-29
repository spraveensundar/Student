import React, { useContext } from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import Text from "../../text";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Fontsize, Fontfamily, Colors } from "../../../Utilities/uiasset";

import { styles } from "../styles";
import ThemeContext from "../../../Utilities/themecontext";
import VectorIcons from "../../../Utilities/vectorIcons";
import ErrorText from "../../ErrorText";

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
    inputStyle?: any,
    isValid?: boolean;
    errorMessage?: any;
    errorTextContainerStyle?: any;
    errorTextStyle?: any;
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
    inputStyle,
    isValid = true,
    errorMessage = '',
    errorTextContainerStyle = {},
    errorTextStyle = {},
}) => {
    const theme = themes ?? useContext(ThemeContext)
    const style = styles(theme);
    return (
        <View style={[{ marginBottom: bottom }, conatinerstyle]}>
            {
                label !== false && (
                    <View style={{ marginBottom: "3%" }}>
                        <Text family="GRegular" size="medium">{label}</Text>
                    </View>
                )
            }
            <Dropdown
                style={{
                    backgroundColor: theme.lightGrey,
                    borderRadius: 10,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    width: '100%',
                    justifyContent: "center",
                    position: "relative",
                    shadowColor: "rgba(0,0,0,0.25)",
                    shadowOffset: { width: 0, height: 0.5 },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                    elevation: 3,
                    height: windowheight * 0.06
                }}
                placeholderStyle={{
                    fontSize: Fontsize.xmedium, color: Colors.grey,
                    fontFamily: Fontfamily.GRegular,
                }}
                selectedTextStyle={{
                    fontFamily: Fontfamily.medium,
                    fontSize: Fontsize.xmedium,
                    color: "#323232",
                }}
                containerStyle={{
                    backgroundColor: theme.lightGrey,
                    // backgroundColor: "#F3F3F3",
                    // marginTop: position === "top" ? 0 : -25,
                    paddingVertical: 0,
                    marginBottom: 50,
                }}
                data={list.length > 0 ? list : [{ [labelField ? labelField : "label"]: "No options", value: null }]}
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
                        size={25}
                    />
                )}
            />

            {!isValid && (

                <ErrorText
                    errorTextContainerStyle={errorTextContainerStyle}
                    errorMessage={errorMessage}
                    errorTextStyle={errorTextStyle}
                />
                // <View style={[{ marginTop: 2, marginHorizontal: windowwidth * 0.02 }, errorTextContainerStyle]}>
                //   <Text
                //     style={[{
                //       fontFamily: Fontfamily.GRegular,
                //       fontSize: Fontsize.medium,
                //       color: 'red',
                //     }, errorTextStyle]}
                //   >
                //     {errorMessage}
                //   </Text>
                // </View>
            )}

        </View>

    );
};

export default Layout;
