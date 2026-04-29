import React, { useContext, useEffect, useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";

import FormGroup from "../FormGroup";
import { FieldInputProps } from "../inputType";
import { Colors, Fontfamily, Fontsize } from "../../../Utilities/uiasset";
import ThemeContext from "../../../Utilities/themecontext";
import { windowheight } from "../../../Utilities/dimensions";
import Text from "../../text";
import { cleanInput } from "../../../Utilities/helerfunction";

const Input: React.FC<FieldInputProps> = (props) => {
    const {
        value,
        label,
        disabled,
        placeHolder,
        placeholder,
        placeholderTextColor,
        onChange,
        secureTextEntry,
        rightContent,
        labelStyle,
        keyboardType,
        style,
        background,
        containerprops,
        themes,
        bottom,
        leftContent,
        errorMessage,
        isValid = false,
        inputprops
    } = props;

    // const { theme } = useCustomHooks();
    const theme = themes ?? useContext(ThemeContext)
    const resolvedPlaceholder = placeholder ?? placeHolder;


    const [values, setValues] = useState<any>(cleanInput(value));

    const handleOnChange = (text: any) => {
        const newValue = cleanInput(text); // always a string
        setValues(newValue);
        onChange?.(newValue); // safe call if onChange exists
    };

    useEffect(() => {
        setValues(cleanInput(value)); // update input when parent changes
    }, [value]);



    return (
        <>
            <FormGroup
                label={label}
                disabled={disabled}
                labelStyle={labelStyle}
                rightContent={rightContent}
                leftContent={leftContent}
                background={background}
                containerprops={containerprops}
                themes={themes}
                bottom={bottom}
            >
                {
                    leftContent && (
                        <View style={{ alignItems: "flex-start", justifyContent: "flex-end", position: "absolute", left: "7%" }}>
                            {leftContent}
                        </View>
                    )
                }
                <TextInput
                    value={values}
                    editable={!disabled}
                    placeholder={resolvedPlaceholder}
                    onChangeText={handleOnChange}
                    secureTextEntry={secureTextEntry}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={placeholderTextColor || Colors.grey}
                    keyboardType={keyboardType as TextInputProps["keyboardType"]}
                    style={[{ fontSize: Fontsize.semimedium, color: theme.textinput, height: windowheight * 0.06, fontFamily: Fontfamily.regular }, style]}

                />
            </FormGroup>
            {/* {
                isValid && (
                    <Text style={{ color: Colors.red, marginTop: -10 }}>{errorMessage}</Text>
                )
            } */}
        </>
    );
};

export default Input;
