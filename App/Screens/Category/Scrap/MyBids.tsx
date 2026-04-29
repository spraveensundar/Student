import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";

import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import Nodata from "../../../Components/nodata";
import { Button } from "../../../Components/Field";
import Mainview from "../../../Components/mainview";
import { formatDateTime } from "../../../Utilities/helper";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import { scrapSelector, useCancelBidMutation, useLazyGetMyScrapBidsQuery } from "../../../Slices/scrap";
import useApiError from "../../../Actions/Hooks/errorhook";

const MyBids: React.FC = () => {
    const { navigation, failuretoast, successtoast } = useCustomHooks();
    const { scrapDetails } = useSelector(scrapSelector);

    const [viewBidLists, { isFetching }] = useLazyGetMyScrapBidsQuery();
    const [cancelBid, { isLoading, error }] = useCancelBidMutation();
    const [bidLists, setBidLists] = useState<any>({});

    useApiError(error);

    const handleScrapDetails = async () => {
        const reponse = await viewBidLists({ id: scrapDetails?._id }).unwrap();
        console.log("reponse", reponse)
        setBidLists(reponse?.data)
    }

    const handleCancelBid = async (id: any) => {
        try {
            const formData = new FormData();
            formData.append("bidId", id);
            const response = await cancelBid(formData).unwrap();
            console.log("scrapperId", response)
            if (response.status) {
                successtoast(response?.message ?? 'Profile Updated!');
                handleScrapDetails();
                navigation?.navigate('ScrapDealerConfirmation', {
                    origin: 'CancelBid',
                    content: '“You’re bid was cancelled now.',
                    button: {
                        title: 'Try to another bid',
                        onButtonPress: () => navigation.navigate('MyBids'),
                    }
                })
            } else {
                failuretoast("Something went wrong")
            }

        } catch (error: any) {
            console.log('Some thing', error)
        }
    }

    useEffect(() => {
        handleScrapDetails();
    }, [scrapDetails]);

    return (
        <Mainview
            headertitle='My Bids'
            isscollable={false}
            isbottomload={false}
            ismainloading={isFetching}
        >
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: windowwidth * 0.05 }}>
                    <Text style={{ flex: 1 }} family={"GBold"} size={"large"}>{'My Bids List'}</Text>
                </View>
                <FlatList
                    data={bidLists}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{
                                flexDirection: 'row',
                                padding: windowwidth * 0.035,
                                borderRadius: 10,
                                backgroundColor: '#EFF0F1',
                                overflow: 'hidden'
                            }}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: windowwidth * 0.15,
                                    height: windowwidth * 0.15,
                                    borderRadius: windowwidth * 0.15,
                                    overflow: 'hidden',
                                }}>
                                    <Images
                                        source={require('../../../Assets/images/scrap-car.png')}
                                        type="image"
                                        width={'100%'}
                                        height={'100%'}
                                        resizeMode="cover"
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: windowwidth * 0.03 }}>
                                        <View style={{ flex: 1, marginLeft: windowwidth * 0.03 }}>
                                            <Text size="medium" family="GBold" color="#12110D" >{item?.requestId}</Text>
                                            <Text size="semimedium" family="GRegular" color="#12110D" top={'2.5%'} >{`${formatDateTime(item?.updatedAt)}`}</Text>
                                        </View>
                                        <View style={{ marginLeft: windowwidth * 0.03 }}>
                                            <Text size="medium" family="GBold" color="#12110D" >{`₹${item?.price}`}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Button
                                            title="Edit"
                                            buttonStyle={{
                                                flex: 1,
                                                borderWidth: 1,
                                                borderColor: '#D4D4D4',
                                                borderRadius: 5,
                                                backgroundColor: '#E1E2E3',
                                                height: 'auto',
                                                paddingVertical: windowwidth * 0.02,
                                            }}
                                            textStyle={{
                                                color: '#12110D'
                                            }}
                                            onPress={() => navigation.navigate('Vendorhome', { screen: 'MakeBid', params: { post: item, scrapperId: item } })}
                                        />
                                        <Button
                                            title="Cancel"
                                            buttonStyle={{
                                                flex: 1,
                                                borderWidth: 1,
                                                borderColor: '#FF4545',
                                                borderRadius: 5,
                                                backgroundColor: '#FF45451A',
                                                height: 'auto',
                                                paddingVertical: windowwidth * 0.02,
                                                marginLeft: windowwidth * 0.05
                                            }}
                                            textStyle={{ color: '#FF4545' }}
                                            onPress={() => handleCancelBid(item?._id)}
                                            loading={isLoading}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                    ItemSeparatorComponent={() => (<View style={{ height: windowwidth * 0.02 }} />)}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Nodata text="No Bids found " container={{ height: windowheight * 0.75 }} />}
                />
            </View>
        </Mainview>
    )

}

export default MyBids;