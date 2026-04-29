import React from "react";
import { Pressable, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Text from "../../../Components/text";
import Images, { icons } from "../../../Utilities/images";
import Mainview from "../../../Components/mainview";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes";
import styles from "./styles";
import { FlashList } from "@shopify/flash-list";
import { Fontfamily, Fontsize } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectorIcons";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'FASTagProvider'>;

const FASTagProvider: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    const providers = [
        {
            id: 1,
            logo: icons.Icici,
            name: 'ICICI Bank Fastag',
        },
        {
            id: 2,
            logo: icons.Idfc,
            name: 'IDFC Bank Fastag',
        },
        {
            id: 3,
            logo: icons.Sbi,
            name: 'SBI Bank Fastag',
        },
        {
            id: 4,
            logo: icons.Axis,
            name: 'AXIS Bank Fastag',
        }
    ];

    return (
        <Mainview
            isscollable={false}
            headertitle="FasTag recharge"
            horizontalpadding={0}
        >
            <View style={style.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 5,
                        backgroundColor: '#F3F3F3',
                        paddingHorizontal: windowwidth * 0.02,
                        paddingVertical: windowwidth * 0.01,
                        marginHorizontal: windowwidth * 0.05,
                        marginBottom: windowwidth * 0.03
                    }}
                >
                    <VectorIcons
                        family="Feather"
                        name={"search"}
                        size={windowwidth * 0.045}
                        iconcolor={'#A8A8A8'}
                    />
                    <TextInput
                        placeholder="Type your FASTag Provider Name"
                        style={{
                            flex: 1,
                            fontFamily: Fontfamily.GMedium,
                            fontSize: Fontsize.medium,
                            paddingHorizontal: windowwidth * 0.03,
                        }}
                        placeholderTextColor={'#A8A8A8'}
                    />
                </View>
                <Pressable style={{ paddingHorizontal: windowwidth * 0.05, marginBottom: windowwidth * 0.03 }}>
                    <Text style={{ textAlign: 'right', textDecorationLine: 'underline', textDecorationColor: '#009431' }} color="#009431" size="medium" family="GMedium">{'How to find your FAS Tag Bank ?'}</Text>
                </Pressable>
                <View style={{ flex: 1, paddingHorizontal: windowwidth * 0.025, marginVertical: windowwidth * 0.05 }} >
                    <View style={{ paddingHorizontal: windowwidth * 0.025, marginBottom: windowwidth * 0.03 }}>
                        <Text size="semilarge" family="GMedium">{'Add a new FASTag'}</Text>
                    </View>
                    <FlashList
                        data={providers ?? []}
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
                                    marginHorizontal: windowwidth * 0.025,
                                    padding: windowwidth * 0.02,
                                    marginBottom: windowwidth * 0.03,
                                    backgroundColor: '#F3F3F3',
                                }}
                                onPress={() => navigation.navigate('VehicleForm', { provider: item })}
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
                                <Text style={{ paddingHorizontal: windowwidth * 0.02 }} size="medium" family="GMedium">{item?.name}</Text>
                            </Pressable>
                        )}
                    />
                </View>
            </View>
        </Mainview>
    )
}

export default FASTagProvider;