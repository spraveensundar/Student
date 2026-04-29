import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { RFvalue } from '../../../Utilities/dimensions';
import { Colors, Fontsize } from '../../../Utilities/uiasset';
import CommonStyles from '../../../Utilities/fontStyle';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import Images, { name } from '../../../Utilities/images';

export interface RadioButtonProps {
  id: number|string;
  label: string;
  icon?: name;
  selected: number|string;
  onPress: (id: number|string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  label,
  icon,
  selected,
  onPress,
  containerStyle,
  textStyle,
}) => {
  const isActive = selected === id;
  const { theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);
  return (
    <TouchableOpacity
      style={[style.row, containerStyle]}
      onPress={() => onPress(id)}
    >
      <View style={style.left}>
        {icon && (
          <Images
            type="svg"
            name={icon}
            width={35}
            height={25}
            style={{ marginRight: 5 }}
          />
        )}
        <Text
          style={[
            CommonStyle.textGMedium,
            { fontSize: Fontsize.xxmedium },
            textStyle,
          ]}
        >
          {label}
        </Text>
      </View>

      {/* Radio */}
      <View style={[style.radioOuter, isActive && style.activeOuter]}>
        {isActive && <View style={style.radioInner} />}
      </View>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = (theme: any) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    radioOuter: {
      width: 20,
      height: 20,
      borderRadius: 50,
      borderWidth: 1.5,
      borderColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeOuter: {
      borderColor: Colors.primary,
    },
    radioInner: {
      width: 12,
      height: 12,
      backgroundColor: Colors.primary,
      borderRadius: 50,
    },
  });
