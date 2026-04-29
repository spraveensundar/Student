import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Mainview from "../../../Components/mainview";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes";
import styles from "./styles";
import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import { Button, Input } from "../../../Components/Field";
import { Fontfamily, Fontsize } from "../../../Utilities/uiasset";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'RechargeDetails'>;

const RechargeDetails: React.FC<Props> = ({ route }: any) => {
    const { provider } = route?.params;
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    const [rechargeAmount, setRechargeAmount] = useState(0);

    return (
        <Mainview
            isscollable={false}
            headertitle="FasTag recharge"
            bottomContent={
                <View style={style.buttonContainer}>
                    <Button
                        title="Proceed to pay"
                        onPress={() => navigation.navigate("FASTagStatus", {
                            origin: 'RechargeDetails',
                            content: 'Your payment was successfully !',
                            button: {
                                title: 'Go to home',
                                onButtonPress: () => navigation.navigate('Home'),
                            },
                            status: 'success'
                        })}
                    />
                </View>
            }
        >
            <View style={style.container}>
                <View style={{ marginBottom: windowwidth * 0.03 }}>
                    <Text size="semilarge" family="GMedium">{'Recent FASTag Recharge'}</Text>
                </View>
                <View style={{ marginBottom: windowwidth * 0.05 }}>
                    <Pressable
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: '#CFCFCF',
                            padding: windowwidth * 0.02,
                            backgroundColor: '#F3F3F3',
                        }}
                    >
                        <View
                            style={{
                                width: windowwidth * 0.08,
                                height: windowwidth * 0.08,
                            }}
                        >
                            <Images
                                type="image"
                                source={provider.logo}
                                width={"100%"}
                                height={"100%"}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <Text style={{ paddingHorizontal: windowwidth * 0.02 }} size="medium" family="GMedium">{provider?.name}</Text>
                            <Text style={{ paddingHorizontal: windowwidth * 0.02 }} size="medium" family="GMedium">{provider?.rechargeId}</Text>
                        </View>
                    </Pressable>
                </View>
                <View
                    style={{
                        marginBottom: windowwidth * 0.05
                    }}
                >
                    <Text family="GMedium" size="semilarge" style={{ color: '#000000' }}>{`Bill details`}</Text>
                    <View
                        style={{
                            marginTop: windowwidth * 0.03,
                            padding: windowwidth * 0.05,
                            borderRadius: 10,
                            backgroundColor: '#F3F3F3',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: windowwidth * 0.03,
                            }}
                        >
                            <Text family="GRegular" size="medium" style={{ flexShrink: 1 }}>{'Customer name'}</Text>
                            <Text family="GBold" size="medium" style={{ flexShrink: 1 }}>{'B**************'}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: windowwidth * 0.03,
                            }}
                        >
                            <Text family="GRegular" size="medium" style={{ flexShrink: 1 }}>{'FASTag Balance'}</Text>
                            <Text family="GBold" size="medium" style={{ flexShrink: 1 }}>{'640'}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Text family="GRegular" size="medium" style={{ flexShrink: 1 }}>{'Vehicle model'}</Text>
                            <Text family="GBold" size="medium" style={{ flexShrink: 1 }}>{'HYUNDAI VENUE 1.2'}</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        marginBottom: windowwidth * 0.03
                    }}
                >
                    <Input
                        placeHolder="Recharge amount"
                        value={rechargeAmount}
                        onChange={setRechargeAmount}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: windowwidth * 0.03,
                        }}
                    >
                        {[500, 1500, 2500, 3500].map((_, index) => {
                            return (
                                <Button
                                    key={index}
                                    title={`₹${_}`}
                                    buttonStyle={{ width: 'auto', height: 'auto', padding: windowwidth * 0.02, borderRadius: 5, backgroundColor: '#000C511A' }}
                                    textStyle={{ fontFamily: Fontfamily.GBold, fontSize: Fontsize.medium, color: '#000C51' }}
                                    onPress={() => setRechargeAmount(_)}
                                />
                            )
                        })}
                    </View>
                </View>
            </View>
        </Mainview>
    )
}

export default RechargeDetails;