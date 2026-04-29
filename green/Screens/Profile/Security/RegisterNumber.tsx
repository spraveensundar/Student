import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import Description from "../Description";
import Text from "../../../Components/text";
import Mainview from "../../../Components/mainview";
import { Fontsize } from "../../../Utilities/uiasset";
import { athuDataProps } from "../../../Actions/type";
import { helperSelector } from "../../../Slices/helper";
import { Button, Input } from "../../../Components/Field";
import useApiError from "../../../Actions/Hooks/errorhook";
import { windowheight } from "../../../Utilities/dimensions";
import useCustomHooks, { useApihooks } from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";
import { useLazyUserDetailsQuery, useRegisterNumberMutation, useVerifyNewMobileMutation, useVerifyNumberMutation } from "../../../Slices/auth";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'RegisterNumber'>;

const RegisterNumber: React.FC<Props> = () => {
    const { theme, navigation, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);

    const { phoneparams } = useSelector(helperSelector)

    const initialUserData: athuDataProps = useMemo(() => ({
        mobileNumber: {
            value: "",
            rules: { required: true },
            messages: { required: 'First name is required!' },
            isValid: true,
        },
        countryCode: {
            value: "91",
            rules: { required: true },
            messages: { required: 'Last name is required!' },
            isValid: true,
        }
    }), []);

    const [userData, setUserData] = useState<athuDataProps>(initialUserData);

    const [verify, { error: verifyError }] = useVerifyNumberMutation();
    const [verifyNewMobile, { error: verifynewError }] = useVerifyNewMobileMutation();
    const [register, { error: registerError }] = useRegisterNumberMutation();
    const {triggeruserdetails} = useApihooks()
    useApiError(verifyError ?? registerError ?? verifynewError ?? false);

    const handleSubmit = async () => {
        const paylaod: any = {
            mobileNumber: userData.mobileNumber?.value,
            countryCode: userData.countryCode?.value
        }
        console.log(paylaod)
        const response = await verify(paylaod).unwrap()
        if (response.success) {
            successtoast("Success", response.message);
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    const handleRegister = async () => {
        const paylaod: any = {
            mobileNumber: userData.mobileNumber?.value,
            countryCode: userData.countryCode?.value,
            otp: userData.otp?.value,
        }
        const response = await register(paylaod).unwrap();
        if (response.success) {
            successtoast("Success", response.message);
            triggeruserdetails()
            if (phoneparams?.type === "add") {
                navigation.goBack();
            } else {
                navigation.navigate("PhoneNumber");
            }

        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    const handleChange = async () => {
        const paylaod: any = {
            mobileNumber: userData.mobileNumber?.value,
            countryCode: userData.countryCode?.value
        }
        console.log(paylaod)
        const response = await verifyNewMobile(paylaod).unwrap()
        if (response.success) {
            successtoast("Success", response.message);
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    const handleMethod = async () => {
        if (phoneparams?.type === "add") {
            await handleSubmit();
        } else if (phoneparams?.type === "change") {
            await handleChange();
        } else {
            failuretoast("Error", "Invalid request type.");
        }
    };

    return (
        <Mainview
            isheader={true}
            headertitle={"Phone Number"}
            isscollable={false}
            onleftfn={() => navigation.goBack()}>
            <View style={style.container}>
                <Description
                    title="Phone Number Change"
                    content="Create and manage API keys to access your trading account programmatically."
                />


                <View style={{ marginTop: "8%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ width: "70%" }}>
                        <Input
                            value={userData.mobileNumber?.value}
                            label="New Phone Number"
                            keyboardType="phone-pad"
                            leftContent={<Text>+91</Text>}
                            onChange={(text: any) => setUserData(prev => ({ ...prev, mobileNumber: { ...prev.mobileNumber, value: text } }))}
                        />
                    </View>
                    <View style={{ width: "28%", marginTop: "8%", }}>
                        <Button
                            title="Get Code"
                            onPress={handleMethod}
                            buttonStyle={{ height: windowheight * 0.045 }}
                            textStyle={{ fontSize: Fontsize.small }}
                        />
                    </View>
                </View>
                <Input
                    value={userData.otp?.value}
                    label="Enter OTP"
                    onChange={(text: any) => setUserData(prev => ({ ...prev, otp: { ...prev.otp, value: text } }))}
                />

                <Button
                    title="Submit"
                    buttonStyle={style.bottomButton}
                    onPress={() => handleRegister()}
                />
            </View>
        </Mainview>
    )

}

export default RegisterNumber;