import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import Description from "../Description";
import { Button } from "../../../Components/Field";
import Mainview from "../../../Components/mainview";
import useCustomHooks, { useApihooks } from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";
import Text from "../../../Components/text";
import { Colors } from "../../../Utilities/uiasset";
import Confirm from "./Helpers/Confirm";
import Sheet from "../../../Components/bottomsheet";
import VectorIcons from "../../../Utilities/vectoricons";
import { useLazyUpdateTwofaTypeQuery } from "../../../Slices/auth";
import useApiError from "../../../Actions/Hooks/errorhook";
import { windowwidth } from "../../../Utilities/dimensions";

interface DescriptionProps {
    title?: string;
    content?: string;
    button?: string,
    onPress?: () => void;
    subContent?: any
}

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Security'>;

const Security: React.FC<Props> = () => {
    const { theme, navigation, bottomsheetref, closebottomsheet, openbottomsheet, successtoast } = useCustomHooks();
    const style = styles(theme);

    const { mobileNumber, tfaType } = useSelector((state: any) => state.auth.userData);

    const DescriptionList: React.FC<DescriptionProps> = ({ title, content, onPress, button, subContent }) => (
        <View style={{ marginBottom: "5%" }}>
            <View style={{ paddingHorizontal: "6%" }}>
                <Description
                    title={title}
                    content={content}
                />
                {
                    subContent ? (
                        subContent
                    ) : (
                        <Button
                            title={button || "Mange"}
                            buttonStyle={style.mange}
                            onPress={onPress}
                            textStyle={{ color: theme.darktext }}
                        />
                    )
                }

            </View>

            <View style={{ borderBottomWidth: 1, borderColor: theme.boderColor }} />
        </View>
    )

    const [factor, setFactor] = useState("");
    const [updateTwofa, { data, error, isSuccess }] = useLazyUpdateTwofaTypeQuery();

    const { triggeruserdetails } = useApihooks()


    useApiError(error ?? false);

    useEffect(() => {
        if (factor) {
            updateTwofa({ type: factor });
        }
    }, [factor]);

    useEffect(() => {
        if (isSuccess && data?.message) {
            successtoast("Success", data.message);
            triggeruserdetails()

        }
    }, [isSuccess, data]);


    const typeCheck = (type: any) => {
        if (type === "google2fa") {
            return "Google"
        }
        else if (type == "email") {
            return "Email"
        }
        else {
            return "Mobile"
        }
    }

    return (
        <Mainview
            isheader={true}
            headertitle={"Security"}
            isscollable={true}
            horizontalpadding={0}
            onleftfn={() => navigation.goBack()}>
            <View style={style.container}>
                <DescriptionList
                    title="2FA"
                    // button="Setup"
                    content="Create and manage API keys to access your trading account programmatically."
                    onPress={() => navigation.navigate("TwoFactor")}
                />
                <DescriptionList
                    title="Email"
                    content="Create and manage API keys to access your trading account programmatically."
                    onPress={() => navigation.navigate("Email")}
                />
                <DescriptionList
                    title={"Phone Number"}
                    button={mobileNumber ? "Mange" : "Add"}
                    content="Create and manage API keys to access your trading account programmatically."
                    onPress={mobileNumber ? () => navigation.navigate("PhoneNumber") : () => navigation.navigate("RegisterNumber")}
                />

                <DescriptionList
                    title="Two-Factor Authentication (2FA)"
                    content="To increase your account security, it is recommended that you enable 2FA."
                    onPress={() => navigation.navigate("AccountActivity")}
                    subContent={
                        <View style={{}}>
                            <Pressable onPress={() => openbottomsheet(bottomsheetref)} style={{
                                backgroundColor: theme.card,
                                width: "30%",
                                alignItems: "center",
                                paddingVertical: "3%",
                                marginVertical: "7%",
                                borderRadius: 10, flexDirection: "row", justifyContent: "center"
                            }}>
                                <Text>{typeCheck(tfaType)}  </Text>
                                <VectorIcons
                                    name="chevron-down"
                                    family="Feather"
                                />
                            </Pressable>
                        </View>
                    }
                />

                <DescriptionList
                    title="Account Activity"
                    content="Create and manage API keys to access your trading account programmatically."
                    onPress={() => navigation.navigate("AccountActivity")}
                />
            </View>


            <Sheet
                sheetref={bottomsheetref}
                // custominterface={true}
                snappoint={["35%"]}
                headertitle="Choose Authentication"
                onClose={() => closebottomsheet(bottomsheetref)}
            >
                <View style={{ marginTop: "6%" }}>
                    <Pressable onPress={() => { setFactor("email"), closebottomsheet(bottomsheetref) }} style={style.between}>
                        <Text size="medium" style={{ color: theme.darktext }}>Email</Text>
                        <View style={[style.select, { backgroundColor: theme.theme === "dark" ? Colors.dune : tfaType === "email" ? Colors.green : theme.card, }]}>
                            {
                                tfaType === "email" && (
                                    <VectorIcons
                                        family="Octicons"
                                        name="dot-fill"
                                        iconcolor={theme.theme === "dark" ? Colors.green : Colors.white}
                                        size={windowwidth * 0.055}
                                    />
                                )
                            }
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { setFactor("google2fa"), closebottomsheet(bottomsheetref) }} style={[style.between, { paddingVertical: "4%" }]}>
                        <Text size="medium" style={{ color: theme.darktext, marginTop: "5%" }}>Google</Text>
                        <View style={[style.select, { backgroundColor: theme.theme === "dark" ? Colors.dune : tfaType === "google2fa" ? Colors.green : theme.card, }]}>
                            {
                                tfaType === "google2fa" && (
                                    <VectorIcons
                                        family="Octicons"
                                        name="dot-fill"
                                        iconcolor={theme.theme === "dark" ? Colors.green : Colors.white}
                                        size={windowwidth * 0.055}
                                    />
                                )
                            }
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { setFactor("mobile"), closebottomsheet(bottomsheetref) }} style={style.between}>
                        <Text size="medium" style={{ color: theme.darktext, marginTop: "5%" }}>Mobile</Text>
                        <View style={[style.select, { backgroundColor: theme.theme === "dark" ? Colors.dune : tfaType === "mobile" ? Colors.green : theme.card, }]}>
                            {
                                tfaType === "mobile" && (
                                    <VectorIcons
                                        family="Octicons"
                                        name="dot-fill"
                                        iconcolor={theme.theme === "dark" ? Colors.green : Colors.white}
                                        size={windowwidth * 0.055}
                                    />
                                )
                            }
                        </View>
                    </Pressable>
                </View>

            </Sheet>


        </Mainview>
    )

}

export default Security;