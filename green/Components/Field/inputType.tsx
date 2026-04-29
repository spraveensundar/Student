import { StyleProp, TextInputProps, TextProps, TextStyle, ViewStyle } from "react-native";
import { AndroidNativeProps, IOSNativeProps } from '@react-native-community/datetimepicker';
import { ReactNode } from "react";

export interface FieldInputProps extends TextInputProps {
    type?: 'search' | 'calculator' | 'checkbox';
    value?: any;
    label?: string;
    disabled?: any;
    placeHolder?: string;
    placeholderTextColor?: string;
    onChange?: (text: any) => void;
    secureTextEntry?: boolean;
    rightContent?: React.ReactNode;
    rightContentClick?: () => void;
    style?: any;
    labelStyle?: StyleProp<TextStyle>;
    error?: string
    initial?: any;
    leftContent?: React.ReactNode;
    placeholder?: string,
    initialValue?: any;
    onValueChange?: (newValue: number) => void;
    containerprops?: StyleProp<ViewStyle>,
    background?: string,
    checkboxlabelprops?: TextProps,
    activecheckboxcolor?: string,
    checkboxstyle?: StyleProp<ViewStyle>,
    boxstyle?: StyleProp<ViewStyle>,
    themes?: any,
    bottom?: any
    errorMessage?: any,
    isValid?: any,
    inputprops?: TextInputProps,
    increment?: any;
    decrement?: any
}

type InputType = "date" | "time" | "datetime";

export interface DateTimeInputProps {
    label?: string;
    value?: Date;
    inputType?: InputType;
    onConfirm?: (date: Date) => void;
    placeHolder?: string;
    dateTimeFormat?: string;
    datePickerProps?: Omit<AndroidNativeProps, 'value'> | Omit<IOSNativeProps, 'value'>;
    containerstyle?: StyleProp<ViewStyle>,
    themes?: any
}


export interface FormGroupProps {
    children?: ReactNode;
    disabled?: boolean;
    label?: string | false;
    labelStyle?: StyleProp<TextStyle>;
    rightContent?: React.ReactNode;
    background?: string,
    containerprops?: StyleProp<ViewStyle>,
    themes?: any,
    bottom?: any,
    leftContent?: React.ReactNode

}