import { Image, Pressable, View } from "react-native"
import Mainview from "../../../Components/mainview"
import { borderradius, windowheight, windowwidth } from "../../../Utilities/dimensions";
import Line from "../../../Components/line";
import Text from "../../../Components/text";
import useCustomHooks, { useChecklocation, useFetchservicedetail } from "../../../Actions/Hooks/customhook";
import Toptabs from "../../../Components/toptabs";
import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Dropdown, Input } from "../../../Components/Field";
import Uploadphotos from "../Servicedetails/uploadphotos";
import Profileinfo from "./profileinfo";
import { useSelector } from "react-redux";
import { cleaningSelector, } from "../../../Slices/cleaning";
import { FlashList } from "@shopify/flash-list";
import { Photos, photosprops } from "../../../Actions/Types/phototypes";
import Sheet from "../../../Components/bottomsheetmodal";
import { helperSelector, update_dailywashstate, update_servivecheck } from "../../../Slices/helper";
import { vechilechecklist } from "../../../Slices/types";
import { useLazyGetRecurrencesQuery, useLazyGetservicedetailQuery, useServiceAvailableMutation, useServicerActionMutation } from "../../../Slices/services";
import useApiError from "../../../Actions/Hooks/errorhook";
import { addremove_damagepics, persistorSelector, setDamageissues, setDamagepics, update_damagepics, update_serviceinprogress } from "../../../Slices/persistor";
import { Toastfn } from "../../../Utilities/helerfunction";
import Damagepicture from "../Servicedetails/damagepics";
import Card from "../../../Components/Card";
import Addonrequest from "../Addon/addonrequest";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Colors } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectorIcons";
import { isWithinRadius } from "../../../Actions/location/location";

