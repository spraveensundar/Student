import React, { useState } from "react"
import { Pressable, StyleProp, View, ViewStyle } from "react-native"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import LinearGradient from "react-native-linear-gradient"
import { borderradius, RFvalue, windowheight, windowwidth } from "../../../Utilities/dimensions"
import Text from "../../../Components/text"
import { Colors, Fontsize } from "../../../Utilities/uiasset"
import Flexcomponent from "../../../Components/flexcomponent"
import Card from "../../../Components/Card"
import VectorIcons from "../../../Utilities/vectoricons"
import Linecomponent from "../../../Components/line"
import { Button, Textarea } from "../../../Components/Field"

interface Configurationsprops {

}

const Configuration: React.FC<Configurationsprops> = () => {
    const { theme } = useCustomHooks();
    const [copyPair, setCopyPair] = useState("BTC / USDT");
    const [access, setAccess] = useState("Traders")

    const handleAccessToggle = (access: any) => {
        setAccess(access);
    };

    const handleCoptyPair = (access: any) => {
        setCopyPair(access);
    };

    interface Buttonprops {
        colors?: any[],
        title: string,
        style?: StyleProp<ViewStyle>
        onPress?: () => void,
        isSelected?: any
    }

    const Buttons = ({ title, onPress, style, isSelected }: Buttonprops,) => {
        return (
            <Pressable onPress={onPress} style={[{ width: "30%", height: windowheight * 0.050, justifyContent: "center", alignItems: "center", borderRadius: borderradius * 0.5, backgroundColor: isSelected ? Colors.white : "#1E2022", marginBottom: "5%", }, style]}>
                <Text size="small" family={"medium"} color={isSelected ? Colors.black : Colors.white} > {title}</Text >
            </Pressable >
        )
    }
    return (
        <View style={{ flex: 1 }}  >

            <Text style={{ marginTop: "5%" }}>Copy Trading Pairs</Text>

            <Flexcomponent style={{ flexWrap: "wrap" }} justifyContent="space-between" top={"2%"} >
                {["BTC / USDT", "GFT / USDT", "ETH / USDT", "ADA / USDT"].map((pair) => (
                    <Buttons
                        key={pair}
                        title={pair}
                        isSelected={copyPair === pair}
                        onPress={() => setCopyPair(pair)}
                    />
                ))}
            </Flexcomponent>


            <Text style={{ marginTop: "3%" }}>View Access</Text>

            <Flexcomponent style={{ flexWrap: "wrap" }} justifyContent="flex-start" top={"2%"} >
                <Buttons
                    title="Traders"
                    isSelected={access === "Traders"}
                    onPress={() => handleAccessToggle('Traders')}
                />

                <Buttons
                    title="Followers"
                    isSelected={access === "Followers"}
                    onPress={() => handleAccessToggle('Followers')}
                    style={{ marginLeft: "5%" }}
                />
            </Flexcomponent>


            <Textarea
                label="Description"
            />


            <Button
                title="Submit"
                buttonStyle={{ marginBottom: "5%" }}
            />
        </View>
    )

}

export default Configuration