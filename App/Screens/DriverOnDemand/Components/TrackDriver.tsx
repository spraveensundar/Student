import React, { useEffect, useRef, useState } from 'react';
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
import { Button } from '../../../Components/Field';
import { useAppSelector } from '../../../Store/reduxHooks';
import LocationInputs from './LocationInput';
import DriverCard from './DriverCard';

interface TrackDriverprops {}

const TrackDriver: React.FC<TrackDriverprops> = () => {
  const route = useRoute();
  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);
  const bottomsheetref = useRef<BottomSheet>(null);
  const drop = useAppSelector(state => state?.locationSlice?.drop);
  const serviceType = useAppSelector(
    state => state?.locationSlice?.selectedService,
  );

  useEffect(() => {
    bottomsheetref.current?.expand;
  }, []);

  return (
    <>
      {/* <View style={{ flex: 1 }}> */}
        <CustomBottomSheet
          sheetref={bottomsheetref}
          snappoint={['48%']}
          backgroundStyle={{ borderRadius: 0 }}
        >
          <View
            style={{
              backgroundColor: theme.background,
              paddingBottom: '5%',
              flex: 1,
              justifyContent: 'space-between',
              borderRadius: 10,
            }}
          >
            <View>
              <DriverCard
                name="Nathaniel Louis"
                profilePic={icons.Man}
                rating={5}
                onWhatsapp={() => console.log('Whatsapp')}
                onMessage={() => console.log('Message')}
                containerStyle={{ marginBottom: 20, alignItems: 'center' }}
                iconWidth={windowwidth * 0.065}
                iconHeight={windowwidth * 0.065}
                rightContent={
                  <View>
                    <Images
                      type="image"
                      source={icons.Car1}
                      width={windowwidth * 0.3}
                      height={windowwidth * 0.18}
                      style={{
                        borderRadius: 10,
                      }}
                    />
                  </View>
                }
              />
              <View style={{ paddingLeft: windowwidth * 0.05 }}>
                <LocationInputs
                  noCard
                  inputLabel
                  pickupFocus={false}
                  dropFocus={false}
                  setPickupFocus={() => {}}
                  setDropFocus={() => {}}
                  goToSearch={() => {}}
                  readOnly={true}
                  showDrop={serviceType == 'roundtrip' ? false : true}
                />
              </View>
            </View>
            <Button
              title="Go back"
              onPress={() => {
                navigation.goBack();
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

export default TrackDriver;

const styles = (theme: any) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  });
