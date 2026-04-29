import React from "react";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Mainview from "../../Components/mainview";
import { View } from "react-native";
import { Button } from "../../Components/Field";
import Text from "../../Components/text";

const PaymentSummery: React.FC = () => {
    const { theme, navigation } = useCustomHooks();
    return (
        <Mainview
            isheader={true}
            headertitle="Challan Check & Payment"
            onleftfn={() => navigation.navigate("challanID")}
            bottomContent={
                <View style={{ paddingHorizontal: "6%", marginBottom: "5%" }}>
                    <Button title="Pay Now" onPress={() => navigation.navigate("PaymentNow")} />
                </View>
            }
        >
            <View style={{ marginTop: '5%', gap: 20 }}>
                <Text family="GMedium" size="semilarge">Payment Summary</Text>

                <View
                    style={{
                        backgroundColor: theme.card,
                        padding: 20,
                        borderRadius: 10,
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <View style={{ gap: 15 }}>
                        {[
                            "Accused Name",
                            "RC No",
                            "Challan No",
                            "Challan Date",
                            "State",
                            "Location",
                            "Offence",
                            "Status",
                        ].map((item, index) => (
                            <Text key={index} family="GRegular" size="semimedium">
                                {item}
                            </Text>
                        ))}
                    </View>

                    <View style={{ gap: 12, flex: 1, alignItems: "flex-end" }}>
                        <Text family="GMedium" size="medium">B**************</Text>
                        <Text family="GMedium" size="medium">TN57BU7854</Text>
                        <Text family="GMedium" size="medium">TN306485624152</Text>
                        <Text family="GMedium" size="medium">29-01-2025</Text>
                        <Text family="GMedium" size="medium">Tamil Nadu</Text>
                        <Text family="GMedium" size="medium">Madurai City</Text>

                        {/* Long text automatically wraps */}
                        <Text
                            family="GMedium"
                            size="medium"
                            style={{ textAlign: "right", flexShrink: 1 }}
                        >
                            1. No entry / Wrong side driving
                        </Text>

                        <Text family="GMedium" size="medium">Pending</Text>
                    </View>
                </View>
            </View>

        </Mainview>
    )
}

export default PaymentSummery;