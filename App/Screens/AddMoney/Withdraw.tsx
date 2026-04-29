
import Mainview from "../../Components/mainview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { windowheight } from "../../Utilities/dimensions";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import Images, { icons } from "../../Utilities/images";
import { Colors, Fontfamily } from "../../Utilities/uiasset";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import React, { useEffect, useState } from "react";
import useCustomHooks, { useApihooks } from "../../Actions/Hooks/customhook";
import { Button, Dropdown, Input } from "../../Components/Field";
import Text from "../../Components/text";
import Card from "../../Components/Card";
import { colors } from "react-native-keyboard-controller/lib/typescript/components/KeyboardToolbar/colors";
import { useLazyGetcurrencyQuery, useLazyWithdrawcodeQuery, useWithdrawfiatMutation, walletSelector } from "../../Slices/wallet";
import { subAccountSelector, useLazySubAccountQuery } from "../../Slices/subAccount";
import { useSelector } from "react-redux";
import { authSelector } from "../../Slices/auth";
import useApiError from "../../Actions/Hooks/errorhook";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Withdraw'>;

const Withdraw: React.FC<Props> = () => {

    const { theme, navigation, successtoast, convert } = useCustomHooks()

    const { subaccounts } = useSelector(subAccountSelector)

    const [selectedaccount, setSelectedaccount] = useState<any>(subaccounts[0]?.accountId ?? "")
    const { getcurrencies } = useSelector(walletSelector)
    const [currencyId, setCurrencyid] = useState(getcurrencies[0]?._id)

    const [acc, setAcc] = useState<any>(subaccounts[0])
    const [fiat, setFiat] = useState<any>("")

    const { userData } = useSelector(authSelector)
    const accounts = userData?.bankAccounts
    const [selectedbank, setSelcetedbank] = useState("")

    const [amount, setAmount] = useState("")
    const [feeamount, setFeeamount] = useState("")
    const [withdrawcode, { isLoading: getcode, error: errorgetcode }] = useLazyWithdrawcodeQuery()
    const sentcode = async () => {
        const response: any = await withdrawcode(true)
        if (response?.data?.success) {
            successtoast("Success!", response?.data?.message)
            setOtp("")
        }
    }

    const [otp, setOtp] = useState("")

    const [withdrawfiat, { isLoading: final, error: errorwithdraw }] = useWithdrawfiatMutation()
    useApiError(errorgetcode || errorwithdraw)

    const submit = async () => {
        const payload = {
            accountId: selectedaccount,
            amount: amount,
            currencyId: currencyId,
            bankId: selectedbank,
            otp: otp
        }

        const response = await withdrawfiat(payload).unwrap()
        console.log(response, "PAYLOADDDDDDDDDDDDDDD");
        if (response?.success) {
            successtoast("Success!", response?.message)
            navigation?.pop(2)
        }

    }
    return (
        <Mainview
            onleftfn={() => navigation.goBack()}
            headertitle={"Withdraw"}
            isscollable={true} >

            <View style={{ flex: 1, }}>

                {/* <Dropdown
                    list={dropdownData}
                    placeholder="Select"
                /> */}


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
                        setAcc(value)
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
                        setFiat(value)
                    }}
                />


                {accounts?.length ?
                    <Dropdown
                        list={accounts}
                        placeholder="ex State bank of india"
                        label="Select Bank"
                        background={theme.theme === "dark" ? "#16181A" : Colors.white}
                        labelField="bankName"
                        valueField="_id"
                        value={selectedbank}
                        onChange={(value) => {
                            console.log(value, "valuevaluevaluevalue");
                            setSelcetedbank(value?._id)
                        }}
                    /> :
                    <>
                        <Text color={theme.secondarytext} >Selcet bank</Text>
                        <Button
                            title="Add Bank"
                            buttonStyle={{ height: windowheight * 0.05, width: "30%", marginVertical: "2.5%" }}
                            onPress={() => navigation?.navigate("AddBankDetail")}
                        />
                    </>}

                <Input
                    label="Amount"
                    placeholder="0"
                    value={amount}
                    onChange={(text) => {
                        if (Number(text) <= Number(convert(acc?.balance))) {
                            console.log(fiat?.withdrawalFee);

                            setAmount(text)
                            const percentage = Number(text) * (Number(fiat?.withdrawalFee) / 100)
                            const calculatefee = Number(text) - Number(percentage)
                            setFeeamount(JSON.stringify(calculatefee))
                        }
                    }}
                    keyboardType="number-pad"

                />

                <Pressable style={{ width: "100%", backgroundColor: theme.card, paddingVertical: "5%", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                    <Text>Wallet Balance: <Text style={{ color: Colors.green }}>{convert(acc?.balance) ?? 0.00}</Text></Text>
                </Pressable>


                <View style={{ marginTop: "10%" }}>
                    <Input
                        label="Withdraw Amount With Fee"
                        placeholder="0"
                        disabled={true}
                        value={feeamount}

                    />
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ width: "60%" }}>
                        <Input
                            label="OTP"
                            placeholder="0"
                            onChange={setOtp}
                            keyboardType="number-pad"
                            inputprops={{
                                maxLength: 6
                            }}
                            maxLength={6}
                            value={otp}
                        />
                    </View>
                    <Button loading={getcode} onPress={() => sentcode()} title="Get OTP" buttonStyle={{ width: "35%", marginTop: "5%" }} />
                </View>

                <Button
                    title="Withdraw"
                    buttonStyle={{ marginTop: "10%" }}
                    disabled={otp?.length != 6}
                    onPress={() => submit()}
                    loading={final}

                />

                <View style={{ marginTop: "10%" }}>
                    <Text size="medium" family="semiBold" style={{ color: Colors.lightgreen }}>Notes</Text>
                    <Text style={{ marginTop: "2%" }}>1. Maximum withdraw amit 10000</Text>
                    <Text style={{ marginTop: "2%" }}>2. Minimum withdraw limit 0.01</Text>
                    <Text style={{ marginTop: "2%" }}>3. On submit of withdrawal check mall sent to registered email id for OTP</Text>
                    <Text style={{ marginTop: "2%" }}>4. Your withdrawal request placed will be in pending state and processed after admin's approval</Text>
                    <Text style={{ marginTop: "2%" }}>5. Withdrawal amount with Fee will be the total transaction amount. So please ensure the amount entered doesn't exceed the maximum limit</Text>
                </View>
            </View>
        </Mainview>
    )
}

const styles = StyleSheet.create({

    imagebg: {
        width: "100%",
        height: windowheight * 0.16,
        justifyContent: "center"

    }
})

export default Withdraw;