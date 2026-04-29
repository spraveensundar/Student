
import Mainview from "../../Components/mainview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { windowheight, windowwidth } from "../../Utilities/dimensions";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import Images, { icons } from "../../Utilities/images";
import { Colors, Fontfamily } from "../../Utilities/uiasset";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import React, { useState } from "react";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { Button, Dropdown, Input } from "../../Components/Field";
import Text from "../../Components/text";
import Card from "../../Components/Card";
import { colors } from "react-native-keyboard-controller/lib/typescript/components/KeyboardToolbar/colors";
import { useSelector } from "react-redux";
import { walletSelector } from "../../Slices/wallet";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Deposit'>;

const Deposit: React.FC<Props> = ({ route }) => {

    const { theme, navigation, convert } = useCustomHooks()


    const [selected, setSelected] = useState<string>("Bank");

    const handleSelect = (method: string) => {
        // setSelected(method);
        console.log(method)
    };

    const { currentaccount } = useSelector(walletSelector)
    const [type, setType] = useState("Deposit")
    return (
        <Mainview
            onleftfn={() => navigation.goBack()}
            headertitle={type}
            isscollable={false}>

            <View style={{ height: windowheight * 0.9, width: "auto", justifyContent: "flex-start", backgroundColor: theme.background }}>

                <ImageBackground
                    source={icons.BalanceBg_Img}
                    borderRadius={28}
                    resizeMode="cover"
                    style={styles.imagebg}>

                    <View style={{ margin: 20 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                            <Text family="medium" size={"semimedium"} style={{ color: Colors.black }}>Earn Asset</Text>
                            {/* <Images
                                type="svg"
                                name="EyeIcon"
                                width={windowwidth * 0.06}
                                height={windowwidth * 0.06}
                            /> */}

                        </View>
                        <Text family="bold" size={"large"} style={{ marginTop: 5, color: Colors.black }}>₹{convert(currentaccount?.balance)}</Text>
                    </View>

                </ImageBackground>

                <View style={{ marginTop: 20 }}>

                    {/* <Input
                        label="Enter Amount in INR"
                        placeHolder="0.00"
                    /> */}

                    <Text
                        family="medium"
                        size={"medium"}>Select Type
                    </Text>

                    <Dropdown
                        list={[{
                            label: "Deposit",
                            value: "Deposit"
                        },
                        {
                            label: "Withdraw",
                            value: "Withdraw"
                        }
                        ]}
                        placeholder={"Select Countries"}
                        value={type}
                        onChange={(value) => {
                            setType(value?.value)
                        }}
                        conatinerstyle={{ marginTop: "5%" }}
                    />

                    <Text
                        family="medium"
                        size={"medium"} top={"5%"} >Select Payment Method
                    </Text>
                    <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                        <Pressable onPress={() => handleSelect("Bank")} style={{ borderRadius: 13, flex: 0.50, margin: 5, height: 120, justifyContent: "center", alignItems: "center", }}>
                            <Card containerStyle={[{ width: 110, height: 120, justifyContent: "center", alignItems: "center" }, selected === "Bank" && { borderColor: Colors.grey, borderWidth: 1 }]}>
                                <Images
                                    type="image"
                                    name="Bank"
                                    source={icons.Bank}
                                    width={windowwidth * 0.075}
                                    height={windowwidth * 0.075}
                                />
                                <Text family="medium" size={"small"} style={{ marginTop: 10 }}>Bank</Text>
                            </Card></Pressable>
                        {/* onPress={() => navigation.navigate('BankList')} */}
                        <Pressable onPress={() => handleSelect("Onramp")} style={{ borderRadius: 13, flex: 0.50, margin: 5, height: 120, justifyContent: "center", alignItems: "center" }}>
                            <Card containerStyle={[{ width: 110, height: 120, justifyContent: "center", alignItems: "center" }, selected === "Onramp" && { borderColor: Colors.grey, borderWidth: 1 }]}>
                                <Images
                                    type="image"
                                    name="OnrampPay"
                                    source={icons.OnrampPay}
                                    width={windowwidth * 0.075}
                                    height={windowwidth * 0.075}
                                />
                                <Text family="medium" size={"small"} style={{ marginTop: 10 }}>Onramp</Text>
                            </Card></Pressable>

                        {/* onPress={() => navigation.navigate('UPIList')}  */}

                        <Pressable onPress={() => handleSelect("UPI")} style={{ borderRadius: 13, flex: 0.50, margin: 5, height: 120, justifyContent: "center", alignItems: "center" }}>
                            <Card containerStyle={[{ width: 110, height: 120, justifyContent: "center", alignItems: "center" }, selected === "UPI" && { borderColor: Colors.grey, borderWidth: 1 }]}>
                                <Images
                                    type="image"
                                    name="UpiPay"
                                    source={icons.UpiPay}
                                    width={windowwidth * 0.075}
                                    height={windowwidth * 0.075}
                                />
                                <Text family="medium" size={"small"} style={{ marginTop: 10 }}>UPI</Text>
                            </Card></Pressable>

                    </View>

                </View>


            </View>
            <Button
                title="Contiue"
                buttonStyle={{ position: "absolute", bottom: "1%" }}
                onPress={type == "Deposit" ? () => navigation.navigate('DepositDetails') : () => navigation.navigate('Withdraw')}
            />
        </Mainview>
    )
}

const styles = StyleSheet.create({

    imagebg: {
        width: "100%",
        height: windowheight * 0.16,
        justifyContent: "center"

    }
})

export default Deposit;