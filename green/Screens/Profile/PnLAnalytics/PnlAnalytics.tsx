import useCustomHooks from "../../../Actions/Hooks/customhook"
import React, { useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";
import Mainview from "../../../Components/mainview";
import { Pressable, View } from "react-native";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import Images, { image } from "../../../Utilities/images";
import Card from "../../../Components/Card";
import Flexcomponent from "../../../Components/flexcomponent";
import Text from "../../../Components/text";
import { Colors } from "../../../Utilities/uiasset";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'PnlAnalytics'>;

const PnlAnalytics: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks()

    return (
        <Mainview
            onleftfn={() => navigation.goBack()}
            headertitle="PnL Analytics"
            righticon={
                <Pressable onPress={()=> navigation.navigate('Currency')} style={{ justifyContent: "flex-end" }}>
                    <Images
                        type="svg"
                        name="Dollerbag"
                        width={windowwidth*0.065}
                        height={windowwidth*0.065}
                    />
                </Pressable>
            }
            isheader={true} >

            <View style={{ height: windowheight * 0.9, width: "auto", justifyContent: "flex-start", backgroundColor: theme.background }}>
                <Card containerStyle={{ padding: 10, borderWidth: 1, borderColor: theme.background,marginTop:10 }}>

                    <View style={{ marginVertical: 5, backgroundColor: theme.card }}>

                        <Text color={theme.textNobel} family="regular" size="semimedium" >Open Interest :

                            <Text family="regular" size="semimedium"> $892.256 </Text>

                        </Text>


                        <Text color={theme.textNobel} family="regular" size="semimedium" style={{ marginTop: 10 }} >24 h Vol :

                            <Text family="regular" size="semimedium"> $892.256 </Text>

                        </Text>

                    </View>

                </Card>

                <View style={{width:"100%"}}>
                    <Images
                        type="svg"
                        name="Graph"
                        resizeMode="contain"
                        width={"100%"}
                        height={"80%"}
                    />

                </View>

            </View>
        </Mainview>

    )

}
export default PnlAnalytics