import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import CommonStyles from '../../../Utilities/fontStyle';
import UseModal from '../../../Components/useModal';
import {
  RFvalue,
  windowheight,
  windowwidth,
} from '../../../Utilities/dimensions';
import { Colors, Fontsize } from '../../../Utilities/uiasset';
import { Button } from '../../../Components/Field';
import Images, { icons } from '../../../Utilities/images';
import { fonts } from 'react-native-elements/dist/config';
import { useGetVehicleTypeListQuery } from '../../../Common/redux/vehicleServiceHook';
import { useSelector } from 'react-redux';

interface CarTypeModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (selectedCar: string, selectedTransmission: string) => void;
}

const carImages: any = {
  Hatchback: icons.Car1,
  Sedan: icons.Car2,
  SUV: icons.Car3,
};

const CarTypeModal: React.FC<CarTypeModalProps> = ({ visible, setVisible, onSubmit= () => {} }) => {
  
  
  const newRideService = useSelector((state: any) => state?.serviceData?.newRideService);


  const { theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);


  const { isLoading, data, refetch } = useGetVehicleTypeListQuery({ page: 1, limit: 10 });
  const [selectedCar, setSelectedCar] = useState('Hatchback');
  const [selectedTransmission, setSelectedTransmission] = useState('Manual');

  const carTypeList = ['Hatchback', 'Sedan', 'SUV'];
  const transmissionList = ['Manual', 'Automatic'];

  console.log('datadata',data)

  useEffect(()=>{
    if(newRideService?.vehicleBodyType){
      setSelectedCar(newRideService?.vehicleBodyType)
    }
    if(newRideService?.vehicleTransmissionType){
      setSelectedTransmission(newRideService?.vehicleTransmissionType)
    }
  },[newRideService])

  const onConfirm = () => {
    setVisible(false);
    onSubmit(selectedCar,selectedTransmission);
  }

  return (
    <UseModal
      visible={visible}
      setVisible={setVisible}
      containerStyle={{ height: windowheight * 0.7 }}
    >
      <View style={style.imgContainer}>
        <Images
          type="image"
          source={carImages[selectedCar]}
          style={style.carImg}
        />
        <Text
          style={[
            CommonStyle.textGMedium,
            { color: theme.darktext, marginTop: 15 },
          ]}
        >
          {selectedCar}
        </Text>
      </View>

      <Text
        style={[
          CommonStyle.textHBold,
          { fontSize: Fontsize.medium, marginBottom: 15 },
        ]}
      >
        Choose Car Type
      </Text>
      <View style={CommonStyle.flexRow}>
        {
          carTypeList.map(type => (
            <Pressable
              key={type}
              onPress={() => setSelectedCar(type)}
              style={[
                style.optionBtn,
                selectedCar === type && style.optionActive,
              ]}
            >
              <Text
                style={[
                  CommonStyle.textGMedium,
                  { fontSize: Fontsize.medium },
                  selectedCar === type && style.optionActiveText,
                ]}
              >
                {type}
              </Text>
            </Pressable>
          ))
        }
      </View>

      {/* Transmission */}
      <Text
        style={[
          CommonStyle.textHBold,
          { fontSize: Fontsize.medium, marginBottom: 15 },
        ]}
      >
        Car Transmission Type
      </Text>

      <View style={CommonStyle.flexRow}>
        {transmissionList.map(type => (
          <Pressable
            key={type}
            onPress={() => setSelectedTransmission(type)}
            style={[
              style.optionBtn,
              selectedTransmission === type && style.optionActive,
            ]}
          >
            <Text
              style={[
                CommonStyle.textGMedium,
                { fontSize: Fontsize.medium },
                selectedTransmission === type && style.optionActiveText,
              ]}
            >
              {type}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Confirm Button */}
      <View style={style.confirmWrap}>
        <Button
          title="Confirm"
          onPress={() => {
            console.log(selectedCar, selectedTransmission);
            onConfirm();
          }}
          textStyle={{ fontSize: Fontsize.medium }}
        />
      </View>
    </UseModal>
  );
};

export default CarTypeModal;

const styles = (theme: any) =>
  StyleSheet.create({
    // Image
    imgContainer: {
      width: '100%',
      height: windowheight * 0.25,
      borderRadius: 18,
      backgroundColor: '#F2F4F7',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    carImg: {
      width: '65%',
      height: '65%',
      resizeMode: 'contain',
    },
    carTitle: {
      fontSize: RFvalue(15),
      textAlign: 'center',
      marginTop: 8,
    },

    // Labels
    label: {
      fontSize: RFvalue(13),
      marginTop: 15,
      marginBottom: 10,
    },

    // Buttons
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    optionBtn: {
      minWidth: 100,
      paddingVertical: 10,
      paddingHorizontal: 22,
      borderRadius: 20,
      backgroundColor: theme.cardbg,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      marginBottom: 20,
    },
    optionActive: {
      backgroundColor: Colors.primary,
    },
    optionActiveText: {
      color: Colors.white,
    },

    confirmWrap: {
      position: 'absolute',
      bottom: 15,
      width: '100%',
      marginHorizontal: windowwidth * 0.05,
      left: 0,
      right: 0,
    },
  });
