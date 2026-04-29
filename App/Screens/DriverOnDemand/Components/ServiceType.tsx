import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors, Fontsize } from '../../../Utilities/uiasset';
import VectorIcons from '../../../Utilities/vectorIcons';
import { RFvalue, windowwidth } from '../../../Utilities/dimensions';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import CommonStyles from '../../../Utilities/fontStyle';
import Images, { icons } from '../../../Utilities/images';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';
import WheelPickerModal from '../../../Components/WheelPickerModal';
import { useAppDispatch, useAppSelector } from '../../../Store/reduxHooks';
import {
  ServiceTypes,
  setServiceType,
} from '../../../Store/Slices/LocationSlice';
import { getHeaderTitle } from './ServiceHeaderTitle';
import { useDispatch, useSelector } from 'react-redux';
import { constantData } from '../../../Common/constant';
import { setNewRideService } from '../../../Common/redux/serviceReducer';

interface ServiceTypeprops {}

const ServiceType: React.FC<ServiceTypeprops> = () => {


  const newRideService = useSelector((state: any) => state?.serviceData?.newRideService)
  const dispatch = useDispatch();


  const route = useRoute();
  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);
  
  
  const bottomsheetref = useRef<BottomSheet>(null);
  // const [activeTab, setActiveTab] = useState(constantData.rideType.single);
  const [visible, setVisible] = useState(false);


  const selectedService = useAppSelector(
    state => state?.locationSlice?.selectedService,
  );

  const tabs = [
    {
      id: constantData.rideType.single,
      label: 'One way',
      icon: icons.Oneway,
      size: windowwidth * 0.18,
    },
    {
      id: constantData.rideType.twoWay,
      label: 'Round trip',
      icon: icons.Refresh,
      size: windowwidth * 0.18,
    },
    {
      id: constantData.rideType.outStation,
      label: 'Outstation',
      icon: icons.Driver,
      size: windowwidth * 0.2,
    },
  ];

  const bookdriver = [
    'Select from options like Hourly, One-way, Outstation, or Full Day.',
    'Add your pickup location, destination, date, and time of travel.',
    'Check fare details, available drivers, and confirm your booking.',
    "You'll receive your driver's name, contact number, and ETA instantly.",
  ];

  useEffect(() => {
    bottomsheetref.current?.expand;
  }, []);

  const OneWay = () => (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'relative' }}>
        <VectorIcons
          family="Feather"
          name="search"
          iconcolor={theme.secondarytext}
          size={16}
          style={{ position: 'absolute', top: 14, left: 12, zIndex: 1 }}
        />
        <Pressable onPress={() => navigation.navigate('OneWayRideScreen')}>
          <View pointerEvents="none">
            <TextInput
              style={[CommonStyle.textGRegular, style.inputBox]}
              placeholder="Where to?"
              placeholderTextColor={theme.secondarytext}
            />
          </View>
        </Pressable>
        <Pressable
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            alignItems: 'center',
            backgroundColor: Colors.navyBlue,
            borderRadius: 6,
            paddingHorizontal: 8,
            paddingTop: 6,
            paddingBottom: 3,
          }}
          onPress={() => {
            setVisible(true);
          }}
        >
          <VectorIcons
            family="FontAwesome"
            name="clock-o"
            iconcolor={Colors.white}
            size={16}
          />
          <Text
            style={[
              CommonStyle.textGRegular,
              { fontSize: Fontsize.semimedium, color: Colors.white },
            ]}
          >
            Now
          </Text>
        </Pressable>
      </View>

      <>
        <Text style={[CommonStyle.textGMedium, { marginVertical: 12 }]}>
          How to Book a Driver for your Tip
        </Text>
        {bookdriver.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              marginBottom: 8,
              alignItems: 'flex-start',
            }}
          >
            <View
              style={{
                width: 6,
                height: 6,
                backgroundColor: Colors.lightGreen,
                borderRadius: 4,
                marginTop: 7,
                marginRight: 8,
              }}
            />

            <Text
              style={[
                CommonStyle.textGRegular,
                {
                  fontSize: Fontsize.semimedium,
                  flex: 1,
                  lineHeight: Fontsize.semilarge,
                },
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </>
    </View>
  );

  const RoundTrip = () => (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'relative' }}>
        <VectorIcons
          family="Feather"
          name="search"
          iconcolor={theme.secondarytext}
          size={16}
          style={{ position: 'absolute', top: 14, left: 12, zIndex: 1 }}
        />
        <Pressable onPress={() => navigation.navigate('OneWayRideScreen')}>
          <View pointerEvents="none">
            <TextInput
              style={[CommonStyle.textGRegular, style.inputBox]}
              placeholder="Where to?"
              placeholderTextColor={theme.secondarytext}
            />
          </View>
        </Pressable>
        <Pressable
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            alignItems: 'center',
            backgroundColor: Colors.navyBlue,
            borderRadius: 6,
            paddingHorizontal: 8,
            paddingTop: 6,
            paddingBottom: 3,
          }}
          onPress={() => {
            setVisible(true);
          }}
        >
          <VectorIcons
            family="FontAwesome"
            name="clock-o"
            iconcolor={Colors.white}
            size={16}
          />
          <Text
            style={[
              CommonStyle.textGRegular,
              { fontSize: Fontsize.semimedium, color: Colors.white },
            ]}
          >
            Now
          </Text>
        </Pressable>
      </View>

      <>
        <Text style={[CommonStyle.textGMedium, { marginVertical: 12 }]}>
          How to Book a Driver for your Tip
        </Text>
        {bookdriver.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              marginBottom: 8,
              alignItems: 'flex-start',
            }}
          >
            <View
              style={{
                width: 6,
                height: 6,
                backgroundColor: Colors.lightGreen,
                borderRadius: 4,
                marginTop: 7,
                marginRight: 8,
              }}
            />

            <Text
              style={[
                CommonStyle.textGRegular,
                {
                  fontSize: Fontsize.semimedium,
                  flex: 1,
                  lineHeight: Fontsize.semilarge,
                },
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </>
    </View>
  );

  const OutStation = () => (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'relative' }}>
        <VectorIcons
          family="Feather"
          name="search"
          iconcolor={theme.secondarytext}
          size={16}
          style={{ position: 'absolute', top: 14, left: 12, zIndex: 1 }}
        />
        <Pressable onPress={() => navigation.navigate('OneWayRideScreen')}>
          <View pointerEvents="none">
            <TextInput
              style={[CommonStyle.textGRegular, style.inputBox]}
              placeholder="Where to?"
              placeholderTextColor={theme.secondarytext}
            />
          </View>
        </Pressable>
      </View>

      <>
        <Text style={[CommonStyle.textGMedium, { marginVertical: 12 }]}>
          How to Book a Driver for your Tip
        </Text>
        {bookdriver.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              marginBottom: 8,
              alignItems: 'flex-start',
            }}
          >
            <View
              style={{
                width: 6,
                height: 6,
                backgroundColor: Colors.lightGreen,
                borderRadius: 4,
                marginTop: 7,
                marginRight: 8,
              }}
            />

            <Text
              style={[
                CommonStyle.textGRegular,
                {
                  fontSize: Fontsize.semimedium,
                  flex: 1,
                  lineHeight: Fontsize.semilarge,
                },
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </>
    </View>
  );

  const setRideType = (value: string) => {
    dispatch(
      setNewRideService({
        ...newRideService,
        rideType: value,
        dropData: {},
      })
    )
  }

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
    return (newRideService?.date ? new Date(newRideService?.date).getTime() : new Date().getTime())
  }

  return (
    <>
      {/* <View style={{ flex: 1 }}> */}
        <CustomBottomSheet
          sheetref={bottomsheetref}
          snappoint={['40%','70%']}
          backgroundStyle={{ borderRadius: 0 }}
        >
          <BottomSheetScrollView
            style={{
              backgroundColor: theme.background,
              padding: '5%',
              borderTopColor: '#00000020',
              borderTopWidth: 2,
            }}
          >
            {/* indicator */}
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: theme.datebgColor,
                alignSelf: 'center',
                position: 'absolute',
                top: -12,
              }}
            ></View>

            {/* choose service type */}
            <>
              <Text
                style={[
                  CommonStyle.textGMedium,
                  { fontSize: Fontsize.semilarge, marginBottom: 10 },
                ]}
              >
                Choose service type
              </Text>
              <View
                style={[
                  CommonStyle.flexRow,
                  {
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    borderBottomWidth: 1,
                    borderBottomColor: theme.cardborder,
                    marginBottom: 20,
                  },
                ]}
              >
                {tabs.map(tab => {
                  const isActive = newRideService?.rideType === tab.id;
                  console.log('tabtabtab',tab,)
                  return (
                    <Pressable
                      key={tab.id}
                      onPress={() =>
                        setRideType(tab?.id)
                      }
                      style={{ width: '29%' }}
                    >
                      <View style={style.serviceCard}>
                        <Images
                          type="image"
                          source={tab.icon}
                          style={{ borderRadius: 10 }}
                          width={tab.size}
                          height={tab.size}
                        />
                      </View>

                      <Text
                        style={{
                          marginTop: 8,
                          marginBottom: 8,
                          textAlign: 'center',
                          fontSize: 14,
                          fontWeight: isActive ? '600' : '400',
                          color: isActive
                            ? Colors.navyBlue
                            : theme.secondarytext,
                        }}
                      >
                        {tab.label}
                      </Text>
                      <View
                        style={{
                          width: '100%',
                          height: 3,
                          borderRadius: 50,
                          backgroundColor: isActive
                            ? Colors.navyBlue
                            : 'transparent',
                        }}
                      ></View>
                    </Pressable>
                  );
                })}
              </View>
            </>

            {/* tabs */}
            {newRideService?.rideType === constantData.rideType.single && <OneWay />}
            {newRideService?.rideType === constantData.rideType.twoWay && <RoundTrip />}
            {newRideService?.rideType === constantData.rideType.outStation && <OutStation />}
            <View style={{ height: 30 }}></View>
            {/* wheelpciker */}
            <WheelPickerModal
              visible={visible}
              setVisible={setVisible}
              selectedTime={getSelectedTime()}
              onConfirmTiming={(selected) => onChange(selected, "date")}
            />
          </BottomSheetScrollView>
        </CustomBottomSheet>
      {/* </View> */}
    </>
  );
};

export default ServiceType;

const styles = (theme: any) =>
  StyleSheet.create({
    serviceCard: {
      height: windowwidth * 0.25,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 12,
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.cardborder,
    },
    inputBox: {
      borderWidth: 1,
      borderColor: theme.cardborder,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingLeft: 40,
      paddingVertical: 12,
      color: theme.secondarytext,
      marginBottom: 5,
      backgroundColor: theme.lightGrey,
      fontSize: Fontsize.semimedium,
    },
    infoText: {
      marginTop: 15,
      fontSize: RFvalue(12),
      color: '#555',
      lineHeight: 18,
    },
  });
