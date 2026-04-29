import React, { useCallback, useState } from "react";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import styles from "./styles";
import { Pressable, ScrollView, View } from "react-native";
import VectorIcons from "../../../Utilities/vectorIcons";
import { borderradius, windowwidth } from "../../../Utilities/dimensions";
import Images, { icons } from "../../../Utilities/images";
import Text from "../../../Components/text";
import FastImage from "@d11/react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { useGetPackageDetailQuery, useGetPackageListQuery } from "../../../Common/redux/vehicleServiceHook";
import { constantData } from "../../../Common/constant";
import { useFocusEffect } from "@react-navigation/native";
import { loginCheck, numberChange, returnArrayOnly, returnOriginalFile } from "../../../Common/commonFunction";
import { setNewCleaningService } from "../../../Common/redux/serviceReducer";
import { useDispatch, useSelector } from "react-redux";

const OnTimeClean: React.FC = () => {


    const dispatch = useDispatch();
    const newCleaningService = useSelector((state: any)=>state?.serviceData?.newCleaningService)
    const selectedPackageDetail = useGetPackageDetailQuery({ packageId: newCleaningService?.packageId });
    const { data, refetch, isLoading, } = useGetPackageListQuery({ type: constantData.subscriptionType.ots, page: 1, limit: 10 });


    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const [loadingStatus, setLoadingStatus] = useState({
        noData: false,
        overLapLoader: false,
        mainLoader: false,
        noDataContent: "No data found",
    })



    const packageList = returnArrayOnly(data?.data);


    // const features = [
    //     "Interior Wet Cleaning",
    //     "Deep Wash & Cleaning",
    //     "Deep Stratifications",
    //     "Prevention Vehicle Finish",
    // ];

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            changeLoadingStatus({
                overLapLoader: isLoading
            })
        }, [isLoading])
    )

    const changeLoadingStatus = (statusObject: any) => {
        setLoadingStatus({
            ...loadingStatus,
            ...statusObject,
        });
    }


    const onPriceSelect = (planData: any, durationData: any) => {
        if (loginCheck()) {

            // let vehicleSquareMetre = numberChange(newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.totalSquareMeter,2) > 0 ? numberChange(newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.totalSquareMeter, 2) : 20;

            // let perDayPrice = 0, monthPrice = 0, perSquareMetreCost = 0;
            // if (newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.vehicleModel == constantData.model.luxury) {
            //     perDayPrice = numberChange((planData?.luxuryVehicleAmount / 30), 2);
            //     monthPrice = perDayPrice * 30;
            //     perSquareMetreCost = numberChange(planData?.luxuryVehicleAmount , 2);
            // }
            // else {
            //     perDayPrice = numberChange((vehicleSquareMetre * numberChange(planData?.normalVehicleAmount)), 2);
            //     monthPrice = perDayPrice * 30;
            //     perSquareMetreCost = numberChange(planData?.normalVehicleAmount , 2);
            // }

            // let planPrice = numberChange(durationData?.price);
            // let planDiscount = numberChange(durationData?.discount);
            // let planDiscountPrice = Math.round(planPrice * (planDiscount / 100));
            // let planDiscountedPrice = numberChange(planDiscount ? (planPrice - planDiscountPrice) : planPrice);

            let vehicleSquareMetre = numberChange(newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.totalSquareMeter) > 0 ? numberChange(newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.totalSquareMeter) : 20;

            let perDayPrice = 0, monthPrice = 0, duration: any = durationData, days = 1;
            if (newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.vehicleModel == constantData.model.luxury) {
                perDayPrice = numberChange((numberChange(planData?.luxuryVehicleAmount)).toFixed(2));
                monthPrice = perDayPrice;
            }
            else {
                perDayPrice = numberChange(((numberChange(vehicleSquareMetre) * numberChange(planData?.normalVehicleAmount))).toFixed(2));
                monthPrice = perDayPrice;
            }
            console.log('perDayPriceperDayPrice', perDayPrice)
            let planPrice = numberChange(perDayPrice * numberChange(days), 2);
            let planDiscount = numberChange(duration?.discount);
            let planDiscountPrice = Math.round(planPrice * (planDiscount / 100));
            let planDiscountedPrice = numberChange((planDiscount ? (planPrice - planDiscountPrice) : planPrice), 2);

            let setData = {
                ...newCleaningService,
                vehicleSquareMetre: vehicleSquareMetre,
                perDayPrice: perDayPrice,
                duration: durationData,
                planId: planData?.planId,
                packageId: planData?._id,
                packageDetail: planData,
                planPrice: planPrice,
                planDiscountPercent: planDiscount,
                planDiscountPrice: planDiscountPrice,
                planDiscountedPrice: planDiscountedPrice,
                couponDiscountPercent: 0,
                couponDiscountPrice: 0,
                couponCode: "",
                couponId: "",
                serviceStartTime: 0,
            }

            // if(newCleaningService?.packageId != setData?.packageId){
            //     setData.selectedSlotType= {};
            //     setData.selectedDateSlot= {};
            //     setData.selectedTimeSlot= {};
            //     setData.slotDiscount= 0;
            //     setData.slotDiscountPrice= 0;
            // }

            dispatch(
                setNewCleaningService(setData)
            )
            selectedPackageDetail.refetch();
            // navigation.navigate('TimeSlot');
            navigation.navigate('CustomerDetails')
        }
        else {
            navigation.navigate('Login', { redirectTo: 'TimeSlot' });
        }
    }


    console.log('pacjalsjjsdata',data)

    return (
        <Mainview
            isheader
            headertitle="One time car cleaning"
            onleftfn={() => navigation.goBack()}
            rightfn={
                <Pressable>
                    <VectorIcons
                        family="Ionicons"
                        name="options-outline"
                    />
                </Pressable>
            }
            isnodata={(packageList?.length<=0 && !loadingStatus?.overLapLoader)?true:false}
            nodatacontent={"No package found"}   
            isscollable={true} 
        >
            
            {

                packageList.map((data, index) => {

                    console.log('jdskskfsdf',data)
                    
                    const features: any = returnArrayOnly(data?.whatsIncluded);

                    let vehicleSquareMetre = numberChange(newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.totalSquareMeter) > 0 ? numberChange(newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.totalSquareMeter) : 20;

                    let perDayPrice = 0, monthPrice = 0, duration: any = data?.duration?.[0], days = 1;
                    if (newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.vehicleModel == constantData.model.luxury) {
                        perDayPrice = numberChange((numberChange(data?.luxuryVehicleAmount)).toFixed(2));
                        monthPrice = perDayPrice;
                    }
                    else {
                        perDayPrice = numberChange(((numberChange(vehicleSquareMetre) * numberChange(data?.normalVehicleAmount))).toFixed(2));
                        monthPrice = perDayPrice;
                    }
                    console.log('perDayPriceperDayPrice',perDayPrice)
                    let planPrice = numberChange(perDayPrice * numberChange(days), 2);
                    let planDiscount = numberChange(duration?.discount);
                    let planDiscountPrice = Math.round(planPrice * (planDiscount / 100));
                    let planDiscountedPrice = numberChange((planDiscount ? (planPrice - planDiscountPrice) : planPrice), 2);
                    
                    console.log('planPriceplanPrice',planPrice,perDayPrice,duration, vehicleSquareMetre, newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.vehicleModel, newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.totalSquareMeter)
                    // const duration = data?.duration?.[0];
                    
                    // let planDiscount = numberChange(duration?.discount),
                    //     planPrice = numberChange(duration?.price);
                    // let planDiscountPrice = Math.round(planPrice * (planDiscount / 100));
                    // let planDiscountedPrice = numberChange(planDiscount ? (planPrice - planDiscountPrice) : planPrice);

                    return (
                        <View key={index} style={style.onTimeContainer}>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',

                                }}>
                                <View >
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={["#1C5E3F", "#002F19"]}
                                        style={{
                                            paddingVertical: 10,
                                            paddingHorizontal: 10,
                                            borderRadius: borderradius * 0.5,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginTop: "2.5%",
                                            marginBottom: "5%"

                                        }}
                                    >
                                        <Text color={theme.activetabtext}>Recommended</Text>
                                    </LinearGradient>
                                </View>

                                <View style={style.rating}>
                                    <Images type="image" source={icons.Ratings} style={{ width: windowwidth * 0.03, height: windowwidth * 0.06, marginBottom: 2 }} />
                                    <Text family="GRegular" size="semimedium" style={{ color: 'white' }}>4.5</Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 15,
                                }}>
                                <View style={{ gap: 8 }}>
                                    <Text family="GMedium" size="medium">
                                        {data?.subHeading}
                                    </Text>
                                    {
                                        features?.length > 0
                                            ?
                                            features.map((item: any, i: number) => (
                                                <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text size="extralarge" style={{ lineHeight: 18, marginRight: 6 }}>
                                                        {'\u2022'}
                                                    </Text>
                                                    <Text family="GRegular" size="semimedium">{item?.text}</Text>
                                                </View>
                                            ))
                                            :
                                            <>
                                                <Text family="GRegular" size="semimedium">No features</Text>
                                            </>
                                    }
                                </View>

                                <View style={{ gap: 10 }}>
                                    <FastImage
                                        source={data?.packageImage?{uri:returnOriginalFile(data?.packageImage)}:icons.carSpaOT}
                                        style={{
                                            width: windowwidth * 0.34,
                                            height: windowwidth * 0.25,
                                            borderRadius: 10,
                                            overflow: 'hidden'
                                        }}
                                    />
                                    <Pressable style={style.tag} onPress={() => navigation.navigate("CleaningServiceDetails",{ planData: data })}>
                                        <Text style={{ textAlign: 'center' }} family="GRegular" size="semimedium">
                                            View details
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>

                            <View style={style.btn}>
                                <View style={style.priceBtn}>
                                    {
                                        numberChange(planDiscountPrice) > 0
                                            ?
                                            <>
                                                <Text color={theme.activetabtext} family="GRegular" size="semimedium"
                                                    style={{ textDecorationLine: 'line-through' }} >
                                                    ₹ {planPrice}
                                                </Text>
                                            </>
                                            :
                                            <></>
                                    }

                                    <Text family="GBold" color={theme.activetabtext} size="semimedium">₹ {planDiscountedPrice}</Text>
                                </View>
                                <Pressable style={style.addToCart} onPress={() => onPriceSelect(data, duration)}>
                                    <VectorIcons
                                        family="Ionicons"
                                        name="add-circle"
                                        iconcolor={theme.activetabtext}
                                        size={20}
                                    />
                                    <Text color={theme.activetabtext} family="GMedium" size="semimedium">
                                        Add to cart
                                    </Text>
                                </Pressable>
                            </View>

                        </View>
                    )
                })
            }


        </Mainview >
    )
}

export default OnTimeClean;