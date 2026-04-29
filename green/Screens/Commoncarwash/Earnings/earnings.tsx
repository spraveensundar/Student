import { useCallback, useEffect, useMemo, useState } from "react"
import Mainview from "../../../Components/mainview"
import Toptabs from "../../../Components/toptabs"
import { borderradius, windowheight, windowwidth } from "../../../Utilities/dimensions"
import Text from "../../../Components/text"
import Flexcomponent from "../../../Components/flexcomponent"
import Images, { icons } from "../../../Utilities/images"
import { FlashList } from "@shopify/flash-list"
import Earningsheader from "./earningsheader"
import { View } from "react-native"
import { Colors } from "../../../Utilities/uiasset"
import { useFetchMyEarningsMutation, useLazyGetMyEarningsQuery } from "../../../Slices/cleaning"
import { getMyEarningsQparams } from "../../../Slices/types"
import { usePagination } from "../../../Actions/Hooks/customhook"
import { PROFILEURL } from "../../../Actions/Constants/constant"
import { RefreshControl } from "react-native-gesture-handler"
import Loader from "../../../Components/loader"
import Nodata from "../../../Components/nodata"


const Earnings: React.FC = () => {
    const data = [1, 2, 3, 4, 5]
    const [currentindex, setCurrentindex] = useState(0)

    // const [triggerMyEarnings, { }] = useFetchMyEarningsMutation();

    // const handleFetchMyEarnings = useCallback(
    //     async () => {
    //         try {
    //             const date = new Date();
    //             date.setDate(date.getDate() + 30);
    //             const qParams: getMyEarningsQparams = {
    //                 startDate: new Date().toISOString(),
    //                 endDate: date.toISOString(),
    //             }
    //             const myEarningsResult = await triggerMyEarnings(qParams).unwrap();

    //             if (myEarningsResult?.status) {
    //                 console.log('myEarningsResult', myEarningsResult);
    //             }
    //         } catch (error) {
    //             console.log('FETCH-MY-EARNINGS-ERROR', error);
    //         }
    //     }, [triggerMyEarnings]);

    // useEffect(() => {
    //     (
    //         async () => {
    //             await handleFetchMyEarnings();
    //         }
    //     )();
    // }, [handleFetchMyEarnings]);

    const exrtaarg = useMemo(() => {
        const date = new Date()
        const Start = new Date(date)
        Start.setHours(0, 0, 0, 0)
        const End = new Date(date)
        switch (currentindex) {
            case 0:
                End.setDate(End.getDate())
                End.setHours(23, 59, 59, 999)
                return {
                    startDate: Start.toISOString(),
                    endDate: End.toISOString()
                }

            case 1:
                End.setDate(End.getDate() + 7)
                End.setHours(23, 59, 59, 999)
                return {
                    startDate: Start.toISOString(),
                    endDate: End.toISOString()
                }

            case 2:
                End.setDate(End.getDate() + 30)
                End.setHours(23, 59, 59, 999)
                return {
                    startDate: Start.toISOString(),
                    endDate: End.toISOString()
                }

            default:
                break;
        }

    }, [currentindex])


    const earnings = usePagination(useLazyGetMyEarningsQuery, exrtaarg, "earnings")

    return (
        <Mainview
            isheader
            headertitle="Earnings"
            isscollable={false}

        >
            <Toptabs
                tabs={["Today", "Week", "Month"]}
                activeindex={currentindex}
                onchange={(index: number) => {
                    earnings.reload()
                    setCurrentindex(index)
                }}
                width={100}
                containerstyle={{ paddingVertical: windowwidth * 0.05 }}
                paddingvertical={"3%"}
            />
            <View style={{ flex: 1 }} >
                {earnings.initialload ?
                    <Loader isloading={earnings.initialload} /> :
                    <FlashList
                        data={earnings.list as any[]}
                        style={{ flex: 1, }}
                        ListHeaderComponent={<>
                            <Earningsheader data={earnings?.excessdata} />

                        </>}
                        refreshControl={<RefreshControl refreshing={false} onRefresh={() => {
                            earnings.reload()
                        }} />}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<Nodata text="No earnings found " container={{ height: windowheight * 0.5 }} />}
                        ListFooterComponent={(earnings.footerloader) ? <Loader isloading={true} loaderstyle={{ height: windowheight * 0.1 }} /> : <></>}
                        renderItem={({ item, index }) => (
                            <Flexcomponent paddingVertical={"2.5%"} top={"2.5%"} style={{ width: "100%" }} >
                                <View style={{ width: "15%" }} >
                                    <Images
                                        type="image"
                                        source={item?.userDetail?.profile ? { uri: PROFILEURL + item?.userDetail?.profile } : icons.Rideuser}
                                        width={windowwidth * 0.125}
                                        height={windowwidth * 0.125}
                                        borderRadius={borderradius * 3}
                                        resizeMode="cover"
                                    />
                                </View>
                                <View style={{ width: "70%", paddingHorizontal: windowwidth * 0.025 }} >
                                    <Text size="medium" family="GMedium"  >{item?.userDetail?.name}</Text>
                                    <Text size="semimedium" family="GRegular"  >{item?.subscriptionDetail?.address}</Text>

                                </View>

                                <View style={{ width: "15%", justifyContent: "center", alignItems: "center" }} >
                                    <Text size="medium" color={Colors.darkgreen} >₹{item?.serviceAmount?.toFixed(1)}</Text>
                                </View>
                            </Flexcomponent>
                        )}
                    />}
            </View>
        </Mainview>
    )

}

export default Earnings