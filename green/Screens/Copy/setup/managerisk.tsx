import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import useCustomHooks from "../../../Actions/Hooks/customhook"
import Sheet from "../../../Components/bottomsheet"
import React from "react";
import { View } from "react-native";
import Flexcomponent from "../../../Components/flexcomponent";
import Text from "../../../Components/text";
import Checkbox from "../../../Components/Field/Input/Checkbox";
import { borderradius, windowheight, windowwidth } from "../../../Utilities/dimensions";
import { Colors } from "../../../Utilities/uiasset";
import Linecomponent from "../../../Components/line";
import Card from "../../../Components/Card";
import { Button, Input } from "../../../Components/Field";


interface Manageriskprops {
    sheetref: React.RefObject<BottomSheetModal | null>;

}

const Managerisk: React.FC<Manageriskprops> = ({
    sheetref
}) => {
    const { theme } = useCustomHooks()
    const Managerisk = ["BTC/USDT", "GFT/USDT", "ETH/USDT", "CAKE/USDT", "SOL/USDT", 'TAT/DAO', "BNB/USDT", "GFT/USDT", 'ETH/USDT', "TAT/USDT", "GFT/USDT", "ETH/USDT",]

    return (
        <Sheet
            sheetref={sheetref}
            snappoint={["60%"]}
            custominterface={true}


        >

            <View style={{ paddingHorizontal: "5%", flex: 1, paddingBottom: "5%" }} >
                <View style={{ borderBottomWidth: 1, borderColor: "#313131", width: windowwidth, alignSelf: "center", height: windowheight * 0.08, paddingHorizontal: "5%", justifyContent: "center" }} >
                    <Text color={theme.tabactive} >Risk Management</Text>
                </View>

                <View style={{ flex: 1 }} >
                    <BottomSheetScrollView>

                        <View style={{ marginTop: "5%" }} >
                            <Input
                                rightContent={
                                    <Text color={Colors.orange} >%</Text>
                                }
                                themes={theme}

                                placeHolder="Enter amount"
                                label="Stop loss (1-90)"

                            />
                        </View>


                        <View style={{ marginTop: "1%" }} >
                            <Input
                                rightContent={
                                    <Text color={Colors.orange} >%</Text>
                                }
                                themes={theme}

                                placeHolder="Enter amount"
                                label="Take Profit (1-90)"

                            />
                        </View>


                        <View style={{ marginTop: "1%" }} >
                            <Input
                                rightContent={
                                    <Text color={Colors.orange} >USDT</Text>
                                }
                                themes={theme}

                                placeHolder="Enter amount"
                                label="Maximum Follow Amount"

                            />
                        </View>

                        <Button
                          title="Confirm"
                        />
                    </BottomSheetScrollView>
                </View>
            </View>

        </Sheet>
    )

}

export default Managerisk