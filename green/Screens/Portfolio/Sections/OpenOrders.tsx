import React, { useEffect, useRef, useState } from "react";
import { Pressable, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

import Head from "../Components/Head";
import Footer from "../Components/Footer";
import Options from "../Components/Options";
import Card from "../../../Components/Card";
import Text from "../../../Components/text";
import NoData from "../../../Components/NoData";
import CloseOrders from "../Components/CloseOrders";
import { Colors } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectoricons";
import useApiError from "../../../Actions/Hooks/errorhook";
import ProfitLossModal from "../Components/ProfitLossModal ";
import Flexcomponent from "../../../Components/flexcomponent";
import { useDeleteBracketMutation, useLazyCancelBracketQuery, useLazyFutureOpenOrdersQuery, useLazyRemoveBracketQuery } from "../../../Slices/future";
import { RFvalue, windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks, { Commonalert, useApihooks } from "../../../Actions/Hooks/customhook";

import { styles } from "../styles";
import usePaginatedFetch from "../helpers";
import { formatValue } from "../../../Utilities/helerfunction";
import { orderTypeEnum, sideEnum } from "../../../Actions/type";
import { momentFormat } from "../../../Utilities/dateTime";
import OpenPandLModel from "../Components/OpenPandLModel";
import { Input } from "../../../Components/Field";

interface OpenOrdersprops {
    tradeMode?: any;
    futureId?: any;
}

const OpenOrders: React.FC<OpenOrdersprops> = ({
    tradeMode,
    futureId,
}) => {
    const { theme, openbottomsheet, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);
    const bracketref = useRef(null);
    const { futureTradePair, wallet } = useSelector((state: any) => state.future);
    const [selectOrder, setSelectOrder] = useState({});
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const [futureOpenOrders] = useLazyFutureOpenOrdersQuery();

    const {
        data: filledOrders,
        count,
        nextPage,
        isLoadingMore,
        loadMore,
        refetch,
    } = usePaginatedFetch({
        apiFunc: futureOpenOrders,
        futureId,
        tradeMode,
    });

    const handleShowProfitLossModal = (data: any) => {
        console.log("datadatadatadata", data)
        setSelectOrder(data)
        openbottomsheet(bracketref)
    }

    const [removeBracket, { error }] = useLazyRemoveBracketQuery();
    const [cancelBracket, { error: canErr }] = useLazyCancelBracketQuery();

    useApiError(error ?? canErr);

    const removeBracketOrders = async (data: any) => {
        const response = await removeBracket(data).unwrap();
        if (response.success) {
            successtoast("Success", response.message);
            refetch()
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

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
                    let Remaining = item?.quantity - item?.filledQuantity;
                    return (
                        <Card containerStyle={style.position}>
                            <View style={{ width: "100%" }}>
                                <Head pairname={item?.pairName} />
                                <Card containerStyle={style.positionCard}>
                                    <View>
                                        <Flexcomponent justifyContent="space-between" style={{ marginVertical: 10 }}>
                                            <View style={{ width: "40%" }}>
                                                <Text family="regular" size="small" color={Colors.stormGrey}>Quantity</Text>
                                                <Text family="medium">{formatValue(parseFloat(item.quantity).toFixed(futureTradePair.baseDecimal))} {item?.baseCurrency}</Text>
                                            </View>
                                            <View style={style.center}>
                                                <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Filled/Remaining</Text>
                                                <Text family="medium" align="flex-start">{`${formatValue(item.filledQuantity)} / ${formatValue(Remaining.toFixed(futureTradePair?.baseDecimal))}`} <Text color={Colors.stormGrey}>{item?.baseCurrency}</Text></Text>
                                            </View>
                                            <View style={style.end}>
                                                <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Notional</Text>
                                                <Text family="medium" align="flex-start">{formatValue(parseFloat(item?.orderValue).toFixed(futureTradePair.quoteDecimal))}</Text>
                                            </View>
                                        </Flexcomponent>
                                        {
                                            isExpanded && (
                                                <>
                                                    <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                        <View style={{ width: "40%" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey}>Order type</Text>
                                                            <Text family="medium" color={item?.buyorsell == "buy" ? Colors.green : Colors.red}>{sideEnum[item?.buyorsell]}</Text>
                                                        </View>
                                                        <View style={style.center}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Reduce Only</Text>
                                                            <Text family="medium" color={Colors.red} align="flex-start" style={{ paddingLeft: 20 }}> {item?.reduce_only ? <VectorIcons family="Feather" name="check" iconcolor={Colors.green} /> : <VectorIcons family="Feather" name="x" iconcolor={Colors.red} />}</Text>
                                                        </View>
                                                        <View style={style.end}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Type</Text>
                                                            <Text family="medium" align="flex-start">{orderTypeEnum[item?.orderType]}</Text>
                                                        </View>
                                                    </Flexcomponent>

                                                    <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                        <View style={{ width: "40%" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} >Limit Price</Text>
                                                            <Text family="medium">{formatValue(parseFloat(item.price)?.toFixed(futureTradePair.quoteDecimal))}</Text>
                                                        </View>
                                                        <View style={style.center}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">TP / SL</Text>
                                                            {
                                                                item?.bracketOrders.length > 0 ? (
                                                                    <>
                                                                        <Text style={{ fontSize: RFvalue(10) }} align="flex-start">TP ({futureTradePair.quoteCurrency}) : </Text>
                                                                        <Text style={{ fontSize: RFvalue(10) }} align="flex-start">{item?.takeprofit?.stopPrice == null || item?.takeprofit?.stopPrice === '' ? "--" : item?.takeprofit?.stopPrice}</Text>
                                                                        <Text style={{ fontSize: RFvalue(10) }} align="flex-start">SL ({futureTradePair.quoteCurrency}) : </Text>
                                                                        <Text style={{ fontSize: RFvalue(10) }} align="flex-start">{item?.takeprofit?.stopPrice == null || item?.takeprofit?.stopPrice === '' ? "--" : item?.stoploss?.stopPrice}</Text>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Text family="medium" align="flex-start">--</Text>
                                                                    </>
                                                                )
                                                            }
                                                        </View>
                                                        <View style={style.bal}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Date/Time</Text>
                                                            <Text family="medium" style={{ fontSize: RFvalue(10) }} >{momentFormat(item?.orderDate)}</Text>
                                                        </View>
                                                    </Flexcomponent>
                                                </>
                                            )
                                        }
                                    </View>
                                </Card>
                                <Flexcomponent style={style.bottom}>
                                    <View style={style.algin}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            {item?.bracketOrders.length > 0 ? (
                                                <View style={style.between}>
                                                    <Pressable style={style.action}
                                                        onPress={() => handleShowProfitLossModal(item)} >
                                                        <VectorIcons
                                                            name="edit"
                                                            family="Feather"
                                                            size={windowwidth * 0.05}
                                                            iconcolor={theme.activetab}
                                                        />
                                                    </Pressable>
                                                    <Pressable style={style.remove}
                                                        onPress={() => {
                                                            Commonalert({
                                                                title: "Remove Bracket Orders",
                                                                des: "Are you sure want to remove bracket orders of this order ?",
                                                                yes: () => removeBracketOrders(item?._id),
                                                            });
                                                        }}>
                                                        <VectorIcons
                                                            name="trash-2"
                                                            family="Feather"
                                                            size={windowwidth * 0.05}
                                                            iconcolor={"red"}
                                                        />
                                                    </Pressable>
                                                </View>
                                            ) : (
                                                <Pressable style={style.addText} onPress={() => handleShowProfitLossModal(item)} >
                                                    <Text family="semiBold" size="small" style={style.added}> Add </Text>
                                                </Pressable>
                                            )}
                                            <Pressable onPress={() => Commonalert({
                                                title: "Cancel Order",
                                                des: "Are you sure want to cancel this order ?",
                                                yes: () => cancelBracketOrders(item?._id),
                                            })} style={style.closeContainer}>
                                                <Text family="semiBold" size="small" style={style.close}> Close </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                    <Pressable onPress={() => setExpandedIndex(isExpanded ? null : index)} style={style.det}>
                                        <Text family="medium" >Details</Text>
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

            <OpenPandLModel
                ref={bracketref}
                orderData={selectOrder}
                refetch={refetch}
            />
        </View>
    )
}

export default OpenOrders;