import React from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import styles from "./styles";
import { Button } from "../../../../Components/Field";
import { Pressable, ScrollView, View } from "react-native";
import Text from "../../../../Components/text";
import Images, { icons } from "../../../../Utilities/images";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import LinearGradient from "react-native-linear-gradient";
import VectorIcons from "../../../../Utilities/vectorIcons";
import { borderradius, windowwidth } from "../../../../Utilities/dimensions";
import { useGetMyDetailQuery } from "../../../../Common/redux/userHook";
import { copyToClipboard } from "../../../../Common/commonFunction";

const ReferEarn: React.FC = () => {



    const { data, isLoading, refetch } = useGetMyDetailQuery(undefined);
    
    
    
    const { theme, navigation } = useCustomHooks()
    const style = styles(theme);



    const userData = data?.data;


    return (
        <Mainview
            isheader={true}
            headertitle="Refer & Earn"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={{ paddingHorizontal: "6%", marginBottom: "5%" }}>
                    <Button title="Refer now" onPress={() => navigation.goBack()} />
                </View>}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}>

                <View style={{
                    marginTop: "5%", gap: 10
                }}>
                    <Text family="GMedium" size="semilarge">Refer and Earn Benifits</Text>
                    <Text family="GRegular" size="semimedium" style={{ lineHeight: 18 }}>Encourage users to invite friends to the platform
                        and reward them with trading bonuses
                        or wallet credits when their friends join and trade.
                    </Text>
                    <Images
                        type="image"
                        source={icons.Refferal}
                        style={{ width: "100%", height: WINDOW_HEIGHT * 0.25, marginTop: "5%" }}
                        resizeMode="stretch"
                    />

                    <Text size="semilarge" family="GMedium"  >Referral Link</Text>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={["#C86DD7", "#7A2BE2"]}
                        style={style.referal}
                    >
                        <View style={{ width: "90%" }}>
                            <Text
                                top={5}
                                size="semimedium"
                                family="GBold"
                                color="#fff"
                            >
                                {userData?.referralCode}
                            </Text>
                        </View>

                        <Pressable
                            style={{ width: "10%", alignItems: "flex-end" }}
                            onPress={()=>copyToClipboard(userData?.referralCode)}    
                        >
                            <VectorIcons
                                family="Ionicons"
                                name={"copy-outline"}
                                iconcolor={"#fff"}
                                size={windowwidth * 0.05}
                            />
                        </Pressable>
                    </LinearGradient>
                    <Text size="semilarge" family="GMedium" >How it works ?</Text>
                    <View style={{ backgroundColor: theme.card, borderRadius: 10, padding: 20, marginBottom: 20 }}>

                        {[
                            "Refer your friends with your Referral code",
                            "Your friends gets 100 Installing the app",
                            // "You get 1000 Go app and their first order",
                        ].map((t, index) => (
                            <View key={index} style={{ flexDirection: "row", gap: 5 }}>

                                <View style={{ width: 30, alignItems: "center" }}>

                                    <LinearGradient
                                        colors={['#AB75C7', '#A673C6', '#6958BB', '#514EB7']}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            borderRadius: 12,
                                            marginTop: 4,
                                        }}
                                    >
                                        {
                                            index < 3
                                                ?
                                                (<Text style={{ marginLeft: 9 }} color={theme.activetabtext}>{index + 1}</Text>)
                                                :
                                                <></>
                                        }
                                    </LinearGradient>
                                    {
                                    index < 2
                                    ?
                                    (
                                        <View
                                            style={{
                                                width: 2,
                                                height: 35,
                                                backgroundColor: "#AB75C7",
                                            }}
                                        />
                                    )
                                    :
                                    <></>
                                    }
                                </View>

                                <View style={{ flex: 1, marginTop: 8 }}>
                                    <Text family="GRegular" size="semimedium">{t}</Text>
                                </View>
                            </View>
                        ))}

                    </View>
                </View>
            </ScrollView>

        </Mainview>
    )
}

export default ReferEarn;