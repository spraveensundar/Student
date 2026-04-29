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
import { orderTypeEnum, sideEnum } from "../../../Actions/type";
import { truncateString } from "../../../Utilities/helerfunction";
import { useLazyFutureOrderHistoryQuery } from "../../../Slices/future";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import usePriceConversion from "../../../Actions/Hooks/usePriceConversion";

interface OrderHistoryprops {
    tradeMode?: any;
    futureId?: any;
}

const OrderHistory: React.FC<OrderHistoryprops> = ({
    tradeMode,
    futureId,
}) => {
    const { theme } = useCustomHooks();
    const { futureTradePair, futurePairData } = useSelector((state: any) => state.future);
    const { convertValue } = usePriceConversion('USD', 'INR');
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const [futureOrderHistory] = useLazyFutureOrderHistoryQuery();
    const {
        data: filledOrders,
        count,
        nextPage,
        isLoadingMore,
        loadMore,
    } = usePaginatedFetch({
        apiFunc: futureOrderHistory,
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
                            <Card containerStyle={{ marginTop: "2.5%", padding: 10, width: "100%", }}>
                                <View style={{ width: "100%", }}>
                                    <Head pairname={item?.pairName} />
                                    <Card containerStyle={{ backgroundColor: theme.midblack, padding: 13, marginTop: 10 }}>
                                        <View>
                                            <Flexcomponent justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                <View style={{ width: "30%" }}>
                                                    <Text family="regular" size="small" color={Colors.stormGrey}>Qty</Text>
                                                    <Text family="medium" size="semimedium" color={Colors.green}>{parseFloat(item?.quantity).toFixed(futureTradePair?.baseDecimal)} {item?.baseCurrency}</Text>
                                                </View>
                                                <View style={{ width: "40%", alignItems: "center" }}>
                                                    <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Side</Text>
                                                    <Text family="medium" size="semimedium" color={Colors.green} align="flex-start"> {sideEnum[item?.buyorsell]}</Text>
                                                </View>
                                                <View style={{ width: "30%", alignItems: "flex-end" }}>
                                                    <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start" >Status</Text>
                                                    <Text family="medium" size="semimedium" align="flex-start">{item?.status}</Text>
                                                </View>
                                            </Flexcomponent>
                                            {isExpanded && (
                                                <>
                                                    <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                        <View style={{ width: "30%" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} >Executed</Text>
                                                            <Text family="medium" size="semimedium" >{parseFloat(item?.filledQuantity).toFixed(futureTradePair?.baseDecimal)}</Text>
                                                        </View>
                                                        <View style={{ width: "40%", alignItems: "center" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start" >Order Type</Text>
                                                            <Text family="medium" size="semimedium" align="flex-start">{orderTypeEnum[item?.orderType]}</Text>
                                                        </View>
                                                        <View style={{ width: "30%", alignItems: "flex-end" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Price</Text>
                                                            <Text family="medium" size="semimedium" align="flex-start">{parseFloat(item?.price).toFixed(futureTradePair?.quoteDecimal)}</Text>
                                                        </View>
                                                    </Flexcomponent>
                                                    <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                        <View style={{ width: "30%" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} >Trigger Price</Text>
                                                            <Text family="medium" size="semimedium">{parseFloat(item?.stopPrice).toFixed(futureTradePair?.quoteDecimal)}</Text>
                                                        </View>
                                                        <View style={{ width: "40%", alignItems: "center" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Execution Price</Text>
                                                            <Text family="medium" size="semimedium" align="flex-start">{item?.exePrice ? parseFloat(item?.exePrice).toFixed(futureTradePair?.quoteDecimal) : "-"}</Text>
                                                        </View>
                                                        <View style={{ width: "30%", alignItems: "flex-end" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Order ID</Text>
                                                            <Text family="medium" size="semimedium" align="flex-start">{item?._id ? truncateString(item?._id) : "-"}</Text>
                                                        </View>
                                                    </Flexcomponent>
                                                    <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                        <View style={{ width: "30%" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} >Trading Fee</Text>
                                                            <Text family="medium" size="semimedium" >₹ {convertValue(item?.fee).toFixed(futureTradePair?.feePrec)}</Text>
                                                            <Text family="medium" size="semimedium" >$ {item?.fee.toFixed(futureTradePair?.feePrec)}</Text>
                                                        </View>
                                                        <View style={{ width: "40%", alignItems: "center", justifyContent: "center" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Reduce-Only</Text>
                                                            <View style={{ marginRight: "45%", marginTop: "3%" }}>
                                                                {item?.reduce_only ? <VectorIcons family="Feather" name="check" iconcolor={Colors.green} /> : <VectorIcons family="Feather" name="x" iconcolor={Colors.red} />}
                                                            </View>
                                                        </View>
                                                        <View style={{ width: "30%", alignItems: "flex-end" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Date/Time</Text>
                                                            <Text family="medium" size="semimedium" align="flex-start">{momentFormat(item?.orderDate)}</Text>

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

export default OrderHistory;