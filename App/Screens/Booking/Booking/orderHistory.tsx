import React, { useCallback } from "react";
import { BackHandler, Pressable, View } from "react-native";
import styles from "./styles";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import Flexcomponent from "../../../Components/flexcomponent";
import Images, { icons } from "../../../Utilities/images";
import { windowwidth } from "../../../Utilities/dimensions";
import Text from "../../../Components/text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes";
import { Colors } from "../../../Utilities/uiasset";
import { CommonActions, useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'OrderHistory'>;

const OrderHistory: React.FC<Props> = ({ route }) => {

    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const { onTime } = route.params;


    useFocusEffect(
        useCallback(() => {

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                () => goBackFunction()
            );

            return () => backHandler.remove();
        }, [])
    )

    const goBackFunction = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Bottomtab" }],
            })
        );
        return true;
    }

    return (
        <Mainview isheader={true}
            headertitle="Order History"
            onleftfn={() => goBackFunction()}
        >
            <View style={[style.container]}>
                <Flexcomponent justifyContent='space-between'>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Images type="image" source={icons.Swift}
                            style={{ width: windowwidth * 0.2, height: windowwidth * 0.2, }} />
                        <View>
                            <Text family="GBold" size="medium">Maruti Suzuki Swift</Text>
                            <Text family="GRegular" size="medium">TN55BV4646</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: theme.btnTag, borderRadius: 5, paddingHorizontal: 15, paddingVertical: 5 }}>
                        <Text family="GBold" size="semimedium" color={theme.activetabtext}>Active</Text>
                    </View>
                </Flexcomponent>
                {!onTime && (
                    <Flexcomponent style={{ borderRadius: 10 }} justifyContent='space-between' paddingHorizontal='10' bakgroundcolor={theme.cardBg}>
                        <View>
                            <Text family="GRegular" size="semimedium">Start Date</Text>
                            <Text family="GMedium" size="medium">Oct 9, 2025</Text>
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text family="GRegular" size="semimedium">End Date</Text>
                            <Text family="GMedium" size="medium">Nov 9, 2025</Text>
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text family="GRegular" size="semimedium">Plan</Text>
                            <Text family="GMedium" size="medium">01 Months</Text>
                        </View>
                    </Flexcomponent>
                )}

                {/* {!onTime && (
                    <Flexcomponent justifyContent='space-between'>
                        <Pressable style={style.watchBtn} onPress={() => navigation.navigate('OrderActivity')}>
                            <Text family="GMedium" size="medium" color={theme.activetabtext}>Watch Activity</Text>
                        </Pressable>
                        <Pressable style={style.viewBtn}
                            onPress={() => navigation.navigate("OrderDetails", { onTime: false })}
                        >
                            <Text family="GMedium" size="medium">View details</Text>
                        </Pressable>
                    </Flexcomponent>
                )}
                {onTime && (
                    <Flexcomponent bakgroundcolor={theme.cardBg} style={{ borderRadius: 10 }} justifyContent='space-between' paddingHorizontal={20} paddingVertical={10} >
                        <View>
                            <Text family="GRegular" size="semimedium" color={Colors.gray}>Service</Text>
                            <Text family="GMedium" size="medium">Car Interior Spa</Text>
                        </View>
                        <Pressable style={style.viewBtn}
                            onPress={() => navigation.navigate("OrderDetails", { onTime: true })}
                        >
                            <Text family="GMedium" size="medium">View details</Text>
                        </Pressable>
                    </Flexcomponent>
                )} */}
            </View >
        </Mainview >
    )
}

export default OrderHistory;