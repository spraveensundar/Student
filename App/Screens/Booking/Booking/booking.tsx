import React, { useCallback } from "react";
import { BackHandler, Pressable, View } from "react-native";
import styles from "./styles";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import Mainview from "../../../Components/mainview";
import Text from "../../../Components/text";
import { Button } from "../../../Components/Field";
import Images from "../../../Utilities/images";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes";
import { windowwidth } from "../../../Utilities/dimensions";
import { CommonActions, useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Booking'>;

const Booking: React.FC<Props> = ({ route }) => {

    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const { onTime } = route.params;


    const backAction = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Bottomtab" }],
            })
        );
        return true;
    }

    useFocusEffect(
        useCallback(() => {

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                ()=>backAction()
            );

            return () => backHandler.remove();
        }, [])
    )



    const onNext = () => {
        navigation.navigate("Bottomtab", { screen: "Orders", noBack: true,});
    }

    return (
        <Mainview isheader={true}
            horizontalpadding={0}
            headertitle="Booking"
            islefticon={false}
            rightfn={
                <Pressable
                    onPress={() => navigation.navigate('ContactUs', { title: 'Help' })}
                >
                    <Text family="bold" size="semimedium" color={theme.helpInfo}>Help ?</Text>
                </Pressable>
            }
            bottomContent={
                <View style={{ paddingHorizontal: "6%", marginBottom: "5%" }}>
                    <Button title="Order History" onPress={() => onNext()} />
                </View>
            }
            // onleftfn={() => backAction()}
        >
            <View style={{ alignItems: 'center', gap: 20 }}>
                <Images
                    type="svg"
                    name="Booking"
                    width="100%"
                    height={windowwidth * 0.75}
                />
                <Text
                    family="GRegular"
                    size="medium"
                    style={{ textAlign: 'center', paddingHorizontal: "15%", lineHeight: 18 }}
                >
                    Finding the best driver for you… your booking will be confirmed shortly.
                </Text>
            </View>
        </Mainview>
    )
}

export default Booking;