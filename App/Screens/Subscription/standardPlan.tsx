import React from "react";
import { ImageBackground, Pressable, View } from "react-native";
import styles from "./styles";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Images, { icons } from "../../Utilities/images";
import { windowwidth } from "../../Utilities/dimensions";
import Text from "../../Components/text";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "@d11/react-native-fast-image";
import { getItem } from "../../Common/localStorage";
import { capitalizeFirstLetter, loginCheck, numberChange, returnArrayOnly, returnOriginalFile } from "../../Common/commonFunction";
import { useSelector } from "react-redux";
import { constantData } from "../../Common/constant";


type StandardPlanProps = {
    planData: any;
    selectedPackageDetail: any;
    feesData: any;
    onPriceSelect: any;
};

const StandardPlan: React.FC<StandardPlanProps> = ({ planData, selectedPackageDetail, feesData, onPriceSelect }) => {



    const newCleaningService = useSelector((state: any) => state?.serviceData?.newCleaningService)


    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const isUser = getItem('user');


    console.log('planDataplanData', planData, newCleaningService)

    // const features = [
    //     "Interior Wet Cleaning",
    //     "Deep Wash & Cleaning",
    //     "Deep Stratifications",
    //     "Prevention Vehicle Finish",
    //     "Regular Cleaning",
    // ];

    // const servicePlans = [
    //     { months: "1 month", price: 899, discount: 5, label: "Quick Shine", colors: ['#00634D', '#00AF87'], border: theme.green2, bg: theme.green3, textColor: theme.green2 },
    //     { months: "3 month", price: 2697, discount: 10, label: "Quick Shine", colors: ['#16C1FF', '#004963'], border: theme.skyblue, bg: theme.skyblue1, textColor: theme.skyblue },
    //     { months: "6 month", price: 5394, discount: 15, label: "Quick Shine", colors: ['#6510FF', '#33008F'], border: theme.purple, bg: theme.purple1, textColor: theme.purple },
    // ];

    const servicePlanColour = [
        { colors: ['#00634D', '#00AF87'], border: theme.green2, bg: theme.green3, textColor: theme.green2 },
        { colors: ['#16C1FF', '#004963'], border: theme.skyblue, bg: theme.skyblue1, textColor: theme.skyblue },
        { colors: ['#6510FF', '#33008F'], border: theme.purple, bg: theme.purple1, textColor: theme.purple }
    ]

    const planName: any = (planData?.planTypeDetail?.planName ? capitalizeFirstLetter(planData?.planTypeDetail?.planName) : "Standard");
    const features: any = returnArrayOnly(planData?.whatsIncluded);
    const servicePlans: any = returnArrayOnly(planData?.duration);


    const returnServicePlanColourData = (servicePlanData: any) => {
        if (numberChange(servicePlanData?.days) <= 30) {
            return servicePlanColour[0];
        }
        else if (numberChange(servicePlanData?.days) <= 60) {
            return servicePlanColour[1];
        }
        else if (numberChange(servicePlanData?.days) > 60) {
            return servicePlanColour[2];
        }
        else {
            return servicePlanColour[0];
        }
    }

    const daysToMonths = (days: any) => {
        return numberChange(numberChange(days) / 30).toFixed(0);
    }



    console.log('feesDatafeesData', feesData);

    return (
        <View style={{ gap: 10, marginVertical: 20 }}>
            <ImageBackground
                source={planData?.planTypeDetail?.backImage ? { uri: returnOriginalFile(planData?.planTypeDetail?.backImage) } : icons.Stdplan}
                borderRadius={25}
                style={[style.card, { height: windowwidth * 0.35, overflow: 'hidden' }]}
            >
                <View style={style.content}>
                    <View style={[style.premLg, { backgroundColor: "#D3F3FF" }]}>
                        <Images
                            type="image"
                            source={planData?.planTypeDetail?.frontImage ? { uri: returnOriginalFile(planData?.planTypeDetail?.frontImage) } : icons.StandardPlan}
                            style={style.image}
                        />
                    </View>
                    <Text family="GBold" size="large" style={{ color: 'white', textAlign: 'left' }}>
                        {planName} Plan
                    </Text>
                    <LinearGradient
                        colors={['#D69432', '#F5E78A']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            paddingHorizontal: 12,
                            paddingVertical: 8,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            borderBottomRightRadius: 25,
                        }}
                    >
                        <Text family="GMedium" size="medium">Most Favorite</Text>
                    </LinearGradient>
                </View>
            </ImageBackground>

            <View style={{ gap: 20 }}>
                <Text family="bold" size="medium">
                    {
                        planData?.heading
                            ?
                            planData?.heading
                            :
                            `${planName} Plan Cleaning Service`
                    }
                </Text>
                <View style={style.stdCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text family="GMedium" size="medium">
                            {
                                planData?.subHeading
                                    ?
                                    planData?.subHeading
                                    :
                                    "Car Interior Spa"
                            }
                        </Text>
                        <View style={style.rating}>
                            <Images type="image" source={icons.Ratings} style={{ width: windowwidth * 0.03, height: windowwidth * 0.06, marginBottom: 2 }} />
                            <Text family="GRegular" size="semimedium" style={{ color: 'white' }}>4.5</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ gap: 8 }}>
                            {
                                features.length > 0
                                    ?
                                    features.map((value: any, i: number) => (
                                        <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text size="extralarge" style={{ lineHeight: 18, marginRight: 6 }}>{'\u2022'}</Text>
                                            <Text family="GRegular" size="semimedium">{value?.text}</Text>
                                        </View>
                                    ))
                                    :
                                    <Text family="GRegular" size="semimedium">No features</Text>
                            }
                        </View>

                        <View style={{ gap: 10, alignItems: 'center' }}>
                            <FastImage
                                source={planData?.packageImage ? { uri: returnOriginalFile(planData?.packageImage) } : icons.CarSpa}
                                style={{ width: windowwidth * 0.34, height: windowwidth * 0.25, borderRadius: 10, overflow: 'hidden', }}
                            />
                            <Pressable style={style.tag} onPress={() => navigation.navigate("CleaningServiceDetails", { planData: planData })}>
                                <Text family="GRegular" size="semimedium" style={{ color: 'white', textAlign: 'center' }}>View details</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: "5%" }}>
                        {
                            servicePlans?.length > 0
                                ?
                                servicePlans.map((value: any, index: number) => {
                                    const cssData = returnServicePlanColourData(value);
                                    console.log('valuevalue', value, newCleaningService, planData)

                                    let vehicleSquareMetre = numberChange(newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.totalSquareMeter) > 0 ? numberChange(newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.totalSquareMeter) : 20;

                                    let perDayPrice = 0, monthPrice = 0;
                                    if (newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.vehicleModel == constantData.model.luxury) {
                                        perDayPrice = numberChange((numberChange(planData?.luxuryVehicleAmount) / 30).toFixed(2));
                                        monthPrice = perDayPrice * 30;
                                    }
                                    else {
                                        perDayPrice = numberChange(((numberChange(vehicleSquareMetre) * numberChange(planData?.normalVehicleAmount)) / 30).toFixed(2));
                                        monthPrice = perDayPrice * 30;
                                    }

                                    let planPrice = numberChange(perDayPrice * numberChange(value?.days), 2);
                                    let planDiscount = numberChange(value?.discount);
                                    let planDiscountPrice = Math.round(planPrice * (planDiscount / 100));
                                    let planDiscountedPrice = numberChange((planDiscount ? (planPrice - planDiscountPrice) : planPrice), 2);

                                    return (

                                        <Pressable key={index} style={{ borderColor: cssData.border, borderWidth: 1, borderRadius: 10, backgroundColor: cssData.border }}
                                            onPress={() => onPriceSelect(value, planData)} >
                                            <View style={{ ...style.servicePlan, borderColor: cssData.border, backgroundColor: cssData.bg }}>
                                                <View style={style.month}>
                                                    <LinearGradient
                                                        colors={cssData.colors}
                                                        start={{ x: 0, y: 0 }}
                                                        end={{ x: 1, y: 0 }}
                                                        style={style.month}
                                                    >
                                                        <Text family="GMedium" size="semismall" style={{ color: 'white' }}>{value?.days} {numberChange(value?.days) >= 2 ? "days" : "day"}</Text>
                                                    </LinearGradient>
                                                </View>
                                                <View style={{ gap: 1, alignItems: 'center' }}>
                                                    <Text family="bold" size="extralarge" style={{ textAlign: 'center' }}>₹ {planDiscount ? planDiscountedPrice : planPrice}</Text>
                                                    {
                                                        planDiscount > 0
                                                            ?
                                                            <>
                                                                <Text family="GMedium" size="small" style={{ textAlign: 'center', color: cssData.textColor }}>{`Save ${value?.discount}%`}</Text>
                                                                <Text family="GMedium" size="xmedium" style={{ textAlign: 'center', textDecorationLine: 'line-through', color: cssData.textColor }}>{`₹${planPrice}`}</Text>
                                                            </>
                                                            :
                                                            <></>
                                                    }
                                                </View>
                                            </View>
                                            <View style={{ backgroundColor: cssData.border, padding: 5, borderRadius: 10, alignItems: 'center' }}>
                                                <Text family="GMedium" size="semismall" style={{ color: 'white' }}>Book Service</Text>
                                            </View>
                                        </Pressable>
                                    )
                                })
                                :
                                <Text>No Service plans available</Text>
                        }
                    </View>
                </View>
            </View>
        </View>
    );
};

export default StandardPlan;
