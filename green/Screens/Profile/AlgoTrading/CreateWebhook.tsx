import React, { useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Button, Dropdown, Input } from "../../../Components/Field";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";
import Card from "../../../Components/Card";
import Text from "../../../Components/text";
import { Colors, Fontsize } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectoricons";
import { windowheight } from "../../../Utilities/dimensions";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'CreateWebhook'>;

const CreateWebhook: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const dropdownData = [
        { label: "Main", value: "1" },
        { label: "Sub Account 2", value: "2" },
        { label: "Sub Account 3", value: "3" },
    ];

    const source = [
        { label: "Trading View", value: "1" },
        { label: "Sub Account 2", value: "2" },
        { label: "Sub Account 3", value: "3" },
    ];

    return (
        <Mainview
            isheader={true}
            isscollable={false}
            headertitle={"Create Webhook"}
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>

                <Input
                    label="Webhook Name"
                    placeHolder="Greenx"
                />

                <Dropdown
                    list={dropdownData}
                    label="Account Name"
                />

                <Dropdown
                    list={source}
                    label="Source"
                />

                <Card containerStyle={style.webhooks}>
                    <View style={style.row}>
                        <VectorIcons
                            family="Feather"
                            name="alert-circle"
                            size={18}
                            iconcolor={Colors.orange}
                        />
                        <Text size="small" style={style.webhooksText}>  2FA is mandatory to create Webhooks</Text>
                    </View>
                    <Button
                        title="Setup 2FA"
                        buttonStyle={[style.submitButton, { height: windowheight * 0.035 }]}
                        textStyle={{ letterSpacing: 1.2, fontSize: Fontsize.semismall }}
                        onPress={() => navigation.navigate("Security")}
                    />
                </Card>

                <View style={style.bottomButton}>
                    <View style={{ alignItems: "center", marginBottom: "5%" }}>
                        <Input
                            type="checkbox"
                            label="I acknowledge and understand the risks"
                        />
                    </View>
                    <Button
                        title="Create Webhook"
                        onPress={() => navigation.navigate("Webhook2FA")}
                    />
                </View>
            </View>
        </Mainview>
    )

}

export default CreateWebhook;