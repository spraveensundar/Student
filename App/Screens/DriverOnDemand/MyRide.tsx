import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { windowheight, windowwidth } from '../../Utilities/dimensions';
import Images, { icons } from '../../Utilities/images';
import CommonStyles from '../../Utilities/fontStyle';
import useCustomHooks from '../../Actions/Hooks/customhook';
import { Colors, Fontfamily, Fontsize } from '../../Utilities/uiasset';
import Mainview from '../../Components/mainview';
import VectorIcons from '../../Utilities/vectorIcons';
import Card from '../../Components/Card';
import Text from '../../Components/text';
import Line from '../../Components/Line';
import RowInfo from '../../Components/RowInfo';
import LocationInputs from './Components/LocationInput';
import DriverCard from './Components/DriverCard';
import ChooseServiceModal from './Components/ChooseServiceModal';
import UseModal from '../../Components/useModal';
import { useAppSelector } from '../../Store/reduxHooks';
import { useFocusEffect } from '@react-navigation/native';
import { formatDayDateTime, returnArrayOnly } from '../../Common/commonFunction';
import { useLazyGetMyRidesListQuery } from '../../Common/redux/rideServiceHooks';
import { constantData } from '../../Common/constant';

const initialData = {
    data: [],
    page: 1,
    limit: 10,
    isLoading: false,
    isLoadMore: false,
    initialLoading: false,
    isRefreshing: false,
    contentRendered: false,
    noDataContent: "No Rides",
};

