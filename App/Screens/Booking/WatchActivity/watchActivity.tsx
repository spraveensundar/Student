import React, { useCallback, useEffect, useState } from "react";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import styles from "./styles";
import { Linking, Pressable, ScrollView, View } from "react-native";
import Flexcomponent from "../../../Components/flexcomponent";
import Images, { icons, lotties } from "../../../Utilities/images";
import { windowwidth } from "../../../Utilities/dimensions";
import Text from "../../../Components/text";
import VectorIcons from "../../../Utilities/vectorIcons";
import FastImage from "@d11/react-native-fast-image";
import { Colors } from "../../../Utilities/uiasset";
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useGetMySubscriptionServiceDetailQuery } from "../../../Common/redux/vehicleServiceHook";
import { useFocusEffect } from "@react-navigation/native";
import { capitalizeFirstLetter, dateToMonthDateWithTime, dateToTimeAlone, formatDateWithDay, numberChange, returnOriginalFile, returnServiceStatusDisplay } from "../../../Common/commonFunction";
import { constantData } from "../../../Common/constant";
import Lottie from "../../../Components/lottieview";
import { Input } from "../../../Components/Field";
import FileView from "../../../Components/FileView";


const defaultFormData = {
    rating: 0,
    feedback: "",
}


type Props = NativeStackScreenProps<Stacknavigationtypes, 'WatchActivity'>;


