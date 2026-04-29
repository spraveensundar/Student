import { ImageBackground, Pressable, View } from "react-native"
import useCustomHooks from "../../Actions/Hooks/customhook"
import React, { useEffect } from "react"
import Images, { image } from "../../Utilities/images"
import { borderradius, windowheight, windowwidth } from "../../Utilities/dimensions"
import Flexcomponent from "../../Components/flexcomponent"
import Text from "../../Components/text"
import VectorIcons from "../../Utilities/vectoricons"
import { useLazyUserDetailsQuery } from "../../Slices/auth"
import { useSelector } from "react-redux"
import { walletSelector } from "../../Slices/wallet"


interface Cardprops {

}

const Homecard: React.FC<Cardprops> = () => {
    const { theme, navigation, convert } = useCustomHooks()
    const { currentaccount } = useSelector(walletSelector)


    return (
        <ImageBackground
            source={image.card}
            style={{ width: "100%", height: windowheight * 0.235, alignSelf: "center", marginTop: "5%", }}
            resizeMode="stretch"

        >
            <View style={{ flex: 1, padding: "5%", }} >
                <Flexcomponent justifyContent="space-between"   >
                    <Text size="medium" style={{ color: "#282828" }} >Current Balance</Text>
                    {/* <VectorIcons
                        family="Ionicons"
                        name={"eye-outline"}
                        size={windowwidth * 0.065}
                        iconcolor={"#282828"}
                    /> */}
                </Flexcomponent>


                <Flexcomponent alignItems="center" justifyContent="flex-start" top={"2%"}  >
                    <Text style={{ color: "#000000" }} size="extralarge" family="extrabold" >₹{convert(currentaccount?.balance)}</Text>
                    <View style={{ marginLeft: "2.5%", }} >
                        <Flexcomponent alignItems="flex-end" justifyContent="flex-start" >
                            <VectorIcons
                                family="Ionicons"
                                name={"caret-up"}
                                iconcolor={"#2A2A2A"}
                                size={windowwidth * 0.05}
                            />
                            <Text  style={{ marginLeft: "5%" }} color="#2A2A2A" family="medium" size="small" > $ {currentaccount?.balance > 0 ? parseFloat(currentaccount?.balance).toFixed(4) : 0}</Text>
                        </Flexcomponent>
                    </View>
                </Flexcomponent>

                <Pressable onPress={() => navigation.navigate('Deposit')} style={{ backgroundColor: theme.card, borderRadius: borderradius * 3, width: "auto", position: "absolute", bottom: "5%", left: "5%", paddingVertical: "3%", paddingHorizontal: "3%" }} >
                    <Flexcomponent style={{ width: "auto" }}>
                        <Images
                            type="svg"
                            name={theme.theme == "dark" ? "Addmoney" : "Addmoneylight"}
                            width={windowwidth * 0.06}
                            height={windowwidth * 0.06}

                        />
                        <Text family="medium" style={{ marginLeft: "5%" }} >Add Money</Text>
                    </Flexcomponent>
                </Pressable>

            </View>

        </ImageBackground>
    )
}

export default Homecard