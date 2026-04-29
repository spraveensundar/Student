import React, { useCallback, useState } from "react";
import styles from "./styles";
import { Pressable, View, ScrollView, Linking } from "react-native";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import Mainview from "../../../Components/mainview";
import Flexcomponent from "../../../Components/flexcomponent";
import Images, { icons, lotties } from "../../../Utilities/images";
import Text from "../../../Components/text";
import { windowwidth } from "../../../Utilities/dimensions";
import Lottie from "../../../Components/lottieview";
import VectorIcons from "../../../Utilities/vectorIcons";
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Colors } from "../../../Utilities/uiasset";
import RescheduleOrder from "./rescheduleOrder";
import { useGetMySubscriptionDetailQuery } from "../../../Common/redux/vehicleServiceHook";
import { constantData } from "../../../Common/constant";
import { capitalizeFirstLetter, dateToMonthDate, dateToMonthDateWithTime, dateToTimeAlone, numberChange, returnOriginalFile } from "../../../Common/commonFunction";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'OrderDetails'>;

interface PageTypeProps {
    fromScreen: string;
    rescheduled: boolean;
}

const OrderDetails: React.FC<Props> = ({ route }) => {



    const { fromScreen, rescheduled, subscriptionId } = route.params;



    const { data, refetch, isLoading, } = useGetMySubscriptionDetailQuery({ subscriptionId: subscriptionId });



    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const routee = useRoute();
    // const { fromScreen, rescheduled } = (routee.params ?? {}) as PageTypeProps;

    console.log('route.params', route.params)

    const [visible, setVisible] = useState(false)


    const detail = data?.data;


    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    )

    let orderDetailArray = [
        { title: "Order ID", value: detail?.subscriptionUniqueId },
        { title: "Booking Date & Time", value: dateToMonthDateWithTime(detail?.buyDate) },
    ]
    if (detail?.subscriptionType == constantData.subscriptionType.ots) {
        orderDetailArray = [
            ...orderDetailArray,
            ...[
                { title: "Washing Date", value: dateToMonthDate(detail?.startDate) },
                { title: "Washing Time", value: `${detail?.serviceStartTime?.display}${detail?.serviceEndTime?.display ? ` - ${detail?.serviceEndTime?.display}` : ""}` },
            ]
        ]
    }
    else {
        orderDetailArray = [
            ...orderDetailArray,
            ...[
                { title: "Start Date", value: dateToMonthDate(detail?.startDate) },
                { title: "End Date", value: dateToMonthDate(detail?.endDate) },
                { title: "Washing Time", value: `${detail?.serviceStartTime?.display}${detail?.serviceEndTime?.display ? ` - ${detail?.serviceEndTime?.display}` : ""}` },
            ]
        ]
    }

    return (
        <Mainview isheader={true}
            headertitle="Order details"
            onleftfn={() => navigation.goBack()}
            ismainloading={isLoading ? true : false}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={style.ordrDtls}>
                    {
                        detail?.servicemanDetail
                            ?
                            <Flexcomponent justifyContent="space-between" paddingHorizontal={15}
                                paddingVertical={15} style={style.detail}
                                bakgroundcolor={theme.btnColor}
                            >
                                <View style={{ flexDirection: 'row', gap: 20, }}>
                                    <Images
                                        type="image"
                                        source={detail?.servicemanDetail?.profile ? returnOriginalFile(detail?.servicemanDetail?.profile) : icons.Man}
                                    />
                                    <View style={{ gap: 10 }}>
                                        <View>
                                            <Text
                                                family="GMedium"
                                                size="medium"
                                                color={theme.activetabtext}
                                            >
                                                {detail?.servicemanDetail?.name}
                                            </Text>
                                            <Text
                                                family="GRegular"
                                                size="semimedium"
                                                color={theme.activetabtext}
                                            >
                                                {detail?.servicemanDetail?.mobileNo}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', gap: 20 }}>
                                            <Pressable
                                                onPress={() => Linking.openURL(`tel:${detail?.servicemanDetail?.mobileNo}`)}
                                            >
                                                <Images width={windowwidth * 0.08} height={windowwidth * 0.08} type="image" source={icons.Whatsapp} />
                                            </Pressable>
                                            <Pressable
                                                onPress={() => Linking.openURL(`sms:${detail?.servicemanDetail?.mobileNo}`)}
                                            >
                                                <Images width={windowwidth * 0.08} height={windowwidth * 0.08} type="image" source={icons.Message} />
                                            </Pressable>

                                        </View>
                                    </View>
                                </View>
                                {/* <Pressable onPress={() => navigation.navigate("ChatBox")}
                            style={{
                                width: '15%',
                                aspectRatio: 1,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                marginTop: -35
                            }}
                        ><Lottie src={lotties.MsgLoading} style={[style.log, { width: '100%', height: '100%' }]} /></Pressable> */}

                            </Flexcomponent>
                            :
                            <></>
                    }


                    {/* <Flexcomponent justifyContent="space-between" paddingHorizontal={15}
                        paddingVertical={15} style={style.detail}
                        bakgroundcolor={fromScreen === 'orders' ? theme.btnColor : theme.card}
                    >
                        <View style={{ flexDirection: 'row', gap: 20, }}>
                            <Images type="image" source={icons.Man} />
                            <View style={{ gap: 10 }}>
                                <View>
                                    <Text family="GMedium" size="medium"
                                        color={fromScreen === 'orders' ? theme.activetabtext : ''}>Nathaniel Louis</Text>
                                    <Text family="GRegular" size="semimedium"
                                        color={fromScreen === 'orders' ? theme.activetabtext : ''}>+91-9874563210</Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 20 }}>
                                    <Images width={windowwidth * 0.08} height={windowwidth * 0.08} type="image" source={icons.Whatsapp} />
                                    <Images width={windowwidth * 0.08} height={windowwidth * 0.08} type="image" source={icons.Message} />
                                </View>
                            </View>
                        </View>
                        <Pressable onPress={() => navigation.navigate("ChatBox")}
                            style={{
                                width: '15%',
                                aspectRatio: 1,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                marginTop: -35
                            }}
                        > <Lottie src={lotties.MsgLoading} style={[style.log, { width: '100%', height: '100%' }]} /></Pressable>

                    </Flexcomponent> */}

                    <Flexcomponent bakgroundcolor={theme.card} style={[style.card, { alignItems: 'flex-start' }]} >

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#155135',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            flex: 1,
                            width: "100%",
                            gap: 5
                        }}>
                            <Text family="GMedium" size="medium" color={theme.activetabtext}>Subscription Confirmed</Text>
                            <Images
                                type="image"
                                source={icons.Tick}
                                style={{ width: 20, height: 20, }}
                            />
                        </View>
                        <Flexcomponent justifyContent="space-between" alignItems="flex-start" style={{ gap: 10, paddingVertical: 20, paddingHorizontal: 10, flexDirection: 'row', }}>
                            <View style={{ gap: 10 }}>
                                <Text family="GRegular" size="semimedium"> Booking ID : <Text family="GMedium" size="semimedium" color="#009431">{detail?.subscriptionUniqueId}</Text></Text>
                                <Text family="GRegular" size="semimedium"> Subscription Type : <Text family="GMedium" size="semimedium" color="#009431">
                                    {
                                        detail?.subscriptionType == constantData.subscriptionType.subscribe
                                            ?
                                            capitalizeFirstLetter(detail?.planDetails?.planName)
                                            :
                                            "One time service"
                                    }
                                </Text></Text>
                                <Text family="GRegular" size="semimedium"> Payment Type : <Text family="GMedium" size="semimedium" color="#009431">Razor Pay</Text></Text>
                            </View>
                            {
                                fromScreen !== 'orders'
                                &&
                                (<View>
                                    <Pressable style={style.reseduleBtn} onPress={() => setVisible(true)}>
                                        <Text family="GMedium" size="semimedium" color="#009431">Reschedule</Text>
                                    </Pressable>
                                </View>)
                            }
                        </Flexcomponent>

                        {
                            detail?.subscriptionType == constantData.subscriptionType.ots
                                ?
                                <Flexcomponent justifyContent="space-between" paddingHorizontal='10' style={{
                                    borderTopWidth: 0.8,
                                    borderTopColor: '#CFCFCF',
                                }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Lottie src={lotties.locationLod} style={style.log} />
                                        <Text family="GMedium" size="small">
                                            {dateToMonthDateWithTime(new Date(detail?.startDate))}
                                        </Text>
                                    </View>
                                    <Pressable
                                        onPress={() => navigation.navigate('TrackOrder', { subscriptionId: detail?._id })}
                                    >
                                        <Text style={{ textDecorationLine: 'underline' }} family="GRegular" size="small" color={theme.primarytextHighlight}>Track Order</Text>
                                    </Pressable>
                                </Flexcomponent>
                                :
                                <></>
                        }

                    </Flexcomponent>
                    {rescheduled && (<Flexcomponent bakgroundcolor="#155135" paddingVertical={15} paddingHorizontal={15} justifyContent="flex-start"
                        style={{ borderRadius: 10, gap: 15 }}>
                        <Images type="image" source={icons.Calendar} />
                        <View style={{ gap: 5 }}>
                            <Text family="medium" size="semismall" color={theme.activetabtext}>Rescheduled Date & Time</Text>
                            <Text family="bold" size="semimedium" color={theme.activetabtext}>15/10/2025  08:00 AM</Text>
                        </View>
                    </Flexcomponent>)}
                    <Flexcomponent bakgroundcolor={theme.card} style={[style.detail, { paddingHorizontal: 20 }]}>
                        <Images type="image" source={detail?.brandVehicleDetails?.brandVehicleImage ? { uri: returnOriginalFile(detail?.brandVehicleDetails?.brandVehicleImage) } : icons.Baleno} style={{ width: windowwidth * 0.3, height: windowwidth * 0.2, borderRadius: 10, overflow: 'hidden' }} />
                        <View style={{ gap: 15, }}>
                            <Text family="GMedium" size="medium">
                                {detail?.brandVehicleDetails?.brandName} {detail?.brandVehicleDetails?.brandVehicleName}
                            </Text>
                            <View style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: '#0D442A1A', borderRadius: 5, width: windowwidth * 0.22 }}>
                                <Text family="GMedium" size="semismall" color={theme.texthilight}>
                                    {detail?.registrationNo}
                                </Text>
                            </View>
                        </View>
                    </Flexcomponent>
                    <Text family="GMedium" size="semilarge">Address Details</Text>
                    <Flexcomponent justifyContent='flex-start' style={[style.card, { paddingVertical: 10, flexDirection: 'row' }]}>
                        <Lottie src={lotties.locationLod} style={style.log} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text family="medium" size="semismall">{detail?.city}</Text>
                            <Pressable style={style.arrowDown}>
                                <VectorIcons family="Ionicons" name="chevron-down" size={windowwidth * 0.04} />
                                <Text
                                    family="bold"
                                    size="semimedium"
                                    style={{
                                        flexWrap: "wrap",
                                        width: "80%",
                                    }}
                                >
                                    {detail?.address}
                                </Text>

                            </Pressable>
                        </View>
                    </Flexcomponent>
                    <Text family="GMedium" size="semilarge">Order Details</Text>
                    <Flexcomponent justifyContent="space-around" paddingHorizontal={15} style={style.detail}>
                        <View style={{ gap: 10 }}>
                            {
                                orderDetailArray.map((value) => <Text family="GRegular" size="xmedium">{value.title}</Text>)
                            }
                            {/* <Text family="GRegular" size="xmedium">Order ID</Text>
                            <Text family="GRegular" size="xmedium">Washing Date</Text>
                            <Text family="GRegular" size="xmedium">Washing Time</Text>
                            <Text family="GRegular" size="xmedium">Booking Date & Time</Text> */}
                        </View>
                        <View style={{ gap: 10, alignItems: "flex-end" }}>
                            {
                                orderDetailArray.map((value) => <Text family="GMedium" size="xmedium">{value.value}</Text>)
                            }
                            {/* <Text family="GMedium" size="xmedium">CART45012</Text>
                            <Text family="GMedium" size="xmedium">Oct 09, 2025</Text>
                            <Text family="GMedium" size="xmedium">8:00 AM - 9:00 AM</Text>
                            <Text family="GMedium" size="xmedium">Oct 09,2025 12:20 PM</Text> */}
                        </View>
                    </Flexcomponent>
                    <Text family="GMedium" size="semilarge">Customer Details</Text>
                    <Flexcomponent justifyContent="space-around" paddingHorizontal={15} style={style.detail}>
                        <View style={{ gap: 10 }}>
                            <Text family="GRegular" size="xmedium">Name</Text>
                            <Text family="GRegular" size="xmedium">Mobile Number</Text>
                            <Text family="GRegular" size="xmedium">Email</Text>
                        </View>
                        <View style={{ gap: 10, alignItems: "flex-end" }}>
                            <Text family="GMedium" size="xmedium">
                                {detail?.name}
                            </Text>
                            <Text family="GMedium" size="xmedium">
                                {detail?.mobileNo ?? detail?.userId?.mobileNo}
                            </Text>
                            <Text family="GMedium" size="xmedium">
                                {detail?.emailId}
                            </Text>
                        </View>
                    </Flexcomponent>
                    <Text family="GMedium" size="semilarge">Payment Details</Text>
                    <Flexcomponent justifyContent="space-between" paddingHorizontal={15} style={style.detail}>
                        <View style={{ gap: 10 }}>
                            <Text family="GRegular" size="xmedium">Package Price({detail?.duration} {numberChange(detail?.duration) > 1 ? "days" : "day"})</Text>
                            {/* <Text family="GRegular" size="xmedium">Package dis</Text> */}
                            <Text family="GRegular" size="xmedium">GST(18%)</Text>
                            <View style={{ gap: 20 }} />
                            <Text family="GRegular" size="xmedium">Total</Text>
                        </View>
                        <View style={{ gap: 10, alignItems: "flex-end" }}>
                            <Text family="GMedium" size="xmedium">₹{detail?.price}</Text>
                            <Text family="GMedium" size="xmedium">+₹162</Text>
                            <View style={{ gap: 25 }} />
                            <Text family="GMedium" size="xmedium">{numberChange(detail?.finalPrice).toFixed(2)}</Text>
                        </View>
                    </Flexcomponent>
                </View>
            </ScrollView>
            <RescheduleOrder visible={visible} setVisible={setVisible} />
        </Mainview >
    )
}

export default OrderDetails;