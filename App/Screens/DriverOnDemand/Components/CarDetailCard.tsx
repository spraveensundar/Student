import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import CommonStyles from '../../../Utilities/fontStyle';
import { Colors, Fontsize } from '../../../Utilities/uiasset';
import VectorIcons from '../../../Utilities/vectorIcons';
import Card from '../../../Components/Card';
import Images, { icons, name } from '../../../Utilities/images';
import { windowwidth } from '../../../Utilities/dimensions';
import Text from '../../../Components/text';

interface Props {
  name: string;
  status: string;
  containerStyle?: StyleProp<ViewStyle>;
  carFile?: any;
}

const CardDetailCard: React.FC<Props> = ({ name, status, containerStyle, carFile }) => {
  const { theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);

  return (
    <Card containerStyle={[style.card, containerStyle]}>
      <View style={{ width: '40%' }}>
        <Images
          type="image"
          source={carFile?carFile:icons.Car1}
          width={windowwidth * 0.3}
          height={windowwidth * 0.17}
          style={{
            borderRadius: 10,
            marginRight: 12,
          }}
        />
      </View>

      {/* Middle Content */}
      <View style={{ width: '60%', alignItems: 'flex-start', paddingLeft: 10 }}>
        <Text style={[CommonStyle.textGMedium, { fontSize: Fontsize.medium }]}>
          {name}
        </Text>
        <View style={[style.statusTag]}>
          <Text
            style={[
              CommonStyle.textGMedium,
              { color: theme.texthilight, fontSize: Fontsize.semismall },
            ]}
          >
            {status}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default CardDetailCard;

const styles = (theme: any) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      borderRadius: 12,
      //   marginVertical: 5,
    },
    avatar: {
      width: 45,
      height: 45,
      borderRadius: 25,
      marginRight: 12,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      gap: 10,
    },
    ratingBadge: {
      backgroundColor: Colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 7,
      paddingVertical: 1,
      borderRadius: 10,
      marginTop: -6,
    },
    iconBtn: {},
    statusTag: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 6,
      marginTop: 6,
      backgroundColor: `${theme.texthilight}33`,
    },
  });
