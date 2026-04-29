import React, { useCallback, useEffect, useState } from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { ImageBackground, Pressable, ScrollView, View } from "react-native";
import { Button, Dropdown } from "../../../../Components/Field";
import Text from "../../../../Components/text";
import styles from "./styles";
import Images, { icons } from "../../../../Utilities/images";
import { windowwidth } from "../../../../Utilities/dimensions";
import LinearGradient from "react-native-linear-gradient";
import Flexcomponent from "../../../../Components/flexcomponent";
import { useGetMySubscriptionPackagesListQuery } from "../../../../Common/redux/vehicleServiceHook";
import { constantData } from "../../../../Common/constant";
import { useFocusEffect } from "@react-navigation/native";
import { capitalizeFirstLetter, dateToMonthDate, formatDate, formatDateMonthAlone, isEmpty, returnArrayOnly, returnOriginalFile } from "../../../../Common/commonFunction";

const SubscriptionPlan: React.FC = () => {


    const { data, isLoading, refetch } = useGetMySubscriptionPackagesListQuery({ type: constantData.subscriptionFilter.active, page: 1, limit: Number.MAX_SAFE_INTEGER, });


    const { theme, navigation } = useCustomHooks()
    const style = styles(theme);


    const [subscriptionDetail, setSubscriptionDetail] = useState<any>({});
    const [subscriptionList, setSubscriptionList] = useState<any>([]);

    // const subscriptionDetail = data?.data?.[0];
    // const subscriptionList = returnArrayOnly(data?.data);

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    )

    useEffect(() => {
        let currList = returnArrayOnly(data?.data)
        setSubscriptionList(currList);
        if (currList.length > 0 && isEmpty(subscriptionDetail)) {
            setSubscriptionDetail(currList[0]);
        }
    }, [data?.data]);


    console.log('dsfkljdsfsd', subscriptionDetail, subscriptionList)


    return (
        <Mainview
            isheader={true}
            headertitle="Subscription Plan"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <>
                    {
                        (subscriptionList?.length > 0 && !isLoading)
                            ?
                            <View style={{ paddingHorizontal: "6%", marginBottom: "5%" }}>
                                <Button title="Cancel Subscription" onPress={() => navigation.navigate('CancelSubscription', { subscriptionId: subscriptionDetail?._id })} />
                            </View>
                            :
                            <></>
                    }
                </>
            }
            isscollable={true}
            ismainloading={isLoading}
            isnodata={(subscriptionList?.length > 0 && !isLoading) ? false : true}
            nodatacontent="No Subscription yet"
        >
            <View style={{ paddingVertical: 20 }}>
                <Dropdown
                    label="Vehicle Registration Number"
                    placeholder="Select vehicle"
                    list={subscriptionList}
                    labelField="registrationNo"
                    onChange={(e) => setSubscriptionDetail(e)}
                />
                {
                    subscriptionList?.length > 0
                        ?
                        <>
                            <View style={{
                                flex: 1,
                                marginTop: "5%", gap: 20,
                                marginBottom: "5%"
                            }}>
                                <Text family="GMedium" size="semilarge">Current plan</Text>
                                <View style={{ width: windowwidth * 0.88, }}>
                                    <ImageBackground
                                        source={(subscriptionDetail?.planDetails?.backImage ? { uri: returnOriginalFile(subscriptionDetail?.planDetails?.backImage) } : icons.PrmCard)}
                                        borderRadius={28}
                                        resizeMode="cover"
                                        style={{ width: windowwidth * 0.88, height: windowwidth * 0.6, }}>
                                        {/* <View>
                                <LinearGradient
                                    colors={['#DF0946', '#CE6700']}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    style={style.upgrade}
                                >
                                    <Pressable>
                                        <Text family="GMedium" size="medium" color="#FFFFFF">Upgrade Plan</Text>
                                    </Pressable>
                                </LinearGradient>
                            </View> */}
                                        <View style={{ gap: 10, padding: 25 }}>
                                            <View style={style.premLg}>
                                                <Images
                                                    type="image"
                                                    source={(subscriptionDetail?.planDetails?.frontImage ? { uri: returnOriginalFile(subscriptionDetail?.planDetails?.frontImage) } : icons.SPremium)}
                                                    style={{
                                                        width: windowwidth * 0.09,
                                                        height: windowwidth * 0.09,
                                                    }}
                                                />
                                            </View>
                                            <Text family="GMedium" size="large" style={{ textAlign: 'left', color: 'white' }}>
                                                {capitalizeFirstLetter(subscriptionDetail?.planDetails?.planName)}
                                            </Text>
                                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                                <Text family="GMedium" size="xxxxlarge" style={{ textAlign: 'left', color: 'white' }} >
                                                    ₹{subscriptionDetail?.price}
                                                </Text>
                                                <View>
                                                    <Text family="GMedium" size="semimedium" style={{ textAlign: 'left', color: 'white' }} >₹{subscriptionDetail?.price}</Text>
                                                    <Text family="GMedium" size="tinylarge" color='#FFCB27'>/{subscriptionDetail?.duration} {subscriptionDetail?.duration > 1 ? 'days' : 'day'}</Text>
                                                </View>
                                            </View>
                                            <Text family="GRegular" size="xmedium" style={{ textAlign: 'left', color: 'white' }}>
                                                Plan Ends - {formatDate(subscriptionDetail?.endDate)}
                                            </Text>
                                        </View>
                                    </ImageBackground>

                                </View>
                                <Text family="GMedium" size="semilarge">Subscription plan details</Text>
                                <Flexcomponent justifyContent="space-between" paddingHorizontal={15} paddingVertical={15} style={style.container}>
                                    <View style={{ gap: 10 }}>
                                        {/* <Text family="GRegular" size="medium">Id</Text> */}
                                        <Text family="GRegular" size="medium">Type</Text>
                                        <Text family="GRegular" size="medium">Purchased Month</Text>
                                        <Text family="GRegular" size="medium">Begin</Text>
                                        <Text family="GRegular" size="medium">Ends</Text>
                                        <Text family="GRegular" size="medium">Time Slot</Text>
                                    </View>
                                    <View style={{ gap: 10, alignItems: 'flex-end' }}>
                                        {/* <Text family="GRegular" size="medium">{subscriptionDetail?._id}</Text> */}
                                        <Text family="GRegular" size="medium">
                                            {
                                                subscriptionDetail?.subscriptionType == constantData.subscriptionType.subscribe
                                                    ?
                                                    capitalizeFirstLetter(subscriptionDetail?.planDetails?.planName)
                                                    :
                                                    "One time service"
                                            }
                                        </Text>
                                        <Text family="GRegular" size="medium">{formatDateMonthAlone(subscriptionDetail?.buyDate)}</Text>
                                        <Text family="GRegular" size="medium">{dateToMonthDate(subscriptionDetail?.startDate)}</Text>
                                        <Text family="GRegular" size="medium">{dateToMonthDate(subscriptionDetail?.endDate)}</Text>
                                        <Text family="GRegular" size="medium">{subscriptionDetail?.serviceStartTime?.display} - {subscriptionDetail?.serviceEndTime?.display}</Text>
                                    </View>
                                </Flexcomponent>
                                <Text family="GMedium" size="semilarge">Car Details</Text>
                                <Flexcomponent justifyContent="space-between" paddingHorizontal={15} paddingVertical={15} style={style.container}>
                                    <View style={{ gap: 10 }}>
                                        <Text family="GRegular" size="medium">Make</Text>
                                        <Text family="GRegular" size="medium">Model</Text>
                                        <Text family="GRegular" size="medium">Parking Type</Text>
                                    </View>
                                    <View style={{ gap: 10, alignItems: 'flex-end' }}>
                                        <Text family="GRegular" size="medium">{subscriptionDetail?.brandVehicleDetails?.brandName}</Text>
                                        <Text family="GRegular" size="medium">{subscriptionDetail?.brandVehicleDetails?.vehicleBodyType}</Text>
                                        <Text family="GRegular" size="medium">{subscriptionDetail?.parkingType}</Text>
                                    </View>
                                </Flexcomponent>
                                <View style={style.vehicle}>
                                    <Images type="image" source={(subscriptionDetail?.brandVehicleDetails?.brandVehicleImage ? { uri: returnOriginalFile(subscriptionDetail?.brandVehicleDetails?.brandVehicleImage) } : icons.Baleno)} style={{ width: "100%", height: "100%" }} />
                                    <Text family="GMedium" size="large">{subscriptionDetail?.brandVehicleDetails?.vehicleBodyType}</Text>
                                </View>
                            </View >
                        </>
                        :
                        <></>
                }
            </View>

        </Mainview >
    )
}

export default SubscriptionPlan;