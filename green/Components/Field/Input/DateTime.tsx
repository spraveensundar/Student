import React, { useContext, useState } from "react";
import { Text, Pressable, Platform } from "react-native";
import RNDateTimePicker from '@react-native-community/datetimepicker';

import FormGroup from "../FormGroup";
import { DateTimeInputProps } from "../inputType";
import { Colors, Fontsize } from "../../../Utilities/uiasset";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { getDateTimeFormat } from "../../../Utilities/dateTime";
import { windowheight } from "../../../Utilities/dimensions";
import ThemeContext from "../../../Utilities/themecontext";

const InputDateTime: React.FC<DateTimeInputProps> = ({
    value,
    inputType = "date",
    onConfirm,
    placeHolder = "Select",
    dateTimeFormat,
    datePickerProps,
    label,
    containerstyle,
    themes
}) => {
    const theme = themes ?? useContext(ThemeContext)
    const [showPicker, setShowPicker] = useState(false);

    const handlePress = () => setShowPicker(true);

    const handleChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === "android") {
            setShowPicker(false);
            if (event.type === "set" && selectedDate) {
                onConfirm && onConfirm(selectedDate);
            }
        } else {
            if (selectedDate) {
                onConfirm && onConfirm(selectedDate);
            }
        }
    };

    const pickerMode: "date" | "time" = inputType === "datetime" ? "date" : inputType;

    return (
        <FormGroup themes={themes} label={label} containerprops={[{ height: windowheight * 0.06 }, containerstyle]}>
            <Pressable onPress={handlePress}>
                <Text style={value ? { color: theme.textinput, fontSize: Fontsize.semimedium } : { color: Colors.grey, fontSize: Fontsize.semimedium }}>
                    {value ? getDateTimeFormat(value, inputType, dateTimeFormat) : placeHolder}
                </Text>
            </Pressable>
            {showPicker && (
                <RNDateTimePicker
                    value={value || new Date()}
                    mode={pickerMode}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={handleChange}
                    {...datePickerProps}
                />
            )}
        </FormGroup>
    );
};

export default InputDateTime;