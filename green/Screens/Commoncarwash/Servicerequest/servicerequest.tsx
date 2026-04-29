import { Pressable, RefreshControl, View } from "react-native"
import Mainview from "../../../Components/mainview"
import Toptabs from "../../../Components/toptabs"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { windowheight, windowwidth } from "../../../Utilities/dimensions"
import Line from "../../../Components/line"
import { FlashList } from "@shopify/flash-list"
import { services } from "../../Others/Common/types"
import Rideitem from "../../Others/Common/rideitem"
import useCustomHooks, { Typeofservice } from "../../../Actions/Hooks/customhook"
import { helperSelector, update_dailywashstate, update_onetimewashstate } from "../../../Slices/helper"
import VectorIcons from "../../../Utilities/vectorIcons"
import Sheet from "../../../Components/bottomsheetmodal"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { useSelector } from "react-redux"
import Switch from "../../../Components/switch/swtich"
import Text from "../../../Components/text"
import { Button } from "../../../Components/Field"
import { Fontsize } from "../../../Utilities/uiasset"
import { setSelectedserivce, useLazyServiceListQuery } from "../../../Slices/cleaning"
import { useLazyGetAllCustomerServicesQuery } from "../../../Slices/services"
import Nodata from "../../../Components/nodata"
import Loader from "../../../Components/loader"
import { acceptFile } from "../../../Components/Field/FileUpolad/Picker/Helper"
import { useServicemanAcceptServiceMutation, useServicemanRejectServiceMutation } from "../../../Slices/onetimeservice"
import useApiError from "../../../Actions/Hooks/errorhook"
import { Toastfn } from "../../../Utilities/helerfunction"
import { update_serviceinprogress } from "../../../Slices/persistor"

