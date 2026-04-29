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
import { OrderList } from "../../../Actions/type";
import CloseOrders from "../Components/CloseOrders";
import { Colors } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectoricons";
import useApiError from "../../../Actions/Hooks/errorhook";
import ProfitLossModal from "../Components/ProfitLossModal ";
import Flexcomponent from "../../../Components/flexcomponent";
import { useDeleteBracketMutation } from "../../../Slices/future";
import { RFvalue, windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks, { Commonalert, useApihooks } from "../../../Actions/Hooks/customhook";

import { styles } from "../styles";

interface Positionsprops {
    tradeMode?: any;
    futureId?: any;
}

const Positions: React.FC<Positionsprops> = ({
    tradeMode,
    futureId
}) => {
    const { theme, openbottomsheet, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);
    const bracketref = useRef(null);
    const closeBracketref = useRef(null);

    const { positionDetails, futureTradePair, wallet } = useSelector((state: any) => state.future);
    const [positionOrder, setPositionOrder] = useState<OrderList[]>([]);
    const [selectOrder, setSelectOrder] = useState({});
    const [closeData, setCloseData] = useState({});
    const [pagination, setPagination] = useState({ page: 1, limit: 10 });
    const [nextPage, setnextPage] = useState(true);
    const [count, setCount] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const sideEnum: any = {
        "long": "Long",
        "short": "Short",
    }

    const handleShowProfitLossModal = (data: any) => {
        console.log("datadatadatadata", data)
        setSelectOrder({ ...data, ...{ quantity: data.positionFilled } })
        openbottomsheet(bracketref)
    }

    const handleCloseProfitLossModal = (data: any) => {
        setCloseData(data)
        openbottomsheet(closeBracketref)
    }

    const ApplyFilters = (tradeMode = 'all', pairId = 'all') => {
        try {
            if (!isEmpty(positionDetails?.data) && positionDetails?.data.length > 0) {
                let filterData: any = [...(positionDetails?.data || [])]
                if (!isEmpty(tradeMode) && tradeMode != 'all') {
                    filterData = filterData.filter((val: any) => {
                        return val.tradeMode == tradeMode
                    })
                }
                if (!isEmpty(pairId) && pairId != 'all') {
                    filterData = filterData.filter((val: any) => {
                        return val.pairId == pairId
                    })
                }
                let count = filterData.length
                const start_index = (pagination.page - 1) * pagination.limit;
                const end_index = pagination.page * pagination.limit;
                setCount(count);
                filterData.slice(start_index, end_index);
                setPositionOrder(filterData)
                if (count > filterData.length) {
                    setnextPage(true)
                } else {
                    setnextPage(false)
                }
            } else {
                setPositionOrder([])
                setCount(0);
                setnextPage(false)
            }
            setIsLoadingMore(false);
        } catch (err) {
            console.log(err, "applyFilters__err")
        }
    }

    const [deleteBracket, { error }] = useDeleteBracketMutation();
    const { triggerpositionOrders } = useApihooks();

    useApiError(error);

    const removeBracketOrders = async (data: any) => {

        const response = await deleteBracket(data).unwrap();
        if (response.success) {
            successtoast("Success", response.message);
            triggerpositionOrders();
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    useEffect(() => {
        if (!isEmpty(futureTradePair) && futureId.current != futureTradePair._id && futureId.current !== 'all') {
            futureId.current = futureTradePair._id;
        }
    }, [futureTradePair]);

    const loadMore = async () => {
        try {
            setIsLoadingMore(true);
            let Page = pagination.page + 1;
            setPagination({ ...pagination, ...{ page: Page } })
            ApplyFilters(tradeMode, futureId.current);
        } catch (err) {
            console.log(err, "LoadMore___err");
        }
    };

    useEffect(() => {
        ApplyFilters(tradeMode, futureId.current)
    }, [positionDetails, tradeMode, futureId.current])

    return (
        <View style={style.padding}>
            <FlatList
                data={positionOrder}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 10 }}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<Footer isLoading={isLoadingMore} />}
                onEndReached={() => {
                    const dataLength = positionDetails?.data?.length ?? 0;

                    if ((dataLength > 0 || count !== dataLength) && nextPage) {
                        loadMore();
                    }
                }}
                onEndReachedThreshold={0.3}
                renderItem={({ item, index }) => {
                    const isExpanded = expandedIndex === index;
                    return (
                        <Card containerStyle={style.position}>
                            <Pressable>
                                <View style={{ width: "100%" }}>
                                    <Head pairname={item?.pairName} />
                                    <Card containerStyle={style.positionCard}>
                                        <View>
                                            <Flexcomponent justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text family="regular" size="small" color={Colors.stormGrey}>Position Side</Text>
                                                    <Text color={item?.positionSide === "long" ? Colors.green : Colors.red} family="medium" size="semimedium" >{sideEnum[item?.positionSide]}</Text>
                                                </View>
                                                <View style={style.center}>
                                                    <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Size</Text>
                                                    <Text family="medium" size="semimedium" color={Colors.stormGrey} align="flex-start">{parseFloat(item?.positionFilled).toFixed(item?.pairData?.baseDecimal)}</Text>
                                                </View>
                                                <View style={style.end}>
                                                    <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Notional</Text>
                                                    <Text family="medium" size="semimedium" color={Colors.stormGrey} align="flex-start">{(
                                                        parseFloat(item?.positionFilled ?? 0) *
                                                        parseFloat(item?.entryPrice ?? 0)
                                                    ).toFixed(item?.pairData?.quoteDecimal ?? 2).toString()}</Text>
                                                </View>
                                            </Flexcomponent>
                                            {isExpanded && (
                                                <>
                                                    <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                        <View style={{ width: "40%" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} >Entry Price</Text>
                                                            <Text family="medium" size="semimedium" >{parseFloat(item?.entryPrice).toFixed(item?.pairData?.quoteDecimal)}</Text>
                                                        </View>
                                                        <View style={style.center}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Mark Price</Text>
                                                            <Text family="medium" size="semimedium" color={Colors.stormGrey} align="flex-start">{item?.close_price}</Text>
                                                        </View>
                                                        <View style={style.end}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">Liq.Price</Text>
                                                            <Text family="medium" size="semimedium" color={Colors.red} align="flex-start">{parseFloat(item?.liquidityPrice)?.toFixed(item?.pairData?.quoteDecimal) ?? 0}</Text>
                                                        </View>
                                                    </Flexcomponent>
                                                    <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ marginVertical: 10 }}>
                                                        <View style={{ width: "40%" }}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} >Margin</Text>
                                                            <Text family="medium" size="semimedium" >{parseFloat(item?.initialMargin)?.toFixed(item?.pairData?.quoteDecimal) ?? 0}</Text>
                                                        </View>
                                                        <View style={style.center}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">UPNL</Text>
                                                            <Text family="medium" size="semimedium" color={item.pnl > 0 ? Colors.lightGreen : Colors.red} align="flex-start">{parseFloat(item?.pnl).toFixed(item?.pairData?.quoteDecimal)}</Text>
                                                        </View>
                                                        <View style={style.bal}>
                                                            <Text family="regular" size="small" color={Colors.stormGrey} align="flex-start">TP / SL</Text>
                                                            {
                                                                item?.bracketOrders.length > 0 ? (
                                                                    <>

                                                                        <View>
                                                                            <Text family="medium" style={{ fontSize: RFvalue(10) }}>TP ({futureTradePair.quoteCurrency}) : {item?.takeprofit?.stopPrice == null || item?.takeprofit?.stopPrice === '' ? "--" : item?.takeprofit?.stopPrice}</Text>
                                                                            <Text family="medium" size="semimedium" style={{ fontSize: RFvalue(10) }}>SL ({futureTradePair.quoteCurrency}) : {item?.takeprofit?.stopPrice == null || item?.takeprofit?.stopPrice === '' ? "--" : item?.stoploss?.stopPrice}</Text>
                                                                        </View>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Text family="medium" align="flex-start">--</Text>
                                                                    </>
                                                                )
                                                            }
                                                        </View>
                                                    </Flexcomponent>
                                                </>
                                            )}
                                        </View>
                                    </Card>
                                    {/* {
                                    isExpanded && (
                                        <Switch
                                            label="Auto top up"
                                            value={enabled}
                                            onChange={() => setEnabled(!enabled)}
                                            containerStyle={{ marginVertical: 10, height: 23, width: 45 }}
                                            circleStyle={{ height: 16, width: 16 }}
                                        />
                                    )
                                } */}
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
                                                                    yes: () => removeBracketOrders({
                                                                        pairId: item?.pairId,
                                                                        positionSide: item?.positionSide
                                                                    }),
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
                                                <Pressable onPress={() => handleCloseProfitLossModal(item)} style={style.closeContainer}>
                                                    <Text family="semiBold" size="small" style={style.close}> Close </Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                        <Pressable onPress={() => setExpandedIndex(isExpanded ? null : index)} style={style.det}>
                                            <Text family="medium" size="semimedium">Details</Text>
                                            <VectorIcons
                                                family="Ionicons"
                                                name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"}
                                                size={windowwidth * 0.045}
                                                style={{ marginLeft: 10 }}
                                            />
                                        </Pressable>
                                    </Flexcomponent>
                                </View>
                            </Pressable>
                        </Card>
                    )
                }}
                ListEmptyComponent={() => (
                    <View style={style.noData} >
                        <NoData />
                    </View>
                )}
            />

            <ProfitLossModal
                ref={bracketref}
                orderData={selectOrder}
            />

            <CloseOrders
                ref={closeBracketref}
                data={closeData}
            />

        </View>
    )
}

export default Positions;