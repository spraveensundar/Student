import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import { Colors } from "../../Utilities/uiasset";
import Mainview from "../../Components/mainview";
import { athuDataProps } from "../../Actions/type";
import VectorIcons from "../../Utilities/vectoricons";
import { helperSelector } from "../../Slices/helper";
import { Button, Input } from "../../Components/Field";
import useApiError from "../../Actions/Hooks/errorhook";
import { windowwidth } from "../../Utilities/dimensions";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { useChangeforgotPassMutation } from "../../Slices/auth";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";

import styles from "./styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'ForgotPass'>;

const ForgotPass: React.FC<Props> = () => {
    const { theme, navigation, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);
    const otpParams = useSelector(helperSelector).otpparams;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const initialUserData: athuDataProps = useMemo(() => ({
        password: {
            value: '',
            rules: { required: true, email: true },
            messages: {
                required: 'Email is required!',
            },
            isValid: true,
        },
        confirmPassword: {
            value: '',
            rules: { required: true, email: true },
            messages: {
                required: 'Email is required!',
            },
            isValid: true,
        },
        otp: {
            value: '',
            rules: { required: true, email: true },
            messages: {
                required: 'Email is required!',
            },
            isValid: true,
        },
    }), []);

    const [changeforgotpass, { isLoading, error }] = useChangeforgotPassMutation()
    const [userData, setUserData] = useState<athuDataProps>(initialUserData);

    useApiError(error ?? false);

    const handleSubmit = async () => {
        const payload: any = {
            email: otpParams.values.email,
            password: userData.password?.value,
            confirmPassword: userData.confirmPassword?.value,
            otp: userData.otp?.value

        };
        console.log(payload, "payload")
        const response = await changeforgotpass(payload).unwrap()
        if (response.success) {
            successtoast("Success", response.message);
            navigation.navigate("Login");
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }
    return (
        <Mainview
            isheader={true}
            isscollable={false}
            headertitle="Forgot Password"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={{ paddingHorizontal: "6%" }}>
                    <Button
                        title="Submit"
                        buttonStyle={style.buttonContainer}
                        onPress={() => handleSubmit()}
                        loading={isLoading}
                    />
                </View>
            }
        >
            <View style={style.container}>

                <Input
                    label={otpParams.type === "forgot2FA" ? "Enter 2FA code" : "Enter OTP"}
                    value={userData.otp?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, otp: { ...prev.otp, value: text } }))}
                    keyboardType="numeric"
                    placeHolder="ex 123456"
                />

                <Input
                    label="Password"
                    placeHolder="Enter your password"
                    value={userData.password?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, password: { ...prev.password, value: text } }))}
                    secureTextEntry={!showPassword}
                    rightContent={
                        <Pressable onPress={() => setShowPassword(prev => !prev)}>
                            {showPassword ? (
                                <VectorIcons
                                    family="Ionicons"
                                    name="eye-off"
                                    iconcolor={Colors.grey}
                                    size={windowwidth * 0.055}
                                />
                            ) : (
                                <VectorIcons
                                    family="Ionicons"
                                    name="eye"
                                    iconcolor={Colors.grey}
                                    size={windowwidth * 0.055}
                                />
                            )}
                        </Pressable>
                    }
                />
                <Input
                    label="Confirm Password"
                    placeHolder="Enter your Confirm Password"
                    value={userData.confirmPassword?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, confirmPassword: { ...prev.confirmPassword, value: text } }))}
                    secureTextEntry={!showConfirmPass}
                    rightContent={
                        <Pressable onPress={() => setShowConfirmPass(prev => !prev)}>
                            {showConfirmPass ? (
                                <VectorIcons
                                    family="Ionicons"
                                    name="eye-off"
                                    iconcolor={Colors.grey}
                                    size={windowwidth * 0.055}
                                />
                            ) : (
                                <VectorIcons
                                    family="Ionicons"
                                    name="eye"
                                    iconcolor={Colors.grey}
                                    size={windowwidth * 0.055}
                                />
                            )}
                        </Pressable>
                    }
                />
            </View>
        </Mainview>
    )

}

export default ForgotPass;