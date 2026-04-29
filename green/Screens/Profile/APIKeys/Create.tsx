import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Text from "../../../Components/text";
import Instructions from "./Instructions";
import Mainview from "../../../Components/mainview";
import { Colors } from "../../../Utilities/uiasset";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Button, Dropdown, Input } from "../../../Components/Field";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'CreateAPIKey'>;

const CreateAPIKey: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const [selected, setSelected] = React.useState<string[]>([]);

    const dropdownData = [
        { label: "Main", value: "1" },
        { label: "Sub Account 2", value: "2" },
        { label: "Sub Account 3", value: "3" },
    ];

    return (
        <Mainview
            isheader={true}
            isscollable={true}
            headertitle={"Create API Key"}
            scrollprops={{
                contentContainerStyle: {
                    flexGrow: 1
                }
            }}
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>
                <Text size="medium">API Key</Text>
                <Text style={{ color: Colors.warmgrey, marginTop: "3%", marginBottom: "10%" }}>Create and manage API keys to access your trading account programmatically.</Text>

                <Dropdown
                    list={dropdownData}
                    label="Account Name"
                />
                <Input
                    label="API Key Name"
                    placeHolder="GRE78956"
                />

                <Input
                    label="Secret Key "
                    placeHolder="GRE78956"
                />

                <Text size="medium" style={{ marginTop: "5%" }}>API Key Instructions</Text>
                <Text style={{ color: Colors.warmgrey, marginTop: "3%", marginBottom: "10%" }}>Create and manage API keys to access your trading account programmatically.</Text>


                <Instructions
                    options={[
                        { label: "Enable Readings ", value: "1" },
                        { label: "Enable Spot & Margin", value: "2" },
                        { label: "Enable Derivative & Future tradings", value: "3" },
                        { label: "Enable Reading", value: "4" }
                    ]}
                    selectedValues={selected}
                    onChange={setSelected}
                />

                <Button
                    title="Submit"
                    buttonStyle={{ marginVertical: "10%" }}
                    onPress={() => navigation.goBack()}
                />
            </View>
        </Mainview>
    )

}

export default CreateAPIKey;