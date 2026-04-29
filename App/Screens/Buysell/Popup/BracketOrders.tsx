import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import Text from "../../../Components/text";
import Sheet from "../../../Components/bottomsheet";
import { Colors } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectoricons";
import { Button, Input } from "../../../Components/Field";
import Flexcomponent from "../../../Components/flexcomponent";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";

interface ProfitLossModalprops {
    ref?: any
    formData?: any
    handleChange?: any
}

const BracketOrders: React.FC<ProfitLossModalprops> = ({
    ref,
    formData,
    handleChange,
}) => {
    const { theme, closebottomsheet, failuretoast } = useCustomHooks();
    const { futureTicker, futureTradePair } = useSelector((state: any) => state.future);

    const [barketOrders, setBraketOrders] = useState<any>({})
    const [gainPrecn, setGainPercen] = useState<any>('0')
    const [lossPrecn, setLossPercen] = useState<any>('0')
    const [exitPandL, setExitPandL] = useState(0)
    const [stopPandL, setStopPandL] = useState(0)

    const [trigger, setTrigger] = useState("Market");
    const [stopLoss, setstopLoss] = useState("Market");

    const onChangeHandler = (field: any, name: any, value: any) => {
        const numberRegex = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;

        if (['stopPrice', 'price'].includes(name) && !numberRegex.test(value) && value !== '') {
            return false;
        }
        let barket: any = { ...barketOrders }
        barket[field][name] = value
        if (!isNaN(value)) {
            calculatePercentage(value, field == 'takeProfit' ? 'isTake' : 'isStop')
        }
        setBraketOrders(barket)
        calculatePandL(barket)
    }

    const checkTpandSl = (type: any, value: any, buyorsell = 'buy') => {
        if (buyorsell == 'buy' && value < futureTicker.marketPrice && type == 'isTake') {
            failuretoast('takeProfitPrice', 'Take profit price must be greater than market price')
        }
        else if (buyorsell == 'sell' && value > futureTicker.marketPrice && type == 'isTake') {
            failuretoast('takeProfitPrice', 'Take profit price must be less than market price')
        }
        if (buyorsell == 'buy' && value > futureTicker.marketPrice && type == 'isStop') {
            failuretoast('stopLossPrice', 'Stop Loss price must be less than market price')
        }
        else if (buyorsell == 'sell' && value < futureTicker.marketPrice && type == 'isStop') {
            failuretoast('stopLossPrice', 'Stop Loss price must be greater than market price')
        }
    }

    const setGainAndLoss = (type: any, value: any, buyorsell: any = 'buy', call: any = 'edit') => {
        const isTake = type === 'isTake';
        const isStop = type === 'isStop';

        const numberRegex = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;

        // Validation
        if ((parseFloat(value) < 0 || parseFloat(value) > 100 || !numberRegex.test(value)) && value !== '') {
            console.log('SetGainAndLoss - Invalid input:', value);
            return false;
        }

        if (isStop && parseFloat(value) > 99) {
            return false;
        }

        const name = isTake ? 'takeProfit' : 'stopLoss';
        isTake ? setGainPercen(value) : setLossPercen(value);
        // Handle empty input
        if (value === '') {
            let barket: any = { ...barketOrders }
            barket[name]['stopPrice'] = value
            setBraketOrders(barket)
            // onChangeHandler(name, 'stopPrice', '');
            return false;
        }

        let marketPrice = parseFloat(futureTradePair.marketPrice);
        if (buyorsell == 'sell') {
            marketPrice = isTake ? formData?.price < marketPrice ? formData?.price : marketPrice : formData?.price > marketPrice ? formData?.price : marketPrice
        } else if (buyorsell == 'buy') {
            marketPrice = isTake ? formData?.price > marketPrice ? formData?.price : marketPrice : formData?.price < marketPrice ? formData?.price : marketPrice
        }

        const percent: any = parseFloat(value);
        let stopPrice: any = 0;

        if (buyorsell === 'buy') {
            stopPrice = isTake
                ? marketPrice + (marketPrice * percent) / 100
                : marketPrice - (marketPrice * percent) / 100;
        } else if (buyorsell === 'sell') {
            stopPrice = isTake
                ? marketPrice - (marketPrice * percent) / 100
                : marketPrice + (marketPrice * percent) / 100;
        }
        stopPrice = isNaN(stopPrice) || !isFinite(stopPrice) ? 0 : stopPrice.toFixed(futureTradePair.quoteDecimal)
        // Apply updates
        if (isTake) {
            setGainPercen(value);
            checkTpandSl('isTake', stopPrice, formData?.buyorsell);
        } else {
            setLossPercen(value);
            checkTpandSl('isStop', stopPrice, formData?.buyorsell);
        }

        if (call == 'initial') {
            return stopPrice
        } else {
            let barket: any = { ...barketOrders }
            barket[name]['stopPrice'] = isNaN(stopPrice) ? '' : stopPrice
            setBraketOrders(barket)
        }
    };


    const calculatePercentage = (stopPrice: any, type: any) => {
        const buyorsell: any = formData.buyorsell
        const isTake: any = type === 'isTake';
        const isStop: any = type === 'isStop';
        let marketPrice: any = parseFloat(futureTradePair.marketPrice);
        if (buyorsell == 'sell') {
            marketPrice = isTake ? formData?.price < marketPrice ? formData?.price : marketPrice : formData?.price > marketPrice ? formData?.price : marketPrice
        } else if (buyorsell == 'buy') {
            marketPrice = isTake ? formData?.price > marketPrice ? formData?.price : marketPrice : formData?.price < marketPrice ? formData?.price : marketPrice
        }

        let percentage: any = 0;
        if (buyorsell === 'buy') {
            percentage = ((parseFloat(stopPrice) - parseFloat(marketPrice)) / parseFloat(marketPrice)) * 100;
        } else if (buyorsell === 'sell') {
            percentage = ((parseFloat(marketPrice) - parseFloat(stopPrice)) / parseFloat(marketPrice)) * 100;
        }
        percentage = (percentage).toFixed(2)
        if (isTake) {
            setGainPercen(Math.abs(percentage));
        } else if (isStop) {
            setLossPercen(Math.abs(percentage));
        }
    }

    const getPorfitCalculation = (entryPrice: any, closePrice: any, quantity: any, positionSide: any) => {
        let profit = 0
        if (positionSide == 'buy') {
            profit = (parseFloat(closePrice) - parseFloat(entryPrice)) * quantity
        } else {
            profit = (parseFloat(entryPrice) - parseFloat(closePrice)) * quantity
        }
        return profit
    }

    const calculatePandL = (order: any) => {
        const error: any = {
            takeProfit: {},
            stopLoss: {}
        };
        let stop: any, exit: any = 0
        if (trigger.toLowerCase() == 'market') {
            exit = getPorfitCalculation(order.entryPrice, isEmpty(order.takeProfit.stopPrice) ? 0 : order.takeProfit.stopPrice, order.positionFilled, order.positionSide)
        } else if (trigger.toLowerCase() == 'limit') {
            exit = getPorfitCalculation(order.entryPrice, isEmpty(order.takeProfit.price) ? 0 : order.takeProfit.price, order.positionFilled, order.positionSide)
        }

        if (stopLoss.toLowerCase() == 'market') {
            stop = getPorfitCalculation(order.entryPrice, isEmpty(order.stopLoss.stopPrice) ? 0 : order.stopLoss.stopPrice, order.positionFilled, order.positionSide)
        } else if (stopLoss.toLowerCase() == 'limit') {
            stop = getPorfitCalculation(order.entryPrice, isEmpty(order.stopLoss.price) ? 0 : order.stopLoss.price, order.positionFilled, order.positionSide)
        }
        setStopPandL(isNaN(stop) ? 0 : stop === 0 ? 0 : stop.toFixed(futureTradePair?.quoteDecimal))
        setExitPandL(isNaN(exit) ? 0 : exit === 0 ? 0 : exit.toFixed(futureTradePair?.quoteDecimal))
    }

    useEffect(() => {
        if (isEmpty(formData)) return
        let barketOrders: any = JSON.stringify(formData)
        barketOrders = JSON.parse(barketOrders)
        if (isEmpty(barketOrders.takeProfit.stopPrice)) {
            let stopPrice: any = setGainAndLoss('isTake', 0.25, formData.buyorsell, 'initial')
            barketOrders.takeProfit.stopPrice = parseFloat(stopPrice)
        }
        if (isEmpty(barketOrders.stopLoss.stopPrice)) {
            let stopPrice: any = setGainAndLoss('isStop', 0.25, formData.buyorsell, 'initial')
            barketOrders.stopLoss.stopPrice = parseFloat(stopPrice)
        }
        calculatePandL(barketOrders)
        setBraketOrders(barketOrders)
    }, [formData]);

    return (
        <Sheet
            sheetref={ref}
            snappoint={["80%"]}
            custominterface={true}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            >
                <View style={{ paddingHorizontal: "5%", flex: 1, paddingBottom: "5%" }} >
                    <View style={{ flexDirection: "row", width: windowwidth, alignSelf: "center", height: windowheight * 0.08, paddingHorizontal: "5%", justifyContent: "space-between", alignItems: "center" }} >
                        <Text color={theme.tabactive} family="semiBold">Bracket Order</Text>
                        <Pressable style={{ backgroundColor: theme.card, borderRadius: 10, padding: 10 }} onPress={() => {
                            setExitPandL(0);
                            setStopPandL(0);
                            closebottomsheet(ref)
                        }}>
                            <VectorIcons
                                family="Ionicons"
                                name="close"
                                size={windowwidth * 0.05}
                                iconcolor={theme.darktext}
                            />
                        </Pressable>
                    </View>
                    <View style={{ flex: 1 }}>
                        <BottomSheetScrollView
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{ paddingBottom: "25%" }}
                            showsVerticalScrollIndicator={false}
                        >
                            <Flexcomponent justifyContent="space-between" style={{ marginTop: 10 }}>
                                <Text style={{ color: Colors.grey }}>Entry Price</Text>
                                <Text style={{ color: theme.theme == "dark" ? Colors.white : Colors.grey }}>{formData?.price}</Text>
                            </Flexcomponent>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: '5%' }}>
                                <Text style={{ color: Colors.grey }}>Take Profit</Text>
                                <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
                                    <Pressable style={{ width: "35%", backgroundColor: theme.card, justifyContent: "center", alignItems: "center", paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: trigger === "Market" ? Colors.green : theme.boderColor }}
                                        onPress={() => { setTrigger("Market"), onChangeHandler('takeProfit', 'orderType', 'bracket_tp_market') }}>
                                        <Text style={{ color: trigger === "Market" ? Colors.green : theme.primarytext, }}>Market</Text>
                                    </Pressable>
                                    <Pressable style={{ width: "35%", backgroundColor: theme.card, justifyContent: "center", alignItems: "center", paddingVertical: 5, borderRadius: 10, marginLeft: 15, borderWidth: 1, borderColor: trigger === "Limit" ? Colors.green : theme.boderColor }}
                                        onPress={() => {
                                            setTrigger("Limit")
                                            onChangeHandler('takeProfit', 'orderType', 'bracket_tp_limit')
                                        }}>
                                        <Text style={{ color: trigger === "Limit" ? Colors.green : theme.primarytext }}>Limit</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <View style={{ marginTop: "5%" }} >
                                <Input
                                    value={barketOrders?.takeProfit?.stopPrice ?? ""}
                                    rightContent={
                                        <View style={{ backgroundColor: theme.theme === "dark" ? Colors.darkgray : Colors.dustygrey, padding: 5, borderRadius: 5, paddingHorizontal: 8, width: 60, alignItems: "center", height: 35, justifyContent: "center" }}>
                                            <Text color={Colors.white} size="small">{futureTradePair?.quoteCurrency}</Text>
                                        </View>
                                    }
                                    themes={theme}
                                    label="Trigger Price"
                                    labelStyle={{ color: Colors.grey }}
                                    onChange={(text) => onChangeHandler('takeProfit', "stopPrice", text)}
                                    style={{ textAlign: "right", marginRight: 25 }}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: "5%" }}>
                                <View style={{ width: "68%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: theme.card, height: 40, borderRadius: 10 }}>
                                    <Pressable onPress={() => { setGainAndLoss('isTake', 0.25, formData.buyorsell) }}>
                                        <Text size="small" style={{ color: theme.darktext }}>0.25%</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { setGainAndLoss('isTake', 0.5, formData.buyorsell) }}>
                                        <Text size="small" style={{ color: theme.darktext }}>0.5%</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { setGainAndLoss('isTake', 0.1, formData.buyorsell) }}>
                                        <Text size="small" style={{ color: theme.darktext }}>0.1%</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { setGainAndLoss('isTake', 0.2, formData.buyorsell) }}>
                                        <Text size="small" style={{ color: theme.darktext }}>0.2%</Text>
                                    </Pressable>
                                </View>
                                <View>
                                    <Input
                                        value={gainPrecn}
                                        rightContent={
                                            <View style={{ backgroundColor: theme.card }}>
                                                <Text style={{ color: theme.darktext }}>%</Text>
                                            </View>
                                        }
                                        themes={theme}
                                        containerprops={{ width: 100, borderColor: "#ddd", borderWidth: 0.9 }}
                                        style={{ paddingHorizontal: 10, height: 40 }}
                                        onChange={(text) => {
                                            setGainAndLoss('isTake', text, formData.buyorsell)
                                        }}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                            {
                                trigger === "Limit" && (
                                    <Input
                                        value={barketOrders?.takeProfit?.price ?? ""}
                                        rightContent={
                                            <View style={{ backgroundColor: theme.theme === "dark" ? Colors.darkgray : Colors.dustygrey, padding: 5, borderRadius: 5, paddingHorizontal: 8, width: 60, alignItems: "center", height: 35, justifyContent: "center" }}>
                                                <Text color={Colors.white} size="small">{futureTradePair?.quoteCurrency}</Text>
                                            </View>
                                        }
                                        themes={theme}
                                        label="Limit Price"
                                        labelStyle={{ color: Colors.grey }}
                                        onChange={(text) => {
                                            onChangeHandler('takeProfit', "price", text)
                                        }}
                                        style={{ textAlign: "right", marginRight: 25 }}
                                        keyboardType="numeric"
                                    />

                                )
                            }
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: "4%" }}>
                                <Text style={{ color: Colors.grey }}>Stop Loss</Text>
                                <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
                                    <Pressable style={{ width: "35%", backgroundColor: theme.card, justifyContent: "center", alignItems: "center", paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: stopLoss === "Market" ? Colors.green : theme.boderColor }}
                                        onPress={() => {
                                            setstopLoss("Market"),
                                                onChangeHandler('stopLoss', 'orderType', 'bracket_sl_market')
                                        }}>
                                        <Text style={{ color: stopLoss === "Market" ? Colors.green : theme.primarytext }}>Market</Text>
                                    </Pressable>
                                    <Pressable style={{ width: "35%", backgroundColor: theme.card, justifyContent: "center", alignItems: "center", paddingVertical: 5, borderRadius: 10, marginLeft: 15, borderWidth: 1, borderColor: stopLoss === "Limit" ? Colors.green : theme.boderColor }}
                                        onPress={() => {
                                            setstopLoss("Limit"),
                                                onChangeHandler('stopLoss', 'orderType', 'bracket_sl_limit')
                                        }}>
                                        <Text style={{ color: stopLoss === "Limit" ? Colors.green : theme.primarytext }}>Limit</Text>
                                    </Pressable>
                                </View>
                            </View>
                            {
                                stopLoss !== "Trail" && (
                                    <>
                                        <Input
                                            value={barketOrders?.stopLoss?.stopPrice ?? ""}
                                            rightContent={
                                                <View style={{ backgroundColor: theme.theme === "dark" ? Colors.darkgray : Colors.dustygrey, padding: 5, borderRadius: 5, paddingHorizontal: 8 }}>
                                                    <Text color={Colors.white} size="small">{futureTradePair?.quoteCurrency}</Text>
                                                </View>
                                            }
                                            themes={theme}
                                            label="Trigger Price"
                                            labelStyle={{ color: Colors.grey }}
                                            onChange={(text) => {
                                                onChangeHandler('stopLoss', "stopPrice", text)
                                            }}
                                            style={{ textAlign: "right", marginRight: 25 }}
                                            keyboardType="numeric"
                                        />
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: "5%" }}>
                                            <View style={{ width: "68%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: theme.card, height: 40, borderRadius: 10 }}>
                                                <Pressable onPress={() => { setGainAndLoss('isStop', 0.25, formData.buyorsell) }}>
                                                    <Text size="small" style={{ color: theme.darktext }}>0.25%</Text>
                                                </Pressable>
                                                <Pressable onPress={() => { setGainAndLoss('isStop', 0.5, formData.buyorsell) }}>
                                                    <Text size="small" style={{ color: theme.darktext }}>0.5%</Text>
                                                </Pressable>
                                                <Pressable onPress={() => { setGainAndLoss('isStop', 0.1, formData.buyorsell) }}>
                                                    <Text size="small" style={{ color: theme.darktext }}>0.1%</Text>
                                                </Pressable>
                                                <Pressable onPress={() => { setGainAndLoss('isStop', 0.2, formData.buyorsell) }}>
                                                    <Text size="small" style={{ color: theme.darktext }}>0.2%</Text>
                                                </Pressable>
                                            </View>
                                            <View>
                                                <Input
                                                    value={lossPrecn}
                                                    rightContent={
                                                        <View style={{ backgroundColor: theme.card }}>
                                                            <Text style={{ color: theme.darktext }}>%</Text>
                                                        </View>
                                                    }
                                                    themes={theme}
                                                    containerprops={{ width: 100, borderColor: "#ddd", borderWidth: 0.9 }}
                                                    style={{ paddingHorizontal: 10, height: 40 }}
                                                    onChange={(text) => {
                                                        setGainAndLoss('isStop', text, formData.buyorsell)
                                                    }}
                                                    keyboardType="numeric"
                                                />
                                            </View>
                                        </View>

                                    </>
                                )
                            }
                            {
                                stopLoss === "Limit" && (
                                    <Input
                                        value={barketOrders?.stopLoss?.price}
                                        rightContent={
                                            <View style={{ backgroundColor: theme.theme === "dark" ? Colors.darkgray : Colors.dustygrey, padding: 5, borderRadius: 5, paddingHorizontal: 8, width: 60, alignItems: "center", height: 35, justifyContent: "center" }}>
                                                <Text color={Colors.white} size="small">{futureTradePair?.quoteCurrency}</Text>
                                            </View>
                                        }
                                        themes={theme}
                                        label="Limit Price"
                                        labelStyle={{ color: Colors.grey }}
                                        onChange={(text) => {
                                            onChangeHandler('stopLoss', "price", text)
                                        }}
                                        style={{ textAlign: "right", marginRight: 25 }}
                                        keyboardType="numeric"
                                    />
                                )
                            }
                            {
                                stopLoss === "Trail" && (
                                    <Input
                                        rightContent={
                                            <View style={{ backgroundColor: theme.theme === "dark" ? Colors.darkgray : Colors.dustygrey, padding: 5, borderRadius: 5, paddingHorizontal: 8 }}>
                                                <Text color={Colors.white} size="small">{futureTradePair?.quoteCurrency}</Text>
                                            </View>
                                        }
                                        themes={theme}
                                        label="Trail Amount"
                                        labelStyle={{ color: Colors.grey }}
                                        keyboardType="numeric"
                                    />

                                )
                            }
                            <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between", marginBottom: "3%" }}>
                                <View style={{ width: "50%" }}>
                                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                        <Text size="small" style={{ color: theme.darktext }}>Exit PnL</Text>
                                        <Text size="small" style={{ color: Colors.green }}>{exitPandL} <Text size="small" style={{ color: theme.darktext }}>{futureTradePair?.quoteCurrency}</Text></Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                        <Text size="small" style={{ color: theme.darktext }} >Stop PnL</Text>
                                        <Text size="small" style={{ color: theme.darktext }}>{stopPandL} <Text size="small" style={{ color: theme.darktext }}>{futureTradePair?.quoteCurrency}</Text></Text>
                                    </View>
                                </View>
                                <Button
                                    title="Confirm"
                                    onPress={() => handleChange(barketOrders)}
                                    buttonStyle={{ width: '45%', paddingVertical: 10, backgroundColor: '#2EBD85' }}
                                />
                            </View>
                        </BottomSheetScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>

        </Sheet>
    )
}

export default BracketOrders;