import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import React, { useState } from "react";
import Mainview from "../../Components/mainview";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors, Fontfamily } from "../../Utilities/uiasset";
import Text from "../../Components/text";
import { Button, Dropdown, Input } from "../../Components/Field";
import { KeyboardAvoidingView, KeyboardAwareScrollView } from "react-native-keyboard-controller";
import useCustomHooks, { useApihooks } from "../../Actions/Hooks/customhook";
import { useAddbankMutation, useUpdatebankMutation } from "../../Slices/wallet";
import useApiError from "../../Actions/Hooks/errorhook";
import { useSelector } from "react-redux";
import { helperSelector } from "../../Slices/helper";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'AddBankDetail'>;

const AddBankDetail: React.FC<Props> = () => {

    const { theme, navigation, successtoast } = useCustomHooks()


    const { bankparams } = useSelector(helperSelector)
    console.log(bankparams, "bankparams");

    const intialstate = {
        holderName: bankparams?.value?.holderName ?? "",
        bankName: bankparams?.value?.bankName ?? "",
        accountNo: bankparams?.value?.accountNo ?? "",
        bankcode: bankparams?.value?.bankcode ?? "",
        country: bankparams?.value?.country ?? "",
        city: bankparams?.value?.city ?? "",
        bankAddress: bankparams?.value?.bankAddress ?? ""
    }
    const [formdata, setFormdata] = useState(intialstate)
    const {
        holderName,
        bankName,
        accountNo,
        bankcode,
        country,
        city,
        bankAddress
    } = formdata

    const onchangedata = (key: string, value: string) => {
        setFormdata((prevstate) => ({
            ...prevstate,
            [key]: value
        }))
    }
    const [addbank, { isLoading: add, error: adderror }] = useAddbankMutation()
    const [updatebank, { isLoading: edit, error: editerror }] = useUpdatebankMutation()

    const { triggeruserdetails } = useApihooks()

    useApiError(editerror || adderror)

    const submit = async () => {
        console.log(formdata, "Formdata");
        const response = bankparams?.type == "add" ? await addbank(formdata).unwrap() : await updatebank(formdata).unwrap()
        console.log(response);
        if (response.success) {
            triggeruserdetails()
            navigation?.goBack()
            successtoast("Added!", "Bank detail added successfully")
        }
    }
    return (
        <Mainview
            onleftfn={() => navigation.goBack()}
            headertitle={bankparams?.type == "add" ? "Add Bank Details" : "Edit Bank Details"}
            isscollable={true}
            bottomContent={
                <View style={{ marginHorizontal: "6%" }}>
                    <Button
                        loading={bankparams?.type == "add" ? add : edit}
                        onPress={() => submit()}
                        title={bankparams?.type == "add" ? "Add" : "Edit"}
                        buttonStyle={{ marginBottom: "5%", marginTop: "2%" }} />
                </View>

            }
        >
            <View style={{ flex: 1, marginTop: 20 }}>

                <Input
                    label="Holder Name"
                    placeHolder="Enter Holder Name"
                    value={holderName}
                    onChange={(text) => onchangedata("holderName", text)}
                />

                <Input
                    label="Bank Name"
                    placeHolder="Enter Bank Name"
                    value={bankName}
                    onChange={(text) => onchangedata("bankName", text)}
                />

                <Input
                    label={bankparams?.type == "edit" ? "Account Number (can't edit)" : "Account Number"}
                    placeHolder="Enter Account Number"
                    value={accountNo}
                    onChange={(text) => onchangedata("accountNo", text)}
                    keyboardType="number-pad"
                    maxLength={18}
                    disabled={bankparams?.type == "edit"}

                />

                <Input
                    label="IFSC / SWIFT / BIC / IBAN / BBAN Code"
                    placeHolder="Enter Code"
                    value={bankcode}
                    onChange={(text) => onchangedata("bankcode", text)}
                />


                <Input
                    label="Bank Address"
                    placeHolder="Enter Bank Address"
                    value={bankAddress}
                    onChange={(text) => onchangedata("bankAddress", text)}
                />


                <Input
                    label="Bank City"
                    placeHolder="Enter City"
                    value={city}
                    onChange={(text) => onchangedata("city", text)}
                />
                <Input
                    label="Bank Country"
                    placeHolder="Enter Bank Country"
                    value={country}
                    onChange={(text) => onchangedata("country", text)}
                />







                {/* <Dropdown
                            label="Account Type"
                            placeholder="Select Account Type"
                            list={list}
                            value={list?.[0].value}
                            position={"top"}
                        /> */}


                {/* <View style={styles.bottomView}> */}




                {/* </View> */}



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
    },
    item: {

    }
})
export default AddBankDetail;