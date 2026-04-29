import React, { useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Button, Dropdown, Input } from "../../../Components/Field";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";
import Text from "../../../Components/text";
import { Colors } from "../../../Utilities/uiasset";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'APIKeys'>;

const APIKeys: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    return (
        <Mainview
            isheader={true}
            isscollable={false}
            headertitle={"API Key"}
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>
                <Text size="medium">API Key</Text>
                <Text style={{ color: Colors.warmgrey, marginTop: "3%" }}>Create and manage API keys to access your trading account programmatically.</Text>
                <Button
                    title="Create API Key"
                    buttonStyle={style.bottomButton}
                    onPress={() => navigation.navigate("CreateAPIKey")}
                />
            </View>
        </Mainview>
    )

}

export default APIKeys;