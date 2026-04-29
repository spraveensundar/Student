import React, { useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Mainview from "../../../Components/mainview";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes";
import styles from "./styles";
import Text from "../../../Components/text";
import { FlashList } from "@shopify/flash-list";
import Images from "../../../Utilities/images";
import VectorIcons from "../../../Utilities/vectorIcons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Sheet from "../../../Components/bottomsheet";
import { Button, Input } from "../../../Components/Field";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Recharge'>;

const Recharge: React.FC<Props> = ({ route }: any) => {
    const { provider } = route?.params;
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    const [isBottomSheet, setIsBottomSheet] = useState<{ isOpen: boolean, context: string, data?: any }>({ isOpen: false, context: '', data: '' });

    const bottomsheetref = useRef<BottomSheetModal>(null);

    useEffect(() => {
        if (isBottomSheet?.isOpen) {
            bottomsheetref?.current?.present();
        } else {
            bottomsheetref?.current?.close();
        }
    }, [isBottomSheet?.isOpen]);

    const recharges = [
        {
            id: 1,
            logo: provider?.logo,
            name: provider?.name,
            rechargeId: 'TN55B4545',
        },
        {
            id: 2,
            logo: provider?.logo,
            name: provider?.name,
            rechargeId: 'TN55B4546',
        },
        {
            id: 3,
            logo: provider?.logo,
            name: provider?.name,
            rechargeId: 'TN55B4547',
        },
        {
            id: 4,
            logo: provider?.logo,
            name: provider?.name,
            rechargeId: 'TN55B4548',
        }
    ];

    return (
        <Mainview
            isscollable={false}
            headertitle="FasTag recharge"
        >
            <View style={style.container}>
                <View style={{ flex: 1, marginBottom: windowwidth * 0.05 }} >
                    <View style={{ marginBottom: windowwidth * 0.03 }}>
                        <Text size="semilarge" family="GMedium">{'Recent FASTag Recharge'}</Text>
                    </View>
                    <FlashList
                        data={recharges ?? []}
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }: any) => (
                            <Pressable
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: '#CFCFCF',
                                    padding: windowwidth * 0.02,
                                    marginBottom: windowwidth * 0.03,
                                    backgroundColor: '#F3F3F3',
                                }}
                                onPress={() => navigation.navigate('RechargeDetails', { provider: item })}
                            >
                                <View
                                    style={{
                                        width: windowwidth * 0.08,
                                        height: windowwidth * 0.08,
                                    }}
                                >
                                    <Images
                                        type="image"
                                        source={item.logo}
                                        width={"100%"}
                                        height={"100%"}
                                    />
                                </View>
                                <View
                                    style={{
                                        flex: 1
                                    }}
                                >
                                    <Text style={{ paddingHorizontal: windowwidth * 0.02 }} size="medium" family="GMedium">{item?.name}</Text>
                                    <Text style={{ paddingHorizontal: windowwidth * 0.02 }} size="medium" family="GMedium">{item?.rechargeId}</Text>
                                </View>
                                <Pressable
                                    onPress={() => setIsBottomSheet(prev => ({ ...prev, isOpen: true, context: 'settings' }))}
                                >
                                    <VectorIcons family="Entypo" name={'dots-three-vertical'} size={windowwidth * 0.05} />
                                </Pressable>
                            </Pressable>
                        )}
                    />
                </View>
            </View>
            <Sheet
                sheetref={bottomsheetref}
                custominterface={true}
                snappoint={[isBottomSheet?.context === 'edit-name' ? '30%' : '20%']}
                onDismiss={() => setIsBottomSheet(prev => ({ ...prev, isOpen: false, context: '', data: '' }))}
            >
                <View
                    style={{ flex: 1, padding: windowwidth * 0.05 }}
                >
                    {isBottomSheet?.context === 'settings' &&
                        <>
                            <View>
                                <Pressable
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: windowwidth * 0.05
                                    }}
                                    onPress={() => setIsBottomSheet(prev => ({ ...prev, isOpen: true, context: 'edit-name' }))}
                                >
                                    <VectorIcons family={"Feather"} name={"edit"} size={windowwidth * 0.06} />
                                    <Text style={{ paddingHorizontal: windowwidth * 0.03 }} size="semilarge" family="GMedium">{'Edit name'}</Text>
                                </Pressable>
                                <Pressable
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => setIsBottomSheet({ isOpen: false, context: '', data: '' })}
                                >
                                    <VectorIcons family={"Feather"} name={"user-x"} size={windowwidth * 0.06} />
                                    <Text style={{ paddingHorizontal: windowwidth * 0.03 }} size="semilarge" family="GMedium">{'Delete account'}</Text>
                                </Pressable>
                            </View>
                        </>
                    }
                    {isBottomSheet?.context === 'edit-name' &&
                        <>
                            <View>
                                <View style={{ marginBottom: windowwidth * 0.03 }}>
                                    <Input
                                        label={"Add nickname"}
                                        placeHolder="Enter nick name"
                                    />
                                </View>
                                <Button
                                    title="Submit"
                                    onPress={() => setIsBottomSheet({ isOpen: false, context: '', data: '' })}
                                />
                            </View>
                        </>
                    }
                </View>
            </Sheet>
        </Mainview>
    )
}

export default Recharge;