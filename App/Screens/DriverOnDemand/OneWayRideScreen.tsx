import React, { use, useCallback, useEffect, useMemo, useState } from 'react';
import { View, TextInput, StyleSheet, Keyboard, BackHandler } from 'react-native';
import Mainview from '../../Components/mainview';
import { Colors, Fontsize } from '../../Utilities/uiasset';
import useCustomHooks from '../../Actions/Hooks/customhook';
import CommonStyles from '../../Utilities/fontStyle';
import { Button } from '../../Components/Field';
import { RFvalue, windowwidth } from '../../Utilities/dimensions';
import VectorIcons from '../../Utilities/vectorIcons';
import { useAppDispatch, useAppSelector } from '../../Store/reduxHooks';
import LocationInputs from './Components/LocationInput';
import { getHeaderTitle } from './Components/ServiceHeaderTitle';
import { setServiceType } from '../../Store/Slices/LocationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { constantData } from '../../Common/constant';
import { useFocusEffect } from '@react-navigation/native';
import { removeNewRideService } from '../../Common/redux/serviceReducer';
import { confirmAlert } from '../../Common/commonFunction';

const OneWayRideScreen: React.FC = () => {


  const dispatch = useDispatch();
  const newRideService = useSelector((state: any) => state?.serviceData?.newRideService)
  
  
  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);


  const [pickupFocus, setPickupFocus] = useState(false);
  const [dropFocus, setDropFocus] = useState(false);
  const [lastFocused, setLastFocused] = useState<'pickup' | 'drop' | null>(null);


  const pickup = newRideService?.fromLocation?.address;
  const drop = newRideService?.toLocation?.address;

  const goToSearch = (locationType: 'pickup' | 'drop') => {
    console.log('locationTypelocationType',locationType,pickup)
    if (locationType === constantData.lastFocused.drop && !pickup) {
      console.log('Pickup first');
      return;
    }
    navigation.navigate('SearchLocation', { locationType });
  };

  useFocusEffect(
    useCallback(()=>{
      return () => {
        setPickupFocus(false);
        setDropFocus(false);
      }
    },[])
  )

  const handleBack = () => {
    console.log('newRideServicenewRideService', )
    if (newRideService?.dataFrom == constantData.rideDataFrom.reschedule) {
      confirmAlert(
        "If you go back, the data you have updated will be cleared",
        () => {
          dispatch(
            removeNewRideService()
          );
          navigation.goBack();
        },
        () => { }
      )
    }
    else {
      navigation.goBack();
    }
  }

  useEffect(() => {

    const backAction = () => {
      handleBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove()
    };

  }, [newRideService?.dataFrom])

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

  const reschedule = useMemo(() => {
    return (newRideService?.dataFrom == constantData.rideDataFrom.reschedule);
  }, [newRideService?.dataFrom])

  const onConfirm = () => {
    if (reschedule) {
      navigation.navigate('Reschedule');
    }
    else {
      navigation.navigate('CustomerDetail');
    }
  }

  console.log('newRideServicenewRideService',pickupFocus,dropFocus)

  return (
    <Mainview
      isheader={true}
      isscollable={false}
      headertitle={getHeaderTitle(newRideService?.rideType)}
    >
      <View style={style.container}>
        <LocationInputs
          pickupFocus={pickupFocus}
          dropFocus={dropFocus}
          setPickupFocus={setPickupFocus}
          setDropFocus={setDropFocus}
          // goToSearch={goToSearch}
          goToSearch={()=>{}}
          // pickupValue={newRideService?.from?.address}
          showDrop={newRideService?.rideType == constantData.rideType.twoWay ? false : true}
          setLastFocused={setLastFocused}
        />
        <View style={{flexDirection: "column",gap: 14}}>

          {
            pickup && drop
              ?
              <Button
                title="Confirm Location"
                onPress={() => onConfirm()}
                textStyle={{ fontSize: Fontsize.medium, }}
              />
              :
              <></>
          }

          {
            (lastFocused)
              ?
              <Button
                title="Search location"
                onPress={() => searchLocation()}
                textStyle={{ fontSize: Fontsize.medium, }}
              />
              :
              <></>
          }

        <Button
          title="Locate on live location"
          onPress={() => {
            navigation.navigate('DriverOnDemand', { fromScreen: 'oneWay' });
          }}
          textStyle={{ fontSize: Fontsize.medium }}
        />
        </View>
      </View>
    </Mainview>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      marginBottom: 20,
      justifyContent: 'space-between',
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
  });

export default OneWayRideScreen;
