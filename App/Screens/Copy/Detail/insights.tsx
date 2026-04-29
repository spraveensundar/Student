import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import LinearGradient from "react-native-linear-gradient"
import { borderradius, RFvalue, windowheight, windowwidth } from "../../../Utilities/dimensions"
import Text from "../../../Components/text"
import { Colors, Fontsize } from "../../../Utilities/uiasset"
import Flexcomponent from "../../../Components/flexcomponent"
import Card from "../../../Components/Card"
import VectorIcons from "../../../Utilities/vectoricons"
import Linecomponent from "../../../Components/line"

interface Insightsprops {

}

const Insights: React.FC<Insightsprops> = () => {
    const { theme } = useCustomHooks()

    interface Buttonprops {
        colors?: any[],
        title: string,
        des: string,
        style?: StyleProp<ViewStyle>
    }

    const Button = ({ colors = ["#4A95F3", "#0053BA"], title, des, style }: Buttonprops,) => {
        return (
            <LinearGradient
                colors={colors}
                style={[{ width: "46%", height: windowheight * 0.1, justifyContent: "center", alignItems: "center", borderRadius: borderradius * 0.5 }, style]}
            >
                <Text color={Colors.white} >{title}</Text>
                <Text family="regular" color={theme.secondarytext} fontSize={RFvalue(13)} >{des}</Text>
            </LinearGradient>
        )
    }
    return (
        <View style={{ flex: 1 }}  >
            <Flexcomponent style={{ flexWrap: "wrap" }} justifyContent="space-between" top={"5%"} >
                <Button
                    title="+1510.77 %"
                    des="Trade Start Date"
                />

                <Button
                    title="485632"
                    des="Followers"
                    colors={["#FFAC3C", "#D85348"]}
                />

                <Button
                    title="28675.17 USDT"
                    des="Total Pnl"
                    colors={["#7F52E1", "#4300D4"]}
                    style={{ marginTop: "10%" }}
                />

                <Button
                    title="485632"
                    des="Total AUM"
                    colors={["#4AE2F3", "#00555E"]}
                    style={{ marginTop: "10%" }}
                />
            </Flexcomponent>

            <Card containerStyle={{ borderRadius: borderradius * 0.5, padding: "5%" }} >
                <Flexcomponent justifyContent="space-between" >
                    <Text family="semiBold" >Performance</Text>

                    <Flexcomponent paddingHorizontal={"2.5%"} width={"27.5%"} justifyContent="space-between" style={{ borderRadius: borderradius * 0.5 }} bakgroundcolor={theme.theme === "dark" ? "#1A1C1F" : Colors.white} paddingVertical={"2%"} >
                        <Text size="small" family="regular" >Last 7D</Text>

                        <VectorIcons
                            name={"chevron-down"}
                            family="Ionicons"
                            size={windowwidth * 0.03}
                            style={{ marginLeft: "10%" }}
                        />
                    </Flexcomponent>

                </Flexcomponent>
                <Linecomponent backgroundcolor={Colors.darkgray} containerstyle={{ marginTop: "5%" }} />

                <View style={{ backgroundColor: theme.theme === "dark" ? "#1A1C1F" : Colors.white, marginTop: "5%", paddingHorizontal: "2.5%", paddingVertical: "4%", borderRadius: borderradius * 0.5 }}  >
                    <Flexcomponent justifyContent="space-between" >
                        <Text size="semimedium" >+ 1212.23 %</Text>
                        <Text size="semimedium" >13702348.25 USDT</Text>
                    </Flexcomponent>

                    <Flexcomponent top={"2.5%"} justifyContent="space-between" >
                        <Text color={theme.secondarytext} size="small" >- ROI</Text>
                        <Text color={theme.secondarytext} size="small" >13702348.25 USDT</Text>
                    </Flexcomponent>
                </View>
                <Flexcomponent justifyContent="space-between" top={"5%"} >
                    <Text color={theme.secondarytext} size="small" >Win Rate</Text>
                    <Text size="small" >100.00 %</Text>
                </Flexcomponent>

                <Flexcomponent justifyContent="space-between" top={"5%"} >
                    <Text color={theme.secondarytext} size="small" >Loss Rate</Text>
                    <Text size="small" >0.00 %</Text>
                </Flexcomponent>

                <Flexcomponent justifyContent="space-between" top={"5%"} >
                    <Text color={theme.secondarytext} size="small" >Total Followers</Text>
                    <Text size="small" >4512124</Text>
                </Flexcomponent>

                <Flexcomponent justifyContent="space-between" top={"5%"} >
                    <Text color={theme.secondarytext} size="small" >Followers PnL’s</Text>
                    <Text color="#E54307" size="small" >0.00 USDT</Text>
                </Flexcomponent>

                <Flexcomponent top={"5%"} width={"100%"} >
                    <View style={{ height: 5, width: "80%", backgroundColor: Colors.green, borderTopLeftRadius: borderradius * 3, borderBottomLeftRadius: borderradius * 3 }} />
                    <View style={{ height: 5, width: "20%", backgroundColor: Colors.orange, borderTopRightRadius: borderradius * 3, borderBottomRightRadius: borderradius * 3 }} />
                </Flexcomponent>

                <Flexcomponent top={"5%"} justifyContent="space-between" >
                    <Text size="small" >Profitable Trade : <Text color={Colors.green} size="small" >12</Text></Text>
                    <Text size="small" >losing Trade : <Text color={Colors.orange} size="small" >1</Text></Text>
                </Flexcomponent>
            </Card>



        </View>
    )

}

export default Insights