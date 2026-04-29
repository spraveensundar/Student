import { BackHandler, Pressable, StyleSheet, View } from "react-native"
import useCustomHooks, { Commonalert, useHardwareBackPress } from "../../../Actions/Hooks/customhook"
import Mainview from "../../../Components/mainview"
import Text from "../../../Components/text"
import Flexcomponent from "../../../Components/flexcomponent"
import { borderradius, windowheight, windowwidth } from "../../../Utilities/dimensions"
import { ThemeType } from "../../../Utilities/theme"
import VectorIcons from "../../../Utilities/vectorIcons"
import { useEffect, useState } from "react"
import { Colors } from "../../../Utilities/uiasset"
import { useEditLeaveRequestMutation } from "../../../Slices/cleaning"
import { destroyStorage } from "../../../Actions/Storage/localStorage"


const Chooselangugae: React.FC = () => {
    const { navigation, theme } = useCustomHooks()
    const styles = style(theme)
    const [isenglish, setEnglish] = useState(true)
    useHardwareBackPress({
        title: "Alert",
        des: "Are you sure want to quit Carigato vendor",
        yesfn: () => BackHandler.exitApp()
    })

    useEffect(() => {
     destroyStorage()
    }, [])
    return (
        <Mainview
            isheader
            isboxshadow={false}
            bottomContent
            bottomtext="Next"
            onBottompress={() => navigation.navigate("Categories", { isenglish: isenglish })}
            {...(navigation.canGoBack() ? {
                onleftfn: () => {
                    Commonalert({
                        title: "Alert",
                        des: "Are you sure want to quit Carigato vendor",
                        yes: () => BackHandler.exitApp()
                    })
                }
            } : { islefticon: false })}
        >
            <Text family="GBold" size="large" >Choose langugae</Text>
            <Text family="GRegular" size="medium" top={"2.5%"} >A sentence or heading for language selection</Text>
            <Flexcomponent top={"5%"} justifyContent="flex-start" >
                <Pressable onPress={() => setEnglish(!isenglish)} style={isenglish ? styles.activetab : styles.inactivetab} >
                    <Text family="GRegular" size="medium" >English</Text>
                    {isenglish &&
                        <View style={{ width: windowwidth * 0.05, height: windowwidth * 0.05, backgroundColor: theme.btnColor, position: "absolute", top: "5%", right: "5%", borderRadius: borderradius * 5, justifyContent: "center", alignItems: "center" }} >
                            <VectorIcons
                                family="AntDesign"
                                name={"check"}
                                iconcolor={theme.white}
                                size={windowwidth * 0.03}
                            />
                        </View>}
                </Pressable>

                <Pressable onPress={() => setEnglish(!isenglish)} style={[isenglish ? styles.inactivetab : styles.activetab, { marginLeft: "5%" }]} >
                    <Text family="GRegular" size="medium" >हिंदी</Text>
                    {!isenglish &&
                        <View style={{ width: windowwidth * 0.05, height: windowwidth * 0.05, backgroundColor: theme.btnColor, position: "absolute", top: "5%", right: "5%", borderRadius: borderradius * 5, justifyContent: "center", alignItems: "center" }} >
                            <VectorIcons
                                family="AntDesign"
                                name={"check"}
                                iconcolor={theme.white}
                                size={windowwidth * 0.03}
                            />
                        </View>}
                </Pressable>

            </Flexcomponent>
        </Mainview>
    )

}

export default Chooselangugae

const style = (theme: ThemeType) => StyleSheet.create({
    inactivetab: {
        width: "30%",
        height: windowheight * 0.1,
        justifyContent: "center",
        backgroundColor: theme.cardBg,
        borderRadius: borderradius * 0.5,
        borderWidth: 1,
        borderColor: theme.boderColor,
        alignItems: "center"
    },
    activetab: {
        width: "30%",
        height: windowheight * 0.1,
        justifyContent: "center",
        backgroundColor: theme.background,
        borderRadius: borderradius * 0.5,
        borderWidth: 1,
        borderColor: Colors.primary,
        alignItems: "center"
    }

})