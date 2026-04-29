import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";

import Text from "../../../Components/text";
import { Button } from "../../../Components/Field";
import Sheet from "../../../Components/bottomsheet";
import Mainview from "../../../Components/mainview";
import VectorIcons from "../../../Utilities/vectorIcons";
import Images, { icons } from "../../../Utilities/images";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { acceptBid } from "../../../Common/axiosHooks/userHooks";
import { formatDate, toastFn } from "../../../Common/commonFunction";
import { NavigationProp, stackNavProp } from "../../../Actions/types";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import { useLazyVehicleScrapDetailsQuery } from "../../../Common/redux/scrapService";

import styles from "./styles";

type Props = {
    navigation: NavigationProp;
    route: stackNavProp<'BiddingDetails'>['route'];
};

const BiddingDetails: React.FC<Props> = ({ route }: any) => {
    const { vehicleScrapId, requestId } = route?.params;
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    const [isBottomSheet, setIsBottomSheet] = useState(false);
    const bottomsheetref = useRef<BottomSheetModal>(null);

    const [details, setDetails] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [vehicleScrapDetails, { isFetching }] = useLazyVehicleScrapDetailsQuery();

    const getScrapDetails = async () => {
        const response = await vehicleScrapDetails({ vehicleScrapId: vehicleScrapId }).unwrap();
        setDetails(response?.data);
    }

    console.log("deradf", details)

    const handleAcceptBid = async (id: any, acceptBidId: any, data: any) => {
        try {
            setLoading(true);
            const response = await acceptBid({ bidId: id });
            if (response?.status) {
                toastFn(response?.message);
                getScrapDetails();
                navigation.navigate("ScrapStatus", {
                    origin: 'BiddingRequest',
                    content: '“Your scrap quote has been accepted! The buyer will contact you soon to schedule pickup.”',
                    button: {
                        title: 'Go to Schedule Pickup',
                        onButtonPress: () => navigation.navigate("ScrapPickupScheldule", { bidId: acceptBidId, data: data }),

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
        getScrapDetails();
    }, [vehicleScrapId])

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
            isscollable
            ismainloading={isFetching}
            headertitle={details?.bidStatus === "accept" ? `Booking ID : ${details?.vehicleRegistrationNo} ` : `Request ID :  ${requestId}`}
            horizontalpadding={0}
            bottomContent={
                <>
                    {
                        details?.bidStatus === "pending" && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: windowwidth * 0.05, paddingVertical: windowwidth * 0.03 }}>
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
                                    onPress={() => handleAcceptBid(details?._id, details?.acceptBidId, details)}
                                />
                            </View>
                        )
                    }
                    {
                        details?.bidPickupStatus === "initiated" && details?.bidStatus === "accept" && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: windowwidth * 0.05, paddingVertical: windowwidth * 0.03 }}>
                                <Button
                                    title={details?.status === "rescheduled" ? "Rescheduled Pickup" : "Pending For Pickup"}
                                    buttonStyle={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderColor: '#BF5600',
                                        backgroundColor: '#F9EFE6'
                                    }}
                                    textStyle={{ color: '#BF5600' }}
                                    onPress={() => { navigation.navigate("ScrapPickupScheldule", { bidId: details?.acceptBidId, data: details }) }}
                                />
                            </View>
                        )
                    }
                    {
                        details?.bidPickupStatus === "pickupconfirmed" && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: windowwidth * 0.05, paddingVertical: windowwidth * 0.03 }}>
                                <Button
                                    title={"Update Scrap Details"}
                                    buttonStyle={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderColor: '#009431',
                                        backgroundColor: '#009431'
                                    }}
                                    onPress={() => { navigation.navigate("UpdateCertificate", { data: details }) }}
                                />
                            </View>
                        )
                    }
                </>
            }
        >
            <View style={style.container}>
                <View style={{ paddingHorizontal: windowwidth * 0.05, marginBottom: windowwidth * 0.03 }}>
                    <Text size="xxmedium" family="GMedium">{'Shop Item'}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: windowwidth * 0.03,
                        marginVertical: windowwidth * 0.03,
                        borderRadius: 10,
                        backgroundColor: '#EFF0F1'
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: windowwidth * 0.15,
                            height: windowwidth * 0.15,
                            borderRadius: windowwidth * 0.15,
                            overflow: 'hidden',
                        }}>
                            <Images
                                source={icons.ScrapCar}
                                type="image"
                                width={'100%'}
                                height={'100%'}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: windowwidth * 0.03 }}>
                            <Text size="medium" family="GBold" color="#12110D" >{details?.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text size="medium" family="GMedium" color="#12110D" top={'2.5%'} >
                                    {`Weight : `}
                                </Text>
                                <Text size="medium" family="GMedium" color="#12110D" top={'2.5%'} >
                                    {`${details?.quantity}`}
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: windowwidth * 0.03 }}>
                            <Text size="medium" family="GBold" color="#12110D" >{`₹${details?.lastBidPrice}`}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: windowwidth * 0.05, marginBottom: windowwidth * 0.03 }}>
                    <Text size="xxmedium" family="GMedium">{'Customer Details'}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: windowwidth * 0.03,
                        marginVertical: windowwidth * 0.03,
                        borderRadius: 10,
                        backgroundColor: '#EFF0F1'
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: windowwidth * 0.15,
                            height: windowwidth * 0.15,
                            borderRadius: windowwidth * 0.15,
                            overflow: 'hidden',
                        }}>
                            <Images
                                source={icons.ScrapCar}
                                type="image"
                                width={'100%'}
                                height={'100%'}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: windowwidth * 0.03 }}>
                            <Text size="medium" family="GBold" color="#12110D" >{details?.vehicleOwnerName}</Text>
                            <Text size="medium" family="GMedium" color="#12110D" top={'2.5%'} >
                                {details?.vehicleOwnerMobileNo}
                            </Text>
                        </View>
                        {
                            details?.vehicleReachStatus && (
                                <View style={{ marginLeft: windowwidth * 0.03 }}>
                                    <Text size="medium" family="GBold" color={details?.bidStatus === 'accept' ? '#389E0D' : '#DC2020'} >
                                        {details?.bidStatus === "accept"
                                            ? "Accepted"
                                            : details?.bidStatus === "reject"
                                                ? "Rejected"
                                                : "Pending"}
                                    </Text>
                                </View>
                            )
                        }
                    </View>
                </View>
                <View style={{
                    borderTopWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderColor: '#CFCFCF',
                    paddingHorizontal: windowwidth * 0.05,
                    paddingVertical: windowwidth * 0.03,
                    marginBottom: windowwidth * 0.03
                }}>
                    <Text size="xxmedium" family="GMedium">{'Ad Posted at'}</Text>
                    <View style={{
                        height: windowheight * 0.26,
                        zIndex: 999,
                        marginVertical: windowwidth * 0.03,
                        borderRadius: 10,
                        overflow: 'hidden',
                    }}>
                        {
                            details?.location?.coordinates && (
                                <MapView
                                    style={StyleSheet.absoluteFill}
                                    initialRegion={{
                                        latitude: details.location.coordinates[1],
                                        longitude: details.location.coordinates[0],
                                        latitudeDelta: 0.05,
                                        longitudeDelta: 0.05,
                                    }}>
                                    <Marker
                                        coordinate={{
                                            latitude: details.location.coordinates[1],
                                            longitude: details.location.coordinates[0],
                                        }}
                                        title="Scrap Location"
                                        description="Pickup location"
                                    />
                                </MapView>
                            )
                        }
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <View>
                            <VectorIcons
                                family={"MaterialIcons"}
                                name={"location-on"}
                                iconcolor={'#000C51'}
                                size={windowwidth * 0.08}
                            />
                        </View>
                        <View style={{ flex: 1, paddingHorizontal: windowwidth * 0.02 }}>
                            <Text family={'GMedium'} size={'medium'} style={{ flexShrink: 1 }}>
                                {details?.flatNo}, {details?.city}, {details?.sector}, {details?.state}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: windowwidth * 0.05, marginBottom: windowwidth * 0.03 }}>
                    <Text size="xxmedium" family="GMedium">{`Booking Details`}</Text>
                    <View style={{
                        marginTop: windowwidth * 0.03,
                        padding: windowwidth * 0.05,
                        borderRadius: 10,
                        backgroundColor: '#F3F3F3',
                        overflow: 'hidden',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: windowwidth * 0.03,
                        }}>
                            <Text family="GRegular" size="medium" style={{ flexShrink: 1 }}>{'Date of Booking'}</Text>
                            <Text family="GBold" size="medium" style={{ flexShrink: 1 }}>{formatDate(details?.vehicleRegisterDate)}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: windowwidth * 0.03,
                        }}
                        >
                            <Text family="GRegular" size="medium" style={{ flexShrink: 1 }}>{'Schedule Date'}</Text>
                            <Text family="GBold" size="medium" style={{ flexShrink: 1 }}>{'27 Nov 2025, 04:20 PM'}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Text family="GRegular" size="medium" style={{ flexShrink: 1 }}>{'Approx.Price'}</Text>
                            <Text family="GBold" size="medium" style={{ flexShrink: 1 }}>{`₹${details?.vehiclePrice}`}</Text>
                        </View>
                    </View>
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
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: windowwidth * 0.03,
                        marginBottom: windowwidth * 0.03
                    }}>
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
        </Mainview>
    )
}

export default BiddingDetails;