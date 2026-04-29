import { ImageStyle, Source } from "@d11/react-native-fast-image";
import { ImageRequireSource, StyleProp, ViewStyle } from "react-native";
import LinearGradient, { LinearGradientProps } from "react-native-linear-gradient"
import Images from "../../../Utilities/images";
import { borderradius, windowheight, windowwidth } from "../../../Utilities/dimensions";
import Text from "../../../Components/text";
import useCustomHooks from "../../../Actions/Hooks/customhook";

interface Gradientlistprops {
    colors: string[],
    source?: Source | ImageRequireSource;
    imagestyle?: StyleProp<ImageStyle>,
    title: string,
    value: string,
    top?: any,
    conatinerstyle?: StyleProp<ViewStyle>,
    gradientprops?: LinearGradientProps

}

const Gradientlist: React.FC<Gradientlistprops> = ({
    colors = ["#380600", "#993328"],
    source,
    imagestyle,
    title,
    value,
    top = 0,
    conatinerstyle,
    gradientprops
}) => {
    const { theme } = useCustomHooks()
    return (
        <LinearGradient
            colors={colors}
            style={[{ width: "47.5%", paddingHorizontal: "5%", marginTop: top, borderRadius: borderradius * 0.5,paddingBottom:"5%" }, conatinerstyle]}
            {...gradientprops}
        >
            <Images
                type="image"
                source={source}
                width={windowwidth * 0.1}
                height={windowheight * 0.1}
                style={imagestyle}
            />
            <Text family="GRegular" size="medium" color={theme.white} >{title}</Text>
            <Text family="GBold" size="medium" color={theme.white} >{value}</Text>

        </LinearGradient>
    )

}

export default Gradientlist