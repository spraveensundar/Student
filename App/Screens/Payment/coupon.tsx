import React, { useCallback, useState } from "react";
import Mainview from "../../Components/mainview";
import useCustomHooks from "../../Actions/Hooks/customhook";
import styles from "./styles";
import { View, TextInput, Pressable } from "react-native";
import Text from "../../Components/text";
import LinearGradient from "react-native-linear-gradient";
import Images, { icons } from "../../Utilities/images";
import { Button } from "../../Components/Field";
import { color } from "react-native-elements/dist/helpers";
import { borderwidth, windowheight, windowwidth } from "../../Utilities/dimensions";
import { useDispatch, useSelector } from "react-redux";
import { useGetPackageDetailQuery } from "../../Common/redux/vehicleServiceHook";
import { useFocusEffect } from "@react-navigation/native";
import { isEmpty, numberChange, returnArrayOnly, toastFn } from "../../Common/commonFunction";
import { setNewCleaningService } from "../../Common/redux/serviceReducer";

const Coupon: React.FC = () => {



    const dispatch = useDispatch();
    const newCleaningService: any = useSelector((state: any) => state?.serviceData?.newCleaningService);
    const selectedPackageDetail = useGetPackageDetailQuery({ packageId: newCleaningService?.packageId });



    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const [couponCode, setCouponCode] = useState("");


    useFocusEffect(
        useCallback(() => {
            selectedPackageDetail?.refetch();
        }, [])
    )

    console.log('selectedPackageDetailselectedPackageDetail', selectedPackageDetail)

    const allCoupons = returnArrayOnly(selectedPackageDetail?.data?.data?.availableCoupons);
    const couponList = allCoupons?.filter((check) => isEmpty(couponCode) || check?.code?.includes(couponCode));

    const couponApply = (couponData?: any) => {

        let currentCouponCode = couponData?.code ? couponData?.code : couponCode;

        if (isEmpty(currentCouponCode)) {
            return toastFn("Enter code to apply");
        }
        if (!allCoupons.some((check) => check?.code == currentCouponCode)) {
            return toastFn("Enter valid code to apply");
        }
        let getCoupon = allCoupons.find((check) => check?.code == currentCouponCode);
        console.log('getCoupon', getCoupon, newCleaningService);
        if (isEmpty(getCoupon)) {
            return toastFn("Invalid coupon");
        }

        let discountPercent = numberChange(numberChange(getCoupon?.discountValue).toFixed());
        let discountPrice = numberChange((numberChange(newCleaningService?.planPrice) * discountPercent / 100).toFixed(2))
        let setData = {
            couponDiscountPercent: discountPercent,
            couponDiscountPrice: discountPrice,
            couponId: getCoupon?._id,
            couponCode: getCoupon?.code,
        }
        dispatch(
            setNewCleaningService(setData)
        )

        navigation.goBack();
        toastFn("Coupon applied")
        // navigation.navigate('Payment', { onTime: false })
    }

    return (
        <Mainview isheader={true}
            headertitle="Coupon Offer"
            onleftfn={() => navigation.goBack()}>
            <View style={style.container}>
                <Text family="GMedium" size="semilarge">Apply Coupon and Earn Benefits</Text>
                <Text family="GRegular" size="semimedium" style={{ lineHeight: 18 }}>
                    Encourage users to invite friends to the platform and reward them with
                    trading bonuses or wallet credits when their friends join and trade.
                </Text>
                <View style={{ position: 'relative', justifyContent: 'center' }}>
                    <TextInput
                        style={style.couponCode}
                        placeholder="Enter Coupon Code"
                        placeholderTextColor="#999"
                        onChangeText={(e) => setCouponCode(e)}
                        value={couponCode}
                    />
                    <Pressable style={style.applyBtn} onPress={() => couponApply()}>
                        <LinearGradient
                            colors={['#1C5E3F', '#002F19']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={{
                                borderRadius: 10,
                                paddingVertical: 10,
                                paddingHorizontal: 24,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text family="GMedium" size="semimedium" color={theme.activetabtext}>
                                Apply
                            </Text>
                        </LinearGradient>
                    </Pressable>
                </View>

                {
                    couponList?.length > 0
                        ?
                        <>
                            {
                                couponList.map((value, index) => {

                                    console.log('couponvalue', value)
                                    let discountPercent = numberChange(numberChange(value?.discountValue).toFixed());
                                    let discountPrice = (numberChange(newCleaningService?.planPrice) * discountPercent / 100).toFixed(2)
                                    const backgroundColour = (index % 2) == 0 ? theme.cardLeft : theme.cardLeft1;
                                    return (
                                        <View style={style.card}>
                                            <View style={[style.cardLeft, { backgroundColor: backgroundColour }]}>
                                                <Text style={{ backgroundColor: theme.activetabtext, width: "40%", height: "15%", borderRadius: 25, position: 'absolute', left: -20 }} />
                                                <Text family="GBold" size="large" color={theme.activetabtext}
                                                    style={{ transform: [{ rotate: "-90deg" }], width: "140%" }} numoflines={1}
                                                >DISCOUNT</Text>
                                            </View>
                                            <View style={{ gap: 20, padding: 15 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 25 }}>
                                                    <View style={{ gap: 5 }}>
                                                        <Text family="GRegular" size="semimedium">Flat {discountPercent}% off*</Text>
                                                        <Text family="GBold" size="large">{value?.code}</Text>
                                                        <Text family="GRegular" size="semimedium">Save ₹{discountPrice} on this transactions.</Text>
                                                        <Text family="GRegular" size="semimedium" color={backgroundColour}>*Terms & conditions</Text>
                                                    </View>
                                                    <Images source={icons.Account} type="image" />
                                                </View>
                                                <View>
                                                    <Button
                                                        textStyle={{ color: theme.primarytext }}
                                                        title={newCleaningService?.couponId == value?._id ? "Applied" : "Apply Code"}
                                                        onPress={() => couponApply(value)}
                                                        buttonStyle={{
                                                            backgroundColor: 'white',
                                                            borderWidth: 1,
                                                            borderColor: '#ECE7F8'
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }

                        </>
                        :
                        <>
                            <Text family="GMedium" size="semimedium">No coupons available</Text>
                        </>
                }

                {/* <View style={style.card}>
                    <View style={[style.cardLeft, { backgroundColor: theme.cardLeft }]}>
                        <Text style={{ backgroundColor: theme.activetabtext, width: "40%", height: "15%", borderRadius: 25, position: 'absolute', left: -20 }} />
                        <Text family="GBold" size="large" color={theme.activetabtext}
                            style={{ transform: [{ rotate: "-90deg" }], width: "140%" }} numoflines={1}
                        >DISCOUNT</Text>
                    </View>
                    <View style={{ gap: 20, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 25 }}>
                            <View style={{ gap: 5 }}>
                                <Text family="GRegular" size="semimedium">Flat $25 off*</Text>
                                <Text family="GBold" size="large">CARFIRST25</Text>
                                <Text family="GRegular" size="semimedium">Save $25 on all transactions.</Text>
                                <Text family="GRegular" size="semimedium" color={theme.cardLeft}>*Terms & conditions</Text>
                            </View>
                            <Images source={icons.Account} type="image" />
                        </View>
                        <View>
                            <Button
                                textStyle={{ color: theme.primarytext }}
                                title="Apply Code"
                                onPress={() => navigation.navigate('Payment', { onTime: false })}
                                buttonStyle={{
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderColor: '#ECE7F8'
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={style.card}>
                    <View style={[style.cardLeft, { backgroundColor: theme.cardLeft1 }]}>
                        <Text style={{ backgroundColor: theme.activetabtext, width: "40%", height: "15%", borderRadius: 25, position: 'absolute', left: -20 }} />
                        <Text family="GBold" size="large" color={theme.activetabtext}
                            style={{ transform: [{ rotate: "-90deg" }], width: "140%" }} numoflines={1}
                        >DISCOUNT</Text>
                    </View>
                    <View style={{ gap: 20, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 25 }}>
                            <View style={{ gap: 5 }}>
                                <Text family="GRegular" size="semimedium">Flat $25 off*</Text>
                                <Text family="GBold" size="large">CARFIRST25</Text>
                                <Text family="GRegular" size="semimedium">Save $25 on all transactions.</Text>
                                <Text family="GRegular" size="semimedium" color={theme.cardLeft1}>*Terms & conditions</Text>
                            </View>
                            <Images source={icons.Account} type="image" />
                        </View>
                        <View>
                            <Button
                                textStyle={{ color: theme.primarytext }}
                                title="Apply Code"
                                onPress={() => navigation.navigate('Payment', { onTime: false })}
                                buttonStyle={{
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderColor: '#ECE7F8'
                                }}
                            />
                        </View>
                    </View>
                </View> */}
            </View>

        </Mainview >
    )


}

export default Coupon;