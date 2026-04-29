import React from "react"
import useCustomHooks from "../../Actions/Hooks/customhook"
import { View } from "react-native"
import Flexcomponent from "../../Components/flexcomponent"
import Images, { image } from "../../Utilities/images"
import { borderradius, RFvalue, windowwidth } from "../../Utilities/dimensions"
import { Button } from "../../Components/Field"
import { Colors, Fontsize } from "../../Utilities/uiasset"
import Text from "../../Components/text"
import VectorIcons from "../../Utilities/vectoricons"

interface Copyprofileprops {

}

const Copyprofile: React.FC<Copyprofileprops> = () => {
    const { theme } = useCustomHooks()
    return (
        <Flexcomponent alignItems="flex-start" paddingVertical={"1%"} >
            <View style={{ width: "30%", alignItems: "center" }} >
                <Images
                    type="image"
                    source={image.Man}
                    width={windowwidth * 0.2}
                    height={windowwidth * 0.2}
                />
                <Button
                    title="Follow"
                    textStyle={{ fontSize: Fontsize.small }}
                    style={{ backgroundColor: "#138808", marginTop: "5%", justifyContent: "center", alignItems: "center", paddingVertical: "5%", borderRadius: borderradius * 2, width: "100%" }}
                />
            </View>

            <View style={{ width: "70%", paddingLeft: "2%" }} >
                <Text size="medium" family="medium" >GreenX Traders</Text>
                <Text size="semimedium" color={theme.secondarytext} family="medium" >Registered 190 days 0 hours ago</Text>
                <Flexcomponent justifyContent="space-between" top={"2.5%"} >
                    <View style={{ paddingVertical: "3%", paddingHorizontal: "5%", width: "auto", alignItems: "center", justifyContent: "center", backgroundColor: theme.card, borderRadius: borderradius * 0.5 }} >
                        <Text fontSize={RFvalue(10)} >Stable</Text>
                    </View>

                    <View style={{ paddingVertical: "3%", paddingHorizontal: "5%", width: "auto", alignItems: "center", justifyContent: "center", backgroundColor: theme.card, borderRadius: borderradius * 0.5, }} >
                        <Text fontSize={RFvalue(10)} >High Profit</Text>
                    </View>

                    <View style={{ paddingVertical: "3%", paddingHorizontal: "5%", width: "auto", alignItems: "center", justifyContent: "center", backgroundColor: theme.card, borderRadius: borderradius * 0.5, }} >
                        <Text fontSize={RFvalue(10)} >Long Term Trader</Text>
                    </View>
                </Flexcomponent>

                <Flexcomponent justifyContent="flex-start" top={"2.5%"} >
                    <View style={{ width: windowwidth * 0.06, height: windowwidth * 0.06, backgroundColor: theme.tabactive, borderRadius: borderradius * 3, justifyContent: "center", alignItems: "center" }} >
                        <VectorIcons
                            family="FontAwesome"
                            iconcolor={theme.activetabtext}
                            name={"facebook"}
                            size={windowwidth * 0.035}
                        />
                    </View>

                    <View style={{ width: windowwidth * 0.06, height: windowwidth * 0.06, backgroundColor: theme.tabactive, borderRadius: borderradius * 3, justifyContent: "center", alignItems: "center", marginLeft: "2.5%" }} >
                        <VectorIcons
                            family="Entypo"
                            iconcolor={theme.activetabtext}
                            name={"linkedin"}
                            size={windowwidth * 0.0325}
                        />
                    </View>

                    <View style={{ width: windowwidth * 0.06, height: windowwidth * 0.06, backgroundColor: theme.tabactive, borderRadius: borderradius * 3, justifyContent: "center", alignItems: "center", marginLeft: "2.5%" }} >
                        <VectorIcons
                            family="FontAwesome6"
                            iconcolor={theme.activetabtext}
                            name={"x-twitter"}
                            size={windowwidth * 0.0325}
                        />
                    </View>
                </Flexcomponent>
            </View>

        </Flexcomponent>
    )

}

export default Copyprofile