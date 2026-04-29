import React, { useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import { windowheight } from "../../../Utilities/dimensions"
import Text from "../../../Components/text"
import Card from "../../../Components/Card"
import Flexcomponent from "../../../Components/flexcomponent"
import { Colors, limit } from "../../../Utilities/uiasset"
import { useGetpassbookMutation, useTransactionhistoryMutation } from "../../../Slices/wallet"
import useApiError from "../../../Actions/Hooks/errorhook"
import Loadercomponent from "../../../Components/loadercomponent"
import { useSelector } from "react-redux"
import { helperSelector } from "../../../Slices/helper"


interface Historyprops {
    startdate?: any,
    enddate?: any,
    transferType: string,
    selectedType?: string
}

const History: React.FC<Historyprops> = ({
    startdate,
    enddate,
    transferType = "all",
    selectedType = "all"
}: Historyprops) => {
    const { theme, convert } = useCustomHooks()

    const [getpassbook, { error, isLoading, }] = useGetpassbookMutation()


    useApiError(error)
    const [page, setPage] = useState(1)

    const { transactionlogdata } = useSelector(helperSelector)
    const [transaction, setTransactions] = useState<any[]>([])
    const [maxreached, setMaxreached] = useState(false)
    useEffect(() => {
        if (transactionlogdata) {
            console.log("new_params");
            fetchhistory()
            setPage(1)
        }
    }, [transactionlogdata])


    useEffect(() => {
        if (page) {
            fetchhistory()
        }
    }, [page])


    const fetchhistory = async () => {
        const formData = new FormData();
        formData.append("page", page)
        formData.append("limit", limit.recent_tranaction)
        formData.append("transferType", (transactionlogdata?.transferType)?.toLocaleLowerCase() ?? "all")
        formData.append("startDate", (transactionlogdata?.startdate) ?? "")
        formData.append("endDate", (transactionlogdata?.enddate) ?? "")
        formData.append("selectedType", (transactionlogdata?.selectedType)?.toLocaleLowerCase() ?? "")

        const res = await getpassbook(formData).unwrap()
        console.log(res, "responseeeeeeeeeeeeee");
        const result: any[] = res?.result?.data
        if (page == 1) {
            setTransactions(result ?? [])
        }
        else {
            setTransactions((prevstate) => [...prevstate, ...(result ?? [])])
        }

        if ((result?.length < Number(limit.recent_tranaction))) {
            setMaxreached(true)
        }

    }

    const handleNextPage = () => {
        if (!maxreached && !isLoading) {
            setPage(prev => prev + 1)
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            {(isLoading && (page == 1)) ?
                <Loadercomponent containerstyle={{ flex: 1 }} /> :
                <FlatList
                    data={transaction}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ marginTop: 20, }}
                    showsVerticalScrollIndicator={false}
                    onEndReached={() => handleNextPage()}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => {
                        return (
                            <Card containerStyle={{ padding: 15, marginBottom: 10, backgroundColor: theme.card, }}>
                                <Flexcomponent justifyContent="space-between" alignItems="center" >
                                    <View style={{ flex: 0.5, }}>
                                        <Text family="regular" size="semimedium" color={Colors.graytext} >Currency</Text>
                                        <Text family="medium" size="semimedium" style={{ marginTop: 3 }} >{item?.currencyId?.currencySymbol}</Text>
                                    </View>
                                    <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                                        <Text family="regular" size="semimedium" color={Colors.graytext} >Type</Text>
                                        <Text family="medium" size="semimedium" style={{ marginTop: 3 }} >{item?.transferType}</Text>
                                    </View>

                                </Flexcomponent>

                                <Flexcomponent justifyContent="space-between" alignItems="center" style={{ marginTop: 10 }} >
                                    <View style={{ flex: 0.5, }}>
                                        <Text family="regular" size="semimedium" color={Colors.graytext} >Before Balance</Text>
                                        <Text family="medium" size="semimedium" style={{ marginTop: 3 }}>{convert(item?.beforeBalance)}</Text>
                                    </View>
                                    <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                                        <Text family="regular" size="semimedium" color={Colors.graytext} >After Balance</Text>
                                        <Text family="medium" size="semimedium" style={{ marginTop: 3 }}>{convert(item?.afterBalance)}</Text>
                                    </View>

                                </Flexcomponent>

                                <Flexcomponent top={"5%"} justifyContent="space-between" >
                                    <Card backgroundColor={theme.background} containerStyle={{ padding: "2.5%", width: "45%", alignItems: "center" }} >
                                        <Text family="medium" size="semimedium"  >{(new Date(item?.updatedAt)).toDateString()}</Text>
                                    </Card>

                                    <View style={{ width: "50%", alignItems: "flex-end" }} >
                                        <Text color={item?.status == "completed" ? Colors.green : (item?.status == "rejected") ? Colors.red : theme.activetab} family="medium" size="semimedium"  >{item?.status}</Text>
                                    </View>
                                </Flexcomponent>

                            </Card>
                        )
                    }
                    }
                    ListFooterComponent={(page > 1 && isLoading) ?
                        <Loadercomponent containerstyle={{ height: windowheight * 0.05 }} /> : null
                    }
                    ListEmptyComponent={() => (
                        <View style={{ height: windowheight * 0.8, justifyContent: "center", alignItems: "center", }} >
                            <Text family="medium" size="small" style={{ marginTop: 10 }} >No Data Found</Text>
                        </View>

                    )}
                />

            }

        </View>
    )

}

export default History