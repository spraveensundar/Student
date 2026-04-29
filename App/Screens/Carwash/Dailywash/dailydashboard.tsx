import { FlashList } from "@shopify/flash-list"
import { RefreshControl, View } from "react-native"
import Homeheader from "./homeheader"
import Rideitem from "../../Others/Common/rideitem"
import React, { useCallback, useEffect, useState } from "react"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import { services } from "../../Others/Common/types"
import { update_dailywashstate } from "../../../Slices/helper"
import { useLazyGetpendingserviceQuery } from "../../../Slices/services"
import { setSelectedserivce } from "../../../Slices/cleaning"
import { windowheight } from "../../../Utilities/dimensions"
import Nodata from "../../../Components/nodata"

interface Dailydashprops {
    display: "flex" | "none"
}

const Dailydashboard: React.FC<Dailydashprops> = React.memo(({
    display = "none"
}) => {
    const { theme, navigation, dispatch } = useCustomHooks()
    // const data: services[] = [
    //     {
    //         type: "monthly",
    //         status: "upcomming"
    //     },
    //     {
    //         type: "weekly",
    //         status: "upcomming"
    //     },
    //     {
    //         type: "monthly",
    //         status: "upcomming"
    //     },
    //     {
    //         type: "weekly",
    //         status: "upcomming"
    //     },
    //     {
    //         type: "monthly",
    //         status: "upcomming"
    //     },

    // ]

    const renderaccept = useCallback((item: any) => {
        dispatch(setSelectedserivce(item))
        dispatch(update_dailywashstate("accept"))
    }, [])

    const [page, setPage] = useState(1)
    const [pending, setPeding] = useState<any>([])
    const [getpendingservice, { isLoading, data }] = useLazyGetpendingserviceQuery()
    console.log(data, "RTQ_RESPONSE");

    useEffect(() => {
        Getpendingservice()
    }, [page])

    const Getpendingservice = async () => {

        const datenow = new Date()
        const cureenttime = new Date(datenow)
        cureenttime.setDate(datenow.getDate())
        cureenttime.setHours(0, 0, 0, 0)

        const endDateObj = new Date(datenow);
        endDateObj.setDate(datenow.getDate())
        endDateObj.setHours(23, 59, 59, 999);
        const payload = {
            page: page,
            limit: 10,
            startDate: cureenttime.toISOString(),
            endDate: endDateObj.toISOString()

        }
        console.log(payload, "PAYLOADDDDDDDDDDDDDDDDDDDDDDDDDDDDD");

        const response = await getpendingservice(payload)
        if (response?.data?.data?.length) {
            setPeding((prevstate: any) => [...prevstate, ...(response?.data?.data || [])])
        }
        console.log(response.data, "RESGALLLLLLLLLLLLLLLLLLLL");

    }
    return (
        <View style={{ flex: 1, display: display }} >
            <FlashList
                data={pending}
                style={{ flex: 1, }}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => {
                    setPage(1)
                    setPeding([])
                    Getpendingservice()
                }} />}

                ListHeaderComponent={<>
                    <Homeheader todayscount={data?.todayCount} totalcount={data?.totalCount} />
                </>}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Nodata text="No services found this time" container={{ height: windowheight * 0.5 }} />
                }
                renderItem={({ item }) => (
                    <Rideitem
                        acceptfn={() => renderaccept(item)}
                        // onclick={() => navigation?.navigate("Bookingdetail", { status: item?.status })}
                        isRejectable={false}
                        item={item}
                        onview={() => navigation.navigate("Bookingdetail", { serviceitem: item })}

                    />
                    // <View />
                )}
            />
        </View>
    )

})

export default Dailydashboard