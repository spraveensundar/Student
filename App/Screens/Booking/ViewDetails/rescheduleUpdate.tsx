import React from "react";
import Mainview from "../../../Components/mainview";
import { View } from "react-native";
import Images, { icons } from "../../../Utilities/images";
import Text from "../../../Components/text";
import { Button } from "../../../Components/Field";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { windowwidth } from "../../../Utilities/dimensions";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'RescheduleUpdate'>;

const RescheduleUpdate: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    return (
        <Mainview isheader={true}
            headertitle="Order details"
            bottomContent={
                <View style={{
                    gap: 20, paddingHorizontal: "6%", marginBottom: "5%"
                }}>
                    <Button title="Order Details" onPress={() => navigation.navigate('OrderDetails', { rescheduled: true, fromScreen: "" })} />
                </View>
            }
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Images type="image"
                    source={icons.Reschedule}
                    style={{ width: "60%", height: "40%" }}
                />
                <Text family="bold" size="medium" style={{ width: windowwidth * 0.7, textAlign: 'center' }}>Your Rescheduled are
                    updated successfully !</Text>
            </View>
        </Mainview>
    )
}

export default RescheduleUpdate;