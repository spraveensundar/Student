import React, { useCallback, useEffect, useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import Mainview from "../../../Components/mainview";
import useCustomHooks, { RazorPayRender } from "../../../Actions/Hooks/customhook";
import styles from "./styles";
import Text from "../../../Components/text";
import Images, { icons } from "../../../Utilities/images";
import { windowwidth } from "../../../Utilities/dimensions";
import VectorIcons from "../../../Utilities/vectorIcons";
import { Button } from "../../../Components/Field";
import TimeSlot from "./timeSlot";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes";
import { useGetAddOnServicesQuery, useGetMySubscriptionDetailQuery, useGetMySubscriptionServiceDetailQuery } from "../../../Common/redux/vehicleServiceHook";
import { useFocusEffect } from "@react-navigation/native";
import { confirmAlert, dateToMonthDateYear, isEmpty, numberChange, returnArrayOnly, returnOriginalFile, toastFn } from "../../../Common/commonFunction";
import { useGetFeesQuery } from "../../../Common/redux/userHook";
import { addOnSubscriptionService, addOnVerifyPayment } from "../../../Common/axiosHooks/userHooks";
import { constantData } from "../../../Common/constant";
import DateTime from "../../../Components/dateTime";

type AddonItem = {
    item: string;
    sellPrice: string;
    MRP: string;
    image: any;
    status: "Add" | "Added";
};
type Props = NativeStackScreenProps<Stacknavigationtypes, 'AddOns'>;


const AddOns: React.FC<Props> = ({ route }) => {


    const serviceId = route?.params?.serviceId, subscriptionId = route?.params?.subscriptionId;


    const serviceData = useGetMySubscriptionServiceDetailQuery({ serviceId: serviceId });
    const subscriptionData = useGetMySubscriptionDetailQuery({ subscriptionId: subscriptionId });
    const { data, refetch, isLoading, } = useGetAddOnServicesQuery({ page: 1, limit: 100 });
    const feesData = useGetFeesQuery({});




    const [items, setItems] = useState<AddonItem[]>([
        { item: 'Air Freshener', sellPrice: '56', MRP: '100', image: icons.AirFreshener, status: 'Added' },
        { item: 'Tissue Box', sellPrice: '40', MRP: '80', image: icons.TissueBox, status: 'Added' },
        { item: 'Car Seat Clean', sellPrice: '40', MRP: '80', image: icons.CarSeatCleaning, status: 'Added' },
        { item: 'Roof Cleaning', sellPrice: '56', MRP: '100', image: icons.RoofCleaning, status: 'Add' },
    ]);
    const [serviceDetail, setServiceDetail] = useState<any>({});
    const [subscriptionDetail, setSubscriptionDetail] = useState<any>({});
    const [feesDetail, setFeesDetail] = useState<any>({})
    const [addOn, setAddOn] = useState<any>([]);
    const [selectedAddOn, setSelectedAddOn] = useState<any>([]);
    const [selectDisable, setSelectDisable] = useState(false);
    const [totalPriceData, setTotalPriceData] = useState({ totalAddonPrice: 0, gst: 0, gstPercent: 0, paymentFee: 0, paymentFeePercent: 0, total: 0, })
    const [disableStatus, setDisableStatus] = useState(false);
    const [responseData, setResponseData] = useState<any>({});
    const [extraServiceData, setExtraServiceData] = useState<any>({});

    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    useFocusEffect(
        useCallback(() => {
            serviceData?.refetch();
            subscriptionData?.refetch();
            refetch();
            feesData?.refetch();
        }, [])
    )

    useEffect(() => {
        setServiceDetail(serviceData?.data?.data);
        setSubscriptionDetail(subscriptionData?.data?.data);
        setAddOn(returnArrayOnly(data?.data));

        const currFeesDetail = feesData?.data?.data;
        setFeesDetail(currFeesDetail);

        let gstPercent = numberChange(feesDetail?.gst, 2),
            paymentFeePercent = numberChange(feesDetail?.razorpayFee, 2);

        let setPriceData = {
            totalAddonPrice: numberChange(selectedAddOn?.reduce((currAmt: number, service: any) => numberChange(currAmt, 2) + numberChange(service.price, 2), 0), 2),
            gst: 0,
            gstPercent: gstPercent,
            paymentFee: 0,
            paymentFeePercent: paymentFeePercent,
            total: 0,
        }
        let gstPrice = numberChange(((setPriceData.totalAddonPrice * gstPercent) / 100), 2);
        let paymentFee = numberChange((((setPriceData.totalAddonPrice + gstPrice) * paymentFeePercent) / 100), 2);
        setPriceData.gst = gstPrice;
        setPriceData.paymentFee = paymentFee;
        setPriceData.total = setPriceData.totalAddonPrice + gstPrice + paymentFee;

        setTotalPriceData(setPriceData);

    }, [data?.data, serviceData?.data?.data, subscriptionData?.data?.data, feesData?.data?.data, selectedAddOn])

    useEffect(() => {
        if (subscriptionDetail?.extraServices?.length > 0) {
            let getThisServiceExtraService = subscriptionDetail?.extraServices?.find((check: any) => check?.date?.fullDate == dateToMonthDateYear(new Date(serviceDetail?.date)));
            if (getThisServiceExtraService?.orderId) {
                setExtraServiceData(getThisServiceExtraService);
                setSelectedAddOn(getThisServiceExtraService?.services)
            }
        }
    }, [subscriptionDetail])

    const onPress = (addOnData: any) => {
        setSelectDisable(true);
        let getIndex: number = selectedAddOn.findIndex((currData: any) => currData?._id == addOnData?._id);
        let finalAddOn = [];
        console.log('dsuhdsdf', getIndex, getIndex > -1)
        if (getIndex > -1) {
            finalAddOn = [
                ...selectedAddOn.slice(0, getIndex),
                ...selectedAddOn.slice(getIndex + 1, selectedAddOn?.length),
            ]
        }
        else {
            finalAddOn = [
                ...selectedAddOn,
                addOnData,
            ]
        }
        setSelectedAddOn(finalAddOn);
        setSelectDisable(false);
    }
    console.log('selectedAddOnselectedAddOn', selectedAddOn, subscriptionDetail)


    const purchaseAddOn = async () => {
        if (selectedAddOn?.length <= 0) {
            return toastFn("Select add on")
        }

        confirmAlert(
            "You cannot update add on for this date once payment is completed",
            () => confirmPayment(),
            () => { }
        )

        async function confirmPayment() {
            setDisableStatus(true);
            let sendData = {
                date: {
                    date: new Date(serviceDetail?.date).getDate(),
                    month: new Date(serviceDetail?.date).getMonth() + 1,
                    year: new Date(serviceDetail?.date).getFullYear(),
                    fullDate: dateToMonthDateYear(new Date(serviceDetail?.date)),
                },
                subscriptionId: subscriptionDetail?._id,
                services: (selectedAddOn?.map((val: any) => val?._id)),
            }
            let currentResponseData: any = {};
            let paymentInitate: any;
            if (responseData?.paymentInitateResp?.status) {
                paymentInitate = responseData?.paymentInitateResp;
            }
            else {
                paymentInitate = await addOnSubscriptionService(sendData);
            }
            if (paymentInitate?.status) {
                currentResponseData.paymentInitateResp = paymentInitate;
                let razorPayData = {
                    amount: paymentInitate?.data?.orderData?.amount,
                    id: paymentInitate?.data?.orderData?.id,
                    email: subscriptionDetail?.emailId,
                    contact: subscriptionDetail?.mobileNo,
                    name: subscriptionDetail?.name,
                }
                let razorPayResp: any;
                if (responseData?.razorPayResp?.status) {
                    razorPayResp = responseData?.razorPayResp;
                }
                else {
                    razorPayResp = await RazorPayRender(razorPayData);
                }
                if (razorPayResp?.status) {
                    currentResponseData.razorPayResp = razorPayResp;
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = razorPayResp.data;

                    const payload = {
                        razorpay_payment_id,
                        razorpay_order_id,
                        razorpay_signature
                    }
                    let paymentCompleteResp: any = await addOnVerifyPayment(payload);
                    if (paymentCompleteResp?.status) {
                        toastFn(paymentCompleteResp?.message ?? "Payment verified successfully");
                        navigation.navigate("PayNow");
                    }
                    else {
                        toastFn(razorPayResp?.message ?? "Try-Again");
                    }
                }
                else {
                    currentResponseData = {};
                    toastFn(razorPayResp?.message ?? "Razor payment error occured");
                }
            }
            else {
                toastFn(paymentInitate?.message ?? "Payment not initated")
            }
            setResponseData(currentResponseData);
            setDisableStatus(false);
        }
    }

    const addonAlredyPurchased = () => {
        return (extraServiceData?.paymentStatus == constantData.paymentStatus.paid) ? true : false
    }
    console.log('extraServiceDataextraServiceData', extraServiceData)

    return (
        <Mainview
            isheader={true}
            headertitle="Add On's"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <>
                    {
                        addonAlredyPurchased()
                            ?
                            <></>
                            :
                            <>
                                <View style={{ gap: 20, paddingHorizontal: "6%", marginBottom: "5%" }}>
                                    <Button title="Pay Now" disabled={disableStatus || selectDisable} onPress={() => purchaseAddOn()} />
                                </View>
                            </>
                    }
                </>

            }
            isoverlaploader={disableStatus}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.container}>

                    <Text family="GMedium" size="semilarge">Add On's</Text>

                    {
                        extraServiceData?.services?.length > 0
                            ?
                            <>
                                {
                                    extraServiceData?.services.map((item: any, index: number) => {

                                        let isSelected = selectedAddOn?.some((check: any) => check?._id == item?._id);

                                        return (
                                            <View key={index} style={style.addOns}>

                                                {/* Left Part */}
                                                <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                                                    <Images
                                                        source={{ uri: returnOriginalFile(item?.image) }}
                                                        type="image"
                                                        width={windowwidth * 0.2}
                                                        height={windowwidth * 0.2}
                                                    />
                                                    <View>
                                                        <Text family="GMedium" size="medium">{item.name}</Text>

                                                        <Text family="GBold" size="medium" color={theme.green1}>
                                                            ₹ {item.price}{" "}
                                                            <Text
                                                                family="GRegular"
                                                                size="semimedium"
                                                                style={{ textDecorationLine: "line-through", color: "#727272" }}
                                                            >
                                                                ₹ {item.price}
                                                            </Text>
                                                        </Text>
                                                    </View>
                                                </View>

                                                {/* Right Part */}
                                                <Pressable
                                                    disabled={selectDisable || addonAlredyPurchased() || disableStatus}
                                                    onPress={() => onPress(item)}
                                                    style={[
                                                        style.addbtn,
                                                        { backgroundColor: isSelected ? "#252525" : theme.btnTag }
                                                    ]}
                                                >
                                                    <VectorIcons
                                                        family="Ionicons"
                                                        name="add-circle"
                                                        size={20}
                                                        iconcolor={theme.activetabtext}
                                                    />
                                                    <Text family="GMedium" size="semimedium" color={theme.activetabtext}>
                                                        {
                                                            isSelected
                                                                ?
                                                                "Added"
                                                                :
                                                                "Add"
                                                        }
                                                    </Text>
                                                </Pressable>

                                            </View>
                                        )
                                    }
                                    )
                                }
                            </>
                            :
                            <>
                                {
                                    addOn.map((item: any, index: number) => {

                                        let isSelected = selectedAddOn?.some((check: any) => check?._id == item?._id);

                                        return (
                                            <View key={index} style={style.addOns}>

                                                {/* Left Part */}
                                                <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                                                    <Images
                                                        source={{ uri: returnOriginalFile(item?.image) }}
                                                        type="image"
                                                        width={windowwidth * 0.2}
                                                        height={windowwidth * 0.2}
                                                    />
                                                    <View>
                                                        <Text family="GMedium" size="medium">{item.name}</Text>

                                                        <Text family="GBold" size="medium" color={theme.green1}>
                                                            ₹ {item.price}{" "}
                                                            <Text
                                                                family="GRegular"
                                                                size="semimedium"
                                                                style={{ textDecorationLine: "line-through", color: "#727272" }}
                                                            >
                                                                ₹ {item.price}
                                                            </Text>
                                                        </Text>
                                                    </View>
                                                </View>

                                                {/* Right Part */}
                                                <Pressable
                                                    disabled={selectDisable || addonAlredyPurchased() || disableStatus}
                                                    onPress={() => onPress(item)}
                                                    style={[
                                                        style.addbtn,
                                                        { backgroundColor: isSelected ? "#252525" : theme.btnTag }
                                                    ]}
                                                >
                                                    <VectorIcons
                                                        family="Ionicons"
                                                        name="add-circle"
                                                        size={20}
                                                        iconcolor={theme.activetabtext}
                                                    />
                                                    <Text family="GMedium" size="semimedium" color={theme.activetabtext}>
                                                        {
                                                            isSelected
                                                                ?
                                                                "Added"
                                                                :
                                                                "Add"
                                                        }
                                                    </Text>
                                                </Pressable>

                                            </View>
                                        )
                                    }


                                    )
                                }
                            </>
                    }


                    {
                        serviceDetail?.subscriptionType == constantData.subscriptionType.ots
                            ?
                            <>
                                <View style={[style.container, { gap: 20 }]}>
                                    <View style={{ gap: 20 }}>
                                        <Text family="GMedium" size="semilarge">Start Time</Text>
                                        <View>
                                            <DateTime
                                                value={serviceDetail?.serviceStartTime ? new Date(serviceDetail?.serviceStartTime) : null}
                                                disabled={true}
                                                calendarIconDisplay={false}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </>
                            :
                            <>
                                <TimeSlot
                                    subscriptionDetail={subscriptionDetail}
                                    serviceDetail={serviceDetail}
                                />
                            </>
                    }


                    {
                        selectedAddOn?.length > 0
                            ?
                            <>
                                <Text family="GMedium" size="semilarge">Service Addons</Text>
                                <View style={style.serviceaAddOns}>
                                    <View style={{ gap: 10 }}>
                                        {
                                            selectedAddOn.map((value: any) => {

                                                return (

                                                    <Text family="GMedium" size="medium">
                                                        {value?.name}
                                                    </Text>

                                                )
                                            })
                                        }
                                        <Text family="GMedium" size="medium">
                                            GST ({totalPriceData?.gstPercent} %)
                                        </Text>
                                        <Text family="GMedium" size="medium">
                                            Payment fee ({totalPriceData?.paymentFeePercent} %)
                                        </Text>
                                        <Text family="GMedium" size="medium">
                                            Total
                                        </Text>
                                    </View>

                                    <View style={{ gap: 10 }}>
                                        {
                                            selectedAddOn.map((value: any) => {

                                                return (
                                                    <Text family="GMedium" size="medium">₹ {value?.price}</Text>
                                                )
                                            })
                                        }
                                        <Text family="GMedium" size="medium">
                                            ₹ {totalPriceData?.gst}
                                        </Text>
                                        <Text family="GMedium" size="medium">
                                            ₹ {totalPriceData?.paymentFee}
                                        </Text>
                                        <Text family="GMedium" size="medium">
                                            ₹ {totalPriceData?.total}
                                        </Text>
                                    </View>

                                    {/* <View style={{ gap: 10 }}>
                            <Text family="GMedium" size="medium">Air Freshener</Text>
                            <Text family="GMedium" size="medium">Tissue Box</Text>
                            <Text family="GMedium" size="medium">Car Seat Clean</Text>
                            <Text family="GMedium" size="medium">Platform Fee</Text>
                        </View>
                        <View style={{ gap: 10 }}>
                            <Text family="GBold" size="xxmedium">₹ 50</Text>
                            <Text family="GBold" size="xxmedium">₹ 40</Text>
                            <Text family="GBold" size="xxmedium">₹ 40</Text>
                        </View> */}
                                </View>
                            </>
                            :
                            <></>
                    }

                </View>
            </ScrollView>
        </Mainview>
    );
};

export default AddOns;
