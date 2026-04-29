import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, BackHandler, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import {
  RFvalue,
  windowheight,
  windowwidth,
} from '../../../Utilities/dimensions';
import Lottie from '../../../Components/lottieview';
import Images, { icons, lotties } from '../../../Utilities/images';
import CommonStyles from '../../../Utilities/fontStyle';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import { Fontsize } from '../../../Utilities/uiasset';
import Mainview from '../../../Components/mainview';
import VectorIcons from '../../../Utilities/vectorIcons';
import { fonts } from 'react-native-elements/dist/config';
import { Button } from '../../../Components/Field';
import { useAppSelector } from '../../../Store/reduxHooks';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Stacknavigationtypes } from '../../../Navigations/stacknavigationtypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<Stacknavigationtypes, 'BookingSuccess'>;

const BookingSuccess: React.FC<Props> = ({ route }) => {


  const rideDetail = route.params?.rideDetail;


  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);


  const [complete, setComplete] = useState(false);
  const reschedule = useAppSelector(state => state?.locationSlice?.reschedule);


  useFocusEffect(
    useCallback(() => {

      const backAction = () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Bottomtab" }],
          })
        );
        return true;
      }

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => backAction()
      );

      return () => backHandler.remove();
    }, [])
  )

  return (
    <Mainview
      isheader={complete ? true : false}
      isscollable={false}
      //   statusbarcontent={'dark'}
      headertitle={reschedule ? 'Rescheduled Booking' : 'Booking'}
      //   horizontalpadding={0}
      rightfn={
        reschedule ? null : (
          <Pressable
            onPress={() => navigation.navigate('ContactUs', { title: 'Help' })}
          >
            <Text
              style={[
                CommonStyle.textHMedium,
                { color: theme.helpInfo, fontSize: Fontsize.semimedium },
              ]}
            >
              Help ?
            </Text>
          </Pressable>
        )
      }
    >
      {complete ? (
        <View style={style.container}>
          <Images
            type="svg"
            name={'Driverman'}
            width={windowwidth * 0.65}
            height={windowwidth * 0.65}
          />

          <Text
            style={[
              CommonStyle.textGRegular,
              {
                fontSize: Fontsize.medium,
                textAlign: 'center',
                width: '80%',
                lineHeight: Fontsize.large,
                marginBottom: 25,
              },
            ]}
          >
            {reschedule
              ? 'Your outstation trip has been updated to Oct 16, 2025 at 02:00 PM. We’ll reassign a driver closer to your travel time. You’ll receive a confirmation notification soon.'
              : 'Finding the best driver for you… your booking will be confirmed shortly.'}
          </Text>

          <Button
            title="Booking details"
            onPress={() => {

              // navigation.navigate("MyRide",{noBack: true});
              navigation.navigate('BookingDetail', { noBack: true, rideDetail: rideDetail });
            }}
            textStyle={{ fontSize: Fontsize.medium }}
            buttonStyle={{ width: 'auto', paddingHorizontal: 30 }}
          />
          <View style={{ height: windowheight * 0.1 }} />
        </View>
      ) : (
        <View style={style.container}>
          <Lottie
            src={lotties.Tick}
            style={{ width: '50%', height: '30%' }}
            speed={0.5}
            loop={false}
            onAnimationFinish={() => {
              setComplete(true);
            }}
          />
          <Text style={[CommonStyle.textHBold, { fontSize: Fontsize.medium }]}>
            {reschedule
              ? 'Ride Rescheduled Successfully'
              : 'Your booking created successfully !'}
          </Text>
        </View>
      )}
    </Mainview>
  );
};

export default BookingSuccess;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lottie: {
      width: windowwidth * 0.3,
      height: windowwidth * 0.3,
    },
  });
