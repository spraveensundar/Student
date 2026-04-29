
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import { borderradius, windowheight, windowwidth } from "../../Utilities/dimensions";
import { Colors } from "../../Utilities/uiasset";

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

    return (
        <SwitchToggle
            switchOn={value}
            onPress={onPress}
            containerStyle={{
                width:windowwidth*0.135,
                height:windowheight*0.0325,
                borderRadius:borderradius*3,
                
            }}
            circleStyle={{
                width: windowwidth*0.0425,
                height: windowwidth*0.0425,
                borderRadius: borderradius*5,
                left: !value ?  windowwidth*0.02 : (-windowwidth*0.02)
            }}
            backgroundColorOn={Colors.primary}
            {...props}
        />
    )
}

export default Switch