import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { FieldInputProps } from "./inputType";
import useCustomHooks from "../../Actions/Hooks/customhook";
import FormGroup from "./FormGroup";
import { Colors, Fontfamily, Fontsize } from "../../Utilities/uiasset";

const Textarea: React.FC<FieldInputProps> = (props) => {
    const {
        value,
        label,
        placeHolder,
        disabled,
        placeholder,
        placeholderTextColor,
        onChange,
        secureTextEntry,
        rightContent,
        labelStyle,
        keyboardType,
        style,
        background
    } = props;

    const { theme } = useCustomHooks();

    return (
        <>
            <FormGroup
                label={label}
                disabled={disabled}
                labelStyle={labelStyle}
                rightContent={rightContent}
                background={background}
            >
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.grey}
                    editable={!disabled}
                    multiline
                    onChangeText={onChange}
                    autoCorrect={false}
                    scrollEnabled={false}
                    underlineColorAndroid="transparent"
                    keyboardType={keyboardType as TextInputProps["keyboardType"]}
                    style={[{
                        fontSize: Fontsize.semimedium, color: theme.textinput, height: 150, textAlignVertical: 'top',
                        paddingHorizontal: 0, top: "2%", fontFamily: Fontfamily.regular
                    }, style]}
                />

                {/* {showCount === true && disabled === false && (
                    <View >
                        <Text style={{ opacity: 0.4 }}>
                            {currentValue.length || 0}/{maxLength} characters used
                        </Text>
                    </View>
                )} */}
            </FormGroup>
        </>
    );
}


export default Textarea;