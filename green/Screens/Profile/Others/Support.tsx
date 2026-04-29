import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Text from "../../../Components/text";
import Mainview from "../../../Components/mainview";
import { Colors } from "../../../Utilities/uiasset";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Support'>;

const Support: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    return (
        <Mainview
            isheader={true}
            isscollable={false}
            headertitle="Support"
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>
                <Text size="medium">Our Support Team</Text>
                <Text style={{ color: Colors.warmgrey, marginTop: "3%" }}>Encourage users to invite friends to the platform and reward them with trading bonuses or wallet credits when their friends join and trade.</Text>
                <View style={style.bottomButton}>
                    <Text family="semiBold" size="medium" style={{ color: Colors.orange }}>Get more info ?</Text>
                </View>
            </View>
        </Mainview>
    )

}

export default Support;