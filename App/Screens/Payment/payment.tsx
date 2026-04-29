import React, { useCallback, useEffect, useState } from "react";
import Mainview from "../../Components/mainview";
import useCustomHooks, { UsePayment } from "../../Actions/Hooks/customhook";
import styles from "./styles";
import { View, Pressable, ScrollView, BackHandler } from "react-native";
import { Button } from "../../Components/Field";
import Text from "../../Components/text";
import FastImage from "@d11/react-native-fast-image";
import Images, { icons, lotties } from "../../Utilities/images";
import Flexcomponent from "../../Components/flexcomponent";
import VectorIcons from "../../Utilities/vectorIcons";
import { windowwidth } from "../../Utilities/dimensions";
import LinearGradient from "react-native-linear-gradient";
import TimeSlot from "./timeSlot";
import Lottie from "../../Components/lottieview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../Navigations/stacknavigationtypes";
import DateTime from "../../Components/dateTime";
import { useDispatch, useSelector } from "react-redux";
import { useGetFeesQuery, useGetMyDetailQuery } from "../../Common/redux/userHook";
import { capitalizeFirstLetter, confirmAlert, numberChange, returnOriginalFile, toastFn } from "../../Common/commonFunction";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { removeNewCleaningService, setNewCleaningService } from "../../Common/redux/serviceReducer";
import { deletePackageSubscription, oneTimePurchase, packageSubscription } from "../../Common/axiosHooks/vehicleServiceHooks";
import { useGetMySubscriptionDetailQuery, useGetPackageDetailQuery } from "../../Common/redux/vehicleServiceHook";
import { constantData } from "../../Common/constant";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Payment'>;

