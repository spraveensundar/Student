import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import Mainview from "../../Components/mainview";
import React, { useContext } from "react";
import Images, { icons } from "../../Utilities/images";
import { FlatList, ImageBackground, Pressable, StyleSheet, View, Image } from "react-native";
import { RFvalue, windowheight, windowwidth } from "../../Utilities/dimensions";
import { Colors, Fontfamily } from "../../Utilities/uiasset";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Text from "../../Components/text";
import { useSelector } from "react-redux";
import { walletSelector } from "../../Slices/wallet";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'AddMoneyHome'>;

const DATA = [
    { id: "1", title: "Received", address: "0X94....088d", currencyFrom: "ETH", currencyTo: "USD", usdAmount: "0.5" },
    { id: "2", title: "Received", address: "0X94....088d", currencyFrom: "ETH", currencyTo: "USD", usdAmount: "0.5" },
    { id: "3", title: "Received", address: "0X94....088d", currencyFrom: "ETH", currencyTo: "USD", usdAmount: "0.5" },
    { id: "4", title: "Received", address: "0X94....088d", currencyFrom: "ETH", currencyTo: "USD", usdAmount: "0.5" },
    { id: "5", title: "Received", address: "0X94....088d", currencyFrom: "ETH", currencyTo: "USD", usdAmount: "0.5" },
    { id: "6", title: "Received", address: "0X94....088d", currencyFrom: "ETH", currencyTo: "USD", usdAmount: "0.5" },
    { id: "7", title: "Received", address: "0X94....088d", currencyFrom: "ETH", currencyTo: "USD", usdAmount: "0.5" },
];

const AddMoneyHome: React.FC<Props> = () => {

    const { theme, navigation,convert } = useCustomHooks()
    const [depostSelected, setDepositSelected] = React.useState(false);
    const { currentaccount } = useSelector(walletSelector)

    return (

        <Mainview
            onleftfn={() => navigation.goBack()}
            headertitle="Add money"
            isscollable={false} >

            <View style={{ height: windowheight * 0.84, width: "auto", justifyContent: "flex-start", backgroundColor: theme.background }}>

                <ImageBackground
                    source={icons.BalanceBg_Img}
                    borderRadius={28}
                    resizeMode="cover"
                    style={styles.imagebg}>

                    <View style={{ margin: 20 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                            <Text
                                family="medium"
                                size={"semimedium"}
                                style={{ color: Colors.black }}>Earn Asset</Text>
                            <Images
                                type="svg"
                                name="EyeIcon"
                                width={30}
                                height={30}
                            />

                        </View>
                        <Text
                            family="bold"
                            size={"large"}
                            style={{ marginTop: 5, color: Colors.black }}>₹{convert(currentaccount?.balance)}</Text>
                    </View>

                </ImageBackground>
{/* 
                <Text
                    family="medium"
                    size="medium"
                    style={{ marginTop: 15, color: theme.primarytext }}>Transaction History</Text>

                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    renderItem={({ item }) => (

                        <View style={styles.item}>
                            <Images
                                type="svg"
                                name="EthIcon"
                                width={windowwidth * 0.075}
                                height={windowwidth * 0.075}
                            />

                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text
                                    family="medium"
                                    size="semimedium" >{item.title}</Text>

                                <Text
                                    family="regular"
                                    size="small"
                                    style={{ marginTop: 8 }}>From {item.address}</Text>
                            </View>

                            <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-end" }}>
                                <Text
                                    family="medium"
                                    size={"semimedium"}
                                    style={{ color: Colors.radionGreen }}>+3 {item.currencyFrom}</Text>
                                <Text
                                    family="regular"
                                    size={"small"}
                                    style={{ marginTop: 8 }}>{item.usdAmount} {item.currencyTo}</Text>
                            </View>

                        </View>
                    )}
                /> */}


            </View>


            <View style={styles.bottomView}>

                <View style={{ alignItems: "center" }}>

                    {/* {!depostSelected ? */}

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                        <Pressable onPress={() => { navigation.navigate('Deposit', { Page: "deposit" }) }} style={{ backgroundColor: Colors.btnBgGreen, alignItems: "center", borderRadius: 10, flex: 0.5, marginRight: 10, minHeight: 40, }}>
                            <Text style={styles.btntxtStyle}>Deposit</Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate('Deposit', { Page: "withdraw" })} style={{ backgroundColor: Colors.btnBgGray, alignItems: "center", borderRadius: 10, flex: 0.5, marginLeft: 10, minHeight: 40, }}>
                            <Text style={styles.btntxtStyle}>Withdraw</Text>
                        </Pressable>
                    </View>


                </View>

                {/* {depostSelected ?

                    <Pressable onPress={() => { navigation.navigate('Deposit', { Page: "deposit" }), setDepositSelected(false) }} style={{ width: "100%", backgroundColor: Colors.btnBgGreen, alignItems: "center", borderRadius: 10, minHeight: 40, }}>
                        <Text style={styles.btntxtStyle}>Deposit</Text>
                    </Pressable>
                    : ""} */}

            </View>

        </Mainview>

    )
}
const styles = StyleSheet.create({

    imagebg: {
        width: "100%",
        height: windowheight * 0.16,
        justifyContent: "center"
    },
    bottomView: {
        height: windowheight * 0.060,
        bottom: 0,
        alignItems: "center",
        position: "absolute",
        width: "100%",
        justifyContent: "center",
    },
    btntxtStyle: {
        color: Colors.textWhite,
        fontFamily: Fontfamily.semiBold,
        padding: 12,

    },
    item: {
        padding: 6,
        marginVertical: 3,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    }
})
export default AddMoneyHome
