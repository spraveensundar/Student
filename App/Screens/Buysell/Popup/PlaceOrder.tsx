import React, { useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import { Button } from "../../../Components/Field";
import { Colors } from "../../../Utilities/uiasset";
import Sheet from "../../../Components/bottomsheet";
import Flexcomponent from "../../../Components/flexcomponent";
import { calcLiquidationPrice } from "../../../Actions/Hooks/usePriceConversion";
import { RFvalue, windowheight, windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks, { capitalizeFirst } from "../../../Actions/Hooks/customhook";

import { styles } from "../styles";

const ORDER_TYPE_LABELS: any = {
    market: "Market",
    limit: "Limit",
    makeronly: "Maker Only",
    stop_limit: "Stop Limit",
    stop_market: "Stop Market",
    trailingStop: "Trailing Stop",
    take_profit_limit: "Take Profit Limit",
    take_profit: "Take Profit Market",
};

const CONDITIONAL_TYPES = ["stop_limit", "stop_market", "take_profit_limit", "take_profit", "trailingStop"];
const EXIT_TYPES = ["take_profit_limit", "take_profit"]
const STOP_TYPES = ["stop_limit", "stop_market", "trailingStop"];
const LIMIT_TYPES = ["limit", "market", "makeronly"];
const getOrderTypeLabels = (type: any) => ORDER_TYPE_LABELS[type] || "Limit";

interface ConfirmProps {
    ref?: any;
    formData?: any;
    loading?: any;
    orderPlacing?: any
}

const PlaceOrder: React.FC<ConfirmProps> = ({
    ref,
    formData,
    loading,
    orderPlacing
}) => {
    const { theme, closebottomsheet } = useCustomHooks();
    const style = styles(theme);
    const { futureTicker, futureTradePair } = useSelector((state: any) => state.future);
    const [liquidityPrice, setLiquidityPrice] = useState(0);
    const [trigger_type, setTrigger_type] = useState("above");

    const side = formData?.buyorsell === "buy" ? "long" : "short";
    useEffect(() => {
        if (!isEmpty(formData)) {
            if (CONDITIONAL_TYPES.includes(formData?.orderType)) {
                let trigger_type = "above"
                if (STOP_TYPES.includes(formData?.orderType)) {
                    let trigger_type = formData.buyorsell == "buy" ? "above" : "below"
                } else if (EXIT_TYPES.includes(formData?.orderType)) {
                    let trigger_type = formData.buyorsell == "buy" ? "below" : "above"
                }
                setTrigger_type(trigger_type)
            }
            setLiquidityPrice(
                calcLiquidationPrice(side, formData?.price, formData?.leverage, futureTradePair.maintenanceMargin)
            );
        }
    }, [formData, side]);

    const notional = useMemo(() => {
        const basePrice =
            formData?.orderType === "market" ? futureTicker?.marketPrice : formData?.price;
        return ((basePrice || 0) * (formData?.quantity || 0)).toFixed(2);
    }, [formData, futureTicker]);

    return (
        <Sheet
            sheetref={ref}
            snappoint={[LIMIT_TYPES.includes(formData?.orderType) ? "55%" : "40%"]}
            custominterface={true}
            backgroundStyle={style.sheetContainer}
        >
            <View style={style.sheet}>
                <View style={style.between}>
                    <Text family="semiBold" style={{ color: theme.darktext, fontSize: RFvalue(14) }}> Confirm your {getOrderTypeLabels(formData?.orderType)} Order</Text>
                    <Pressable onPress={() => { closebottomsheet(ref) }}>
                        <Images
                            type="svg"
                            name={theme.theme === "dark" ? "Bottomclose" : "Bottomclosedark"}
                            width={windowwidth * 0.060}
                            height={windowheight * 0.040}
                        />
                    </Pressable>
                </View>
            </View>
            <View style={{ padding: "5%" }}>
                {
                    LIMIT_TYPES.includes(formData?.orderType) && (
                        <Text color={theme.darktext}><Text color={Colors.green}><Text color={formData.buyorsell == 'buy' ? Colors.green : Colors.red}>{capitalizeFirst(formData?.buyorsell)}</Text></Text> {formData?.quantity} of {futureTicker?.tickerRoot}{" "}{formData?.buyorsell === "buy" ? "<=" : ">="} {formData?.price}</Text>
                    )
                }
                <Flexcomponent justifyContent="space-between" style={{ marginTop: "2.5%" }}>
                    <Text color={Colors.grey}>Notional</Text>
                    <Text color={theme.darktext}>{notional} {futureTicker?.quoteCurrency}</Text>
                </Flexcomponent>
                {
                    LIMIT_TYPES.includes(formData?.orderType) && (
                        <>
                            <Flexcomponent justifyContent="space-between" style={{ marginTop: "2.5%" }}>
                                <Text color={Colors.grey}>Est. Margin Required</Text>
                                <Text color={theme.darktext}>{formData?.margin} {futureTicker?.quoteCurrency} @{" "}
                                    {1}x</Text>
                            </Flexcomponent>
                            <Flexcomponent justifyContent="space-between" style={{ marginTop: "2.5%" }}>
                                <Text color={Colors.grey}>Est. Trading Fee</Text>
                                <Text color={theme.darktext}>{formData?.fees} {futureTicker?.quoteCurrency}</Text>
                            </Flexcomponent>
                            <Flexcomponent justifyContent="space-between" style={{ marginTop: "2.5%" }}>
                                <Text color={Colors.grey}>Est. Execution Price</Text>
                                <Text color={theme.darktext}>{futureTicker?.marketPrice} {futureTicker?.quoteCurrency}</Text>
                            </Flexcomponent>
                            <Flexcomponent justifyContent="space-between" style={{ marginTop: "2.5%" }}>
                                <Text color={Colors.grey}>Est. Liquidation Price</Text>
                                <Text color={theme.darktext}>{liquidityPrice} {futureTicker?.quoteCurrency}</Text>
                            </Flexcomponent>
                        </>
                    )
                }
                <Flexcomponent justifyContent="space-between" style={{ marginTop: "2.5%" }}>
                    <Text color={Colors.grey}>Pos. Size after Execution</Text>
                    <Text color={theme.darktext}>{formData?.buyorsell === "sell" && "-"}
                        {formData?.quantity} Qty</Text>
                </Flexcomponent>
                <Flexcomponent justifyContent="space-between" alignItems="center" style={{ marginVertical: "5%" }}>
                    <Button
                        title="Place Order"
                        loading={loading}
                        onPress={() => {
                            orderPlacing(),
                                closebottomsheet(ref)
                        }}
                        buttonStyle={{ width: "48%" }}
                    />
                    <Button
                        title="Cancel"
                        buttonStyle={{ width: "48%", backgroundColor: theme.background, borderWidth: 1.5, borderColor: Colors.green }}
                        textStyle={{ color: Colors.green }}
                        onPress={() => closebottomsheet(ref)}
                    />
                </Flexcomponent>
                <Text size="small" color={theme.darktext}>
                    NB: All orders must execute within the allowed trading band. The
                    part of your order that will breach the trading band on execution
                    will be changed to a limit order with price = max allowed price.
                </Text>

            </View>
        </Sheet>
    )

}

export default PlaceOrder;