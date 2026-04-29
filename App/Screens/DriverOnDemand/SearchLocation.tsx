import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  TextInput,
} from 'react-native';
import Mainview from '../../Components/mainview';
import { Fontsize } from '../../Utilities/uiasset';
import useCustomHooks from '../../Actions/Hooks/customhook';
import CommonStyles from '../../Utilities/fontStyle';
import { Input } from '../../Components/Field';
import { windowwidth } from '../../Utilities/dimensions';
import VectorIcons from '../../Utilities/vectorIcons';
import { useAppDispatch, useAppSelector } from '../../Store/reduxHooks';
import { useRoute } from '@react-navigation/native';
import { setDrop, setPickup } from '../../Store/Slices/LocationSlice';
import { getHeaderTitle } from './Components/ServiceHeaderTitle';
import { useSelector } from 'react-redux';
import AutoCompleteAddressInput from '../../Components/Field/Input/AutoCompleteAddressInput';
import SearchAutoCompleteAddressInput from '../../Components/Field/Input/SearchAutoCompleteAddressInput';
import { googleMapPlaceIdFetch } from '../../Common/axiosHooks/thirdPartyHooks';
import { returnAddressFormat, toastFn } from '../../Common/commonFunction';
import { setNewRideService } from '../../Common/redux/serviceReducer';
import { constantData } from '../../Common/constant';

type GooglePlacePrediction = {
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  description: string;
};

interface LocationTypeProps {
  locationType: string;
}

