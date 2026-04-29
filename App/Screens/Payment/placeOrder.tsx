import React from "react";
import Mainview from "../../Components/mainview";
import { Pressable, View } from "react-native";
import VectorIcons from "../../Utilities/vectorIcons";
import Text from "../../Components/text";
import { Button } from "../../Components/Field";
import Lottie from "../../Components/lottieview";
import { lotties } from "../../Utilities/images";

const PlaceOrder: React.FC = () => {
    return (
        <Mainview isheader={true}
            headertitle="Payment"
            islefticon={false}
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

export default PlaceOrder;