import { Pressable, View } from "react-native"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import Text from "../../../Components/text"
import Mainview from "../../../Components/mainview"
import { Input } from "../../../Components/Field"
import { useState } from "react"
import { bankDataProps } from "../../../Actions/Types/formDataTypes"
import { validator } from "../../../Actions/Constants/validation"
import { authSelector, useUpdateBankAPIMutation } from "../../../Slices/auth"
import useApiError from "../../../Actions/Hooks/errorhook"
import { Colors } from "../../../Utilities/uiasset"
import { Toastfn } from "../../../Utilities/helerfunction"
import { useSelector } from "react-redux"
import { refreshServiceManData } from "../../../Actions/Constants/apiHelpers"

const UpdateBank: React.FC = () => {
    const { navigation } = useCustomHooks()
    const [UpdateBankAPI, { isLoading, error: updateError }] = useUpdateBankAPIMutation()
    const { serviceMan } = useSelector(authSelector);
    console.log("ServiceMan_Data_UpdateBank==>", serviceMan);

    useApiError(updateError ?? false);

    const ClearFields = () => {
        setUserData({
            bankName: {
                value: "",
                rules: { required: true },
                messages: { required: 'Bank Name is required!' },
                isValid: true,
            },
            bankAccountNumber: {
                value: "",
                rules: { required: true },
                messages: { required: 'Account Number is required!' },
                isValid: true,
            },
            ifscCode: {
                value: "",
                rules: { required: true },
                messages: { required: 'IFSC Code is required!' },
                isValid: true,
            },
            confirmIfscCode: {
                value: "",
                rules: { required: true, equalTo: "ifscCode" },
                messages: { required: 'Confirm IFSC code is required!', equalTo: 'IFSC code do not match!' },
                isValid: true,
            },
        })
    }

    const [userData, setUserData] = useState<bankDataProps>({
        bankName: {
            value: serviceMan?.bankName || "",
            rules: { required: true },
            messages: { required: 'Bank Name is required!' },
            isValid: true,
        },
        bankAccountNumber: {
            value: serviceMan?.bankAccNo || "",
            rules: { required: true },
            messages: { required: 'Account Number is required!' },
            isValid: true,
        },
        ifscCode: {
            value: serviceMan?.ifscCode || "",
            rules: { required: true },
            messages: { required: 'IFSC Code is required!' },
            isValid: true,
        },
        confirmIfscCode: {
            value: serviceMan?.ifscCode || "",
            rules: { equalTo: "ifscCode" },
            messages: { equalTo: 'IFSC code do not match!' },
            isValid: true,
        },
    });

    const handleSubmit = async () => {
        try {
            const validatedResult = validator(userData);
            setUserData({ ...validatedResult?.data });
            if (validatedResult?.isValid) {
                const formData = new FormData();

                formData.append('bankName', userData?.bankName?.value);
                formData.append('bankAccNo', userData?.bankAccountNumber?.value);
                formData.append('ifscCode', userData?.ifscCode?.value);
                formData.append('confirmIfscCode', userData?.ifscCode?.value);

                console.log('UPDATE-BANK-DETAILS-FORMDATA', formData);

                const response = await UpdateBankAPI(formData).unwrap();

                if (response?.status === true) {
                    await refreshServiceManData();
                    Toastfn(response?.message);
                    navigation.goBack();
                }

                console.log("Bank_details_updated ==> ", response);

            } else {
                Toastfn('Please fill the required fields!');
            }
        } catch (error: any) {
            console.log('UPDATE-BANK-DETAILS-ERROR', error);
        }
    }

    console.log('userData', userData);

    return (
        <Mainview
            headertitle="Add Account Details"
            onleftfn={() => {
                navigation.goBack();
            }}
            bottomContent
            isbottomload={false}
            bottomtext="Save"
            onBottompress={() => handleSubmit()}
            ismainloading={isLoading}
        >
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }} >
                <Text family="GMedium" size="semilarge" top={"5%"} >Bank Account  Details</Text>
                <Pressable style={{ top: "10%" }} onPress={() => ClearFields()} >
                    <Text family="GMedium" size="semimedium" style={{ color: Colors.red, textDecorationLine: "underline" }}>Clear</Text>
                </Pressable>
            </View>
            <Input
                key={"BankName"}
                label={"Bank Name"}
                labelStyle={{ marginTop: "5%" }}
                placeHolder="Enter bank name"
                value={userData.bankName?.value}
                onChange={(text: any) => setUserData(prev => ({ ...prev, bankName: { ...prev.bankName, value: text } }))}
                isValid={userData.bankName?.isValid}
                errorMessage={userData.bankName?.errorMessage}
            />

            <Input
                key={"AccNumber"}
                label={"Bank Account Number"}
                keyboardType="numeric"
                labelStyle={{ marginTop: "5%" }}
                placeHolder="Enter Account Number"
                value={userData.bankAccountNumber?.value}
                onChange={(text: any) => setUserData(prev => ({ ...prev, bankAccountNumber: { ...prev.bankAccountNumber, value: text } }))}
                isValid={userData.bankAccountNumber?.isValid}
                errorMessage={userData.bankAccountNumber?.errorMessage}
            />
            <Input
                key={"IFSCCode"}
                label={"IFSC Code"}
                labelStyle={{ marginTop: "5%" }}
                placeHolder="Enter IFSC Code"
                value={userData.ifscCode?.value}
                onChange={(text: any) => setUserData(prev => ({ ...prev, ifscCode: { ...prev.ifscCode, value: text } }))}
                isValid={userData.ifscCode?.isValid}
                errorMessage={userData.ifscCode?.errorMessage}
            />
            <Input
                key={"ConfirmIFSC"}
                label={"Confirm IFSC Code"}
                // keyboardType="numeric"
                labelStyle={{ marginTop: "5%" }}
                placeHolder="Re-enter IFSC Code"
                value={userData.confirmIfscCode?.value}
                onChange={(text: any) => setUserData(prev => ({ ...prev, confirmIfscCode: { ...prev.confirmIfscCode, value: text } }))}
                isValid={userData.confirmIfscCode?.isValid}
                errorMessage={userData.confirmIfscCode?.errorMessage}
            />

        </Mainview>
    )

}

export default UpdateBank