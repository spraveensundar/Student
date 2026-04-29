import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Text from "../../../Components/text";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Button, Dropdown, Input } from "../../../Components/Field";
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes";

import styles from "./styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'RCTransfer'>;

const RCTransfer: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    return (
        <Mainview
            isheader={true}
            isscollable={true}
            headertitle="RC Transfer"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={style.buttonContainer}>
                    <Button
                        title="Next"
                        onPress={() => navigation.navigate("RCDocument")}
                    />
                </View>
            }

        >
            <View style={[style.container]}>
                <Text size="xxmedium" family="GMedium" style={{ marginBottom: 10 }}>Vehicle Details</Text>
                <Input
                    label={"Owner Name"}
                    placeHolder="Full Name "
                />

                <Input
                    label={"Vehicle Registration Number"}
                    placeHolder="Enter Vehicle Registration Number"
                />

                <Input
                    label={"Vehicle Type"}
                    placeHolder="Choose Vehicle type "
                />

                <Input
                    label={"Vehicle Model"}
                    placeholder="Choose Vehicle model"
                />

                <Dropdown
                    label="State"
                    placeholder="Choose State"
                />

                <Dropdown
                    label="RTO"
                    placeholder="Choose RTO"
                    position="top"
                />

            </View>
        </Mainview>
    )

}

export default RCTransfer;