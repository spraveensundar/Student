import { StyleProp, View, ViewStyle } from "react-native";
import LottieView from 'lottie-react-native';

type align = "center" | "auto" | "baseline" | "flex-end" | "flex-start" | "stretch"
interface Lottieprops {
    src: any,
    style?: StyleProp<ViewStyle>,
    width?: any,
    height?: any,
    speed?: number;
    alignself?: align,
    autoplay?: boolean
    loop?: boolean
}

const Lottie: React.FC<Lottieprops> = ({
    src,
    style,
    width,
    height,
    speed = 1,
    alignself = "center",
    autoplay = true,
    loop = true,
}) => {
    return (
        <LottieView
            source={src}
            style={[{ width: width, height: height, alignSelf: alignself, }, style]}
            autoPlay={autoplay}
            speed={speed}
            loop={loop}
        />
    )
}

export default Lottie