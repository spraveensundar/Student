import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';

import { FieldInputProps } from '../inputType';
import VectorIcons from '../../../Utilities/vectoricons';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import { Colors, Fontfamily, Fontsize } from '../../../Utilities/uiasset';
import { windowheight } from '../../../Utilities/dimensions';
import { ThemeContext } from '@react-navigation/native';

const NumberInput: React.FC<FieldInputProps> = ({
    initialValue,
    onValueChange,
    themes,
    boxstyle,
    increment,
    decrement,
    onChange,
    disabled,
}) => {

    const theme = themes ?? useContext(ThemeContext)
    const style = styles(theme);
    const [value, setValue] = useState(initialValue || 0);


    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleIncrement = () => {
        if (disabled) return;
        const newValue = value + 1;
        setValue(newValue);
        onValueChange?.(newValue);
    };

    const handleDecrement = () => {
        if (disabled) return;
        const newValue = value - 1;
        setValue(newValue);
        onValueChange?.(newValue);
    };

    const handleChange = (text: string) => {
        const parsedValue = parseInt(text, 10);
        const newValue = isNaN(parsedValue) ? 0 : parsedValue;
        setValue(newValue);
        onValueChange?.(newValue);
    };

    return (
        <View style={style.inputWrapper}>
            <Pressable onPress={handleDecrement ?? decrement}>
                <VectorIcons
                    family="AntDesign"
                    name="minus"
                    iconcolor={theme.theme === "dark" ? Colors.white : Colors.dune}
                    size={18}
                />
            </Pressable>
            <TextInput
                editable={disabled}
                style={[style.input, boxstyle]}
                value={String(value)}
                keyboardType="numeric"
                onChangeText={onChange ? onChange : handleChange}
            />
            <Pressable onPress={handleIncrement ?? increment}>
                <VectorIcons
                    family="Ionicons"
                    name="add"
                    iconcolor={theme.theme === "dark" ? Colors.white : Colors.dune}
                    size={18}
                />
            </Pressable>
        </View>

    );
};

const styles = (theme: any) => StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 10,
        height: windowheight * 0.06,
        backgroundColor: theme.theme === "dark" ? "#131517" : Colors.white,
        borderColor: theme.theme === "dark" ? "#2F2F2F" : theme.boderColor,
        paddingHorizontal: '3%',
        justifyContent: "center",
    },
    input: {
        width: 40,
        textAlign: 'center',
        color: theme.darktext,
        fontFamily: Fontfamily.regular,
        fontSize: Fontsize.semimedium,
        marginHorizontal: 8,
    },


});

export default NumberInput;
