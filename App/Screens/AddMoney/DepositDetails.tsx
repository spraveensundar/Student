
import Mainview from "../../Components/mainview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { windowheight } from "../../Utilities/dimensions";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import Images, { icons } from "../../Utilities/images";
import { Colors, Fontfamily } from "../../Utilities/uiasset";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import React, { useEffect, useState } from "react";
import useCustomHooks, { useApihooks } from "../../Actions/Hooks/customhook";
import { Button, Dropdown, FileUpload, Input } from "../../Components/Field";
import Text from "../../Components/text";
import Card from "../../Components/Card";
import { colors } from "react-native-keyboard-controller/lib/typescript/components/KeyboardToolbar/colors";
import Flexcomponent from "../../Components/flexcomponent";
import VectorIcons from "../../Utilities/vectoricons";
import { useInternalfiatMutation, useLazyGetcurrencyQuery, walletSelector } from "../../Slices/wallet";
import useApiError from "../../Actions/Hooks/errorhook";
import { subAccountSelector, useLazySubAccountQuery } from "../../Slices/subAccount";
import { getMimeType } from "../../Utilities/helerfunction";
import { useSelector } from "react-redux";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'DepositDetails'>;

const DepositDetails: React.FC<Props> = () => {

    const { theme, navigation, failuretoast, successtoast } = useCustomHooks();
    const { triggeruserdetails } = useApihooks()
    useEffect(() => {
        triggeruserdetails()
    }, [])


    const { getcurrencies } = useSelector(walletSelector)

    const { subaccounts } = useSelector(subAccountSelector)

    const [frontImage, setFrontImage] = useState<any>(undefined);


    const renderItem = () => {
        return (
            <Card containerStyle={{ backgroundColor: theme.theme === "dark" ? "#16181A" : Colors.white, justifyContent: "center", alignItems: "center", paddingVertical: "20%", marginBottom: "5%", borderColor: "transparent" }}>
                <View style={{ alignItems: "center", backgroundColor: theme.theme === "dark" ? Colors.darkgray : theme.card, paddingHorizontal: "10%", flexDirection: "row", paddingVertical: "3%", borderRadius: 15 }}>
                    <VectorIcons
                        family="Entypo"
                        name={"upload-to-cloud"}
                    />
                    <Text size="semimedium">   Upload</Text>
                </View>
            </Card>
        )
    }

    const [internalfiat, { isLoading, error }] = useInternalfiatMutation()
    const [selectedaccount, setSelectedaccount] = useState<any>(subaccounts[0]?.accountId)
    const [transactionnumber, setTransactionnumber] = useState("")
    const [amount, setAmount] = useState("")
    const [currencyId, setCurrencyid] = useState(getcurrencies[0]?._id)

    useApiError(error)

    const continuefn = async () => {
        if (!selectedaccount) {
            failuretoast("Required!", "Preffered account  is required")
        }

        else if (!transactionnumber) {
            failuretoast("Required!", "Transactionnumber is required")
        }

        else if (!amount) {
            failuretoast("Required!", "Amount is required")
        }
        else if (!frontImage) {
            failuretoast("Failure!", "Receipt is requried")
        }

        else if (!currencyId) {
            failuretoast("Failure!", "Preffered currency is requried")
        }
        else {
            const formData = new FormData();
            formData.append("attachment", {
                uri: frontImage?.uri,
                name: frontImage?.fileName,
                type: getMimeType(frontImage?.fileName),
            } as any);
            formData.append("accountId", selectedaccount)
            formData.append("amount", amount)
            formData.append("transactionNumber", transactionnumber)
            formData.append("currencyId", currencyId)
            const res = await internalfiat(formData).unwrap()
            console.log("internalfiatreesponse", res);
            if (res?.success) {
                navigation?.pop(2)
                successtoast("Success!", "Your request has been successfully sent to greenex ")
            }
        }

    }


    return (
        <Mainview
            onleftfn={() => navigation.goBack()}
            headertitle={"Deposit Account"}
            isscollable={true}
            bottomContent={
                <View style={{ marginHorizontal: "6%" }}>
                    <Button
                        loading={isLoading}
                        title="Continue" buttonStyle={{ marginBottom: "5%", marginTop: "2%" }} onPress={() => continuefn()} />
                </View>
            }>
            <View style={{ flex: 1 }}>
                <Card containerStyle={styles.cardContainer}>
                    <Flexcomponent justifyContent="space-between" alignItems="center" paddingVertical={8}>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text
                                family="regular"
                                size="semimedium"
                                style={{ color: Colors.grey }}>Bank Details</Text>

                            <Text style={{ marginTop: 8 }}>State</Text>
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
                                style={{ marginTop: 8 }}>134425654</Text>
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
                                style={{ marginTop: 8 }}>343144GR646EE</Text>
                        </View>
                    </Flexcomponent>

                    <Flexcomponent justifyContent="space-between" alignItems="center" paddingVertical={8}>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text
                                family="regular"
                                style={{ color: Colors.grey }}>Bank Holder Name</Text>

                            <Text
                                family="regular"
                                style={{ marginTop: 8 }}>Green</Text>
                        </View>

                    </Flexcomponent>
                </Card>

                <Card containerStyle={{ marginVertical: 10, padding: "5%" }}>
                    <Dropdown
                        list={subaccounts}
                        placeholder="Select"
                        label="Select Account"
                        background={theme.theme === "dark" ? "#16181A" : Colors.white}
                        labelField="accountName"
                        valueField="accountId"
                        value={selectedaccount}
                        onChange={(value) => {
                            console.log(value, "valuevaluevaluevalue");
                            setSelectedaccount(value?.accountId)
                        }}
                    />


                    <Dropdown
                        list={getcurrencies}
                        placeholder="Select"
                        label="Select Currency"
                        background={theme.theme === "dark" ? "#16181A" : Colors.white}
                        labelField="currencySymbol"
                        valueField="_id"
                        value={currencyId}
                        onChange={(value) => {
                            console.log(value, "valuevaluevaluevalue");
                            setCurrencyid(value?._id)
                        }}
                    />
                    <Input
                        label="Transacion Number"
                        placeHolder="4020304034"
                        background={theme.theme === "dark" ? "#16181A" : Colors.white}
                        onChange={setTransactionnumber}
                        value={transactionnumber}
                    />

                    <Input
                        label="Transaction Amount"
                        placeHolder="4020304034"
                        background={theme.theme === "dark" ? "#16181A" : Colors.white}
                        onChange={setAmount}
                        value={amount}
                    />


                    <Text style={{ marginBottom: "3%", color: Colors.grey }}>Bank transfer receipt/Proof of the transaction</Text>
                    <FileUpload
                        source="sheet"
                        mediaData={frontImage}
                        component={renderItem()}
                        onChange={(data) => {
                            setFrontImage(data);
                        }}
                        background={theme.theme === "dark" ? "#16181A" : Colors.white}
                    />

                </Card>

            </View>
        </Mainview>
    )
}

const styles = StyleSheet.create({

    imagebg: {
        width: "100%",
        height: windowheight * 0.16,
        justifyContent: "center"
    },
    cardContainer: {
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        padding: "3%",
    }
})

export default DepositDetails;