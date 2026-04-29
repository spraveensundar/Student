import React, { useEffect, useState } from "react";
import { Pressable, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

import Head from "../Components/Head";
import Footer from "../Components/Footer";
import usePaginatedFetch from "../helpers";
import Options from "../Components/Options";
import Card from "../../../Components/Card";
import Text from "../../../Components/text";
import NoData from "../../../Components/NoData";
import { Colors } from "../../../Utilities/uiasset";
import { orderTypeEnum } from "../../../Actions/type";
import VectorIcons from "../../../Utilities/vectoricons";
import { momentFormat } from "../../../Utilities/dateTime";
import useApiError from "../../../Actions/Hooks/errorhook";
import { windowwidth } from "../../../Utilities/dimensions";
import Flexcomponent from "../../../Components/flexcomponent";
import useCustomHooks, { Commonalert } from "../../../Actions/Hooks/customhook";
import { useLazyCancelBracketQuery, useLazyStopOrdersQuery } from "../../../Slices/future";

import { styles } from "../styles";

interface StopHistorysprops {
    tradeMode?: any;
    futureId?: any;
}

const StopOrder: React.FC<StopHistorysprops> = ({
    tradeMode,
    futureId,
}) => {
    const { theme, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);
    const { futureTradePair } = useSelector((state: any) => state.future);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [stopOrders] = useLazyStopOrdersQuery();

    const {
        data: filledOrders,
        count,
        nextPage,
        isLoadingMore,
        loadMore,
        refetch,
    } = usePaginatedFetch({
        apiFunc: stopOrders,
        futureId,
        tradeMode,
    });

    const [cancelBracket, { error: canErr }] = useLazyCancelBracketQuery();
    useApiError(canErr);

    const cancelBracketOrders = async (data: any) => {
        const response = await cancelBracket(data).unwrap();
        if (response.success) {
            successtoast("Success", response.message);
            refetch()
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    useEffect(() => {
        if (!isEmpty(futureTradePair) && futureId.current != futureTradePair._id && futureId.current !== 'all') {
            futureId.current = futureTradePair._id;
        }
    }, [futureTradePair]);

    return (
        <View style={style.padding}>
            <FlatList
                data={filledOrders}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 10 }}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<Footer isLoading={isLoadingMore} />}
                onEndReached={() => {
                    if (filledOrders.length > 0 && count !== filledOrders.length && nextPage) {
                        loadMore();
                    }
                }}
                onEndReachedThreshold={0.3}
                renderItem={({ item, index }) => {
                    const isExpanded = expandedIndex === index;
                    return (
                        <Card containerStyle={style.position}>
                            <View style={{ width: "100%" }}>
                                <Head pairname={item?.pairName} />
                                <Card containerStyle={style.positionCard}>
                                    <View>
                                        <Flexcomponent justifyContent="space-between" style={{ marginVertical: 10 }}>
                                            <View style={{ width: "40%" }}>
                                                <Text family="regular" size="small" color={Colors.stormGrey}>Size</Text>
                                                <Text family="medium">{parseFloat(item.quantity).toFixed(futureTradePair?.baseDecimal)} {item?.baseCurrency}</Text>
                                            </View>
                                            <View style={style.center}>
                                                <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Trigger Price</Text>
                                                <Text family="medium" align="flex-start">{parseFloat(item.stopPrice).toFixed(futureTradePair?.quoteDecimal)} {item?.isTrailingOrder ? `(${item?.trailPrice})` : ""}</Text>
                                            </View>
                                            <View style={style.end}>
                                                <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Notional</Text>
                                                <Text family="medium" align="flex-start">{(parseFloat(item?.quantity || "0") * parseFloat(item?.price || "0"))
                                                    .toFixed(futureTradePair?.quoteDecimal ?? 2)}</Text>
                                            </View>
                                        </Flexcomponent>
                                        {
                                            isExpanded && (
                                                <>
                                                    <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                        <View style={{ width: "40%" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey}>Triggering Price</Text>
                                                            <Text family="medium">{parseFloat(futureTradePair?.marketPrice).toFixed(futureTradePair?.quoteDecimal)}</Text>
                                                        </View>
                                                        <View style={style.center}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Type</Text>
                                                            <Text family="medium" align="flex-start">{orderTypeEnum[item?.orderType]}</Text>
                                                        </View>
                                                        <View style={style.end}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Order Type</Text>
                                                            <Text family="medium" color={Colors.red} align="flex-start">{item?.buyorsell?.toUpperCase()}</Text>
                                                        </View>
                                                    </Flexcomponent>

                                                    <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                        <View style={{ width: "40%" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey}>Limit Price</Text>
                                                            <Text family="medium">{parseFloat(item.price).toFixed(futureTradePair?.quoteDecimal)}</Text>
                                                        </View>
                                                        <View style={style.center}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Reduce Only</Text>
                                                            <Text family="medium" color={Colors.red} align="flex-start" style={{ paddingLeft: 20 }}>{item?.reduce_only ? <VectorIcons family="Feather" name="check" iconcolor={Colors.green} /> : <VectorIcons family="Feather" name="x" iconcolor={Colors.red} />}</Text>
                                                        </View>
                                                        <View style={style.bal}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Status</Text>
                                                            <Text family="medium">{item?.status}</Text>
                                                        </View>
                                                    </Flexcomponent>
                                                    <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                        <View style={{ width: "40%" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Date/Time</Text>
                                                            <Text family="medium">{momentFormat(item?.orderDate)}</Text>
                                                        </View>
                                                    </Flexcomponent>
                                                </>
                                            )
                                        }
                                    </View>
                                </Card>
                                <Flexcomponent style={style.bottom}>
                                    <View style={style.algin}>
                                        <Pressable onPress={() => Commonalert({
                                            title: "Cancel Order",
                                            des: "Are you sure want to cancel this order ?",
                                            yes: () => cancelBracketOrders(item?._id),
                                        })} style={style.closeContainer}>
                                            <Text family="semiBold" size="small" style={style.close}> Close </Text>
                                        </Pressable>
                                    </View>
                                    <Pressable onPress={() => setExpandedIndex(isExpanded ? null : index)} style={style.det}>
                                        <Text family="medium">Details</Text>
                                        <VectorIcons
                                            family="Ionicons"
                                            name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"}
                                            size={windowwidth * 0.045}
                                            style={{ marginLeft: 10 }}
                                        />
                                    </Pressable>
                                </Flexcomponent>
                            </View>
                        </Card>
                    )
                }}
                ListEmptyComponent={() => (
                    <View style={style.noData} >
                        <NoData />
                    </View>
                )}
            />
        </View>
    )
}

export default StopOrder;