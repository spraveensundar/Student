import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import CommonStyles from '../../../Utilities/fontStyle';
import { Colors, Fontsize } from '../../../Utilities/uiasset';
import VectorIcons from '../../../Utilities/vectorIcons';
import Card from '../../../Components/Card';
import Images, { icons, lotties, name } from '../../../Utilities/images';
import { windowwidth } from '../../../Utilities/dimensions';
import Text from '../../../Components/text';
import { constantData } from '../../../Common/constant';

interface Props {
  name: string;
  phone?: string;
  status?: string;
  profilePic?: name;
  rating?: number;
  onWhatsapp?: () => void;
  onMessage?: () => void;
  onShare?: () => void;
  onChat?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  iconHeight?: number;
  iconWidth?: number;
  rightContent?: React.ReactNode;
  LeftContent?: React.ReactNode;
  noCard?: boolean;
  subnameStyle?: StyleProp<TextStyle>;
  nameStyle?: StyleProp<TextStyle>;
  onProfileClick?: () => void;
}

const DriverCard: React.FC<Props> = ({
  name,
  phone,
  status,
  profilePic,
  rating = 5,
  onWhatsapp,
  onMessage,
  onShare,
  onChat,
  containerStyle,
  iconHeight,
  iconWidth,
  rightContent,
  LeftContent,
  noCard,
  nameStyle,
  subnameStyle,
  onProfileClick= () => {},
}) => {



  const { theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);


  const [ statusData, setStatusData ] = useState({
    status: "",
    color: "transparent",
  });

  useEffect(() => {
    let setData = { status: "", color: "transparent" };
    if(status == constantData.rideStatus.started){
      setData = { status: status, color: Colors.darkyellow };
    }
    else if(status == constantData.rideStatus.accepted){
      setData = { status: constantData.rideStatus.accepted, color: Colors.green };
    }
    else if(status == constantData.rideStatus.completed){
      setData = { status: constantData.rideStatus.completed, color: Colors.green };
    }
    else if(status == constantData.rideStatus.cancelled){
      setData = { status: constantData.rideStatus.cancelled, color: Colors.red };
    }
    else if(status == constantData.rideStatus.created){
      setData = { status: constantData.rideStatus.created, color: Colors.yellow };
    }
    setStatusData({...setData});
  },[status]);

  const noicons = !onWhatsapp && !onMessage && !onShare;

  return (
    <Card
      containerStyle={[
        style.card,
        containerStyle,
        noCard && { borderWidth: 0, padding: 0 },
      ]}
    >
      {profilePic && (
        <Pressable
          style={{
            alignItems: 'center',
            marginRight: 12,
          }}
          onPress={()=>onProfileClick()}
        >
          <Images
            type="image"
            source={icons.Man}
            width={windowwidth * 0.11}
            height={windowwidth * 0.11}
            style={{
              borderRadius: 10,
            }}
          />
          <View style={style.ratingBadge}>
            <Text
              style={[
                CommonStyle.textHMedium,
                { fontSize: Fontsize.tinylarge, color: Colors.white },
              ]}
            >
              {rating}
            </Text>
            <VectorIcons
              family="FontAwesome"
              name="star"
              size={10}
              iconcolor={Colors.darkyellow}
              style={{ marginLeft: 3 }}
            />
          </View>
        </Pressable>
      )}

      {LeftContent && LeftContent}

      {/* Middle Content */}
      <View style={{ flex: 1, marginTop: noCard ? 5 : 0 }}>
        <Text
          style={[
            CommonStyle.textGMedium,
            { fontSize: Fontsize.xxmedium, marginBottom: 2 },
            nameStyle,
          ]}
        >
          {name}
        </Text>
        {phone && (
          <Text
            style={[
              CommonStyle.textGRegular,
              {
                fontSize: Fontsize.semimedium,
                color: theme.grayText,
                marginBottom: 8,
              },
              subnameStyle,
            ]}
          >
            {phone}
          </Text>
        )}

        <View style={style.row}>
          {/* Whatsapp */}
          {onWhatsapp && (
            <Pressable onPress={onWhatsapp} style={style.iconBtn}>
              <Images
                type="image"
                source={icons.Whatsapp}
                width={iconWidth}
                height={iconHeight}
                style={{
                  borderRadius: 10,
                  marginRight: 5,
                }}
              />
            </Pressable>
          )}

          {/* Message */}
          {onMessage && (
            <Pressable onPress={onMessage} style={style.iconBtn}>
              <Images
                type="image"
                source={icons.Message}
                width={iconWidth}
                height={iconHeight}
                style={{
                  borderRadius: 10,
                  marginRight: 5,
                }}
              />
            </Pressable>
          )}
          {onChat && (
            <Pressable onPress={onChat} style={style.iconBtn}>
              <Images
                type="image"
                source={icons.Message}
                width={iconWidth}
                height={iconHeight}
                style={{
                  borderRadius: 10,
                  marginRight: 5,
                }}
              />
            </Pressable>
          )}
          {onShare && (
            <Pressable onPress={onShare} style={style.iconBtn}>
              <Images
                type="image"
                source={icons.Share}
                width={iconWidth}
                height={iconHeight}
                style={{
                  borderRadius: 10,
                  marginRight: 5,
                }}
              />
            </Pressable>
          )}
        </View>
      </View>

      {status && (
        <View
          style={[
            style.statusTag,
            {
              backgroundColor: statusData?.color,
            },
          ]}
        >
          <Text
            style={[
              CommonStyle.textGMedium,
              {
                color: Colors.white,
                fontSize: Fontsize.small,
                textAlign: 'center',
              },
            ]}
          >
            {statusData?.status}
          </Text>
        </View>
      )}

      {rightContent && rightContent}
    </Card>
  );
};

export default DriverCard;

const styles = (theme: any) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'flex-start',
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
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 6,
      marginTop: 6,
      marginLeft: 10,
      width: 80,
    },
  });
