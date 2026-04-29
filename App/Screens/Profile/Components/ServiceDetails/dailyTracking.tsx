import React, { useCallback, useEffect, useState } from "react";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import styles from "./styles";
import Mainview from "../../../../Components/mainview";
import Flexcomponent from "../../../../Components/flexcomponent";
import { Pressable, View } from "react-native";
import Images, { icons } from "../../../../Utilities/images";
import { windowwidth } from "../../../../Utilities/dimensions";
import Text from "../../../../Components/text";
import { Colors } from "../../../../Utilities/uiasset";
import { useLazyGetMyServiceQuery } from "../../../../Common/redux/vehicleServiceHook";
import { useFocusEffect } from "@react-navigation/native";
import { returnArrayOnly } from "../../../../Common/commonFunction";
import ServiceCard from "./ServiceCard";
import { FlashList } from "@shopify/flash-list";
import { FlatList } from "react-native-gesture-handler";
import DateTime from "../../../../Components/dateTime";


const defaultserviceListData = {
    page: 1,
    limit: 10,
    data: [],
    isLoading: false,
    isLoadMore: false,
    initialLoading: false,
    isRefreshing: false,
    contentRendered: false,
    noDataContent: "No services",
}


const DailyTracking: React.FC = () => {

    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const [trigger, { isLoading }] = useLazyGetMyServiceQuery(undefined);


    const [serviceList, setServiceList] = useState(defaultserviceListData);
    const [selectedDate, setSelectedDate] = useState(new Date().setHours(0, 0, 0, 0));


    const dailyTracking = ([
        { name: "Maruti Suzuki Swift", time: "Oct 08, 2025  08:30 AM", Id: "ID - 9874563210", status: "On Going" },
        { name: "Maruti Suzuki Swift", time: "Oct 08, 2025  08:30 AM", Id: "ID - 9874563210", status: "Completed" },
        { name: "Maruti Suzuki Swift", time: "Oct 08, 2025  08:30 AM", Id: "ID - 9874563210", status: "On Hold" },
    ]);

    useFocusEffect(
        useCallback(() => {
            fetchMyServiceList(true, true);
        }, [])
    )

    useEffect(() => {
        fetchMyServiceList(true);
    }, [selectedDate])

    const onDateSelect = (date: any) => {
        console.log('dattteee', new Date(date).setHours(0, 0, 0, 0));
        setSelectedDate(new Date(date).setHours(0, 0, 0, 0));
    }

    const fetchMyServiceList = async (isRefresh?: boolean, initialCall?: boolean,) => {

        if (initialCall) {
            setServiceList({
                ...serviceList,
                initialLoading: true,
            })
        }
        else if (isRefresh) {
            setServiceList({
                ...serviceList,
                isRefreshing: true,
            })
        }
        else {
            setServiceList({
                ...serviceList,
                isLoading: true,
            })
        }


        let page = isRefresh ? 1 : serviceList?.page;

        const currentDate = new Date(selectedDate).getTime();
        let sendData = {
            page: page,
            limit: serviceList?.limit,
            startDate: new Date(new Date(currentDate).setHours(0, 0, 0, 0)).toISOString(),
            endDate: new Date(new Date(currentDate).setHours(23, 59, 59, 59)).toISOString(),
        }

        let resp = await trigger(sendData);

        console.log('respresprespa', resp)

        let response = { ...resp?.data };

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
                ...returnArrayOnly(serviceList?.data),
            ];
        }
        setData.isLoadMore = returnArrayOnly(response?.data).length >= serviceList?.limit ? true : false;


        setServiceList({
            ...serviceList,
            ...setData,
        });
    }

    const onRefresh = () => {
        if (
            !serviceList.isLoading
        ) {
            fetchMyServiceList(true)
        }
    }

    console.log('serviceListserviceList', serviceList)

    const onEndReached = () => {
        if (
            !serviceList.initialLoading
            &&
            serviceList?.contentRendered
            &&
            !serviceList.isLoading
            &&
            serviceList?.isLoadMore
        ) {
            fetchMyServiceList()
        }
    }

    const onContentSizeChange = (w: number, h: number) => {
        if (h > 1) {
            setServiceList({
                ...serviceList,
                contentRendered: true,
            });
        }
        else if (h < 1 && !serviceList?.initialLoading) {
            setServiceList({
                ...serviceList,
                contentRendered: true,
            });
        }
    };

    return (
        <Mainview
            isheader={true}
            headertitle="Daily Tracking"
            onleftfn={() => navigation.goBack()}
            // isnodata={serviceList?.data?.length<=0?true: false}
            // nodatacontent={serviceList?.noDataContent}
            ismainloading={serviceList?.initialLoading ? true : false}
        >
            <View style={{ marginTop: "5%", gap: 20 }}>

                <DateTime
                    dateAlone={true}
                    onChange={(date) => onDateSelect(date)}
                    value={new Date(selectedDate)}
                />

                {
                    serviceList?.data?.length > 0
                        ?
                        <FlatList
                            onEndReachedThreshold={0.3}
                            data={serviceList?.data}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <ServiceCard
                                    data={item}
                                    index={index}
                                />
                            )}
                            onEndReached={() => onEndReached()}
                            onRefresh={() => onRefresh()}
                            refreshing={serviceList.isRefreshing}
                            onContentSizeChange={(w, h) => onContentSizeChange(w, h)}
                        />
                        :
                        <>
                            <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Text family="GMedium" size="semilarge">No services</Text>
                            </View>
                        </>
                }
            </View>
        </Mainview>
    )
}

export default DailyTracking;