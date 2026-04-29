import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { LinearGradient } from "react-native-linear-gradient";

import Text from "../../Components/text";
import NoData from "../../Components/NoData";
import { Switch } from "../../Components/Field";
import { Colors } from "../../Utilities/uiasset";
import VectorIcons from "../../Utilities/vectoricons";
import Flexcomponent from "../../Components/flexcomponent";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { useLazyFutureOrderBookQuery } from "../../Slices/future";
import { borderradius, RFvalue, windowheight, windowwidth } from "../../Utilities/dimensions";
import Loadercomponent from "../../Components/loadercomponent";
import useSocket from "../../Actions/Socket/sockethook";
import { SOCKETURL } from "../../Actions/Constant/constant";

interface Bookprops {
    currentIndex?: any
}

interface OrderItem {
    _id: string;
    total: number;
    totalAmount: number,
    index: any
}

const Bookcomponent: React.FC<Bookprops> = ({
    currentIndex
}) => {
    const { theme } = useCustomHooks();
    const styles = style(theme);
    const { futureTicker } = useSelector((state: any) => state.future);
    const [isdepth, setIsdepth] = useState(false);
    const [orderBook, setOrderBook] = useState<{
        sellOrder: OrderItem[];
        buyOrder: OrderItem[];
    }>({
        sellOrder: [],
        buyOrder: []
    });

    const [activeindex, setActiveidnex] = useState("");
    const [activeSellOrder, setactiveSellOrder] = useState("");

    const postive = "30%"
    const nagative = "70%"

    const [futureorderBook, { isLoading, isFetching }] = useLazyFutureOrderBookQuery();

    const events: any = {

        "FuturesorderBook": useCallback((data: any) => {
            data = JSON.parse(data)
            let buyOrderTotal: number = 0;
            let sellOrderTotal: number = 0;

            let buyOrder = data?.["buyOrder"]?.map((val: any) => {
                buyOrderTotal += parseFloat(val.total) || 0;
                return { ...val, totalAmount: buyOrderTotal };
            });

            let sellOrder = data?.["sellOrder"]?.map((val: any) => {
                sellOrderTotal += parseFloat(val.total) || 0;
                return { ...val, totalAmount: sellOrderTotal };
            });
            setOrderBook({ sellOrder, buyOrder });
        }, [])
    }

    useSocket({ events });



    const triggerfurorderBook = async () => {
        const res = await futureorderBook(currentIndex);

        console.log(res.data?.success, res.data?.success, res.data?.success, res.data?.success, res.data?.success)
        if (res.data?.success) {
            let buyOrderTotal: number = 0;
            let sellOrderTotal: number = 0;

            console.log(" res.data.result.buyOrder", res.data.result.buyOrder)
            let buyOrder = res.data.result.buyOrder.map((val: any) => {
                buyOrderTotal += parseFloat(val.total) || 0;
                return { ...val, totalAmount: buyOrderTotal };
            });

            let sellOrder = res.data.result.sellOrder.map((val: any) => {
                sellOrderTotal += parseFloat(val.total) || 0;
                return { ...val, totalAmount: sellOrderTotal };
            });
            setOrderBook({ sellOrder, buyOrder });
        }
        else {
            setOrderBook({
                'buyOrder': [],
                'sellOrder': []
            });
        }
    }

    useEffect(() => {
        triggerfurorderBook()
    }, [currentIndex])

    return (
        <View style={{ flex: 1 }} >
            {/* <Flexcomponent>
                <View style={{ width: "33.3%" }} >
                    <Text family="medium" color="#00D0B1" >{futureTicker.marketPrice}</Text>
                </View>
                <View style={{ width: "33.3%", justifyContent: "center", alignItems: "center" }} >
                    <Flexcomponent style={{ borderRadius: borderradius * 0.5, width: "100%", height: windowheight * 0.045, borderWidth: 1, borderColor: "#2F2F2F" }} bakgroundcolor={theme.card} >
                        <View style={{ width: "75%", alignItems: "center" }} >
                            <Text family="medium" fontSize={RFvalue(11.5)} color={Colors.green} >Qty  <Text family="medium" fontSize={RFvalue(11.5)} color={"#6D7584"} >/ Amt</Text></Text>
                        </View>
                        <View style={{ width: "25%" }} >
                            <VectorIcons
                                name={"swap-horizontal"}
                                family="Ionicons"
                                iconcolor={theme.primarytext}
                                size={windowwidth * 0.045}
                            />
                        </View>
                    </Flexcomponent>
                </View>
                <View style={{ width: "33.3%", }} >
                    <Flexcomponent justifyContent="flex-end" >
                        <Text style={{ marginRight: "2.5%" }} family="medium" color={theme.secondarytext} >Depth</Text>
                        <Switch
                            value={isdepth}
                            onChange={setIsdepth}
                        />
                    </Flexcomponent>
                </View>
            </Flexcomponent> */}

            {/* <Flexcomponent height={windowheight * 0.05}>
                <Flexcomponent justifyContent="space-between" width={"20%"} >
                    <Text family="medium" color={theme.secondarytext} size={"semimedium"}  >Bids</Text>
                    <Text family="medium" color={"#00D0B1"} size={"semimedium"}  > 30 %</Text>
                </Flexcomponent>

                <Flexcomponent style={{ width: "57.5%" }} paddingHorizontal={"5%"} >
                    <LinearGradient
                        colors={[(theme.theme == "light" ? "#FFFFFF" : "#001714"), "transparent", "#00D0B1",]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        locations={[0, 0.1, 1]}
                        style={{ width: postive, height: windowheight * 0.025, marginRight: "2.5%" }}
                    />
                    <LinearGradient
                        colors={["#FF0066", "transparent", (theme.theme == "light" ? "#FFFFFF" : "#001714"),]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        locations={[0, 0.9, 1]}
                        style={{ width: nagative, height: windowheight * 0.025, marginLeft: "2.5%" }}
                    />
                </Flexcomponent>
                <Flexcomponent justifyContent="space-between" width={"22.5%"} >
                    <Text family="medium" color={"#FF0066"} size={"semimedium"}  >70 %</Text>
                    <Text family="medium" color={theme.secondarytext} size={"semimedium"}  > Asks</Text>
                </Flexcomponent>
            </Flexcomponent> */}

            <View style={styles.table}>
                <View style={styles.tableContent}>
                    <View style={[, { alignItems: "flex-start" }]} >
                        <Text family="medium" color={theme.secondarytext} size={"semimedium"}>Quantity</Text>
                    </View>
                    <View>
                        <Text family="medium" color={theme.secondarytext} size={"semimedium"}>Price (USDT)</Text>
                    </View>
                </View>
                <View style={{ width: "4%" }} />
                <View style={styles.tableContent}>
                    <View>
                        <Text family="medium" color={theme.secondarytext} size={"semimedium"}>Quantity</Text>
                    </View>
                    <View style={[, { alignItems: "flex-end" }]} >
                        <Text family="medium" color={theme.secondarytext} size={"semimedium"}>Price (USDT)</Text>
                    </View>
                </View>
            </View>
            {
                isFetching === true ? (
                    <Loadercomponent />
                ) : (
                    <View style={{ flex: 1, flexDirection: "row", width: "100%" }} >
                        {
                            orderBook?.buyOrder?.length > 0 ?
                                (
                                    <FlatList
                                        data={orderBook?.buyOrder}
                                        showsVerticalScrollIndicator={false}
                                        keyExtractor={(item) => item._id}
                                        style={{ width: "48%" }}
                                        renderItem={({ item, index }) => {
                                            var lastindex = orderBook?.sellOrder.length;
                                            var toam = orderBook?.sellOrder[lastindex - 1].totalAmount;
                                            var precentage = (item.totalAmount / toam) * 200;
                                            const green = theme.theme === "dark" ? theme.futuregreen : "#afebe2ff";
                                            const modeColors = theme.theme === 'dark'
                                                ? ['#18191e08', '#122D29']
                                                : ['#D5FFF9', '#D5FFF9'];
                                            return (
                                                <Flexcomponent ispress={true} onPress={() => setactiveSellOrder(item._id)} justifyContent="space-between" style={styles.content} key={index}>
                                                    <LinearGradient
                                                        colors={
                                                            (item._id === activeSellOrder
                                                                ? [green, green]
                                                                : modeColors) as string[]
                                                        }
                                                        start={{ x: 0, y: 0 }}
                                                        end={{ x: 1, y: 0 }}
                                                        style={[styles.line, item._id === activeSellOrder ? { width: 250 } : { width: `${precentage}%` }]}
                                                    />
                                                    <View style={[, { paddingVertical: "2%", alignItems: "flex-start" }]}  >
                                                        <Text family="medium" color={theme.textinput} size={"semimedium"}>{item?._id}</Text>
                                                    </View>
                                                    <View style={[, { paddingVertical: "2%", alignItems: "flex-end", marginRight: "1.5%" }]} >
                                                        <Text family="medium" color={"#00D0B2"} size={"semimedium"}>{isNaN(item.total)
                                                            ? 0
                                                            : item.total?.toFixed(futureTicker?.baseDecimal)}</Text>
                                                    </View>
                                                </Flexcomponent>
                                            )
                                        }}
                                    />
                                ) : (
                                    <View style={styles.noData}>
                                        <NoData />
                                    </View>
                                )
                        }
                        <View style={{ width: "4%" }} />
                        {
                            orderBook?.buyOrder?.length > 0 ?
                                (
                                    <FlatList
                                        data={orderBook?.sellOrder}
                                        showsVerticalScrollIndicator={false}
                                        keyExtractor={(item) => item._id}
                                        style={{ width: "48%" }}
                                        renderItem={({ item, index }) => {
                                            var lastindex = orderBook?.sellOrder.length;
                                            var toam = orderBook?.sellOrder[lastindex - 1].totalAmount;
                                            var precentage = (item.totalAmount / toam) * 200;
                                            const red = theme.theme === "dark" ? "#3E1B29" : "#f0b0c9ff";
                                            const modeColors = theme.theme === 'dark'
                                                ? ['#18191e08', '#3E1B29']
                                                : ["#FFD3E5", "#FFD3E5"];

                                            return (
                                                <Flexcomponent ispress={true} onPress={() => setActiveidnex(item._id)} justifyContent="space-between" key={index} style={styles.content}>
                                                    <LinearGradient
                                                        colors={
                                                            (item._id === activeindex
                                                                ? [red, red]
                                                                : modeColors) as string[]
                                                        }
                                                        start={{ x: 0, y: 0 }}
                                                        end={{ x: 1, y: 0 }}
                                                        style={[styles.line, item._id === activeindex ? { width: 300 } : { width: `${precentage}%` }]}
                                                    />
                                                    <View style={[{ paddingVertical: "2%", alignItems: "flex-start" }]} >
                                                        <Text family="medium" color={theme.textinput} size={"semimedium"} >{item?._id}</Text>
                                                    </View>
                                                    <View style={[{ paddingVertical: "2%", alignItems: "flex-end", }]} >
                                                        <Text family="medium" color={"#FF0066"} size={"semimedium"} >
                                                            {isNaN(item.total) ? 0 : item.total?.toFixed(futureTicker?.baseDecimal)}</Text>
                                                    </View>
                                                </Flexcomponent>
                                            )
                                        }}
                                    />
                                )
                                : (
                                    <View style={styles.noData}>
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
export default Bookcomponent


const style = (theme: any) => StyleSheet.create({
    tableconatiner: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: "2%"
        // height: windowheight * 0.045
    },
    table: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: theme.background,
        width: "100%",
        height: windowheight * 0.05,
        alignItems: "center"
    },
    tableContent: {
        width: "48%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    line: {
        position: 'absolute',
        top: 5,
        bottom: 0,
        right: 0,
        height: '100%',
        borderRadius: 10,
        zIndex: 0,
        transform: [{ translateY: -5 }],
    },
    content: {
        width: "100%",
        marginBottom: "3%",
        borderRadius: 10,
        overflow: 'hidden',
        paddingHorizontal: '3%'
    },
    noData: {
        width: "48%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: "5%"
    }

})