import React from "react";
import Mainview from "../../Components/mainview";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { View, ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import Images, { icons } from "../../Utilities/images";
import Text from "../../Components/text";
import { windowwidth } from "../../Utilities/dimensions";
import { Button } from "../../Components/Field";
import VectorIcons from "../../Utilities/vectorIcons";

const Subscription: React.FC = () => {

    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    return (
        <Mainview
            isheader={true}
            headertitle="Daily Car Cleaning Service"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={{ paddingHorizontal: "6%", marginBottom: "5%" }}>
                    <LinearGradient
                        colors={['#1C5E3F', '#002F19']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={{
                            borderRadius: 30,
                        }}
                    >
                        <Button onPress={() => navigation.navigate('Premium')}
                            buttonStyle={{ backgroundColor: 'transparent' }}
                            title="View Plans"
                        />
                    </LinearGradient>
                </View>}
        >
            <View style={style.container}>
                <View style={style.card}>
                    <ImageBackground
                        source={icons.PrmCard}
                        borderRadius={28}
                        resizeMode="cover"
                        style={[style.card, { height: windowwidth * 0.5, }]}>
                        <View style={style.content}>
                            <View style={style.premLg}>
                                <Images
                                    type="image"
                                    source={icons.SPremium}
                                    style={style.image}
                                />
                            </View>
                            <Text family="GBold" size="semilarge" style={{ textAlign: 'left', color: 'white' }}>
                                Doorstep Car Wash Subscription
                            </Text>
                            <Text family="GRegular" size="xmedium" style={{ textAlign: 'left', color: 'white', lineHeight: 18 }} >
                                Keep your car shining all month long without lifting a finger!
                            </Text>
                        </View>
                    </ImageBackground>

                </View>
                <View style={{ gap: 4 }}>
                    <Text family="GMedium" size="semilarge" style={{ color: "#073921" }}>Exterior cleaning only.</Text>
                    <View style={style.text}>
                        <Text size="extralarge" style={{ marginRight: 6 }}>{'\u2022'}</Text>
                        <Text style={{ fontFamily: 'GRegular', fontSize: 14, flex: 1 }}>
                            Monthly Wash Plans — Choose what suits your schedule.
                        </Text>
                    </View>
                    <View style={style.text}>
                        <Text size="extralarge" style={{ marginRight: 6 }}>{'\u2022'}</Text>
                        <Text family="GRegular" size="semimedium">
                            Professional Cleaners — Verified and trained experts.
                        </Text>
                    </View>
                    <View style={style.text}>
                        <Text size="extralarge" style={{ marginRight: 6 }}>{'\u2022'}</Text>
                        <Text family="GRegular" size="semimedium">
                            Eco-Friendly Wash — Minimal water usage, premium cleaning products.
                        </Text>
                    </View>
                    <View style={style.text}>
                        <Text size="extralarge" style={{ marginRight: 6 }}>{'\u2022'}</Text>
                        <Text family="GRegular" size="semimedium">
                            Real-Time Tracking — Get updates when your car is being cleaned.
                        </Text>
                    </View>
                </View>
                <View style={{ gap: 4 }}>
                    <Text family="GMedium" size="semilarge" style={{ color: "#073921" }}>Subscription Benefits</Text>
                    <View style={style.text}>
                        <Text size="extralarge" style={{ marginRight: 6 }}>{'\u2022'}</Text>
                        <Text family="GRegular" size="semimedium">
                            Keep your car consistently clean and protected
                        </Text>
                    </View>
                    <View style={style.text}>
                        <Text size="extralarge" style={{ marginRight: 6 }}>{'\u2022'}</Text>
                        <Text family="GRegular" size="semimedium">
                            Support eco-conscious cleaning practices
                        </Text>
                    </View>
                    <View style={style.text}>
                        <Text size="extralarge" style={{ marginRight: 6 }}>{'\u2022'}</Text>
                        <Text family="GRegular" size="semimedium">
                            Get exclusive rewards & loyalty points on renewals
                        </Text>
                    </View>
                </View>
            </View >
        </Mainview >
    )
}

export default Subscription;