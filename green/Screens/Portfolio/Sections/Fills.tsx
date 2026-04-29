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
import { sideEnum } from "../../../Actions/type";
import { Colors } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectoricons";
import { momentFormat } from "../../../Utilities/dateTime";
import Flexcomponent from "../../../Components/flexcomponent";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { shortenText } from "../../../Utilities/helerfunction";
import { useLazyFuturefilledHistoryQuery } from "../../../Slices/future";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";

interface Fillsprops {
    tradeMode?: any;
    futureId?: any;
}

const Fills: React.FC<Fillsprops> = ({
    tradeMode,
    futureId,
}) => {
    const { theme } = useCustomHooks();
    const { futureTradePair, futurePairData } = useSelector((state: any) => state.future);
    const [futureFilledHistory, { isFetching }] = useLazyFuturefilledHistoryQuery();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);;

    const {
        data: filledOrders,
        count,
        nextPage,
        isLoadingMore,
        loadMore,
    } = usePaginatedFetch({
        apiFunc: futureFilledHistory,
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
                                    <Head pairname={item?.pairname} />
                                    <Card containerStyle={{ backgroundColor: theme.midblack, padding: 13, marginTop: 10 }}>
                                        <View>
                                            <Flexcomponent justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text family="regular" size="small" color={Colors.stormGrey} >Fill Qty</Text>
                                                    <Text family="medium" size="semimedium" color={Colors.green} >{parseFloat(item?.filledQuantity).toFixed(futureTradePair?.baseDecimal)} {item?.baseCurrency}</Text>
                                                </View>
                                                <View style={{ width: "40%", alignItems: "center" }}>
                                                    <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Side</Text>
                                                    <Text family="medium" size="semimedium" color={Colors.green} align="flex-start">{sideEnum[item?.side]}</Text>
                                                </View>
                                                <View style={{ width: "20%", alignItems: "flex-end" }}>
                                                    <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start" >Order Qty</Text>
                                                    <Text family="medium" size="semimedium" align="flex-start">{parseFloat(item?.orderQty).toFixed(futureTradePair?.baseDecimal)}</Text>
                                                </View>
                                            </Flexcomponent>
                                            {isExpanded && (
                                                <>
                                                    <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                        <View style={{ width: "40%" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} >Exection Price</Text>
                                                            <Text family="medium" size="semimedium" >{parseFloat(item?.price).toFixed(futureTradePair?.quoteDecimal)}</Text>
                                                        </View>
                                                        <View style={{ width: "40%", alignItems: "center" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start" >Notional</Text>
                                                            <Text family="medium" size="semimedium" align="flex-start">{parseFloat(item?.notional).toFixed(futureTradePair?.quoteDecimal)}</Text>
                                                        </View>
                                                        <View style={{ width: "20%", alignItems: "flex-end" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} >Order Type</Text>
                                                            <Text family="medium" size="semimedium" align="flex-start">{item.orderType}</Text>
                                                        </View>
                                                    </Flexcomponent>
                                                    <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                        <View style={{ width: "40%" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} >Order ID</Text>
                                                            <Text family="medium" size="semimedium">{shortenText(item.orderId)}</Text>
                                                        </View>
                                                        <View style={{ width: "40%", alignItems: "center" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Fill ID</Text>
                                                            <Text family="medium" size="semimedium" align="flex-start">{shortenText(item.filledId)}</Text>
                                                        </View>
                                                        <View style={{ width: "20%", alignItems: "flex-end" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Role</Text>
                                                            <Text family="medium" size="semimedium" align="flex-start">{item?.isMaker ? 'Maker' : "Taker"}</Text>
                                                        </View>
                                                    </Flexcomponent>
                                                    <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                        <View style={{ width: "40%" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} >Trading Fee</Text>
                                                            <Text family="medium" size="semimedium" >{item.fee}</Text>
                                                        </View>
                                                        <View style={{ width: "45%", alignItems: "center" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Date/Time</Text>
                                                            <Text family="medium" size="semimedium" align="flex-start">{momentFormat(item.created_at)}</Text>
                                                        </View>
                                                        <View style={{ width: "15%", alignItems: "flex-end" }}>
                                                        </View>
                                                    </Flexcomponent>
                                                </>
                                            )
                                            }
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

export default Fills;