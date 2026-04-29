import {
  StyleProp,
  TextInputProps,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

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
  error?: string;
  initial?: boolean;
  leftContent?: React.ReactNode;
  placeholder?: string;
  initialValue?: any;
  onValueChange?: (newValue: number) => void;
  containerprops?: StyleProp<ViewStyle>;
  background?: string;
  checkboxlabelprops?: TextProps;
  activecheckboxcolor?: string;
  checkboxstyle?: StyleProp<ViewStyle>;
  boxstyle?: StyleProp<ViewStyle>;
  themes?: any;
  bottom?: any;
  increment?: any;
  decrement?: any;
  custom?: any;
  check?: any;
  ref?: any;
  inputProps?: TextInputProps;
  containerStyle?: any;
  isValid?: boolean;
  errorMessage?: any;
  errorTextContainerStyle?: any;
  errorTextStyle?: any;
}
