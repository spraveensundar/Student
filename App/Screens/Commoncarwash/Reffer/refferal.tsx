import { Pressable, View } from "react-native"
import Mainview from "../../../Components/mainview"
import Text from "../../../Components/text"
import { borderradius, windowheight, windowwidth } from "../../../Utilities/dimensions"
import Images, { icons } from "../../../Utilities/images"
import LinearGradient from "react-native-linear-gradient"
import VectorIcons from "../../../Utilities/vectorIcons"
import Card from "../../../Components/Card"
import { Colors, Fontfamily, Fontsize } from "../../../Utilities/uiasset"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import { useSelector } from "react-redux"
import { authSelector } from "../../../Slices/auth"


const Refferal: React.FC = () => {
    const { theme } = useCustomHooks()
    const { serviceMan } = useSelector(authSelector);
    console.log(serviceMan,"SERVICEMAN");
    
    return (
        <Mainview
            isheader
            headertitle="Refer & Earn"
            bottomContent
            bottomtext="Refer now"

        >
            <Text size="semilarge" family="GMedium" top={"5%"}>Refer and Earn Benifits</Text>
            <Text size="medium" family="GRegular" top={"2.5%"}>Encourage users to invite friends to the platform and reward them with trading bonuses or wallet credits when their friends join and trade.</Text>
            <Images
                type="image"
                source={icons.referral}
                style={{ width: "100%", height: windowheight * 0.25, marginTop: "5%" }}
                resizeMode="stretch"
            />

            <Text size="semilarge" family="GMedium" top={"5%"}>Referral Link</Text>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#C86DD7", "#7A2BE2"]}
                style={{ flex: 1, paddingVertical: "3%", paddingHorizontal: "5%", borderRadius: borderradius * 0.5, flexDirection: "row", alignItems: "center", marginTop: "2.5%", marginBottom: "5%" }} >
                <View style={{ width: "90%", }} >
                    <Text top={5} size="semimedium" family="GBold" color="#fff" >{serviceMan?.referralCode}</Text>
                </View>
                <Pressable style={{ width: "10%", alignItems: "flex-end" }} >
                    <VectorIcons
                        family="Ionicons"
                        name={"copy-outline"}
                        iconcolor={"#fff"}
                        size={windowwidth * 0.05}
                    />
                </Pressable>
            </LinearGradient>

            <Text size="semilarge" family="GMedium" top={"2.5%"}>How it works ?</Text>
            <Card containerStyle={{ paddingHorizontal: "2.5%", marginBottom: 10, paddingBottom: "2.5%" }}>

                <View style={{ position: "relative", paddingLeft: 6, marginTop: 20 }}>

                    {/* Vertical Line */}
                    <View
                        style={{
                            position: "absolute",
                            left: 25,                // centers between left margin + icon
                            top: 20,
                            bottom: 20,
                            width: 2,
                            backgroundColor: "#AB75C7"
                        }}
                    />

                    {/* Step 1 */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
                        <LinearGradient
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 2,
                                borderColor: "#F3F3F3"
                            }}
                            colors={['#AB75C7', '#A673C6', '#A673C6', '#6958BB']}
                            start={{ x: 0.1, y: 1 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text
                                style={{
                                    color: theme.white,
                                    fontFamily: Fontfamily.medium,
                                    fontSize: Fontsize.semimedium,
                                    padding: 10
                                }}
                            >
                                1
                            </Text>
                        </LinearGradient>

                        <Text
                            style={{
                                marginLeft: 16,
                                fontSize: Fontsize.semimedium,
                                fontFamily: Fontfamily.GRegular,
                                color: "#12110D",
                                flex: 1,
                            }}
                        >
                            Refer your friends with your Referral code
                        </Text>
                    </View>

                    {/* Step 2 */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
                        <View>
                            <Text style={{ height: 8, width: 8, backgroundColor: "#AB75C7", transform: [{ rotate: "45deg" }], position: "relative", left: 16, bottom: -7 }}></Text>
                            <LinearGradient
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderWidth: 2,
                                    marginTop: 8,
                                    borderColor: "#F3F3F3"
                                }}
                                colors={['#AB75C7', '#A673C6', '#A673C6', '#6958BB']}
                                start={{ x: 0.1, y: 1 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text
                                    style={{
                                        color: theme.white,
                                        fontFamily: Fontfamily.medium,
                                        fontSize: Fontsize.semimedium,
                                        padding: 10
                                    }}
                                >
                                    2
                                </Text>
                            </LinearGradient>
                        </View>

                        <Text
                            style={{
                                marginLeft: 16,
                                fontSize: Fontsize.semimedium,
                                fontFamily: Fontfamily.GRegular,
                                color: "#12110D",
                                flex: 1,
                                marginTop: 15,
                            }}
                        >
                            Your friends get installing the app via your referral code
                        </Text>
                    </View>

                    {/* Step 3 */}



                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>

                        <View>
                            <Text style={{ height: 8, width: 8, backgroundColor: "#AB75C7", transform: [{ rotate: "45deg" }], position: "relative", left: 16, bottom: -7 }}></Text>
                            <LinearGradient
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderWidth: 2,
                                    marginTop: 8,
                                    borderColor: "#F3F3F3"
                                }}
                                colors={['#AB75C7', '#A673C6', '#A673C6', '#6958BB']}
                                start={{ x: 0.1, y: 1 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text
                                    style={{
                                        color: theme.white,
                                        fontFamily: Fontfamily.medium,
                                        fontSize: Fontsize.semimedium,
                                        padding: 10

                                    }}
                                >
                                    3
                                </Text>
                            </LinearGradient>
                        </View>

                        <Text
                            style={{
                                marginLeft: 16,
                                fontSize: Fontsize.semimedium,
                                fontFamily: Fontfamily.GRegular,
                                color: "#12110D",
                                flex: 1,
                                marginTop: 15,
                            }}
                        >
                            You get ₹100 once they install Go app and place their first order
                        </Text>
                    </View>

                </View>

            </Card>


        </Mainview>
    )

}

export default Refferal