import React from "react"
import Card from "../../Components/Card"
import { borderradius, RFvalue, windowwidth } from "../../Utilities/dimensions"
import useCustomHooks from "../../Actions/Hooks/customhook"
import Flexcomponent from "../../Components/flexcomponent"
import Images, { image } from "../../Utilities/images"
import { Pressable, View } from "react-native"
import Text from "../../Components/text"
import VectorIcons from "../../Utilities/vectoricons"
import { Button } from "../../Components/Field"
import { Colors } from "../../Utilities/uiasset"
import { colors } from "react-native-keyboard-controller/lib/typescript/components/KeyboardToolbar/colors"

interface Tradecomponentprops {
    iswishlist: boolean
}

const Tradecomponent: React.FC<Tradecomponentprops> = ({
    iswishlist = false
}) => {
    const { theme, navigation } = useCustomHooks()
    return (
        <Pressable onPress={() => navigation.navigate("Tradedetail")} >
            <Card containerStyle={{ padding: "5%", borderRadius: borderradius * 0.5, marginVertical: "2.5%" }}  >
                <Flexcomponent >
                    <View style={{ width: "20%" }} >
                        <Images
                            type="image"
                            source={image.Man}
                            style={{ width: windowwidth * 0.15, height: windowwidth * 0.15 }}
                        />
                    </View>
                    <View style={{ width: "70%", paddingHorizontal: windowwidth * 0.025 }} >
                        <Flexcomponent justifyContent="flex-start" >
                            <Text>GreenX Trade</Text>
                            <Images
                                type="svg"
                                name="Crown"
                                width={windowwidth * 0.045}
                                height={windowwidth * 0.045}
                                style={{ marginLeft: "2.5%" }}
                            />
                        </Flexcomponent>
                        <Text top={"1%"} fontSize={RFvalue(11)} color="#9E9E9E" >Registered 138 days 22 hours ago</Text>
                        <Flexcomponent justifyContent="flex-start" >
                            <Images
                                type="svg"
                                name="Members"
                                width={windowwidth * 0.045}
                                height={windowwidth * 0.045}
                            />
                            <Text top={"1%"} left={"2.5%"} fontSize={RFvalue(11)}  >4</Text>
                        </Flexcomponent>

                    </View>

                    <View style={{ width: "10%" }} >
                        {iswishlist ?
                            <Images
                                type="svg"
                                name="Heart"
                                width={windowwidth * 0.065}
                                height={windowwidth * 0.065}
                            /> :
                            <VectorIcons
                                name={"heart-outline"}
                                family="Ionicons"
                                iconcolor={theme.futuretext}
                                size={windowwidth * 0.065}
                            />}
                    </View>
                </Flexcomponent>

                <Card containerStyle={{ padding: "5%", backgroundColor: theme.theme === "dark" ? "#24272C" : Colors.white, marginTop: "5%" }} >
                    <Flexcomponent justifyContent="space-between"  >
                        <View style={{ width: "45%" }} >
                            <Text>712111.94 INR</Text>
                            <Text color={theme.secondarytext} size="small" >Total PnL</Text>
                        </View>

                        <View style={{ width: "45%", alignItems: "flex-end" }} >
                            <Text>712111.94 INR</Text>
                            <Text color={theme.secondarytext} size="small" >1559330.2158</Text>
                        </View>
                    </Flexcomponent>


                    <Flexcomponent justifyContent="space-between" top={"7.5%"}  >
                        <View style={{ width: "45%" }} >
                            <Text>40.11 INR</Text>
                            <Text color={theme.secondarytext} size="small" >AUM</Text>
                        </View>

                        <View style={{ width: "45%", alignItems: "flex-end" }} >
                            <Text>712111.94 INR</Text>
                            <Text color={theme.secondarytext} size="small" >Copy Trader’s PnL</Text>
                        </View>
                    </Flexcomponent>

                </Card>

                <Button
                    title="Copy"
                    onPress={() => navigation.navigate("Tradepairs")}
                    style={{ width: "45%", backgroundColor: Colors.green, marginTop: "5%", borderRadius: borderradius * 0.5, alignItems: "center", justifyContent: "center", paddingVertical: "2.5%" }}
                />
            </Card>
        </Pressable>
    )

}

export default Tradecomponent