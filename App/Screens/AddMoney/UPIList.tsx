import Mainview from "../../Components/mainview";
import { windowheight, windowwidth } from "../../Utilities/dimensions"
import useCustomHooks from "../../Actions/Hooks/customhook"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Card from "../../Components/Card";
import Flexcomponent from "../../Components/flexcomponent";
import Text from "../../Components/text";
import Images, { icons } from "../../Utilities/images";
import { Colors, Fontfamily } from "../../Utilities/uiasset";
import VectorIcons from "../../Utilities/vectoricons";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'UPIList'>;


const UPIList: React.FC<Props> = () => {

    const { theme, navigation } = useCustomHooks()

    const DATA = [
        { id: "1", bankname: "Phonepay", upiID: "9856425@ybl", },
        { id: "2", bankname: "Gpay", upiID: "9856425@ybl" },
    ];

    return (
        <Mainview
            onleftfn={() => navigation.goBack()}
            headertitle="UPI"
            isscollable={false} >

            <View style={{ height: windowheight * 0.9, width: "auto", justifyContent: "flex-start", backgroundColor: theme.background }}>

                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    renderItem={({ item }) => (

                        <Card containerStyle={{ height: "auto", justifyContent: "center", alignItems: "center", marginVertical: 10, padding: 10, width: "100%", borderRadius: 10 }}>

                            <View style={{ width: "100%" }}>

                                <Flexcomponent justifyContent="space-between" alignItems="center" paddingVertical={8}>
                                    <Images
                                        type="image"
                                        name="Phonepay"
                                        source={icons.Phonepay}
                                        width={35}
                                        height={35}
                                    />
                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                        <Text
                                            family="semiBold"
                                            size="semimedium" >{item.upiID}</Text>

                                        <Text
                                            family="regular"
                                            size="small"
                                            style={{ marginTop: 1 }}>{item.bankname}</Text>
                                    </View>

                                    <VectorIcons
                                        family="MaterialDesignIcons"
                                        name={"chevron-right"}
                                        size={windowwidth * 0.08}
                                        iconcolor={theme.rightArrow}
                                    />
                                </Flexcomponent>

                            </View>

                        </Card>
                    )}
                />

            </View>
            <View style={styles.bottomView}>

                <Pressable onPress={() => navigation.navigate('AddUPIDetails')} style={{ backgroundColor: Colors.btnBgGreen, alignItems: "center", borderRadius: 10, width: "100%", marginRight: 10, minHeight: 40, }}>
                    <Text style={styles.btntxtStyle}>Add New UPI Id</Text>
                </Pressable>

            </View>


        </Mainview >
    )

}

const styles = StyleSheet.create({
    bottomView: {
        width: "100%",
        justifyContent: "center",
        bottom: 0,
        position: "absolute",
    },
    btntxtStyle: {
        color: Colors.textWhite,
        fontFamily: Fontfamily.semiBold,
        padding: 12,
    },
    item: {

    }
})

export default UPIList;