import React, { useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlatList, Pressable, View } from "react-native";

import Text from "../../../Components/text";
import Nodata from "../../../Components/Nodata";
import { Button } from "../../../Components/Field";
import Mainview from "../../../Components/mainview";
import Sheet from "../../../Components/bottomsheet";
import { Fontsize } from "../../../Utilities/uiasset";
import Images, { icons } from "../../../Utilities/images";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { acceptBid } from "../../../Common/axiosHooks/userHooks";
import { NavigationProp, stackNavProp } from "../../../Actions/types";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import { capitalizeFirstLetter, toastFn } from "../../../Common/commonFunction";
import { useLazyFetchMyVehicleScrapBidsQuery } from "../../../Common/redux/scrapService";

import styles from "./styles";

type Props = {
    navigation: NavigationProp;
    route: stackNavProp<'BiddingRequest'>['route'];
};

const BiddingRequest: React.FC<Props> = ({ route }) => {
    const { scrapId } = route.params
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    const [isBottomSheet, setIsBottomSheet] = useState(false);
    const [loading, setLoading] = useState(false);
    const bottomsheetref = useRef<BottomSheetModal>(null);

    const [bid, setBids] = useState<any>([]);
    const [biddingRequest, { isFetching }] = useLazyFetchMyVehicleScrapBidsQuery();

    const getBiddingRequest = async () => {
        const response = await biddingRequest({ vehicleScrapId: scrapId, bidStatus: "all" }).unwrap();
        setBids(response?.data);
    }

    console.log("bidls", bid)

    const handleAcceptBid = async (id: any, acceptBidId: any, data: any) => {
        try {
            setLoading(true);
            const response = await acceptBid({ bidId: id });
            if (response?.status) {
                toastFn(response?.message);
                getBiddingRequest();
                navigation.navigate("ScrapStatus", {
                    origin: 'BiddingRequest',
                    content: '“Your scrap quote has been accepted! The buyer will contact you soon to schedule pickup.”',
                    button: {
                        title: 'Go to Schedule Pickup',
                        onButtonPress: () => navigation.navigate('ScrapPickupScheldule', { bidId: acceptBidId, data: data }),
                    },
                    status: 'success'
                })
            }
        } catch (error: any) {
            console.log("Error submitting scrap form:", error);
            toastFn(error?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBiddingRequest();
    }, [scrapId])

    useEffect(() => {
        if (isBottomSheet) {
            bottomsheetref?.current?.present();
        } else {
            bottomsheetref?.current?.close();
        }
    }, [isBottomSheet]);

    return (
        <Mainview
            isheader={true}
            isscollable={false}
            headertitle="Bidding Request"
            ismainloading={isFetching}
        >
            <View style={style.container}>
                <View style={{ marginBottom: windowwidth * 0.03 }}>
                    <Text size="xxmedium" family="GMedium">{'Bidding Request List'}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={bid ?? []}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ borderRadius: 10, margin: 5, boxShadow: '0px 0px 5px rgba(0,0,0,0.2)' }}>
                                    <Pressable onPress={() => navigation.navigate('BiddingDetails', { vehicleScrapId: item?.vehicleScrapId?._id, requestId: item?.requestId })}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                padding: windowwidth * 0.03,
                                                margin: windowwidth * 0.03,
                                                borderRadius: 10,
                                                backgroundColor: '#EFF0F1'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    width: windowwidth * 0.15,
                                                    height: windowwidth * 0.15,
                                                    borderRadius: windowwidth * 0.15,
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <Images
                                                    source={icons.ScrapCar}
                                                    type="image"
                                                    width={'100%'}
                                                    height={'100%'}
                                                    resizeMode="cover"
                                                />
                                            </View>
                                            <View style={{ flex: 1, marginLeft: windowwidth * 0.03 }}>
                                                <Text size="medium" family="GBold" color="#12110D">{item?.scrapperDetail?.firstName}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text size="medium" family="GMedium" color="#12110D" top={'2.5%'} >{`Request ID : `}</Text>
                                                    <Text size="medium" family="GMedium" color="#009431" top={'2.5%'} >{`${item?.requestId}`}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginHorizontal: windowwidth * 0.03, marginBottom: windowwidth * 0.03 }}>
                                            <View style={{ flex: 1 }}>
                                                <Text family={'GMedium'} size={'medium'} style={{ flexShrink: 1 }}>{item?.quantity || 1}</Text>
                                                <Text family={'GMedium'} size={'medium'} color="#404040" style={{ flexShrink: 1 }}>{'Quantity'}</Text>
                                            </View>
                                            <View style={{ flex: 1, marginLeft: windowwidth * 0.03 }}>
                                                <Text family={'GMedium'} size={'medium'} style={{ flexShrink: 1 }}>{`₹${item?.price}`}</Text>
                                                <Text family={'GMedium'} size={'medium'} color="#404040" style={{ flexShrink: 1 }}>{'Buyer Quote'}</Text>
                                            </View>
                                            <View>
                                                <Pressable style={{ marginLeft: windowwidth * 0.03, paddingVertical: windowwidth * 0.01, paddingHorizontal: windowwidth * 0.03, }} onPress={() => navigation.navigate('BiddingDetails', { vehicleScrapId: item?.vehicleScrapId?._id, requestId: item?.requestId })}>
                                                    <Text family={'GRegular'} size={'medium'} color={'#000C51'} style={{ lineHeight: Fontsize.medium, textDecorationLine: 'underline', textDecorationColor: '#000C51' }} >{'View details'}</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </Pressable>
                                    {/* {
                                        item?.vehicleScrapId?.bidPickupStatus === "pickupconfirmed" ?
                                            (
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        borderTopWidth: 0.5,
                                                        borderTopColor: '#CFCFCF',
                                                        paddingHorizontal: windowwidth * 0.03,
                                                        paddingVertical: windowwidth * 0.05
                                                    }}>
                                                    <Text size="medium" family="GMedium" color="#12110D" >
                                                        {`Status : `}
                                                    </Text>
                                                    <Text size="medium" family="GMedium" color={'#389E0D'} >
                                                        {`Completed`}
                                                    </Text>
                                                </View>
                                            ) : */}

                                    {
                                        item?.bidStatus === "pending" ? (
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: windowwidth * 0.03, marginBottom: windowwidth * 0.03 }}>
                                                <Button
                                                    title="Reject"
                                                    buttonStyle={{
                                                        flex: 1,
                                                        borderWidth: 1,
                                                        borderColor: '#FF4545',
                                                        backgroundColor: '#F4E2E2'
                                                    }}
                                                    textStyle={{ color: '#FF4545' }}
                                                    onPress={() => setIsBottomSheet(true)}
                                                />
                                                <Button
                                                    title="Accept"
                                                    buttonStyle={{
                                                        flex: 1,
                                                        borderWidth: 1,
                                                        borderColor: '#009431',
                                                        backgroundColor: '#009431',
                                                        marginLeft: windowwidth * 0.05,
                                                    }}
                                                    loading={loading}
                                                    onPress={() => handleAcceptBid(item?._id, item?.acceptBidId, item)}
                                                />
                                            </View>
                                        ) : (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    borderTopWidth: 0.5,
                                                    borderTopColor: '#CFCFCF',
                                                    paddingHorizontal: windowwidth * 0.03,
                                                    paddingVertical: windowwidth * 0.05
                                                }}>
                                                <Text size="medium" family="GMedium" color="#12110D" >
                                                    {`Status : `}
                                                </Text>
                                                <Text size="medium" family="GMedium" color={item?.bidStatus === 'accept' ? '#389E0D' : '#DC2020'} >
                                                    {`${capitalizeFirstLetter(item?.bidStatus)}ed`}
                                                </Text>
                                            </View>
                                        )
                                    }
                                </View>
                            )
                        }}
                        ItemSeparatorComponent={() => (<View style={{ height: windowwidth * 0.02 }} />)}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<Nodata text="No bidding found " container={{ height: windowheight * 0.60 }} />}
                    />
                </View>
            </View>
            <Sheet
                sheetref={bottomsheetref}
                custominterface={true}
                snappoint={['30%']}
                onDismiss={() => setIsBottomSheet(false)}
            >
                <View style={{ flex: 1, padding: windowwidth * 0.05 }}>
                    <View style={{ marginVertical: windowwidth * 0.05, justifyContent: 'center', }}>
                        <Text style={{ textAlign: 'center' }} size="xxmedium" family="GMedium">{'You’ve rejected the current quote. Would you like to request a new bid from other scrap buyers?'}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: windowwidth * 0.03,
                            marginBottom: windowwidth * 0.03
                        }}
                    >
                        <Button
                            title="Cancel"
                            buttonStyle={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: '#000C51',
                                backgroundColor: 'transparent',
                            }}
                            textStyle={{
                                color: '#000C51'
                            }}
                            onPress={() => {
                                setIsBottomSheet(false);
                            }}
                        />
                        <Button
                            title="Reject Now"
                            buttonStyle={{
                                flex: 1,
                                borderWidth: 1,
                                marginLeft: windowwidth * 0.05,
                            }}
                            textStyle={{
                                color: '#FFFFFF'
                            }}
                            onPress={() => {
                                setIsBottomSheet(false);
                                navigation.navigate("ScrapStatus", {
                                    origin: 'BiddingRequest',
                                    content: 'Scrapping request closed successfully. You can create a new request anytime.',
                                    button: {
                                        title: 'Done',
                                        onButtonPress: () => navigation.navigate('DrawerNavigator'),
                                    },
                                    status: 'error'
                                })
                            }}
                        />
                    </View>
                </View>
            </Sheet>
        </Mainview >
    )
}

export default BiddingRequest;