import React from "react"
import { StyleProp, Text, TextProps, View, ViewProps, ViewStyle } from "react-native"
import useCustomHooks from "../Actions/Hooks/customhook"
import Mainview from "./mainview"
import { Fontfamily, Fontsize } from "../Utilities/uiasset"

interface Nodataprops {
    viewstyle?: StyleProp<ViewStyle>,
    textstyle?: StyleProp<TextProps>,
    title?: string
}

const Nodata: React.FC<Nodataprops> = ({
    viewstyle,
    textstyle,
    title = "No data found"
}) => {
    const { theme } = useCustomHooks()
    return (
        <View style={[{ flex: 1, justifyContent: "center", alignItems: "center", }, viewstyle]} >
            <Text style={[{ fontFamily: Fontfamily.regular, color: theme.textinput, fontSize: Fontsize.semimedium }, textstyle]} >{title}</Text>
        </View>
    )

}

export default Nodata