import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Text from "../../Components/text";
import Card from "../../Components/Card";
import { Colors } from "../../Utilities/uiasset";
import Mainview from "../../Components/mainview";
import { setOtpparams } from "../../Slices/helper";
import { athuDataProps } from "../../Actions/type";
import VectorIcons from "../../Utilities/vectoricons";
import { Button, Input } from "../../Components/Field";
import useApiError from "../../Actions/Hooks/errorhook";
import { windowwidth } from "../../Utilities/dimensions";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import { useRecoveryUserMutation, useRecoveryUserOTPMutation } from "../../Slices/auth";

import styles from "./styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, "TwoFactorAuth">;

const TwoFactorAuth: React.FC<Props> = () => {
    const { theme, successtoast, failuretoast, dispatch, navigation } = useCustomHooks();
    const style = styles(theme);

    const initialUserData: athuDataProps = useMemo(
        () => ({
            firstName: {
                value: "",
                rules: { required: true },
                messages: { required: "First name is required!" },
                isValid: true,
            },
            lastName: {
                value: "",
                rules: { required: true },
                messages: { required: "Last name is required!" },
                isValid: true,
            },
        }),
        []
    );

    const [userData, setUserData] = useState<athuDataProps>(initialUserData);
    const [responseData, setResponseData] = useState<any>(null);
    const [selectedMethod, setSelectedMethod] = useState("");

    const [recoverUser, { isLoading, error }] = useRecoveryUserMutation();
    const [recoverOTP, { isLoading: recoverLoading, error: recoverErr }] = useRecoveryUserOTPMutation();
    useApiError(error ?? recoverErr ?? false);

    const handleSubmit = async () => {
        const payload: any = {
            firstName: userData.firstName?.value,
            lastName: userData.lastName?.value,
            type: selectedMethod,
        };
        const response = await recoverUser(payload).unwrap();
        if (response.success) {
            setResponseData(response.result?.data || null);
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    };

    const handleSubmitOTP = async () => {
        const payload: any = {
            firstName: userData.firstName?.value,
            lastName: userData.lastName?.value,
            type: selectedMethod,
        }
        const response = await recoverOTP(payload).unwrap();
        if (response.success) {
            successtoast("Success", response.message);
            const payload = {
                type: "recover",
                values: {
                    firstName: userData.firstName?.value,
                    lastName: userData.lastName?.value,
                    type: selectedMethod,
                    recoveremail: responseData.email,
                    reovermobile: responseData.mobile
                }
            }
            dispatch(setOtpparams(payload))
            navigation.navigate("OTP")

        } else {
            failuretoast("Error", "Something went wrong!");
        }

    };

    return (
        <Mainview
            headertitle="Two-factor Authentication"
            onleftfn={() => navigation.goBack()}
            isscollable
            bottomContent={
                <View style={{ marginHorizontal: "6%" }}>
                    {responseData ? (
                        <Button
                            title="Submit"
                            buttonStyle={style.buttonContainer}
                            onPress={handleSubmitOTP}
                            loading={recoverLoading}
                        />
                    ) : (
                        <Button
                            title="Continue"
                            buttonStyle={style.buttonContainer}
                            onPress={handleSubmit}
                            loading={isLoading}
                        />
                    )
                    }
                </View>
            }
        >
            <View style={style.container}>
                {responseData ? (
                    <>
                        {
                            responseData.email && (
                                <Pressable onPress={() => setSelectedMethod("email")}>
                                    <Card containerStyle={{ padding: "6%", borderColor: selectedMethod === "email" ? Colors.green : theme.boderColor }}>
                                        <Text family="semiBold" size="medium" style={{ marginBottom: "4%" }}>Email</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <View style={[style.select, { backgroundColor: selectedMethod === "email" ? Colors.green : theme.theme === "dark" ? Colors.dune : Colors.white }]}>
                                                {selectedMethod === "email" && (
                                                    <VectorIcons
                                                        family="Octicons"
                                                        name="dot-fill"
                                                        iconcolor={Colors.white}
                                                        size={windowwidth * 0.055}
                                                    />
                                                )}
                                            </View>
                                            <Text size="medium" style={{ marginLeft: 8 }}>
                                                {responseData.email}
                                            </Text>
                                        </View>
                                    </Card>
                                </Pressable>
                            )
                        }
                        {
                            responseData.mobile && (
                                <Pressable onPress={() => setSelectedMethod("mobile")}>
                                    <Card containerStyle={{ padding: "6%", marginTop: "5%", borderColor: selectedMethod === "mobile" ? Colors.green : theme.boderColor }}>
                                        <Text family="semiBold" size="medium" style={{ marginBottom: "4%" }}>Mobile</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <View style={[style.select, {
                                                backgroundColor:
                                                    selectedMethod === "mobile"
                                                        ? Colors.green
                                                        : theme.theme === "dark"
                                                            ? Colors.dune
                                                            : Colors.white
                                            }]}>
                                                {selectedMethod === "mobile" && (
                                                    <VectorIcons
                                                        family="Octicons"
                                                        name="dot-fill"
                                                        iconcolor={Colors.white}
                                                        size={windowwidth * 0.055}
                                                    />
                                                )}
                                            </View>
                                            <Text size="medium" style={{ marginLeft: 8 }}>
                                                {responseData.mobile}
                                            </Text>
                                        </View>
                                    </Card>
                                </Pressable>
                            )
                        }
                    </>
                ) : (
                    <>
                        <Input
                            label="First Name"
                            placeHolder="Enter your first name"
                            value={userData.firstName?.value}
                            onChange={(text: string) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    firstName: { ...prev.firstName, value: text },
                                }))
                            }
                        />
                        <Input
                            label="Last Name"
                            placeHolder="Enter your last name"
                            value={userData.lastName?.value}
                            onChange={(text: string) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    lastName: { ...prev.lastName, value: text },
                                }))
                            }
                        />
                    </>
                )}
            </View>
        </Mainview>
    );
};

export default TwoFactorAuth;