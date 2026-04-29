import React from "react";
import Mainview from "../../Components/mainview";
import { Pressable, View } from "react-native";
import VectorIcons from "../../Utilities/vectorIcons";
import Lottie from "../../Components/lottieview";
import { lotties } from "../../Utilities/images";
import Text from "../../Components/text";
import { Button } from "../../Components/Field";
import useCustomHooks from "../../Actions/Hooks/customhook";

const PaymentNow: React.FC = () => {
    const { theme, navigation } = useCustomHooks();
    return (
        <Mainview isheader={true}
            headertitle="Payment"
            islefticon={false}
            bottomContent={
                <View style={{ paddingHorizontal: "6%", marginBottom: "5%" }}>
                    <Button title="Go to home" onPress={() => navigation.navigate("Bottomtab")} />
                </View>
            }
            rightfn={
                <Pressable>
                    <VectorIcons
                        family="Ionicons"
                        name="arrow-redo"
                    />
                </Pressable>
            }
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Lottie
                    src={lotties.Tick}
                    style={{ width: "50%", height: "30%" }}
                    speed={0.5}
                />
                <Text family="bold" size="medium">Your payment was successfully !</Text>
            </View>
        </Mainview>
    )
}

export default PaymentNow;