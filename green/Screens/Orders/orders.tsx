import React, { useState } from "react"
import Mainview from "../../Components/mainview"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../../Navigations/navigationtypes";
import Card from "../../Components/Card";
import { windowheight, windowwidth } from "../../Utilities/dimensions";
import theme from "../../Utilities/theme";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { Pressable, ScrollView, View } from "react-native";
import Flexcomponent from "../../Components/flexcomponent";
import Images from "../../Utilities/images";
import VectorIcons from "../../Utilities/vectoricons";
import { Dropdown, Input } from "../../Components/Field";
import Text from "../../Components/text";
import { FlatList } from "react-native-gesture-handler";
import { Colors } from "../../Utilities/uiasset";


type Props = NativeStackScreenProps<BottomTabParamList, 'Orders'>;

const Orders: React.FC<Props> = () => {

    const { theme, navigation } = useCustomHooks()
    const [assetHistory, setAssetHistory] = useState(false)

    const list = [
        { contract: "BTCUSD", value: "Funding", balance: "143.25623", amount: "0.0351586", date: "Sep 18 2025, 05:31:22 PM" },
        { contract: "BTCUSD", value: "Funding", balance: "143.25623", amount: "0.0351586", date: "Sep 18 2025, 05:31:22 PM" },
        { contract: "BTCUSD", value: "Funding", balance: "143.25623", amount: "0.0351586", date: "Sep 18 2025, 05:31:22 PM" },
    ];

    const Orderlist = [
        { name: "Symbol", contract: "BTCUSD", type: "Buy", qty: "1", remaining: "1/0" },
        { name: "Side", contract: "BTCUSD", type: "Buy", qty: "2", remaining: "1/0" },
        { name: "Qty (Lot)", contract: "BTCUSD", type: "Buy", qty: "1", remaining: "1/0" },
        { name: "Filled/Remaining", contract: "BTCUSD", type: "Buy", qty: "1", remaining: "1/0" },
    ];

    const columns = [] = ["Symbol", "Side", "Qty", "Filled/Remaining"];

    return (
        <Mainview
            isheader={false}
            isbottomtab={true}
        >

            <View style={{ flex: 1 }}>

                <Input
                    type="search"
                    label=""
                    placeHolder="Search contracts"

                    leftContent={
                        <VectorIcons
                            family="Feather"
                            name={"search"}
                            size={windowwidth * 0.05}

                        />
                    }
                />

                <Flexcomponent justifyContent="flex-start" alignItems="center" >

                    <Pressable onPress={() => setAssetHistory(!assetHistory && true)} style={{ height: "auto", justifyContent: "center", alignItems: "center", width: "auto", }}>
                        <Card containerStyle={{ justifyContent: "center", alignItems: "center", padding: 10, backgroundColor: !assetHistory ? "#fff" : "#202225" }}>
                            <Text
                                family="regular"
                                size="small"
                                style={{ paddingHorizontal: 15, }}
                                color={assetHistory ? "#fff" : "#202225"}>Asset History</Text>
                        </Card>
                    </Pressable>


                    <Pressable onPress={() => setAssetHistory(!assetHistory && true)} style={{ height: "auto", justifyContent: "center", alignItems: "center", width: "auto", marginLeft: 10, }}>
                        <Card containerStyle={{ justifyContent: "center", alignItems: "center", padding: 10, backgroundColor: assetHistory ? "#fff" : "#202225" }}>
                            <Text
                                family="regular"
                                size="small"
                                style={{ paddingHorizontal: 15, }}
                                color={!assetHistory ? "#fff" : "#202225"}
                            >Order History</Text>
                        </Card>
                    </Pressable>


                </Flexcomponent>

                <Flexcomponent justifyContent="space-between" alignItems="center" style={{ width: "100%", paddingTop: "5%" }}>

                    <Pressable style={{ flex: 0.3, backgroundColor: theme.card, borderRadius: 8, padding: 10, flexDirection: "row", height: "auto", justifyContent: "center", width: "auto", }}>

                        <Text
                            family="regular"
                            size="small"
                        >Filter</Text>

                        <VectorIcons
                            family="Ionicons"
                            name={"chevron-down-outline"}
                            size={windowwidth * 0.05}
                            style={{ marginLeft: 5 }}
                        />

                    </Pressable>


                    <View style={{ flex: 0.6, flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>

                        <Pressable style={{ backgroundColor: theme.card, borderRadius: 8, padding: 10, flexDirection: "row", height: "auto", justifyContent: "flex-end", width: "auto", }}>

                            <Text
                                family="regular"
                                size="small"
                            >Order History</Text>

                            <VectorIcons
                                family="Feather"
                                name={"download"}
                                size={windowwidth * 0.045}
                                style={{ marginLeft: 5 }}
                            />

                        </Pressable>
                        {!assetHistory ?
                            <Card containerStyle={{ justifyContent: "flex-end", padding: 5, width: "auto", marginLeft: 10, backgroundColor: theme.card, }}>
                                <VectorIcons
                                    family="Feather"
                                    name={"mail"}
                                    iconcolor={theme.darktext}
                                    size={windowwidth * 0.05}
                                />
                            </Card>
                            : ""}
                    </View>


                </Flexcomponent>

                {!assetHistory ?
                    <FlatList
                        data={list}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ marginTop: 20, }}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Card containerStyle={{ padding: 15, marginBottom: 10, backgroundColor: theme.card, }}>

                                <Flexcomponent justifyContent="space-between" alignItems="center" >
                                    <View style={{ flex: 0.5, }}>
                                        <Text family="regular" size="semimedium" color={Colors.graytext} >Contract</Text>
                                        <Text family="medium" size="semimedium" style={{ marginTop: 3 }} >{item?.contract}</Text>
                                    </View>
                                    <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                                        <Text family="regular" size="semimedium" color={Colors.graytext} >Type</Text>
                                        <Text family="medium" size="semimedium" style={{ marginTop: 3 }} >{item?.value}</Text>
                                    </View>

                                </Flexcomponent>

                                <Flexcomponent justifyContent="space-between" alignItems="center" style={{ marginTop: 10 }} >
                                    <View style={{ flex: 0.5, }}>
                                        <Text family="regular" size="semimedium" color={Colors.graytext} >Amount</Text>
                                        <Text family="medium" size="semimedium" style={{ marginTop: 3 }}>{item?.contract}</Text>
                                    </View>
                                    <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                                        <Text family="regular" size="semimedium" color={Colors.graytext} >Wallet Balance</Text>
                                        <Text family="medium" size="semimedium" style={{ marginTop: 3 }}>{item?.value}</Text>
                                    </View>

                                </Flexcomponent>

                                <Text family="regular" size="small" color="#9899A0" style={{ width: "60%", textAlign: "center", padding: 6, marginTop: 10, backgroundColor: theme.datebgColor, borderRadius: 5, }} >{item?.date}</Text>

                            </Card>
                        )}
                        ListEmptyComponent={() => (

                            <View style={{ height: windowheight * 0.5, justifyContent: "center", alignItems: "center", }} >
                                <Text family="medium" size="small" style={{ marginTop: 10 }} >No Data Found</Text>
                            </View>

                        )}>

                    </FlatList>

                    :

                    <>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
                            <View style={{ flex: 1, minWidth: columns.length * 120, marginLeft: -25 }} >

                                {/* Header */}
                                <Flexcomponent
                                    alignItems="center"
                                    justifyContent="flex-start"
                                    style={{
                                        width: "100%",
                                        paddingVertical: 8,
                                        marginTop: 20,
                                        borderBottomWidth: 0.5,
                                        borderColor: Colors.graytext,
                                    }}
                                >
                                    {columns.map((col, index) => (
                                        <Text
                                            key={index}
                                            family="regular"
                                            size="semimedium"
                                            color={Colors.warmgrey}
                                            style={{
                                                width: 120,        // 👈 same width as row
                                                textAlign: "center", // 👈 same alignment as row
                                                fontWeight: "600",
                                            }}
                                        >
                                            {col}
                                        </Text>
                                    ))}
                                </Flexcomponent>

                                {/* FlatList */}
                                <FlatList
                                    data={Orderlist}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                    style={{ marginTop: 5 }}
                                    renderItem={({ item }) => (
                                        <Flexcomponent
                                            alignItems="center"
                                            justifyContent="flex-start"  // 👈 match header
                                            style={{
                                                width: "100%",
                                                paddingVertical: 10,
                                            }}
                                        >
                                            <Text family="regular" size="semimedium" color={theme.primarytext} style={{ width: 120, textAlign: "center" }}>
                                                {item.contract}
                                            </Text>
                                            <Text family="regular" size="semimedium" color={theme.primarytext} style={{ width: 120, textAlign: "center" }}>
                                                {item.type}
                                            </Text>
                                            <Text family="regular" size="semimedium" color={theme.primarytext} style={{ width: 120, textAlign: "center" }}>
                                                {item.qty}
                                            </Text>
                                            <Text family="regular" size="semimedium" color={theme.primarytext} style={{ width: 120, textAlign: "center" }}>
                                                {item.remaining}
                                            </Text>
                                        </Flexcomponent>
                                    )}
                                />
                            </View>
                        </ScrollView>
                    </>


                }


            </View>


        </Mainview >
    )

}

export default Orders