import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import Text from "../../../Components/text";
import Sheet from "../../../Components/bottomsheet";
import { Colors } from "../../../Utilities/uiasset";
import { athuDataProps } from "../../../Actions/type";
import VectorIcons from "../../../Utilities/vectoricons";
import { Button, Input } from "../../../Components/Field";
import useApiError from "../../../Actions/Hooks/errorhook";
import Flexcomponent from "../../../Components/flexcomponent";
import { useUpdateBracketMutation } from "../../../Slices/future";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks, { useApihooks } from "../../../Actions/Hooks/customhook";

interface ProfitLossModalprops {
    ref?: any
    orderData?: any
}

const initialState = {
    pairId: "",
    positionSide: "0",
    entryPrice: "0",
    positionFilled: "0",
    exitPandL: "0",
    stopPandL: "0",
    takeProfit: {
        type: "takeprofit",
        stopPrice: "0",
        orderType: "bracket_tp_market",
        price: "0"
    },
    stopLoss: {
        type: "stoploss",
        stopPrice: "0",
        orderType: "bracket_sl_market",
        price: "0"
    }
}

const ProfitLossModal: React.FC<ProfitLossModalprops> = ({
    ref,
    orderData
}) => {
    const { theme, closebottomsheet, successtoast, failuretoast } = useCustomHooks();

    const { futureTicker, futureTradePair } = useSelector((state: any) => state.future);

    const [formdata, setFormdata] = useState<athuDataProps>(initialState);
    const [exitPandL, setExitPandL] = useState(0)
    const [stopPandL, setStopPandL] = useState(0)
    const [gainPrecn, setGainPercen] = useState<any>('0')
    const [lossPrecn, setLossPercen] = useState<any>('0')

    const [trigger, setTrigger] = useState("Market")
    const [stopLoss, setstopLoss] = useState("Market")

    const { triggerpositionOrders } = useApihooks();

    const [updateBracket, { isLoading, error, status }] = useUpdateBracketMutation();

    useApiError(error);

    const changeBraketOrder = async () => {

        const payload: any = {
            bracketOrders: [formdata.takeProfit, formdata.stopLoss],
            pairId: formdata.pairId,
            entryPrice: formdata.entryPrice,
            positionSide: formdata.positionSide,
            positionFilled: formdata.positionFilled,
        }
        const response = await updateBracket(payload).unwrap();

        if (response.success) {
            successtoast("Success", response.message);
            triggerpositionOrders()
            setExitPandL(0);
            setStopPandL(0);
            closebottomsheet(ref)
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    const checkTpandSl = (type: any, value: any, buyorsell = 'buy') => {
        try {
            if (buyorsell == 'buy' && value < futureTicker.marketPrice && type == 'isTake') {
                failuretoast('TakeProfit Price', 'Take profit price must be greater than market price')
            }
            else if (buyorsell == 'sell' && value > futureTicker.marketPrice && type == 'isTake') {
                failuretoast('TakeProfit Price', 'Take profit price must be less than market price')
            }
            if (buyorsell == 'buy' && value > futureTicker.marketPrice && type == 'isStop') {
                failuretoast('StopLoss Price', 'Stop Loss price must be less than market price')
            }
            else if (buyorsell == 'sell' && value < futureTicker.marketPrice && type == 'isStop') {
                failuretoast('StopLoss Price', 'Stop Loss price must be greater than market price')
            }
        } catch (err) {
            console.log(err, 'CheckTpandSl')
        }
    }

    const setGainAndLoss = (type: any, value: any, call = 'edit') => {
        try {
            const buyorsell = orderData.positionSide == 'short' ? 'sell' : 'buy'
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
                let barket = { ...formdata }
                barket[name]['stopPrice'] = value
                setFormdata(barket)
                checkTpandSl(isTake ? 'isTake' : 'isStop', value);
                // onChangeHandler(name, 'stopPrice', '');
                return false;
            }
            let marketPrice: any = parseFloat(futureTradePair.marketPrice);
            if (orderData.positionSide == 'short') {
                marketPrice = isTake ? orderData.entryPrice < marketPrice ? orderData.entryPrice : marketPrice : orderData.entryPrice > marketPrice ? orderData.entryPrice : marketPrice
            } else if (orderData.positionSide == 'long') {
                marketPrice = isTake ? orderData.entryPrice > marketPrice ? orderData.entryPrice : marketPrice : orderData.entryPrice < marketPrice ? orderData.entryPrice : marketPrice
            }
            marketPrice = parseFloat(marketPrice)
            const percent = parseFloat(value);
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
                // setGainPercen(value);
                checkTpandSl('isTake', stopPrice);
            } else {
                // setLossPercen(value);
                checkTpandSl('isStop', stopPrice);
            }
            if (call == 'initial') {
                return stopPrice
            } else {
                let barket = { ...formdata }
                barket[name]['stopPrice'] = isNaN(stopPrice) ? '' : stopPrice
                setFormdata(barket)
                // onChangeHandler(name, 'stopPrice', isNaN(stopPrice) ? '' : stopPrice);
            }
        } catch (err) {
            console.error('SetGainAndLoss__err', err);
        }
    };

    const calculatePercentage = (stopPrice: any, type: any) => {
        try {
            const buyorsell = orderData.positionSide == 'short' ? 'sell' : 'buy'
            const isTake = type === 'isTake';
            const isStop = type === 'isStop';
            if (stopPrice == '') {
                if (isTake) {
                    setGainPercen('');
                } else if (isStop) {
                    setLossPercen('');
                }
                return false
            }
            let marketPrice = parseFloat(futureTradePair.marketPrice);
            if (orderData.positionSide == 'short') {
                marketPrice = isTake ? orderData.entryPrice < marketPrice ? orderData.entryPrice : marketPrice : orderData.entryPrice > marketPrice ? orderData.entryPrice : marketPrice
            } else if (orderData.positionSide == 'long') {
                marketPrice = isTake ? orderData.entryPrice > marketPrice ? orderData.entryPrice : marketPrice : orderData.entryPrice < marketPrice ? orderData.entryPrice : marketPrice
            }
            let percentage: any = 0;
            if (buyorsell === 'buy') {
                percentage = ((stopPrice - marketPrice) / marketPrice) * 100;
            } else if (buyorsell === 'sell') {
                percentage = ((marketPrice - stopPrice) / marketPrice) * 100;
            }
            percentage = (percentage).toFixed(2)
            if (isTake) {
                setGainPercen(Math.abs(percentage));
            } else if (isStop) {
                setLossPercen(Math.abs(percentage));
            }
        } catch (err) {
            console.log('calculatePercentage__err', err)
        }
    }

    const onConfirm = () => {
        const error: any = {
            takeProfit: {},
            stopLoss: {}
        };

        if (isEmpty(formdata.takeProfit?.stopPrice)) {
            error.takeProfit.stopPrice = 'Stop price is required';
        }
        if (isEmpty(formdata.takeProfit?.price) && trigger === 'Limit') {
            error.takeProfit.price = 'Price is required';
        }
        if (isEmpty(formdata.takeProfit?.orderType)) {
            error.takeProfit.orderType = 'Order type is required';
        }

        if (isEmpty(formdata.stopLoss?.stopPrice)) {
            error.stopLoss.stopPrice = 'Stop price is required';
        }
        if (isEmpty(formdata.stopLoss?.price) && stopLoss === 'Limit') {
            error.stopLoss.price = 'Price is required';
        }
        if (isEmpty(formdata.stopLoss?.orderType)) {
            error.stopLoss.orderType = 'Order type is required';
        }

        if (Object.keys(error.takeProfit).length === 0) {
            delete error.takeProfit;
        }
        if (Object.keys(error.stopLoss).length === 0) {
            delete error.stopLoss;
        }
        changeBraketOrder()
    };

    const getPorfitCalculation = (entryPrice: any, closePrice: any, quantity: any, positionSide: any) => {
        try {
            console.log("getPorfitCalculation", { entryPrice, closePrice, quantity, positionSide })
            let profit = 0
            if (positionSide == 'short') {
                profit = (parseFloat(entryPrice) - parseFloat(closePrice)) * quantity
            } else {
                profit = (parseFloat(closePrice) - parseFloat(entryPrice)) * quantity
            }
            return profit
        } catch (err) {
            console.log("getPorfitCalculation_err", err)
            return 0
        }
    }

    const onChangeHandler = (field: any, name: any, value: any) => {
        const numberRegex = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
        if (['stopPrice', 'price'].includes(name) && !numberRegex.test(value) && value !== '') {
            console.log('onChangeHandler1 - Invalid input:', value);
            return false;
        }
        let barket: any = { ...formdata }
        barket[field][name] = value
        if (!isNaN(value)) {
            calculatePercentage(value, field == 'takeProfit' ? 'isTake' : 'isStop')
        }
        setFormdata(barket)
        calculatePandL(barket)
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
        if (isEmpty(order.takeProfit.stopPrice)) {
            error.takeProfit.stopPrice = 'Trigger price is required'
        } else if ((order.positionSide == 'long' && parseFloat(order.entryPrice) >= parseFloat(order.takeProfit.stopPrice))) {
            error.takeProfit.stopPrice = 'Trigger price must be greater than entry price'
        } else if ((order.positionSide == 'short' && parseFloat(order.entryPrice) <= parseFloat(order.takeProfit.stopPrice))) {
            error.takeProfit.stopPrice = 'Trigger price must be lesser than entry price'
        }
        if (isEmpty(order.stopLoss.stopPrice)) {
            error.stopLoss.stopPrice = 'Trigger price is required'
        } else if ((order.positionSide == 'long' && parseFloat(order.entryPrice) <= parseFloat(order.stopLoss.stopPrice))) {
            error.stopLoss.stopPrice = 'Trigger price must be lesser than entry price'
        } else if ((order.positionSide == 'short' && parseFloat(order.entryPrice) >= parseFloat(order.stopLoss.stopPrice))) {
            error.stopLoss.stopPrice = 'Trigger price must be greater than entry price'
        }
        if (Object.keys(error.takeProfit).length === 0) {
            delete error.takeProfit;
        }
        if (Object.keys(error.stopLoss).length === 0) {
            delete error.stopLoss;
        }
        setStopPandL(isNaN(stop) ? 0 : stop === 0 ? 0 : stop.toFixed(futureTradePair?.quoteDecimal))
        setExitPandL(isNaN(exit) ? 0 : exit === 0 ? 0 : exit.toFixed(futureTradePair?.quoteDecimal))
    }

    useEffect(() => {
        if (isEmpty(orderData)) return
        console.log(orderData?.bracketOrders, "orderData?.bracketOrders")
        const bracketOrders = orderData?.bracketOrders || [];
        const takeProfit = bracketOrders.find((el: any) => el.type === "takeprofit");
        const stopLoss = bracketOrders.find((el: any) => el.type === "stoploss");
        if (!isEmpty(takeProfit)) {
            setTrigger(takeProfit?.orderType == "bracket_tp_market" ? "Market" : 'Limit')
        }
        if (!isEmpty(stopLoss)) {
            setstopLoss(stopLoss?.orderType == "bracket_sl_market" ? "Market" : 'Limit')
        }
        const updateData = {
            pairId: orderData.pairId,
            orderId: orderData._id,
            entryPrice: orderData.price ?? orderData.entryPrice,
            positionFilled: orderData.quantity,
            positionSide: orderData.positionSide,
            takeProfit: {
                type: "takeprofit",
                stopPrice: takeProfit?.stopPrice ?? 0,
                orderType: takeProfit?.orderType ?? "bracket_tp_market",
                price: takeProfit?.price ?? 0,
            },
            stopLoss: {
                type: "stoploss",
                stopPrice: stopLoss?.stopPrice ?? 0,
                orderType: stopLoss?.orderType ?? "bracket_sl_market",
                price: stopLoss?.price ?? 0,
            }
        }
        console.log(isEmpty(updateData.takeProfit.stopPrice), isEmpty(updateData.stopLoss.stopPrice), "setGainAndLoss")
        if (isEmpty(updateData.takeProfit.stopPrice)) {
            let stopPrice = setGainAndLoss('isTake', "0.25", 'initial')
            updateData.takeProfit.stopPrice = stopPrice
        }
        if (isEmpty(updateData.stopLoss.stopPrice)) {
            let stopPrice = setGainAndLoss('isStop', "0.25", 'initial')
            updateData.stopLoss.stopPrice = stopPrice
        }
        console.log(updateData, "useEffect_ProfitLossModal")
        setFormdata((prev) => ({
            ...prev,
            ...updateData
        }));
        calculatePandL(updateData);
    }, [orderData])


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
                        <Text color={theme.tabactive} family="semiBold">Add Bracket Order: {orderData?.pairName}</Text>
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
                                <Text style={{ color: theme.theme == "dark" ? Colors.white : Colors.grey }}>{formdata?.entryPrice}</Text>
                            </Flexcomponent>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: '5%' }}>
                                <Text style={{ color: Colors.grey }}>Take Profit</Text>
                                <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
                                    <Pressable style={{ width: "35%", backgroundColor: theme.card, justifyContent: "center", alignItems: "center", paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: trigger === "Market" ? Colors.green : theme.boderColor }}
                                        onPress={() => {
                                            setTrigger("Market")
                                            onChangeHandler('takeProfit', 'orderType', 'bracket_tp_market')
                                        }}>
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
                                    value={formdata?.takeProfit?.stopPrice}
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
                                    <Pressable onPress={() => { setGainAndLoss('isTake', 0.25) }}>
                                        <Text size="small" style={{ color: theme.darktext }}>0.25%</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { setGainAndLoss('isTake', 0.5) }}>
                                        <Text size="small" style={{ color: theme.darktext }}>0.5%</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { setGainAndLoss('isTake', 0.1) }}>
                                        <Text size="small" style={{ color: theme.darktext }}>0.1%</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { setGainAndLoss('isTake', 0.2) }}>
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
                                            setGainAndLoss('isTake', text)
                                        }}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                            {
                                trigger === "Limit" && (
                                    <Input
                                        value={formdata?.takeProfit?.price}
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
                                            value={formdata?.stopLoss?.stopPrice}
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
                                                <Pressable onPress={() => { setGainAndLoss('isStop', 0.25) }}>
                                                    <Text size="small" style={{ color: theme.darktext }}>0.25%</Text>
                                                </Pressable>
                                                <Pressable onPress={() => { setGainAndLoss('isStop', 0.5) }}>
                                                    <Text size="small" style={{ color: theme.darktext }}>0.5%</Text>
                                                </Pressable>
                                                <Pressable onPress={() => { setGainAndLoss('isStop', 0.1) }}>
                                                    <Text size="small" style={{ color: theme.darktext }}>0.1%</Text>
                                                </Pressable>
                                                <Pressable onPress={() => { setGainAndLoss('isStop', 0.2) }}>
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
                                                        setGainAndLoss('isStop', text)
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
                                        value={formdata?.stopLoss?.price}
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
                                    onPress={onConfirm}
                                    buttonStyle={{ width: '45%', paddingVertical: 10, backgroundColor: '#2EBD85' }}
                                    loading={isLoading}
                                />
                            </View>
                        </BottomSheetScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>

        </Sheet>
    )
}

export default ProfitLossModal;