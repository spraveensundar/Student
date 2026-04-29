import React, { useCallback, useEffect, useState } from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { Pressable, View } from "react-native";
import Text from "../../../../Components/text";
import Flexcomponent from "../../../../Components/flexcomponent";
import Images, { icons } from "../../../../Utilities/images";
import VectorIcons from "../../../../Utilities/vectorIcons";
import styles from "./styles";
import { windowwidth } from "../../../../Utilities/dimensions";
import FastImage from "@d11/react-native-fast-image";
import { Colors } from "../../../../Utilities/uiasset";
import { Dropdown } from "../../../../Components/Field";
import { useFocusEffect } from "@react-navigation/native";
import { useLazyGetAssignedServiceManQuery, useLazyGetMyServiceQuery } from "../../../../Common/redux/vehicleServiceHook";
import { returnArrayOnly, returnOriginalFile } from "../../../../Common/commonFunction";
import CleanerServiceCard from "./CleanerServiceCard";
import { FlatList } from "react-native-gesture-handler";
import { constantData } from "../../../../Common/constant";
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

const CleanerAttendance: React.FC = () => {


    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const [trigger, { isLoading }] = useLazyGetAssignedServiceManQuery(undefined);
    const [getServiceTrigger,] = useLazyGetMyServiceQuery(undefined);


    const [servicemanList, setServiceManList] = useState<any>([]);
    const [servicemanDetail, setServicemanDetail] = useState<any>({});
    const [serviceList, setServiceList] = useState(defaultserviceListData);
    const [selectedDate, setSelectedDate] = useState(new Date().setHours(0, 0, 0, 0));



    useFocusEffect(
        useCallback(() => {
            fetchServicemanList();
            setServicemanDetail({});
        }, [])
    )

    const fetchServicemanList = async () => {
        setServiceList({
            ...serviceList,
            initialLoading: true,
        })
        let sendData = {
            page: 1,
            limit: Number.MAX_SAFE_INTEGER,
        };
        let resp = await trigger(sendData);
        console.log('servicemanlist', resp)

        let response = { ...resp?.data };

        setServiceManList(returnArrayOnly(response?.data));
        setServicemanDetail(response?.data?.[0] ?? {})
        // if(!response?.data?.[0]){
        setServiceList({
            ...serviceList,
            initialLoading: false,
        })
        // }
    }

    console.log('servicemanDetailservicemanDetail', serviceList)

    useEffect(() => {
        if (servicemanDetail?._id) {
            fetchMyServiceList(true)
        }
    }, [servicemanDetail, selectedDate])

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

        let sendData = {
            page: page,
            limit: serviceList?.limit,
            startDate: new Date(new Date(selectedDate).setHours(0, 0, 0, 0)).toISOString(),
            endDate: new Date(new Date(selectedDate).setHours(23, 59, 59, 59)).toISOString(),
            servicemanId: servicemanDetail?._id,
        }

        let resp = await getServiceTrigger(sendData);

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

    console.log('serviceListserviceList', serviceList, servicemanDetail)

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


    const isAbsent = () => {
        if (!servicemanDetail?.isOnline) {
            if (servicemanDetail?.leaveRequest?.some((check: any) => check?.status == constantData.leaveRequestStatus.approved)) {

            }
            else {
                return true;
            }
        }
    }

    const isLeave = () => {
        if (servicemanDetail?.leaveRequest?.some((check: any) => check?.status == constantData.leaveRequestStatus.approved)) {
            return true;
        }
    }

    return (
        <Mainview
            isheader={true}
            headertitle="Cleaner Attendance"
            onleftfn={() => navigation.goBack()}
            ismainloading={serviceList?.initialLoading ? true : false}
            isnodata={(!serviceList?.initialLoading && servicemanList?.length <= 0) ? true : false}
            nodatacontent="No cleaner assigned"
        >
            <View style={{ marginTop: "5%", gap: 20 }}>

                {
                    servicemanList?.length > 0
                        ?
                        <>
                            <Dropdown
                                label="Serviceman"
                                placeholder="Select Serviceman"
                                list={servicemanList}
                                onChange={(e) => setServicemanDetail(e)}

                            />

                            <Text family="GMedium" size="semilarge">Cleaner Attendance & Leave Control</Text>
                            <Flexcomponent justifyContent="space-between" paddingHorizontal={10} bakgroundcolor={theme.card} style={style.detail}>
                                <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                                    <Images type="image" source={{ uri: returnOriginalFile(servicemanDetail?.profile) }} width={windowwidth * 0.18}
                                        height={windowwidth * 0.18}
                                        resizeMode="contain" />
                                    <View style={{ gap: 5 }}>
                                        <Text family="GMedium" size="semilarge">{servicemanDetail?.name}</Text>
                                        {/* <Text family="GRegular" size="semimedium">ID : {servicemanDetail?._id}</Text> */}
                                        {/* <Text family="GRegular" size="semimedium">Shift Time : 09:00AM</Text> */}
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 20 }}>
                                    <VectorIcons style={style.icon} family="Feather" name="phone-call" iconcolor={theme.tabactive} size={20} />
                                    <VectorIcons style={style.icon} family="Feather" name="message-circle" iconcolor={theme.tabactive} size={20} />
                                </View>
                            </Flexcomponent>
                            <Flexcomponent justifyContent="space-between">
                                <Text family="GMedium" size="semilarge">{selectedDate == new Date().setHours(0, 0, 0, 0) ? "Today " : ""}Attendance</Text>
                                {/* <VectorIcons
                                    family="AntDesign"
                                    name="calendar"
                                    size={22}
                                /> */}
                            </Flexcomponent>
                            <DateTime
                                dateAlone={true}
                                onChange={(date) => onDateSelect(date)}
                                value={new Date(selectedDate)}
                            />
                            <Flexcomponent justifyContent="space-between" paddingHorizontal={10} bakgroundcolor={theme.card} style={style.detail}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, ...(servicemanDetail?.isOnline ? {} : { opacity: 0.2 }) }}>
                                    <Images type="image" source={icons.Checkmark} width={windowwidth * 0.07}
                                        resizeMode="contain" />
                                    <Text family="GMedium" size="medium">Present</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, ...(isAbsent() ? {} : { opacity: 0.2 }) }}>
                                    <Images type="image" source={icons.Cancel} width={windowwidth * 0.06}
                                        resizeMode="contain" />
                                    <Text family="GMedium" size="medium">Absent</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, ...(isAbsent() ? {} : { opacity: 0.2 }), ...(isLeave() ? {} : { opacity: 0.2 }) }}>
                                    <Images type="image" source={icons.History} width={windowwidth * 0.07}
                                        resizeMode="contain" />
                                    <Text family="GMedium" size="medium">On Leave</Text>
                                </View>
                            </Flexcomponent>
                            <Flexcomponent justifyContent="space-between">
                                <Text family="GMedium" size="semilarge">Service Details</Text>
                                {/* <Text family="GMedium" size="small">View all</Text> */}
                            </Flexcomponent>
                            {
                                <FlatList
                                    onEndReachedThreshold={0.3}
                                    data={serviceList?.data}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <CleanerServiceCard
                                            data={item}
                                            index={index}
                                        />
                                    )}
                                    onEndReached={() => onEndReached()}
                                    onRefresh={() => onRefresh()}
                                    refreshing={serviceList.isRefreshing}
                                    onContentSizeChange={(w, h) => onContentSizeChange(w, h)}
                                />
                            }
                            {/* <View style={[style.addOns, { justifyContent: 'flex-start' }]}>
                    <FastImage source={icons.CarSpa} style={{ width: windowwidth * 0.2, height: windowwidth * 0.2, borderRadius: 10, overflow: 'hidden' }} />
                    <View style={{ gap: 20 }}>
                        <View style={{ gap: 4 }}>
                            <Text family="GMedium" size="medium">Exterior Cleanning Only</Text>
                            <Text family="GRegular" size="semimedium">Oct 08, 2025  08:30 AM</Text>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <Text family="GRegular" size="semimedium">Completed</Text>
                                <VectorIcons
                                    family="Ionicons"
                                    name="checkmark-circle-sharp"
                                    iconcolor={theme.btnTag}
                                    size={20}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Pressable onPress={() => navigation.navigate("WatchActivity")} style={[style.btn, { backgroundColor: '#02BC7D', }]}>
                                <Text family="GMedium" size="semismall" color={theme.activetabtext} style={{ textAlign: 'center', }}>View details</Text>
                            </Pressable>
                            <Pressable style={[style.btn, { backgroundColor: '#E2004F1A', }]}>
                                <Text family="GMedium" size="semismall" color={Colors.pink} style={{ textAlign: 'center', }}>Report</Text>
                            </Pressable>
                        </View>
                    </View>
                </View> */}
                        </>
                        :
                        <>
                            {/* <Text family="GMedium" size="semilarge">No cleaner assigned</Text> */}
                        </>
                }
            </View>
        </Mainview>
    )
}

export default CleanerAttendance;