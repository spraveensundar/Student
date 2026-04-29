import React from "react";
import { ImageBackground, Pressable, View } from "react-native";
import styles from "./styles";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Images, { icons } from "../../Utilities/images";
import { windowwidth } from "../../Utilities/dimensions";
import Text from "../../Components/text";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "@d11/react-native-fast-image";
import { getItem } from "../../Common/localStorage";

const PremiumPlan: React.FC = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const isUser = getItem('user');

    const features = [
        "Interior Wet Cleaning",
        "Deep Wash & Cleaning",
        "Deep Stratifications",
        "Prevention Vehicle Finish",
        "Regular Cleaning",
    ];

    const servicePlans = [
        { months: "1 month", price: 899, discount: 5, label: "Quick Shine", colors: ['#00634D', '#00AF87'], border: theme.green2, bg: theme.green3, textColor: theme.green2 },
        { months: "6 month", price: 2697, discount: 10, label: "Quick Shine", colors: ['#16C1FF', '#004963'], border: theme.skyblue, bg: theme.skyblue1, textColor: theme.skyblue },
        { months: "3 month", price: 5394, discount: 30, label: "Quick Shine", colors: ['#6510FF', '#33008F'], border: theme.purple, bg: theme.purple1, textColor: theme.purple },
    ];

    return (
        <View style={{ gap: 10, marginVertical: 20 }}>
            <ImageBackground
                source={icons.PremiumPlan}
                borderRadius={28}
                resizeMode="cover"
                style={[style.card, { height: windowwidth * 0.35, overflow: 'hidden' }]}
            >
                <View style={style.content}>
                    <View style={[style.premLg, { backgroundColor: "#D3F3FF" }]}>
                        <Images type="image" source={icons.PrmPlan} style={style.image} />
                    </View>
                    <Text family="GBold" size="large" style={{ color: 'white', textAlign: 'left' }}>
                        Premium Plan
                    </Text>
                    <LinearGradient
                        colors={['#D69432', '#F5E78A']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            paddingHorizontal: 12,
                            paddingVertical: 8,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            borderBottomRightRadius: 25,
                        }}
                    >
                        <Text family="GMedium" size="medium">Most Favorite</Text>
                    </LinearGradient>
                </View>
            </ImageBackground>

            <View style={{ gap: 20 }}>
                <Text family="bold" size="medium">Premium Plan Cleaning Service</Text>
                <View style={style.stdCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text family="GMedium" size="medium">Car Interior Spa</Text>
                        <View style={style.rating}>
                            <Images type="image" source={icons.Ratings} style={{ width: windowwidth * 0.03, height: windowwidth * 0.06, marginBottom: 2 }} />
                            <Text family="GRegular" size="semimedium" style={{ color: 'white' }}>4.5</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ gap: 8 }}>
                            {features.map((item, i) => (
                                <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text size="extralarge" style={{ lineHeight: 18, marginRight: 6 }}>{'\u2022'}</Text>
                                    <Text family="GRegular" size="semimedium">{item}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={{ gap: 10, alignItems: 'center' }}>
                            <FastImage
                                source={icons.CarSpa}
                                style={{ width: windowwidth * 0.34, height: windowwidth * 0.25, borderRadius: 10, overflow: 'hidden', }}
                            />
                            <Pressable style={style.tag} onPress={() => navigation.navigate("CleaningServiceDetails")}>
                                <Text family="GRegular" size="semimedium" style={{ color: 'white', textAlign: 'center' }}>View details</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: "5%" }}>
                        {servicePlans.map((plan, index) => (
                            <Pressable key={index} onPress={() => isUser === '0' ? navigation.navigate('Login', { redirectTo: 'TimeSlot' }) : navigation.navigate('TimeSlot')}
                                style={{ borderColor: plan.border, borderWidth: 1, borderRadius: 10, backgroundColor: plan.border }}>
                                <View style={{ ...style.servicePlan, borderColor: plan.border, backgroundColor: plan.bg }}>
                                    <View style={style.month}>
                                        <LinearGradient
                                            colors={plan.colors}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={style.month}
                                        >
                                            <Text family="GMedium" size="semismall" style={{ color: 'white' }}>{plan.months}</Text>
                                        </LinearGradient>
                                    </View>
                                    <View style={{ gap: 4, alignItems: 'center' }}>
                                        <Text family="bold" size="extralarge">₹ {plan?.discount ? plan.price - Math.round(plan.price * (plan.discount / 100)) : plan.price}</Text>
                                        {plan?.discount &&
                                            <>
                                                <Text family="GMedium" size="small" style={{ textAlign: 'center', color: plan.textColor }}>{`Save ${plan.discount}%`}</Text>
                                                <Text family="GMedium" size="xmedium" style={{ textAlign: 'center', textDecorationLine: 'line-through', color: plan.textColor }}>{`₹${plan.price}`}</Text>
                                            </>
                                        }
                                    </View>
                                </View>
                                <View style={{ backgroundColor: plan.border, padding: 5, borderRadius: 10, alignItems: 'center' }}>
                                    <Text family="GMedium" size="semismall" style={{ color: 'white' }}>Book Service</Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
}

export default PremiumPlan;