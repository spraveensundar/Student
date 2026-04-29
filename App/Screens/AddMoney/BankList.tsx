import Mainview from "../../Components/mainview";
import { RFvalue, windowheight, windowwidth } from "../../Utilities/dimensions"
import useCustomHooks from "../../Actions/Hooks/customhook"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Flexcomponent from "../../Components/flexcomponent";
import Text from "../../Components/text";
import { Colors, Fontfamily } from "../../Utilities/uiasset";
import { FlatList } from "react-native-gesture-handler";
import Images from "../../Utilities/images";
import Card from "../../Components/Card";
import { Button } from "../../Components/Field";
import VectorIcons from "../../Utilities/vectoricons";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'BankList'>;

const BankList: React.FC<Props> = () => {

    const { theme, navigation } = useCustomHooks()

    const DATA = [
        { id: "1", beneficiary: "Kumar", bankname: "KVB", accNumber: "123456789", accName: "Kumar", ifsc: "KVBL14785" },
        // { id: "2", beneficiary: "Kumar", bankname: "HDFC", accNumber: "123456789", accName: "Kumar", ifsc: "HDFC14785" },
        // { id: "3", beneficiary: "Kumar", bankname: "IOB", accNumber: "123456789", accName: "Kumar", ifsc: "KVBL14785" },
    ];

    const [selected, setSelected] = useState<string>("1");

    const handleChange = (accountId: any) => {
        if (selected === accountId) {
            setSelected("");
        } else {
            setSelected(accountId);
        }
    }

    return (
        <Mainview
            onleftfn={() => navigation.goBack()}
            headertitle="Bank Details"
            isscollable={false}
            righticon={

                <Pressable onPress={() => navigation.navigate('AddBankDetail')} hitSlop={10}>
                    <VectorIcons
                        family="Ionicons"
                        name={"add"}
                    />
                </Pressable>

            }>

            <View style={{ height: windowheight * 0.8, width: "auto", justifyContent: "flex-start", backgroundColor: theme.background }}>

                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}
                    renderItem={({ item }) => {
                        const selectedAccount = item.id === selected
                        return (
                            <Card containerStyle={{ height: "auto", justifyContent: "center", alignItems: "center", marginVertical: 10, padding: 10, width: "100%" }}>

                                <View style={{ position: "absolute", top: 12, right: 12, zIndex: 1000 }}>
                                    <Pressable onPress={() => handleChange(item.id)} style={[selectedAccount && { backgroundColor: Colors.lightgreen }, { width: windowwidth * 0.055, height: windowwidth * 0.055, alignItems: "center", justifyContent: "center", borderRadius: 20, borderWidth: 2, borderColor: Colors.lightgreen }]}>
                                        {
                                            selectedAccount && (
                                                <VectorIcons
                                                    family="Feather"
                                                    name="check"
                                                    iconcolor={Colors.darkgray}
                                                    size={windowwidth*0.04}
                                                />
                                            )
                                        }
                                    </Pressable>
                                </View>

                                <View style={{ width: "100%" }}>

                                    <Flexcomponent justifyContent="space-between" alignItems="center" paddingVertical={8}>
                                        <View style={{ flex: 1, marginLeft: 10 }}>
                                            <Text
                                                family="regular"
                                                size="semimedium"
                                                style={{ color: Colors.grey }}>Bank Name</Text>

                                            <Text style={{ marginTop: 8 }}>{item.beneficiary}</Text>
                                        </View>


                                    </Flexcomponent>

                                    <Flexcomponent justifyContent="space-between" alignItems="center" paddingVertical={8}>
                                        <View style={{ flex: 1, marginLeft: 10 }}>
                                            <Text
                                                family="regular"
                                                size="semimedium"
                                                style={{ color: Colors.grey }}>Account Number</Text>

                                            <Text
                                                family="regular"
                                                style={{ marginTop: 8 }}>{item.accNumber}</Text>
                                        </View>

                                    </Flexcomponent>

                                    <Flexcomponent justifyContent="space-between" alignItems="center" paddingVertical={8}>
                                        <View style={{ flex: 1, marginLeft: 10 }}>
                                            <Text
                                                family="regular"
                                                size="semimedium"
                                                style={{ color: Colors.grey }}>IFSC / SWIFT / BIC / IBAN / BBAN Code</Text>

                                            <Text
                                                family="regular"
                                                style={{ marginTop: 8 }}>{item.ifsc}</Text>
                                        </View>
                                    </Flexcomponent>

                                    <Flexcomponent justifyContent="space-between" alignItems="center" paddingVertical={8}>
                                        <View style={{ flex: 1, marginLeft: 10 }}>
                                            <Text
                                                family="regular"
                                                style={{ color: Colors.grey }}>{item.accName}</Text>

                                            <Text
                                                family="regular"
                                                style={{ marginTop: 8 }}>Test</Text>
                                        </View>

                                    </Flexcomponent>
                                </View>

                            </Card>
                        )
                    }}
                />

            </View>
            <View style={styles.bottomView}>

                {
                    selected && (
                        <Button
                            title="Withdraw"
                            onPress={() => navigation.navigate("Withdraw")}
                        />
                    )
                }

            </View>
        </Mainview>
    )
}

const styles = StyleSheet.create({
    bottomView: {
        width: "100%",
        justifyContent: "center",
        bottom: "2%",
        position: "absolute",
    },
    btntxtStyle: {
        color: Colors.textWhite,
        fontFamily: Fontfamily.semiBold,
        padding: 12,
        fontSize: RFvalue(11)
    },
    item: {

    }
})

export default BankList