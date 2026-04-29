import React, { useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import Text from "../../Components/text";
import { Colors } from "../../Utilities/uiasset";
import Mainview from "../../Components/mainview";
import { athuDataProps } from "../../Actions/type";
import { helperSelector } from "../../Slices/helper";
import { Button, Input } from "../../Components/Field";
import useApiError from "../../Actions/Hooks/errorhook";
import { setItem } from "../../Actions/Storage/localstorage";
import { obfuscateEmailShort } from "../../Utilities/helerfunction";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import useCustomHooks, { useApihooks } from "../../Actions/Hooks/customhook";
import { useLoginVerifyMutation, useRecoveryUserLoginMutation, useResendCodeMutation } from "../../Slices/auth";

import styles from "./styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'OTP'>;

const OTP: React.FC<Props> = () => {
    const { theme, navigation, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);
    const otpParams = useSelector(helperSelector).otpparams;
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [timerExpired, setTimerExpired] = useState(false);

    const initialUserData: athuDataProps = useMemo(() => ({
        email: {
            value: '',
            rules: { required: true, email: true },
            messages: {
                required: 'Email is required!',
                email: 'Invalid email address!!',
            },
            isValid: true,
        },
        password: {
            value: '',
            rules: { required: true },
            messages: {
                required: 'Password is required!',
            },
            isValid: true,
        },
        otp: {
            value: '',
            rules: { required: true },
            messages: {
                required: 'OTP required!',
            },
            isValid: true,
        }
    }), []);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (!timerExpired) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds((prev) => prev - 1);
                } else if (minutes > 0) {
                    setMinutes((prev) => prev - 1);
                    setSeconds(59);
                } else {
                    setTimerExpired(true);
                    clearInterval(interval);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [seconds, minutes, timerExpired]);


    const [OTP, { error, isLoading }] = useLoginVerifyMutation();
    const [resend, { error: resendError, isLoading: loadingResend }] = useResendCodeMutation();
    const [recoverUser, { error: recoverErr, isLoading: recoverLoading }] = useRecoveryUserLoginMutation();
    const [userData, setUserData] = useState<athuDataProps>(initialUserData);

    const { Fetchcurrencies, triggerswitchaccount, triggeraffiliate, triggeruserdetails, Fetchsubaccounts, triggerPairDetails } = useApihooks()

    useApiError(error || resendError || recoverErr);

    const handleSubmitOTP = async () => {
        const payload: any = {
            email: otpParams.values?.email,
            password: otpParams.values?.password,
            otp: userData.otp?.value
        };
        console.log(payload, "payload")
        const response = await OTP(payload).unwrap();
        setItem("token", response.result)
        if (response.success) {
            successtoast("Success", response.message);
            navigation.navigate("Dashboard");
            Fetchcurrencies()
            triggerswitchaccount()
            triggerPairDetails()
            triggeruserdetails()
            Fetchcurrencies()
            triggeraffiliate()
            Fetchsubaccounts()

        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    const handleSubmitRecover = async () => {
        const payload: any = {
            firstName: otpParams.values?.firstName,
            lastName: otpParams.values?.lastName,
            type: otpParams.values?.type,
            otp: userData.otp?.value
        };
        console.log(payload, "payload")
        const response = await recoverUser(payload).unwrap();
        setItem("token", response.result)
        if (response.success) {
            successtoast("Success", response.message);
            navigation.navigate("Dashboard");
            Fetchcurrencies()
            triggerswitchaccount()

        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    const handleResend = async () => {
        const payload: any = {
            email: otpParams.values?.email,
        };
        console.log(payload, "payload")
        const response = await resend(payload).unwrap();
        console.log(response, "asdfasdfsfd")
        if (response.success) {
            successtoast("Success", response.message);
            setMinutes(5);
            setSeconds(0);
            setTimerExpired(false);
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    const handleSubmit = (type: any) => {
        if (type === "recover") {
            handleSubmitRecover()
        } else {
            handleSubmitOTP()
        }
    }

    return (
        <Mainview
            headertitle="OTP"
            isheader={true}
            isscollable={false}
            onleftfn={() => navigation.goBack()}
            bottomContent={
                otpParams.type === "recover" ? (
                    <View style={{ paddingHorizontal: "6%", marginBottom: "1.5%" }}>
                        <Button
                            title="Submit"
                            buttonStyle={{ paddingVertical: "3%" }}
                            onPress={() => handleSubmit(otpParams.type)}
                            loading={recoverLoading}
                        />
                    </View>
                ) : (
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', paddingHorizontal: "6%", marginBottom: "1.5%" }}>
                        <Pressable onPress={() => navigation.navigate("TwoFactorAuth")}>
                            <Text style={{ color: Colors.orange }}>Try another way</Text>
                        </Pressable>
                        {
                            !minutes && !seconds ? (
                                <Button
                                    title="Resend OTP"
                                    buttonStyle={{ width: "40%", paddingVertical: "3%" }}
                                    onPress={() => handleResend()}
                                    loading={loadingResend}
                                />
                            ) : (
                                <Button
                                    title="Submit"
                                    buttonStyle={{ width: "40%", paddingVertical: "3%" }}
                                    onPress={() => handleSubmit(otpParams.type)}
                                    loading={isLoading}
                                />
                            )
                        }
                    </View>
                )
            }
        >
            <View style={style.container}>
                <Input
                    label={otpParams.type === "2FA" ? "Enter 2FA code" : "Entert OTP"}
                    value={userData.otp?.value}
                    placeholder="Enter your OTP"
                    onChange={(text: any) => setUserData(prev => ({ ...prev, otp: { ...prev.otp, value: text } }))}
                    keyboardType="numeric"
                />
                {
                    (otpParams.type === "2FA" || otpParams.type === "mobile") ? (
                        <Text>{otpParams.values?.status === "mobile" ? `Enter your OTP to mobile  ${minutes < 10 ? `0${minutes}` : minutes}m:${seconds < 10 ? `0${seconds}` : seconds}s` : "Enter your authenticate code."}</Text>
                    ) : otpParams.type === "recover" ? (
                        <Text>We have sent a code to {otpParams.values?.type === "email" ? otpParams.values?.recoveremail : otpParams.values?.reovermobile} {minutes < 10 ? `0${minutes}` : minutes}m:{seconds < 10 ? `0${seconds}` : seconds}s</Text>
                    ) : (
                        <View style={{ flexDirection: "row" }}>
                            {!minutes && !seconds ? (
                                <Text>We have sent a code to {obfuscateEmailShort(otpParams.values.email)}</Text>
                            ) : (
                                <Text>
                                    <Text>We have sent a code to {obfuscateEmailShort(otpParams.values.email)} </Text>
                                    {minutes < 10 ? `0${minutes}m` : `${minutes}m`}:
                                    {seconds < 10 ? `0${seconds}s` : `${seconds}s`}
                                </Text>
                            )}
                        </View>
                    )
                }

            </View>
        </Mainview>
    )
}

export default OTP;