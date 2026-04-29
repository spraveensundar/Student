import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, BackHandler } from 'react-native';
import { windowwidth } from '../../Utilities/dimensions';
import Images from '../../Utilities/images';
import CommonStyles from '../../Utilities/fontStyle';
import useCustomHooks from '../../Actions/Hooks/customhook';
import { Colors, Fontfamily, Fontsize } from '../../Utilities/uiasset';
import Mainview from '../../Components/mainview';
import VectorIcons from '../../Utilities/vectorIcons';
import Card from '../../Components/Card';
import Text from '../../Components/text';
import Line from '../../Components/Line';
import RowInfo from '../../Components/RowInfo';
import LocationInputs from './Components/LocationInput';
import { useAppSelector } from '../../Store/reduxHooks';
import { Stacknavigationtypes } from '../../Navigations/stacknavigationtypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { useGetRideDetailQuery } from '../../Common/redux/rideServiceHooks';
import { getHeaderTitle } from './Components/ServiceHeaderTitle';
import { formatSmartDateTime } from '../../Common/commonFunction';
import { constantData } from '../../Common/constant';


type Props = NativeStackScreenProps<Stacknavigationtypes, 'BookingDetail'>;

const BookingDetail: React.FC<Props> = ({ route }) => {


  const rideDetail: any = route.params?.rideDetail, rideId = "699d7732507e81fdbcdd0088"; //route?.params?.rideId


  console.log('rideDetailrideDetail',rideDetail)

  const { data, isLoading } = useGetRideDetailQuery({ rideId: rideDetail?._id??rideId })



  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);


  const [ rideData, setRideData ] = useState<any>({});
  const [ paymentMode, setPaymentMode ] = useState<any>({});


  const serviceType = useAppSelector(
    state => state?.locationSlice?.selectedService,
  );


  console.log('rideDatarideData',rideData)

  useFocusEffect(
    useCallback(() => {

      const backAction = () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Bottomtab" }],
          })
        );
        navigation.navigate("MyRide");
        return true;
      }

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => backAction()
      );

      return () => backHandler.remove();
    }, [])
  )

  useEffect( () => {
    setRideData(data?.data);
  },[data?.data])

  useEffect(() => {
    let finalPaymentData = {};
    if(rideData?.paymentMode == constantData.paymentType.cash){
      finalPaymentData = {
        key: "Paying via cash",
        value: "Cash payment",
        lefticon: <Images
          type="svg"
          name={'Cash'}
          width={30}
          height={20}
          style={{ marginRight: 5 }}
        />
      }
    }
    else{
      finalPaymentData = {
        key: "Paying via Online",
        value: "Online payment",
        lefticon: <Images
          type="svg"
          name={'Cash'}
          width={30}
          height={20}
          style={{ marginRight: 5 }}
        />
      }
    }
    setPaymentMode(finalPaymentData);
  },[rideData]);

  const isDriverAssigned = useMemo(() => {
    return rideData?.driverId ? true : false;
  },[rideData?.driverId])

  return (
    <Mainview
      isheader={true}
      isscollable={false}
      //   statusbarcontent={'dark'}
      headertitle="Booking"
      //   horizontalpadding={0}
      rightfn={
        <VectorIcons
          family="MaterialCommunityIcons"
          name="share"
          size={30}
          iconcolor={Colors.black}
        />
      }
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginTop: 20 }}>
          <Text style={[CommonStyle.textGMedium, { marginBottom: 15 }]}>
            Booking Details
          </Text>

          <Card containerStyle={{ marginBottom: 25 }}>
            <View
              style={[
                CommonStyle.flexRow,
                {
                  backgroundColor: Colors.primary,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 10,
                  marginTop: -1,
                  marginHorizontal: -1,
                },
              ]}
            >
              <Text
                style={[
                  CommonStyle.textGMedium,
                  { fontSize: Fontsize.xxmedium, color: Colors.white },
                ]}
              >
                Booking Scheduled
              </Text>
              <VectorIcons
                family="MaterialCommunityIcons"
                name="check-decagram"
                size={windowwidth * 0.05}
                iconcolor={Colors.green}
                style={{
                  borderRadius: 50,
                  marginLeft: 8,
                }}
              />
            </View>
            <View style={style.contentPadding}>
              <RowInfo
                Key="Booking ID"
                value={rideData?.rideId}
                colon={true}
                valueStyle={{ color: Colors.green }}
              />
              <RowInfo
                Key="Booking Type"
                value={getHeaderTitle(rideData?.rideType)}
                colon={true}
                valueStyle={{ color: Colors.green }}
              />
            </View>

            <Line />

            <View style={style.contentPadding}>
              <RowInfo
                Key={formatSmartDateTime(new Date(rideData?.rideStartTime?rideData?.rideStartTime:rideData?.startTime))}
                value={
                  isDriverAssigned
                  ?
                  "View Details"
                  :
                  ""
                }
                valuePress={() => {
                  rideData?.driverId
                  ?
                  navigation.navigate('RiderDetail',{rideDetail: rideData, rideId: rideData?._id})
                  :
                  ""
                }}
                containerStyle={{ justifyContent: 'space-between' }}
                keyStyle={{
                  fontFamily: Fontfamily.GMedium,
                }}
                valueStyle={{
                  color: Colors.primary,
                  textDecorationLine: 'underline',
                  textDecorationColor: Colors.primary,
                }}
                lefticon={
                  <VectorIcons
                    family="MaterialIcons"
                    name="location-on"
                    size={windowwidth * 0.06}
                    iconcolor={Colors.yellow}
                    style={{
                      borderRadius: 50,
                    }}
                  />
                }
              />
            </View>

            <Line />

            <View style={style.contentPadding}>
              <LocationInputs
                noCard
                inputLabel
                headTitle="Trip details"
                pickupFocus={false}
                dropFocus={false}
                showDrop={rideData?.rideType == constantData.rideType.twoWay ? false : true}
                setPickupFocus={() => {}}
                setDropFocus={() => {}}
                goToSearch={() => {}}
                readOnly={true}
                pickupValue={rideData?.from?.address??""}
                dropValue={rideData?.to?.address??""}
              />
            </View>
          </Card>

          <Text style={[CommonStyle.textGMedium, { marginBottom: 10 }]}>
            Payment mode
          </Text>

          <Card containerStyle={{ paddingVertical: 5, paddingHorizontal: 15 }}>
            <RowInfo
              Key={paymentMode?.key}
              value={paymentMode?.value}
              containerStyle={{ justifyContent: 'space-between' }}
              keyStyle={{
                fontFamily: Fontfamily.GMedium,
                fontSize: Fontsize.xxmedium,
              }}
              valueStyle={{
                color: Colors.primary,
                textDecorationLine: 'underline',
                textDecorationColor: Colors.primary,
              }}
              lefticon={paymentMode?.lefticon}
            />
          </Card>
        </View>
      </ScrollView>
      {
        isDriverAssigned
          ?
          <Pressable
            style={{
              backgroundColor: Colors.white,
              marginBottom: 10,
            }}
            onPress={() => {
              navigation.navigate('RiderDetail',{rideDetail: rideData, rideId: rideData?._id});
            }}
          >
            <Text
              style={[
                CommonStyle.textGMedium,
                {
                  color: Colors.primary,
                  textDecorationLine: 'underline',
                  textDecorationColor: Colors.primary,
                  fontSize: Fontsize.medium,
                  textAlign: 'center',
                },
              ]}
            >
              View Rider Details
            </Text>
          </Pressable>
          :
          <></>
      }
    </Mainview>
  );
};

export default BookingDetail;

const styles = (theme: any) =>
  StyleSheet.create({
    contentPadding: {
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
  });
