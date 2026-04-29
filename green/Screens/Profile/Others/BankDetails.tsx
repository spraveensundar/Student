import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Text from "../../../Components/text";
import { Button } from "../../../Components/Field";
import Mainview from "../../../Components/mainview";
import { Colors } from "../../../Utilities/uiasset";
import useCustomHooks, { Commonalert, useApihooks } from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";
import VectorIcons from "../../../Utilities/vectoricons";
import { borderradius, windowwidth } from "../../../Utilities/dimensions";
import { authSelector, useLazyUserDetailsQuery } from "../../../Slices/auth";
import Card from "../../../Components/Card";
import Flexcomponent from "../../../Components/flexcomponent";
import { useDeletebankMutation } from "../../../Slices/wallet";
import { setBankparams } from "../../../Slices/helper";
import { useSelector } from "react-redux";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'BankDetails'>;

const BankDetails: React.FC<Props> = () => {
    const { theme, navigation, successtoast, dispatch } = useCustomHooks();
    const style = styles(theme);
    const { userData } = useSelector(authSelector)
    const accounts = userData?.bankAccounts
    console.log(accounts, "helpme");

    const [selected, setSelected] = useState(0);

    const handleChange = (index: number) => {
        setSelected(index)
    }
    const [deletebank] = useDeletebankMutation()
    const { triggeruserdetails } = useApihooks()
    const deletfn = async (item: any) => {
        const payload = {
            accountNo: item?.accountNo
        }
        const response = await deletebank(payload).unwrap()
        if (response.success) {
            triggeruserdetails()
            successtoast("Added!", "Bank detail added successfully")
        }
    }
    return (
        <Mainview
            isheader={true}
            isscollable={false}
            headertitle={"Bank Details"}
            onleftfn={() => navigation.goBack()}
            righticon={
                <VectorIcons
                    family="Entypo"
                    name={"plus"}
                    size={windowwidth * 0.075}
                />
            }
            isnodata={accounts?.length < 1}
            customnodata={
                <View style={style.container}>
                    <Text size="medium">Add Bank Details</Text>
                    <Text style={{ color: Colors.warmgrey, marginTop: "3%" }}>To ensure smooth withdrawals and comply with regulations, please verify your bank account.</Text>

                    <View style={style.bottomButton}>
                        <Button
                            title="Add"
                            onPress={() => {
                                const payload = {
                                    type: "add",
                                    value: ""
                                }
                                dispatch(setBankparams(payload))
                                navigation?.navigate("AddBankDetail")
                            }
                            }
                        />
                    </View>
                </View>
            }
            onrightfn={() => {
                const payload = {
                    type: "add",
                    value: ""
                }
                dispatch(setBankparams(payload))
                navigation?.navigate("AddBankDetail")
            }}
        >



            <FlatList
                data={accounts}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
                renderItem={({ item, index }) => {
                    const selectedAccount = item.id === selected
                    return (
                        <Card containerStyle={{ height: "auto", justifyContent: "center", alignItems: "center", marginVertical: 10, padding: 10, width: "100%" }}>

                            <View style={{ position: "absolute", top: 12, right: 12, zIndex: 1000 }}>
                                <Pressable onPress={() => handleChange(index)} style={[selectedAccount && { backgroundColor: theme.textinput }, { width: windowwidth * 0.05, height: windowwidth * 0.05, alignItems: "center", justifyContent: "center", borderRadius: 20, borderWidth: 2, borderColor: theme.textinput }]}>
                                    {
                                        selectedAccount && (
                                            <VectorIcons
                                                family="Feather"
                                                name="check"
                                                iconcolor={Colors.darkgray}
                                                size={windowwidth * 0.04}
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

                                        <Text style={{ marginTop: 8 }}>{item?.bankName}</Text>
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
                                            style={{ marginTop: 8 }}>{item?.accountNo}</Text>
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
                                            style={{ marginTop: 8 }}>{item?.bankcode}</Text>
                                    </View>
                                </Flexcomponent>

                                <Flexcomponent justifyContent="space-between" alignItems="center" paddingVertical={8}>
                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                        <Text
                                            family="regular"
                                            size="semimedium"
                                            style={{ color: Colors.grey }}>Holder Name</Text>

                                        <Text
                                            family="regular"
                                            style={{ marginTop: 8 }}>{item?.holderName}</Text>
                                    </View>

                                </Flexcomponent>
                            </View>
                            <Flexcomponent width={"27.5%"} justifyContent="space-between" style={{ alignSelf: "flex-end" }} >
                                <Pressable onPress={() => {
                                    const payload = {
                                        type: "edit",
                                        value: item
                                    }
                                    dispatch(setBankparams(payload))
                                    navigation?.navigate("AddBankDetail")
                                }} style={{ backgroundColor: theme.background, width: windowwidth * 0.1, height: windowwidth * 0.1, borderRadius: borderradius * 3, justifyContent: "center", alignItems: "center" }} >
                                    <VectorIcons
                                        family="AntDesign"
                                        name={"edit"}
                                        size={windowwidth * 0.05}
                                        iconcolor={theme.activetab}
                                    />
                                </Pressable>

                                <Pressable onPress={() => Commonalert({
                                    title: "Alert!",
                                    des: "Are you sure want to delete this account",
                                    yes: () => deletfn(item)
                                })} style={{ backgroundColor: theme.background, width: windowwidth * 0.1, height: windowwidth * 0.1, borderRadius: borderradius * 3, justifyContent: "center", alignItems: "center" }} >
                                    <VectorIcons
                                        family="AntDesign"
                                        name={"delete"}
                                        size={windowwidth * 0.05}
                                        iconcolor={"red"}
                                    />
                                </Pressable>
                            </Flexcomponent>
                        </Card>
                    )
                }}
            />

        </Mainview>
    )

}

export default BankDetails;