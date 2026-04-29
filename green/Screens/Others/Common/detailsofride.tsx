import { View } from "react-native";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import Flexcomponent from "../../../Components/flexcomponent";
import Text from "../../../Components/text";
import { Colors } from "../../../Utilities/uiasset";
import React from "react";
import { status } from "./types";


const Detilsofride: React.FC<{
    leftext: string;
    righttext?: string;
    top?: any;
    staus?: status;
    leftwidth?: any
}> = React.memo(({ leftext, righttext, top = 0, staus, leftwidth = 30 }) => {
    const { theme } = useCustomHooks();
    const ltwd: any = leftwidth + "%"
    const riwd: any = (100 - leftwidth) + "%"

    return (
        <Flexcomponent width={"100%"} top={top}>
            <View style={{ width: ltwd ?? "30%" }}>
                <Text family="GRegular">{leftext}</Text>
            </View>

            <View style={{ width: riwd ?? "70%", alignItems: "flex-end" }}>
                <Text
                    numoflines={2}
                    family="GMedium"
                    style={{
                        alignSelf: "flex-end",
                        textAlign: "right",
                        color: staus == "completed"
                            ? Colors.green
                            : staus == "cancelled"
                                ? Colors.red
                                : theme.primarytext,
                    }}
                >
                    {righttext}
                </Text>
            </View>
        </Flexcomponent>
    );
});

export default Detilsofride