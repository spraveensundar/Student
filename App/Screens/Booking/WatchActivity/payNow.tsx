import React, { useCallback } from "react";
import Mainview from "../../../Components/mainview";
import { BackHandler, Pressable, View } from "react-native";
import VectorIcons from "../../../Utilities/vectorIcons";
import Lottie from "../../../Components/lottieview";
import { lotties } from "../../../Utilities/images";
import Text from "../../../Components/text";
import { Button } from "../../../Components/Field";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import styles from "./styles";
import { CommonActions, useFocusEffect } from "@react-navigation/native";

const PayNow: React.FC = () => {

    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                () => goBackFn()
            );

            return () => backHandler.remove();
        }, [])
    )

    const goBackFn = () => {
        navigation.goBack()
        return true;
    }

    return (
        <Mainview isheader={true}
            headertitle="Payment"
            islefticon={false}
            rightfn={
                <Pressable>
                    <VectorIcons
                        family="Ionicons"
                        name="arrow-redo"
                    />
                </Pressable>
            }
            bottomContent={
                <View style={{
                    gap: 20, paddingHorizontal: "6%", marginBottom: "5%"
                }}>
                    <Button title="Order History" onPress={() => navigation.navigate("Bottomtab", { screen: "Orders", noBack: true,})} />

                    <Button title="Go back" onPress={() => goBackFn()} />
                </View>
            }
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Lottie
                    src={lotties.Tick}
                    style={{ width: "50%", height: "30%" }}
                    speed={0.5}
                />
                <Text family="bold" size="medium">Your Addon payment was successfully !</Text>
            </View>
        </Mainview>
    )
}

export default PayNow;