import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Text,
  ScrollView,
  BackHandler,
} from 'react-native';
import Mainview from '../../Components/mainview';
import { Colors, Fontsize } from '../../Utilities/uiasset';
import useCustomHooks from '../../Actions/Hooks/customhook';
import CommonStyles from '../../Utilities/fontStyle';
import { Button } from '../../Components/Field';
import { RFvalue, windowwidth } from '../../Utilities/dimensions';
import VectorIcons from '../../Utilities/vectorIcons';
import { useAppDispatch, useAppSelector } from '../../Store/reduxHooks';
import LocationInputs from './Components/LocationInput';
import SelectDateTime from './Components/SelectDateTime';
import WheelPickerModal from '../../Components/WheelPickerModal';
import SelectOptionRow from './Components/SelectOption';
import Card from '../../Components/Card';
import CarTypeModal from './Components/CarTypeModal';
import PaymentModal from './Components/PaymentModal';
import RowInfo from '../../Components/RowInfo';
import { getHeaderTitle } from './Components/ServiceHeaderTitle';
import { useDispatch, useSelector } from 'react-redux';
import { removeNewRideService, setNewRideService } from '../../Common/redux/serviceReducer';
import { useFocusEffect } from '@react-navigation/native';
import { capitalizeFirstLetter, confirmAlert, dateToDateTime, dateToDateYearTime, numberChange, roundToNext, toastFn } from '../../Common/commonFunction';
import { constantData } from '../../Common/constant';
import { useGetFeesQuery } from '../../Common/redux/userHook';
import { createRide } from '../../Common/axiosHooks/rideServiceHooks';

