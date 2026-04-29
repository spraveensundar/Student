import React, { useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import SelectList from "./SelectList";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'ConfirmMessage'>;

const ConfirmMessage: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const [value, setValue] = useState('limit_order');
    return (
        <Mainview
            isheader={true}
            headertitle={"Confirmation Message"}
            isscollable={false}
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>
                <SelectList
                    options={[
                        { label: 'Limit Order', value: 'limit_order' },
                        { label: 'Market Order', value: 'market_order' },
                        { label: 'Stop Market Order', value: 'stop_market_order' },
                        { label: 'Stop Limit Order', value: 'stop_limit_order' },
                        { label: 'Trailing Stop Order', value: 'trailing_stop_order' },
                        { label: 'Take Profit Limit Order', value: 'take_profit_limit' },
                    ]}
                    selectedValue={value}
                    onChange={(val) => setValue(val)}
                />
            </View>
        </Mainview>
    )

}

export default ConfirmMessage;