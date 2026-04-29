import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Mainview from '../../Components/mainview';
import useCustomHooks from '../../Actions/Hooks/customhook';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Fontfamily, Fontsize } from '../../Utilities/uiasset';
import VectorIcons from '../../Utilities/vectorIcons';
import { windowwidth } from '../../Utilities/dimensions';
import CommonStyles from '../../Utilities/fontStyle';
import { Shadow } from 'react-native-shadow-2';
import MapView, { Marker } from 'react-native-maps';
import ServiceType from './Components/ServiceType';
import DropLocation from './Components/DropLocation';
import TrackDriver from './Components/TrackDriver';
import ChooseServiceModal from './Components/ChooseServiceModal';
import { lightMapStyle } from '../../Utilities/CustomMapStyle';
import { getHeaderTitle } from './Components/ServiceHeaderTitle';
import { useAppDispatch, useAppSelector } from '../../Store/reduxHooks';
import { setReschedule } from '../../Store/Slices/LocationSlice';
import { GoogleMapView } from '../../Components/Field/Map/GoogleMapView';
import { getItem } from '../../Common/localStorage';
import { constantData } from '../../Common/constant';
import { useDispatch, useSelector } from 'react-redux';
import { removeNewRideService, setNewRideService } from '../../Common/redux/serviceReducer';
import { fetchLocationDetail } from '../../Common/axiosHooks/userHooks';
import { confirmAlert, isEmpty, numberChange, toastFn } from '../../Common/commonFunction';
import { icons } from '../../Utilities/images';

interface PageTypeProps {
  fromScreen: string;
}

