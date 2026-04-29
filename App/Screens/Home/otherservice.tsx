import React from "react";
import { Pressable, View } from "react-native";
import Images, { icons } from "../../Utilities/images";
import { borderradius, windowwidth } from "../../Utilities/dimensions";
import Text from "../../Components/text";
import Flexcomponent from "../../Components/flexcomponent";
import useCustomHooks from "../../Actions/Hooks/customhook";

const Otherservice: React.FC = () => {
    const { theme, navigation } = useCustomHooks();

    interface Otherprops {
        image: any,
        title: string,
        onpress?: () => void
    }

    const Common = ({
        image,
        title,
        onpress
    }: Otherprops) => {
        return (
            <View style={{ width: "31%" }} >
                <Pressable onPress={onpress} style={{ width: "100%", backgroundColor: theme.cardbg, borderRadius: borderradius * 0.5, alignItems: "center", justifyContent: "center", paddingVertical: windowwidth * 0.05, borderWidth: 1, borderColor: "#CFCFCF" }} >
                    <Images
                        type="image"
                        source={image}
                        style={{ width: windowwidth * 0.15, height: windowwidth * 0.15, }}
                    />
                </Pressable>
                <Text top={"5%"} style={{ textAlign: 'center', width: "100%", alignSelf: 'center' }} family="GRegular" size="semimedium">{title}</Text>

            </View>
        )
    }

    return (
        <Flexcomponent style={{ gap: 15 }} alignItems="flex-start" justifyContent="flex-start" top={"4%"} >
            <Common
                image={icons.toll}
                title="FASTag recharge"
                onpress={() => navigation.navigate('FASTagProvider')}
            />
            <Common onpress={() => navigation.navigate("ChallanCqPayment")}
                image={icons.challan}
                title=" Challan Check & Payment"
            />
        </Flexcomponent>
    )
}

export default Otherservice;