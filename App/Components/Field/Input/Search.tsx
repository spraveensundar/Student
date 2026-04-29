import React from "react";
import { TextInput, View, TextInputProps } from "react-native";

import FormGroup from "../FormGroup";
import { FieldInputProps } from "../inputType";
import { Fontsize } from "../../../Utilities/uiasset";
import theme from "../../../Utilities/theme";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { windowheight } from "../../../Utilities/dimensions";

const Search: React.FC<FieldInputProps> = (props) => {
    const { theme } = useCustomHooks()
    const {
        value,
        label,
        disabled,
        placeHolder,
        placeholderTextColor = "#fff",
        onChange,
        secureTextEntry,
        rightContent,
        rightContentClick,
        style,
        labelStyle,
        leftContent,
        keyboardType
    } = props;

    return (
        <>
            <FormGroup
                label={label}
                disabled={disabled}
                labelStyle={labelStyle}
                rightContent={rightContent}

            >

                {!disabled && (
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        {leftContent && (
                            leftContent
                        )}

                        <TextInput
                            value={value}
                            editable={!disabled}
                            placeholder={placeHolder}
                            onChangeText={onChange}
                            secureTextEntry={secureTextEntry}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={theme.secondarytext}
                            keyboardType={keyboardType as TextInputProps["keyboardType"]}
                            style={{ fontSize: Fontsize.semimedium, color: theme.secondarytext, paddingLeft: 10, height: windowheight * 0.06 }}
                        />
                    </View>
                )}
            </FormGroup>

        </>
    );
};

export default Search;
