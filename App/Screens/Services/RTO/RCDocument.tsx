import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import { Button } from "../../../Components/Field";
import Mainview from "../../../Components/mainview";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes";

import styles from "./styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'RCDocument'>;

const RCDocument: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    return (
        <Mainview
            isheader={true}
            isscollable={false}
            headertitle="RC Transfer"
            lefticon={false}
            bottomContent={
                <View style={style.buttonContainer}>
                    <Button
                        title="Go to home"
                        onPress={() => navigation.navigate("Bottomtab")}
                    />
                </View>
            }
        >
            <View style={[style.container, { alignItems: "center", justifyContent: "center" }]}>
                <Images
                    type="svg"
                    name="Search"
                    width={windowwidth * 0.50}
                    height={windowwidth * 0.50}
                />
                <Text size="medium" style={{ marginVertical: "2%", marginTop: "3%" }} family="GBold">Your document was upload successfully !</Text>
                <Text style={{ width: "80%", textAlign: "center" }} family="GRegular" size="medium">Your document has been received and is currently under review. This process may take some time. We’ll notify you once the verification is complete.</Text>
            </View>
        </Mainview>
    )

}

export default RCDocument;