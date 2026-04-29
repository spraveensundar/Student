import React, { useState } from "react"
import { FlatList, Pressable, StyleProp, View, ViewStyle } from "react-native"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import LinearGradient from "react-native-linear-gradient"
import Text from "../../../Components/text"
import { Colors, Fontsize } from "../../../Utilities/uiasset"
import Flexcomponent from "../../../Components/flexcomponent"
import Card from "../../../Components/Card"
import VectorIcons from "../../../Utilities/vectoricons"
import Linecomponent from "../../../Components/line"
import { windowheight, windowwidth } from "../../../Utilities/dimensions"

interface Orderprops {

}

export interface TradeCardData {
    id?: any;
    initials?: string;
    name?: string;
    registered?: string;
    status?: 'Open' | 'Closed';
    product?: string;
    market?: string;
    side?: 'BUY' | 'SELL';
    size?: string;
    price?: string;
    amount?: string;
    value?: string;
}


export const dummyTradeData: TradeCardData[] = [
    {
        id: '1',
        initials: 'GX',
        name: 'GreenX',
        registered: 'Registered 190 days 0 hours ago',
        status: 'Open',
        product: 'SPOT',
        market: 'ICP/USDT',
        side: 'BUY',
        size: '931 ICP',
        price: '6.25',
        amount: '131.25/4523',
        value: '0.00000',
    },
    {
        id: '2',
        initials: 'GX',
        name: 'GreenX',
        registered: 'Registered 190 days 0 hours ago',
        status: 'Open',
        product: 'SPOT',
        market: 'ICP/USDT',
        side: 'BUY',
        size: '931 ICP',
        price: '6.25',
        amount: '131.25/4523',
        value: '0.00000',
    },
    {
        id: '3',
        initials: 'RT',
        name: 'RedTrader',
        registered: 'Registered 45 days 2 hours ago',
        status: 'Closed',
        product: 'SPOT',
        market: 'BTC/USDT',
        side: 'SELL',
        size: '0.5 BTC',
        price: '27120.00',
        amount: '0.5/0.5',
        value: '13560.00',
    },
];



const Order: React.FC<Orderprops> = () => {
    const { theme } = useCustomHooks();



    const TradeCard = ({ data }: { data: TradeCardData }) => {
        return (
            <Card containerStyle={{ marginBottom: "5%", padding: "5%", borderRadius: 20 }}>
                {/* Header Row */}
                <View style={{ backgroundColor: theme.theme === "dark" ? "#1A1C1F" : Colors.white, borderRadius: 20, flexDirection: "row", alignItems: "center", padding: "4%" }}>
                    <View style={{ width: windowwidth * 0.15, height: windowwidth * 0.15, borderRadius: 100, alignItems: "center", justifyContent: "center", backgroundColor: "#C7B67D" }}>
                        <Text size="medium" color={Colors.black} family="semiBold">{data.initials}</Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text>{data.name}</Text>
                        <Text style={{ color: Colors.grey }} fontSize={12}>{data.registered}</Text>
                        <Text fontSize={12}>Status - <Text style={{ color: Colors.green }}>{data.status}</Text></Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: '8%', width: "100%" }}>
                    <View style={{ flex: 1, alignItems: "flex-start" }}>
                        <Text style={{ color: theme.darktext }}>{data.product}</Text>
                        <Text style={{ color: Colors.grey }}>Product</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-start" }}>
                        <Text style={{ color: theme.darktext }}>{data.market}</Text>
                        <Text style={{ color: Colors.grey }}>Market</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-start" }}>
                        <Text style={{ color: theme.darktext }}>        {data.side}</Text>
                        <Text style={{ color: Colors.grey }}>         Side</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Text style={{ color: theme.darktext }}>{data.size}</Text>
                        <Text style={{ color: Colors.grey }}>Size</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: '5%', width: "100%" }}>
                    <View style={{ flex: 1, alignItems: "flex-start" }}>
                        <Text style={{ color: theme.darktext }}>{data.price}</Text>
                        <Text style={{ color: Colors.grey }}>Price</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-start" }}>
                        <Text style={{ color: theme.darktext }}>{data.amount}</Text>
                        <Text style={{ color: Colors.grey }}>Amount</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-start" }}>
                        <Text style={{ color: theme.darktext }}>{data.value}</Text>
                        <Text style={{ color: Colors.grey }}>Value</Text>
                    </View>
                </View>
            </Card>
        );
    };

    return (
        <View style={{ flex: 1, marginTop: "5%" }}  >

            <FlatList
                data={dummyTradeData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TradeCard data={item} />}

            />
        </View>
    )

}

export default Order;