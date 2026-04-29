import React, { useCallback, useEffect, useState } from "react";
import Mainview from "../../Components/mainview";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { View, FlatList, StyleSheet, } from "react-native";
import Text from "../../Components/text";
import CommonStyles from "../../Utilities/fontStyle";
import { Fontsize } from "../../Utilities/uiasset";
import { windowwidth } from "../../Utilities/dimensions";
import Images, { icons } from "../../Utilities/images";
import useSocket from "../../Actions/Sockets/sockethook";
import { useFocusEffect } from "@react-navigation/native";
import { durationGone, numberChange, returnArrayOnly } from "../../Common/commonFunction";
import { useLazyGetMyNotificationsQuery } from "../../Common/redux/userHook";


const initialData = {
    data: [],
    page: 1,
    limit: 10,
    isLoading: false,
    isLoadMore: false,
    initialLoading: false,
    isRefreshing: false,
    contentRendered: false,
    noDataContent: "No notifications",
};


const HomeNotification: React.FC = () => {



    const [trigger, { isLoading }] = useLazyGetMyNotificationsQuery();


    const [ notifications , setNotifications ] = useState(initialData)


    const { theme, navigation } = useCustomHooks();
    const CommonStyle = CommonStyles(theme);

    
    useFocusEffect(
        useCallback(() => {
            fetchMyNotificationList(true, true);
        }, [])
    )

    const fetchMyNotificationList = async (isRefresh?: boolean, initialCall?: boolean, ) => {

        if (initialCall) {
            setNotifications({
                ...notifications,
                initialLoading: true,
            })
        }
        else if(isRefresh){
            setNotifications({
                ...notifications,
                isRefreshing: true,
            })
        }
        else{
            setNotifications({
                ...notifications,
                isLoading: true,
            })
        }

        
        let page = isRefresh ? 1 : notifications?.page;

        let sendData = {
            page: page,
            limit: notifications?.limit,
        }

        let resp = await trigger(sendData);

        console.log('resprespresp',resp)

        const response = resp?.data;

        let setData: any = {
            page: page + 1,
            limit: sendData?.limit,
            data: [],
            isLoadMore: false,
            isLoading: false,
            initialLoading: false,
            isRefreshing: false,
        }

        if (sendData?.page == 1) {
            setData.data = returnArrayOnly(response?.data);
        }
        else {
            setData.data = [
                ...returnArrayOnly(notifications?.data),
                ...returnArrayOnly(response?.data)
            ];
        }
        setData.isLoadMore = returnArrayOnly(response?.data).length >= notifications?.limit ? true : false;


        setNotifications({
            ...notifications,
            ...setData,
        });
    }

    console.log('notificationsnotifications',notifications)

    const onRefresh = () => {
        if (
            !notifications.initialLoading
        ) {
            fetchMyNotificationList(true)
        }
    }

    // const onTabChange = (tabName:string) => {
    //   setTab(tabName);
    //   fetchMyNotificationList(false, false, tabName);
    // }

    const onEndReached = () => {
        if (
            !notifications.initialLoading
            &&
            notifications?.contentRendered
            &&
            !notifications.isLoading
            &&
            notifications?.isLoadMore
        ) {
            fetchMyNotificationList()
        }
    }

    const onContentSizeChange = (w: number, h: number) => {
        if (h > 1) {
            setNotifications({
                ...notifications,
                contentRendered: true,
            });
        }
        else if (h < 1 && !notifications?.initialLoading) {
            setNotifications({
                ...notifications,
                contentRendered: true,
            });
        }
    };

    return (
        <Mainview isheader={true}
            headertitle="Notifications"
            onleftfn={() => navigation.goBack()}
        >
            <FlatList
                data={notifications?.data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingVertical: 10 }}
                onEndReached={() => onEndReached()}
                onRefresh={() => onRefresh()}
                refreshing={notifications?.isRefreshing}
                onContentSizeChange={(w, h) => onContentSizeChange(w, h)}
                renderItem={(data: any) => (
                    <View
                        style={[
                            CommonStyle.flexRow,
                            {
                                paddingHorizontal: windowwidth * 0.02,
                                paddingVertical: 12,
                                borderBottomWidth: 1,
                                borderBottomColor: theme.lightBorder,
                            },
                        ]}
                    >
                        <View>
                            <Images
                                type="image"
                                source={icons.logo}
                                width={windowwidth * 0.14}
                                height={windowwidth * 0.14}
                                style={{
                                    borderRadius: 10,
                                    marginRight: 12,
                                }}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text
                                style={[
                                    CommonStyle.textGMedium,
                                    { fontSize: Fontsize.xxmedium },
                                ]}
                            >
                                {data?.item?.title}
                            </Text>
                            <Text
                                style={[
                                    CommonStyle.textGRegular,
                                    {
                                        fontSize: Fontsize.xmedium,
                                        lineHeight: Fontsize.large,
                                    },
                                ]}
                            >
                                {data?.item?.message}
                            </Text>
                            {console.log('datadatadsfsd',data?.item)}
                            <Text>{durationGone(data?.item?.createdAt)}</Text>
                            {/* durationGone(numberChange(data?.feedBackTiming)) */}
                        </View>
                    </View>
                )}
            />
        </Mainview>
    )
}

export default HomeNotification;

const styles = (theme: any) =>
    StyleSheet.create({
        contentPadding: {
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginVertical: 8,
        },
    });