const WatchActivity: React.FC<Props> = ({ route }) => {


    const serviceId = route?.params?.serviceId;



    const { data, refetch, isLoading, } = useGetMySubscriptionServiceDetailQuery({ serviceId: serviceId });


    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const [rating, setRating] = useState(3);
    const [ subscriptionDetail, setSubscriptionDetail ] = useState<any>({});
    const [ serviceDetail, setServiceDetail ] = useState<any>({});
    const [ formData, setFormData ] = useState(defaultFormData)
    const [ images, setImages ] = useState({
        beforeVehicleImages: [],
        afterVehicleImages: [],
        addOnProofImages: [],
    })
    const [ viewFiles, setViewFiles ] = useState<any>({
        status: false,
        files: [],
        index: 0
    })


    console.log('serviceIdserviceId',serviceId,data)



    useFocusEffect(
        useCallback(() => {
            refetch();
        },[])
    )

    useEffect(() => {
        setServiceDetail({...data?.data});
        setSubscriptionDetail({...data?.data?.subscriptionDetail});
    },[data?.data])

    // const returnStatus = () => {
    //     if(serviceDetail?.isSkiped){
    //         return "Skipped"
    //     }
    //     else if (serviceDetail?.isCancelled) {
    //         return "Cancelled"
    //     }
    //     else{
    //         return capitalizeFirstLetter(serviceDetail?.status);
    //     }
    // }

    const isServiceCompleted = () => {
        if(serviceDetail?.status === constantData.serviceStatus.completed){
            return true;
        }
        return false;
    }

    const onChange = (value: any, id: string) => {
        setFormData({
            ...formData,
            [id]: value,
        })
    }
    
    const isCancelledOrSkipped = () => {
        if(serviceDetail?.status == constantData.serviceStatus.cancelled||serviceDetail?.isCancelled||serviceDetail?.isSkiped){
            return true
        }
        return false
    }

    useEffect(()=>{
        let setData = { ...images };
        let assignKey = "uri"
        if (serviceDetail?.beforeVehicleImages?.length > 0) {
            setData.beforeVehicleImages = serviceDetail?.beforeVehicleImages?.map((image: string) => { return { [assignKey]: returnOriginalFile(image) } });
        }
        if (serviceDetail?.afterVehicleImages?.length > 0) {
            setData.afterVehicleImages = serviceDetail?.afterVehicleImages?.map((image: string) => { return { [assignKey]: returnOriginalFile(image) } });
            setData.afterVehicleImages = [
                ...setData.afterVehicleImages,
            ]
        }
        if (serviceDetail?.addOnProofImages?.length > 0) {
            setData.addOnProofImages = serviceDetail?.addOnProofImages?.map((image: string) => { return { [assignKey]: returnOriginalFile(image) } });
        }
        setData.afterVehicleImages = [
            ...setData.afterVehicleImages,
            ...setData.addOnProofImages,
        ]
        setImages({
            ...setData,
        })
    },[serviceDetail?.beforeVehicleImages,serviceDetail?.afterVehicleImages,serviceDetail?.addOnProofImages,])
    
    const viewFileChange = (status: boolean, fileList: any[], index?: number) => {
        setViewFiles({
            status: status,
            files: fileList,
            index: index,
        })
    }

    return (
        <Mainview isheader={true}
            headertitle="Watch Activity"
            onleftfn={() => navigation.goBack()}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={style.container}>
                    <Text family="GMedium" size="semilarge">Car Details</Text>
                    <Flexcomponent
                        style={style.detail}
                        paddingHorizontal={10}
                        justifyContent="space-between"
                    >

                        <View style={{ flexDirection: "row" }}>
                            <Images
                                type="image"
                                source={ subscriptionDetail?.brandVehicleDetails?.brandVehicleImage ? {uri:returnOriginalFile(subscriptionDetail?.brandVehicleDetails?.brandVehicleImage)} : icons.Swift}
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
                            <Pressable style={[style.stsBtn, {
                                    backgroundColor: isServiceCompleted() ? "#02BC7D" : (isCancelledOrSkipped() ? Colors.pink :"#DD9E40")
                                }]}>
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

                    
                    {
                        serviceDetail?.servicemanId
                            ?
                            <Flexcomponent
                                justifyContent="space-between"
                                paddingHorizontal={15}
                                paddingVertical={15} style={style.detail}
                                bakgroundcolor={theme.btnColor}
                            >
                                <View style={{ flexDirection: 'row', gap: 20, }}>
                                    <Images
                                        type="image"
                                        source={serviceDetail?.servicemanDetail?.profile?{uri: returnOriginalFile(serviceDetail?.servicemanDetail?.profile)}:icons.Man}
                                    />
                                    <View style={{ gap: 10 }}>
                                        <View>
                                            <Text family="GMedium" size="medium">
                                                {serviceDetail?.servicemanDetail?.name}
                                            </Text>
                                            <Text family="GRegular" size="semimedium">
                                                {serviceDetail?.servicemanDetail?.mobileNo}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', gap: 20 }}>
                                            <Pressable
                                                onPress={() => Linking.openURL(`tel:${serviceDetail?.servicemanDetail?.mobileNo}`)}
                                            >
                                                <Images width={windowwidth * 0.08} height={windowwidth * 0.08} type="image" source={icons.Whatsapp} />
                                            </Pressable>
                                            <Pressable
                                                onPress={() => Linking.openURL(`sms:${serviceDetail?.servicemanDetail?.mobileNo}`)}
                                            >
                                                <Images width={windowwidth * 0.08} height={windowwidth * 0.08} type="image" source={icons.Message} />
                                            </Pressable>

                                        </View>
                                    </View>
                                </View>
                                <Pressable onPress={() => navigation.navigate("ChatBox", { serviceDetail: serviceDetail })}
                                    style={{
                                        width: '15%',
                                        aspectRatio: 1,
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                        marginTop: -35
                                    }}
                                >
                                    <Lottie src={lotties.MsgLoading} style={[{ width: '100%', height: '100%' }]} />
                                </Pressable>
                            </Flexcomponent>
                            :
                            <></>
                    }


                    <View style={style.card}>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <View style={{ gap: 10 }}>
                                <Text family="GMedium" size="semilarge">
                                    {subscriptionDetail?.subscriptionPackage?.heading}
                                </Text>
                                <Text family="GRegular" size="medium">
                                    Booking ID: {serviceDetail?.serviceUniqueId}
                                </Text>
                            </View>
                        </View>

                        <View style={{ gap: 15, marginTop: 10 }}>
                            {/* <Text family="GBold" size="semilarge">
                                General Motors
                            </Text> */}

                            {
                                isServiceCompleted()
                                    ?
                                    <>
                                        <View style={{ flexDirection: 'row', }}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Pressable key={star} onPress={() => onChange(star, "rating")}>
                                                    <VectorIcons
                                                        family="Ionicons"
                                                        name={star <= numberChange(serviceDetail?.rating) ? "star" : "star-outline"}
                                                        size={14}
                                                        iconcolor="#FB9506"
                                                        style={{ marginRight: 4 }}
                                                    />
                                                </Pressable>
                                            ))}
                                            <Pressable
                                                onPress={()=>navigation.navigate('Review',{ serviceDetail: serviceDetail, from: constantData.reviewFrom.vehicleService })}
                                            >
                                                <VectorIcons
                                                    family="Ionicons"
                                                    name={"pencil"}
                                                    size={14}
                                                    iconcolor="black"
                                                    style={{ marginRight: 4 }}
                                                />
                                            </Pressable>
                                        </View>

                                    </>
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
                                        {
                                            serviceDetail?.serviceStartTime
                                            ?
                                            formatDateWithDay(new Date(serviceDetail?.date))
                                            :
                                            <></>
                                        }
                                        
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
                                        {dateToTimeAlone(new Date(serviceDetail?.serviceStartTime))}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View
                            style={{
                                alignItems: "center",
                                marginTop: 20
                            }}
                        >
                            <Pressable
                                onPress={()=>navigation.navigate("TrackOrder",{serviceId: serviceDetail?._id})}
                            >
                                <Text family="GBold" size="medium" color={theme.btnTag}>
                                    TRACK ORDER DETAILS
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <Text family="GMedium" size="semilarge">Service Details</Text>
                    <View style={[style.addOns, { justifyContent: 'flex-start' }]}>
                        <FastImage
                            source={subscriptionDetail?.subscriptionPackage?.packageImage?{uri: returnOriginalFile(subscriptionDetail?.subscriptionPackage?.packageImage)}:icons.CarSpa}
                            style={{ width: windowwidth * 0.2, height: windowwidth * 0.2, borderRadius: 10, overflow: 'hidden' }}
                        />
                        <View style={{ gap: 20 }}>
                            <View style={{ gap: 4 }}>
                                <Text family="GMedium" size="medium">
                                    {subscriptionDetail?.subscriptionPackage?.heading}
                                </Text>
                                <Text family="GRegular" size="semimedium">
                                    {dateToMonthDateWithTime(new Date(serviceDetail?.serviceStartTime))}
                                </Text>
                                <View style={{ flexDirection: 'row', gap: 5 }}>
                                    <Text family="GRegular" size="semimedium">
                                        {returnServiceStatusDisplay(serviceDetail)}
                                    </Text>
                                    {
                                        isServiceCompleted()
                                            ?
                                            <VectorIcons
                                                family="Ionicons"
                                                name="checkmark-circle-sharp"
                                                iconcolor={theme.btnTag}
                                                size={20}
                                            />
                                            :
                                            <></>
                                            // <VectorIcons
                                            //     family="Ionicons"
                                            //     name="close-circle-sharp"
                                            //     iconcolor={Colors.pink}
                                            //     size={20}
                                            // />
                                    }
                                </View>
                            </View>
                            <Pressable style={style.report}>
                                <Text family="GMedium" size="semismall" color={Colors.pink} style={{ textAlign: 'center', }}>Report</Text>
                            </Pressable>
                        </View>
                    </View>
                    <Text family="GMedium" size="semilarge">Service Completed Details</Text>
                    <View style={style.card}>
                        {
                            serviceDetail?.packageServices?.length > 0
                                ?
                                <>
                                    {
                                        serviceDetail?.packageServices?.map((value: any) => {
                                            return (
                                                <>
                                                {console.log('valuevalue',value, serviceDetail?.status)}
                                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                                        <Text family="GRegular" size="semimedium">{value?.text}</Text>
                                                        {
                                                            isServiceCompleted()
                                                                ?
                                                                <>
                                                                    <VectorIcons
                                                                        family="Ionicons"
                                                                        name="checkmark-circle-sharp"
                                                                        iconcolor={theme.btnTag}
                                                                        size={20}
                                                                    />
                                                                    {/* {
                                                                        value?.serviceStatus
                                                                            ?
                                                                            <VectorIcons
                                                                                family="Ionicons"
                                                                                name="checkmark-circle-sharp"
                                                                                iconcolor={theme.btnTag}
                                                                                size={20}
                                                                            />
                                                                            :
                                                                            <>
                                                                                <VectorIcons
                                                                                    family="Ionicons"
                                                                                    name="close-circle-sharp"
                                                                                    iconcolor={Colors.pink}
                                                                                    size={20}
                                                                                />
                                                                            </>
                                                                    } */}
                                                                </>
                                                                :
                                                                <>
                                                                    <VectorIcons
                                                                        family={
                                                                            (isCancelledOrSkipped())
                                                                            ?
                                                                            "Ionicons"
                                                                            :
                                                                            "MaterialIcons"
                                                                        }
                                                                        name={
                                                                            (isCancelledOrSkipped())
                                                                            ?
                                                                            "close-circle-sharp"
                                                                            :
                                                                            "pending"
                                                                        }
                                                                        iconcolor={
                                                                            (isCancelledOrSkipped())
                                                                            ?
                                                                            Colors.pink
                                                                            :
                                                                            Colors.yellow
                                                                        }
                                                                        size={20}
                                                                    />
                                                                </>
                                                        }
                                                    </View>
                                                </>
                                            )
                                        })
                                    }
                                </>
                                :
                                <></>
                        }
                        {/* <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Text family="GRegular" size="semimedium">Priority Service</Text>
                            <VectorIcons
                                family="Ionicons"
                                name="checkmark-circle-sharp"
                                iconcolor={theme.btnTag}
                                size={20}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Text family="GRegular" size="semimedium">Increased Wash Limits</Text>
                            <VectorIcons
                                family="Ionicons"
                                name="checkmark-circle-sharp"
                                iconcolor={theme.btnTag}
                                size={20}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Text family="GRegular" size="semimedium">Advanced Cleaning Packages</Text>
                            <VectorIcons
                                family="Ionicons"
                                name="checkmark-circle-sharp"
                                iconcolor={theme.btnTag}
                                size={20}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Text family="GRegular" size="semimedium">Multiple Vehicle Support</Text>
                            <VectorIcons
                                family="Ionicons"
                                name="checkmark-circle-sharp"
                                iconcolor={theme.btnTag}
                                size={20}
                            />
                        </View> */}
                    </View>

                    {
                        serviceDetail?.subscriptionType == constantData.subscriptionType.subscribe
                            ?
                            <>
                                <Text family="GMedium" size="semilarge">Before Car Wash Images</Text>
                                <View style={{ flexDirection: 'row', gap: 20 }}>
                                    {
                                        serviceDetail?.beforeVehicleImages?.length > 0
                                            ?
                                            serviceDetail?.beforeVehicleImages?.map((image: string, index: number) => {

                                                let imageUrl = returnOriginalFile(image);
                                                return (
                                                    <Pressable
                                                    onPress={()=>viewFileChange(true, images.beforeVehicleImages, index)}
                                                    >
                                                    <Images
                                                        source={{ uri: imageUrl }}
                                                        type="image"
                                                        width={windowwidth * 0.15}
                                                        height={windowwidth * 0.15}
                                                        
                                                    />
                                                    </Pressable>
                                                )
                                            })
                                            :
                                            <>
                                                <Text family="GRegular" size="semimedium">
                                                    No file uploaded
                                                </Text>
                                            </>
                                    }
                                    {/* <Images source={icons.BeforeWash1} type="image" width={windowwidth * 0.15} height={windowwidth * 0.15} />
                        <Images source={icons.BeforeWash1} type="image" width={windowwidth * 0.15} height={windowwidth * 0.15} />
                        <Images source={icons.BeforeWash1} type="image" width={windowwidth * 0.15} height={windowwidth * 0.15} />
                        <Images source={icons.BeforeWash1} type="image" width={windowwidth * 0.15} height={windowwidth * 0.15} /> */}
                                </View>
                            </>
                            :
                            <></>
                    }
                    
                    <Text family="GMedium" size="semilarge">After Car Wash Images</Text>
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        {
                            serviceDetail?.afterVehicleImages?.length > 0
                            ?
                                serviceDetail?.afterVehicleImages?.map((image: string, index: number) => {

                                    let imageUrl = returnOriginalFile(image);
                                    return (
                                        <Pressable
                                            onPress={() => viewFileChange(true, images.afterVehicleImages, index)}
                                        >
                                            <Images source={{ uri: imageUrl }} type="image" width={windowwidth * 0.15} height={windowwidth * 0.15} />
                                        </Pressable>
                                    )
                                })
                            :
                            <>
                            <Text family="GRegular" size="semimedium">
                                No file uploaded
                            </Text>
                            </>
                        }
                        {/* <Images source={icons.AfterWash2} type="image" width={windowwidth * 0.15} height={windowwidth * 0.15} />
                        <Images source={icons.AfterWash1} type="image" width={windowwidth * 0.15} height={windowwidth * 0.15} />
                        <Images source={icons.AfterWash2} type="image" width={windowwidth * 0.15} height={windowwidth * 0.15} />
                        <Images source={icons.AfterWash1} type="image" width={windowwidth * 0.15} height={windowwidth * 0.15} /> */}
                    </View>

                    {
                        serviceDetail?.addOnProofImages?.length > 0
                            ?
                            <>
                                <Text family="GMedium" size="semilarge">Add on proof Images</Text>
                                <View style={{ flexDirection: 'row', gap: 20 }}>
                                    {
                                        serviceDetail?.addOnProofImages?.length > 0
                                            ?
                                            serviceDetail?.addOnProofImages?.map((image: string, index: number) => {
                                                let imageUrl = returnOriginalFile(image);
                                                return (
                                                    <Pressable
                                                        onPress={() => viewFileChange(true, images.addOnProofImages, index)}
                                                    >
                                                        <Images source={{ uri: imageUrl }} type="image" width={windowwidth * 0.15} height={windowwidth * 0.15} />
                                                    </Pressable>
                                                )
                                            })
                                            :
                                            <>
                                                <Text family="GRegular" size="semimedium">
                                                    No file uploaded
                                                </Text>
                                            </>
                                    }
                                </View>
                            </>
                            :
                            <></>
                    }
                </View>
            </ScrollView>

            <FileView
                visible={viewFiles.status}
                onclose={() => viewFileChange(false,[],0)}
                imageUrls={viewFiles.files}
                imageIndex={viewFiles.index}
            />
        </Mainview>
    )
}

export default WatchActivity;