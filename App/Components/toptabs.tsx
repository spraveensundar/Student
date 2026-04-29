import Flexcomponent from "./flexcomponent";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { borderradius } from "../Utilities/dimensions";
import { Colors } from "../Utilities/uiasset";
import Text from "./text";
import useCustomHooks from "../Actions/Hooks/customhook";

interface TopTabsprops {
    tabs: string[],
    onchange: (value: number) => void,
    containerstyle?: StyleProp<ViewStyle>,
    activeindex: number,
    width?: any,
    paddingvertical?: any
}

const TopTabs: React.FC<TopTabsprops> = ({
    tabs,
    onchange,
    containerstyle,
    activeindex,
    width = 100,
    paddingvertical = "4%"
}) => {
    const { theme } = useCustomHooks()
    const overallwidth = width + "%"
    const containerwidth: any = ((100 / tabs.length) * 0.95) + "%"
    return (
        <Flexcomponent
            width={overallwidth}
            justifyContent="space-between"
            paddingVertical={"2.5%"}
            style={[containerstyle]}
        >
            {tabs?.map((e: string, index: number) => (
                <Pressable
                    onPress={() => onchange(index)}
                    style={{
                        width: containerwidth,
                        paddingVertical: paddingvertical,
                        paddingHorizontal: "5%",
                        backgroundColor: (activeindex === index) ? Colors.primary : theme.card,
                        borderRadius: borderradius * 5,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: index !== activeindex ? 0.5 : 0,
                        borderColor: "#CFCFCF"
                    }} >
                    <Text
                        family="GMedium"
                        size="medium"
                        color={activeindex === index ? "#ffff" : theme.primarytext}
                    >{e}</Text>
                </Pressable>))
            }
        </Flexcomponent>
    )
}

export default TopTabs