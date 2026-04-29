import { FlatList, View } from "react-native";
import { useEffect, useState } from "react";

import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { useLazyViewScrapDetailsQuery } from "../../../Slices/scrap";
import { capitalizeFirstLetter } from "../../../Actions/Hooks/helperfn";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import { returnOriginalFile } from "../../../Actions/Constants/constant";

const ScrapDetails: React.FC = ({ route }: any) => {
    const details = route?.params?.details ?? null;
    const type = route?.params?.screen ?? null;
    const { navigation } = useCustomHooks();
    const [viewScrapDetails, { isFetching }] = useLazyViewScrapDetailsQuery();

    const [scrapdet, setScrapdet] = useState<any>({});

    const handleScrapDetails = async () => {
        const reponse = await viewScrapDetails({ id: type === "order" ? details.vehicleScrapId?._id : details._id }).unwrap();
        setScrapdet(reponse?.data)
    }

    useEffect(() => {
        handleScrapDetails();
    }, [details._id, type]);

    return (
        <Mainview
            headertitle='Car Scrapping Service'
            bottomContent
            ismainloading={isFetching}
            isbottomload={false}
            bottomtext="Make bid"
            onBottompress={() => navigation.navigate("Vendorhome", { screen: "MakeBid", params: { post: scrapdet } })}
            horizontalpadding={0}
        >
            <View style={{ flex: 1, marginBottom: windowwidth * 0.05 }} >
                <View style={{ width: "100%", height: windowheight * 0.3 }}>
                    <FlatList
                        data={details?.vehiclePicture}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Images
                                type="image"
                                source={{ uri: returnOriginalFile(item) }}
                                width={windowwidth}
                                height={windowheight * 0.3}
                                resizeMode="cover"
                                style={{
                                    borderRadius: 0
                                }}
                            />
                        )}
                    />
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
                        <Text family={'GMedium'} size={'semilarge'} style={{ flex: 1 }}>{'Product ID - '}{scrapdet?.vehicleRegistrationNo}</Text>
                        {/* <View
                            style={{
                                marginLeft: windowwidth * 0.03,
                                paddingVertical: windowwidth * 0.02,
                                paddingHorizontal: windowwidth * 0.03,
                                borderRadius: 5,
                                backgroundColor: '#FF3D411A',
                            }}
                        >
                            <Text family={'GRegular'} size={'medium'} color={'#FF4242'} style={{ lineHeight: Fontsize.medium }} >{'Report  This Ad'}</Text>
                        </View> */}
                    </View>
                    <View style={{ marginBottom: windowwidth * 0.05 }}>
                        <Text family="GMedium" size="semilarge" style={{ flex: 1, color: '#000000' }}>{`Product Details`}</Text>
                        <View style={{
                            marginTop: windowwidth * 0.03,
                            padding: windowwidth * 0.05,
                            borderRadius: 10,
                            backgroundColor: '#F3F3F3',
                        }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: windowwidth * 0.03,
                            }}>
                                <Text family="GRegular" size="medium" style={{ flexShrink: 1 }}>{'Vehicle Type'}</Text>
                                <Text family="GBold" size="medium" style={{ flexShrink: 1 }}>{capitalizeFirstLetter(scrapdet?.vehicleType)}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: windowwidth * 0.03,
                            }}>
                                <Text family="GRegular" size="medium" style={{ flexShrink: 1 }}>{'Vehicle Make'}</Text>
                                <Text family="GBold" size="medium" style={{ flexShrink: 1 }}>{capitalizeFirstLetter(scrapdet?.vehicleMake)}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: windowwidth * 0.03,
                            }}>
                                <Text family="GRegular" size="medium" style={{ flexShrink: 1 }}>{'Vehicle Model'}</Text>
                                <Text family="GBold" size="medium" style={{ flexShrink: 1 }}>{scrapdet?.vehicleModel}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <Text family="GRegular" size="medium" style={{ flexShrink: 1 }}>{'Product Name'}</Text>
                                <Text family="GBold" size="medium" style={{ flexShrink: 1 }}>{'Wheeler'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: windowwidth * 0.05 }}>
                        <Text family="GMedium" size="semilarge" style={{ flex: 1, color: '#000000' }}>{`Description`}</Text>
                        <View style={{ marginTop: windowwidth * 0.03 }}>
                            <Text family="GRegular" size="medium" style={{ color: '#000000' }}>{scrapdet?.vehicleDescription}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Mainview>
    )
}

export default ScrapDetails;