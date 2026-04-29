import React from "react";
import { Pressable, View } from "react-native";

import Card from "../../../Components/Card";
import Text from "../../../Components/text";
import { Colors } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectoricons";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { setSubAccountparams } from "../../../Slices/helper";
import { Button } from "../../../Components/Field";

interface DescriptionProps {
    name?: any
    subAccounts?: any;
    accountId?: any;
    balance?: any;
    theme?: any
}

const Main: React.FC<DescriptionProps> = ({
    name,
    subAccounts,
    accountId,
    balance,
    theme
}) => {
    const { navigation, dispatch } = useCustomHooks();

    const payload: any = {
        type: "transfer",
        value: subAccounts
    }

    console.log("subAccounts", subAccounts)

    return (
        <Card containerStyle={{ padding: "5%", borderColor: theme.theme == "dark" ? Colors.dune : theme.boderColor }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ width: "80%" }}>
                    <Text size="tiny" style={{ color: Colors.grey }} numoflines={1}>Account in Use <Text size="tiny" style={{ color: theme.darktext }}>{name}</Text></Text>
                </View>
                {/* <Pressable onPress={() => { dispatch(setSubAccountparams(payload)), navigation.navigate("TransferFunds") }}>
                    <VectorIcons
                        family="MaterialDesignIcons"
                        name="bank-transfer"
                        size={windowwidth * 0.080}
                    />
                </Pressable> */}
            </View>
            <View style={[{ flexDirection: "row", marginTop: "5%" }]}>
                <View style={{ marginRight: "10%" }}>
                    <Text size="tiny" >Account ID</Text>
                    <Text size="tiny" style={{ color: Colors.grey, marginTop: "5%" }}>{accountId}</Text>
                </View>
                <View>
                    <Text size="tiny" >Account Value</Text>
                    <Text size="tiny" style={{ marginTop: "5%" }}>{balance}</Text>
                </View>
            </View>

            <Button title="Transfer funds" onPress={() => { dispatch(setSubAccountparams(payload)), navigation.navigate("TransferFunds") }} buttonStyle={{ marginTop: "5%", width: "45%", height: windowheight * 0.045 }} />
        </Card>
    )
}

export default Main;