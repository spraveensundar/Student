import React from "react"
import { ActivityIndicator, ActivityIndicatorProps, StyleProp, View, ViewStyle } from "react-native"
import useCustomHooks from "../Actions/Hooks/customhook"

interface Loadercomponentprops {
    containerstyle?: StyleProp<ViewStyle>,
    activityindicatorprops?: ActivityIndicatorProps
}

const Loadercomponent: React.FC<Loadercomponentprops> = ({
    containerstyle,
    activityindicatorprops
}) => {
    const { theme } = useCustomHooks()
    return (
        <View style={[{ flex: 1, justifyContent: "center" }, containerstyle]} >
            <ActivityIndicator
                size={"small"}
                color={theme.tabactive}
                {...activityindicatorprops}
            />
        </View>
    )

}

export default Loadercomponent