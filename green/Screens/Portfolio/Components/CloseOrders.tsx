import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { isEmpty } from "lodash";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import { Colors } from "../../../Utilities/uiasset";
import Sheet from "../../../Components/bottomsheet";
import useApiError from "../../../Actions/Hooks/errorhook";
import ThemeContext from "../../../Utilities/themecontext";
import Flexcomponent from "../../../Components/flexcomponent";
import { Button, Dropdown, Input } from "../../../Components/Field";
import { useFutureCloseOrdersMutation } from "../../../Slices/future";
import useCustomHooks, { useApihooks } from "../../../Actions/Hooks/customhook";
import { RFvalue, windowheight, windowwidth } from "../../../Utilities/dimensions";
import { LotToquantity, quantityToLot } from "../../../Actions/Hooks/usePriceConversion";

import { styles } from "../styles";

interface ConfirmProps {
    ref?: any;
    data?: any;
}

const initialState = {
    price: 0,
    quantity: 0,
    percentage: 0,
    typeTIF: ""
}

const CloseOrders: React.FC<ConfirmProps> = ({
    ref,
    data,
}) => {
    const { successtoast, closebottomsheet, failuretoast } = useCustomHooks();
    const theme = useContext(ThemeContext);
    const style = styles(theme);

    const [currentType, setCurrentType] = useState('market');
    const [formData, setFormData] = useState(initialState);
    const [quantityIn, setQuantityIn] = useState('lot');
    const [lotQuantity, setlotQuantity] = useState('');

    const [futureCloseOrders, { error, isLoading }] = useFutureCloseOrdersMutation();
    const { triggerpositionOrders } = useApihooks();

    useApiError(error);

    const closingPositionOrder = async () => {
        const payload = {
            pairId: data?.pairId,
            positionSide: data?.positionSide,
            quantity: formData?.quantity,
            orderType: currentType,
            price: formData?.price,
            typeTIF: formData?.typeTIF
        }
        console.log(payload, data, 'ClosingPositionOrder')
        const response = await futureCloseOrders(payload).unwrap()
        if (response.success) {
            successtoast("Success", response.message);
            triggerpositionOrders();
            closebottomsheet(ref);
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    };

    const changePercentage = (percentage: any) => {
        let quantity: any = parseFloat(data?.positionFilled) * (parseFloat(percentage) / 100)
        quantity = isNaN(quantity) || !isFinite(quantity) ? 0 : quantity
        quantity = parseFloat(quantity).toFixed(data?.pairData?.baseDecimal)
        if (quantityIn == 'lot') {
            let lot = quantityToLot(quantity, data?.pairData?.minAmount, data?.pairData?.baseDecimal)
            setlotQuantity(lot)
        } else {
            setlotQuantity(quantity)
        }
        setFormData({ ...formData, ...{ quantity: quantity, percentage: percentage } })
    }

    const onChangeHandler = (name: any, value: any) => {
        try {
            console.log("onChangeHandler", name, value);
            let numbers = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;

            if (['price', 'quantity'].includes(name) && !numbers.test(value) && value !== "") {
                return false
            }
            if (name === 'quantity') {
                let quantity = value
                if (quantityIn == 'lot') {
                    const decimal = /^[+]?[0-9]+$/
                    if (value !== "" && !decimal.test(value)) return false;
                    let maxLot = quantityToLot(data?.pairData?.maxAmount, data?.pairData?.minAmount, data?.pairData?.baseDecimal)
                    let minLot = quantityToLot(data?.pairData?.minAmount, data?.pairData?.minAmount, data?.pairData?.baseDecimal)
                    console.log(maxLot, minLot, "maxLot,minLot")
                    if (parseFloat(value) < parseFloat(minLot) || parseFloat(value) > parseFloat(maxLot)) {
                        return false
                    }
                    quantity = LotToquantity(value, data?.pairData?.minAmount, data?.pairData?.baseDecimal)
                }
                setlotQuantity(value)
                setFormData({ ...formData, ...{ [name]: quantity } })
                return false
            }
            setFormData({ ...formData, ...{ [name]: value } })
        } catch (e) {
            console.log("onChangeHandler_err", e);
        }
    }

    useEffect(() => {
        if (isEmpty(data)) return
        setFormData({
            ...formData,
            ...{
                quantity: data.positionFilled,
                price: data?.close_price,
                percentage: 100
            }
        })
        let lotQuantity = data.positionFilled
        if (quantityIn == 'lot') {
            lotQuantity = quantityToLot(lotQuantity, data?.pairData?.minAmount, data?.pairData?.baseDecimal)
        }
        setlotQuantity(lotQuantity)
    }, [data])

    useEffect(() => {
        if (!isEmpty(formData.quantity)) {
            let lotQuantity: any = formData.quantity
            if (quantityIn == 'lot') {
                lotQuantity = quantityToLot(lotQuantity, data?.pairData?.minAmount, data?.pairData?.baseDecimal)
            }
            setlotQuantity(lotQuantity)
        }
    }, [quantityIn])

    return (
        <Sheet
            sheetref={ref}
            snappoint={["55%"]}
            custominterface={true}
            backgroundStyle={style.border}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            >
                <View style={style.header}>
                    <Flexcomponent justifyContent="space-between" alignItems="center">
                        <Text family="semiBold" style={{ color: theme.darktext, fontSize: RFvalue(14) }}>Close order</Text>
                        <Pressable onPress={() => closebottomsheet(ref)}>
                            <Images
                                type="svg"
                                name={theme.theme === "dark" ? "Bottomclose" : "Bottomclosedark"}
                                width={windowwidth * 0.060}
                                height={windowheight * 0.040}
                            />
                        </Pressable>
                    </Flexcomponent>
                </View>
                <View style={style.containerCon}>
                    <BottomSheetScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ paddingBottom: "55%" }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={style.market}>
                            <Pressable style={[style.marketContent, { backgroundColor: currentType === "market" ? Colors.green : theme.card }]}
                                onPress={() => { setCurrentType("market") }}>
                                <Text style={{ color: currentType === "market" ? Colors.white : theme.primarytext, }}>Market</Text>
                            </Pressable>
                            <Pressable style={[style.limitContent, { backgroundColor: currentType === "limit" ? Colors.green : theme.card }]}
                                onPress={() => {
                                    setCurrentType("limit")
                                }}>
                                <Text style={{ color: currentType === "limit" ? Colors.white : theme.primarytext }}>Limit</Text>
                            </Pressable>
                        </View>
                        {
                            currentType === 'limit' && (
                                <Input
                                    themes={theme}
                                    label="Price"
                                    value={formData.price}
                                    placeHolder="0"
                                    keyboardType="numeric"
                                    background={theme.card}
                                    onChange={(text) => onChangeHandler('price', text)}
                                />
                            )
                        }
                        <Input
                            themes={theme}
                            label="Quantity"
                            value={lotQuantity}
                            onChange={(text) => onChangeHandler("quantity", text)}
                            rightContent={
                                <View style={style.quan}>
                                    <Dropdown
                                        value={quantityIn}
                                        themes={theme}
                                        placeholder="Select"
                                        background={theme.theme === "dark" ? theme.card : "#fff"}
                                        conatinerstyle={{
                                            width: windowwidth * 0.2,
                                        }}
                                        height={windowheight * 0.060}
                                        onChange={(value) => {
                                            setQuantityIn(value?.value)
                                        }}
                                        list={[
                                            {
                                                label: "LOT", value: 'lot'
                                            },
                                            {
                                                label: data?.pairData?.baseCurrency, value: data?.pairData?.baseCurrency
                                            }
                                        ]}
                                    />
                                </View>
                            }
                            leftContent={<Text color={Colors.grey}>{`1 Lot = ${data?.pairData?.minAmount} ${data?.pairData?.baseCurrency}`}</Text>}
                            placeHolder="0"
                            keyboardType="numeric"
                            background={theme.card}
                            style={style.quantity}
                        />
                        <Text color={theme.secondarytext}>Select Prcentage 100%</Text>
                        <Flexcomponent justifyContent="space-between" style={{ marginTop: "3%" }}>
                            {[5, 10, 25, 50, 75, 100].map((percent) =>
                                <Pressable onPress={() => changePercentage(percent)} style={[style.percent, { backgroundColor: percent === formData.percentage ? Colors.green : theme.card }]}>
                                    <Text color={theme.darktext}>{percent}</Text>
                                </Pressable>
                            )}
                        </Flexcomponent>
                        <Flexcomponent justifyContent="flex-end" alignItems="center" style={{ marginTop: "8%" }}>
                            <Button
                                title="Cancel"
                                buttonStyle={style.cancel}
                                onPress={() => closebottomsheet(ref)}
                            />
                            <Button
                                title="Confirm"
                                loading={isLoading}
                                onPress={() => closingPositionOrder()}
                                buttonStyle={style.confim}
                            />
                        </Flexcomponent>
                    </BottomSheetScrollView>
                </View>
            </KeyboardAvoidingView>
        </Sheet>
    )

}

export default CloseOrders;