import { useCallback, useEffect, useMemo, useState } from "react"
import Card from "../../../Components/Card"
import Flexcomponent from "../../../Components/flexcomponent"
import Mainview from "../../../Components/mainview"
import Text from "../../../Components/text"
import { RFvalue, windowwidth } from "../../../Utilities/dimensions"
import ServiceChecklist from "./servicechecklist"
import Uploadphotos from "./uploadphotos"
import { Photos, photosprops } from "../../../Actions/Types/phototypes"
import useCustomHooks, { Commonalert, useHardwareBackPress, useIsForeground } from "../../../Actions/Hooks/customhook"
import { useSelector } from "react-redux"
import { helperSelector } from "../../../Slices/helper"
import Addonrequest from "../Addon/addonrequest"
import { clearservice, persistorSelector, setAddonservice, update_afterpics, update_beforepics, update_serviceinprogress } from "../../../Slices/persistor"
import { useLazyGetappdataQuery, useLazyGetservicedetailQuery, useServicerActionMutation } from "../../../Slices/services"
import useApiError from "../../../Actions/Hooks/errorhook"
import DraggableTimer from "../../../Components/DraggableTimer"
import { Pressable } from "react-native"
import VectorIcons from "../../../Utilities/vectorIcons"
import { destroyStorage } from "../../../Actions/Storage/localStorage"
import Checkbox from "../../../Components/Field/Input/Checkbox"

interface Serviceprops {

}

