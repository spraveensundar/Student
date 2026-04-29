import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import useCustomHooks from '../Actions/Hooks/customhook';
import CommonStyles from '../Utilities/fontStyle';
import { Fontsize } from '../Utilities/uiasset';
import Text from './text';

interface RowInfoProps {
  Key: string;
  value: string;
  containerStyle?: StyleProp<ViewStyle>;
  keyStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  colon?: boolean;
  lefticon?: React.ReactNode;
  valuePress?: () => void;
}

const RowInfo: React.FC<RowInfoProps> = ({
  Key,
  value,
  containerStyle,
  keyStyle,
  valueStyle,
  colon,
  lefticon,
  valuePress,
}) => {
  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);
  return (
    <View style={[CommonStyle.flexRow, containerStyle, { paddingVertical: 3 }]}>
      <View style={CommonStyle.flexRow}>
        {lefticon && lefticon}
        <Text
          style={[
            CommonStyle.textGRegular,
            { fontSize: Fontsize.xmedium },
            keyStyle,
          ]}
        >
          {Key}
        </Text>
      </View>
      {colon && (
        <Text
          style={[
            CommonStyle.textGMedium,
            { fontSize: Fontsize.xmedium, marginLeft: 5, marginRight: 5 },
          ]}
        >
          :
        </Text>
      )}
      <Pressable onPress={valuePress} disabled={!valuePress}>
        <Text
          style={[
            CommonStyle.textGMedium,
            { fontSize: Fontsize.xmedium },
            valueStyle,
          ]}
        >
          {value}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    infoItem: {
      flex: 1,
    },
  });

export default RowInfo;
