import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FlatList, View } from "react-native";
import { isEmpty } from "lodash";

import Head from "../Components/Head";
import Footer from "../Components/Footer";
import usePaginatedFetch from "../helpers";
import Card from "../../../Components/Card";
import Text from "../../../Components/text";
import Options from "../Components/Options";
import NoData from "../../../Components/NoData";
import { Colors } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectoricons";
import { momentFormat } from "../../../Utilities/dateTime";
import Flexcomponent from "../../../Components/flexcomponent";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { formatValue } from "../../../Utilities/helerfunction";
import { useLazyFutureCloseOrderQuery, useLazyFuturefilledHistoryQuery } from "../../../Slices/future";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import usePriceConversion from "../../../Actions/Hooks/usePriceConversion";

interface CloseHistoryprops {
    tradeMode?: any;
    futureId?: any;
}

const directionEnum: any = {
    'long': 'Long',
    'short': 'Short',
}


const CloseHistory: React.FC<CloseHistoryprops> = ({
    tradeMode,
    futureId,
}) => {
    const { theme } = useCustomHooks();
    const { futureTradePair, futurePairData } = useSelector((state: any) => state.future);
    const [futureCloseOrder] = useLazyFutureCloseOrderQuery();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const { convertValue } = usePriceConversion('USD', 'INR');

    const {
        data: filledOrders,
        count,
        nextPage,
        isLoadingMore,
        loadMore,
    } = usePaginatedFetch({
        apiFunc: futureCloseOrder,
        futureId,
        tradeMode,
    });

    useEffect(() => {
        if (!isEmpty(futureTradePair) && futureId.current != futureTradePair._id && futureId.current !== 'all') {
            futureId.current = futureTradePair._id;
        }
    }, [futureTradePair]);

    return (
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={filledOrders}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    style={{ paddingBottom: 50 }}
                    onEndReached={() => {
                        if (filledOrders?.length > 0 && count !== filledOrders?.length && nextPage) {
                            loadMore();
                        }
                    }}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={<Footer isLoading={isLoadingMore} />}
                    renderItem={({ item, index }) => {
                        const isExpanded = expandedIndex === index;
                        let futureTradePair = futurePairData?.find((val: any) => (val?._id.toString() == item?.pairId.toString()));
                        return (
                            <Card containerStyle={{ marginTop: "2.5%", padding: 10, width: "100%" }}>
                                <View style={{ width: "100%", }}>
                                    <Head pairname={item?.pairName} />
                                    <Card containerStyle={{ backgroundColor: theme.midblack, padding: 13, marginTop: 10 }}>
                                        <View>
                                            <Flexcomponent justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text family="regular" size="small" color={Colors.stormGrey}>Date/Time</Text>
                                                    <Text family="medium" size="small" style={{ width: "80%" }}>{momentFormat(item?.createdAt)}</Text>
                                                </View>
                                                <View style={{ width: "40%", alignItems: "center" }}>
                                                    <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Direction</Text>
                                                    <Text family="medium" size="semimedium" color={item?.closing_direction === "long" ? Colors.green : Colors.red} align="flex-start" >{directionEnum[item?.closing_direction]}</Text>
                                                </View>
                                                <View style={{ width: "20%", alignItems: "flex-end" }}>
                                                    <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start" >Entry price</Text>
                                                    <Text family="medium" size="semimedium" align="flex-start">{isNaN(item?.entryPrice) ? 0 : formatValue(parseFloat(item?.entryPrice)?.toFixed(futureTradePair?.quoteDecimal))}
                                                    </Text>
                                                    <Text family="medium" size="semimedium" align="flex-start">{futureTradePair?.quoteCurrency}</Text>
                                                </View>
                                            </Flexcomponent>
                                            {isExpanded && (
                                                <>
                                                    <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                        <View style={{ width: "40%" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} >Closing price</Text>
                                                            <Text family="medium" size="semimedium" >{isNaN(item?.closePrice)
                                                                ? 0
                                                                : formatValue(parseFloat(item?.closePrice)?.toFixed(
                                                                    futureTradePair?.quoteDecimal
                                                                ))}{" "}
                                                                {futureTradePair?.quoteCurrency}</Text>
                                                        </View>
                                                        <View style={{ width: "40%", alignItems: "center" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start" >Close quantity</Text>
                                                            <Text family="medium" size="semimedium" align="flex-start">{isNaN(item?.quantity)
                                                                ? 0
                                                                : formatValue(parseFloat(item?.quantity)?.toFixed(
                                                                    futureTradePair?.baseDecimal
                                                                ))}{" "}
                                                                {futureTradePair?.baseCurrency}</Text>
                                                        </View>
                                                        <View style={{ width: "20%", alignItems: "flex-end" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Gross P/L</Text>
                                                            <Text family="medium" size="semimedium" align="flex-start" color={Colors.green}>$ {isNaN(item?.grossPandL) ? 0
                                                                : convertValue(parseFloat(item?.grossPandL))?.toFixed(futureTradePair?.quoteDecimal)
                                                            }
                                                            </Text>
                                                            <Text family="medium" size="semimedium" align="flex-start" color={Colors.green}>₹ {isNaN(item?.grossPandL) ? 0
                                                                : parseFloat(item?.grossPandL)?.toFixed(
                                                                    futureTradePair?.quoteDecimal
                                                                )}
                                                            </Text>
                                                        </View>
                                                    </Flexcomponent>
                                                    <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                        <View style={{ width: "40%" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} >Balance</Text>
                                                            <Text family="medium" size="semimedium">{isNaN(item?.afterBalance)
                                                                ? 0
                                                                : convertValue(parseFloat(item?.afterBalance))?.toFixed(
                                                                    futureTradePair?.quoteDecimal
                                                                )}
                                                                {futureTradePair?.profitCurrency} </Text>
                                                            <Text family="medium" size="semimedium">{(item?.afterBalance ?? 0, futureTradePair?.quoteDecimal)}</Text>
                                                        </View>
                                                    </Flexcomponent>
                                                </>
                                            )}
                                        </View>
                                    </Card>
                                    <Flexcomponent style={{ justifyContent: "flex-end", marginTop: 10, width: "100%", }} ispress={true} onPress={() => setExpandedIndex(isExpanded ? null : index)}>
                                        <View style={{ flexDirection: "row", width: "auto", alignItems: "center" }}>
                                            <Text family="medium" size="semimedium">Details</Text>
                                            <VectorIcons
                                                family="Ionicons"
                                                name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"}
                                                size={windowwidth * 0.045}
                                                style={{ marginLeft: 10 }}
                                            />
                                        </View>
                                    </Flexcomponent>
                                </View>
                            </Card>
                        )
                    }}
                    ListEmptyComponent={() => (
                        <View style={{ height: windowheight * 0.5, justifyContent: "center", alignItems: "center", }} >
                            <NoData />
                        </View>
                    )}
                />
            </View>
        </View>
    )

}

export default CloseHistory;