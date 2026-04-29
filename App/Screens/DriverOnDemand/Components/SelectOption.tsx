import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import VectorIcons from '../../../Utilities/vectorIcons';
import { windowwidth } from '../../../Utilities/dimensions';
import { Colors, Fontsize } from '../../../Utilities/uiasset';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import CommonStyles from '../../../Utilities/fontStyle';
import { fonts } from 'react-native-elements/dist/config';
import Images, { name } from '../../../Utilities/images';

interface Props {
  title: string;
  value: string;
  iconName: name;
  iconWidth: number;
  iconHeight: number;
  cardStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const SelectOptionRow: React.FC<Props> = ({
  title,
  value,
  iconName,
  iconWidth,
  iconHeight,
  cardStyle,
  onPress,
}) => {
  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);
  return (
    <Pressable style={[style.card, cardStyle]} onPress={onPress}>
      <Text style={[CommonStyle.textGMedium, { fontSize: Fontsize.xxmedium }]}>
        {title}
      </Text>

      <View style={style.right}>
        <View style={CommonStyle.flexRow}>
          <Images
            type="svg"
            name={iconName}
            width={iconWidth}
            height={iconHeight}
            style={{ marginRight: 6 }}
          />
          <Text
            style={[CommonStyle.textGMedium, { fontSize: Fontsize.medium }]}
          >
            {value}
          </Text>
        </View>
        <VectorIcons
          family="Ionicons"
          name="chevron-down"
          size={windowwidth * 0.045}
          iconcolor={Colors.black}
        />
      </View>
    </Pressable>
  );
};

export default SelectOptionRow;

const styles = (theme: any) =>
  StyleSheet.create({
    card: {
      // width: '48%',
    },
    left: {},
    right: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: theme.cardborder,
      backgroundColor: theme.cardbg,
      marginTop: 8,
    },
    value: {
      marginRight: 4,
      fontSize: Fontsize.medium,
      color: Colors.black,
    },
  });
