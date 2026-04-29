import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Mainview from "../../../Components/mainview";
import { Button, Input } from "../../../Components/Field";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Webhook2FA'>;

const Webhook2FA: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    return (
        <Mainview
            isheader={true}
            isscollable={false}
            headertitle={"Security Verification"}
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>
                <Input
                    label="Enter Email Verification Code"
                    placeHolder="895623"
                />
                <Input
                    label="2FA Code"
                    placeHolder="895623"
                />
                <View style={style.bottomButton}>
                    <View style={style.between}>
                        <Button
                            title="Cancel"
                            style={[style.buttonContainer, { backgroundColor: "#2B2D32" }]}
                            onPress={() => navigation.goBack()}
                        />
                        <Button
                            title="Submit"
                            style={style.buttonContainer}
                            onPress={() => navigation.navigate("WebhookVerification")}
                        />
                    </View>
                </View>
            </View>
        </Mainview>
    )

}

export default Webhook2FA;