import { ImageProps, Pressable, StyleProp, View } from "react-native"
import useCustomHooks from "../../Actions/Hooks/customhook"
import React from "react"
import { borderradius, RFvalue, windowheight, windowwidth } from "../../Utilities/dimensions"
import Images from "../../Utilities/images"
import Text from "../../Components/text"
import { Colors } from "../../Utilities/uiasset"
import Flexcomponent from "../../Components/flexcomponent"

interface Normalprops {
    type: "normal",
    image: any,
    title: string,
    price: string | number,
    change: string | number,
    change_percentage: string | number
}

interface Popularprops {
    type: "popular",
    title: string,
    des: string,
    image: any,
    price: string | number,
    change: string | number,
    change_percentage: string | number,
    status: string

}

type Tradeprops = Normalprops | Popularprops

const Trade: React.FC<Tradeprops> = (props) => {
    const { theme, navigation } = useCustomHooks()
    if (props.type == "normal") {
        const { image, title, price, change, change_percentage } = props
        return (
            <View style={{ padding: "4%", backgroundColor: theme.card, width: "48%", borderRadius: borderradius * 0.5, marginBottom: "3.5%" }} >
                <Pressable onPress={() => navigation.navigate("Portfolio")}>
                    <Images
                        type="image"
                        source={image}
                        style={{ width: windowwidth * 0.075, height: windowwidth * 0.075, resizeMode: "contain" }}
                    />
                    <Text family="medium" size="medium" top={"5%"} >{title}</Text>

                    <Text size="semimedium" top={"10%"} >₹{price}</Text>
                    <Text color={theme.homegreen} fontSize={RFvalue(12)} top={"2.5%"} >+{change} ({change_percentage}%)</Text>
                </Pressable>
            </View>
        )
    }

    if (props.type == "popular") {
        const { image, title, des, status, price, change, change_percentage, } = props
        return (
            <View style={{ padding: "4%", backgroundColor: theme.card, width: "48%", borderRadius: borderradius * 0.5, marginBottom: "5.5%" }} >
                <Pressable onPress={() => navigation.navigate("Portfolio")}>
                    <Flexcomponent>
                        <View style={{ width: "75%" }} >
                            <Text size="medium" family="medium"  >{title}</Text>
                            <Text color="#9094A0" size="semimedium" family="medium"  >{des}Sei</Text>

                        </View>
                        <View style={{ width: "25%" ,alignItems:"flex-end"}} >
                            <Images
                                type="image"
                                source={image}
                                style={{ width: windowwidth * 0.075, height: windowwidth * 0.075, resizeMode: "contain" }}
                            />
                        </View>
                    </Flexcomponent>
                    <View style={{ width: "70%",  borderRadius: borderradius * 0.25, backgroundColor: status == "gain" ? "#C2DA60" : "#8B7FBB", alignItems: "center", justifyContent: "center", marginTop: "5%",paddingVertical:"4%" }} >
                        <Text fontSize={RFvalue(11)} color="#1D1D1D" >{status == "gain" ? "Top gainer" : "Most Sold"}</Text>
                    </View>

                    <Text size="semimedium" top={"5%"} >₹{price}</Text>
                    <Text color={theme.homegreen} fontSize={RFvalue(12)} top={"2.5%"} >+{change} ({change_percentage}%)</Text>
                </Pressable>
            </View>

        )
    }
}

export default Trade