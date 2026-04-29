import React from "react";
import { Clipboard, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Text from "../../../Components/text";
import Mainview from "../../../Components/mainview";
import { Button, Input } from "../../../Components/Field";
import { Toastfn } from "../../../Utilities/helerfunction";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'WebhookVerification'>;

const WebhookVerification: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const URL = "https://yourdomain.com/webhook"

    const Copydata = (data: any) => {
        Clipboard?.setString(data);
        Toastfn("Copied Successfully");

    };

    return (
        <Mainview
            isheader={true}
            isscollable={false}
            headertitle={"Security Verification"}
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>
                <Text size="medium">Webhook Created Sucessfully</Text>
                <Text style={style.setup}>Your webhook has been set up and is now active.</Text>
                <Input
                    label="Webhook URL"
                    disabled={true}
                    value={URL}
                />
                <Button
                    title="Copy URL"
                    buttonStyle={{ width: "30%", marginTop: "3%" ,paddingVertical:"2.5%"}}
                    onPress={() => Copydata(URL)}
                />
            </View>
        </Mainview>
    )

}

export default WebhookVerification;