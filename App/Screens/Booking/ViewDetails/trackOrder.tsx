import React, { useCallback, useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, View } from "react-native";
import styles from "./styles";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import Mainview from "../../../Components/mainview";
import { Button } from "../../../Components/Field";
import Flexcomponent from "../../../Components/flexcomponent";
import Images, { icons } from "../../../Utilities/images";
import { borderwidth, windowwidth } from "../../../Utilities/dimensions";
import Text from "../../../Components/text";
import VectorIcons from "../../../Utilities/vectorIcons";
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useGetMySubscriptionServiceDetailQuery } from "../../../Common/redux/vehicleServiceHook";
import { useFocusEffect } from "@react-navigation/native";
import { capitalizeFirstLetter, dateToTimeAlone, formatDateWithDay, isEmpty, returnOriginalFile, returnServiceStatusDisplay } from "../../../Common/commonFunction";
import { constantData } from "../../../Common/constant";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'TrackOrder'>;

const TrackOrder: React.FC<Props> = ({ route }) => {


    const { serviceId, subscriptionId } = route.params;


    const { data, refetch, isLoading, } = useGetMySubscriptionServiceDetailQuery({ serviceId: serviceId, subscriptionId: subscriptionId });


    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const [status, setStatus] = useState("On Going");
    const [rating, setRating] = useState(3);
    const [steps, setSteps] = useState([
        { title: "Cleaner assigned", subtitle: "21st Sept, 2021 | 15:02", status: "completed" },
        { title: "Cleaner arrived", subtitle: "21st Sept, 2021 | 15:02", status: "completed" },
        { title: "Car wash in progress", subtitle: "In Progress", status: "pending" },
        { title: "Car Wash Completed", status: "pending" },
    ]);
    const [subscriptionDetail, setSubscriptionDetail] = useState<any>({});
    const [serviceDetail, setServiceDetail] = useState<any>({});


    const completeAllSteps = () => {
        setStatus("Completed");

        const updatedSteps = steps.map(step => ({ ...step, status: "completed" }));
        setSteps(updatedSteps);
    };

    const onTime = true;

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    )

    useEffect(() => {
        setServiceDetail({ ...data?.data });
        setSubscriptionDetail({ ...data?.data?.subscriptionDetail });
    }, [data?.data])

    useEffect(() => {
        if (!isEmpty(serviceDetail?.status)) {
            let currentSteps = [
                { title: "Cleaner not assigned", subtitle: "waiting to assign", status: "pending" },
                { title: "Cleaner not arrived", subtitle: "cleaner not arrived", status: "pending" },
                { title: "Car wash in progress", status: "pending" },
                { title: "Car Wash Completed", status: "pending" },
            ];
            if (serviceDetail?.servicemanId) {
                currentSteps[0] = { title: "Cleaner assigned", subtitle: "Assigned for you", status: "completed" };
                if (serviceDetail?.reachedStatus == constantData.servicemanReachStatus.onTheWay) {
                    currentSteps[1] = { title: "Cleaner on the way", subtitle: "Cleaner is on the way", status: "pending" };
                }
                else if (
                    serviceDetail?.reachedStatus == constantData.servicemanReachStatus.reached || 
                    serviceDetail?.status == constantData.serviceStatus.started ||
                    serviceDetail?.status == constantData.serviceStatus.completed
                ) {
                    currentSteps[1] = { title: "Cleaner arrived", subtitle: "Cleaner arrived", status: "completed" };
                    if (serviceDetail?.status == constantData.serviceStatus.started || serviceDetail?.status == constantData.serviceStatus.completed) {
                        if (serviceDetail?.status == constantData.serviceStatus.completed) {
                            currentSteps[2] = { title: "Car wash", subtitle: "Completed", status: "completed" };
                            currentSteps[3] = { title: "Car Wash Completed", status: "completed" };
                        }
                        else{
                            currentSteps[2] = { title: "Car wash in progress", subtitle: "In Progress", status: "completed" };
                        }
                    }
                }
                else {

                }
            }
            else {
                currentSteps = [
                    { title: "Cleaner not assigned", subtitle: "waiting to assign", status: "pending" },
                    { title: "Car wash in progress", status: "pending" },
                    { title: "Car Wash Completed", status: "pending" },
                ]
            }

            setSteps([...currentSteps]);
        }
    }, [serviceDetail]);

    // const returnStatus = () => {
    //     if (serviceDetail?.isSkiped) {
    //         return "Skipped"
    //     }
    //     else if (serviceDetail?.isCancelled) {
    //         return "Cancelled"
    //     }
    //     else {
    //         return capitalizeFirstLetter(serviceDetail?.status);
    //     }
    // }

    const isServiceCompleted = () => {
        if (serviceDetail?.status === constantData.serviceStatus.completed) {
            return true;
        }
        return false;
    }

    console.log('subscriptionDetailsubscriptionDetail', subscriptionDetail, serviceDetail, serviceId)

    return (
        <Mainview
            isheader
            headertitle="Track Order"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <>
                    {
                        isServiceCompleted()
                            ?
                            (
                                <View style={{ paddingHorizontal: "6%", marginBottom: "5%", gap: 10, paddingTop: "5%", }}>
                                    <Button
                                        title="Review & Ratings"
                                        onPress={() => navigation.navigate('Review', { serviceDetail: serviceDetail, from: constantData.reviewFrom.vehicleService })}
                                        buttonStyle={{
                                            backgroundColor: onTime ? "transparent" : theme.btnColor,
                                            borderWidth: 1,
                                            borderColor: onTime ? theme.btnColor : "transparent",
                                        }}
                                        textStyle={{ color: onTime ? theme.btnColor : '' }} />
                                </View>
                            )
                            :
                            <>
                                {
                                    subscriptionDetail?.isSubscriptionCancelled
                                        ?
                                        <View style={{ paddingHorizontal: "6%", marginBottom: "5%", gap: 10, paddingTop: "5%", }}>
                                            <Button title="Subscription Cancelled" />
                                        </View>
                                        :
                                        <View style={{ paddingHorizontal: "6%", marginBottom: "5%", gap: 10, paddingTop: "5%", }}>
                                            <Button title="AddOn Features" onPress={() => navigation.navigate('AddOns', { serviceId: serviceDetail?._id, subscriptionId: serviceDetail?.subscriptionId })} />
                                        </View>
                                }

                            </>
                    }
                </>
            }
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={style.ordrDtls}>
                    <Flexcomponent
                        style={style.detail}
                        paddingHorizontal={10}
                        justifyContent="space-between"
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Images
                                type="image"
                                source={
                                    subscriptionDetail?.brandVehicleDetails?.brandVehicleImage
                                        ?
                                        { uri: returnOriginalFile(subscriptionDetail?.brandVehicleDetails?.brandVehicleImage) }
                                        :
                                        icons.Swift
                                }
                                style={{
                                    width: windowwidth * 0.2,
                                    borderRadius: 10,
                                    marginRight: 10
                                }}
                            />
                            <View style={{ gap: 10 }}>
                                <Text family="GBold" size="medium">
                                    {subscriptionDetail?.brandVehicleDetails?.brandName} {subscriptionDetail?.brandVehicleDetails?.brandVehicleName}
                                </Text>
                                <Text
                                    family="GRegular"
                                    size="medium"
                                    color={theme.texthilight}
                                >
                                    {subscriptionDetail?.registrationNo}
                                </Text>
                            </View>
                        </View>

                        <View>
                            <Pressable

                                style={[style.stsBtn, {
                                    backgroundColor: isServiceCompleted() ? "#02BC7D" : "#DD9E40"
                                }]}
                            // onPress={completeAllSteps}
                            >
                                <Text
                                    family="GBold"
                                    size="semimedium"
                                    color={theme.activetabtext}
                                >
                                    {returnServiceStatusDisplay(serviceDetail)}
                                </Text>
                            </Pressable>
                        </View>
                    </Flexcomponent>

                    <View style={[style.card, { padding: 0 }]}>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: '#CFCFCF',
                            }}
                        >
                            <View style={{ gap: 5 }}>
                                <Text family="GMedium" size="semilarge">
                                    {
                                        serviceDetail?.subscriptionType == constantData.subscriptionType.subscribe
                                            ?
                                            capitalizeFirstLetter(subscriptionDetail?.planDetails?.planName)
                                            :
                                            "One Time Service"
                                    }

                                </Text>
                                <Text family="GRegular" size="medium">
                                    Booking ID: {serviceDetail?.serviceUniqueId}
                                </Text>
                            </View>

                            <VectorIcons
                                family="Ionicons"
                                name="information-circle"
                                size={30}
                            />
                        </View>

                        <View style={{ gap: 15, marginTop: 10, paddingHorizontal: 20 }}>
                            <Text family="GBold" size="semilarge">
                                {subscriptionDetail?.subscriptionPackage?.heading}
                            </Text>
                            {
                                isServiceCompleted()
                                    ?
                                    <View style={{ flexDirection: 'row', }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Pressable key={star} onPress={() => setRating(star)}>
                                                <VectorIcons
                                                    family="Ionicons"
                                                    name={star <= serviceDetail?.rating ? "star" : "star-outline"}
                                                    size={14}
                                                    iconcolor="#FB9506"
                                                    style={{ marginRight: 4 }}
                                                />
                                            </Pressable>
                                        ))}
                                    </View>
                                    :
                                    <></>
                            }

                            <View
                                style={{
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    gap: 4
                                }}
                            >
                                <View>
                                    <Text family="GBold" size="semimedium">
                                        DATE
                                    </Text>
                                    <Text family="GRegular" size="small">
                                        {formatDateWithDay(new Date(serviceDetail?.serviceStartTime))}
                                    </Text>
                                </View>

                                <View>
                                    <Text family="GBold" size="semimedium">
                                        {
                                            isServiceCompleted()
                                                ?
                                                "Duration Time"
                                                :
                                                "Start Time"
                                        }
                                    </Text>
                                    <Text family="GRegular" size="small">
                                        {
                                            isServiceCompleted()
                                                ?
                                                `${dateToTimeAlone(new Date(serviceDetail?.serviceStartDateTime))} - ${dateToTimeAlone(new Date(serviceDetail?.serviceEndDateTime))}`
                                                :
                                                dateToTimeAlone(new Date(serviceDetail?.serviceStartTime))
                                        }

                                    </Text>
                                </View>
                            </View>
                        </View>


                        {
                            serviceDetail?.servicemanId
                                ?
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 20,
                                        borderWidth: 1,
                                        borderColor: '#CFCFCF',
                                        borderRadius: 8,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Pressable
                                        style={{ flex: 1, alignItems: "center", paddingVertical: 10 }}
                                        onPress={()=>Linking.openURL(`tel:${serviceDetail?.servicemanDetail?.mobileNo}`)}
                                    >
                                        <Text family="GBold" size="medium" color={theme.btnTag}>
                                            CALL
                                        </Text>
                                    </Pressable>
                                    <View
                                        style={{
                                            width: 1,
                                            backgroundColor: "#CFCFCF",
                                            height: "100%",
                                        }}
                                    />
                                    <Pressable
                                        style={{ flex: 1, alignItems: "center", paddingVertical: 10 }}
                                        onPress={() => navigation.navigate("ChatBox", { serviceDetail: serviceDetail })}
                                    >
                                        <Text family="GBold" size="medium" color={theme.btnTag}>
                                            CHAT
                                        </Text>
                                    </Pressable>
                                </View>
                                :
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 20,
                                        borderWidth: 1,
                                        borderColor: '#CFCFCF',
                                        borderRadius: 8,
                                        overflow: "hidden",
                                        paddingVertical: 10
                                    }}
                                >
                                    <Text family="GMedium" size="semilarge">Serviceman not assigned</Text>
                                </View>
                        }


                    </View>

                    {/* {
                    onTime
                    &&
                    (
                        <View style={style.card} >
                            <Text family="GRegular" size="semilarge">OTP for delivery : <Text family="GMedium" size="semilarge">1025634</Text></Text>
                            <Text family="GRegular" size="medium">Tell this PIN to the After completed services</Text>
                        </View>
                    )
                    } */}

                    <View>
                        <Text family="GMedium" size="semilarge">Track Order Details</Text>
                        <View style={[style.card, { backgroundColor: theme.card, marginTop: 20 }]}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ alignItems: "center", marginRight: 12 }}>
                                    {steps.map((step, index) => (
                                        <View key={index} style={{ alignItems: "center" }}>
                                            <View style={[
                                                style.circle,
                                                {
                                                    backgroundColor:
                                                        step.status === "completed" ? "#2ecc71" : "#fff",
                                                },
                                            ]}>
                                                {step.status === "completed" && (
                                                    <VectorIcons
                                                        family="AntDesign"
                                                        name="check"
                                                        iconcolor={theme.activetabtext}
                                                        size={18}
                                                    />
                                                )}
                                            </View>
                                            {index !== steps.length - 1 && <View style={style.line} />}
                                        </View>
                                    ))}
                                </View>

                                <View style={{ flex: 1, }}>
                                    {steps.map((step, index) => (
                                        <View key={index} style={{ marginBottom: 24 }}>
                                            <Text family="GBold" size="semilarge">{step.title}</Text>
                                            {step.subtitle && <Text family="GRegular" size="semismall">{step.subtitle}</Text>}
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </Mainview>
    );
};

export default TrackOrder;
