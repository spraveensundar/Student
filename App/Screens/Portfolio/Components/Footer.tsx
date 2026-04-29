import React from "react";
import { View, ActivityIndicator } from "react-native";

import Text from "../../../Components/text";
import { Colors } from "../../../Utilities/uiasset";
import useCustomHooks from "../../../Actions/Hooks/customhook";

interface Footerprops {
    isLoading?: any
}

const Footer: React.FC<Footerprops> = ({
    isLoading
}) => {
    const { theme } = useCustomHooks();
    if (!isLoading) return null;
    return (
        <View style={{ paddingVertical: 20, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="small" color={theme.darktext} style={{ marginBottom: "1%" }} />
            <Text family="regular" size="small" color={Colors.stormGrey}>
                Loading...
            </Text>
        </View>
    );
}

export default Footer;