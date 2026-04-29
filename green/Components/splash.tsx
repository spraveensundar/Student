import { useEffect, useState } from "react";
import { Animated, Image, View } from "react-native";
import { Colors } from "../Utilities/uiasset";
import Lottie from "./lottieview";
import { lotties } from "../Utilities/images";

type Props = {
    onAnimationEnd: () => void;
};

const AnimatedBootSplash = ({ onAnimationEnd }: Props) => {

    useEffect(() => {
        setTimeout(() => {
            onAnimationEnd()
        }, 1000)
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary,justifyContent:"center",alignItems:"center" }} >
            <Lottie
                src={lotties.Splash}
                width={"80%"}
                height={"80%"}
            />
        </View>
    );
};

export default AnimatedBootSplash

