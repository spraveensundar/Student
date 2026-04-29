import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import ListItem from "../ListItem";
import { icons } from "../../../Utilities/images";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";
import { styles } from "../styles";


type Props = NativeStackScreenProps<Stacknavigationtypes, 'Features'>;

const Features: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    return (
        <Mainview
            isheader={true}
            isscollable={false}
            headertitle="Features"
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>
                <ListItem icon={icons.Book} title="User Guide" />
                {/* <ListItem icon={icons.Demo} title="Demo Trading" /> */}
                <ListItem icon={icons.Megaphone} title="Announcement" />
                <ListItem icon={icons.Youtube} title="Youtube Tutorial" />
            </View>
        </Mainview>
    )

}

export default Features;