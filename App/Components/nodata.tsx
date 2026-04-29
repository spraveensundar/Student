import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import Text from "./text";
import Lottie from "./lottieview";
import { lotties } from "../Utilities/images";

interface Nodataprops {
    container?: StyleProp<ViewStyle>
    lottiestyle?: StyleProp<ViewStyle>
    text?: string,

}

const Nodata: React.FC<Nodataprops> = ({
    container,
    lottiestyle,
    text = "No data found",
}) => {
    return (
        <View style={[{ flex: 1, justifyContent: "center", alignItems: "center", }, container]}  >
            <Lottie
                src={lotties.NoData}
                width={"30%"}
                height={"30%"}
                style={lottiestyle}
            />
            <Text style={{ textAlign: "center" }}>{text}</Text>
        </View>
    )

}

export default Nodata;