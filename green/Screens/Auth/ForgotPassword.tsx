import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Mainview from "../../Components/mainview";
import { athuDataProps } from "../../Actions/type";
import { setOtpparams } from "../../Slices/helper";
import { Button, Input } from "../../Components/Field";
import useApiError from "../../Actions/Hooks/errorhook";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { useForgotPasswordMutation } from "../../Slices/auth";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";

import styles from "./styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'ForgotPassword'>;

const ForgotPassword: React.FC<Props> = () => {
    const { theme, navigation, successtoast, failuretoast, dispatch } = useCustomHooks();
    const style = styles(theme);

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

    }), []);

    const [forgot, { isLoading, error }] = useForgotPasswordMutation()
    const [userData, setUserData] = useState<athuDataProps>(initialUserData);

    useApiError(error ?? false);

    useEffect(() => {
        const err: any = error
        if (err?.data?.status == "google") {
            successtoast("Sucess!", err.data.message);
            const payload = {
                type: "forgot2FA",
                values: {
                    email: userData.email?.value,
                }
            }
            dispatch(setOtpparams(payload));
            navigation.navigate("ForgotPass");
        }
    }, [error])

    const handleSubmit = async () => {
        const payload: any = {
            email: userData.email?.value,
        };
        console.log(payload, "payload")
        const response = await forgot(payload).unwrap()
        if (response.success) {
            successtoast("Success", response.message);
            const payload = {
                type: "forgot",
                values: {
                    email: userData.email?.value,
                }
            }
            dispatch(setOtpparams(payload));
            navigation.navigate("ForgotPass");
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
                    label="Email Address"
                    placeHolder="greenx@gmail.com"
                    value={userData.email?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, email: { ...prev.email, value: text } }))}
                />
            </View>
        </Mainview>
    )

}

export default ForgotPassword;