import React, { useState } from "react";
import Flexcomponent from "../../Components/flexcomponent";
import { borderradius, RFvalue, windowwidth } from "../../Utilities/dimensions";
import { Pressable, View } from "react-native";
import Images, { icons } from "../../Utilities/images";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Text from "../../Components/text";


const Offers: React.FC = () => {
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
        const { theme } = useCustomHooks()
        return (
            <Pressable onPress={onpress} style={{ width: "30%", backgroundColor: theme.cardbg, borderRadius: borderradius * 0.5, alignItems: "center", justifyContent: "center", paddingVertical: windowwidth * 0.035, }} >
                <Images
                    type="image"
                    source={image}
                    style={{ width: windowwidth * 0.125, height: windowwidth * 0.125, }}
                />
                <Text top={"10%"} style={{ textAlign: 'center', width: "95%", alignSelf: 'center', fontSize: RFvalue(10) }} family="GMedium" >{title}</Text>

            </Pressable>


        )
    }
    return (
        <Flexcomponent style={{ gap: 15, flexWrap: "wrap" }} alignItems="flex-start" justifyContent="flex-start" top={"4%"} >
            <Common
                image={icons.Guarantee}
                title="30 Days Warranty"
            />

            <Common
                image={icons.Affordable}
                title="Affordable Prices"
            />

            <Common
                image={icons.Geninune}
                title="Genuine Service"
            />

            <Common
                image={icons.Doorstep}
                title="Free Doorstep"
            />
            <Common
                image={icons.Loop}
                title="Real Time Updates"
            />
        </Flexcomponent>

    )

}

export default Offers;