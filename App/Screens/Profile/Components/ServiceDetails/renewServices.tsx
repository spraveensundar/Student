import React, { useCallback, useEffect, useState } from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import styles from "./styles";
import { View } from "react-native";
import Text from "../../../../Components/text";
import { Button, Dropdown } from "../../../../Components/Field";
import { useGetMySubscriptionPackagesListQuery } from "../../../../Common/redux/vehicleServiceHook";
import { constantData } from "../../../../Common/constant";
import { useFocusEffect } from "@react-navigation/native";
import { capitalizeFirstLetter, dateToMonthDate, formatDateMonthAlone, isEmpty, returnArrayOnly } from "../../../../Common/commonFunction";
import { setNewCleaningService } from "../../../../Common/redux/serviceReducer";
import { useDispatch } from "react-redux";

const RenewServices: React.FC = () => {


    const { data, isLoading, refetch } = useGetMySubscriptionPackagesListQuery({ type: constantData.subscriptionFilter.active, page: 1,limit: Number.MAX_SAFE_INTEGER, subscriptionType: constantData.subscriptionType.subscribe });
    const dispatch = useDispatch();


    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const [ subscriptionDetail, setSubscriptionDetail ] = useState<any>({});
    const [ subscriptionList, setSubscriptionList ] = useState<any>([]);


    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    );

    useEffect(() => {
        let currList = returnArrayOnly(data?.data)
        setSubscriptionList(currList);
        if (currList.length > 0 && isEmpty(subscriptionDetail)) {
            setSubscriptionDetail(currList[0]);
        }
    }, [data?.data]);

    console.log('subscriptionDetailsubscriptionDetail',subscriptionDetail)

    const onSubmit = () => {
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
            from: constantData.packageSubsriptionFrom.renew,
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
            headertitle="Renew Services"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <>
                    {
                        (subscriptionList?.length > 0 && !isLoading)
                            ?
                            <View style={{ paddingHorizontal: "6%", marginBottom: "5%" }}>
                                <Button title="Renew Services" onPress={() => onSubmit()} />
                            </View>
                            :
                            <></>
                    }
                </>
            }
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
                        
            <View style={{ marginTop: "5%", gap: 20 }}>
                <Text family="GMedium" size="semilarge">
                    Subscription plan details
                </Text>
                <View style={[style.container, { padding: 20 }]}>
                    <View style={{ gap: 20 }}>
                        <Text family="GRegular" size="medium">Subscription Plan</Text>
                        <Text family="GRegular" size="medium">Type</Text>
                        <Text family="GRegular" size="medium">Purchased Month</Text>
                        <Text family="GRegular" size="medium">Begin</Text>
                        <Text family="GRegular" size="medium">Ends</Text>
                        <Text family="GRegular" size="medium">Transaction Amount</Text>
                        <Text family="GRegular" size="medium">Payment Method</Text>
                    </View>
                    <View style={{ gap: 20, alignItems: 'flex-end' }}>
                        <Text family="GMedium" size="medium">{subscriptionDetail?.duration} {subscriptionDetail?.duration>1?'days':'day'}</Text>
                        <Text family="GMedium" size="medium">
                            {
                                subscriptionDetail?.subscriptionType == constantData.subscriptionType.subscribe
                                    ?
                                    `${capitalizeFirstLetter(subscriptionDetail?.planDetails?.planName)} Plan`
                                    :
                                    "One time service"
                            }
                        </Text>
                        <Text family="GMedium" size="medium">{formatDateMonthAlone(subscriptionDetail?.buyDate)}</Text>
                        <Text family="GMedium" size="medium">{dateToMonthDate(subscriptionDetail?.startDate)}</Text>
                        <Text family="GMedium" size="medium">{dateToMonthDate(subscriptionDetail?.endDate)}</Text>
                        <Text family="GMedium" size="medium">₹{subscriptionDetail?.price}</Text>
                        <Text family="GMedium" size="medium">Razor pay</Text>
                    </View>
                </View>
            </View>
        </Mainview>
    )
}

export default RenewServices;