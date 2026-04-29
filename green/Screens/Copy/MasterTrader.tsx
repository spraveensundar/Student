import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import React, { useState } from "react";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Mainview from "../../Components/mainview";

import { Pressable, StyleSheet, View } from "react-native";
import { Button, Dropdown, FileUpload, Input, Textarea } from "../../Components/Field";


type Props = NativeStackScreenProps<Stacknavigationtypes, 'MasterTrader'>;


const MasterTrader: React.FC<Props> = () => {
    const { theme, navigation, bottomsheetref, openbottomsheet } = useCustomHooks();
    const styles = style(theme)

    const [image, setImage] = useState<{ uri: string } | false | undefined>(undefined);

    return (
        <Mainview
            isscollable={true}
            headertitle={"Master Trader"}
            bottomContent={
                <View style={{ marginHorizontal: "6%" }}>
                    <Button
                        title="Submit"
                        buttonStyle={{ marginTop: "2%" }}
                    />
                </View>
            }
            onleftfn={() => navigation.goBack()}
        >
            <Input
                label="Name"
                placeholder="Enter Your Name"
            />

            <Dropdown
                label="Select your pairs"
                placeholder={"Pairs"}
            />

            <FileUpload
                source="sheet"
                label="Upload profile photo"
                mediaData={image}
                onChange={(data) => {
                    setImage(data);
                }}
            />

            <Input
                label="Minimum Invest (USDT)"
                placeholder="Enter Your mininvest"
            />

            <Input
                label="Minimum Invest (%)"
                placeholder="Enter Your mininvest"
            />

            <Input
                label="Copy trade fee (%)"
                placeholder="Enter your copty trade fee"
            />

            <Input
                label="LinkedIn"
                placeholder="Enter your linkedin URL"
            />

            <Input
                label="Twitter"
                placeholder="Enter your twitter URL"
            />

            <Input
                label="Telegram"
                placeholder="Enter your telegram URL"
            />

            <Input
                label="Binance"
                placeholder="Enter your binance URL"
            />

            <Input
                label="Coinbase"
                placeholder="Enter your coinbase URL"
            />

            <Input
                label="Bybit"
                placeholder="Enter your bybit URL"
            />

            <Textarea
                label="Description"
                placeholder="Enter your description"
            />

        </Mainview>
    )

}

export default MasterTrader


const style = (theme: any) => StyleSheet.create({
    activetab: {
        width: "45%",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: theme.tabactive,
        height: "100%"
    },
    inactivetab: {
        width: "45%",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    }
})