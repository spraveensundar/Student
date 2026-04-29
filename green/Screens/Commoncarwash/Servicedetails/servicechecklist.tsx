import React from "react"
import Flexcomponent from "../../../Components/flexcomponent"
import { Pressable, Text, TextStyle, View } from "react-native"
import { borderradius, RFvalue, windowwidth } from "../../../Utilities/dimensions"
import { Colors, Fontfamily } from "../../../Utilities/uiasset"
import VectorIcons from "../../../Utilities/vectorIcons"
import useCustomHooks from "../../../Actions/Hooks/customhook"


interface checklistprops {
    ischeck?: boolean,
    title: string,
    isright?: boolean,
    top?: any,
    isopen?: () => void
    open?: boolean,
    textstyle?:TextStyle
}

const ServiceChecklist: React.FC<checklistprops> = React.memo(({
    ischeck,
    title,
    isright,
    top,
    isopen,
    open,
    textstyle

}) => {
    const { theme } = useCustomHooks()
    return (
        <Flexcomponent top={top} ispress={isright} paddingVertical={"2.5%"} onPress={isopen} >
            <View style={{ width: "10%", }} >
                {ischeck ?
                    <View style={{ width: windowwidth * 0.05, height: windowwidth * 0.05, backgroundColor: Colors.green, justifyContent: "center", alignItems: "center", borderRadius: borderradius * 3 }} >
                        <VectorIcons
                            family="Feather"
                            name={"check"}
                            size={windowwidth * 0.03}
                            iconcolor={theme.white}
                        />
                    </View> :
                    <View style={{ width: windowwidth * 0.05, height: windowwidth * 0.05, borderColor: Colors.green, justifyContent: "center", alignItems: "center", borderRadius: borderradius * 3, borderWidth: 2 }} />
                }
            </View>
            <View style={{ width: "80%", }} >
                <Text style={[{ fontSize: RFvalue(13), fontFamily: Fontfamily.GMedium, top: 2 },textstyle]} >{title}</Text>
            </View>
            <View style={{ width: "10%", justifyContent: "center", alignItems: "center" }} >
                {isright &&
                    <VectorIcons
                        family="Feather"
                        size={windowwidth * 0.075}
                        name={open ? "chevron-down" : "chevron-right"}
                    />}
            </View>
        </Flexcomponent>
    )

})

export default ServiceChecklist