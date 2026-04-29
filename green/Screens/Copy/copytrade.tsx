import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import React, { useState } from "react";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Mainview from "../../Components/mainview";
import Flexcomponent from "../../Components/flexcomponent";
import { borderradius, windowheight, windowwidth } from "../../Utilities/dimensions";
import Text from "../../Components/text";
import VectorIcons from "../../Utilities/vectoricons";
import { Pressable, StyleSheet, View } from "react-native";
import Publicportfolio from "./publicportfolio";
import Wishlistcomponent from "./wishlist";
import Copyfiltercomponent from "./copyfilter";
import Toptabs from "../../Components/toptabs";


type Props = NativeStackScreenProps<Stacknavigationtypes, 'Copytrade'>;


const Copytrade: React.FC<Props> = () => {
    const { theme, navigation, bottomsheetref, openbottomsheet } = useCustomHooks()
    const [firsttab, setFirsttab] = useState(true)
    const styles = style(theme)
    const [currency, setCurrency] = useState("spot")

    const [activeindex, setActiveindex] = useState(0)

    return (
        <Mainview
            headertitle={"Copy Trading"}
            onleftfn={() => navigation.goBack()}
        >
            <Flexcomponent justifyContent="space-between" >
                <Flexcomponent ispress={true} onPress={() => openbottomsheet(bottomsheetref)} style={{ borderRadius: borderradius * 0.5 }} paddingHorizontal={"4%"} bakgroundcolor={theme.card} paddingVertical={"2.5%"} width={"40%"} justifyContent="space-between" >
                    <Text>{currency == "spot" ? "Spot" : "Future"} Copy</Text>
                    <VectorIcons
                        iconcolor={theme.primarytext}
                        family="Ionicons"
                        name={"chevron-down"}
                        size={windowwidth * 0.05}
                    />
                </Flexcomponent>

                <Pressable style={{ justifyContent: "center", alignItems: "center", width: "40%", paddingVertical: "2.5%", paddingHorizontal: "4%", backgroundColor: theme.tabactive, borderRadius: borderradius * 0.5 }} onPress={() => navigation.navigate("MasterTrader")}>
                    <Text color={theme.activetabtext} >Master Trader</Text>
                </Pressable>
            </Flexcomponent>


            <Toptabs
                tabs={["Public Portfolio", "My Favorites"]}
                activeindex={activeindex}
                onchangeindex={setActiveindex}
                top={"2.5%"}
            />

            <View style={{ flex: 1 }} >
                {activeindex == 0 &&
                    <Publicportfolio
                    />
                }

                {activeindex == 1 &&
                    <Wishlistcomponent
                    />
                }
            </View>

            <Copyfiltercomponent
                sheetref={bottomsheetref}
                currency={currency}
                onchange={setCurrency}

            />


        </Mainview>
    )

}

export default Copytrade


const style = (theme: any) => StyleSheet.create({
    activetab: {
        width: "45%",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: theme.tabactive,
        height: "100%"
    },
    inactivetab: {
        width: "45%",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    }
})