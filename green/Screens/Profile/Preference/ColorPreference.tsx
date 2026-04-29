import React, { useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import SelectList from "./SelectList";
import Mainview from "../../../Components/mainview";
import { Colors } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectoricons";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'ColorPreference'>;

const ColorPreference: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const [value, setValue] = useState('green_up');

    const options = [
        {
            label: 'Green up, Red down',
            value: 'green_up',
            addIcon: (
                <>
                    <VectorIcons family="FontAwesome5" name="long-arrow-alt-up" iconcolor={Colors.lightgreen} />
                    <VectorIcons family="FontAwesome5" name="long-arrow-alt-down" iconcolor={Colors.pink} />
                </>
            ),
        },
        {
            label: 'Red up, Green down',
            value: 'red_up',
            addIcon: (
                <>
                    <VectorIcons family="FontAwesome5" name="long-arrow-alt-up" iconcolor={Colors.pink} />
                    <VectorIcons family="FontAwesome5" name="long-arrow-alt-down" iconcolor={Colors.lightgreen} />
                </>
            ),
        },
    ];

    return (
        <Mainview
            isheader={true}
            headertitle={"Color Preference"}
            isscollable={false}
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>
                <SelectList
                    options={options}
                    selectedValue={value}
                    onChange={(val) => setValue(val)}
                />
            </View>
        </Mainview>
    )

}

export default ColorPreference;