import React, { useContext } from "react";
import { Pressable, View } from "react-native";
import { Fontfamily, Fontsize } from "../../../Utilities/uiasset";
import ThemeContext from "../../../Utilities/themecontext";
import { windowwidth } from "../../../Utilities/dimensions";
import Text from "../../text";
import { styles } from "../styles";
import { FieldInputProps } from "../inputType";
import { getDateTimeFormat } from "../../../Utilities/helper";
import RNDatetimePicker from "@react-native-community/datetimepicker";

const DateTimePicker: React.FC<FieldInputProps> = (props) => {
    const {
        inputType = 'date',
        value = new Date(),
        showPicker = true,
        onPressPicker = () => { },
        onConfirm = () => { },
        onDismiss = () => { },
        dateTimeFomat = '',
        dateTimeTextStyle = {},
        datePickerProps,
        label,
        placeHolder,
        placeholder,
        placeholderTextColor,
        bodyContent = null,
        rightContent,
        labelStyle,
        style,
        background,
        containerprops,
        themes,
        bottom = '3%',
        leftContent,
        containerStyle = {},
        isValid = true,
        errorMessage = '',
        errorTextContainerStyle = {},
        errorTextStyle = {},
    } = props;

    const contextTheme = useContext(ThemeContext);
    const theme = themes ?? contextTheme;
    const styless = styles(theme);

    const resolvedPlaceholder = placeholder ?? placeHolder;

    return (
        <>
            <Pressable
                style={[{ marginBottom: bottom }, containerStyle]}
                onPress={() => onPressPicker()}
            >
                {bodyContent ?? <>
                    {
                        label !== false && (
                            <View style={{ marginBottom: "3%" }}>
                                <Text size="medium" family="GRegular" style={[{ color: theme.secondarytext }, labelStyle]}>{label}</Text>
                            </View>
                        )
                    }
                    <View style={[styless.lightInput, rightContent ? { paddingRight: "13%", } : null, { backgroundColor: background ?? theme.card }, leftContent ? { paddingLeft: "18%" } : "", containerprops]}>
                        {
                            leftContent && (
                                <View style={{ alignItems: "flex-start", justifyContent: "flex-end", position: "absolute", left: "7%" }}>
                                    {leftContent}
                                </View>
                            )
                        }
                        <>
                            <View
                                style={[{
                                    flex: 1,
                                    height: 45,
                                    justifyContent: 'center',
                                }, style]}
                            >
                                <Text
                                    style={[{
                                        fontFamily: Fontfamily.GRegular,
                                        fontSize: Fontsize.medium,
                                        color: placeholderTextColor ?? theme.placeholdertextcolor,
                                    }, value && dateTimeTextStyle]}
                                >{value ? getDateTimeFormat(value, inputType, dateTimeFomat) : resolvedPlaceholder}</Text>
                            </View>
                        </>
                        {rightContent && rightContent}
                    </View>
                </>}
                {!isValid && (
                    <View style={[{ marginTop: 2, marginHorizontal: windowwidth * 0.02 }, errorTextContainerStyle]}>
                        <Text
                            style={[{
                                fontFamily: Fontfamily.GRegular,
                                fontSize: Fontsize.medium,
                                color: 'red',
                            }, errorTextStyle]}
                        >
                            {errorMessage}
                        </Text>
                    </View>
                )}
            </Pressable>
            {showPicker && value &&
                <RNDatetimePicker
                    mode={inputType as 'date' | 'time' | 'datetime' | 'countdown'}
                    value={value}
                    onChange={(event, selectedDate) => {
                        onConfirm(selectedDate);
                        onDismiss();
                    }}
                    {...datePickerProps}
                />
            }
        </>
    );
};

export default DateTimePicker;
