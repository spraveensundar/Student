import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Dashboard from "./Dashboard";
import RewardsHub from "./RewardHub";
import Text from "../../../Components/text";
import { Colors } from "../../../Utilities/uiasset";
import Mainview from "../../../Components/mainview";
import { RFvalue } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import styles from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Overview'>;

const Overview: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const [activeTab, setActiveTab] = useState("Dashboard");

    return (
        <Mainview
            isheader={true}
            isscollable={false}
            headertitle={"Overview"}
            horizontalpadding={0}
            onleftfn={() => navigation.goBack()}
        >
            <View style={[style.container, { marginBottom: "10%" }]}>
                <View style={style.tabs}>
                    {["Dashboard", "Rewards Hub"].map((tab) => (
                        <Pressable
                            key={tab}
                            // onPress={() => setActiveTab(tab)}
                            style={style.tab}
                            hitSlop={20}
                        >
                            <Text style={[{ color: activeTab === tab ? theme.darktext : Colors.grey, fontSize: RFvalue(14) }]}>
                                {tab}
                            </Text>
                            {activeTab === tab && <View style={style.underline} />}
                        </Pressable>
                    ))}
                </View>
                {
                    activeTab === "Dashboard" && (
                        <Dashboard />
                    )
                }
                {
                    activeTab === "Rewards Hub" && (
                        <RewardsHub />
                    )
                }
            </View>
        </Mainview>
    )

}

export default Overview;