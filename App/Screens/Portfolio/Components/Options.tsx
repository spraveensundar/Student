import React from "react";
import { Pressable, View } from "react-native";

import Text from "../../../Components/text";
import VectorIcons from "../../../Utilities/vectoricons";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import Flexcomponent from "../../../Components/flexcomponent";
import { Button } from "../../../Components/Field";
import { Colors, Fontsize } from "../../../Utilities/uiasset";

interface Optionsprops {
    active: any;
    ref?: any,
    title?: any
    tab?: any
}

const Options: React.FC<Optionsprops> = ({
    active,
    ref,
    title,
    tab
}) => {
    const { theme, openbottomsheet } = useCustomHooks();
    return (
        <Flexcomponent justifyContent="space-between" alignItems="center" style={{ marginBottom: "5%", marginTop: "6%", paddingHorizontal: 20 }}>

            <Pressable onPress={() => openbottomsheet(ref)} style={{ backgroundColor: theme.card, borderWidth: 1, borderColor: theme.boderlight, borderRadius: 8, alignItems: 'center', flexDirection: "row", height: 35, justifyContent: "flex-start", paddingHorizontal: 10, width: "28%" }}>
                <Text
                    family="medium"
                    size="small"
                    style={{ verticalAlign: "middle", width: "75%", textAlign: "center" }}
                    numoflines={1}>{active}</Text>
                <VectorIcons
                    family="Ionicons"
                    name={"chevron-down-outline"}
                    size={windowwidth * 0.035}
                    style={{ marginRight: 10 }}
                />
            </Pressable>
            <View>
                {
                    ["Balances", "Positions", "Open Orders", "Stop Orders"].includes(tab) && (
                        <Button
                            title="Cancel All"
                            textStyle={{ fontSize: Fontsize.small, color: Colors.red }}
                            buttonStyle={{ width: windowwidth * 0.25, height: 35, backgroundColor: theme.background, borderColor: Colors.red, borderWidth: 1 }}
                        />

                    )

                }
                {
                    title && (
                        title
                    )
                }
            </View>
        </Flexcomponent>
    )
}

export default Options;