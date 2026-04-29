import React, { useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import SelectList from "./SelectList";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Currency'>;

const Currency: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const [currency, setCurrency] = useState('inr');
    return (
        <Mainview
            isheader={true}
            headertitle={"Currency"}
            isscollable={false}
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>
                <SelectList
                    selectedValue={currency}
                    onChange={(val) => setCurrency(val)}
                    options={[
                        { label: 'INR', value: 'inr' },
                        { label: 'USDT', value: 'usdt' },
                    ]}
                />
            </View>
        </Mainview>
    )

}

export default Currency;