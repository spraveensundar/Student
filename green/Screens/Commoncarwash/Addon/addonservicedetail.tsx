import { Pressable, View } from "react-native"
import Card from "../../../Components/Card"
import Mainview from "../../../Components/mainview"
import Text from "../../../Components/text"
import ServiceChecklist from "../Servicedetails/servicechecklist"
import { useCallback, useEffect, useState } from "react"
import { Input } from "../../../Components/Field"
import { Colors, Fontfamily, Fontsize } from "../../../Utilities/uiasset"
import { windowheight, windowwidth } from "../../../Utilities/dimensions"
import Uploadphotos from "../Servicedetails/uploadphotos"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import { useSelector } from "react-redux"
import { persistorSelector, setAddonservice, update_addonpics } from "../../../Slices/persistor"
import { useServiceAddonActionMutation, useServiceAddOnProofUploadMutation } from "../../../Slices/services"
import useApiError from "../../../Actions/Hooks/errorhook"
import DraggableTimer from "../../../Components/DraggableTimer"
import VectorIcons from "../../../Utilities/vectorIcons"
interface photos {
    title?: string,
    image?: any,
}

const Addonservicedetail: React.FC = () => {
    const [isopen, setIsopen] = useState(false)

    const { navigation, dispatch, successtoast, theme } = useCustomHooks()

    const { serviceinprogress, addonpics } = useSelector(persistorSelector)
    const getpictures = useCallback(() => {
        console.log(serviceinprogress, "serviceinprogressserviceinprogressserviceinprogress");
        if (!addonpics?.length && serviceinprogress?.subscriptionDetail?.extraServices[0]?.services?.length) {
            const addonservices = serviceinprogress?.subscriptionDetail?.extraServices[0]?.services?.map((e: any) => ({
                ...e,
                title: e?.name,
                image: ""
            }))
            console.log("aftertmap", addonservices);
            dispatch(update_addonpics(addonservices))

        }
    }, [serviceinprogress, addonpics])
    useEffect(() => {
        getpictures()
    }, [getpictures])

    const [serviceAddonAction, { isLoading: addonend, error: addonerror }] = useServiceAddonActionMutation()
    const [serviceAddOnProofUpload, { isLoading: proofload, error: prooferror }] = useServiceAddOnProofUploadMutation()
    useApiError(addonerror || prooferror)

    const [onstop, setStop] = useState(false)

    const uploadproof = async () => {
        const formdata = new FormData()
        // console.log(addonpics,"addonservicesaddonservicesaddonservices");
        formdata.append("serviceId", serviceinprogress?._id)
        addonpics?.forEach((e: any) => {
            if (e?.image?.uri) {
                formdata.append("addOnProofImages", {
                    uri: e?.image?.uri,
                    name: e?.image?.fileName,
                    type: e?.image?.type === "image/jpg" ? "image/jpeg" : e?.image?.type,
                } as any);
            }
        });

        const res = await serviceAddOnProofUpload(formdata).unwrap()
        console.log(res, "RESGAL");

        if (res?.status) {
            onsubmit()
        }

    }
    const onsubmit = async () => {
        const payload = {
            serviceId: serviceinprogress?._id,
            status: "completed"
        }
        console.log(payload, "PAYLOADS");

        const res = await serviceAddonAction(payload).unwrap()
        console.log(res, "RESPONSEDADADADADADADASD");

        if (res?.status) {
            navigation?.navigate("Servicedetail")
            successtoast("Addon service completed successfully")
            dispatch(setAddonservice(false))
        }
    }
    return (
        <>

            <Mainview
                headertitle="Addon Service Details"
                bottomContent={addonpics?.every((e) => e?.image?.uri)}
                bottomtext="Complete Job"
                onBottompress={() => uploadproof()}
                isoverlaploader={addonend || proofload}
                overlapcontent={"picture are uploading please wait ..."}
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
                <Text size="semilarge" top={"5%"} family="GMedium" >Service InProgress</Text>
                <Text size="medium" top={"1%"} family="GRegular" >Your vehicle is being cleaned with care. Please wait while our expert completes the service.</Text>

                <Card containerStyle={{ padding: "5%", marginTop: "5%" }} >
                    <ServiceChecklist title="Car Inspection Done" open={!isopen} isopen={() => setIsopen(!isopen)} ischeck />
                    {/* {isopen &&
                    <View style={{ paddingHorizontal: "10%" }} >
                        <Text family="GRegular" >Please enter the 6-digit OTP shared by the customer to verify the service.</Text>
                        <Input
                            label={"Enter OTP"}
                            placeHolder="ex 965832"
                            inputprops={{
                                keyboardType: "numeric"
                            }}
                            style={{ height: windowheight * 0.05, backgroundColor: "rgba(243, 243, 243, 1)" }}
                            labelStyle={{ color: Colors.green, fontFamily: Fontfamily.GRegular, marginTop: "2.5%", fontSize: Fontsize.semimedium }}
                        />
                    </View>
                } */}
                    {addonpics?.length ?
                        <Uploadphotos
                            title="Upload Addon Service Car Wash "
                            customarr={addonpics}
                            onchangephotos={(data) => {
                                dispatch(update_addonpics(data))
                            }}
                        /> : null}
                </Card>
            </Mainview>

            {serviceinprogress?.addonServiceStartTime ?
                <DraggableTimer starttime={serviceinprogress?.addonServiceStartTime} /> : null}
        </>
    )
}

export default Addonservicedetail