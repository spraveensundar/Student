import React from "react"
import Flexcomponent from "./flexcomponent"
import { StyleProp, View, ViewProps } from "react-native"
import { borderradius, RFvalue, windowheight, windowwidth } from "../Utilities/dimensions"
import useCustomHooks from "../Actions/Hooks/customhook"
import Images, { image } from "../Utilities/images"
import Text from "./text"
import VectorIcons from "../Utilities/vectoricons"

interface Currencyselectprops {
    style?: StyleProp<ViewProps>,
    onselect?: () => void,
    currency: string,
    descrption: string,
    currencyicon?: any,
    width?: any
}

const Currencyselect: React.FC<Currencyselectprops> = ({
    style,
    onselect,
    currency,
    descrption,
    currencyicon,
    width = "50%"
}) => {
    const { theme } = useCustomHooks()
    return (
        <Flexcomponent ispress={true} onPress={onselect} style={[{ borderRadius: borderradius * 0.5 }, style]} height={windowheight * 0.075} width={width} paddingHorizontal={"3%"} paddingVertical={"2%"} bakgroundcolor={theme.card}  >
            {
                currencyicon && (
                    <View style={{ width: "25%", height: "100%", alignItems: "center", justifyContent: "center" }} >
                        <Images
                            type="image"
                            source={currencyicon}
                            resizeMode="contain"
                            width={"75%"}
                            height={"75%"}
                        />
                    </View>
                )
            }
            <View style={{ width: currencyicon ? "60%" : "85%", height: "100%", paddingHorizontal: "5%", justifyContent: "center" }} >
                <Text numoflines={1} family="medium" color={theme.futuretext} >{currency}</Text>
                <Text family="medium" fontSize={RFvalue(11)} color={theme.secondarytext} >{descrption}</Text>
            </View>
            <View style={{ width: "20%", height: "100%", alignItems: "center", justifyContent: "center" }} >
                <VectorIcons
                    family="Ionicons"
                    name={"chevron-down"}
                    iconcolor={theme.futuretext}
                    size={windowwidth * 0.05}
                />
            </View>
        </Flexcomponent>
    )
}

export default Currencyselect