import React, { useState } from "react";
import { FlatList, View } from "react-native"

import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import { Button } from "../../../Components/Field";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Fontfamily, Fontsize } from "../../../Utilities/uiasset";
import { returnOriginalFile } from "../../../Common/commonFunction";
import { NavigationProp, stackNavProp } from "../../../Actions/types";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";

type Props = {
    navigation: NavigationProp;
    route: stackNavProp<'ScrapPostDetails'>['route'];
};

const ScrapPostDetails: React.FC<Props> = ({ route }: any) => {
    const details = route?.params?.post ?? null;
    const { navigation } = useCustomHooks();

    const [activeIndex, setActiveIndex] = useState(0);

    const onMomentumScrollEnd = (event: any) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.x / windowwidth
        );
        setActiveIndex(index);
    };

    return (
        <Mainview
            isheader={true}
            isscollable
            headertitle='Car Scrapping Service'
            horizontalpadding={0}
        >
            <View style={{ flex: 1, marginBottom: windowwidth * 0.05 }} >
                <FlatList
                    data={details?.vehiclePicture}
                    horizontal
                    pagingEnabled
                    onMomentumScrollEnd={onMomentumScrollEnd}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, i) => i.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width: windowwidth, maxHeight: windowheight * 0.3 }}>
                                <Images
                                    type="image"
                                    source={{ uri: returnOriginalFile(item) }}
                                    width={"100%"}
                                    height={"100%"}
                                    resizeMode="cover"
                                    style={{
                                        borderRadius: 0
                                    }}
                                />
                            </View>
                        )
                    }}
                />
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                    {
                        details?.vehiclePicture?.map((_: any, index: any) => (
                            <View
                                key={index}
                                style={{
                                    height: 8,
                                    width: activeIndex === index ? 15 : 8,
                                    borderRadius: 5,
                                    marginHorizontal: 4,
                                    backgroundColor: activeIndex === index ? "#000" : "#CFCFCF"
                                }}
                            />
                        ))
                    }
                </View>
                <View style={{ padding: windowwidth * 0.05 }}>
                    <View style={{ marginBottom: windowwidth * 0.05 }}>
                        <Text family="GMedium" size="semilarge" style={{ flex: 1, color: '#000000' }}>{`Car Scarp`}</Text>
                        <View style={{ marginTop: windowwidth * 0.03 }}>
                            <Text family="GRegular" size="medium" style={{ color: '#000000' }}>{'Scrap your old car in just a few clicks! Instant pickup, best scrap value & government-approved certificate.'}</Text>
                            <Text family="GRegular" size="medium" top={windowwidth * 0.02} style={{ color: '#000000' }}>{'Turn your junk car into cash – hassle-free scrapping with doorstep pickup.'}</Text>
                            <Text family="GRegular" size="medium" top={windowwidth * 0.02} style={{ color: '#000000' }}>{'Say goodbye to your old ride! Get instant scrap value, free pickup & digital scrapping certificate.'}</Text>
                            <Text family="GRegular" size="medium" top={windowwidth * 0.02} style={{ color: '#000000' }}>{'From scrap to cash – quick, legal, and eco-friendly vehicle scrapping solution.'}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: windowwidth * 0.05 }}>
                        <Text family={'GMedium'} size={'semilarge'} style={{ flex: 1 }}>{'Product ID - ' + details?.vehicleRegistrationNo}</Text>
                        <View>
                            <Button
                                title={"View Quote"}
                                buttonStyle={{
                                    height: 'auto',
                                    borderRadius: 5,
                                    paddingVertical: windowwidth * 0.02,
                                    paddingHorizontal: windowwidth * 0.02,
                                    backgroundColor: '#000C511A'
                                }}
                                textStyle={{
                                    fontFamily: Fontfamily.GMedium,
                                    fontSize: Fontsize.semimedium,
                                    color: '#010859'
                                }}
                                onPress={() => navigation.navigate('BiddingRequest', { scrapId: details?._id })}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: windowwidth * 0.05 }}>
                        <Text family="GMedium" size="semilarge" style={{ flex: 1, color: '#000000' }}>{`Product Details`}</Text>
                        <View style={{ marginTop: windowwidth * 0.03, padding: windowwidth * 0.05, borderRadius: 10, backgroundColor: '#F3F3F3' }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: windowwidth * 0.03,
                            }}>
                                <Text family="GRegular" size="medium" style={{ flexShrink: 1 }}>{'Vehicle Type'}</Text>
                                <Text family="GBold" size="medium" style={{ flexShrink: 1 }}>{details?.vehicleType}</Text>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: windowwidth * 0.03,
                                }}>
                                <Text family="GRegular" size="medium" style={{ flexShrink: 1 }}>{'Vehicle Make'}</Text>
                                <Text family="GBold" size="medium" style={{ flexShrink: 1 }}>{details?.vehicleMake}</Text>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: windowwidth * 0.03,
                                }}>
                                <Text family="GRegular" size="medium" style={{ flexShrink: 1 }}>{'Vehicle Modal'}</Text>
                                <Text family="GBold" size="medium" style={{ flexShrink: 1 }}>{details?.vehicleModel}</Text>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Text family="GRegular" size="medium" style={{ flexShrink: 1 }}>{'Product Name'}</Text>
                                <Text family="GBold" size="medium" style={{ flexShrink: 1 }}>{details?.vehicleTitle}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: windowwidth * 0.05 }}>
                        <Text family="GMedium" size="semilarge" style={{ flex: 1, color: '#000000' }}>{`Description`}</Text>
                        <View style={{ marginTop: windowwidth * 0.03 }}>
                            <Text family="GRegular" size="medium" style={{ color: '#000000', lineHeight: 22, textAlign: "justify" }}>{details?.vehicleDescription}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Mainview>
    )
}

export default ScrapPostDetails;