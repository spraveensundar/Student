import React, { useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Fills from "./Sections/Fills";
import Text from "../../Components/text";
import Balances from "./Sections/Balances";
import StopOrder from "./Sections/StopOrder";
import Positions from "./Sections/Positions";
import { futureOption } from "../Option/data";
import OpenOrders from "./Sections/OpenOrders";
import { Colors } from "../../Utilities/uiasset";
import Mainview from "../../Components/mainview";
import OrderHistory from "./Sections/OrderHistory";
import CloseHistory from "./Sections/CloseHistory";
import Flexcomponent from "../../Components/flexcomponent";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Currencyswitch from "../../Components/currencyswitch";
import SelectItem from "../Profile/Security/Helpers/SelectItem";
import { BottomTabParamList } from "../../Navigations/navigationtypes";

import { styles } from "./styles";
import Options from "./Components/Options";
import VectorIcons from "../../Utilities/vectoricons";
import { windowwidth } from "../../Utilities/dimensions";

type Props = NativeStackScreenProps<BottomTabParamList, 'Portfolio'>;

const Portfolio: React.FC<Props> = () => {
    const { theme, bottomsheetref, closebottomsheet, navigation } = useCustomHooks();
    const style = styles(theme);

    const FutureId = useRef("all");
    const { futureTradePair, wallet } = useSelector((state: any) => state.future);
    const [activeindex, setActive] = useState(0);
    const [tradeMode, setTradeMode] = useState('all');
    const [selectedTab, setSelectedTab] = useState('all');
    const [activeTab, setActiveTab] = useState("Balances");

    return (
        <Mainview
            isheader={false}
            isbottomtab={true}
            horizontalpadding={0}
            isscollable={false}
        >
            <View style={{ flex: 1 }}>
                <Flexcomponent top={"2.5%"} justifyContent="space-between" alignItems="center" style={{ paddingHorizontal: 20 }}>
                    <Text size="medium" family="medium">Portfolio</Text>
                    <Currencyswitch
                        index={activeindex}
                        onchangeindex={(index: number) => setActive(index)}
                    />
                </Flexcomponent>
                <View style={style.container}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {["Balances", "Positions", "Open Orders", "Stop Orders", "Fills", "Close History", "Order History"].map((tab) => (
                            <Pressable
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                style={style.tab}
                                hitSlop={20}
                            >
                                <Text family="medium" style={[{ color: activeTab === tab ? theme.darktext : Colors.grey }]}>{tab}</Text>
                                {activeTab === tab && <View style={style.tabContent} />}
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
                <View style={{ flex: 1 }}>
                    {
                        activeTab !== "Balances" && (
                            <>
                                <Options
                                    ref={bottomsheetref}
                                    tab={activeTab}
                                    active={selectedTab}
                                />
                                {
                                    activeTab === "Positions" && (
                                        <View style={{ flexDirection: "row", paddingHorizontal: 20, justifyContent: "flex-start", marginBottom: 10 }}>
                                            <VectorIcons family="Lucide" name="sigma" size={windowwidth * 0.050} />
                                            <Text size="semimedium" family="medium"> Total UPNL <Text color={wallet?.unRealizedPnL > 0 ? Colors.green : Colors.red}>{(wallet?.unRealizedPnL)?.toFixed(2)} USD</Text></Text>
                                        </View>
                                    )
                                }
                            </>


                        )
                    }
                    {
                        activeTab === "Balances" && (
                            <Balances />
                        )
                    }
                    {
                        activeTab === "Positions" && (
                            <Positions
                                futureId={FutureId}
                                tradeMode={tradeMode}
                            />
                        )
                    }
                    {
                        activeTab === "Open Orders" && (
                            <OpenOrders
                                futureId={FutureId}
                                tradeMode={tradeMode}
                            />
                        )
                    }
                    {
                        activeTab === "Stop Orders" && (
                            <StopOrder
                                futureId={FutureId}
                                tradeMode={tradeMode}
                            />
                        )
                    }
                    {
                        activeTab === "Fills" && (
                            <Fills
                                futureId={FutureId}
                                tradeMode={tradeMode}
                            />
                        )
                    }
                    {
                        activeTab === "Order History" && (
                            <OrderHistory
                                futureId={FutureId}
                                tradeMode={tradeMode}
                            />
                        )
                    }
                    {
                        activeTab === "Close History" && (
                            <CloseHistory
                                futureId={FutureId}
                                tradeMode={tradeMode}
                            />
                        )
                    }
                </View>
            </View>
            <SelectItem
                value={tradeMode}
                ref={bottomsheetref}
                onSelect={(value) => {
                    if (value === "all") {
                        setTradeMode("all");
                        FutureId.current = "all";
                        setSelectedTab("All")
                    } else if (value === "currentContract") {
                        setTradeMode(futureTradePair.tradeMode);
                        FutureId.current = futureTradePair?._id;
                        setSelectedTab("Current Contract")
                    } else if (value === "options") {
                        setTradeMode("options");
                        setSelectedTab("Options")
                        FutureId.current = "all";
                    } else if (value === "futures") {
                        setTradeMode("future");
                        FutureId.current = "all";
                        setSelectedTab("Futures")
                    }
                }}
                cancel={() => closebottomsheet(bottomsheetref)}
                data={futureOption}
            />
        </Mainview>
    )
}

export default Portfolio;