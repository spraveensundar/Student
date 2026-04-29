import React, { useState } from "react";
import { Pressable, View } from "react-native";
import Text from "../../../Components/text";
import Images, { icons } from "../../../Utilities/images";
import Mainview from "../../../Components/mainview";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import styles from "./styles";
import TopTabs from "../../../Components/TopTabs";
import Line from "../../../Components/Line";
import { FlashList } from "@shopify/flash-list";
import { Fontsize } from "../../../Utilities/uiasset";
import { NavigationProp, stackNavProp } from "../../../Actions/types";

type Props = {
    navigation: NavigationProp;
    route: stackNavProp<'ScrapBookingHistory'>['route'];
};

const ScrapBookingHistory: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    const [currentindex, setCurrentindex] = useState(0)

    const scrapHistory = {
        accepted: [
            {
                id: 1,
                name: 'Old Car Material',
                requestId: 'CA6892543',
                buyerQuote: '26000',
                quantity: '10 MT',
                status: 'Accepted',
            },
            {
                id: 2,
                name: 'Old Car Material',
                requestId: 'CA6892544',
                buyerQuote: '16000',
                quantity: '20 MT',
                status: 'Accepted',
            },
            {
                id: 3,
                name: 'Old Car Material',
                requestId: 'CA6892545',
                buyerQuote: '17000',
                quantity: '15 MT',
                status: 'Accepted',
            }
        ],
        rejected: [
            {
                id: 1,
                name: 'Old Car Material',
                requestId: 'CA6892543',
                buyerQuote: '26000',
                quantity: '10 MT',
                status: 'Rejected',
            },
            {
                id: 2,
                name: 'Old Car Material',
                requestId: 'CA6892544',
                buyerQuote: '16000',
                quantity: '20 MT',
                status: 'Rejected',
            },
            {
                id: 3,
                name: 'Old Car Material',
                requestId: 'CA6892545',
                buyerQuote: '17000',
                quantity: '15 MT',
                status: 'Rejected',
            }
        ],
    };


    return (
        <Mainview
            isheader={true}
            ismenuheader={false}
            onleftfn={() => navigation.goBack()}
            isscollable={false}
            headertitle="My Booking History"
        >
            <View style={style.container}>
                <View style={{ flex: 1 }} >
                    <TopTabs
                        tabs={["All", "Accepted", "Rejected"]}
                        activeindex={currentindex}
                        onchange={setCurrentindex}
                        width={100}
                        containerstyle={{ paddingVertical: windowwidth * 0.05 }}
                        paddingvertical={"3%"}
                    />
                    <Line width={windowwidth} conatainerstyle={{ alignSelf: "center" }} />

                    <View style={{ flex: 1, marginVertical: windowwidth * 0.05 }} >
                        <FlashList
                            data={currentindex === 0 ? [...scrapHistory.accepted, ...scrapHistory.rejected] : (scrapHistory[(Object.keys(scrapHistory)[currentindex - 1])] ?? [])}
                            style={{ flex: 1, }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }: any) => (
                                <View
                                    style={{
                                        borderRadius: 10,
                                        margin: 5,
                                        boxShadow: '0px 0px 5px rgba(0,0,0,0.2)',
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: windowwidth * 0.03,
                                            margin: windowwidth * 0.03,
                                            borderRadius: 10,
                                            backgroundColor: '#EFF0F1'
                                        }}
                                    >
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: windowwidth * 0.15,
                                                height: windowwidth * 0.15,
                                                borderRadius: windowwidth * 0.15,
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <Images
                                                source={icons.ScrapCar}
                                                type="image"
                                                width={'100%'}
                                                height={'100%'}
                                                resizeMode="cover"
                                            />
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                marginLeft: windowwidth * 0.03
                                            }}
                                        >
                                            <Text size="medium" family="GBold" color="#12110D" >{item?.name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text size="medium" family="GMedium" color="#12110D" top={'2.5%'} >
                                                    {`Request ID : `}
                                                </Text>
                                                <Text size="medium" family="GMedium" color="#009431" top={'2.5%'} >
                                                    {`${item?.requestId}`}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginHorizontal: windowwidth * 0.03,
                                            marginBottom: windowwidth * 0.03
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                            }}
                                        >
                                            <Text
                                                family={'GMedium'}
                                                size={'medium'}
                                                style={{
                                                    flexShrink: 1
                                                }}
                                            >
                                                {item?.quantity}
                                            </Text>
                                            <Text
                                                family={'GMedium'}
                                                size={'medium'}
                                                style={{
                                                    flexShrink: 1
                                                }}
                                            >
                                                {'Quantity'}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                marginLeft: windowwidth * 0.03
                                            }}
                                        >
                                            <Text
                                                family={'GMedium'}
                                                size={'medium'}
                                                style={{
                                                    flexShrink: 1
                                                }}
                                            >
                                                {`₹${item?.buyerQuote}`}
                                            </Text>
                                            <Text
                                                family={'GMedium'}
                                                size={'medium'}
                                                style={{
                                                    flexShrink: 1
                                                }}
                                            >
                                                {'Buyer Quote'}
                                            </Text>
                                        </View>
                                        <View>
                                            <Pressable
                                                style={{
                                                    marginLeft: windowwidth * 0.03,
                                                    paddingVertical: windowwidth * 0.01,
                                                    paddingHorizontal: windowwidth * 0.03,
                                                }}
                                                onPress={() => navigation.navigate('BiddingDetails', { details: item })}
                                            >
                                                <Text family={'GRegular'} size={'medium'} color={'#000C51'} style={{ lineHeight: Fontsize.medium, textDecorationLine: 'underline', textDecorationColor: '#000C51' }} >{'View Details'}</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            borderTopWidth: 0.5,
                                            borderTopColor: '#CFCFCF',
                                            paddingHorizontal: windowwidth * 0.03,
                                            paddingVertical: windowwidth * 0.03
                                        }}>
                                        <Text size="medium" family="GMedium" color="#12110D" >
                                            {`Status : `}
                                        </Text>
                                        <Text size="medium" family="GMedium" color={item?.status === 'Accepted' ? '#389E0D' : '#DC2020'} >
                                            {`${item?.status}`}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </View>
        </Mainview>
    )
}

export default ScrapBookingHistory;