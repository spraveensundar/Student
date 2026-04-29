

import React, { useState } from "react"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import { ScrollView, View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";
import Mainview from "../../../Components/mainview";
import Copyprofile from "../copyprofile";
import Toptabs from "../../../Components/toptabs";
import Insights from "./insights";
import Configuration from "./Configuration";
import Order from "./Order";


type Props = NativeStackScreenProps<Stacknavigationtypes, 'Tradedetail'>;

const Tradedetail: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks()
    const [activeindex, setActiveindex] = useState(0)

    return (
        <Mainview
            headertitle={"Copy Trade Detail"}
            isscollable={false}
            onleftfn={() => navigation?.goBack()}
        >
            <Copyprofile />

            <Toptabs
                tabs={["Insights", "Configuration", "Order"]}
                activeindex={activeindex}
                onchangeindex={setActiveindex}
                top={"5%"}
            />
            <View style={{ flex: 1 }} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {activeindex == 0 &&
                        <Insights />
                    }
                    {
                        activeindex == 1 &&
                        <Configuration />
                    }
                    {
                        activeindex == 2 &&
                        <Order />
                    }
                </ScrollView>
            </View>


        </Mainview>
    )

}

export default Tradedetail