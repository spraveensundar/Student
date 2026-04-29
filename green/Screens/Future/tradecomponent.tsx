import React, { useCallback, useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import Flexcomponent from "../../Components/flexcomponent"
import useCustomHooks from "../../Actions/Hooks/customhook"
import { windowheight } from "../../Utilities/dimensions"
import Text from "../../Components/text"
import { useSelector } from "react-redux"
import { useLazyFutureRecentTradeQuery } from "../../Slices/future"
import { formatToTimeOnly } from "../../Utilities/helerfunction"
import NoData from "../../Components/NoData"
import Loadercomponent from "../../Components/loadercomponent"
import useSocket from "../../Actions/Socket/sockethook"

interface Tradecomponentprops {

}


interface RecentTrade {
    Type: string;
    price: number;
    filledQuantity: number,
    createdAt: any
}


const Tradecomponent: React.FC<Tradecomponentprops> = ({

}) => {
    const { theme } = useCustomHooks()
    const styles = style(theme)
    const { futureTicker } = useSelector((state: any) => state.future);
    const [recentTradeData, setRecentTrade] = useState<RecentTrade[]>([]);

    const [recentTrades, { isFetching }] = useLazyFutureRecentTradeQuery();


    const events: any = {

        "FuturesrecentTrade": useCallback((data: any) => {
            data = JSON.parse(data)
            setRecentTrade(data)

        }, [])
    }

    useSocket({ events });

    const triggerRecentTrade = async () => {
        const res = await recentTrades(futureTicker?._id);
        console.log(res.data?.success, res.data?.success, res.data?.success, res.data?.success, res.data?.result)
        if (res.data?.success) {
            setRecentTrade(res.data?.result)
        }
        else {
            setRecentTrade([])
        }
    }

    useEffect(() => {
        triggerRecentTrade()
    }, [])

    return (
        <View style={{ flex: 1, paddingHorizontal: "1%" }} >
            <Flexcomponent height={windowheight * 0.05}>
                <View style={[styles.tableconatiner, { alignItems: "flex-start" }]} >
                    <Text family="medium" color={theme.secondarytext} size={"semimedium"}  >Price (USDT)</Text>
                </View>
                <View style={styles.tableconatiner} >
                    <Text family="medium" color={theme.secondarytext} size={"semimedium"}  >Quantity</Text>
                </View>
                <View style={[styles.tableconatiner, { alignItems: "flex-end" }]} >
                    <Text family="medium" color={theme.secondarytext} size={"semimedium"}  >Time</Text>
                </View>

            </Flexcomponent>


            {
                isFetching === true ? (
                    <Loadercomponent />
                ) : (
                    <View style={{ flex: 1 }} >
                        {
                            recentTradeData?.length > 0 ? (
                                <FlatList
                                    data={recentTradeData}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <Flexcomponent  >
                                            <View style={[styles.tableconatiner, { alignItems: "flex-start" }]} >
                                                <Text family="medium" color={item.Type == "buy" ? "#00D0B2" : "#FF0066"} size={"semimedium"}  >{item.price}</Text>
                                            </View>
                                            <View style={[styles.tableconatiner,]} >
                                                <Text family="medium" color={theme.textinput} size={"semimedium"} >{item.filledQuantity}</Text>
                                            </View>
                                            <View style={[styles.tableconatiner, { alignItems: "flex-end", }]} >
                                                <Text family="medium" color={theme.textinput} size={"semimedium"}>{formatToTimeOnly(item.createdAt)}</Text>
                                            </View>
                                        </Flexcomponent>
                                    )}
                                />
                            ) : (
                                <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
                                    <NoData />
                                </View>
                            )
                        }

                    </View>
                )
            }
        </View>
    )

}

export default Tradecomponent


const style = (theme: any) => StyleSheet.create({
    tableconatiner: {
        width: "33.3%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: "2.5%"
    },

})