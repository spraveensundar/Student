import { Pressable, View } from "react-native"
import useCustomHooks from "../../Actions/Hooks/customhook"
import React from "react"
import { borderradius, windowheight, windowwidth } from "../../Utilities/dimensions"
import Images from "../../Utilities/images"
import VectorIcons from "../../Utilities/vectoricons"
import { Colors } from "../../Utilities/uiasset"
import Text from "../../Components/text"


interface Homeheaderprops {

}
const Homeheader: React.FC<Homeheaderprops> = () => {
    const { theme, navigation } = useCustomHooks()
    return (
        <View style={{ flexDirection: "row", alignItems: "center", height: windowheight * 0.1, justifyContent: "space-around", marginHorizontal: "2.5%" }} >
            <Pressable style={{ width: "12.5%", height: windowwidth * 0.1, justifyContent: "center", alignItems: "center" }} onPress={() => navigation.navigate("Profile")}>
                <Images
                    type="svg"
                    name={theme.theme == "dark" ? "Menuprofile" : "Menuprofilelight"}
                    width={windowwidth * 0.065}
                    height={windowwidth * 0.065}
                />
            </Pressable>

            <Pressable style={{ width: "45%", height: windowheight * 0.05, backgroundColor: theme.card, alignItems: "center", borderRadius: borderradius * 1, flexDirection: "row", paddingHorizontal: "5%" }} >
                <VectorIcons
                    family="Feather"
                    name={"search"}
                    size={windowwidth * 0.045}
                    iconcolor={Colors.grey}
                />
                <Text style={{ color: Colors.grey, marginLeft: "5%" }} size="semimedium" >INR / USDT</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Deposit')} style={{ width: "12.5%", height: windowwidth * 0.1, justifyContent: "center", alignItems: "center" }} >
                <VectorIcons
                    family="MaterialDesignIcons"
                    name={"wallet-bifold-outline"}
                    size={windowwidth * 0.07}
                    iconcolor={theme.inversetext}
                />
            </Pressable>

            <Pressable onPress={() => navigation.navigate('QRcodeScanner')} style={{ width: "12.5%", height: windowwidth * 0.1, justifyContent: "center", alignItems: "center" }} >
                <VectorIcons
                    family="MaterialDesignIcons"
                    name={"line-scan"}
                    size={windowwidth * 0.055}
                    iconcolor={theme.inversetext}
                />
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Notification')} style={{ width: "12.5%", height: windowwidth * 0.1, justifyContent: "center", alignItems: "center" }} >
                <VectorIcons
                    family="Ionicons"
                    name={"notifications"}
                    size={windowwidth * 0.055}
                    iconcolor={theme.inversetext}
                />
                <View style={{ width: 10, height: 10, backgroundColor: "#FF4130", position: "absolute", borderRadius: borderradius * 5, top: 0, right: "30%" }} />
            </Pressable>
        </View>
    )

}

export default Homeheader