import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import Mainview from "../../../Components/mainview";
import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Flexcomponent from "../../../Components/flexcomponent";
import Text from "../../../Components/text";
import { borderradius, RFvalue } from "../../../Utilities/dimensions";
import Card from "../../../Components/Card";
import Toptabs from "../../../Components/toptabs";
import { Colors, Fontfamily, Fontsize } from "../../../Utilities/uiasset";
import Input from "../../../Components/Field/Input/Input";
import Checkbox from "../../../Components/Field/Input/Checkbox";
import { Button } from "../../../Components/Field";
import Pairs from "./pairslist";
import Managerisk from "./managerisk";



type Props = NativeStackScreenProps<Stacknavigationtypes, 'Tradepairs'>;



const Tradepairs: React.FC<Props> = () => {
    const pairsref = useRef(null);
    const managerisk = useRef(null);
    const { theme, navigation, openbottomsheet } = useCustomHooks()
    const styles = style(theme)
    const pairs = ["BTC/USDT", "GFT/USDT", "ETH/USDT"]
    const [activeindex, setActiveindex] = useState(0)

    return (
        <Mainview
            headertitle="Copy Trading Pairs"
            onleftfn={() => navigation.goBack()}
        >
            <View style={{ flex: 1 }} >
                <Flexcomponent justifyContent="space-between" >
                    <Text fontSize={RFvalue(14)} >Copy Trading Pairs</Text>
                    <Pressable onPress={() => openbottomsheet(pairsref)} style={{ paddingVertical: "3%", borderRadius: borderradius * 0.5, backgroundColor: theme.tabactive, paddingHorizontal: "7.5%" }} >
                        <Text color={theme.activetabtext} family="semiBold" size="small" >Select Pairs</Text>
                    </Pressable>
                </Flexcomponent>

                <Flexcomponent top={"5%"} justifyContent="flex-start" style={{ flexWrap: "wrap", gap: 10 }} >
                    {pairs?.map((e) => (
                        <Card containerStyle={{ paddingVertical: "2.5%", borderRadius: borderradius * 0.5, width: "auto", paddingHorizontal: '5%' }} >
                            <Text size="small" >{e}</Text>
                        </Card>))}
                </Flexcomponent>
                <Toptabs
                    tabs={["Fixed Amount", "Percentage Amount"]}
                    activeindex={activeindex}
                    onchangeindex={setActiveindex}
                    top={"5%"}
                />
                <View style={{ flex: 1, }} >
                    <View style={{ flex: 0.725, }} >
                        {activeindex == 0 &&
                            <>
                                <Input
                                    rightContent={
                                        <Text color={Colors.orange} >USD</Text>
                                    }
                                    containerprops={{
                                        marginTop: "7.5%"
                                    }}
                                    placeHolder="Enter amount"

                                />
                                <Flexcomponent justifyContent="space-between" >
                                    <Text fontSize={RFvalue(14)} >Risk Management</Text>
                                    <Pressable onPress={() => openbottomsheet(managerisk)} style={{ paddingVertical: "3%", borderRadius: borderradius * 0.5, backgroundColor: theme.tabactive, paddingHorizontal: "7.5%" }} >
                                        <Text color={theme.activetabtext} family="semiBold" size="small" >Manage Risk</Text>
                                    </Pressable>
                                </Flexcomponent>
                            </>
                        }

                        {activeindex == 1 &&
                            <>
                                <Input
                                    rightContent={
                                        <Text color={Colors.orange} >In Percentage</Text>
                                    }
                                    containerprops={{
                                        marginTop: "7.5%"
                                    }}
                                    placeHolder="Enter amount"

                                />
                                <Flexcomponent justifyContent="space-between" >
                                    <Text fontSize={RFvalue(14)} >Risk Management</Text>
                                    <Pressable onPress={() => openbottomsheet(managerisk)} style={{ paddingVertical: "3%", borderRadius: borderradius * 0.5, backgroundColor: theme.tabactive, paddingHorizontal: "7.5%" }} >
                                        <Text color={theme.activetabtext} family="semiBold" size="small" >Manage Risk</Text>
                                    </Pressable>
                                </Flexcomponent>
                            </>
                        }
                    </View>

                    <View style={{ flex: 0.275, justifyContent: "space-around" }} >
                        <Checkbox

                            label="I agree to the terms and conditions of Copy Trading"
                            checkboxlabelprops={{
                                style: {
                                    fontFamily: Fontfamily.regular,
                                    fontSize: RFvalue(11),
                                    color: theme.secondarytext
                                }
                            }}
                            activecheckboxcolor={Colors.orange}
                            checkboxstyle={{
                                marginLeft: "5%"
                            }}
                        />

                        <Checkbox
                            label="I agree to share the profit of xx% with the Master Trader"
                            checkboxlabelprops={{
                                style: {
                                    fontFamily: Fontfamily.regular,
                                    fontSize: RFvalue(11),
                                    color: theme.secondarytext
                                }
                            }}
                            activecheckboxcolor={Colors.orange}
                            checkboxstyle={{
                                marginLeft: "5%"
                            }}
                        />

                        <Button
                            title="Copy"
                        />

                    </View>
                </View>


                <Pairs
                    sheetref={pairsref}
                />

                <Managerisk
                    sheetref={managerisk}
                />
            </View>
        </Mainview>
    )

}

export default Tradepairs


const style = (theme: any) => StyleSheet.create({
    activetab: {
        width: "45%",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: theme.tabactive,
    },
    inactivetab: {
        width: "45%",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    }
})