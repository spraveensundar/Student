import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import CommonStyles from '../../../Utilities/fontStyle';
import { windowheight, windowwidth } from '../../../Utilities/dimensions';
import { Colors, Fontsize } from '../../../Utilities/uiasset';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import UseModal from '../../../Components/useModal';
import { Button } from '../../../Components/Field';
import Images, { icons } from '../../../Utilities/images';

interface ChooseServiceModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChooseServiceModal: React.FC<ChooseServiceModalProps> = ({
  visible,
  setVisible,
}) => {
  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);

  return (
    <UseModal
      visible={visible}
      setVisible={setVisible}
      containerStyle={{
        height: windowheight * 0.3,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      <Text style={CommonStyle.textGMedium}>Choose service type</Text>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Pressable
          style={style.btnstyle}
          onPress={() => {
            navigation.navigate('MyRide');
            setVisible(false);
          }}
        >
          <View style={style.cardContainer}>
            <Images
              type="image"
              source={icons.carservice}
              width={windowwidth * 0.18}
              height={windowwidth * 0.18}
              style={{
                borderRadius: 10,
              }}
            />
          </View>

          <Text
            style={[
              CommonStyle.textGRegular,
              { fontSize: Fontsize.medium, color: theme.primarytext },
            ]}
          >
            My Ride
          </Text>
        </Pressable>

        <Pressable
          style={style.btnstyle}
          onPress={() => {
            navigation.navigate('Notifications');
            setVisible(false);
          }}
        >
          <View style={style.cardContainer}>
            <Images
              type="image"
              source={icons.Profilenoti}
              width={windowwidth * 0.18}
              height={windowwidth * 0.18}
              style={{
                borderRadius: 10,
              }}
            />
          </View>

          <Text
            style={[
              CommonStyle.textGRegular,
              { fontSize: Fontsize.medium, color: theme.primarytext },
            ]}
          >
            Notification
          </Text>
        </Pressable>
      </View>
    </UseModal>
  );
};

export default ChooseServiceModal;

const styles = (theme: any) =>
  StyleSheet.create({
    cardContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      backgroundColor: theme.cardBg,
      borderWidth: 1,
      borderColor: theme.cardborder,
      borderRadius: 12,
      padding: 20,
    },
    btnstyle: { alignItems: 'center', marginRight: 15, marginVertical: 16 },
  });
