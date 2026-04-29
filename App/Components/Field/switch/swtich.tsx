
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import { borderradius, windowheight, windowwidth } from "../../../Utilities/dimensions";
import { Colors } from "../../../Utilities/uiasset";
import useCustomHooks from "../../../Actions/Hooks/customhook";

interface Props {
    testID?: string;
    switchOn: boolean;
    onPress: () => void;
    containerStyle?: ViewStyle;
    circleStyle?: ViewStyle;
    backgroundColorOn?: string;
    backgroundColorOff?: string;
    backgroundImageOn?: React.ReactElement;
    backgroundImageOff?: React.ReactElement;
    circleColorOff?: string;
    circleColorOn?: string;
    duration?: number;
    type?: number;
    buttonText?: string;
    backTextRight?: string;
    backTextLeft?: string;
    buttonTextStyle?: StyleProp<TextStyle>;
    textRightStyle?: StyleProp<TextStyle>;
    textLeftStyle?: StyleProp<TextStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    buttonContainerStyle?: StyleProp<ViewStyle>;
    rightContainerStyle?: StyleProp<ViewStyle>;
    leftContainerStyle?: StyleProp<ViewStyle>;
    RTL?: boolean;
}

interface Switchprops {
    value?: boolean
    onPress: () => void;
    props?: Props
}
const Switch: React.FC<Switchprops> = ({
    value = false,
    onPress,
    props
}) => {
    const { theme } = useCustomHooks()
    return (
        <SwitchToggle
            switchOn={value}
            onPress={onPress}
            containerStyle={{
                width: windowwidth * 0.1325,
                height: windowheight * 0.031,
                borderRadius: borderradius * 3,
                borderWidth: 0.5,
                borderColor: "#CFCFCF"
            }}
            circleStyle={{
                width: windowwidth * 0.0475,
                height: windowwidth * 0.0475,
                borderRadius: borderradius * 5,
                left: !value ? windowwidth * 0.01 : (-windowwidth * 0.01),
            }}
            backgroundColorOn={Colors.primary}
            backgroundColorOff="#F3F3F3"
            circleColorOff={theme.background}
            circleColorOn={theme.background}

            {...props}
        />
    )
}

export default Switch