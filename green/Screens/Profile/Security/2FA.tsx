import React, { useEffect, useState } from "react";
import { Clipboard, Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import QRCode from "react-native-qrcode-svg";

import Card from "../../../Components/Card";
import Mainview from "../../../Components/mainview";
import VectorIcons from "../../../Utilities/vectoricons";
import { Button, Input } from "../../../Components/Field";
import { Toastfn } from "../../../Utilities/helerfunction";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";
import { useSelector } from "react-redux";
import { authSelector, useDisabletwofaMutation, useEnabletwofaMutation, useLazyTwofactorauthsetupQuery } from "../../../Slices/auth";
import useApiError from "../../../Actions/Hooks/errorhook";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'TwoFactor'>;

const TwoFactor: React.FC<Props> = () => {
    const { theme, navigation, failuretoast, successtoast } = useCustomHooks();
    const style = styles(theme);
    const security_code = "UF2W734DW2MYGZNYFNN2WG"
    const { userData } = useSelector(authSelector);
    console.log(userData, "userData");
    const [twofactorauthsetup, { data }] = useLazyTwofactorauthsetupQuery()
    console.log(data, "twofactorauthsetup");
    const fetchtowfa = data?.result?.data ?? ""

    useEffect(() => {
        twofactorauthsetup(true)
    }, [])


    const Copydata = (data: any) => {
        Clipboard?.setString(data);
        Toastfn("Copied Successfully");
    };
    const [otp, setOtp] = useState("")
    const [ischeck, setCheck] = useState(false)

    const [enabletwofa, { data: enableres, isLoading: enableload, error: enableerror }] = useEnabletwofaMutation()
    const [disabletwofa, { data: disableres, isLoading: disableload, error: disableerror }] = useDisabletwofaMutation()

    useApiError(enableerror)
    useApiError(disableerror)

    const submit = async () => {
        if (!ischeck) {
            failuretoast("Failure!", "Please verify the secret code before continuing.")
        }
        else if (!otp) {
            failuretoast("Failure!", "Authentication code is requried")
        }

        else if (otp?.length < 6) {
            failuretoast("Failure!", "Enter valid Authentication code")
        }
        else {
            const payload = {
                secret: fetchtowfa?.secret,
                uri: fetchtowfa?.uri,
                checkValue: true,
                code: otp
            }
            let response
            response = !fetchtowfa?.enable ? await enabletwofa(payload).unwrap() : await disabletwofa(payload).unwrap()
            console.log(response, "response");
            if (response?.success) {
                navigation?.goBack()
                successtoast("success!", `Google 2fa updated successfully`)
            }
        }
    }
    return (
        <Mainview
            isheader={true}
            headertitle={"2FA"}
            isscollable={true}
            scrollprops={{
                contentContainerStyle: {
                    flexGrow: 1
                }
            }}
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>

                <View style={style.qrContainer}>
                    <Card containerStyle={style.qr}>
                        <QRCode
                            value={fetchtowfa?.uri}
                            size={windowwidth * 0.50}
                        />
                    </Card>
                </View>

                <Input
                    label="Your 32 Digit Security Code"
                    value={fetchtowfa?.secret}
                    disabled={true}
                    rightContent={
                        <Pressable style={{ marginLeft: "2%" }} onPress={() => Copydata(fetchtowfa?.secret)}>
                            <VectorIcons
                                family="Ionicons"
                                name="copy-outline"
                                size={18}
                            />
                        </Pressable>
                    }
                />

                <Input
                    label="Enter 6 Digit Google Authentication Code"
                    placeHolder="Ex 896523"
                    value={otp}
                    onChange={(text) => setOtp(text)}
                    keyboardType="number-pad"
                    maxLength={6}
                    inputprops={{
                        maxLength: 6
                    }}
                />

                <View style={{ marginTop: "5%" }}>
                    <Input
                        type="checkbox"
                        label="I Have Backed Up The Secret Code"
                        value={ischeck}
                        onChange={setCheck}
                        boxstyle={{
                            borderWidth:1,
                            borderColor:theme.boderColor
                        }}

                    />
                </View>

                <Button
                    title={fetchtowfa?.enable ? "Disable" : "Enable"}
                    buttonStyle={style.bottomButton}
                    onPress={() => submit()}
                    loading={fetchtowfa?.enable ? disableload : enableload}
                />

            </View>
        </Mainview>
    )

}

export default TwoFactor;