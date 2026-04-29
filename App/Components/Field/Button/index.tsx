import React, { useContext } from 'react';
import {
  Pressable,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  PressableProps,
  View,
  StyleProp,
} from 'react-native';

import Text from '../../text';
import { Colors } from '../../../Utilities/uiasset';
import useCustomHooks from '../../../Actions/Hooks/customhook';

import ThemeContext from '../../../Utilities/themecontext';
import { windowheight } from '../../../Utilities/dimensions';
import { styles } from '../styles';

interface ButtonProps extends PressableProps {
  title: string;
  loading?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  rightContent?: React.ReactNode;
  leftContent?: React.ReactNode;
  themes?: any;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  buttonStyle,
  textStyle,
  rightContent,
  leftContent,
  themes,
  ...restProps
}) => {
  const theme = themes ?? useContext(ThemeContext);
  const style = styles(theme);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        {
          width: '100%',
          backgroundColor: '#000C51',
          paddingHorizontal: 20,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          height: windowheight * 0.06,
        },
        buttonStyle,
        textStyle,
      ]}
      {...restProps}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text family="GMedium" size="medium" color="white" style={textStyle}>
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default Button;
