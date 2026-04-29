import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import { Colors } from "../../../Utilities/uiasset";
import Mainview from "../../../Components/mainview";
import { athuDataProps } from "../../../Actions/type";
import VectorIcons from "../../../Utilities/vectoricons";
import { Button, Input } from "../../../Components/Field";
import useApiError from "../../../Actions/Hooks/errorhook";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { getItem } from "../../../Actions/Storage/localstorage";
import { useChangePasswrodMutation } from "../../../Slices/auth";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'UpdatePassword'>;

const UpdatePassword: React.FC<Props> = () => {
    const { theme, navigation, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);

    const { userId } = useSelector((state: any) => state.auth.userData);
    const [showoldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const initialUserData: athuDataProps = useMemo(() => ({
        oldPassword: {
            value: getItem("oldPassword"),
            rules: { required: true },
            messages: { required: 'First name is required!' },
            isValid: true,
        },
        newPassword: {
            value: '',
            rules: { required: true },
            messages: { required: 'Last name is required!' },
            isValid: true,
        },
        confirmPassword: {
            value: '',
            rules: { required: true },
            messages: { required: 'Last name is required!' },
            isValid: true,
        }
    }), []);


    const [userData, setUserData] = useState<athuDataProps>(initialUserData);

    const [passwrod, { isLoading, error }] = useChangePasswrodMutation()

    useApiError(error ?? false);

    const handleSubmit = async () => {
        const payload: any = {
            oldPassword: userData.oldPassword?.value,
            newPassword: userData.newPassword?.value,
            confirmPassword: userData.confirmPassword?.value,
            id: userId
        }
        const response = await passwrod(payload).unwrap()
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
            headertitle="Update Password"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={{ alignItems: 'center', paddingHorizontal: "6%", marginBottom: "3%" }}>
                    <Button
                        title="Submit"
                        onPress={() => handleSubmit()}
                        loading={isLoading}
                    />
                </View>
            }
        >
            <View style={style.container}>
                <Input
                    label="Old Password"
                    placeholder="Enter your old password"
                    value={userData.oldPassword?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, oldPassword: { ...prev.oldPassword, value: text } }))}
                    secureTextEntry={!showoldPassword}
                    rightContent={
                        <Pressable onPress={() => setShowOldPassword(prev => !prev)}>
                            {showoldPassword ? (
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
                    label="Password"
                    placeholder="Enter your password"
                    value={userData.newPassword?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, newPassword: { ...prev.newPassword, value: text } }))}
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
                    placeholder="Enter confirm password"
                    value={userData.confirmPassword?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, confirmPassword: { ...prev.confirmPassword, value: text } }))}
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

export default UpdatePassword;