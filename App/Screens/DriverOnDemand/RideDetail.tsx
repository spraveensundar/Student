import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import {
  borderwidth,
  windowheight,
  windowwidth,
} from '../../Utilities/dimensions';
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
import MapView, { Marker } from 'react-native-maps';
import { trackDriverMapStyle } from '../../Utilities/CustomMapStyle';
import CancelReasonModal from './Components/CancelReasonModal';
import UseModal from '../../Components/useModal';
import ConfirmCancelModal from './Components/ConfirmCancelModal';
import { useAppDispatch, useAppSelector } from '../../Store/reduxHooks';
import { setDrop, setReschedule } from '../../Store/Slices/LocationSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Stacknavigationtypes } from '../../Navigations/stacknavigationtypes';
import { useFocusEffect } from '@react-navigation/native';
import { useGetRideDetailQuery } from '../../Common/redux/rideServiceHooks';
import { formatDayDateTime, openMessage, openPhone, returnOriginalFile, toastFn } from '../../Common/commonFunction';
import { constantData } from '../../Common/constant';
import { GoogleMapView } from '../../Components/Field/Map/GoogleMapView';
import { cancelRide, ridePaid } from '../../Common/axiosHooks/rideServiceHooks';
import { setNewRideService } from '../../Common/redux/serviceReducer';
import { useDispatch } from 'react-redux';



const carImages: any = {
  Hatchback: icons.Car1,
  Sedan: icons.Car2,
  SUV: icons.Car3,
};

type Props = NativeStackScreenProps<Stacknavigationtypes, 'RideDetail'>;

