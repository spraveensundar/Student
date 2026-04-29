import useCustomHooks from "../../Actions/Hooks/customhook"
import Mainview from "../../Components/mainview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import React from "react";
import { windowheight } from "../../Utilities/dimensions";
import { View } from "react-native";
import Images from "../../Utilities/images";
import Text from "../../Components/text";
import Flexcomponent from "../../Components/flexcomponent";
import { FlatList } from "react-native-gesture-handler";
import Card from "../../Components/Card";
import { Colors } from "../../Utilities/uiasset";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Notification'>;

const Notification: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks()

    const DATA = [
        { id: "1", title: "Earn 5% APY on your stablecoins", message: "Deposit stablecoins into your greenx - boost your finance with lower risk and higher than babk returns", date: "08/04/2025", utime: " 12:50:46" },
        { id: "2", title: "Earn 5% APY on your stablecoins", message: "Deposit stablecoins into your greenx - boost your finance with lower risk and higher than babk returns", date: "08/04/2025", utime: " 12:50:46" },
        { id: "3", title: "Earn 5% APY on your stablecoins", message: "Deposit stablecoins into your greenx - boost your finance with lower risk and higher than babk returns", date: "08/04/2025", utime: " 12:50:46" },
        { id: "4", title: "Earn 5% APY on your stablecoins", message: "Deposit stablecoins into your greenx - boost your finance with lower risk and higher than babk returns", date: "08/04/2025", utime: " 12:50:46" },
        { id: "5", title: "Earn 5% APY on your stablecoins", message: "Deposit stablecoins into your greenx - boost your finance with lower risk and higher than babk returns", date: "08/04/2025", utime: " 12:50:46" }
    ];

    return (
        <Mainview
            onleftfn={() => navigation.goBack()}
            headertitle="Notification"
            isscollable={false} >

            <View style={{ height: windowheight * 0.9, width: "auto", justifyContent: "flex-start", backgroundColor: theme.background }}>
                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    renderItem={({ item }) => (

                        <Card containerStyle={{ height: "auto", justifyContent: "center", alignItems: "center", marginVertical: 10, padding: 10, width: "100%" }}>

                            <View style={{ width: "100%" }}>

                                <Text
                                    family="semiBold"
                                    size="semimedium" 
                                    style={{color:theme.primarytext}}>{item.title}</Text>

                                <Text
                                    family="regular"
                                    size="semismall"
                                    style={{ marginTop: 8, lineHeight:18, color:Colors.graytext}}>{item.message}</Text>

                                <Text
                                    family="regular"
                                    size="semismall"
                                    style={{ color: Colors.green,marginTop:8 }}>{item.date} {item.utime}</Text>


                            </View>

                        </Card>
                    )}
                />
            </View>

        </Mainview>
    )
}
export default Notification;