const SearchLocation: React.FC = () => {


  const newRideService = useSelector(
    (state: any) => state?.serviceData?.newRideService,
  );


  const { navigation, theme } = useCustomHooks();
  const route = useRoute();
  const { locationType } = route.params as LocationTypeProps;
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);
  const inputRef = useRef<TextInput>(null);
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GooglePlacePrediction[]>([]);

  const pickup = newRideService?.fromLocation?.address;
  const drop = newRideService?.toLocation?.address;

  const selectedAddress = locationType === 'pickup' ? pickup : drop;

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (selectedAddress) {
      setQuery(selectedAddress);
    }
  }, [selectedAddress]);

  // const fetchSuggestions = async (text: string) => {
  //   setQuery(text);

  //   if (text.length < 3) {
  //     setSuggestions([]);
  //     return;
  //   }

  //   try {
  //     const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=AIzaSyDTfDn-PE1FfJgosuTlGQZ3L2t6rVAoXx0&components=country:in`;

  //     const response = await fetch(url);
  //     const json = await response.json();
  //     setSuggestions(json.predictions);
  //   } catch (err) {
  //     console.log('Error fetching places:', err);
  //   }
  // };

  const onSelect = async (item: any) => {
    try {


      const details = await googleMapPlaceIdFetch(item.place_id);

      const result = details?.result;
      if (result) {
        let addressData = returnAddressFormat(result);
        console.log('addressDataaddressData',addressData,newRideService);
        let saveData = {
          address: addressData?.fullAddress,
          addressData: addressData,
          city: addressData?.city,
          state: addressData?.state,
          country: addressData?.country,
          latitude: addressData?.latlng?.[0],
          longitude: addressData?.latlng?.[1],
          zipcode: addressData?.zipcode,
        }

        if (locationType === constantData.lastFocused.pickup) {
          dispatch(setNewRideService({fromLocation: saveData, lastFocused: constantData.lastFocused.pickup}));
          if (!drop) {
            navigation.goBack();
          }
          else {
            navigation.navigate('DriverOnDemand', { fromScreen: 'oneWay' });
          }
          return;
        }
        else if (locationType === constantData.lastFocused.drop) {
          dispatch(setNewRideService({toLocation: saveData, lastFocused: constantData.lastFocused.drop}));
          if (!pickup) {
            navigation.goBack();
          }
          else {
            navigation.navigate('DriverOnDemand', { fromScreen: 'oneWay' });
          }
          return;
        }

      }
      else {
        toastFn(details?.message);
      }

      // old

      // const detailsURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=AIzaSyDTfDn-PE1FfJgosuTlGQZ3L2t6rVAoXx0`;
      // const res = await fetch(detailsURL);
      // const json = await res.json();

      // console.log('Selected Location:', item.description);
      // console.log('Lat/Lng =>', json.result?.geometry.location);

      // const address = item?.description;

      //   if (locationType === 'pickup') {
      //     dispatch(setPickup(address));
      //   } else {
      //     dispatch(setDrop(address));
      //   }

      //   navigation.goBack();

      // if (locationType === 'pickup') {
      //   dispatch(setPickup(address));
      //   if (!drop) {
      //     navigation.goBack();
      //   } else {
      //     navigation.navigate('DriverOnDemand', { fromScreen: 'oneWay' });
      //   }
      //   return;
      // }

      // if (locationType === 'drop') {
      //   dispatch(setDrop(address));
      //   if (!pickup) {
      //     navigation.goBack();
      //   } else {
      //     navigation.navigate('DriverOnDemand', { fromScreen: 'oneWay' });
      //   }
      //   return;
      // }

      // old

    } catch (err) {
      console.log('Error fetching place details:', err);
    }
  };

  return (
    <Mainview
      isheader={true}
      isscollable={false}
      headertitle={getHeaderTitle(newRideService?.rideType)}
      horizontalpadding={0}
    >
      <View style={style.container}>
        <SearchAutoCompleteAddressInput

          value={query}
          onChange={setQuery}
          onSelect={onSelect}
          placeHolderText={"Search locations"}
          // placeholderTextColor={}
          // inputStyle={}
          // searchListStyle={}

          inputViewStyle={style.inputContainer}
          inputRef={inputRef}
          inputLabel={""}
          inputContainerProps={
            {
              borderWidth: 1,
              borderColor: theme.cardborder,
              height: 45,
              paddingLeft: 43,
              marginTop: 25,
            }
          }
          inputLeftContent={
            <VectorIcons
                family="Feather"
                name={'search'}
                size={windowwidth * 0.05}
                iconcolor={theme.placeholderColor}
              />
          }

          listViewStyle={[
            style.inputContainer,
            { borderBottomWidth: 0, paddingVertical: 12 },
          ]}
          listRenderStyle={style.item}
          listPrimaryTextStyle={{ fontSize: Fontsize.medium, color: theme.grayText }}
          listSecondaryText={true}
          listSecondaryTextStyle={{fontSize: Fontsize.semimedium,color: theme.placeholderColor,}}

        />
        {/* <View style={style.inputContainer}>
          <Input
            ref={inputRef}
            placeHolder="Search locations"
            label={""}
            value={query}
            onChange={(text: string) => {
              setQuery(text);
              fetchSuggestions(text);
            }}
            containerprops={{
              borderWidth: 1,
              borderColor: theme.cardborder,
              height: 45,
              paddingLeft: 43,
              marginTop: 25,
            }}
            leftContent={
              <VectorIcons
                family="Feather"
                name={'search'}
                size={windowwidth * 0.05}
                iconcolor={theme.placeholderColor}
              />
            }
          />
        </View>
        <View
          style={[
            style.inputContainer,
            { borderBottomWidth: 0, paddingVertical: 12 },
          ]}
        >
          <FlatList
            data={suggestions}
            keyExtractor={item => item?.place_id}
            renderItem={({ item }) => (
              <Pressable style={style.item} onPress={() => onSelect(item)}>
                <Text
                  style={[
                    CommonStyle.textGMedium,
                    { fontSize: Fontsize.medium, color: theme.grayText },
                  ]}
                >
                  {item?.structured_formatting?.main_text}
                </Text>
                <Text
                  style={[
                    CommonStyle.textGRegular,
                    {
                      fontSize: Fontsize.semimedium,
                      color: theme.placeholderColor,
                    },
                  ]}
                >
                  {item?.structured_formatting?.secondary_text}
                </Text>
              </Pressable>
            )}
          />
        </View> */}
      </View>
    </Mainview>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    inputContainer: {
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.boderColor,
      paddingHorizontal: windowwidth * 0.05,
    },
    searchBox: {
      height: 50,
      backgroundColor: '#F5F5F5',
      borderRadius: 10,
      justifyContent: 'center',
      paddingHorizontal: 12,
      marginBottom: 10,
    },

    item: {
      paddingVertical: 10,
    },

    title: {
      fontSize: 17,
      fontWeight: '600',
      color: '#000',
    },

    subtitle: {
      fontSize: 13,
      marginTop: 2,
      color: '#6D6D6D',
    },
  });

export default SearchLocation;
