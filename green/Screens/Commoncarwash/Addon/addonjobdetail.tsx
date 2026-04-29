import { FlatList, Image, Pressable, View } from "react-native"
import Mainview from "../../../Components/mainview"
import { borderradius, windowwidth } from "../../../Utilities/dimensions";
import Line from "../../../Components/line";
import Text from "../../../Components/text";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import Toptabs from "../../../Components/toptabs";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Input } from "../../../Components/Field";
import Uploadphotos from "../Servicedetails/uploadphotos";
import { useSelector } from "react-redux";
import { cleaningSelector, update_checklist } from "../../../Slices/cleaning";
import { FlashList } from "@shopify/flash-list";
import { photosprops } from "../../../Actions/Types/phototypes";
import Sheet from "../../../Components/bottomsheetmodal";
import { update_dailywashstate } from "../../../Slices/helper";
import Profileinfo from "../Jobdetail/profileinfo";
import Card from "../../../Components/Card";
import ServiceChecklist from "../Servicedetails/servicechecklist";
import { Fontfamily } from "../../../Utilities/uiasset";
import { persistorSelector, setAddonservice, update_serviceinprogress } from "../../../Slices/persistor";
import { useLazyGetservicedetailQuery, useServiceAddonActionMutation } from "../../../Slices/services";
import useApiError from "../../../Actions/Hooks/errorhook";
import VectorIcons from "../../../Utilities/vectorIcons";

const Addonjobdetail: React.FC = () => {
    const [status, setStatus] = useState<"check" | "start">("check")
    const { checklist } = useSelector(cleaningSelector)
    const [currentindex, setCurrentindex] = useState(0)

    const { theme, dispatch, navigation, bottommodalref, openbottommodal } = useCustomHooks()

    const listRef = useRef<any>(null);

    const scrollDown = () => {
        listRef.current?.scrollToEnd({ animated: true });
    };

    const { serviceinprogress } = useSelector(persistorSelector)
    console.log(serviceinprogress?.subscriptionDetail?.extraServices[0]?.services, "serviceinprogressserviceinprogress");

    const addonservices: any = serviceinprogress?.subscriptionDetail?.extraServices[0]?.services

    const [serviceAddonAction, { isLoading, error }] = useServiceAddonActionMutation()
    const [getservicedetail, { isFetching: fetchservice, error: fetchserviceerror }] = useLazyGetservicedetailQuery()

    useApiError(error || fetchserviceerror)

    const addonservicestart = async () => {
        const payload = {
            serviceId: serviceinprogress?._id,
            status: "started"
        }
        const res = await serviceAddonAction(payload).unwrap()
        const response = await getservicedetail({ serviceId: serviceinprogress?._id })

        if (res?.status) {
            dispatch(update_serviceinprogress(response?.data?.data))
            dispatch(setAddonservice(true))
            navigation?.navigate("Addonservicedetail")
        }
    }

    return (
        <Mainview
            isheader
            headertitle="Job details"
            isscollable={false}
            bottomContent
            bottomtext={"Start job"}
            onBottompress={() => {
                addonservicestart()
            }}
            isbottomload={isLoading}

            rightheader={
                <Pressable
                    onPress={() => {

                        navigation.navigate("ChatBox")
                    }} style={{
                        position: "absolute",
                        right: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "15%"
                    }} >
                    <VectorIcons
                        family="Lucide"
                        name={"message-square"}
                        size={windowwidth * 0.06}
                        iconcolor={theme.primarytext}
                    />
                </Pressable>
            }

        >
            <Profileinfo
                name={serviceinprogress?.userDetail?.name}
                id={serviceinprogress?.serviceUniqueId}
                address={serviceinprogress?.subscriptionDetail?.blockNo + " , " + serviceinprogress?.subscriptionDetail?.address}
                image={serviceinprogress?.userDetail?.profile}
                blockno={serviceinprogress?.subscriptionDetail?.blockNo}
                apartmentname={serviceinprogress?.subscriptionDetail?.apartmentName}
            />
            <Line width={windowwidth} conatainerstyle={{ alignSelf: "center" }} />

            <View style={{ flex: 1 }} >



                <Text top={"5%"} size="medium" family="GMedium" >Addon Service Check List</Text>
                <Card containerStyle={{ paddingHorizontal: "4%", paddingVertical: "2%", marginTop: "2.5%" }} >
                    <FlatList
                        data={serviceinprogress?.subscriptionDetail?.extraServices[0]?.services}
                        renderItem={({ item, index }) => (
                            <ServiceChecklist ischeck
                                title={item?.name ?? ""}
                                textstyle={{ fontFamily: Fontfamily.GRegular }}
                                top={"2.5%"}
                            />
                        )}
                    />

                    {/* <ServiceChecklist ischeck
                        title="Tyre Polish"
                        textstyle={{ fontFamily: Fontfamily.GRegular }}
                    />
                    <ServiceChecklist ischeck
                        title="Dashboard Cleaning"
                        textstyle={{ fontFamily: Fontfamily.GRegular }}
                    />
                    <ServiceChecklist ischeck
                        title="Car Perfume Spray"
                        textstyle={{ fontFamily: Fontfamily.GRegular }}
                    /> */}
                </Card>
                <Line top={"5%"} width={windowwidth} conatainerstyle={{ alignSelf: "center" }} />

                <Text top={"5%"} family="GMedium" size="medium" >Timing</Text>
                <View style={{ width: "50%", paddingHorizontal: "5%", backgroundColor: "#3984E8", paddingVertical: "2.5%", borderRadius: borderradius * 0.25, justifyContent: "center", alignItems: "center", marginTop: "2.5%" }} >
                    <Text color={theme.white} size="semilarge" >00:00:00</Text>
                </View>
                <Text family="GRegular" top={"2.5%"} >Job timer start 04:00 PM to 05:00 PM</Text>
            </View>


        </Mainview>
    )
}

export default Addonjobdetail;