interface photos {
    title?: string,
    image?: any,
}
const Servicedetail: React.FC<Serviceprops> = () => {
    const [before, setBefore] = useState(false)
    const [after, setAfter] = useState(false)
    const [beforepics, setBeforepic] = useState<photos[]>([])
    const [afterpics, setAfterpics] = useState<photos[]>([])

    console.log(beforepics, "testtttt");

    const { navigation, bottommodalref, openbottommodal, dispatch, theme } = useCustomHooks()
    const { servicetype, servicecheck } = useSelector(helperSelector)


    const backfn = useCallback(() => {
        Commonalert({
            title: "Alert!",
            des: "You cannot back untill the service end",
            yes: () => console.log("test")
        })
    }, [])

    useHardwareBackPress({
        title: "Alert!",
        des: "You cannot back untill the service end",

    })
    const { serviceinprogress } = useSelector(persistorSelector)
    // useEffect(() => {
    //  dispatch(clearservice())
    // },[])

    const [servicerAction, { isLoading: isserviceaction, error: serviceactionerror }] = useServicerActionMutation()
    const [getservicedetail, { isLoading: getserviceloader }] = useLazyGetservicedetailQuery()
    const [getappdata] = useLazyGetappdataQuery()
    useApiError(serviceactionerror)



    const checkaddon = async () => {
        const payload = {
            serviceId: serviceinprogress?._id
        }
        const response = await getservicedetail(payload)
        console.log(response?.data?.data, "RESPONSE");
        const addonservice = response?.data?.data?.services
        if (response?.data?.status && addonservice?.length && response?.data?.data?.addOnServiceStatus != "completed") {
            // navigation?.navigate("Addonjobdetail")
            bottommodalref.current?.present()
            dispatch(update_serviceinprogress(response?.data?.data))
        }
        else if (!response?.data?.data?.afterFaceCheckStatus && servicetype == "onetimewash") {
            navigation?.navigate("Selfie", { origin: "check" })
        }
        else {
            finishservice()
        }
    }
    const finishservice = async () => {

        const formdata = new FormData()
        formdata.append("serviceId", serviceinprogress?._id)
        formdata.append("servicemanId", serviceinprogress?.subscriptionDetail?.servicemanId)
        formdata.append("subscriptionId", serviceinprogress?.subscriptionDetail?._id)
        formdata.append("status", "completed")
        console.log(formdata, "FINSIH");

        for (let pic of beforewashpics) {
            if (pic?.image) {
                formdata.append("beforeVehicleImages", {
                    uri: pic?.image?.uri,
                    name: pic?.image?.fileName,
                    type: pic?.image?.type === "image/jpg" ? "image/jpeg" : pic?.image?.type,
                } as any);
            }
        }

        for (let pic of afterwashpics) {
            if (pic?.image) {
                formdata.append("afterVehicleImages", {
                    uri: pic?.image?.uri,
                    name: pic?.image?.fileName,
                    type: pic?.image?.type === "image/jpg" ? "image/jpeg" : pic?.image?.type,
                } as any);
            }
        }

        console.log(formdata, "FORMDATOFSERVICEACTION");
        const res = await servicerAction(formdata).unwrap()
        console.log(res, "RESPONSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");

        if (res?.status) {
            navigation.navigate("Completejob")
        }
    }

    const { beforewashpics, afterwashpics } = useSelector(persistorSelector)



    const bottomtext = useMemo(() => {
        if (servicecheck.after) return "Finish"
        else if (serviceinprogress?._id) return "Verify"

    }, [serviceinprogress, servicecheck])

    // useEffect(() => {
    //     dispatch(clearservice())
    //     destroyStorage()
    // }, [])


    useEffect(() => {
        getpicscounts()
    }, [beforewashpics, afterwashpics])

    const getpicscounts = async () => {
        if (beforewashpics.length || afterwashpics.length) return
        const payload = {
            serviceId: serviceinprogress?._id
        }
        const response = await getappdata(payload)
        console.log(response?.data?.data, "RESPONSE");
        const before = []
        for (let i = 0; i < response?.data?.data?.beforeCleaningMaximumImages; i++) {
            before.push({
                title: `image${i + 1}`,
                image: ""
            })
        }
        dispatch(update_beforepics(before))

        const after = []
        for (let i = 0; i < response?.data?.data?.afterCleaningMaximumImages; i++) {
            after.push({
                title: `image${i + 1}`,
                image: ""
            })
        }
        dispatch(update_afterpics(after))
    }

    const [services, setServices] = useState([])

    useEffect(() => {
        if (serviceinprogress?._id) {
            const response = serviceinprogress?.subscriptionDetail?.subscriptionPackage?.whatsIncluded?.map((e: any) => {
                return {
                    ...e,
                    ischeck: false
                }
            })
            setServices(response)

        }
    }, [serviceinprogress])

    const isservicecheck = useMemo(() => {

        const result = services?.every((e: any) => e?.ischeck)
        console.log(result, "RESULT");
        return result
    }, [services])

    const bottomshow = useMemo(() => {
        if (servicetype == "dailywash" && beforewashpics?.every((e) => e?.image?.uri) && afterwashpics?.every((e) => e?.image?.uri) && isservicecheck) return true
        else if (servicetype == "onetimewash" && afterwashpics?.every((e) => e?.image?.uri) && isservicecheck) return true
        else return false
    }, [servicetype, beforewashpics, afterwashpics, isservicecheck])

    return (
        <>
            <Mainview
                headertitle="Service Details"
                bottomContent={bottomshow}
                bottomtext={bottomtext}
                onleftfn={backfn}
                isoverlaploader={isserviceaction}
                isbottomload={getserviceloader}
                overlapcontent={"picture are uploading please wait ..."}
                onBottompress={() => {
                    checkaddon()
                    return

                }}

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
                <Text family="GMedium" style={{ fontSize: RFvalue(15) }} top={"5%"} >Service InProgress</Text>
                <Text family="GRegular" size="medium" top={"1%"} >Your vehicle is being cleaned with care. Please wait while our expert completes the service.</Text>

                <Card containerStyle={{ marginTop: "2.5%", padding: "5%" }} >
                    {/* {servicetype == "onetimewash" && */}
                    <ServiceChecklist ischeck={true} title="Service Started" top={"1.5%"} />
                    {/* } */}

                    <ServiceChecklist ischeck={isservicecheck} title="Check  List" top={"1.5%"} />

                    {services?.map((e: any) => (
                        <Checkbox
                            label={e?.text}
                            initial={e?.ischeck}
                            onChange={(val) => {
                                setServices((prev: any) => prev?.map((item: any) => item?._id == e?._id ? { ...item, ischeck: val } : item))
                            }}
                            boxstyle={{
                                borderWidth: 1,
                                borderColor: "gray"
                            }}
                            checkboxstyle={{ marginLeft: "10%", paddingVertical: "2.5%" }}
                        />))}
                    {/* {servicetype == "dailywash" && <ServiceChecklist ischeck={true} title="Car Inspection Done" />} */}
                    {servicetype == "dailywash" &&
                        <Uploadphotos
                            // conatinerstyle={{ display: before ? "flex" : "none" }}
                            title="Upload Vehicle Before Car Wash"
                            onchangephotos={(data) => {
                                console.log(data, "beforeuploadgal");
                                // setBeforepic(data)
                                dispatch(update_beforepics(data))
                            }}
                            customarr={beforewashpics?.length ? beforewashpics : [
                                {
                                    title: "Front Side",
                                    image: ""
                                },
                                {
                                    title: "Left Side",
                                    image: ""
                                },

                                {
                                    title: "Back Side",
                                    image: ""
                                },
                                {
                                    title: "Right Side",
                                    image: ""
                                },
                            ]}
                        />
                    }
                    {/* } */}
                    <Uploadphotos
                        // conatinerstyle={{ display: before ? "flex" : "none" }}
                        title="Upload Vehicle After Car Wash"
                        onchangephotos={(data) => {
                            console.log(data, "after uploadgal");
                            dispatch(update_afterpics(data))
                        }}
                        customarr={afterwashpics?.length ? afterwashpics : [
                            {
                                title: servicetype === "onetimewash" ? "Image 1" : "Front Side",
                                image: ""
                            },
                            {
                                title: servicetype === "onetimewash" ? "Image 2" : "Left Side",
                                image: ""
                            },

                            {
                                title: servicetype === "onetimewash" ? "Image 3" : "Back Side",
                                image: ""
                            },
                            {
                                title: servicetype === "onetimewash" ? "Image 4" : "Right Side",
                                image: ""
                            },
                            ...(servicetype === "onetimewash" ? [
                                {
                                    title: "Image 5",
                                    image: ""
                                },
                                {
                                    title: "Image 6",
                                    image: ""
                                },

                                {
                                    title: "Image 7",
                                    image: ""
                                },
                                {
                                    title: "Image 8",
                                    image: ""
                                }
                            ] : [])
                        ]}
                    />
                </Card>


                <Addonrequest
                    sheetref={bottommodalref}
                />

            </Mainview >
            {serviceinprogress?.serviceStartDateTime ?
                <DraggableTimer starttime={serviceinprogress?.serviceStartDateTime} /> : null}
        </>
    )

}

export default Servicedetail