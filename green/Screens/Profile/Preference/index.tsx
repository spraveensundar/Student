import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import ListItem from "../ListItem";
import Text from "../../../Components/text";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Preference'>;

const Preference: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    return (
        <Mainview
            isheader={true}
            headertitle={"Preference"}
            isscollable={true}
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>
                {/* <ListItem title="Language"
                    rightContent={
                        <View style={style.language}>
                            <Text style={{ color: "#646D79" }}>English</Text>
                        </View>
                    }
                /> */}
                <ListItem title="Currency" onPress={() => navigation.navigate("Currency")} />
                {/* <ListItem title="Color Preference" onPress={() => navigation.navigate("ColorPreference")} /> */}
                <ListItem title="Push notification" onPress={() => navigation.navigate("Pushnotification")} />
                <ListItem title="Confirmation Message" onPress={() => navigation.navigate("ConfirmMessage")} />
            </View>
        </Mainview>
    )

}

export default Preference;