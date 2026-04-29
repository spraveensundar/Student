import React, { useCallback, useEffect } from "react";
import Mainview from "../../Components/mainview";
import useCustomHooks from "../../Actions/Hooks/customhook";
import styles from "./styles";
import { Pressable, ScrollView, View } from "react-native";
import VectorIcons from "../../Utilities/vectorIcons";
import Text from "../../Components/text";
import Flexcomponent from "../../Components/flexcomponent";
import Card from "../../Components/Card";
import { windowwidth } from "../../Utilities/dimensions";
import Images, { icons, lotties } from "../../Utilities/images";
import Reviews from "../Home/Reviews";
import Banner from "../Home/banner";
import Lottie from "../../Components/lottieview";
import ClnBanner from "./clnBanner";
import { capitalizeFirstLetter, returnArrayOnly, returnOriginalFile } from "../../Common/commonFunction";
import { useSelector } from "react-redux";
import { useGetPackageDetailQuery } from "../../Common/redux/vehicleServiceHook";
import { useFocusEffect } from "@react-navigation/native";

type CleaningServiceDetailsProps = {
    route?: any;
}

const CleaningServiceDetails: React.FC<CleaningServiceDetailsProps> = ({ route }) => {



    const newCleaningService = useSelector((state: any) => state?.serviceData?.newCleaningService)

    console.log('newCleaningServicenewCleaningService', newCleaningService, route?.params, 'djhfds')
    const selectedPackageDetail = useGetPackageDetailQuery({ packageId: route?.params?.planData?._id ? route?.params?.planData?._id : newCleaningService?.packageId });



    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);




    // const faqData = [
    //     {
    //         question: "How long does the car foam wash for take?",
    //     },
    //     {
    //         question: "Can I schedule a foam wash at home?",
    //     },
    //     {
    //         question: "Why car interior spa is important?",
    //     },
    //     {
    //         question: "What is premium plan?",
    //     },
    // ];


    const planData: any = selectedPackageDetail?.data?.data ? selectedPackageDetail?.data?.data : route?.params?.planData;
    const planName: any = (planData?.planTypeDetail?.planName ? capitalizeFirstLetter(planData?.planTypeDetail?.planName) : "Standard");
    const features: any = returnArrayOnly(planData?.whatsIncluded);
    const servicePlans: any = returnArrayOnly(planData?.duration);
    const faqData: any = returnArrayOnly(planData?.faqs);


    console.log('routeroute', planData)

    interface titleprops {
        title: string,
        viewall?: () => void,
        top?: any
    }

    const Titlecomponent = ({
        title,
        top = 0,
    }: titleprops) => {
        return (
            <Flexcomponent justifyContent="space-between" top={top}  >
                <Text size="medium" family="bold"  >{title}</Text>
            </Flexcomponent>
        )
    }


    useFocusEffect(
        useCallback(() => {
            selectedPackageDetail?.refetch();
        }, [])
    )

    console.log('selectedPackageDetail', selectedPackageDetail?.data)


    return (
        <Mainview
            isheader={true}
            headertitle="Car Cleaning service"
            onleftfn={() => navigation.goBack()}
            horizontalpadding={0}
            rightfn={
                <VectorIcons
                    family="Ionicons"
                    name="arrow-redo"
                />
            }
            ismainloading={selectedPackageDetail.isFetching}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <ClnBanner
                    bannerFile={planData?.gifVideo}
                />
                <View style={[style.container, { paddingHorizontal: windowwidth * 0.05, }]}>
                    <View style={{ gap: 20 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <View style={{ gap: 8 }}>
                                <Text family="GMedium" size="medium">{planData?.subHeading ? planData?.subHeading : "Car Interior Spa"}</Text>

                                {
                                    features?.length > 0
                                        ?
                                        features.map((item: any, index: number) => (
                                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                                <Text size="extralarge" style={{ lineHeight: 18, marginRight: 6 }}>{'\u2022'}</Text>
                                                <Text family="GRegular" size="semimedium">{item?.text}</Text>
                                            </View>
                                        ))
                                        :
                                        <View>
                                            <Text>No features</Text>
                                        </View>
                                }

                                {/* {['Interior Wet Cleaning', 'Deep Wash & Cleaning', 'Deep Stratifications'].map((item, index) => (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <Text size="extralarge" style={{ lineHeight: 18, marginRight: 6 }}>{'\u2022'}</Text>
                                        <Text family="GRegular" size="semimedium">{item}</Text>
                                    </View>
                                ))} */}
                            </View>

                            <View style={{ alignItems: 'center', gap: 15 }}>
                                {/* <Lottie
                                    src={lotties.promo}
                                    style={{ width: windowwidth * 0.2, height: windowwidth * 0.2 }}
                                /> */}
                                <Images
                                    type="image"
                                    source={{ uri: returnOriginalFile(planData?.discountImage) }}
                                    width={windowwidth * 0.2}
                                    height={windowwidth * 0.2}
                                />
                                <View style={{ backgroundColor: '#D8FFE3', padding: 8, borderRadius: 5 }}>
                                    <Text family="GMedium" size="semismall" color="#009431" style={{ textAlign: 'center' }}>
                                        {planData?.discountText}
                                    </Text>
                                </View>
                            </View>
                        </View>

                    </View>
                    <View>
                        <Text family="GMedium" size="medium">What’s Included</Text>

                        {
                            features?.length > 0
                                ?
                                <Flexcomponent
                                    justifyContent="space-around"
                                    alignItems="flex-start"
                                    style={{
                                        width: "100%",
                                        marginTop: "5%",
                                        flexWrap: "wrap",
                                        gap: 10,
                                    }}
                                >
                                    {
                                        features.map((item: any, index: number) => (
                                            <View key={index} style={{
                                                width: "30%",
                                                alignItems: "center",
                                                gap: 10,
                                            }}>
                                                <Card containerStyle={{ padding: 20 }} ispress={true}>
                                                    <Images
                                                        type="image"
                                                        source={{ uri: returnOriginalFile(item?.image) }}
                                                        width={windowwidth * 0.15}
                                                        height={windowwidth * 0.15}
                                                    />
                                                </Card>
                                                <Text family="GRegular">{item.text}</Text>
                                            </View>
                                        ))}
                                </Flexcomponent>
                                :
                                <View>
                                    <Text>No features</Text>
                                </View>
                        }


                    </View>
                    <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 10 }} />
                    <Titlecomponent
                        title="Customer Reviews"
                    />
                    <Reviews
                        planId={planData?._id}
                    />
                    <Text size="medium" family="bold" >Frequently Asked Questions</Text>
                    {
                        faqData.map((item: any, index: number) => (
                            <View key={index} style={{
                                backgroundColor: theme.card,
                                borderRadius: 10,
                                padding: 15,
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text family="GRegular" size="semimedium">{item.question}</Text>
                                    <VectorIcons
                                        family="Feather"
                                        name={"chevron-down"}
                                        size={windowwidth * 0.04}
                                    />
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </Mainview>
    )
}

export default CleaningServiceDetails;