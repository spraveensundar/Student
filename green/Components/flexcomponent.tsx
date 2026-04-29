import React from "react"
import { Pressable, StyleProp, View, ViewProps, ViewStyle } from "react-native"

type alignItems = "baseline" | "center" | "flex-end" | "flex-start" | "stretch"
type justifyContent = "space-around" | "center" | "flex-end" | "flex-start" | "space-between" | "space-evenly"

interface Flexcomponentprops {
    width?: any,
    height?: any,
    alignItems?: alignItems,
    justifyContent?: justifyContent,
    paddingHorizontal?: any,
    paddingVertical?: any,
    top?: any,
    bottom?: any
    viewprops?: ViewProps,
    children?: React.ReactNode,
    style?: StyleProp<ViewStyle>,
    bakgroundcolor?: string,
    onPress?: () => void,
    ispress?: boolean
    hit?: any
}


const Flexcomponent: React.FC<Flexcomponentprops> = ({
    width = "100%",
    height,
    alignItems = "center",
    justifyContent = "center",
    paddingHorizontal = 0,
    paddingVertical = 0,
    viewprops,
    children,
    top,
    bottom,
    style,
    bakgroundcolor,
    onPress,
    ispress = false,
    hit
}) => {

    return (
        <Pressable onPress={onPress} disabled={!ispress} {...viewprops} style={[{ flexDirection: "row", width: width, height: height, alignItems: alignItems, justifyContent: justifyContent, paddingVertical: paddingVertical, paddingHorizontal: paddingHorizontal, marginTop: top, marginBottom: bottom, backgroundColor: bakgroundcolor }, style]} hitSlop={hit}>
            {children}
        </Pressable>
    )

}

export default Flexcomponent