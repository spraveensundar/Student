import React from "react";
import { Pressable, TextInput, View } from "react-native";
import Mainview from "../../Components/mainview";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Text from "../../Components/text";
import { Input } from "../../Components/Field";
import { Fontfamily, Fontsize } from "../../Utilities/uiasset";

const challanID: React.FC = () => {
    const { theme, navigation } = useCustomHooks();
    return (
        <Mainview
            isheader={true}
            headertitle="Challan Check & Payment"
            onleftfn={() => navigation.navigate("ChallanCqPayment")}
        >
            <View style={{ marginTop: '5%', gap: 20 }}>
                <Text family="GMedium" size="semilarge">Challan Check & Payment</Text>
                <View style={{ position: "relative", width: "100%", marginBottom: 20 }}>
                    <TextInput
                        value="TN-57-8525"
                        placeholderTextColor={theme.placeholderColor}
                        style={{
                            width: "100%",
                            padding: 15,
                            paddingRight: 45,
                            backgroundColor: "#F3F3F3",
                            borderRadius: 10,
                            fontFamily: Fontfamily.GRegular,
                            fontSize: Fontsize.medium
                        }}
                    />
                    <Pressable
                        style={{
                            position: "absolute",
                            paddingVertical: 5,
                            paddingHorizontal: 20,
                            right: 15,
                            top: "20%",
                            backgroundColor: theme.btnColor,
                            borderRadius: 10
                        }}
                    >
                        <Text family="GRegular" size="xmedium" color="#FFF">Search</Text>
                    </Pressable>
                </View>
            </View>
        </Mainview >
    )
}

export default challanID;