import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { windowheight, windowwidth } from '../../Utilities/dimensions';
import Images, { icons } from '../../Utilities/images';
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
import DriverCard from './Components/DriverCard';
import CardDetailCard from './Components/CarDetailCard';
import { Button } from '../../Components/Field';
import { useAppSelector } from '../../Store/reduxHooks';
import { Stacknavigationtypes } from '../../Navigations/stacknavigationtypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useGetRideDetailQuery } from '../../Common/redux/rideServiceHooks';
import { useFocusEffect } from '@react-navigation/native';
import { constantData } from '../../Common/constant';
import { formatSmartDateTime, openMessage, openPhone, returnOriginalFile } from '../../Common/commonFunction';
import { getHeaderTitle } from './Components/ServiceHeaderTitle';
import { useDispatch } from 'react-redux';
import { setNewRideService } from '../../Common/redux/serviceReducer';


const carImages: any = {
  Hatchback: icons.Car1,
  Sedan: icons.Car2,
  SUV: icons.Car3,
};

type Props = NativeStackScreenProps<Stacknavigationtypes, 'RiderDetail'>;

const RiderDetail: React.FC<Props> = ({ route }) => {
  
  

  const { refetch, data, isLoading, isFetching } = useGetRideDetailQuery({ rideId: route?.params?.rideId });
  const dispatch = useDispatch();

  
  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);
  const [completed, setcompleted] = useState(true);
  const serviceType = useAppSelector(
    state => state?.locationSlice?.selectedService,
  );


  const [rideDetail, setRideDetail] = useState<any>({});


  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  )

  useEffect(() => {
    setRideDetail(data?.data);
  }, [data?.data]);

  const isCompleted = useMemo(() => {
    return rideDetail?.rideStatus === constantData?.rideStatus.completed;
  }, [rideDetail?.rideStatus])

  const isCancelled = useMemo(() => {
    return rideDetail?.rideStatus === constantData?.rideStatus.cancelled;
  }, [rideDetail?.rideStatus])

  const onTrackOrderClick = useCallback(() => {
    dispatch(
      setNewRideService({
        ...rideDetail,
        dataFrom: constantData.rideDataFrom.riderDetail,
        fromLocation: rideDetail?.from?.addressData,
        toLocation: rideDetail?.to?.addressData,
      })
    );
    navigation.navigate('DriverOnDemand', {
      fromScreen: 'riderDetail',
    });
  },[rideDetail]);

  return (
    <Mainview
      isheader={true}
      isscollable={false}
      //   statusbarcontent={'dark'}
      headertitle="Rider Details"
      horizontalpadding={0}
    >
      <ScrollView style={{ flex: 1, paddingHorizontal: windowwidth * 0.05 }}>
        <View style={{ marginTop: 25 }}>
          <DriverCard
            name={rideDetail?.driverDetail?.firstName}
            phone={rideDetail?.driverDetail?.mobileNo}
            profilePic={rideDetail?.driverDetail?.profile ? returnOriginalFile(rideDetail?.driverDetail?.profile) : icons.Man}
            status={rideDetail?.rideStatus}
            rating={5}
            onWhatsapp={() => openPhone(rideDetail?.driverDetail?.mobileNo??"")}
            onMessage={() => openMessage(rideDetail?.driverDetail?.mobileNo??"")}
            onChat={() => navigation.navigate("RideChatBox", { rideDetail: rideDetail })}
            containerStyle={{ marginBottom: 20 }}
            iconWidth={windowwidth * 0.055}
            iconHeight={windowwidth * 0.055}
          />

          <Text style={[CommonStyle.textGMedium, { marginBottom: 10 }]}>
            Booking Details
          </Text>

          <Card containerStyle={{ marginBottom: 20 }}>
            <View style={style.contentPadding}>
              <RowInfo
                Key="Booking ID"
                value={rideDetail?.rideId??""}
                colon={true}
                valueStyle={{ color: Colors.green }}
              />
              <RowInfo
                Key="Booking Type"
                value={getHeaderTitle(rideDetail?.rideType)}
                colon={true}
                valueStyle={{ color: Colors.green }}
              />
              <RowInfo
                Key="Service Type"
                value={getHeaderTitle(rideDetail?.rideType)}
                colon={true}
                valueStyle={{ color: Colors.green }}
              />
            </View>

            <Line />

            <View style={style.contentPadding}>
              <RowInfo
                Key={formatSmartDateTime(new Date(rideDetail?.rideStartTime?rideDetail?.rideStartTime:rideDetail?.startTime))}
                value="Track Order"
                valuePress={() => {
                  onTrackOrderClick();
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
                pickupValue={rideDetail?.from?.address}
                dropValue={rideDetail?.to?.address}
                noCard
                inputLabel
                headTitle="Trip details"
                pickupFocus={false}
                dropFocus={false}
                setPickupFocus={() => { }}
                setDropFocus={() => { }}
                goToSearch={() => { }}
                readOnly={true}
                showDrop={(rideDetail?.rideType == constantData.rideType.twoWay) ? false : true}
              />
            </View>
          </Card>
          <Text style={[CommonStyle.textGMedium, { marginBottom: 10 }]}>
            Car details
          </Text>
          <CardDetailCard
            name={rideDetail?.vehicleBodyType}
            status={rideDetail?.registrationNo}
            containerStyle={{ marginBottom: 20 }}
            carFile={carImages?.[rideDetail?.vehicleBodyType]||carImages.Hatchback}
          />

          <Text style={[CommonStyle.textGMedium, { marginBottom: 10 }]}>
            Payment Summary
          </Text>

          <Card containerStyle={{ padding: 15 }}>
            <RowInfo
              Key="Item Total"
              value={`₹${rideDetail?.estimatedPaymentData?.rideCost}`}
              containerStyle={{ justifyContent: 'space-between' }}
              keyStyle={[
                CommonStyle.textGRegular,
                { fontSize: Fontsize.medium, color: theme.grayText },
              ]}
              valueStyle={[
                CommonStyle.textGMedium,
                { fontSize: Fontsize.medium },
              ]}
            />
            <RowInfo
              Key="Platform Fee"
              value={`₹${rideDetail?.estimatedPaymentData?.platformFeePrice}`}
              containerStyle={{ justifyContent: 'space-between' }}
              keyStyle={[
                CommonStyle.textGRegular,
                { fontSize: Fontsize.medium, color: theme.grayText },
              ]}
              valueStyle={[
                CommonStyle.textGMedium,
                { fontSize: Fontsize.medium },
              ]}
            />
            <RowInfo
              Key="GST"
              value={`₹${rideDetail?.estimatedPaymentData?.gstPrice}`}
              containerStyle={{ justifyContent: 'space-between' }}
              keyStyle={[
                CommonStyle.textGRegular,
                { fontSize: Fontsize.medium, color: theme.grayText },
              ]}
              valueStyle={[
                CommonStyle.textGMedium,
                { fontSize: Fontsize.medium },
              ]}
            />
            <RowInfo
              Key="Payment gateway fee"
              value={`₹${rideDetail?.estimatedPaymentData?.paymentFee}`}
              containerStyle={{
                justifyContent: 'space-between',
              }}
              keyStyle={[
                CommonStyle.textGRegular,
                { fontSize: Fontsize.medium, color: theme.grayText },
              ]}
              valueStyle={[
                CommonStyle.textGMedium,
                { fontSize: Fontsize.medium },
              ]}
            />
          </Card>
          <RowInfo
            Key="Total"
            value={`₹${rideDetail?.estimatedPaymentData?.total}`}
            containerStyle={{ justifyContent: 'space-between', padding: 15 }}
            keyStyle={[
              CommonStyle.textGRegular,
              { fontSize: Fontsize.medium, color: theme.grayText },
            ]}
            valueStyle={[
              CommonStyle.textGMedium,
              { fontSize: Fontsize.medium },
            ]}
          />
        </View>
        <View style={{ height: 25 }} />
      </ScrollView>
      {
        isCompleted
          ?
          (
            <View
              style={{
                paddingVertical: 20,
                borderTopColor: theme.lightBorder,
                borderTopWidth: 1,
                paddingHorizontal: windowwidth * 0.05,
              }}
            >
              <Button
                title="Review & Ratings"
                onPress={() => {
                  navigation.navigate('Review');
                }}
                buttonStyle={{}}
                textStyle={{ fontSize: Fontsize.semilarge }}
              />
            </View>
          )
          :
          null
      }
    </Mainview>
  );
};

export default RiderDetail;

const styles = (theme: any) =>
  StyleSheet.create({
    contentPadding: {
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
  });
