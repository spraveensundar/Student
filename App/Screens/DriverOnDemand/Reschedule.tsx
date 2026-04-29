import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Text,
  ScrollView,
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
import CardDetailCard from './Components/CarDetailCard';
import { dateToDateYearTime, numberChange, toastFn } from '../../Common/commonFunction';
import { useDispatch, useSelector } from 'react-redux';
import { constantData } from '../../Common/constant';
import { removeNewRideService, setNewRideService } from '../../Common/redux/serviceReducer';
import { rescheduleRide } from '../../Common/axiosHooks/rideServiceHooks';

const Reschedule: React.FC = () => {


  const newRideService = useSelector((state: any) => state?.serviceData?.newRideService);
  const dispatch = useDispatch();


  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);


  const [dateVisible, setDateVisible] = useState(false);


  const onChange = (value: string | number, id: string) => {
    let setData = {
      [id]: value,
    };
    dispatch(
      setNewRideService({
        ...setData
      })
    )
  }

  const getSelectedTime = () => {
    return (newRideService?.date?new Date(newRideService?.date).getTime():new Date().getTime())
  }

  console.log('newRideServicenewRideService',newRideService)


  const onReschedule = async() => {
    let sendData = {
      rideId: newRideService?._id,
      time: String(newRideService?.time),
      fromAddress: newRideService?.fromLocation?.address,
      fromLatLng: JSON.stringify([newRideService?.fromLocation?.latitude, newRideService?.fromLocation?.longitude]),
      fromAddressData: newRideService?.fromLocation,
      toAddress: newRideService?.toLocation?.address,
      toLatLng: JSON.stringify([newRideService?.toLocation?.latitude, newRideService?.toLocation?.longitude]),
      toAddressData: newRideService?.toLocation,
      date: new Date(newRideService?.date).toISOString(),
    }
    let resp = await rescheduleRide(sendData);
    if(resp?.status){
      toastFn(resp?.message??"Rescheduled successfully");
      navigation.goBack();
      navigation.goBack();
      navigation.goBack();
      dispatch(removeNewRideService());
    }
    else{
      toastFn(resp?.message??"Failed to reschedule")
    }
  }

  return (
    <Mainview
      isheader={true}
      isscollable={false}
      //   statusbarcontent={'dark'}
      headertitle="Rescheduled Booking"
      // horizontalpadding={0}
    >
      <ScrollView style={style.container}>
        <Text style={[CommonStyle.textGMedium, { marginBottom: 10 }]}>
          Car details
        </Text>
        <CardDetailCard
          name="Maruthi Suzuki Baleno"
          status="TN55BV4646"
          containerStyle={{ marginBottom: 20 }}
        />
        <SelectDateTime
          selectedDate={dateToDateYearTime(getSelectedTime())}
          onPressDate={() => {
            setDateVisible(true);
          }}
          containerStyle={{
            paddingBottom: 20,
            marginBottom: 20,
          }}
          {...(newRideService?.rideType === constantData.rideType.outStation ?
            {
              enableTimeDurationPicker: false,
              enableDateDurationPicker: true,
              selectedDays: newRideService?.time,
              onSelectDays: (value) => onChange(value, "time")
            } :
            {
              selectedHours: newRideService?.time,
              onSelectHour: (value) => onChange(value, "time")
            }
          )}
          onSelectDays={(value)=>onChange(value,"time")}
          selectedDays={numberChange(newRideService?.time)}
          onSelectHour={(value)=>onChange(value,"time")}
          selectedHours={numberChange(newRideService?.time)}
        />
      </ScrollView>
      <View style={[{ marginBottom: 12 }]}>
        <Button
          title="Confirm Reschedule"
          onPress={() => {
            onReschedule();
          }}
          textStyle={{ fontSize: Fontsize.medium }}
        />
      </View>

      <WheelPickerModal
        visible={dateVisible}
        setVisible={setDateVisible}
        selectedTime={getSelectedTime()}
        onConfirmTiming={(selected)=>onChange(selected,"date")}
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

export default Reschedule;
