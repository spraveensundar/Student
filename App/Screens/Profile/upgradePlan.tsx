import React, { useCallback, useEffect, useState } from "react";
import Mainview from "../../Components/mainview";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { ImageBackground, Pressable, View } from "react-native";
import Text from "../../Components/text";
import { windowwidth } from "../../Utilities/dimensions";
import Images, { icons } from "../../Utilities/images";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { useGetMySubscriptionPackagesListQuery, useGetPlansListQuery } from "../../Common/redux/vehicleServiceHook";
import { constantData } from "../../Common/constant";
import { capitalizeFirstLetter, formatDate, getPlanTypeValue, isEmpty, returnArrayOnly, returnOriginalFile } from "../../Common/commonFunction";
import { useFocusEffect } from "@react-navigation/native";
import { Dropdown } from "../../Components/Field";
import { setNewCleaningService } from "../../Common/redux/serviceReducer";
import { useDispatch } from "react-redux";

const UpgradePlan: React.FC = () => {



    const { data, isLoading, refetch } = useGetMySubscriptionPackagesListQuery({ type: constantData.subscriptionFilter.active, page: 1, limit: Number.MAX_SAFE_INTEGER, subscriptionType: constantData.subscriptionType.subscribe, });
    const planData: any = useGetPlansListQuery({ page: 1, limit: 10 });
    const dispatch = useDispatch();


    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const [subscriptionDetail, setSubscriptionDetail] = useState<any>({});
    const [subscriptionList, setSubscriptionList] = useState<any>([]);
    const [planList, setPlanList] = useState<any>([]);
    const [upgradePlanList, setUpgradePlanList] = useState<any>([]);


    useFocusEffect(
        useCallback(() => {
            refetch();
            planData?.refetch();
        }, [])
    )

    useEffect(() => {
        let currList = returnArrayOnly(data?.data)
        setSubscriptionList(currList);
        if (currList.length > 0 && isEmpty(subscriptionDetail)) {
            setSubscriptionDetail(currList[0]);
        }
    }, [data?.data]);

    console.log('data?.data', data?.data)

    useEffect(() => {
        let currList = returnArrayOnly(planData?.data?.data).map((value) => {
            return {
                ...value,
                hierarchyValue: getPlanTypeValue(value?.planName)
            }
        })
        setPlanList(currList);
    }, [planData?.data?.data]);

    useEffect(() => {
        if (subscriptionDetail?._id && planList?.length > 0) {
            let currPlanList = returnArrayOnly(planList);
            let correctUpgradePlanList = currPlanList.filter((check) => check?.hierarchyValue > getPlanTypeValue(subscriptionDetail?.planDetails?.planName))
            setUpgradePlanList(correctUpgradePlanList);
        }
    }, [planList, subscriptionDetail])


    console.log('planListplanList', planList, subscriptionList, subscriptionDetail, upgradePlanList);

    const onSubmit = (planDetail: any) => {
        let sendData = {
            serviceType: subscriptionDetail?.subscriptionType,
            blockNo: subscriptionDetail?.blockNo,
            apartmentName: subscriptionDetail?.apartmentName,
            sector: subscriptionDetail?.sector,
            area: subscriptionDetail?.area,
            city: subscriptionDetail?.city,
            latitude: subscriptionDetail?.subscriptionLocation?.coordinates?.[1],
            longitude: subscriptionDetail?.subscriptionLocation?.coordinates?.[0],
            address: subscriptionDetail?.address,
            // addressData: subscriptionDetail?.addressData,
            vehicleId: subscriptionDetail?.vehicleId,
            brandId: subscriptionDetail?.brandId,
            brandVehicleId: subscriptionDetail?.brandVehicleId,
            selectedVehicleDetail: subscriptionDetail?.selectedVehicle,
            // vehicleSquareMetre: subscriptionDetail?.vehicleSquareMetre,
            // perDayPrice: subscriptionDetail?.perDayPrice,
            // monthPrice: subscriptionDetail?.monthPrice,
            // duration: subscriptionDetail?.durationData,
            // planId: subscriptionDetail?.planId,
            // packageId: subscriptionDetail?._id,
            // packageDetail: subscriptionDetail,
            // planPrice: subscriptionDetail,
            // planDiscountPercent: subscriptionDetail,
            // planDiscountPrice: subscriptionDetail,
            // planDiscountedPrice: subscriptionDetail,
            // couponDiscountPercent: 0,
            // couponDiscountPrice: 0,
            // couponCode: "",
            // couponId: "",
            customerDetail: {
                name: subscriptionDetail?.name,
                emailId: subscriptionDetail?.emailId,
                gender: subscriptionDetail?.gender,
                address: subscriptionDetail?.address,
                sector: subscriptionDetail?.sector,
                area: subscriptionDetail?.area,
                city: subscriptionDetail?.city,
                state: subscriptionDetail?.state,
                country: subscriptionDetail?.country,
                flatNo: subscriptionDetail?.flatNo,
                blockNo: subscriptionDetail?.blockNo,
                registrationNo: subscriptionDetail?.registrationNo,
                parkingType: subscriptionDetail?.parkingType,
                parkingDetail: subscriptionDetail?.parkingDetail,
                instruction: subscriptionDetail?.instructions,
                latitude: subscriptionDetail?.subscriptionLocation?.coordinates?.[1],
                longitude: subscriptionDetail?.subscriptionLocation?.coordinates?.[0],
            },
            from: constantData.packageSubsriptionFrom.upgrade,
            newPlanId: planDetail?._id,
            newPlanDetail: planDetail,
            beforeUpgradeSubscriptionId: subscriptionDetail?._id,
        }
        dispatch(
            setNewCleaningService({
                ...sendData
            })
        );
        navigation.navigate("CleaningService");
    }


    return (
        <Mainview
            isheader={true}
            headertitle="Upgrade Plan"
            onleftfn={() => navigation.goBack()}
            isscollable={true}
            ismainloading={isLoading}
            isnodata={(subscriptionList?.length > 0 && !isLoading) ? false : true}
            nodatacontent="No Subscription yet"
        >

            <View style={{ marginTop: "5%" }}>
                <Dropdown
                    label="Vehicle Registration Number"
                    placeholder="Select vehicle"
                    list={subscriptionList}
                    labelField="registrationNo"
                    onChange={(e) => setSubscriptionDetail(e)}
                />
            </View>

            {
                subscriptionList?.length > 0
                    ?
                    <>
                        <View style={{ marginTop: "5%", gap: 20 }}>
                            <Text family="GMedium" size="semilarge">Current plan</Text>
                            <View style={{ width: windowwidth * 0.88, }}>
                                <ImageBackground
                                    // source={icons.PrmCard}
                                    source={{ uri: returnOriginalFile(subscriptionDetail?.planDetails?.backImage) }}
                                    borderRadius={28}
                                    resizeMode="cover"
                                    style={{ width: windowwidth * 0.88, height: windowwidth * 0.6, }}>
                                    <View style={{ gap: 10, padding: 25 }}>
                                        <View style={style.premLg}>
                                            <Images
                                                type="image"
                                                // source={icons.SPremium}
                                                source={{ uri: returnOriginalFile(subscriptionDetail?.planDetails?.frontImage) }}
                                                style={{
                                                    width: windowwidth * 0.09,
                                                    height: windowwidth * 0.09,
                                                }}
                                            />
                                        </View>
                                        <Text family="GMedium" size="large" style={{ textAlign: 'left', color: 'white' }}>
                                            {capitalizeFirstLetter(subscriptionDetail?.planDetails?.planName)} Plan
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
                                        <Text family="GRegular" size="xmedium" style={{ textAlign: 'left', color: 'white' }}>Plan Ends - {formatDate(subscriptionDetail?.endDate)}</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                            <Text family="GMedium" size="semilarge">Upgrade plan</Text>

                            {
                                (upgradePlanList.length > 0 && subscriptionDetail?._id)
                                    ?
                                    <>
                                        {
                                            upgradePlanList.map((value: any) => {

                                                return (
                                                    <Pressable
                                                        onPress={() => onSubmit(value)}
                                                    >
                                                        <ImageBackground
                                                            source={{ uri: returnOriginalFile(value?.backImage) }}
                                                            borderRadius={28}
                                                            resizeMode="cover"
                                                            style={{ width: windowwidth * 0.88, height: windowwidth * 0.35, overflow: 'hidden' }}
                                                        >
                                                            <View style={{ gap: 10, padding: 25, }}>
                                                                <View style={[style.premLg, { backgroundColor: "#D3F3FF" }]}>
                                                                    <Images
                                                                        type="image"
                                                                        source={{ uri: returnOriginalFile(value?.frontImage) }}
                                                                        style={{
                                                                            width: windowwidth * 0.09,
                                                                            height: windowwidth * 0.09,
                                                                        }}
                                                                    />
                                                                </View>
                                                                <Text family="GBold" size="large" style={{ color: 'white', textAlign: 'left' }}>
                                                                    {capitalizeFirstLetter(value?.planName)} Plan
                                                                </Text>
                                                                <LinearGradient
                                                                    colors={['#D69432', '#F5E78A']}
                                                                    start={{ x: 0.5, y: 0 }}
                                                                    end={{ x: 0.5, y: 1 }}
                                                                    style={{
                                                                        position: 'absolute',
                                                                        bottom: -1,
                                                                        right: 0,
                                                                        paddingHorizontal: 12,
                                                                        paddingVertical: 8,
                                                                        borderTopLeftRadius: 10,
                                                                        borderTopRightRadius: 10,
                                                                        borderBottomRightRadius: 25,
                                                                    }}
                                                                >
                                                                    <Text family="GMedium" size="medium">Most Favorite</Text>
                                                                </LinearGradient>
                                                            </View>
                                                        </ImageBackground>
                                                    </Pressable>
                                                )
                                            })
                                        }
                                        {/* <ImageBackground
                                            source={icons.PremiumPlan}
                                            borderRadius={28}
                                            resizeMode="cover"
                                            style={{ width: windowwidth * 0.88, height: windowwidth * 0.35, overflow: 'hidden' }}
                                        >
                                            <View style={{ gap: 10, padding: 25, }}>
                                                <View style={[style.premLg, { backgroundColor: "#D3F3FF" }]}>
                                                    <Images type="image" source={icons.PrmPlan} style={{
                                                        width: windowwidth * 0.09, height: windowwidth * 0.09,
                                                    }} />
                                                </View>
                                                <Text family="GBold" size="large" style={{ color: 'white', textAlign: 'left' }}>
                                                    Premium Plan
                                                </Text>
                                                <LinearGradient
                                                    colors={['#D69432', '#F5E78A']}
                                                    start={{ x: 0.5, y: 0 }}
                                                    end={{ x: 0.5, y: 1 }}
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: -1,
                                                        right: 0,
                                                        paddingHorizontal: 12,
                                                        paddingVertical: 8,
                                                        borderTopLeftRadius: 10,
                                                        borderTopRightRadius: 10,
                                                        borderBottomRightRadius: 25,
                                                    }}
                                                >
                                                    <Text family="GMedium" size="medium">Most Favorite</Text>
                                                </LinearGradient>
                                            </View>
                                        </ImageBackground>
                                        <ImageBackground
                                            source={icons.ElitePlan}
                                            borderRadius={28}
                                            resizeMode="cover"
                                            style={{ width: windowwidth * 0.88, height: windowwidth * 0.35, overflow: 'hidden' }}
                                        >
                                            <View style={{ gap: 10, padding: 25, }}>
                                                <View style={[style.premLg, { backgroundColor: "#D3F3FF" }]}>
                                                    <Images type="image" source={icons.Elite} style={{
                                                        width: windowwidth * 0.09, height: windowwidth * 0.09,
                                                    }} />
                                                </View>
                                                <Text family="GBold" size="large" style={{ color: 'white', textAlign: 'left' }}>
                                                    Elite Plan
                                                </Text>
                                                <LinearGradient
                                                    colors={['#D69432', '#F5E78A']}
                                                    start={{ x: 0.5, y: 0 }}
                                                    end={{ x: 0.5, y: 1 }}
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: -1,
                                                        right: 0,
                                                        paddingHorizontal: 12,
                                                        paddingVertical: 8,
                                                        borderTopLeftRadius: 10,
                                                        borderTopRightRadius: 10,
                                                        borderBottomRightRadius: 25,
                                                    }}
                                                >
                                                    <Text family="GMedium" size="medium">Most Favorite</Text>
                                                </LinearGradient>
                                            </View>
                                        </ImageBackground> */}
                                    </>
                                    :
                                    <>
                                        <Text family="GMedium" size="semilarge">No upgrades for this plan</Text>
                                    </>
                            }


                        </View>
                    </>
                    :
                    <></>
            }

        </Mainview>
    )
}

export default UpgradePlan;