const DriverOnDemand: React.FC = () => {


  const newRideService = useSelector((state: any) => state?.serviceData?.newRideService)
  const dispatch = useDispatch();


  const route = useRoute();
  const { fromScreen } = (route.params ?? {}) as PageTypeProps;



  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);
  
  
  const [formData, setFormData] = useState<any>({})
  const [visible, setVisible] = useState(false);
  const [ isUpdatingLocation, setIsUpdatingLocation ] = useState(false);
  const [ changeMarker, setChangeMarker ] = useState(false);
  

  const formalHeader = fromScreen === 'oneWay' || fromScreen === 'riderDetail';

  const renderSection = () => {
    if (fromScreen === 'oneWay') return <DropLocation />;
    if (fromScreen === 'riderDetail') return <TrackDriver />;
    return <ServiceType />;
  };

  // useEffect(() => {
  //   dispatch(setReschedule(false));
  // }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('heyyyyyy', getItem(constantData.currentAddress),newRideService?.fromLocation?.latitude || newRideService?.fromLocation?.longitude)

      let setData = {};
      if(newRideService?.fromLocation?.latitude || newRideService?.fromLocation?.longitude || newRideService?.toLocation?.latitude || newRideService?.toLocation?.longitude){
        
        
        if(fromScreen === 'oneWay'){
          if (newRideService?.rideType == constantData.rideType.outStation) {
            if(newRideService?.lastFocused == constantData.lastFocused.drop){
              setData = {
                ...newRideService?.toLocation,
              };
            }
            else{
              setData = {
                ...newRideService?.fromLocation,
              };
            }
          }
          else {
            if(newRideService?.lastFocused == constantData.lastFocused.drop){
              setData = {
                ...newRideService?.toLocation,
              };
            }
            else{
              setData = {
                ...newRideService?.fromLocation,
              };
            }
          }
        }
        else{
          if(fromScreen === 'riderDetail'){
            setData = {
              ...newRideService?.fromLocation,
            }
          }
        }
        // setFormData({
        //   city: currentAddressData?.city,
        //   country: currentAddressData?.country,
        //   latitude: currentAddressData?.location?.[0],
        //   longitude: currentAddressData?.location?.[1],
        //   address: currentAddressData?.fullAddress,
        //   addressData: currentAddressData?.addressData,
        // })
      }
      else {
        let currentAddressData: any = getItem(constantData.currentAddress)
        setData = {
          city: currentAddressData?.city,
          country: currentAddressData?.country,
          latitude: currentAddressData?.location?.[0],
          longitude: currentAddressData?.location?.[1],
          address: currentAddressData?.fullAddress,
          addressData: currentAddressData?.addressData,
        }
        
      }
      setFormData({...setData});
      updateMarker()
      return () => {
        setFormData({});
        setChangeMarker(false);
      }
    }, [])
  )

  const updateMarker = () => {
    setChangeMarker(true);
    setTimeout(()=>{
      setChangeMarker(false);
    },10)
  }

  
  useFocusEffect(
    useCallback(() => {

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
    }, [newRideService,fromScreen])
  )
  
  console.log('newRideServicenewRideServiceoutt',newRideService)

  const handleBack = () => {
    console.log('newRideServicenewRideService',fromScreen,console.log((!isEmpty(newRideService) && !formalHeader)),isEmpty(fromScreen))
    if (!isEmpty(newRideService) && !formalHeader) {
      confirmAlert(
        "If you go back, the data you entered will be cleared",
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
      if (isEmpty(fromScreen)) {
        dispatch(
          removeNewRideService()
        );
      }
      navigation.goBack();
    }
  }

  const updateLocationData = async (lat: number, lng: number,markerStatus: boolean) => {
    

    let currentAddressData: any = getItem(constantData.currentAddress)
    // lat = numberChange(lat,7);
    // lng = numberChange(lng,7);
    // let currentAddressLatitude= numberChange(currentAddressData?.location?.[0],7), currentAddressLongitude= numberChange(currentAddressData?.location?.[1],7);
    let currentAddressLatitude= numberChange(currentAddressData?.location?.[0]), currentAddressLongitude= numberChange(currentAddressData?.location?.[1]);
    console.log('latttttt', lat, currentAddressLatitude,lat !== currentAddressLatitude, typeof(lat), typeof(currentAddressLatitude), lng, currentAddressLongitude, lng != currentAddressLongitude,typeof(lng), typeof(currentAddressLongitude),( currentAddressLatitude != lat || currentAddressLongitude != lng ))
    if ( (lat || lng ) && ( currentAddressLatitude != lat || currentAddressLongitude != lng ) && !isUpdatingLocation) {

      setIsUpdatingLocation(true);
      let sendData = {
        latitude: String(lat),
        longitude: String(lng),
      }
      let resp = await fetchLocationDetail(sendData);
      console.log('respresp', resp)
      if (resp?.status) {
        let addressData = resp?.data?.addressData;
        // let setData = {
        //     lat: lat,
        //     lng: lng,
        //     address: resp?.data?.address,
        //     addressData: resp?.data?.addressData,
        // }
        let setData = {
          ...formData,
          city: addressData?.city,
          state: addressData?.state,
          country: addressData?.country,

          address: resp?.data?.address,
          latitude: lat,
          longitude: lng,
          addressData: addressData,
        }
        setFormData({ ...setData });

        if (fromScreen === 'oneWay' || isEmpty(fromScreen)) {
          if (newRideService?.rideType == constantData.rideType.outStation) {
            dispatch(setNewRideService({
              ...{ fromLocation: { ...setData } },
            }));
          }
          else {
            if (fromScreen === 'oneWay') {
              dispatch(setNewRideService({
                ...{ toLocation: { ...setData } },
              }));
            }
            else {
              dispatch(setNewRideService({
                ...{ fromLocation: { ...setData } },
              }));
            }
          }
        }
        
      }
      else {
        toastFn(`Cannot fetch live location detail, lat: ${lat},lng: ${lng}`)
      }
      setChangeMarker(markerStatus?true:false);
      setIsUpdatingLocation(false);
    }
  }

  console.log('formDataformData',formData)

  return (
    <Mainview
      isheader={formalHeader ? true : false}
      headertitle={
        // "Driver On Demand"
        fromScreen === 'oneWay'
          ? getHeaderTitle(newRideService?.rideType)
          : fromScreen === 'riderDetail'
          ? 'Track Order'
          : ''
      }
      statusbarcolor={formalHeader ? theme.background : Colors.navyBlue}
      statusbarcontent={formalHeader ? 'dark' : 'light'}
      horizontalpadding={0}
      customheader={
        formalHeader ? null : (
          <>
            <View
              style={{
                backgroundColor: Colors.navyBlue,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: windowwidth * 0.05,
                paddingVertical: 25,
              }}
            >
              <Pressable
                onPress={() => {
                  handleBack();
                }}
              >
                <VectorIcons
                  family="Ionicons"
                  name="chevron-back"
                  iconcolor={Colors.white}
                />
              </Pressable>
              <Text
                style={{
                  fontFamily: Fontfamily.bold,
                  fontSize: Fontsize.semilarge,
                  color: Colors.white,
                }}
              >
                Driver On Demand
              </Text>
              <Pressable
                onPress={() => {
                  setVisible(true);
                }}
              >
                <VectorIcons
                  family="FontAwesome"
                  name="navicon"
                  iconcolor={Colors.white}
                />
              </Pressable>
            </View>
            <Shadow
              distance={4}
              startColor={'#00000020'}
              offset={[0, 1]}
              style={{ width: '100%' }}
            >
              <View
                style={[
                  CommonStyle.flexRow,
                  {
                    // width: '100%',
                    paddingVertical: 10,
                    paddingHorizontal: windowwidth * 0.05,
                    backgroundColor: Colors.white,
                  },
                ]}
              >
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderWidth: 4,
                    borderColor: Colors.lightGreen,
                    backgroundColor: Colors.white,
                    borderRadius: 50,
                    marginRight: 10,
                    marginTop: -3,
                  }}
                ></View>
                <Text
                  style={[
                    CommonStyle.textGMedium,
                    { fontSize: Fontsize.medium, color: theme.grayText },
                  ]}
                >
                  {formData?.address?formData?.address:"No location selected"}
                  {/* Delhi cantt raiway junction, Delhi */}
                </Text>
              </View>
            </Shadow>
          </>
        )
      }
    >
      {/* <View style={{ flex: 1, height: 400, zIndex: 999 }}>
        <MapView
          style={StyleSheet.absoluteFill}
          customMapStyle={lightMapStyle}
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

        {renderSection()}
      </View> */}


      <GoogleMapView
        viewStyle={{ flex: 1 }}
        mapViewStyle={{ height: "60%" }}
        customMapStyle={lightMapStyle}
        imagepinstyle={{top:"25%"}}
        scopebottom={"2.5%"}
        latitude={formData?.latitude}
        longitude={formData?.longitude}
        onRegionChangeComplete={(lat, lng)=>updateLocationData(lat, lng, false)}
        changeMarker={changeMarker}
        curveStart={newRideService?.dataFrom==constantData.rideDataFrom.riderDetail?{latitude: newRideService?.fromLocation?.latitude, longitude: newRideService?.fromLocation?.longitude}:undefined}
        curveEnd={newRideService?.dataFrom==constantData.rideDataFrom.riderDetail?{latitude: newRideService?.toLocation?.latitude, longitude: newRideService?.toLocation?.longitude}:undefined}
        showRouteAlone = {newRideService?.dataFrom==constantData.rideDataFrom.riderDetail?true:false}
        // startPointImage={icons.Car}
        endPointImage={icons.Mappin}
      />

        {renderSection()}


      <ChooseServiceModal visible={visible} setVisible={setVisible} />
    </Mainview>
  );
};

export default DriverOnDemand;

const styles = (theme: any) => StyleSheet.create({});
