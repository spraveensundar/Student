import React, { useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import SelectList from "./SelectList";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Pushnotification'>;

const Pushnotification: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const [value, setValue] = useState('order_fill');
    return (
        <Mainview
            isheader={true}
            headertitle={"Push Notification"}
            isscollable={false}
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>
                <SelectList
                    options={[
                        { label: 'Order Fill', value: 'order_fill' },
                        { label: 'Liquidation', value: 'liquidation' },
                        { label: 'Stop Order Trigger', value: 'stop_trigger' },
                        { label: 'Order Cancel', value: 'cancel' },
                        { label: 'Price Alert', value: 'alert' },
                        { label: 'Marketing', value: 'marketing' },
                    ]}
                    selectedValue={value}
                    onChange={(val) => setValue(val)}
                />
            </View>
        </Mainview>
    )

}

export default Pushnotification;