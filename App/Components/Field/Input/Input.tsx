import React, { useContext, useEffect, useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { Colors, Fontfamily, Fontsize } from '../../../Utilities/uiasset';
import ThemeContext from '../../../Utilities/themecontext';
import { windowheight, windowwidth } from '../../../Utilities/dimensions';
import Text from '../../text';
import { styles } from '../styles';
import { FieldInputProps } from '../inputType';
import { cleanInput } from '../../../Screens/Services/CleaningService/helperfunction';
import ErrorText from '../../ErrorText';

const Input: React.FC<FieldInputProps> = props => {
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
    bottom = '3%',
    leftContent,
    ref,
    inputProps,
    containerStyle = {},
    isValid = true,
    errorMessage = '',
    errorTextContainerStyle = {},
    errorTextStyle = {},
    multiline,
  } = props;

  const theme = themes ?? useContext(ThemeContext);
  const styless = styles(theme);

  const resolvedPlaceholder = placeholder ?? placeHolder;
  const [values, setValues] = useState<any>(cleanInput(value));

  const handleOnChange = (text: any) => {
    const newValue = cleanInput(text);
    setValues(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    setValues(cleanInput(value));
  }, [value]);

  return (
    <>
      <View style={[{ marginBottom: bottom }, containerStyle]}>
        {label ? (
          <View style={{ marginBottom: '3%' }}>
            <Text
              size="medium"
              family="GRegular"
              style={[{ color: theme.secondarytext }, labelStyle]}
            >
              {label}
            </Text>
          </View>
        ) : null}
        <View
          style={[
            styless.lightInput,
            rightContent ? { paddingRight: '13%' } : null,
            { backgroundColor: background ?? theme.card },
            leftContent ? { paddingLeft: '18%' } : '',
            containerprops,
          ]}
        >
          {leftContent && (
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                position: 'absolute',
                left: 14,
              }}
            >
              {leftContent}
            </View>
          )}
          <TextInput
            ref={ref}
            value={values}
            editable={!disabled}
            placeholder={resolvedPlaceholder}
            onChangeText={handleOnChange}
            secureTextEntry={secureTextEntry}
            underlineColorAndroid="transparent"
            placeholderTextColor={placeholderTextColor || Colors.grey}
            keyboardType={keyboardType as TextInputProps['keyboardType']}
            multiline={multiline}
            style={[
              {
                fontSize: Fontsize.xmedium,
                color: '#323232',
                height: multiline ? windowheight * 0.15 : windowheight * 0.06,
                fontFamily: Fontfamily.GRegular,
                textAlignVertical: multiline ? 'top' : "center",
                top: multiline ? "5%" : 0
              },
              style,
            ]}
            {...inputProps}
          />
          {rightContent && <View style={styless.right}>{rightContent}</View>}
        </View>

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
    </>
  );
};

export default Input;
