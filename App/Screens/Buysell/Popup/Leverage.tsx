import React from "react";
import { Pressable, View } from "react-native";
import { useSelector } from "react-redux";
import Slider from "@react-native-community/slider";

import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import Sheet from "../../../Components/bottomsheet";
import { Colors } from "../../../Utilities/uiasset";
import { Button, Input } from "../../../Components/Field";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { RFvalue, windowheight, windowwidth } from "../../../Utilities/dimensions";

import { styles } from "../styles";
interface ConfirmProps {
    ref?: any;
    leverage?: any;
    setLeverage?: any;
    onChange?: any;
    changeLeverage?: any;
    buttonClick?: any
    max?: any
}

const Leverage: React.FC<ConfirmProps> = ({
    ref,
    onChange,
    leverage,
    setLeverage,
    changeLeverage,
    buttonClick,
    max
}) => {
    const { theme, closebottomsheet } = useCustomHooks();
    const { futureTradePair } = useSelector((state: any) => state.future);
    const style = styles(theme);
    const marks = [0, 25, 50, 75, 100];

    return (
        <Sheet
            sheetref={ref}
            snappoint={["50%"]}
            custominterface={true}
            backgroundStyle={style.sheetContainer}
        >
            <View style={style.sheet}>
                <View style={style.between}>
                    <Text family="semiBold" style={{ color: theme.darktext, fontSize: RFvalue(14) }}>
                        Select Leverage
                    </Text>
                    <Pressable onPress={() => closebottomsheet(ref)}>
                        <Images
                            type="svg"
                            name={theme.theme === "dark" ? "Bottomclose" : "Bottomclosedark"}
                            width={windowwidth * 0.06}
                            height={windowheight * 0.04}
                        />
                    </Pressable>
                </View>
            </View>

            <View style={{ padding: "5%" }}>
                <Input
                    type="calculator"
                    themes={theme}
                    disabled={leverage >= futureTradePair.max_leverage || leverage <= 1}
                    boxstyle={{ width: "75%" }}
                    initialValue={leverage}
                    onValueChange={(text) => {
                        let value: any = text
                        const numbers: any = /^[+]?([0-9]+(?:\.[0-9]*)?|\.[0-9]+)$/;
                        if ((value > futureTradePair.max_leverage || value < 1) && value != '') {
                            return false
                        }
                        if (value !== "" && !numbers.test(value)) return false;
                        setLeverage(value)
                    }}
                />
                <View style={{ marginVertical: "7%" }}>
                    <Slider
                        minimumValue={0}
                        maximumValue={max}
                        step={0.01}
                        value={leverage}
                        onValueChange={(e) => onChange ? onChange(e) : null}
                        minimumTrackTintColor={Colors.green}
                        maximumTrackTintColor="#444"
                        thumbTintColor={Colors.green}
                    />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                        {
                            marks.map((p) => {
                                const valAtP = (p / 100) * max;
                                const isActive = leverage >= valAtP;
                                return (
                                    <Pressable onPress={() => buttonClick ? buttonClick(p) : null}>
                                        <Text style={{ color: isActive ? Colors.green : theme.darktext, fontSize: RFvalue(12) }}>
                                            {`${valAtP}x`}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                    </View>
                </View>
                <Button
                    title={`Set to ${leverage}x`}
                    onPress={() => { changeLeverage(leverage), closebottomsheet(ref) }}
                />
            </View>
        </Sheet>
    );
};

export default Leverage;
