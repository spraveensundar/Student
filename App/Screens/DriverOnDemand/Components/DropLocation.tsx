import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Fontsize } from '../../../Utilities/uiasset';
import VectorIcons from '../../../Utilities/vectorIcons';
import { RFvalue, windowwidth } from '../../../Utilities/dimensions';
import BottomSheet from '@gorhom/bottom-sheet';
import CommonStyles from '../../../Utilities/fontStyle';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';
import { Button } from '../../../Components/Field';
import { useAppSelector } from '../../../Store/reduxHooks';
import { useSelector } from 'react-redux';
import { constantData } from '../../../Common/constant';

interface DropLocationprops {}

const DropLocation: React.FC<DropLocationprops> = () => {
  

  const newRideService = useSelector((state: any) => state?.serviceData?.newRideService)

  
  const route = useRoute();
  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);
  
  
  const bottomsheetref = useRef<BottomSheet>(null);
  const [ addressData, setAddressData ] = useState<any>({});


  const reschedule = useMemo(()=>{
    return (newRideService?.dataFrom == constantData.rideDataFrom.reschedule);
  },[newRideService?.dataFrom])
  
  
  const pickupData = newRideService?.fromLocation;
  const dropData = newRideService?.toLocation;
  
  
  
  useEffect(() => {
    bottomsheetref.current?.expand;
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (newRideService?.rideType == constantData.rideType.outStation) {
        if (dropData?.latitude) {
          setAddressData({
            ...dropData,
          })
        }
        else {
          setAddressData({
            ...pickupData,
          })
        }
      }
      else {
        setAddressData({
          ...dropData,
        })
      }
    }, [newRideService?.rideType,dropData,pickupData,])
  )

  console.log('addressDataaddressData',addressData,newRideService)

  return (
    <>
      {/* <View style={{ flex: 1 }}> */}
        <CustomBottomSheet
          sheetref={bottomsheetref}
          backgroundStyle={{ borderRadius: 0 }}
          bottomSheetProps={{
            enablePanDownToClose:false,
            
          }}
          
        >
          <View
            style={{
              backgroundColor: theme.background,
              paddingVertical: '5%',
              borderTopColor: '#00000020',
              borderTopWidth: 2,
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text
                style={[
                  CommonStyle.textGMedium,
                  {
                    fontSize: Fontsize.semilarge,
                    marginBottom: 10,
                    paddingHorizontal: windowwidth * 0.05,
                  },
                ]}
              >
                {
                  !dropData?.address
                  ?
                  "Set Up Your Location"
                  :
                  "Drop Location"
                }
                
              </Text>

              <View
                style={[
                  style.row,
                  {
                    borderTopWidth: 1,
                    borderTopColor: theme.boderColor,
                    paddingVertical: 20,
                    paddingHorizontal: windowwidth * 0.05,
                  },
                ]}
              >
                <VectorIcons
                  family="Ionicons"
                  name="location"
                  size={20}
                  iconcolor={Colors.red}
                  style={{ marginRight: 10 }}
                />

                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      CommonStyle.textGMedium,
                      {
                        fontSize: Fontsize.medium,
                        color: theme.primarytext,
                        marginBottom: 5,
                      },
                    ]}
                  >
                    {addressData?.city}
                  </Text>
                  {/* <Text
                    style={[
                      CommonStyle.textGMedium,
                      {
                        fontSize: Fontsize.medium,
                        color: theme.grayText,
                        marginBottom: 5,
                      },
                    ]}
                  >
                    Phoenix marketcity
                  </Text> */}
                  <Text
                    style={[
                      CommonStyle.textGRegular,
                      {
                        fontSize: Fontsize.semimedium,
                        color: theme.placeholderColor,
                      },
                    ]}
                  >
                    {addressData?.address}
                  </Text>
                </View>

                <Pressable
                  onPress={() =>
                    navigation.navigate('SearchLocation', {
                      locationType: dropData?.address?'drop':'pickup',
                    })
                  }
                  style={{
                    backgroundColor: Colors.primary10,
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 8,
                  }}
                >
                  <Text
                    style={[
                      CommonStyle.textGMedium,
                      { fontSize: Fontsize.semimedium, color: Colors.primary },
                    ]}
                  >
                    Change
                  </Text>
                </Pressable>
              </View>
            </View>
            <Button
              title="Confirm Location"
              onPress={() => {
                if (reschedule) {
                  navigation.navigate('Reschedule');
                }
                else {
                  if(newRideService?.fromRequestDriver){
                    navigation.goBack();
                    navigation.goBack();
                  }
                  else{
                    navigation.navigate('CustomerDetail');
                  }
                  // navigation.navigate('RequestDriver');
                }
              }}
              textStyle={{ fontSize: Fontsize.medium }}
              buttonStyle={{
                width: windowwidth * 0.9,
                marginHorizontal: 'auto',
              }}
            />
          </View>
        </CustomBottomSheet>
      {/* </View> */}
    </>
  );
};

export default DropLocation;

const styles = (theme: any) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  });