const JobDetails: React.FC = () => {
    const [status, setStatus] = useState<"check" | "start">("check")
    const { checklist } = useSelector(cleaningSelector);
    const { servicetype, servicecheck } = useSelector(helperSelector);
    const [currentindex, setCurrentindex] = useState(0)

    const { theme, dispatch, navigation, bottommodalref, openbottommodal } = useCustomHooks()
    const { serviceinprogress, damagepics } = useSelector(persistorSelector)

    const [recurrenceList, setRecurrenceList] = useState<any[]>([])
    const [selectedRecurrence, setSelectedRecurrence] = useState<any>("")

    const [getRecurrences] = useLazyGetRecurrencesQuery()
    const { selectedservice } = useSelector(cleaningSelector)

    console.log(selectedservice, "selectedserviceselectedservice");


    const fetchRecurrences = useCallback(async () => {
        try {
            if (selectedservice?._id) {
                console.log(selectedservice?._id, "selectedservice?._id");

                const res = await getRecurrences({ serviceId: selectedservice?._id })
                console.log("getRecurrencesRES", res.data);

                if (res?.data?.status && res?.data?.data?.length) {
                    const formatted = res?.data?.data?.map((item: any) => ({
                        label: item,
                        value: item
                    }))

                    console.log(formatted, "formattedformattedformatted");

                    setRecurrenceList(formatted)
                    setSelectedRecurrence(res?.data?.data[0])
                }
            }
        } catch (error) {
            console.log(error, "FETCH RECURRENCES ERROR");
        }

    }, [selectedservice])

    useEffect(() => {
        fetchRecurrences()
    }, [fetchRecurrences])

    // const updatepictures = useCallback((data: photosprops[], index: number) => {
    //     const payload = {
    //         vechilevalue: data,
    //         index: index
    //     }
    //     console.log(payload, "PAYLOADS");

    //     dispatch(update_checklist(payload))

    // }, [dispatch])

    const listRef = useRef<any>(null);
    const scrollDown = () => {
        listRef.current?.scrollToEnd({ animated: true });
    };

    const opensheet = useCallback(() => {
        if (currentindex == 1 && servicetype == "dailywash") {
            openbottommodal(bottommodalref)
        }
        else if (currentindex == 1 && servicetype == "onetimewash") {
            rejectref.current?.present()
        }

    }, [currentindex])
    useEffect(() => {
        opensheet()
    }, [opensheet])


    // useEffect(() => {
    //     if (selectedservice?.vehicleDamagePoints?.length) {
    //         const inspectparts: vechilechecklist[] = selectedservice?.vehicleDamagePoints?.map((e: vechilechecklist) => ({
    //             title: e?.title,
    //             value: []
    //         }))
    //         console.log(inspectparts, "INSPECTPARTS");
    //         dispatch(setChecklist(inspectparts))
    //     }
    // }, [selectedservice])
    const getservicecheck = useCallback(() => {
        if (servicecheck.before) {
            setStatus("start")
            scrollDown()
        }

    }, [servicecheck])

    useEffect(() => {
        getservicecheck()
        return () => {
            dispatch(update_servivecheck({ type: "before", value: false }))

        }
    }, [getservicecheck])

    const [servicerAction, { isLoading: isserviceaction, error: serviceactionerror }] = useServicerActionMutation()
    const [getservicedetail, { isFetching: fetchservice, error: fetchserviceerror }] = useLazyGetservicedetailQuery()

    useApiError(serviceactionerror || fetchserviceerror)


    console.log(checklist, "CHECKLIST");


    const checklistservice = useMemo(() => {
        return damagepics.every((item: any) => item?.photos[0]?.image?.uri)
    }, [damagepics])


    const checkdamageapi = useMemo(() => {
        console.log(selectedservice, "selectedservice");
        const service = selectedservice?._id ? selectedservice : serviceinprogress
        return service?.vehicleDamagePoints.every((item: any) => item?.vehicleDamagePoints?.image?.length)
    }, [selectedservice, serviceinprogress])

    const [serviceAvailable, { isLoading: damageupload, error }] = useServiceAvailableMutation()

    useApiError(error)

    useEffect(() => {
        if (selectedservice?.vehicleDamagePoints?.length) {
            const res = selectedservice?.vehicleDamagePoints?.map((e: any) => ({
                ...e,
                photos: [],
                issues: ""
            }))
            console.log(res, "VECHILEDAMAGEPOINTS");

            dispatch(setDamagepics(res))
        }
    }, [selectedservice])
    console.log(damagepics, "DAMAGEPARTS");

    const [damageload, setDamageload] = useState(false)

    const checkdamageparts = async () => {
        console.log(damagepics, "DAMAGEPARTS");
        const response = await getservicedetail({ serviceId: selectedservice?._id })
        const service = response?.data?.data
        setDamageload(true)
        const formdata = new FormData()
        formdata.append("serviceId", service?._id)
        formdata.append("isAvailableStatus", true)
        formdata.append("servicemanId", service?.servicemanId)

        damagepics.forEach((element: any, index: number) => {
            console.log(element, "hehe");

            element?.photos?.forEach((e: any, i: number) => (
                formdata.append(JSON.stringify(index), {
                    uri: e?.image?.uri,
                    name: e?.image?.fileName,
                    type: e?.image?.type === "image/jpg" ? "image/jpeg" : e?.image?.type,
                })
            ))

        });
        const damagePointsObject: any = {};

        damagepics?.forEach((item: any, index: number) => {
            if (item?.issues) {
                damagePointsObject[index] = item.issues;
            }
        });
        formdata.append("damagePoints", JSON.stringify(damagePointsObject))

        console.log(formdata, "FORMDATA");
        const res = await serviceAvailable(formdata).unwrap()
        setDamageload(false)

        if (res?.status) {
            return true
        }

    }

    const startservice = useCallback(async () => {
        await checkdamageparts()
        console.log(selectedRecurrence, "selectedRecurrence");

        const formdata = new FormData()
        formdata.append("serviceId", selectedservice?._id)
        formdata.append("servicemanId", selectedservice?.servicemanId) //daily pleasecheck
        formdata.append("subscriptionId", selectedservice?.subscriptionDetail?._id)
        formdata.append("status", "started")
        formdata.append("recurrenceType", selectedRecurrence ? selectedRecurrence : "daily")
        console.log(formdata, "FORMDATOFSERVICEACTION");

        const res = await servicerAction(formdata).unwrap()
        const response = await getservicedetail({ serviceId: selectedservice?._id })
        console.log(res, "RESPONSE");
        if (res?.status) {
            dispatch(update_serviceinprogress(response?.data?.data))
            navigation.navigate("Servicedetail")
        }
    }, [damagepics, selectedRecurrence])
    const rejectref = useRef<BottomSheetModal | null>(null)
    const [locationloader, setLocationloader] = useState(false)
    // const result = useChecklocation()


    return (
        <Mainview
            isheader
            headertitle="Job details"
            bottomContent
            isbottomload={isserviceaction}
            isoverlaploader={fetchservice || damageupload}
            bottomtext={status == "check" ? "Start job" : "Continue"}
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
            onBottompress={async () => {

                // console.log(selectedRecurrence, "selectedRecurrence");
                // return
                setLocationloader(true)
                const response = await getservicedetail({ serviceId: selectedservice?._id })
                console.log(response?.data?.data, "RESPONSEGAL");
                const isstartselife = response?.data?.data?.beforeFaceCheckStatus
                // const result = await isWithinRadius(response?.data?.data?.subscriptionDetail)
                // console.log(result, "RESULTTTTTTTTTTTTTTTTTTTTT");
                // setLocationloader(false)

                // if (!result) {
                //     Toastfn("Your Service location far away from your currentlocation")
                // }
                if (!isstartselife) {
                    navigation?.navigate("Selfie", { origin: "check" })
                }
                else {
                    startservice()
                }
            }}
            onleftfn={() => {
                if (status == "start") return setStatus("check")
                navigation.goBack()

            }}
            overlapcontent={locationloader ? "Checking your location ..." : "Damage parts picture are uploading please wait ..."}

        >
            <View style={{ flex: 1 }} >


                <Profileinfo
                    name={selectedservice?.userDetail?.name}
                    id={selectedservice?.serviceUniqueId}
                    address={selectedservice?.subscriptionDetail?.blockNo + " , " + selectedservice?.subscriptionDetail?.address}
                    image={selectedservice?.userDetail?.profile}
                    blockno={selectedservice?.subscriptionDetail?.blockNo}
                    apartmentname={selectedservice?.subscriptionDetail?.apartmentName}
                />
                <Line width={windowwidth} conatainerstyle={{ alignSelf: "center" }} />
                {status == "check" &&
                    <>
                        <Text family='GRegular' size='medium' top={'5%'} >{'Car Available'}</Text>
                        <Toptabs
                            tabs={['Yes', 'No']}
                            activeindex={currentindex}
                            onchange={setCurrentindex}
                            width={60}
                        />
                    </>
                }

                {servicetype == "dailywash" ?
                    <Dropdown
                        label="Select Service"
                        list={recurrenceList}
                        value={selectedRecurrence}
                        onChange={(item: any) => {
                            console.log(item, "DATATTAATTAATTTATTAT");
                            setSelectedRecurrence(item.value)
                        }}
                        // onChange={(item: any) => setSelectedRecurrence(item.value)}
                        bottom={"2.5%"}

                    /> : null}

                <Text family='GRegular' size='medium' top={'2.5%'} >{'Car Reg.No'}</Text>
                <Card containerStyle={{ padding: "4%", marginTop: "2.5%" }} >
                    <Text family="GMedium" >{selectedservice?.subscriptionDetail?.registrationNo}</Text>
                </Card>

                {/* <Input  
                            key={'Mail ID'}
                            label={'Car Reg.No'}
                            labelStyle={{ marginTop: '5%' }}
                            placeHolder='e.g: TN-63-5426'
                            inputprops={{
                                editable: status == "check" ? true : false
                            }}
                        /> */}


                <Text top={"5%"} size="semilarge" family="GMedium" >{"Car Inspection"}</Text>
                <Text family="GRegular" >Check all the items in the checklist below before cleaning. If a vehicle part is damaged, choose the category from the checklist and upload the relevant damaged part photo</Text>


                {damagepics?.map((item: any, index: number) => (
                    <Damagepicture
                        title={item.title}
                        customarr={item?.photos}
                        issues={item?.issues}
                        onchangeissues={(value: string) => dispatch(setDamageissues({ index: index, issues: value }))}
                        addnfn={(value: any) => dispatch(addremove_damagepics({ type: "add", image: value, index: index }))}
                        removefn={(i: number) => dispatch(addremove_damagepics({ type: "remove", index: index, photoindex: i }))}

                    />)
                )}

                <>
                    <Text top={"2.5%"} family="GMedium" size="medium" >Timing</Text>
                    <View style={{ width: "50%", paddingHorizontal: "5%", backgroundColor: "#3984E8", paddingVertical: "2.5%", borderRadius: borderradius * 0.25, justifyContent: "center", alignItems: "center", marginTop: "2.5%" }} >
                        <Text color={theme.white} size="semilarge" >00:00:00</Text>
                    </View>
                    <Text family="GRegular" top={"2.5%"} >Job timer start 04:00 PM to 05:00 PM</Text>

                    {servicetype == "onetimewash" &&
                        <Button
                            title="cancel"
                            buttonStyle={{ width: "40%", marginTop: "5%", alignSelf: "center", borderRadius: 10, height: windowheight * 0.05, backgroundColor: Colors.red, }}
                            textStyle={{ color: theme.white }}
                            onPress={() => rejectref.current?.present()}
                        />}
                </>

                {/* <FlashList
                    data={checklist}
                    ref={listRef}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<>

                    </>}
                   

                    renderItem={({ item, index }) => (
                        status == "start" ?
                            <>
                                <Uploadphotos

                                    title={item.title}
                                    onchangephotos={(data) => updatepictures(data, index)}

                                />
                            </> : null

                    )}
                /> */}

            </View>

            <Sheet
                sheetref={bottommodalref}
                snappoint={["22.5%"]}
                onDismiss={() => setCurrentindex(0)}
            >
                <View style={{ padding: "5%" }} >
                    <Text size="medium" family="GMedium" >Car Status</Text>
                    <Text top={"2.5%"} family="GRegular" size="medium" >“Car not available at the selected location. Please confirm or reschedule your service.”</Text>
                    <Button
                        title="Go to next booking"
                        buttonStyle={{ width: "100%", marginTop: "5%" }}
                        loading={damageupload}
                        onPress={async () => {
                            const formdata = new FormData()
                            formdata.append("serviceId", selectedservice?._id)
                            formdata.append("isAvailableStatus", false)
                            const res = await serviceAvailable(formdata).unwrap()
                            console.log(res, "RESPONSE");
                            if (res?.status) {
                                dispatch(update_dailywashstate("request"))
                                navigation?.goBack()
                            }


                        }}
                    />
                </View>
            </Sheet>

            <Addonrequest ondismiss={() => setCurrentindex(0)} isreject={true} sheetref={rejectref} />
        </Mainview >
    )
}

export default JobDetails;