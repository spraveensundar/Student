import React, { useCallback, useEffect, useState } from "react";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Calendar } from 'react-native-calendars';
import styles from "./styles";
import { Fontfamily } from "../../../Utilities/uiasset";
import { View } from "react-native";
import Text from "../../../Components/text";
import { Button } from "../../../Components/Field";
import { useGetMySubscriptionServiceForCalendarQuery } from "../../../Common/redux/vehicleServiceHook";
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { dateToYDM, isEmpty, returnArrayOnly } from "../../../Common/commonFunction";
import { constantData } from "../../../Common/constant";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'OrderActivity'>;

const OrderActivity: React.FC<Props>  = ({ route }) => {


    const { subscriptionId } = route.params;



    const { data, refetch, isLoading, } = useGetMySubscriptionServiceForCalendarQuery({ subscriptionId: subscriptionId });



    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const [selectedDate, setSelectedDate] = useState("");
    const [ markedDates, setMarkedDates ] = useState<any>({});
    const [selectedData, setSelectedData] = useState<any>({});


    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    // const markedDates = {
    //     [selectedDate]: { selected: true },

    //     [`${year}-${month}-01`]: { marked: true, dotColor: theme.btnTag },
    //     [`${year}-${month}-02`]: { marked: true, dotColor: theme.btnTag },
    //     [`${year}-${month}-03`]: { marked: true, dotColor: theme.btnTag },
    //     [`${year}-${month}-05`]: { marked: true, dotColor: theme.btnTag },
    //     [`${year}-${month}-06`]: { marked: true, dotColor: theme.btnTag },

    //     [`${year}-${month}-04`]: { marked: true, dotColor: theme.cardLeft1 },
    //     [`${year}-${month}-07`]: { marked: true, dotColor: theme.cardLeft1 },
    // };


    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    )

    const subscriptionData = data?.data?.subscriptionData, serviceList = returnArrayOnly(data?.data?.serviceData);

    console.log('subscriptionDatasubscriptionData',subscriptionData)

    useEffect(()=>{
        let currentServiceList = returnArrayOnly(data?.data?.serviceData);
        let newMarkedDates: any = {};
        if(currentServiceList?.length > 0){
            currentServiceList.map((val) => {
                let newValue = { ...val };
                if (newValue?.date) {
                    console.log('statuuusss',newValue?.status)
                    if (newValue?.status == constantData.serviceStatus.completed) {
                        newValue = { 
                            ...newValue,
                            marked: true, dotColor: theme.btnTag,
                        };
                    }
                    else if (newValue?.status == constantData.serviceStatus.cancelled || newValue?.isSkiped) {
                        newValue = {
                            ...newValue,
                            marked: true, dotColor: theme.helpInfo
                        };
                    }
                    else {
                        newValue = {
                            ...newValue,
                            marked: true, dotColor: theme.cardLeft1,
                        };
                    }
                }
                newMarkedDates[dateToYDM(newValue?.date)] = newValue;
                return newValue;
            })
        }
        if(isEmpty(selectedDate)&&currentServiceList?.length > 0){
            let currentDate = dateToYDM(new Date()), currentTime = new Date().getTime();
            if(newMarkedDates?.[currentDate]){
                console.log('idfffff')
                newMarkedDates[currentDate] = {
                    ...newMarkedDates?.[currentDate],
                    selected: true
                }
            }
            else if(!isEmpty(newMarkedDates)){
                console.log('elseeeeeidfffff')
                let keyArray = Object.keys(newMarkedDates);
                let nearByDate = keyArray[0];
                let a = new Date(newMarkedDates[keyArray[0]].date).getTime(), b = currentTime;
                let nearByDifference = a > b ? a-b : b-a;
                for ( let i = 0; i< keyArray?.length; i++ ){
                    let key = keyArray?.[i];
                    a = new Date(newMarkedDates?.[key]?.date).getTime();
                    let currentDifference = a > b ? a-b : b-a;
                    if(currentDifference<nearByDifference){
                        nearByDate = key;
                        nearByDifference = currentDifference;
                    }
                }
                currentDate = nearByDate;
                newMarkedDates[currentDate] = {
                    ...newMarkedDates?.[currentDate],
                    selected: true
                }
                console.log('idfffffnearByDifference',nearByDifference)
            }
            setSelectedDate(currentDate);
            console.log('currentDatecurrentDate',currentDate)
            setSelectedData(newMarkedDates?.[currentDate]);
        }
        
        setMarkedDates(newMarkedDates);
    },[data?.data?.serviceData]);

    console.log('datadata',data,subscriptionId,markedDates,selectedDate)

    const onDaySelect = (day:any) => {
        console.log('sihsfsdfsd',day)
        setSelectedDate(day.dateString)
        let currentMarkedDates = {...markedDates};
        let allKeys = Object.keys(currentMarkedDates);
        for (let i = 0; i < allKeys?.length; i++) {
            let key = allKeys?.[i];
            if (currentMarkedDates?.[key]?.selected) {
                currentMarkedDates[key].selected = false;
            }
        }
        if(currentMarkedDates?.[day.dateString]){
            currentMarkedDates[day.dateString] = {
                ...currentMarkedDates[day.dateString],
                selected: true
            }
        }
        else{
            currentMarkedDates[day.dateString] = {
                selected: true
            }
        }
        setMarkedDates({
            ...currentMarkedDates,
        });
        setSelectedData(currentMarkedDates?.[day.dateString]);
    }

    console.log('selectedDataselectedData',selectedData)

    const isAddOnAvailable = () => {
        if(
            selectedData?.isSkiped ||
            (new Date(selectedData?.date).getTime() < new Date().setHours(0,0,0,0))
        
        ){
            return false
        }
        return true;
    }

    return (
        <Mainview
            isheader={true}
            headertitle="Order Activity"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={{ gap: 20, paddingHorizontal: "6%", marginBottom: "5%" }}>
                    {
                        serviceList?.length > 0
                            ?
                            <>
                                {
                                    markedDates?.[selectedDate]?._id
                                        ?
                                        <>
                                            {
                                                (
                                                    subscriptionData?.isSubscriptionCancelled
                                                )
                                                ?
                                                <Button title="Subscription Cancelled"/>
                                                :
                                                (
                                                    isAddOnAvailable()
                                                    ?
                                                    <Button title="AddOn Features" onPress={() => navigation.navigate('AddOns', { serviceId: markedDates?.[selectedDate]?._id, subscriptionId: subscriptionId })} />
                                                    :
                                                    <></>
                                                )
                                            }
                                            
                                            <Button
                                                onPress={() => navigation.navigate('WatchActivity', { serviceId: markedDates?.[selectedDate]?._id })}
                                                title="Watch Activity"
                                                buttonStyle={{
                                                    backgroundColor: 'transparent',
                                                    borderWidth: 1,
                                                    borderColor: theme.tabactive,
                                                }}
                                                textStyle={{ color: theme.tabactive }}
                                            />
                                        </>
                                        :
                                        <>
                                            <Button title="No service on this date" />
                                        </>
                                }
                            </>
                            :
                            <>
                                <Button title="No service for you" />
                            </>
                    }
                </View>
            }
            ismainloading={isLoading ? true : false}
        >
            <View style={style.container}>
                <Calendar
                    onDayPress={(day) => onDaySelect(day)}
                    markedDates={markedDates}
                    theme={{
                        todayTextColor: theme.primarytext,
                        textDayFontFamily: Fontfamily.GMedium,
                        textMonthFontFamily: Fontfamily.GMedium,
                        textDayHeaderFontFamily: Fontfamily.GMedium,
                        dotStyle: { width: 8, height: 8, borderRadius: 5 },
                    }}
                    style={style.calendar}
                />

                {/* Status legend */}
                <View style={style.status}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: theme.btnTag,
                                marginRight: 6,
                            }}
                        />
                        <Text family="GMedium" size="semimedium" color={theme.activetabtext}>Service Done</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: theme.cardLeft1,
                                marginRight: 6,
                            }}
                        />
                        <Text family="GMedium" size="semimedium" color={theme.activetabtext}>Pending</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: theme.helpInfo,
                                marginRight: 6,
                            }}
                        />
                        <Text family="GMedium" size="semimedium" color={theme.activetabtext}>Leave or missed</Text>
                    </View>
                </View>
            </View>
        </Mainview>
    );
};

export default OrderActivity;