const Servicerequest: React.FC = () => {
    const sheetref = useRef<BottomSheetModal | null>(null);
    const { servicetype } = useSelector(helperSelector);
    const [sheetActionProps, setSheetActionProps] = useState<{ isOpen: boolean, context: string, data?: any }>({ isOpen: false, context: '', data: '' });
    const [currentindex, setCurrentindex] = useState(0);
    const [maxreached, setMaxreached] = useState(false)
    const [page, setPage] = useState(1)

    const [filters, setFilters] = useState([
        {
            label: 'Weekly',
            isEnabled: false,
            value: "weekly"
        },
        {
            label: 'Monthly',
            isEnabled: false,
            value: "monthly"
        },
        {
            label: 'Daily',
            isEnabled: false,
            value: "daily"

        }
    ]);


    const { navigation, dispatch } = useCustomHooks()
    const [services, setServices] = useState<any>([])




    const [getAllCustomerServices, { isFetching: isLoading }] = useLazyGetAllCustomerServicesQuery()
    console.log(isLoading, "ISLOADGAl");

    const listtype = useMemo(() => {
        switch (currentindex) {
            case 0:
                return "pending"
            case 1:
                return "completed"
            case 2:
                return "cancelled"
            default:
                return "pending"
        }
    }, [currentindex])

    const recurrence = useMemo(() => {
        const result = filters
            .filter(e => e?.isEnabled)
            .map(e => e?.value)
        return result
    }, [filters])
    const { currentlocation } = useSelector(helperSelector)
    const location = currentlocation?.coordinates
    const callMyService = async () => {
        try {
            console.log(recurrence, "FILTERS");
            const today = new Date()


            let payload = {}
            if (listtype == "pending" && servicetype === 'dailywash') {
                const startdate = new Date(today)
                startdate.setHours(0, 0, 0, 0)
                const endDate = new Date(today)
                endDate.setDate(endDate.getDate() + 7)
                payload = {
                    type: listtype,
                    page: page,
                    limit: 10,
                    recurrenceType: JSON.stringify(recurrence),
                    startDate: startdate.toISOString(),
                    endDate: endDate.toISOString(),
                    locationFilter: false,

                }

            }
            else if (listtype == "pending" && servicetype === 'onetimewash') {
                const startdate = new Date(today)
                startdate.setHours(0, 0, 0, 0)
                const endDate = new Date(today)
                endDate.setDate(endDate.getDate() + 1)
                // endDate.setHours(23, 59, 59, 999)
                payload = {
                    type: listtype,
                    page: page,
                    limit: 10,
                    serviceType: Typeofservice(servicetype),
                    startDate: startdate.toISOString(),
                    endDate: endDate.toISOString(),
                    locationFilter: true,
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                    distance: 5000


                }
            }
            else {
                payload = {
                    type: listtype,
                    page: page,
                    limit: 10,
                    recurrenceType: JSON.stringify(recurrence)

                }
            }
            console.log(payload, "PAYLOAD");

            const response = await getAllCustomerServices(payload).unwrap()

            if (response?.status && response?.data?.length && !maxreached) {
                const serv: any = [...(response?.data ?? [])];
                setServices((prevstate: any) => [...prevstate, ...serv])

            }
            else {
                setMaxreached(true)
            }
        } catch (error) {
            // console.log("MyServiceListError==> ", error)
        }

    }

    const clean = async () => {
        setServices([])
        setMaxreached(false)
        setPage(1)
    }
    useEffect(() => {
        if (!maxreached) {
            callMyService()
        }
    }, [maxreached, page, currentindex]);



    const [servicemanRejectService, { isLoading: rejectload, error: rejecterror }] = useServicemanRejectServiceMutation()
    const [servicemanAcceptService, { isLoading: acceptload, error: accepeterror }] = useServicemanAcceptServiceMutation()

    useApiError(rejecterror || accepeterror)
    const accept = async (item: any) => {
        if (servicetype === 'dailywash') {
            dispatch(setSelectedserivce(item))
            dispatch(update_dailywashstate("accept"))
            navigation?.goBack()
        }
        else if (servicetype === 'onetimewash') {
            const payload = {
                serviceId: item?._id,
            }
            console.log("rejectpayload", payload);

            const response = await servicemanAcceptService(payload).unwrap()
            console.log("Rejectresponse", response);

            if (response?.status) {
                Toastfn("Service Accepted successfully")
                navigation?.navigate("Vendorhome")
                dispatch(update_serviceinprogress(item))
                dispatch(setSelectedserivce(item))
                dispatch(update_onetimewashstate("accept"))

            }
        }
    }


    const reject = async (item: any, index: number) => {
        console.log(item, "ITEM");

        const payload = {
            serviceId: item?._id,
        }
        console.log("rejectpayload", payload);

        const response = await servicemanRejectService(payload).unwrap()
        console.log("Rejectresponse", response);

        if (response?.status) {
            Toastfn("Service rejected successfully")
            const shallow = [...services]
            shallow.splice(index, 1)
            setServices(shallow)
        }
    }




    return (
        <Mainview
            isheader
            headertitle="Service Request"
            isoverlaploader={acceptload || rejectload}
            rightfn={
                servicetype === 'dailywash' ? <Pressable
                    onPress={() => {
                        setSheetActionProps(prev => ({ ...prev, isOpen: true, context: 'filters' }));
                    }}
                >
                    <VectorIcons family="Lucide" name={"sliders-horizontal"} />
                </Pressable> : null
            }
            isscollable={false}
        >
            <View style={{ flex: 1 }} >
                <Toptabs
                    tabs={["Upcoming", "Completed", "Cancelled"]}
                    activeindex={currentindex}
                    onchange={(index: number) => {
                        setCurrentindex(index),
                            clean()
                    }}
                    width={100}
                    textStyle={{ fontSize: Fontsize.semimedium }}
                    containerstyle={{ paddingVertical: windowwidth * 0.05 }}
                    paddingvertical={"3%"}
                />
                <Line width={windowwidth} conatainerstyle={{ alignSelf: "center" }} />

                <View style={{ flex: 1, }} >
                    {(!services?.length && isLoading) ?
                        <Loader isloading={isLoading} /> :
                        <FlashList
                            data={services}
                            style={{ flex: 1, }}
                            showsVerticalScrollIndicator={false}
                            refreshControl={<RefreshControl refreshing={false} onRefresh={() => {
                                clean()
                                callMyService()
                            }} />}
                            onEndReached={() => {
                                if (!maxreached) {
                                    setPage(page + 1)
                                }
                            }}
                            onEndReachedThreshold={0.025}
                            ListFooterComponent={(services?.length && isLoading) ? <Loader isloading={true} loaderstyle={{ height: windowheight * 0.1 }} /> : <></>}
                            ListEmptyComponent={<Nodata text="No services found " container={{ height: windowheight * 0.75 }} />}
                            renderItem={({ item, index }) => (
                                <Rideitem
                                    isRejectable={false}
                                    item={item}
                                    acceptfn={() => accept(item)}
                                    rejectfn={() => reject(item, index)}
                                    onview={() => navigation.navigate("Bookingdetail", { serviceitem: item })}
                                />
                            )}
                        />

                    }

                </View>
            </View>
            <Sheet
                sheetref={sheetref}
                visible={sheetActionProps?.isOpen}
                onDismiss={() => setSheetActionProps({ isOpen: false, context: '', data: '' })}
                bottomSheetProps={{
                    backgroundStyle: {
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)'
                    },
                    keyboardBehavior: "interactive",
                    keyboardBlurBehavior: "restore",
                    android_keyboardInputMode: "adjustPan",
                    footerComponent: () => (
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: windowwidth * 0.08,
                            }}
                        >
                            <Button
                                title="Submit"
                                onPress={() => {
                                    setSheetActionProps({ isOpen: false, context: '', data: '' })
                                    clean()
                                    callMyService()
                                }}
                            />
                        </View>)
                }}
                snappoint={["35%"]}
            >
                <View style={{ flex: 1, padding: windowwidth * 0.05 }} >
                    {sheetActionProps?.context === 'filters' &&
                        <View>
                            <Text family="GBold" size="medium" style={{ marginBottom: windowwidth * 0.05 }}>{'Filter by Service Request'}</Text>
                            {filters.map((filter, index) => {
                                return (
                                    <Pressable
                                        key={index}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingBottom: windowwidth * 0.05
                                        }}
                                        onPress={() => {
                                            const filterData = [...filters];
                                            filterData[index] = { ...filterData[index], isEnabled: !filterData[index].isEnabled }
                                            setFilters(filterData);
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1
                                            }}
                                        >
                                            <Text family="GRegular" size="medium">{filter.label}</Text>
                                        </View>
                                        <Switch
                                            value={filter.isEnabled}
                                            onPress={() => {
                                                const filterData = [...filters];
                                                filterData[index] = { ...filterData[index], isEnabled: !filterData[index].isEnabled }
                                                setFilters(filterData);
                                            }}
                                        />
                                    </Pressable>
                                )
                            })}
                        </View>
                    }
                </View>
            </Sheet>
        </Mainview>
    )

}

export default Servicerequest