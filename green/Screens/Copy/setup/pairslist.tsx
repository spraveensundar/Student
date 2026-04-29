import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import useCustomHooks from "../../../Actions/Hooks/customhook"
import Sheet from "../../../Components/bottomsheet"
import React from "react";
import { View } from "react-native";
import Flexcomponent from "../../../Components/flexcomponent";
import Text from "../../../Components/text";
import Checkbox from "../../../Components/Field/Input/Checkbox";
import { borderradius, windowwidth } from "../../../Utilities/dimensions";
import { Colors } from "../../../Utilities/uiasset";
import Linecomponent from "../../../Components/line";
import Card from "../../../Components/Card";


interface Pairsprops {
    sheetref: React.RefObject<BottomSheetModal | null>;

}

const Pairs: React.FC<Pairsprops> = ({
    sheetref
}) => {
    const { theme } = useCustomHooks()
    const pairs = ["BTC/USDT", "GFT/USDT", "ETH/USDT", "CAKE/USDT", "SOL/USDT", 'TAT/DAO', "BNB/USDT", "GFT/USDT", 'ETH/USDT', "TAT/USDT", "GFT/USDT", "ETH/USDT",]

    return (
        <Sheet
            sheetref={sheetref}
            custominterface={true}
            snappoint={["45%"]}
        >

            <View style={{ padding: "5%", flex: 1 }} >
                <Flexcomponent justifyContent="space-between" paddingVertical={"2.5%"} >
                    <Text color={theme.tabactive} >Select Copy Trading Pairs</Text>

                    <Flexcomponent justifyContent="flex-end" width={"45%"}  >
                        <Text size="small" style={{
                            marginRight: "5%"
                        }} color={theme.secondarytext} >select all</Text>
                        <Checkbox
                            boxstyle={{
                                backgroundColor: theme.card,
                                width: windowwidth * 0.06,
                                height: windowwidth * 0.06,
                            }}
                            activecheckboxcolor={Colors.orange}
                        />
                    </Flexcomponent>
                </Flexcomponent>
                <Linecomponent backgroundcolor={"#313131"} containerstyle={{ marginTop: "2.5%" }} />
                <View style={{ flex: 1, paddingTop: "5%" }} >
                    <BottomSheetScrollView>
                        <Flexcomponent style={{ flexWrap: "wrap", justifyContent: "space-between" }} >
                            {pairs?.map((e) => (
                                <View style={{ paddingVertical: "2.5%", borderRadius: borderradius * 0.5, width: "30%", paddingHorizontal: '2%', backgroundColor: theme.card, justifyContent: "center", alignItems: "center", marginTop: "5%" }} >
                                    <Text color={theme.secondarytext} size="small" >{e}</Text>
                                </View>))}
                        </Flexcomponent>
                    </BottomSheetScrollView>
                </View>

            </View>

        </Sheet>
    )

}

export default Pairs