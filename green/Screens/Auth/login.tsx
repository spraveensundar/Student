import React, { useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import Text from "../../Components/text";
import { Colors } from "../../Utilities/uiasset";
import Mainview from "../../Components/mainview";
import { athuDataProps } from "../../Actions/type";
import { setOtpparams } from "../../Slices/helper";
import { useLoginMutation } from "../../Slices/auth";
import VectorIcons from "../../Utilities/vectoricons";
import { Button, Input } from "../../Components/Field";
import useApiError from "../../Actions/Hooks/errorhook";
import Images, { image } from "../../Utilities/images";
import Flexcomponent from "../../Components/flexcomponent";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { setItem } from "../../Actions/Storage/localstorage";
import { borderradius, windowwidth } from "../../Utilities/dimensions";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";

import styles from "./styles";

GoogleSignin.configure({
    webClientId: '849303224861-fvc2gjiek989ldc899sv4kfc6s9eobmv.apps.googleusercontent.com',
});

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Login'>;

const Login: React.FC<Props> = () => {
    const { theme, navigation, successtoast, failuretoast, dispatch } = useCustomHooks();
    const style = styles(theme);
    const [show, setShow] = useState(false);

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

    }), []);

    const [login, { isLoading, error, status }] = useLoginMutation()
    const [userData, setUserData] = useState<athuDataProps>(initialUserData);

    useApiError(error ?? false);

    useEffect(() => {
        const err: any = error
        console.log(err)
        if (err?.data?.status == "google") {
            successtoast("Sucess!", err.data.message);
            const payload = {
                type: "2FA",
                values: {
                    email: userData.email?.value,
                    password: userData.password?.value,
                    status: err?.data?.status
                }
            }
            dispatch(setOtpparams(payload));
            navigation.navigate("OTP");
        }
    }, [error])

    const handleSubmit = async () => {
        const payload: any = {
            email: userData.email?.value,
            password: userData.password?.value,
        };
        console.log(payload, "payload")
        const response = await login(payload).unwrap();
        console.log(response, "response")

        if (response.success) {
            successtoast("Success", response.message);
            if (response.status == "mobile") {
                const payload = {
                    type: "mobile",
                    values: {
                        email: userData.email?.value,
                        password: userData.password?.value,
                        status: "mobile"
                    }
                }
                dispatch(setOtpparams(payload));
                navigation.navigate("OTP");
            } else {
                const payload = {
                    type: "login",
                    values: {
                        email: userData.email?.value,
                        password: userData.password?.value
                    }
                }
                dispatch(setOtpparams(payload));
                navigation.navigate("OTP");
            }

        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    const handlegoogle = async () => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo, "userinfo");
    }

    return (
        <Mainview
            isheader={false}
            isscollable={false}
            customheader={
                <View style={style.headerContainer}>
                    <Text style={style.header}>Login</Text>
                    <Pressable style={style.rightContent} onPress={() => navigation.navigate("Signup")}>
                        <Text family={"medium"} style={{ color: Colors.orange }}>Signup</Text>
                    </Pressable>
                </View>
            }
        >
            <View style={style.container}>
                <Input
                    label="Email"
                    placeHolder="Enter Your Mail Address"
                    value={userData.email?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, email: { ...prev.email, value: text } }))}
                />
                <Input
                    label="Password"
                    placeHolder="Enter Your Password"
                    secureTextEntry={!show}
                    value={userData.password?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, password: { ...prev.password, value: text } }))}
                    rightContent={
                        <Pressable onPress={() => setShow(prev => !prev)}>
                            {show ? (
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
                <Pressable style={{ alignItems: "flex-end" }} onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text style={{ color: Colors.orange }}>Forgot Password ?</Text>
                </Pressable>
                <Button
                    title="Login"
                    buttonStyle={style.buttonContainer}
                    onPress={() => handleSubmit()}
                    loading={isLoading}
                />

                {/* <Flexcomponent top={"5%"} ispress={true} onPress={() => handlegoogle()} paddingHorizontal={"2.5%"} paddingVertical={"5%"} bakgroundcolor={theme.card} style={{ borderRadius: borderradius * 0.5 }} >
                    <Images
                        type="image"
                        source={image.google}
                        width={windowwidth * 0.06}
                        height={windowwidth * 0.06}
                        style={{ position: "absolute", left: "5%" }}
                    />
                    <Text family="medium" size="semimedium" >Signin with google</Text>
                </Flexcomponent> */}
                {/* <View style={style.content}>
                    <Text style={{ textAlign: "center", color: theme.secondarytext }}>By continuing, you agree to Grow’s <Text style={{ color: theme.primarytext }} family="semiBold">Terms of Service</Text> and <Text style={{ color: theme.primarytext }} family="bold">Privacy Policy</Text></Text>
                </View> */}
            </View>
        </Mainview>
    )

}

export default Login;