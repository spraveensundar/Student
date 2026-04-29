import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Clipboard from "@react-native-clipboard/clipboard";

import Text from "../../Components/text";
import { Colors } from "../../Utilities/uiasset";
import Mainview from "../../Components/mainview";
import { athuDataProps } from "../../Actions/type";
import VectorIcons from "../../Utilities/vectoricons";
import { useRegisterMutation } from "../../Slices/auth";
import useApiError from "../../Actions/Hooks/errorhook";
import { windowwidth } from "../../Utilities/dimensions";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { Button, Input, InputDateTime } from "../../Components/Field";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";

import styles from "./styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Signup'>;

const Signup: React.FC<Props> = () => {
    const { theme, navigation, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);

    const [contractAddress, setContractAddress] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        setContractAddress(text)
    };

    const initialUserData: athuDataProps = useMemo(() => ({
        firstName: {
            value: '',
            rules: { required: true },
            messages: { required: 'First name is required!' },
            isValid: true,
        },
        lastName: {
            value: '',
            rules: { required: true },
            messages: { required: 'Last name is required!' },
            isValid: true,
        },
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
        confirmPassword: {
            value: '',
            rules: { required: true, equalTo: 'password' },
            messages: {
                required: 'Confirm password is required!', equalTo: 'Not matches with password',
            },
            isValid: true,
        },
        dob: {
            value: '',
            rules: { required: true },
            messages: {
                required: 'Date of birth is required'
            },
            isValid: true,
        },
        referral: {
            value: '',
            rules: { required: false },
            isValid: true,
        },
    }), []);


    const [userData, setUserData] = useState<athuDataProps>(initialUserData);

    const [register, { isLoading, error }] = useRegisterMutation()

    useApiError(error ?? false);

    const handleSubmit = async () => {
        const payload: any = {
            firstName: userData.firstName?.value,
            lastName: userData.lastName?.value,
            email: userData.email?.value,
            password: userData.password?.value,
            confirmPassword: userData.confirmPassword?.value,
            dob: userData.dob?.value,
            referenceCode: userData.referral?.value,
        };
        console.log(payload, "payload")
        const response = await register(payload).unwrap()
        if (response.success) {
            successtoast("Success", response.message);
            navigation.navigate("Login");
            setUserData(initialUserData)
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    return (
        <Mainview
            isheader={false}
            isscollable={true}
            customheader={
                <View style={style.headerContainer} >
                    <Text style={style.header}>Signup</Text>
                    <Pressable style={style.rightContent} onPress={() => navigation.goBack()}>
                        <Text family={"medium"} style={{ color: Colors.orange }}>Login</Text>
                    </Pressable>
                </View>
            }
            bottomContent={
                <View style={{ marginHorizontal: "6%", marginTop: "-5%" }}>

                    <Button
                        title="Signup"
                        buttonStyle={style.buttonContainer}
                        onPress={() => handleSubmit()}
                        loading={isLoading}
                    />
                    <View style={[style.content, { marginBottom: "5%" }]}>
                        <Text style={{ textAlign: "center", color: theme.secondarytext }}>By continuing, you agree to Grow’s <Text style={{ color: theme.primarytext }} family="semiBold">Terms of Service</Text> and <Text style={{ color: theme.primarytext }} family="bold">Privacy Policy</Text></Text>
                    </View>
                </View>
            }
        >
            <View style={style.container}>

                <Input
                    label="First Name"
                    placeHolder="Enter your First Name"
                    value={userData.firstName?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, firstName: { ...prev.firstName, value: text } }))}

                />

                <Input
                    label="Last Name"
                    placeHolder="Enter your Last Name"
                    value={userData.lastName?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, lastName: { ...prev.lastName, value: text } }))}
                />

                <InputDateTime
                    label="DOB"
                    placeHolder="01/01/2000"
                    inputType="date"
                    value={userData.dob?.value}
                    onConfirm={(text: any) => setUserData(prev => ({ ...prev, dob: { ...prev.dob, value: text } }))}
                />

                <Input
                    label="Email Address"
                    placeHolder="Enter you Eamil Address"
                    keyboardType="email-address"
                    value={userData.email?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, email: { ...prev.email, value: text } }))}

                />

                <Input
                    label="Create Password"
                    placeHolder="•••••••••••••"
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
                    placeHolder="•••••••••••••"
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

                <Input
                    value={contractAddress}
                    label="Referral Code (Optional)"
                    placeholder="Enter or paste your referral codes"
                    onChange={setContractAddress}
                    rightContent={
                        <Pressable onPress={fetchCopiedText}>
                            <VectorIcons
                                family="MaterialIcons"
                                name="content-paste"
                                iconcolor={Colors.grey}
                                size={windowwidth * 0.055}

                            />
                        </Pressable>
                    }
                />

            </View>
        </Mainview>
    )

}

export default Signup;