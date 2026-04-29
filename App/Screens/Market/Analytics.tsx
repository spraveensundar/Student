import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { style } from "../Future/style";
import Mainview from "../../Components/mainview";
import { View } from "react-native";
import { borderradius, windowheight } from "../../Utilities/dimensions";
import Card from "../../Components/Card";
import Text from "../../Components/text";
import Images from "../../Utilities/images";
import Flexcomponent from "../../Components/flexcomponent";
import Currencyswitch from "../../Components/currencyswitch";


interface AnalyticsOptionprops {

}


const Analytics: React.FC<AnalyticsOptionprops> = () => {

    const { theme, navigation } = useCustomHooks()
    const styles = style(theme)

    const [activeindexs, setActiveindex] = useState(0)

    return (

        <View style={{ flex: 1, paddingHorizontal: "2.5%" }} >

            <Flexcomponent justifyContent="space-between" style={{ marginTop: "1%" }} >
                <View style={{ width: "auto", paddingHorizontal: "7.5%", paddingVertical: "1.5%", backgroundColor: theme.tabactive, alignItems: "center", justifyContent: "center", borderRadius: borderradius * 3 }} >
                    <Text family="medium" color={theme.activetabtext} >All</Text>
                </View>

                <Currencyswitch
                    index={activeindexs}
                    onchangeindex={setActiveindex}
                />
            </Flexcomponent>

            <Card containerStyle={{ padding: 10, borderWidth: 1, borderColor: theme.background, }}>

                <View style={{ marginVertical: 5, backgroundColor: theme.card }}>

                    <Text color={theme.textNobel} family="regular" size="semimedium" >Open Interest :

                        <Text family="regular" size="semimedium"> $892.256 </Text>

                    </Text>


                    <Text color={theme.textNobel} family="regular" size="semimedium" style={{ marginTop: 10 }} >24 h Vol :

                        <Text family="regular" size="semimedium"> $892.256 </Text>

                    </Text>

                </View>

            </Card>

            <View style={{ width: "100%"}}>
                <Images
                    type="svg"
                    name="Graph"
                    resizeMode="contain"
                    width={"100%"}
                    height={"80%"}
                    style={{bottom:"9%"}}
                />

            </View>

        </View>
    )



}
export default Analytics