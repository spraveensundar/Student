import React, { useContext } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import useCustomHooks from "../Actions/Hooks/customhook"
import { windowwidth } from "../Utilities/dimensions"
import ThemeContext from "../Utilities/themecontext"

interface Linecomponentprops {
    width?: any,
    height?: any,
    backgroundcolor?: any,
    containerstyle?: ViewStyle
}


const Linecomponent: React.FC<Linecomponentprops> = ({
    width = windowwidth,
    height = 1,
    backgroundcolor,
    containerstyle
}) => {
    const theme = useContext(ThemeContext)
    return (
        <View style={{ height: height, backgroundColor: backgroundcolor ?? theme.boderColor, width: width, alignSelf: "center", }} {...containerstyle} />

    )
}

export default Linecomponent