const Payment: React.FC<Props> = ({ route }) => {




    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const dispatch = useDispatch();
    const { data, isLoading, refetch } = useGetMyDetailQuery(undefined);
    const newCleaningService: any = useSelector((state: any) => state?.serviceData?.newCleaningService);
    const feesData = useGetFeesQuery({});
    const beforeUpgradeSubscriptionDetail = useGetMySubscriptionDetailQuery({ subscriptionId: newCleaningService?.beforeUpgradeSubscriptionId });


    const [priceData, setPriceData] = useState<any>({
        planPrice: 0,
        planDiscountPercent: 0,
        planDiscountPrice: 0,
        planDiscountedPrice: 0,
        slotDiscount: 0,
        slotDiscountPrice: 0,
        couponDiscountPercent: 0,
        couponDiscountPrice: 0,
        gst: 0,
        platformFee: 0,
        previousSubscriptionAmountAvailable: 0,
        total: 0,
    });
    const [disableStatus, setDisableStatus] = useState(false);


    const userData = data?.data;
    const onTime: boolean = (newCleaningService?.serviceType == constantData.subscriptionType.ots ? true : false);
    const feesDetail = feesData?.data?.data;




    useFocusEffect(
        useCallback(() => {

            console.log('feesDetailfeesDetail', feesDetail, beforeUpgradeSubscriptionDetail);
            let perServiceAmount = numberChange((numberChange(beforeUpgradeSubscriptionDetail?.data?.data?.percentages?.totalSubscriptionAmount) / numberChange(beforeUpgradeSubscriptionDetail?.data?.data?.percentages?.totalServices)), 1);
            let previousSubscriptionAmountAvailable = numberChange(numberChange(beforeUpgradeSubscriptionDetail?.data?.data?.percentages?.totalSubscriptionAmount) - (perServiceAmount * beforeUpgradeSubscriptionDetail?.data?.data?.completed), 2);
            let gstPercent = numberChange(feesDetail?.gst, 2),
                paymentFeePercent = numberChange(feesDetail?.razorpayFee, 2);

            let changedPriceData = {
                planPrice: numberChange(newCleaningService?.planPrice, 2),
                planDiscountPercent: numberChange(newCleaningService?.planDiscountPercent, 2),
                planDiscountPrice: numberChange(newCleaningService?.planDiscountPrice, 2),
                planDiscountedPrice: numberChange(newCleaningService?.planDiscountedPrice, 2),
                slotDiscount: numberChange(newCleaningService?.slotDiscount, 2),
                slotDiscountPrice: numberChange(newCleaningService?.slotDiscountPrice, 2),
                couponDiscountPercent: numberChange(newCleaningService?.couponDiscountPercent, 2),
                couponDiscountPrice: numberChange(newCleaningService?.couponDiscountPrice, 2),

                gstPrice: 0,
                gstPercent: gstPercent,
                paymentFee: 0,
                paymentFeePercent: paymentFeePercent,
                previousSubscriptionAmountAvailable: previousSubscriptionAmountAvailable,

                total: 0,
            };

            let withoutGstTotal = changedPriceData.planDiscountedPrice - changedPriceData?.slotDiscountPrice - changedPriceData?.couponDiscountPrice - previousSubscriptionAmountAvailable;
            let gstPrice = numberChange(((withoutGstTotal * gstPercent) / 100), 2);

            let paymentFee = numberChange((((withoutGstTotal + gstPrice) * paymentFeePercent) / 100), 2);
            changedPriceData.gstPrice = gstPrice;
            changedPriceData.paymentFee = paymentFee;
            changedPriceData.total = numberChange((changedPriceData.planDiscountedPrice - changedPriceData?.slotDiscountPrice - changedPriceData?.couponDiscountPrice + gstPrice + paymentFee - previousSubscriptionAmountAvailable), 2);
            console.log('paymentFeepaymentFee', paymentFee,changedPriceData)
            setPriceData({ ...changedPriceData });

            const backAction = () => {
                goBackFunction();
                return true;
            }


            // prevent back

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();

            // prevent back

        }, [newCleaningService, feesData?.data?.data, beforeUpgradeSubscriptionDetail?.data?.data])
    )

    useEffect(() => {
        beforeUpgradeSubscriptionDetail.refetch();
    }, [newCleaningService?.beforeUpgradeSubscriptionId])

    console.log('pricedataattaa', priceData)

    const confirmProceed = () => {
        if (checkIsSubscriptionCreated()) {
            handlePlaceOrder()
        }
        else {
            confirmAlert(
                "Do you want confirm to place order once confirmed you can not edit datas",
                () => {
                    handlePlaceOrder()
                },
                () => { }
            );
        }
    }

    console.log('offsetttt', new Date().getTimezoneOffset());

    const handlePlaceOrder = async () => {
        setDisableStatus(true);



        let sendData = {
            vehicleId: newCleaningService?.vehicleId,
            packageId: newCleaningService?.packageId,
            planId: newCleaningService?.planId,
            brandId: newCleaningService?.brandId,
            brandVehicleId: newCleaningService?.brandVehicleId,

            packageActiveDate: newCleaningService?.customerDetail?.packageActiveDate ? new Date(newCleaningService?.customerDetail?.packageActiveDate) : (newCleaningService?.selectedDateSlot?.date ? new Date(newCleaningService?.selectedDateSlot?.date) : (newCleaningService?.from == constantData?.packageSubsriptionFrom.renew ? new Date() : new Date(new Date().setDate(new Date().getDate() + 1)))),
            slotType: newCleaningService?.selectedSlotType,
            serviceStartTime: {
                hour: newCleaningService?.customerDetail?.serviceStartTime ? numberChange(newCleaningService?.customerDetail?.serviceStartTime?.hour) : numberChange(newCleaningService?.selectedTimeSlot?.startHour),
                minute: newCleaningService?.customerDetail?.serviceStartTime ? numberChange(newCleaningService?.customerDetail?.serviceStartTime?.minute) : numberChange(newCleaningService?.selectedTimeSlot?.statMinute),
                display: newCleaningService?.customerDetail?.serviceStartTime ? (newCleaningService?.customerDetail?.serviceStartTime?.display) : newCleaningService?.selectedTimeSlot?.startTime,
            },
            serviceEndTime: (
                onTime
                    ?
                    {}
                    :
                    {
                        hour: numberChange(newCleaningService?.selectedTimeSlot?.endHour),
                        minute: numberChange(newCleaningService?.selectedTimeSlot?.endMinute),
                        display: newCleaningService?.selectedTimeSlot?.endTime,
                    }
            ),
            duration: newCleaningService?.duration,


            latitude: newCleaningService?.latitude,
            longitude: newCleaningService?.longitude,
            sector: newCleaningService?.sector,
            apartmentName: newCleaningService?.customerDetail?.apartmentName,
            name: newCleaningService?.customerDetail?.name,
            emailId: newCleaningService?.customerDetail?.emailId,
            gender: newCleaningService?.customerDetail?.gender,
            address: newCleaningService?.customerDetail?.address,
            area: newCleaningService?.customerDetail?.area,
            landmark: newCleaningService?.customerDetail?.landmark,
            city: newCleaningService?.customerDetail?.city,
            state: newCleaningService?.customerDetail?.state,
            country: newCleaningService?.customerDetail?.country,
            blockNo: newCleaningService?.customerDetail?.blockNo,
            flatNo: newCleaningService?.customerDetail?.flatNo,
            registrationNo: newCleaningService?.customerDetail?.registrationNo,
            parkingType: newCleaningService?.customerDetail?.parkingType,
            parkingDetail: newCleaningService?.customerDetail?.parkingDetail,
            instruction: newCleaningService?.customerDetail?.instruction,
            acceptTermsConditions: newCleaningService?.customerDetail?.acceptTermsConditions,


            couponCode: newCleaningService?.couponId,
            timeSlotOffer: numberChange(newCleaningService?.selectedTimeSlot?.offer),
            offsetDifference: new Date().getTimezoneOffset(),
            from: newCleaningService?.from,
            beforeUpgradeSubscriptionId: newCleaningService?.beforeUpgradeSubscriptionId,
        };



        console.log('sendDatasendData', sendData,)

        let resp: any;

        if (checkIsSubscriptionCreated()) {
            resp = {
                status: true,
                message: "Subscribed",
                data: newCleaningService?.newsubscriptionDetail,
            }
        }
        else {
            if (onTime) {
                resp = await oneTimePurchase(sendData);
            }
            else {
                resp = await packageSubscription(sendData);
            }
        }

        // to create new subscription for each select

        // if(onTime){
        //         resp = await oneTimePurchase(sendData);
        //     }
        //     else{
        //         resp = await packageSubscription(sendData);
        //     }
        // to create new subscription for each select

        console.log('packageSubscribe_resp', resp)
        if (resp?.status) {
            dispatch(
                setNewCleaningService({
                    newsubscriptionDetail: resp?.data
                })
            );
            let completePayment = await UsePayment({
                _id: resp?.data?._id,
                email: resp?.data?.emailId,
                contact: userData?.mobileNo,
                name: resp?.data?.name,
            });
            console.log('completePaymentcompletePayment', completePayment);
            if (completePayment?.status) {
                toastFn(completePayment?.message ?? "Subscription completed");
                dispatch(
                    removeNewCleaningService()
                );
                navigation.navigate('PlaceOrder');
                setTimeout(() => {
                    navigation.navigate('Booking', { onTime: onTime ? true : false });
                }, 3000);
            }
            else {
                toastFn(completePayment?.message ?? "Try-Again")
            }
        }
        else {
            toastFn(resp?.message ?? "Try-Again")
        }
        setDisableStatus(false);
    };

    const checkIsSubscriptionCreated = () => {
        if (newCleaningService?.newsubscriptionDetail?._id) {
            return true;
        }
        return false;
    }

    console.log('newCleaningServicenewCleaningService',newCleaningService)

    // const removeSubscription = 

    const goBackFunction = () => {
        if (checkIsSubscriptionCreated()) {
            confirmAlert(
                "Do you want to go back,the data you filled will be cleared",
                async () => {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "Bottomtab" }],
                        })
                    );
                    let sendData = {
                        subscriptionId: newCleaningService?.newsubscriptionDetail?._id,
                    }
                    // let check = await deletePackageSubscription(sendData);
                    // console.log('chekchdkcddd',check)
                    deletePackageSubscription(sendData);
                    dispatch(
                        removeNewCleaningService()
                    );
                },
                () => { }
            );
        }
        else {
            navigation.goBack()
        }
    }

    const goToVehicleSelect = () => {
        if (!checkIsSubscriptionCreated()) {
            navigation.goBack();
            navigation.goBack();
            navigation.goBack();
            navigation.goBack();
            navigation.goBack();
        }
    }

    const goToTimeSlot = () => {
        if (!checkIsSubscriptionCreated()) {
            navigation.goBack();
            navigation.goBack();
        }
    }

    const goToCoupon = () => {
        if (!checkIsSubscriptionCreated()) {
            navigation.navigate('Coupon')
        }
    }

    const removeCoupon = () => {
        if (!checkIsSubscriptionCreated()) {
            let setData = {
                couponDiscountPercent: 0,
                couponDiscountPrice: 0,
                couponId: "",
                couponCode: "",
            }
            dispatch(
                setNewCleaningService(setData)
            )
        }
    }


    return (
        <Mainview
            isheader
            headertitle="Payment"

            onleftfn={() => goBackFunction()}
            bottomContent={
                <View style={{ paddingHorizontal: "6%", marginBottom: "5%" }}>
                    <Button title="Place Order" disabled={disableStatus} onPress={() => confirmProceed()} />
                </View>
            }
            isoverlaploader={disableStatus}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.container}>
                    <View style={{ gap: 20 }}>
                        <Text family="GMedium" size="semilarge">Car Details</Text>
                        <Flexcomponent style={[style.detail, { justifyContent: 'space-between', height: windowwidth * 0.25, }]}>
                            <Images type="image" source={newCleaningService?.selectedVehicleDetail?.brandVehicleDetails?.brandVehicleImage ? { uri: returnOriginalFile(newCleaningService?.selectedVehicleDetail?.brandVehicleDetails?.brandVehicleImage) } : icons.Baleno} style={{ width: windowwidth * 0.25, height: windowwidth * 0.3, marginLeft: 10 }} />
                            <View style={{ gap: 15 }}>
                                <Text family="GMedium" size="medium">{newCleaningService?.selectedVehicleDetail?.brandDetails?.brandName} {newCleaningService?.selectedVehicleDetail?.brandVehicleDetails?.brandVehicleName}</Text>
                                <View style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: '#0D442A1A', borderRadius: 5, width: windowwidth * 0.22 }}>
                                    <Text family="GMedium" size="semismall" color={theme.texthilight}>{newCleaningService?.customerDetail?.registrationNo}</Text>
                                </View>
                            </View>

                            {
                                checkIsSubscriptionCreated()
                                    ?
                                    <></>
                                    :
                                    <>
                                        <View style={style.icon}>
                                            <Pressable onPress={() => goToVehicleSelect()}><VectorIcons iconcolor="white" family="Feather" name="edit" size={18} /></Pressable>
                                        </View>
                                    </>
                            }

                            {/* <Pressable onPress={() => navigation.navigate("VehicleManage", { VehicleAdded: false })}><VectorIcons iconcolor="white" family="AntDesign" name="delete" size={18} /></Pressable> */}
                        </Flexcomponent>
                        <Flexcomponent justifyContent='flex-start' style={[style.detail, { paddingVertical: 15, }]}>
                            <Lottie src={lotties.locationLod} style={style.log} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text family="medium" size="semimedium">{capitalizeFirstLetter(newCleaningService?.city)}</Text>
                                <Pressable style={style.arrowDown}>
                                    <VectorIcons family="Ionicons" name="chevron-down" size={windowwidth * 0.04} />
                                    <Text style={{ width: "80%" }} size="semimedium">{newCleaningService?.address}</Text>
                                </Pressable>
                            </View>
                        </Flexcomponent>
                    </View>

                    <View style={{ gap: 20 }}>
                        <Text family="GMedium" size="semilarge">Order Details</Text>
                        <Flexcomponent style={[style.detail, { paddingVertical: 15, gap: 20 }]}>
                            <FastImage
                                source={newCleaningService?.packageDetail?.packageImage ? { uri: returnOriginalFile(newCleaningService?.packageDetail?.packageImage) } : icons.CarSpa}
                                style={{ width: windowwidth * 0.27, height: windowwidth * 0.25, borderRadius: 10, overflow: 'hidden' }}
                            />
                            <View style={{ gap: 5, marginBottom: 15 }}>
                                <Text family="GMedium" size="medium">{newCleaningService?.packageDetail?.subHeading}</Text>
                                <Text family="GBold" size="semilarge" color={theme.green1}>
                                    {
                                        priceData?.planDiscountPercent > 0
                                            ?
                                            <>
                                                ₹ {priceData?.planDiscountedPrice}
                                                <Text family="GRegular" size="semimedium" style={{ textDecorationLine: 'line-through', color: "#727272" }}>₹ {priceData?.planPrice}</Text>

                                            </>
                                            :
                                            <>
                                                ₹ {priceData?.planPrice}
                                            </>
                                    }

                                </Text>
                                <LinearGradient colors={['#1C5E3F', '#002F19']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={{ borderRadius: 25, paddingVertical: 5, width: windowwidth * 0.22 }}>
                                    <Text family="GMedium" size="semimedium" style={{ textAlign: 'center' }} color={theme.activetabtext}>
                                        {
                                        newCleaningService?.packageDetail?.subscriptionType == constantData.subscriptionType.ots
                                            ?
                                            "One Time"
                                            :
                                            capitalizeFirstLetter(newCleaningService?.packageDetail?.planTypeDetail?.planName)
                                        }
                                    </Text>
                                </LinearGradient>
                            </View>
                            <Pressable onPress={() => navigation.navigate("CleaningServiceDetails", { planData: undefined })} style={{ justifyContent: 'flex-end', alignItems: 'flex-end', height: windowwidth * 0.25 }}>
                                <Text family="GRegular" size="semimedium" style={{ textDecorationLine: 'underline' }}>Plan details</Text>
                            </Pressable>
                        </Flexcomponent>
                    </View>

                    <Pressable style={{ gap: 20 }} >
                        <Text family="GMedium" size="semilarge">Apply Offer</Text>
                        <LinearGradient colors={['#1C5E3F', '#002F19']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={{ borderRadius: 25 }}>
                            <Flexcomponent style={[style.coupon, { height: windowwidth * 0.2 }]}>
                                <Pressable style={{ gap: 20 }} onPress={() => goToCoupon()}>
                                    <View style={{ gap: 5, flexDirection: 'row' }}>
                                        <Lottie src={lotties.Offer} style={style.log} width="100%" height="100%" />
                                        <View style={{ gap: 5, }}>
                                            <Text color={theme.activetabtext} family="GMedium" size="medium">
                                                {
                                                    newCleaningService?.couponCode
                                                        ?
                                                        "Coupon Applied"
                                                        :
                                                        "Apply Coupon"
                                                }
                                            </Text>
                                            {
                                                newCleaningService?.couponCode
                                                    ?
                                                    <>
                                                        {/* <Text color={theme.activetabtext} family="GMedium" size="medium">
                                                        Coupon code: {newCleaningService?.couponCode}
                                                    </Text> */}
                                                        <Text color={theme.activetabtext} family="GMedium" size="medium">
                                                            Saved {priceData?.planDiscountPercent}% on your cart
                                                        </Text>
                                                    </>
                                                    :
                                                    <>
                                                        <Text color={theme.activetabtext} family="GMedium" size="medium">
                                                            Save amount on your cart
                                                        </Text>
                                                    </>
                                            }
                                        </View>
                                    </View>
                                </Pressable>
                                {
                                    checkIsSubscriptionCreated()
                                        ?
                                        <></>
                                        :
                                        <Pressable onPress={() => removeCoupon()}>
                                            {
                                                newCleaningService?.couponCode
                                                    ?
                                                    <VectorIcons iconcolor="white" family="AntDesign" name="delete" size={windowwidth * 0.050} />
                                                    :
                                                    <VectorIcons iconcolor="white" family="AntDesign" name="right" size={windowwidth * 0.055} />
                                            }
                                        </Pressable>
                                }
                            </Flexcomponent>
                        </LinearGradient>
                    </Pressable>

                    {
                        onTime
                            ?
                            <View style={{ gap: 20 }}>
                                <View
                                    style={{ gap: 20, flexDirection: 'row' }}
                                >
                                    <Text family="GMedium" size="semilarge">Select date & time</Text>
                                    {
                                        checkIsSubscriptionCreated()
                                            ?
                                            <></>
                                            :
                                            <Pressable
                                                onPress={() => goBackFunction()}
                                                disabled={checkIsSubscriptionCreated()}
                                            >
                                                <VectorIcons iconcolor="black" family="Feather" name="edit" size={18} />
                                            </Pressable>
                                    }

                                </View>
                                <DateTime
                                    disabled={true}
                                    value={new Date(newCleaningService?.customerDetail?.packageActiveDate)}
                                />
                            </View>
                            :
                            <>
                                <TimeSlot
                                    onEdit={() => goToTimeSlot()}
                                    isEditable={!checkIsSubscriptionCreated()}
                                />
                            </>
                    }

                    <View style={{ gap: 20 }}>
                        <Text family="GMedium" size="semilarge">Payment Summary</Text>
                        <Flexcomponent paddingHorizontal='20' style={[style.detail, { paddingVertical: 15, justifyContent: 'space-between', }]}>
                            <View style={{ gap: 10 }}>
                                <Text>Service Charges</Text>
                                {
                                    priceData?.slotDiscount > 0
                                        ?
                                        <Text>Slot Discount({priceData?.slotDiscount}%)</Text>
                                        :
                                        <></>
                                }
                                {
                                    priceData?.couponDiscountPercent > 0
                                        ?
                                        <Text>Coupon Applied({priceData?.couponDiscountPercent}%)</Text>
                                        :
                                        <></>
                                }
                                {
                                    newCleaningService?.beforeUpgradeSubscriptionId
                                        ?
                                        <Text>Previous subscription available amount</Text>
                                        :
                                        <></>
                                }
                                <Text>Payment gateway fee({priceData?.paymentFeePercent}%)</Text>
                                <Text>GST({priceData?.gstPercent}%)</Text>
                                <Text>Total</Text>
                            </View>
                            <View style={{ gap: 10 }}>
                                <Text style={{ textAlign: 'right' }}>₹ {priceData?.planDiscountedPrice}</Text>
                                {
                                    priceData?.slotDiscount > 0
                                        ?
                                        <Text style={{ textAlign: 'right' }}>₹ -{priceData?.slotDiscountPrice}</Text>
                                        :
                                        <></>
                                }
                                {
                                    priceData?.couponDiscountPercent > 0
                                        ?
                                        <Text style={{ textAlign: 'right' }}>₹ -{priceData?.couponDiscountPrice}</Text>
                                        :
                                        <></>
                                }
                                {
                                    newCleaningService?.beforeUpgradeSubscriptionId
                                        ?
                                        <Text style={{ textAlign: 'right' }}>₹ -{priceData?.previousSubscriptionAmountAvailable}</Text>
                                        :
                                        <></>
                                }
                                <Text style={{ textAlign: 'right' }}>₹ {priceData?.paymentFee}</Text>
                                <Text style={{ textAlign: 'right' }}>₹ {priceData?.gstPrice}</Text>
                                <Text style={{ textAlign: 'right' }}>₹ {priceData?.total}</Text>
                            </View>
                        </Flexcomponent>
                    </View>
                </View>
            </ScrollView>

        </Mainview>
    );
}

export default Payment;