const MyRide: React.FC = ({}) => {


  const serviceType = useAppSelector(
    state => state?.locationSlice?.selectedService,
  );
  const [trigger] = useLazyGetMyRidesListQuery();


  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);
  
  
  const [visible, setVisible] = useState(false);
  const [ list , setList ] = useState<any>(initialData);

  const rideData = [
    {
      id: '9874563210',
      date: 'Thu, Oct 16, 11:15 AM',
      pickup: 'Delhi cantt railway junction, Delhi',
      drop: 'Citywalk Mall, Delhi',
      price: '400',
      status: 'Completed',
      car: icons.Car1,
    },
    {
      id: '9874563211',
      date: 'Thu, Oct 17, 11:15 AM',
      pickup: 'Delhi cantt railway junction, Delhi',
      drop: 'Citywalk Mall, Delhi',
      price: '200',
      status: 'Upcoming',
      car: icons.Car1,
    },
    {
      id: '9874563212',
      date: 'Thu, Oct 15, 11:15 AM',
      pickup: 'Delhi cantt railway junction, Delhi',
      drop: 'Citywalk Mall, Delhi',
      price: '300',
      status: 'Cancelled',
      car: icons.Car1,
    },

    // ⭐ NEW DATA ⭐
    {
      id: '9874563213',
      date: 'Fri, Oct 18, 09:30 AM',
      pickup: 'Connaught Place, Delhi',
      drop: 'Indira Gandhi Airport T3',
      price: '550',
      status: 'Completed',
      car: icons.Car1,
    },
    {
      id: '9874563214',
      date: 'Fri, Oct 18, 07:45 PM',
      pickup: 'Hauz Khas Village, Delhi',
      drop: 'Saket Mall, Delhi',
      price: '180',
      status: 'Upcoming',
      car: icons.Car1,
    },
    {
      id: '9874563215',
      date: 'Sat, Oct 19, 06:10 PM',
      pickup: 'Rajiv Chowk Metro Station, Delhi',
      drop: 'Rohini Sector 11, Delhi',
      price: '320',
      status: 'Cancelled',
      car: icons.Car1,
    },
    {
      id: '9874563216',
      date: 'Sun, Oct 20, 08:00 AM',
      pickup: 'Lajpat Nagar, Delhi',
      drop: 'DLF CyberHub, Gurgaon',
      price: '700',
      status: 'Completed',
      car: icons.Car1,
    },
    {
      id: '9874563217',
      date: 'Sun, Oct 20, 02:20 PM',
      pickup: 'AIIMS Metro Station, Delhi',
      drop: 'Noida Sector 18, Noida',
      price: '650',
      status: 'Upcoming',
      car: icons.Car1,
    },
  ];

  const fetchData = async (isRefresh?: boolean, initialCall?: boolean,) => {

    if (initialCall) {
      setList({
        ...list,
        initialLoading: true,
      })
    }
    else if (isRefresh) {
      setList({
        ...list,
        isRefreshing: true,
      })
    }
    else {
      setList({
        ...list,
        isLoading: true,
      })
    }

    let page = isRefresh ? 1 : list?.page;
    let sendData = {
      page: page,
      limit: list?.limit,
    };
    let resp = await trigger(sendData);
    let response = {...resp?.data};
    console.log('ressssssss', response,sendData)
    let setData: any = {
      page: page + 1,
      limit: sendData?.limit,
      data: [],
      isLoadMore: false,
      isLoading: false,
      initialLoading: false,
      isRefreshing: false,
    }
    let data = [...returnArrayOnly(response?.data)];
    if (sendData?.page == 1) {
      setData.data = data;
    }
    else {
      setData.data = [
        ...data,
        ...returnArrayOnly(list?.data),
      ];
    }
    setData.isLoadMore = returnArrayOnly(response?.data).length >= list?.limit ? true : false;
    setList({
      ...setData
    });
  }

  useFocusEffect(
    useCallback(()=>{
      fetchData(true, true);
    },[])
  )

  const onRefresh = () => {
    if (
      !list.initialLoading
    ) {
      fetchData(true)
    }
  }

  const onEndReached = () => {
    if (
      !list.initialLoading
      &&
      list?.contentRendered
      &&
      list?.isLoadMore
    ) {
      fetchData()
    }
  }

  console.log('listttttt',list)

  return (
    <Mainview
      isheader={true}
      isscollable={false}
      //   statusbarcontent={'dark'}
      headertitle="My Ride"
      //   horizontalpadding={0}
      rightfn={
        <Pressable
          onPress={() => {
            setVisible(true);
          }}
        >
          <VectorIcons
            family="MaterialCommunityIcons"
            name="tune-variant"
            size={24}
            iconcolor={Colors.black}
          />
        </Pressable>
      }
    >
      <FlatList
        refreshing={list?.isRefreshing}
        onRefresh={onRefresh}
        data={list?.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }:{item: any}) => (
          <Pressable
            onPress={() => {
              navigation.navigate('RideDetail',{rideId: item?._id});
            }}
            onStartShouldSetResponder={() => false}
            delayHoverIn={150}
          >
            <Card containerStyle={style.contentPadding}>
              <DriverCard
                name={formatDayDateTime(new Date(item.date))}
                phone={`ID - ${item.rideId}`}
                status={item.rideStatus}
                rating={5}
                containerStyle={{ marginBottom: 10 }}
                nameStyle={{
                  fontSize: Fontsize.xmedium,
                  fontFamily: Fontfamily.GBold,
                }}
                subnameStyle={{ fontSize: Fontsize.xmedium }}
                iconWidth={windowwidth * 0.055}
                iconHeight={windowwidth * 0.055}
                noCard={true}
                LeftContent={
                  <View style={{ marginRight: 12 }}>
                    <Images
                      type="image"
                      source={item.car}
                      width={windowwidth * 0.16}
                      height={windowwidth * 0.12}
                      style={{
                        borderRadius: 10,
                      }}
                    />
                  </View>
                }
              />
              <LocationInputs
                pickupValue={item?.from?.address}
                dropValue={item?.to?.address}
                noCard
                inputLabel
                pickupFocus={false}
                dropFocus={false}
                setPickupFocus={() => {}}
                setDropFocus={() => {}}
                goToSearch={() => {}}
                readOnly={true}
                showDrop={item?.rideType == constantData.rideType.twoWay ? false : true}
                cardStyle={{ width: '80%' }}
              />
              <Text
                style={[
                  CommonStyle.textGBold,
                  {
                    fontSize: Fontsize.medium,
                    position: 'absolute',
                    bottom: 15,
                    right: 20,
                  },
                ]}
              >
                {`₹${item?.estimatedPaymentData?.total}`}
              </Text>
            </Card>
          </Pressable>
        )}
        onEndReached={()=>onEndReached()}
      />
      <UseModal
        visible={visible}
        setVisible={setVisible}
        containerStyle={{
          height: windowheight * 0.28,
        }}
      >
        <Text
          style={[
            CommonStyle.textGMedium,
            { fontSize: Fontsize.large, marginBottom: 15 },
          ]}
        >
          Select booking Rides
        </Text>
        <View>
          <TouchableOpacity style={style.buttonStyle}>
            <Text style={CommonStyle.textGRegular}>Completed Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.buttonStyle}>
            <Text style={CommonStyle.textGRegular}>Upcoming Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.buttonStyle}>
            <Text style={CommonStyle.textGRegular}>Cancelled Ride</Text>
          </TouchableOpacity>
        </View>
      </UseModal>
    </Mainview>
  );
};

export default MyRide;

const styles = (theme: any) =>
  StyleSheet.create({
    contentPadding: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginVertical: 8,
    },
    buttonStyle: {
      paddingVertical: 8,
    },
  });
