
import React, { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { isEmpty } from "lodash";

import Leverage from "./Popup/Leverage";
import Text from "../../Components/text";
import Bookcomponent from "../Future/book"
import PlaceOrder from "./Popup/PlaceOrder";
import Images from "../../Utilities/images";
import ProfitOption from "./Popup/ProfitOption";
import { futureState } from "../../Actions/type";
import Mainview from "../../Components/mainview";
import BracketOrders from "./Popup/BracketOrders";
import AccountMargin from "./Popup/AccountMargin";
import Linecomponent from "../../Components/line";
import VectorIcons from "../../Utilities/vectoricons";
import useApiError from "../../Actions/Hooks/errorhook";
import Flexcomponent from "../../Components/flexcomponent";
import { Colors, Fontsize } from "../../Utilities/uiasset";
import useCustomHooks, { useApihooks } from "../../Actions/Hooks/customhook";
import Checkbox from "../../Components/Field/Input/Checkbox";
import { Button, Dropdown, Input } from "../../Components/Field";
import { getOrderTypeLabel } from "../../Utilities/helerfunction";
import UpdateMargin from "../Profile/SubAccount/Manage/UpdateMargin";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import { RFvalue, windowheight, windowwidth } from "../../Utilities/dimensions";
import { useFutureLeverageMutation, useFutureOrderPlacingMutation } from "../../Slices/future";
import { LotToquantity, quantityToLot, QuantityToVolume, VolumeToquantity } from "../../Actions/Hooks/usePriceConversion";

import { styles } from "./styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Buysell'>;

const initialState = {
    pairId: "",
    price: "",
    quantity: "",
    buyorsell: "buy",
    reduce_only: false,
    makeronly: false,
    isTrailingOrder: false,
    trailPrice: 0,
    trailTypePrice: 0,
    trailType: "market",
    orderType: "limit",
    isTake: false,
    isStop: false,
    typeTIF: "",
    orderCost: 0,
    orderValue: 0,
    margin: 0,
    fees: 0,
    stopPrice: "",
    leverage: 1,
    takeProfit: {
        stopPrice: "",
        price: "",
        orderType: "bracket_tp_market"
    },
    stopLoss: {
        stopPrice: "",
        price: "",
        orderType: "bracket_sl_market"
    }
}

const quantityPercentage = [25, 50, 75, 100]

const Buysell: React.FC<Props> = () => {
    const { theme, navigation, bottomsheetref, closebottomsheet, openbottomsheet, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);

    const updateMarginsheetref = useRef<BottomSheetModal>(null);
    const placeOrderref = useRef<BottomSheetModal>(null);
    const profitOptionref = useRef<BottomSheetModal>(null);
    const addBracketref = useRef<BottomSheetModal>(null);
    const leverageref = useRef<BottomSheetModal>(null);

    const { accountName, marginMode, accountId, kycStatus } = useSelector((state: any) => state.auth.userData);
    const { futureTradePair, futureTicker } = useSelector((state: any) => state.future);
    const { wallet } = useSelector((state: any) => state.future);

    const [formData, setFormData] = useState<futureState>(initialState);
    const [leverage, setLeverage] = useState(1);
    const [expand, setExpand] = useState(true);
    const [balPrecen, setBalPrecen] = useState<any>('0');
    const [quantityIn, setQuantityIn] = useState('lot');
    const [lotQuantity, setlotQuantity] = useState('');
    const [isEdit, setIsEdit] = useState<any>(false);

    const handleOrderListSelect = (value: any) => {
        setBalPrecen('0');
        setlotQuantity('')
        setFormData(prev => ({
            ...prev, ...{
                quantity: "",
                orderCost: 0,
                orderValue: 0,
                margin: 0,
                fees: 0,
                orderType: value,
                makeronly: value === 'makeronly' ? true : false,
                isTrailingOrder: value === 'trailingStop' ? true : false,
            }
        }));
        closebottomsheet(bottomsheetref);
    };

    const setInitalData = () => {
        setFormData({
            ...formData, ...{
                price: futureTradePair.marketPrice,
                pairId: futureTradePair._id,
                trailTypePrice: futureTradePair.marketPrice
            }
        })
    }

    useEffect(() => {
        if (isEmpty(formData.price) && isEmpty(formData.pairId)) {
            setInitalData()
        }
    }, [futureTradePair])

    const removeBracketOrders = () => {
        setFormData({
            ...formData,
            isTake: false,
            isStop: false,
            takeProfit: {
                stopPrice: "",
                price: "",
                orderType: "bracket_tp_market"
            },
            stopLoss: {
                stopPrice: "",
                price: "",
                orderType: "bracket_sl_market"
            }
        })
    }

    const calculateOrderValue = (quantity: any, price: any) => {
        const orderValueRaw: any = quantity * price;
        const orderValue: any = isNaN(orderValueRaw) ? 0
            : parseFloat(orderValueRaw).toFixed(futureTradePair.quoteDecimal);

        const orderCostRaw: any = (quantity * price) / (leverage ? leverage : 1);
        const orderCost = isNaN(orderCostRaw) ? 0 : orderCostRaw.toFixed(futureTradePair.quoteDecimal);

        /** Calculate Fee */
        let fees: any = (orderValueRaw * futureTradePair.takerFee / 100) * 2
        let margin: any = parseFloat(orderCostRaw) + parseFloat(fees)
        console.log("calculateOrderValue", orderValueRaw, orderCost, fees, leverage);
        fees = isNaN(fees)
            ? 0 : parseFloat(fees).toFixed(futureTradePair.quoteDecimal)
        margin = isNaN(margin)
            ? 0 : parseFloat(margin).toFixed(futureTradePair.quoteDecimal)

        const updatedForm: any = {
            ...formData,
            quantity,
            orderValue,
            orderCost,
            fees,
            margin
        };
        setFormData(updatedForm);
    };

    const handleBalanceprecn = (percentage: any) => {
        const price =
            formData.orderType === "market" || formData.orderType === "stop"
                ? futureTradePair.marketPrice
                : parseFloat(formData.price);

        if (!price || !isFinite(price)) {
            console.warn("Invalid price", price);
            return;
        }

        let investBalance = (wallet?.availableBalance * (Number(percentage) / 100)) || 0;
        investBalance = parseFloat(investBalance.toFixed(futureTradePair.quoteDecimal));

        if (percentage === 100) {
            const feePercent = parseFloat(futureTradePair.makerFee) + parseFloat(futureTradePair.takerFee);

            const orderValue = investBalance * formData.leverage;
            let fee = orderValue * (feePercent / 100);

            if (!isFinite(fee)) fee = 0;
            investBalance -= fee;
        }

        let quantity = (investBalance / price) * formData.leverage || 0;

        quantity = parseFloat(quantity.toFixed(futureTradePair.baseDecimal));
        let lotQuantity: any = quantity
        if (quantityIn == 'lot') {
            lotQuantity = quantityToLot(lotQuantity, futureTradePair.minAmount, futureTradePair.baseDecimal)
        }
        else if (quantityIn == futureTradePair.quoteCurrency) {
            lotQuantity = QuantityToVolume(lotQuantity, price, futureTradePair.baseDecimal)
        } else if (quantityIn == futureTradePair.quoteCurrency) {
            lotQuantity = QuantityToVolume(lotQuantity, price, futureTradePair.baseDecimal)
        }
        setlotQuantity(lotQuantity)
        calculateOrderValue(quantity, price);
        setBalPrecen(percentage);
    };

    const onChangeHandler = (name: any, value: any) => {
        const numbers = /^[+]?([0-9]+(?:\.[0-9]*)?|\.[0-9]+)$/;
        console.log(name, value, "onChangeHandler__quantity")
        if (['price', 'quantity', 'stopPrice', 'orderType'].includes(name)) {
            if (value !== "" && !numbers.test(value)) return false;
        }
        if (name === 'price') {
            const price = ['market', 'stop_market', 'take_profit'].includes(formData.orderType)
                ? futureTradePair.marketPrice
                : parseFloat(value);
            calculateOrderValue(formData.quantity, price);
        }
        if (name === 'quantity') {
            const price = ['market', 'trailingStop'].includes(formData.orderType)
                ? futureTradePair.marketPrice : ['stop_market', 'take_profit'].includes(formData.orderType) ?
                    formData.stopPrice
                    : parseFloat(formData.price);
            setBalPrecen('0');
            let quantity = value
            if (quantityIn == 'lot') {
                const decimal = /^[+]?[0-9]+$/
                if (value !== "" && !decimal.test(value)) return false;
                let maxLot = quantityToLot(futureTradePair.maxAmount, futureTradePair.minAmount, futureTradePair.baseDecimal)
                let minLot = quantityToLot(futureTradePair.minAmount, futureTradePair.minAmount, futureTradePair.baseDecimal)
                console.log(maxLot, minLot, "maxLot,minLot")
                if (parseFloat(value) < parseFloat(minLot) || parseFloat(value) > parseFloat(maxLot)) {
                    return false
                }
                quantity = LotToquantity(value, futureTradePair.minAmount, futureTradePair.baseDecimal)
            } else if (quantityIn == futureTradePair.quoteCurrency) {
                quantity = VolumeToquantity(value, price, futureTradePair.baseDecimal)
            }
            setlotQuantity(value)
            calculateOrderValue(quantity, price);
            return;
        }
        if (name === 'stopPrice' && formData.orderType === 'trailingStop') {
            setFormData(prev => ({ ...prev, trailPrice: value }));
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLeverageSliderChange = (e: any) => {
        const rawValue = Number(e);
        const clampedValue = Math.max(rawValue, 1);
        setLeverage(clampedValue)
    };

    const handleLeverageButtonClick = (percent: any) => {
        const calculatedValue = (percent / 100) * futureTradePair.max_leverage;
        const clampedValue = Math.max(calculatedValue, 1);
        setLeverage(clampedValue)
    };

    const [futureOrderPlacing, { isLoading, error }] = useFutureOrderPlacingMutation();
    const [futureChangeLeverage, { isLoading: levgLod, error: levgErr }] = useFutureLeverageMutation();
    const { triggerpositionOrders } = useApihooks();

    useApiError(error ?? levgErr);

    const orderPlacing = async () => {
        formData['orderType'] = ({ makeronly: "limit", trailingStop: "stop_market" } as Record<string, string>
        )[formData.orderType] || formData.orderType;
        const response = await futureOrderPlacing(formData).unwrap()
        if (response.success) {
            closebottomsheet(placeOrderref)
            successtoast("Success", response.message);
            triggerpositionOrders();
            setlotQuantity('0')
            setBalPrecen('0')
            setFormData({
                ...initialState, ...{
                    buyorsell: formData.buyorsell,
                    orderType: formData.orderType === 'limit' ? formData.orderType : formData.makeronly ? 'makeronly' : formData.isTrailingOrder ? 'trailingStop' : formData.orderType,
                    pairId: formData.pairId,
                    price: formData.price,
                    takeProfit: {
                        stopPrice: "",
                        price: "",
                        orderType: "bracket_tp_market"
                    },
                    stopLoss: {
                        stopPrice: "",
                        price: "",
                        orderType: "bracket_sl_market"
                    }
                }
            })
        } else {
            setFormData({
                ...formData, ...{
                    orderType: formData.orderType === 'limit' ? formData.orderType : formData.makeronly ? 'makeronly' : formData.isTrailingOrder ? 'trailingStop' : formData.orderType,
                }
            })
            if (!isEmpty(response.message)) {
                openbottomsheet(placeOrderref)
            } else {
                closebottomsheet(placeOrderref)
            }
        }
    }

    useEffect(() => {
        setInitalData()
    }, [formData.orderType])

    useEffect(() => {
        if (!isEmpty(formData.quantity)) {
            let lotQuantity = formData.quantity
            if (quantityIn == 'lot') {
                lotQuantity = quantityToLot(lotQuantity, futureTradePair.minAmount, futureTradePair.baseDecimal)
            }
            setlotQuantity(lotQuantity)
        }
    }, [quantityIn])

    useEffect(() => {
        if (!isEmpty(formData.quantity)) {
            let lotQuantity = formData.quantity
            const price = ['market', 'trailingStop'].includes(formData.orderType)
                ? futureTradePair.marketPrice :
                ['stop_market', 'take_profit'].includes(formData.orderType) ?
                    formData.stopPrice
                    : parseFloat(formData.price);
            if (quantityIn == 'lot') {
                lotQuantity = quantityToLot(lotQuantity, futureTradePair.minAmount, futureTradePair.baseDecimal)
            } else if (quantityIn == futureTradePair.quoteCurrency) {
                lotQuantity = QuantityToVolume(lotQuantity, price, futureTradePair.quoteDecimal)
            }
            setlotQuantity(lotQuantity)
        }
    }, [quantityIn])

    useEffect(() => {
        if (['market', 'trailingStop'].includes(formData.orderType) && !isEdit) {
            let lotQuantity = formData.quantity
            if (quantityIn == futureTradePair.quoteCurrency) {
                lotQuantity = QuantityToVolume(lotQuantity, futureTicker.marketPrice, futureTradePair.quoteDecimal)
                setlotQuantity(lotQuantity)
            }
        }
    }, [futureTicker])

    const changeLeverage = async (value: any) => {
        if (value < 1) return false;
        setFormData({ ...formData, ...{ leverage: value } })
        const payload = { leverage: value, pairId: futureTradePair._id }
        const response = await futureChangeLeverage(payload).unwrap();
        if (response.success) {
            successtoast("Success", response.message);
        } else {
            console.log("asdf")
        }
    }

    return (
        <Mainview
            isheader={false}
            horizontalpadding={"5%"}
        >
            <Flexcomponent top={"5%"} justifyContent="space-between" alignItems="center" >
                <Button
                    title="BUY / LONG"
                    textStyle={{ color: formData.buyorsell == 'buy' ? "#fff" : theme.darktext }}
                    onPress={() => { setFormData({ ...formData, ...{ buyorsell: 'buy' } }) }}
                    style={[style.buy, { backgroundColor: formData.buyorsell == 'buy' ? Colors.green : "transparent" }]}
                />
                <Button
                    title="SELL / SHORT"
                    textStyle={{ color: formData.buyorsell == 'sell' ? theme.darktext : "#fff" }}
                    onPress={() => { setFormData({ ...formData, ...{ buyorsell: 'sell' } }) }}
                    style={[style.sellBtn, { backgroundColor: formData.buyorsell == 'sell' ? Colors.red : "transparent" }]}
                />
                <Pressable onPress={() => navigation.goBack()} style={style.close} >
                    <Images
                        type='svg'
                        name='Bottomclose'
                        width={windowwidth * 0.07}
                        height={windowwidth * 0.07}
                    />
                </Pressable>
            </Flexcomponent>
            <Flexcomponent justifyContent="space-between" top={"5%"} >
                <Flexcomponent ispress={true} onPress={() => openbottomsheet(leverageref)} justifyContent="space-between" style={style.card} width={"60%"} paddingVertical={"3%"} bakgroundcolor={theme.card} paddingHorizontal={"5%"} >
                    <View style={{ width: "80%" }}>
                        <Text numoflines={1} color={Colors.grey}>Leverage <Text color={Colors.green} >{leverage}x</Text></Text>
                    </View>
                    <VectorIcons
                        family="Ionicons"
                        name={"chevron-down"}
                        iconcolor={theme.inversetext}
                        size={windowwidth * 0.05}
                    />
                </Flexcomponent>
                <Flexcomponent ispress={true} justifyContent="space-between" style={style.card} width={"35%"} paddingVertical={"3%"} bakgroundcolor={theme.card} paddingHorizontal={"5%"}
                    onPress={() => { openbottomsheet(bottomsheetref) }} >
                    <Text style={{ textTransform: "capitalize" }}>{marginMode} </Text>
                    <VectorIcons
                        name={"chevron-down"}
                        iconcolor={theme.inversetext}
                        family="Ionicons"
                        size={windowwidth * 0.05}
                    />
                </Flexcomponent>
            </Flexcomponent>
            <View style={style.lines}>
                <View style={style.menu}>
                    <Pressable style={{ width: "25%" }} onPress={() => { setFormData({ ...initialState, ...{ buyorsell: formData.buyorsell, orderType: 'limit' } }) }}>
                        <Text size="tiny" color={formData?.orderType === 'limit' ? theme.futuretext : Colors.grey}>Limit</Text>
                    </Pressable>
                    <Pressable style={{ width: "25%" }} onPress={() => { setFormData({ ...initialState, ...{ buyorsell: formData.buyorsell, orderType: 'market' } }) }}>
                        <Text size="tiny" color={formData?.orderType === 'market' ? theme.futuretext : Colors.grey}>Market</Text>
                    </Pressable>
                    <View style={{ width: "50%" }}>
                        <Pressable onPress={() => {
                            if (formData?.orderType === "limit" || formData?.orderType === "market") {
                                setFormData({ ...formData, orderType: "stopLimit" });
                            }
                            openbottomsheet(profitOptionref);
                        }}>
                            <Text size="tiny" color={formData?.orderType === 'stopLimit' ? theme.futuretext : Colors.grey}>{getOrderTypeLabel(formData?.orderType)}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            <View style={style.container}>
                <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
                    {
                        !['makeronly', 'market', 'stop_market', 'take_profit', 'trailingStop'].includes(formData?.orderType) ?
                            (
                                <Input
                                    value={formData.price}
                                    placeHolder="0"
                                    themes={theme}
                                    keyboardType="numeric"
                                    onChange={(text) => onChangeHandler('price', text)}
                                    labelStyle={{ color: Colors.grey }}
                                    style={style.inputStyle}
                                    leftContent={<Text color={Colors.grey}>Price</Text>}
                                    rightContent={
                                        <View style={style.input}>
                                            <Text color={Colors.white} size="small">{futureTradePair?.quoteCurrency}</Text>
                                        </View>
                                    }
                                />
                            )
                            : null
                    }
                    <Input
                        label="Quantity"
                        value={lotQuantity}
                        placeHolder="0"
                        keyboardType="numeric"
                        style={style.quantity}
                        onChange={(text) => onChangeHandler('quantity', text)}
                        onFocus={(value) => {
                            setIsEdit(value)
                        }}
                        rightContent={
                            <View style={style.quan}>
                                <Dropdown
                                    themes={theme}
                                    placeholder=""
                                    value={quantityIn}
                                    height={windowheight * 0.060}
                                    conatinerstyle={{ width: windowwidth * 0.2 }}
                                    background={theme.theme == "dark" ? theme.card : Colors.white}
                                    list={[
                                        {
                                            label: futureTradePair?.baseCurrency, value: futureTradePair?.baseCurrency
                                        },
                                        {
                                            label: "Lot", value: "lot"
                                        },
                                        {
                                            label: futureTradePair?.quoteCurrency, value: futureTradePair?.quoteCurrency
                                        },
                                    ]}
                                    onChange={(value) => {
                                        setQuantityIn(value?.value)
                                    }}
                                />
                            </View>
                        }
                        leftContent={<Text color={Colors.grey}>{`1 Lot = ${futureTradePair.minAmount} ${futureTradePair.baseCurrency}`}</Text>}
                    />
                    {
                        formData?.orderType == "makeronly" ?
                            <>
                                <Input
                                    value={formData.price}
                                    placeHolder="0"
                                    themes={theme}
                                    keyboardType="numeric"
                                    labelStyle={{ color: Colors.grey }}
                                    style={style.inputStyle}
                                    onChange={(text) => onChangeHandler('price', text)}
                                    leftContent={<Text color={Colors.grey}>Price</Text>}
                                    rightContent={
                                        <View style={style.input}>
                                            <Text color={Colors.white} size="small">{futureTradePair?.quoteCurrency}</Text>
                                        </View>
                                    }
                                />
                            </>
                            : formData?.orderType !== 'limit' && formData?.orderType !== "market" ?
                                <>
                                    <Input
                                        value={formData.stopPrice}
                                        placeHolder="0"
                                        themes={theme}
                                        keyboardType="numeric"
                                        onChange={(text) => onChangeHandler('stopPrice', text)}
                                        labelStyle={{ color: Colors.grey }}
                                        style={style.inputStyle}
                                        leftContent={<Text color={Colors.grey}>{formData?.orderType == 'trailingStop' ? 'Trail Amount' : 'Stop Price'}</Text>}
                                        rightContent={
                                            <View style={style.input}>
                                                <Text color={Colors.white} size="small">{futureTradePair?.quoteCurrency}</Text>
                                            </View>
                                        }
                                    />
                                </>
                                :
                                <></>
                    }

                    <Flexcomponent justifyContent="space-between" alignItems="center">
                        {
                            quantityPercentage.map((percent) => (
                                <Pressable style={[style.percent, percent == balPrecen && { backgroundColor: Colors.darkgray }]}
                                    onPress={() => { handleBalanceprecn(percent); setBalPrecen(percent) }}>
                                    <Text size="small" color={theme.darktext}>{percent}</Text>
                                </Pressable>
                            ))
                        }
                    </Flexcomponent>
                    {
                        ['limit', 'market', 'makeronly'].includes(formData?.orderType) && (
                            <>
                                {
                                    formData?.takeProfit?.stopPrice == null || formData?.takeProfit?.stopPrice === '' ?
                                        <Flexcomponent justifyContent="space-between" style={{ marginTop: "5%" }} alignItems="center">
                                            <Text size="tiny">Bracket Order</Text>
                                            <Button
                                                title="Add"
                                                buttonStyle={style.addButton}
                                                textStyle={{ fontSize: Fontsize.small }}
                                                leftContent={<VectorIcons name="add" family="Ionicons" size={20} />}
                                                onPress={() => openbottomsheet(addBracketref)}
                                            />
                                        </Flexcomponent>
                                        :
                                        <>
                                            <Flexcomponent justifyContent="space-between" style={{ marginTop: "5%" }} alignItems="center">
                                                <Text size="medium">Bracket Order</Text>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Pressable onPress={() => openbottomsheet(addBracketref)}>
                                                        <VectorIcons
                                                            name="edit"
                                                            family="Feather"
                                                            size={windowwidth * 0.05}
                                                            iconcolor={theme.activetab}
                                                        />
                                                    </Pressable>
                                                    <Pressable style={{ marginLeft: 20 }} onPress={() => removeBracketOrders()}>
                                                        <VectorIcons
                                                            name="trash-2"
                                                            family="Feather"
                                                            size={windowwidth * 0.05}
                                                            iconcolor={"red"}
                                                        />
                                                    </Pressable>
                                                </View>
                                            </Flexcomponent>
                                            <Flexcomponent justifyContent="flex-start" style={{ marginTop: '2%' }}>
                                                <Text color={Colors.grey}>TP(USD) : <Text>{formData?.takeProfit?.stopPrice} / {formData?.takeProfit?.orderType === 'bracket_tp_market' ? " -" : formData?.takeProfit?.price}</Text></Text>
                                            </Flexcomponent>
                                            <Flexcomponent justifyContent="flex-start" style={{ marginTop: '2%' }}>
                                                <Text color={Colors.grey}>SL(USD) : <Text>{formData?.stopLoss?.stopPrice} / {formData?.stopLoss?.orderType === 'bracket_sl_market' ? " -" : formData?.stopLoss?.price}</Text></Text>
                                            </Flexcomponent>
                                        </>
                                }
                            </>
                        )
                    }
                    <Flexcomponent justifyContent="flex-start" style={{ marginTop: "5%" }}>
                        <Checkbox
                            label="Reduce Only"
                            boxstyle={style.check}
                            value={formData?.reduce_only}
                            onChange={(val) => { setFormData({ ...formData, ...{ reduce_only: val } }) }}
                        />
                        {
                            formData?.orderType == "limit" && (
                                <View style={{ marginLeft: 20 }}>
                                    <Checkbox
                                        label="Maker Only"
                                        boxstyle={style.check}
                                        value={formData?.makeronly}
                                        onChange={(val) => { setFormData({ ...formData, ...{ makeronly: val } }) }}
                                    />
                                </View>
                            )
                        }
                    </Flexcomponent>

                    <Flexcomponent justifyContent="space-between" style={{ marginTop: '5%' }}>
                        <Text color={Colors.graytext}>Available</Text>
                        <Text numoflines={1} style={{ width: "50%", textAlign: "right" }}> {wallet?.availableBalance?.toFixed(futureTradePair?.quoteDecimal)} {futureTradePair?.quoteCurrency}</Text>
                    </Flexcomponent>
                    <Linecomponent backgroundcolor={theme.theme === "dark" ? Colors.grey : theme.boderColor} containerstyle={{ marginTop: "3%" }} />
                    <Flexcomponent paddingVertical={"2.5%"} justifyContent="space-between">
                        <Text color={Colors.graytext} >Fees</Text>
                        <Text numoflines={1} style={{ width: "50%", textAlign: "right" }}>{formData.fees} {futureTradePair?.quoteCurrency}</Text>
                    </Flexcomponent>
                    <Flexcomponent paddingVertical={"2.5%"} justifyContent="space-between">
                        <Text color={Colors.graytext}>Order Cost</Text>
                        <Text numoflines={1} style={{ width: "50%", textAlign: "right" }}>{formData.orderCost} {futureTradePair?.quoteCurrency}</Text>
                    </Flexcomponent>
                    <Flexcomponent paddingVertical={"2.5%"} justifyContent="space-between">
                        <Text color={Colors.graytext} >Total</Text>
                        <Text numoflines={1} style={{ width: "50%", textAlign: "right" }}>{formData.orderValue} {futureTradePair?.quoteCurrency}</Text>
                    </Flexcomponent>
                    <Flexcomponent paddingVertical={"2.5%"} justifyContent="space-between">
                        <Text color={Colors.graytext}>Margin required</Text>
                        <Text numoflines={1} style={{ width: "50%", textAlign: "right" }}>{formData.margin} {futureTradePair?.quoteCurrency}</Text>
                    </Flexcomponent>

                    <>
                        {/* <Linecomponent backgroundcolor={theme.theme === "dark" ? Colors.grey : theme.boderColor} containerstyle={{ marginTop: "3%", marginBottom: "2%" }} /> */}
                        <Flexcomponent paddingVertical={"3%"} justifyContent="space-between" ispress={true} onPress={() => setExpand(prev => !prev)}>
                            <Flexcomponent justifyContent="flex-start" width={"50%"} >
                                <Images
                                    type="svg"
                                    name="Orderbook"
                                    width={windowwidth * 0.055}
                                    height={windowwidth * 0.055}
                                />
                                <Text left={"5%"} family="medium" fontSize={RFvalue(14)}>Order Book</Text>
                            </Flexcomponent>
                            <Flexcomponent justifyContent="flex-end" width={"50%"}>
                                <Text color={Colors.graytext} style={{ marginRight: "5%" }} family="regular" fontSize={RFvalue(12)}>Hide</Text>
                                <VectorIcons
                                    iconcolor={Colors.graytext}
                                    family="Ionicons"
                                    name={expand ? "chevron-up" : "chevron-down"}
                                    size={windowwidth * 0.04}
                                />
                            </Flexcomponent>
                        </Flexcomponent>
                        {
                            expand && (
                                <Bookcomponent
                                    currentIndex={futureTicker._id}
                                />
                            )
                        }
                    </>
                </ScrollView>
            </View>
            <View style={style.buttonContainer} >
                <Button
                    title={formData.buyorsell === 'buy' ? "Buy" : "Sell"}
                    style={[style.sell, { backgroundColor: formData.buyorsell == 'buy' ? Colors.green : Colors.red }]}
                    onPress={() => {
                        if (kycStatus !== 'approved') {
                            failuretoast("Error", "Please complete your KYC")
                        } else {
                            openbottomsheet(placeOrderref)
                        }
                    }}
                />
            </View>
            <AccountMargin
                ref={bottomsheetref}
                wallet={wallet}
                marginMode={marginMode}
                accountName={accountName}
                futureTradePair={futureTradePair}
                onChange={() => {
                    closebottomsheet(bottomsheetref)
                    setTimeout(() => {
                        openbottomsheet(updateMarginsheetref)
                    }, 300)
                }}
            />
            <UpdateMargin
                ref={updateMarginsheetref}
                value={marginMode}
                accountId={accountId}
                title={"Change Margin mode"}
                onClose={() => { closebottomsheet(updateMarginsheetref) }}
                confirm={() => closebottomsheet(updateMarginsheetref)}
                onContinue={() => { closebottomsheet(updateMarginsheetref) }}
            />
            <PlaceOrder
                ref={placeOrderref}
                formData={formData}
                loading={isLoading}
                orderPlacing={orderPlacing}
            />
            <ProfitOption
                ref={profitOptionref}
                formData={formData}
                onChange={handleOrderListSelect}
            />
            <BracketOrders
                ref={addBracketref}
                formData={formData}
                handleChange={(value: any) => {
                    setFormData({ ...formData, ...{ takeProfit: value.takeProfit, stopLoss: value.stopLoss } });
                    closebottomsheet(addBracketref)
                }}
            />
            <Leverage
                ref={leverageref}
                leverage={leverage}
                setLeverage={setLeverage}
                changeLeverage={changeLeverage}
                buttonClick={handleLeverageButtonClick}
                onChange={handleLeverageSliderChange}
                max={futureTradePair?.max_leverage === "" ? 100 : futureTradePair?.max_leverage}
            />
        </Mainview>
    )
}

export default Buysell;