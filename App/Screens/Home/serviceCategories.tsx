import React from 'react';
import { View, Pressable } from 'react-native';
import {
  borderradius,
  windowwidth,
} from '../../Utilities/dimensions';
import Images, { icons } from '../../Utilities/images';
import Text from '../../Components/text';
import styles from '../Home/styles';
import { Colors } from '../../Utilities/uiasset';
import useCustomHooks from '../../Actions/Hooks/customhook';
import Flexcomponent from '../../Components/flexcomponent';
import { useAppDispatch } from '../../Store/reduxHooks';

import { setServiceCategory } from '../../Store/Slices/HelperSlice';
import { setCleaningType } from '../../Common/redux/serviceReducer';
import { constantData } from '../../Common/constant';
import { loginCheck, toastFn } from '../../Common/commonFunction';

const ServiceCategories: React.FC = () => {


  const { navigation, theme } = useCustomHooks();
  const style = styles(theme);
  const dispatch = useAppDispatch();


  const handlePress = (type: string) => {
    dispatch(setCleaningType(type))
  }

  interface Otherprops {
    image: any;
    title: string;
    onpress?: () => void;
  }

  const Otherservice = ({ image, title, onpress }: Otherprops) => {
    return (
      <View style={{ width: '31%' }}>
        <Pressable
          onPress={onpress}
          style={{
            width: '100%',
            backgroundColor: theme.cardbg,
            borderRadius: borderradius * 0.5,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: windowwidth * 0.025,
          }}
        >
          <Images
            type="image"
            source={image}
            style={{ width: windowwidth * 0.225, height: windowwidth * 0.225 }}
          />
        </Pressable>
        <Text
          top={'5%'}
          style={{ textAlign: 'center', width: '100%', alignSelf: 'center' }}
          family="GMedium"
          size="semimedium"
        >
          {title}
        </Text>
      </View>
    );
  };

  const noAccessRedirect = (navigateTo: any) => {
    if (navigateTo) {
      if (loginCheck()) {
        return navigation.navigate(navigateTo);
      }
      toastFn("Login to view this");
      return navigation.navigate("Login", { redirectTo: "Bottomtab" });
    }
  }

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 15,
        }}
      >
        <Pressable
          style={{ gap: 15 }}
          onPress={() => {
            handlePress(constantData.subscriptionType.subscribe);
            // navigation.navigate("CleaningService");
            noAccessRedirect("CleaningService")
          }}
        >
          <View style={style.card}>
            <View style={{ ...style.tag, backgroundColor: Colors.green }}>
              <Text family="bold" size="semismall" color="white">
                Popular
              </Text>
            </View>
            <Images
              type="image"
              source={icons.Popular}
              resizeMode="contain"
              style={{ width: windowwidth * 0.35, height: windowwidth * 0.35 }}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              flexWrap: 'wrap',
              width: '80%',
              alignSelf: 'center',
            }}
            family="GMedium"
            size="semimedium"
          >
            Daily Car Cleaning Service
          </Text>
        </Pressable>
        <Pressable
          style={{ gap: 15 }}
          onPress={() => {
            handlePress(constantData.subscriptionType.ots);
            // navigation.navigate('CleaningService');
            noAccessRedirect("CleaningService")
          }}
        >
          <View style={style.card}>
            <View style={{ ...style.tag, backgroundColor: Colors.orange }}>
              <Text family="bold" size="semismall" color="white">
                Trending
              </Text>
            </View>
            <Images
              type="image"
              source={icons.Trending}
              style={{ width: windowwidth * 0.35, height: windowwidth * 0.35 }}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              flexWrap: 'wrap',
              width: '80%',
              alignSelf: 'center',
            }}
            family="GMedium"
            size="semimedium"
          >
            One Time Car Cleaning
          </Text>
        </Pressable>
      </View>
      <Flexcomponent
        alignItems="flex-start"
        justifyContent="space-between"
        top={'10%'}
      >
        <>
          <Otherservice
            image={icons.OnDemand}
            title="Driver On-Demand"
            onpress={() => noAccessRedirect("DriverOnDemand")}
          // onpress={() => navigation.navigate('DriverOnDemand')}
          />

          <Otherservice
            image={icons.RTO}
            title="RTO Services"
            onpress={() => noAccessRedirect("RTOService")}
          // onpress={() => navigation.navigate('RTOService')}
          />

          <Otherservice
            image={icons.Scrap}
            title="Vehicle Scrapping Service"
            // onpress={() => navigation.navigate('CarScrapping')}
            onpress={() => {
              dispatch(setServiceCategory('scrapping'));
              noAccessRedirect("ScrapPostList");
              // navigation.navigate('BiddingRequest')
            }}
          />
        </>
      </Flexcomponent>
    </>
  );
};

export default ServiceCategories;
