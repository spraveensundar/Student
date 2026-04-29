import React, { useState } from "react";
import useCustomHooks from "../Actions/Hooks/customhook";
import { ActivityIndicator, StyleProp, View, ViewStyle } from "react-native";


interface loaderprops {
    isloading: boolean,
    loaderstyle?: StyleProp<ViewStyle>
}

const Loader: React.FC<loaderprops> = ({
    isloading,
    loaderstyle
}) => {
    const { theme, navigation } = useCustomHooks()
    return (
        <View style={[{ flex: 1, justifyContent: "center", alignItems: "center",display:isloading ? "flex":"none" }, loaderstyle]} >
            <ActivityIndicator size={"small"} color={theme.primarytext} />
        </View>
    )

}

export default Loader;