const RequestDriver: React.FC = () => {


  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);

  
  const dispatch = useDispatch();
  const newRideService = useSelector((state: any) => state?.serviceData?.newRideService);
  const feesData = useGetFeesQuery({});


  const [pickupFocus, setPickupFocus] = useState(false);
  const [dropFocus, setDropFocus] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [carTypeVisible, setCarTypeVisible] = useState(false);
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [ disableStatus, setDisableStatus ] = useState(false);
  const [paymentData, setPaymentData] = useState({
    feesData: {},
    gstPercent: 0,
    gstPrice: 0,
    paymentFee: 0,
    paymentFeePercent: 0,
    platformFeePercent: 0,
    platformFeePrice: 0,
    rideCost: 0,
    ridePerTimeCost: 0,
    total: 0,
    withoutPaymentFeeTotal: 0,
  });
  const [lastFocused, setLastFocused] = useState<'pickup' | 'drop' | null>(null);
  

  const feesDetail = feesData?.data?.data;
  const pickup = newRideService?.fromLocation?.address;
  const drop = newRideService?.toLocation?.address;

  const goToSearch = (locationType: 'pickup' | 'drop') => {
    if (locationType === 'drop' && !pickup) {
      console.log('Pickup first');
      return;
    }
    onChange(true,"fromRequestDriver");
    navigation.navigate('SearchLocation', { locationType });
  };

  useFocusEffect(
    useCallback(()=>{
      if(
        !newRideService?.startTime ||
        !newRideService?.time ||
        !newRideService?.paymentType ||
        !newRideService?.vehicleBodyType ||
        !newRideService?.vehicleTransmissionType
      ){
        let startTime = newRideService?.startTime??new Date(new Date().setHours(new Date().getHours(),roundToNext(new Date().getMinutes(),5))).getTime();
        dispatch(
          setNewRideService({
            ...{
              startTime: newRideService?.startTime??startTime,
              time: (newRideService?.time??(newRideService?.rideType === constantData.rideType.outStation?1:2)),
              paymentType: (newRideService?.paymentType??constantData.paymentType.cash),
              date: newRideService?.date??startTime,
              vehicleBodyType: newRideService?.vehicleBodyType??"Hatchback",
              vehicleTransmissionType: newRideService?.vehicleBodyType??"Manual",
              // startTime: (newRideService?.startTime??new Date().getTime()),
              // startTime: (newRideService?.startTime??new Date().getTime()),
            }
          })
        )
      }
      feesData?.refetch();
    },[])
  )

  useFocusEffect(
    useCallback(()=>{
      let currentFees = feesData?.data?.data;
      console.log('currentRideFees',currentFees,feesData)
      let ridePerTimeCost = numberChange( (newRideService?.rideType === constantData.rideType.outStation) ? currentFees?.rideServiceFees?.perHourCost : currentFees?.rideServiceFees?.perHourCost);
      let rideCost = ridePerTimeCost * numberChange(newRideService?.time);
      let gstPercent = numberChange(currentFees?.gst);
      let gstPrice = numberChange(((rideCost * gstPercent)/100),2);
      let platformFeePercent = numberChange(currentFees?.platformFees);
      let platformFeePrice = numberChange(((rideCost * platformFeePercent)/100),2);
      let withoutPaymentFeeTotal = rideCost + gstPrice + platformFeePrice;
      let paymentFeePercent = numberChange(currentFees?.razorpayFee);
      let paymentFee = numberChange(((withoutPaymentFeeTotal * paymentFeePercent) / 100),2);
      let total = withoutPaymentFeeTotal + paymentFee;

      let setData = {
        feesData: currentFees,

        ridePerTimeCost: ridePerTimeCost,
        rideCost: rideCost,
        gstPercent: gstPercent,
        gstPrice: gstPrice,
        platformFeePercent: platformFeePercent,
        platformFeePrice: platformFeePrice,
        withoutPaymentFeeTotal: withoutPaymentFeeTotal,
        paymentFeePercent: paymentFeePercent,
        paymentFee: paymentFee,
        total: total,
      }
      setPaymentData({...setData})
    },[feesData?.data,newRideService?.time])
  );

  const getSelectedTime = () => {
    return (newRideService?.date?new Date(newRideService?.date).getTime():new Date().getTime())
  }

  const getPaymentTypeIcon = () => {
    if(newRideService?.paymentType == constantData.paymentType.cash){
      return "Cash"
    }
    return "Googlepay"
  }
  
  const onChange = (value: string|number|boolean, id: string) => {
    let setData = {
      [id]: value,
    };
    dispatch(
      setNewRideService({
        ...setData
      })
    )
  }

  console.log('newRideServicenewRideService',feesDetail,paymentData,newRideService)

  const onSubmit = () => {

    confirmAlert(
      "Do you want create ride once confirmed you can not edit datas",
      () => {
        submitFunc()
      },
      () => { }
    );

    const submitFunc = async () => {
      setDisableStatus(true);
      let sendData = {
        rideType: newRideService?.rideType,
        customerName: newRideService?.customerName,
        time: String(newRideService?.time),
        fromAddress: newRideService?.fromLocation?.address,
        fromLatLng: JSON.stringify([newRideService?.fromLocation?.latitude,newRideService?.fromLocation?.longitude]),
        fromAddressData: newRideService?.fromLocation,
        toAddress: newRideService?.toLocation?.address,
        toLatLng: JSON.stringify([newRideService?.toLocation?.latitude,newRideService?.toLocation?.longitude]),
        toAddressData: newRideService?.toLocation,
        date: new Date(newRideService?.date).toISOString(),
        registrationNo: newRideService?.registrationNo,
        vehicleBodyType: newRideService?.vehicleBodyType,
        vehicleTransmissionType: newRideService?.vehicleTransmissionType,
        acceptTermsConditions: newRideService?.acceptTermsConditions,
        notes: newRideService?.notes,
      }

      let resp = await createRide(sendData);
      if (resp?.status) {
        navigation.navigate('BookingSuccess',{rideDetail: resp?.data});
        dispatch(
          removeNewRideService()
        );
      }
      else {
        toastFn(resp?.message ?? "Try-Again");
      }
      setDisableStatus(false);
    }
  }

  const searchLocation = () => {
    if (lastFocused) {
      if (pickup) {
        goToSearch(lastFocused);
      }
      else {
        goToSearch(lastFocused);
      }
    }
  }

  const handleBack = () => {
    onChange(false,"fromRequestDriver");
    navigation.goBack();
  }

  useEffect(() => {
    const backAction = () => {
      handleBack();
      return true;
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove()
    };
  }, [newRideService]);

  return (
    <Mainview
      isheader={true}
      isscollable={false}
      //   statusbarcontent={'dark'}
      headertitle={getHeaderTitle(newRideService?.rideType)}
      horizontalpadding={0}
      isoverlaploader={disableStatus}
      onleftfn={()=>handleBack()}
    >
      <ScrollView style={style.container}>
        <LocationInputs
          noCard={true}
          headTitle="Trip details"
          inputLabel={true}
          pickupFocus={pickupFocus}
          dropFocus={dropFocus}
          setPickupFocus={setPickupFocus}
          setDropFocus={setDropFocus}
          showDrop={newRideService?.rideType == constantData.rideType.twoWay ? false : true}
          goToSearch={goToSearch}
          // goToSearch={()=>{}}
          cardStyle={{
            borderBottomWidth: 1,
            borderBottomColor: theme.lightBorder,
            paddingHorizontal: windowwidth * 0.05,
            paddingBottom: 10,
            marginBottom: 15,
          }}
          setLastFocused={setLastFocused}
        />

        <SelectDateTime
          selectedDate={dateToDateYearTime(getSelectedTime())}
          onPressDate={() => {
            setDateVisible(true);
          }}
          containerStyle={{
            paddingHorizontal: windowwidth * 0.05,
            borderBottomWidth: 1,
            paddingBottom: 20,
            borderBottomColor: theme.lightBorder,
            marginBottom: 20,
          }}
          {...(newRideService?.rideType === constantData.rideType.outStation ?
            {
              enableTimeDurationPicker: false,
              enableDateDurationPicker: true,
              selectedDays: newRideService?.time,
              onSelectDays: (value)=>onChange(value,"time")
            } :
            {
              selectedHours: newRideService?.time,
              onSelectHour: (value)=>onChange(value,"time")
            }
          )}
          onSelectDays={(value)=>onChange(value,"time")}
          selectedDays={newRideService?.time}
          onSelectHour={(value)=>onChange(value,"time")}
          selectedHours={newRideService?.time}
        />

        <View
          style={[
            CommonStyle.flexRow,
            {
              paddingHorizontal: windowwidth * 0.05,
              justifyContent: 'space-between',
              marginBottom: 20,
            },
          ]}
        >
          <SelectOptionRow
            title="Car Type"
            value={newRideService?.vehicleBodyType}
            onPress={() => {
              setCarTypeVisible(true);
            }}
            iconName="Caricon"
            iconWidth={20}
            iconHeight={20}
            cardStyle={{ width: windowwidth * 0.42 }}
          />

          <SelectOptionRow
            title="Payment mode"
            value={capitalizeFirstLetter(newRideService?.paymentType?String(newRideService?.paymentType):"")}
            onPress={() => setPaymentVisible(true)}
            iconName={getPaymentTypeIcon()}
            iconWidth={30}
            iconHeight={15}
            cardStyle={{ width: windowwidth * 0.42 }}
          />
        </View>

        <View style={style.screenPadding}>
          <Text
            style={[
              CommonStyle.textGMedium,
              {
                fontSize: Fontsize.xxmedium,
                color: theme.primarytext,
                marginBottom: 10,
              },
            ]}
          >
            Payment Summary
          </Text>

          <Card containerStyle={{ borderWidth: 0, padding: 15, marginBottom: windowwidth * 0.02 }}>
            <RowInfo
              Key="Item Total"
              value={`₹${paymentData?.rideCost}`}
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
              Key={`Platform Fee(${paymentData?.platformFeePercent}%)`}
              value={`₹${paymentData?.platformFeePrice}`}
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
              Key={`GST(${paymentData?.gstPercent}%)`}
              value={`₹${paymentData?.gstPrice}`}
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
              Key={`Payment gateway fee(${paymentData?.paymentFeePercent}%)`}
              value={`₹${paymentData?.paymentFee}`}
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
              Key="Total"
              value={`₹${paymentData?.total}`}
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
          </Card>
          <RowInfo
            Key="Total"
            value={`₹${299 + 4 + 48}`}
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
      </ScrollView>
      <View style={[style.screenPadding, { marginBottom: 12 }]}>
        <Button
          title="Request Driver"
          onPress={() => {
            onSubmit()
          }}
          textStyle={{ fontSize: Fontsize.medium }}
          disabled={disableStatus}
        />
      </View>

      <WheelPickerModal
        visible={dateVisible}
        setVisible={setDateVisible}
        selectedTime={getSelectedTime()}
        onConfirmTiming={(selected)=>onChange(selected,"date")}
      />
      <CarTypeModal
        visible={carTypeVisible}
        setVisible={setCarTypeVisible}
        onSubmit={(selectedCar,selectedTransmission)=>dispatch(setNewRideService({vehicleBodyType:selectedCar,vehicleTransmissionType:selectedTransmission}))}
      />
      <PaymentModal
        visible={paymentVisible}
        setPaymentVisible={setPaymentVisible}
        selected={newRideService?.paymentType}
        setSelected={(value)=>onChange(value,"paymentType")}
      />
    </Mainview>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      marginBottom: 20,
    },
    screenPadding: {
      paddingHorizontal: windowwidth * 0.05,
    },
    locationCard: {
      backgroundColor: theme.background,
      borderRadius: 10,
      padding: 15,
      paddingRight: 0,
      shadowColor: theme.darktext,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    dotContainer: { width: 20, alignItems: 'center', paddingVertical: 3 },
    pickupDot: {
      width: 20,
      height: 20,
      borderRadius: 50,
      borderWidth: 6,
      borderColor: Colors.lightGreen,
    },
    line: { width: 2, flex: 1, backgroundColor: theme.grayText },
    dropDot: {
      width: 16,
      height: 16,
      borderRadius: 50,
      backgroundColor: Colors.red,
      borderWidth: 3,
      borderColor: 'white',
      marginBottom: 5,
      outlineWidth: 2,
      outlineColor: Colors.red,
    },
    inputContainer: { flex: 1, paddingLeft: 15 },
    input: {
      height: 42,
      lineHeight: RFvalue(15),
      borderBottomWidth: 1,
      borderBottomColor: theme.lightBorder,
    },
    dotRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    row: {
      flexDirection: 'row',
      gap: 15,
      marginTop: 25,
    },
    sectionText: {
      fontSize: Fontsize.small,
      fontWeight: '600',
      marginBottom: 10,
    },
    dropdownBtn: {
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.lightBorder,
    },
    dropdownText: {
      fontSize: Fontsize.medium,
    },
    summaryBox: {
      backgroundColor: theme.lightBG,
      padding: 15,
      borderRadius: 12,
      marginTop: 10,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 4,
    },
    requestBtn: {
      backgroundColor: Colors.navyBlue,
      paddingVertical: 15,
      borderRadius: 25,
      marginTop: 25,
      alignItems: 'center',
    },
    requestBtnText: {
      color: Colors.white,
      fontSize: Fontsize.medium,
      fontWeight: '600',
    },
  });

export default RequestDriver;