const RideDetail: React.FC<Props>= ({ route }) => {


  const dispatch = useDispatch();
  const serviceType = useAppSelector(
    state => state?.locationSlice?.selectedService,
  );
  const { refetch, data, isLoading, isFetching } = useGetRideDetailQuery({ rideId: route?.params?.rideId });


  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);
  
  
  
  const [completed, setcompleted] = useState(true);
  const [cancelVisible, setCancelVisible] = useState(false);
  const [selected, setSelected] = useState(
    { id: 1, label: 'Driver took too long to arrive' },
  );
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [rideDetail, setRideDetail] = useState<any>({});
  const [changeMarker, setChangeMarker] = useState(false);
  const [ loadStatus, setLoadStatus ] = useState({
    mainLoading: false,
    overLapLoading: false,
  });


  console.log('routerouterouteroute',data,rideDetail)

  const confirmCancel = async () => {
    setLoadStatus({
      ...loadStatus,
      overLapLoading: true,
    });
    let sendData = {
      reason: selected?.label,
      rideId: route?.params?.rideId,
    };
    let resp = await cancelRide(sendData);
    if(resp?.status){
      toastFn(resp?.message??"Cancelled ride");
      setConfirmVisible(false);
      // dispatch(setReschedule(false));
      navigation.navigate('MyRide');
    }
    else{
      toastFn(resp?.message??"Failed to cancel ride");
    }
    setLoadStatus({
      ...loadStatus,
      overLapLoading: false,
    });
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    },[])
  )

  useEffect(() => {
    setRideDetail(data?.data);
  },[data?.data]);

  useEffect(() => {
    if((rideDetail?.from?.location?.coordinates?.[1]||rideDetail?.from?.location?.coordinates?.[0])){
      console.log('latitudelatitudestatuspdatedd',rideDetail?.from?.location?.coordinates)
      setChangeMarker(true);
    }
  },[rideDetail?.from?.location?.coordinates])

  const isCompleted = useMemo(()=>{
    return rideDetail?.rideStatus === constantData?.rideStatus.completed;
  },[rideDetail?.rideStatus])

  const isCancelled = useMemo(()=>{
    return rideDetail?.rideStatus === constantData?.rideStatus.cancelled;
  },[rideDetail?.rideStatus])

  const isRideStarted = useMemo(()=>{
    return (rideDetail?.rideStatus === constantData?.rideStatus.started||rideDetail?.rideStatus === constantData?.rideStatus.onTheWay);
  },[rideDetail?.rideStatus])

  const onReschedule = () => {
    // dispatch(setDrop(''));
    // dispatch(setReschedule(true));
    dispatch(setNewRideService({
      ...rideDetail,
      dataFrom: constantData.rideDataFrom.reschedule,
      fromLocation: rideDetail?.from?.addressData,
      toLocation: rideDetail?.to?.addressData,
    }));
    navigation.navigate("OneWayRideScreen");
  }

  const ridePaidSubmit = async() => {
    let sendData = {
      rideId: rideDetail?._id,
      endTripTrigerredKey: rideDetail?.endTripTrigerredKey,
      endTripTrigerred: rideDetail?.endTripTrigerred,
      paymentType: "cash",
    }

    let resp = await ridePaid(sendData);
    if(resp?.status){
      toastFn(resp?.message??"Paid for ride");
      refetch();
    }
    else{
      toastFn(resp?.message??"Try-Again");
    }
  }

  return (
    <Mainview
      isheader={true}
      isscollable={false}
      //   statusbarcontent={'dark'}
      headertitle="My Ride Details"
      horizontalpadding={0}
      onreload={()=>refetch()}
      isrefreshing={isFetching}
      ismainloading={loadStatus.mainLoading}
      isoverlaploader={loadStatus.overLapLoading}
    >
      <ScrollView style={{ flex: 1, paddingHorizontal: windowwidth * 0.05 }}>
        <View style={{ marginTop: 25 }}>
          {/* <View
            style={{
              flex: 1,
              height: windowheight * 0.3,
              zIndex: 999,
              marginBottom: 20,
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <MapView
              style={StyleSheet.absoluteFill}
              customMapStyle={trackDriverMapStyle}
              initialRegion={{
                latitude: 28.6139,
                longitude: 77.209,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              <Marker
                coordinate={{ latitude: 28.6139, longitude: 77.209 }}
                title="Delhi"
                description="You are here"
              />
            </MapView>
          </View> */}

          <GoogleMapView
            viewStyle={{
              flex: 1,
              height: windowheight * 0.3,
              zIndex: 999,
              marginBottom: 20,
              borderRadius: 10,
              overflow: 'hidden',
            }}
            mapViewStyle={StyleSheet.absoluteFill}
            customMapStyle={trackDriverMapStyle}
            imagepinstyle={{ top: "25%" }}
            scopebottom={"2.5%"}
            latitude={rideDetail?.from?.location?.coordinates?.[1]}
            longitude={rideDetail?.from?.location?.coordinates?.[0]}
            changeMarker={changeMarker}
            disableMapChange={true}
          />

          {
            rideDetail?.driverId
              ?
              <DriverCard
                name={rideDetail?.driverDetail?.firstName}
                phone={rideDetail?.driverDetail?.mobileNo}
                profilePic={rideDetail?.driverDetail?.profile ? returnOriginalFile(rideDetail?.driverDetail?.profile) : icons.Man}
                onProfileClick={()=>navigation.navigate('RiderDetail',{rideDetail: rideDetail, rideId: rideDetail?._id})}
                rating={5}
                onWhatsapp={() => openPhone(rideDetail?.driverDetail?.mobileNo??"")}
                onMessage={() => openMessage(rideDetail?.driverDetail?.mobileNo??"")}
                containerStyle={{ marginBottom: 20 }}
                iconWidth={windowwidth * 0.055}
                iconHeight={windowwidth * 0.055}
                status={rideDetail?.rideStatus}
                rightContent={
                  <View>
                    <Images
                      type="image"
                      source={carImages?.[rideDetail?.vehicleBodyType]||icons.Car1}
                      width={windowwidth * 0.3}
                      height={windowwidth * 0.18}
                      style={{
                        borderRadius: 10,
                      }}
                    />
                  </View>
                }
              />
              :
              <>
                <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Text family="GMedium" size="semilarge">No Driver accepted this ride</Text>
                </View>
              </>
          }
          

          <Card containerStyle={style.contentPadding}>
            <DriverCard
              name={formatDayDateTime(new Date(rideDetail?.date))}
              phone={rideDetail?.rideId}
              status={rideDetail?.rideStatus}
              rating={5}
              containerStyle={{ marginBottom: 10 }}
              nameStyle={{
                fontSize: Fontsize.xmedium,
                fontFamily: Fontfamily.GBold,
              }}
              subnameStyle={{ fontSize: Fontsize.xmedium }}
              iconWidth={windowwidth * 0.055}
              iconHeight={windowwidth * 0.055}
              noCard={true}
              LeftContent={
                <View style={{ marginRight: 12 }}>
                  <Images
                    type="image"
                    source={carImages?.[rideDetail?.vehicleBodyType]||carImages.Hatchback}
                    width={windowwidth * 0.16}
                    height={windowwidth * 0.12}
                    style={{
                      borderRadius: 10,
                    }}
                  />
                </View>
              }
            />
            <LocationInputs
              pickupValue={rideDetail?.from?.address}
              dropValue={rideDetail?.to?.address}
              noCard
              inputLabel
              pickupFocus={false}
              dropFocus={false}
              setPickupFocus={() => { }}
              setDropFocus={() => { }}
              goToSearch={() => { }}
              readOnly={true}
              cardStyle={{ width: '80%' }}
              showDrop={(rideDetail?.rideType == constantData.rideType.twoWay) ? false : true}
            />
            <Text
              style={[
                CommonStyle.textGBold,
                {
                  fontSize: Fontsize.medium,
                  position: 'absolute',
                  bottom: 15,
                  right: 20,
                },
              ]}
            >
              {`₹${rideDetail?.estimatedPaymentData?.total}`}
            </Text>
          </Card>

          <Text style={[CommonStyle.textGMedium, { marginBottom: 10 }]}>
            Payment Summary
          </Text>

          <Card containerStyle={{ padding: 15, marginBottom: 10 }}>
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
        (isCancelled || isCompleted)
          ?
          <></>
          :
          (
            isRideStarted
              ?
              <View
                style={{
                  paddingVertical: 20,
                  borderTopColor: theme.lightBorder,
                  borderTopWidth: 1,
                  paddingHorizontal: windowwidth * 0.05,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Button
                  title="Paid for ride"
                  onPress={() => ridePaidSubmit()}
                  buttonStyle={{
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: Colors.primary,
                    width: '48%',
                  }}
                  textStyle={{ fontSize: Fontsize.semilarge, color: Colors.primary }}
                />
              </View>
              :
              <View
                style={{
                  paddingVertical: 20,
                  borderTopColor: theme.lightBorder,
                  borderTopWidth: 1,
                  paddingHorizontal: windowwidth * 0.05,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Button
                  title="Cancel"
                  onPress={() => setCancelVisible(true)}
                  buttonStyle={{
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: Colors.primary,
                    width: '48%',
                  }}
                  textStyle={{ fontSize: Fontsize.semilarge, color: Colors.primary }}
                />
                <Button
                  title="Reschedule"
                  onPress={() => {
                    onReschedule();
                  }}
                  buttonStyle={{ width: '48%' }}
                  textStyle={{ fontSize: Fontsize.semilarge }}
                />
              </View>
          )

      }

      <CancelReasonModal
        visible={cancelVisible}
        setCancelVisible={setCancelVisible}
        selected={selected?.id}
        setSelected={setSelected}
        setConfirmVisible={setConfirmVisible}
      />
      
      <ConfirmCancelModal
        confirmVisible={confirmVisible}
        setConfirmVisible={setConfirmVisible}
        confirmCancel={confirmCancel}
        cancelReason={selected?.label}
      />

    </Mainview>
  );
};

export default RideDetail;

const styles = (theme: any) =>
  StyleSheet.create({
    contentPadding: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginBottom: 20,
    },
  });
