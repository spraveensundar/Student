import { useState } from "react";
import SegmentedControl from "./segemental";
import useCustomHooks from "../Actions/Hooks/customhook";
import React from "react";
import { windowheight, windowwidth } from "../Utilities/dimensions";
import { StyleProp, ViewStyle } from "react-native";

interface Currencyswitchprops {
    index: number,
    onchangeindex: (index: number) => void,
    style?: StyleProp<ViewStyle>
}


const Currencyswitch: React.FC<Currencyswitchprops> = ({
    index = 0,
    onchangeindex,
    style = {
        alignSelf: "flex-end"
    }
}) => {
    const { theme } = useCustomHooks()
    return (
        <SegmentedControl
            tabs={["USD", "INR"]}
            currentIndex={index}
            width={windowwidth * 0.3}
            height={windowheight * 0.045}
            onChange={(index: number) => onchangeindex(index)}
            activeSegmentBackgroundColor="#279646"
            segmentedControlBackgroundColor={theme.card}
            bgstyle={style}
        />
    )

}


export default Currencyswitch;
