import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";

import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import Loader from "../../../Components/loader";
import { Button } from "../../../Components/Field";
import { timeAgo } from "../../../Utilities/helper";
import Mainview from "../../../Components/mainview";
import Bottomsheet from "../../../Components/bottomsheet";
import useApiError from "../../../Actions/Hooks/errorhook";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Fontfamily, Fontsize } from "../../../Utilities/uiasset";
import { borderradius, windowheight, windowwidth } from "../../../Utilities/dimensions";
import { scrapSelector, useLazyViewBidListsQuery, useScrapBiddingMutation } from "../../../Slices/scrap";
import Nodata from "../../../Components/nodata";
import { returnOriginalFile } from "../../../Actions/Constants/constant";

const MakeBid: React.FC = ({ route }: any) => {
    const postDetails = route?.params?.post;
    const scrapper = route?.params?.scrapperId;
    const { theme, navigation, successtoast, failuretoast } = useCustomHooks();
    const sheetref = useRef<BottomSheet>(null);

    const { scrapDetails } = useSelector(scrapSelector);
    const [viewBidLists, { isFetching }] = useLazyViewBidListsQuery();
    const [scrapBidding, { isLoading, error }] = useScrapBiddingMutation();

    const [bidAmount, setBidAmount] = useState<any>('');
    const [bidLists, setBidLists] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const myBids = useMemo(() => {
        return bidLists?.filter((item: any) => item?.action === "mybid") ?? [];
    }, [bidLists]);

    useApiError(error);

    console.log("myBids", myBids)

    const handleScrapDetails = useCallback(
        async (pageNumber = 1, loadMore = false) => {
            const vehicleId = scrapper?.vehicleScrapId ?? postDetails?._id;
            const scrapId = scrapDetails?._id;
            if (!vehicleId || !scrapId) {
                console.log("Missing IDs:", { vehicleId, scrapId });
                return;
            }
            try {
                if (loadMore) setIsLoadingMore(true);
                const params = {
                    id: vehicleId,
                    scrappid: scrapId,
                    page: pageNumber,
                    limit: 10
                };
                const response = await viewBidLists(params).unwrap();
                console.log("responseasdfasdf", response)
                const newData = response?.data ?? [];
                if (loadMore) {
                    setBidLists(prev => [...prev, ...newData]);
                } else {
                    setBidLists(newData);
                    setHasMore(true);
                }
                setHasMore(newData.length === 10);
                setPage(pageNumber);
            } catch (err: any) {
                console.log("Bid list error full:", err?.data || err);
            } finally {
                setIsLoadingMore(false);
            }
        },
        [scrapper?.vehicleScrapId, postDetails?._id, scrapDetails?._id]
    );

    const handleLoadMore = () => {
        if (!isFetching && !isLoadingMore && hasMore) {
            handleScrapDetails(page + 1, true);
        }
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('bidAction', "bid");
            formData.append('customerId', scrapper ? scrapper?.customerId : postDetails?.customerId?._id);
            formData.append('vehicleScrapId', scrapper ? scrapper?.vehicleScrapId : postDetails?._id);
            formData.append('scrapId', scrapper ? scrapper?.scrapperId : scrapDetails?._id);
            formData.append('price', bidAmount);
            const scrapbidding = await scrapBidding(formData).unwrap();
            if (scrapbidding?.status) {
                successtoast(scrapbidding?.message ?? 'Profile Updated!');
                handleScrapDetails(1);
            }
            failuretoast(scrapbidding?.message ?? 'Something went wrong!');
        } catch (error: any) {
            failuretoast(error?.data?.message ?? 'Something went wrong!');
        }
    };

    useEffect(() => {
        if (myBids?.length > 0 && myBids[0]?.price) {
            setBidAmount(String(myBids[0].price));
        } else {
            setBidAmount('');
        }
    }, [scrapper?.price, myBids]);

    useEffect(() => {
        handleScrapDetails(1);
    }, [handleScrapDetails]);

    const bidStatus = useMemo<'not yet' | 'pending' | 'accept'>(() => {
        if (scrapper?.bidStatus) return scrapper.bidStatus;

        if (myBids?.length > 0 && myBids[0]?.bidStatus) {
            return myBids[0].bidStatus;
        }
        return 'pending';
    }, [scrapper?.bidStatus, myBids]);

    const snapPoints = useMemo(() => {
        if (bidStatus === "accept") return ["25%"];
        if (bidStatus === "pending") return ["35%"];
        return ["20%"];
    }, [bidStatus, myBids]);

    return (
        <Mainview
            isheader={false}
            ismenuheader={true}
            statusbarcolor={theme.btnColor}
            statusbarcontent="light"
            headertitle="Make Bid"
            isscollable={false}
            onleftfn={() => { navigation.openDrawer() }}
            horizontalpadding={0}
            scrollprops={{ extraKeyboardSpace: 40 }}
            ismainloading={isFetching}
        >
            <View style={{ flex: 1, paddingHorizontal: '6%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: windowwidth * 0.05 }}>
                    <Text style={{ flex: 1 }} family={"GBold"} size={"semilarge"}>{'Live Bids'}</Text>
                </View>
                {
                    isFetching ?
                        <Loader isloading={true} />
                        : <FlatList
                            data={bidLists ?? []}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => {
                                console.log(" returnOriginalFile(item?.scrapperId?.profile)", item)
                                return (
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: windowwidth * 0.03,
                                        borderRadius: 10,
                                        backgroundColor: '#EFF0F1'
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
                                                source={{ uri: returnOriginalFile(item?.scrapperId?.profile) }}
                                                type="image"
                                                width={'100%'}
                                                height={'100%'}
                                                resizeMode="cover"
                                            />
                                        </View>
                                        <View style={{ flex: 1, marginLeft: windowwidth * 0.03 }}>
                                            <Text size="medium" family="GBold" color="#12110D" >{item?.scrapperId?.firstName}</Text>
                                            <Text size="semimedium" family="GRegular" color="#12110D" top={'2.5%'} >{`${timeAgo(item?.updatedAt)}`}</Text>
                                        </View>
                                        <View style={{ marginLeft: windowwidth * 0.03 }}>
                                            <Text size="medium" family="GBold" color="#12110D" >{`₹${item?.price}`}</Text>
                                        </View>
                                    </View>
                                )
                            }}
                            ItemSeparatorComponent={() => (<View style={{ height: windowwidth * 0.02 }} />)}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={
                                isLoadingMore ? <Loader isloading={true} /> : null
                            }
                            ListEmptyComponent={<Nodata text="No Bids found " container={{ height: windowheight * 0.35 }} />}
                        />
                }
            </View>
            {
                myBids[0]?.vehicleScrapId?.bidPickupStatus === 'pickupconfirmed' ? (
                    <Bottomsheet
                        sheetref={sheetref}
                        bottomSheetProps={{
                            backgroundStyle: {
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)'
                            },
                            keyboardBehavior: "interactive",
                            keyboardBlurBehavior: "restore",
                            android_keyboardInputMode: "adjustPan",

                        }}
                        snappoint={["15%"]}
                    >
                        <View style={{ flex: 1, }} >
                            <View style={{ width: "20%", height: 7, borderRadius: borderradius * 5, alignSelf: "center", backgroundColor: "#E2E2E2", marginTop: "5%" }} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "8%", paddingHorizontal: "5%" }}>
                                <Text family="GBold" size="medium" style={{ flex: 1, color: theme.darktext }}>{`Your Bid Amount - ₹${bidAmount}`}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text family="GBold" size="medium" style={{ color: theme.darktext }}>{'Status : '}</Text>
                                    <Text family="GBold" size="medium" style={{ color: '#389E0D' }}>{'Completed'}</Text>
                                </View>
                            </View>
                        </View>
                    </Bottomsheet>
                ) : (
                    <Bottomsheet
                        sheetref={sheetref}
                        bottomSheetProps={{
                            backgroundStyle: {
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)'
                            },
                            keyboardBehavior: "interactive",
                            keyboardBlurBehavior: "restore",
                            android_keyboardInputMode: "adjustPan",

                        }}
                        snappoint={snapPoints}
                    >
                        <View style={{ flex: 1, }} >
                            <View style={{ width: "20%", height: 7, borderRadius: borderradius * 5, alignSelf: "center", backgroundColor: "#E2E2E2", marginTop: "5%" }} />
                            <View style={{ flex: 1, marginTop: "2.5%" }} >
                                {
                                    bidStatus === 'pending' && (
                                        <View style={{ flex: 1, padding: "5%", justifyContent: "center" }}>
                                            <Text family="GMedium" size="semilarge" style={{ color: theme.darktext, }}>{'Send an offer'}</Text>
                                            <View style={{
                                                backgroundColor: 'transparent',
                                                shadowOpacity: 0,
                                                elevation: 0,
                                                borderWidth: 0,
                                                borderBottomWidth: 1,
                                                borderBottomColor: '#E2E2E2',
                                                marginBottom: "5%",
                                                justifyContent: "flex-start",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginTop: "2.5%"
                                            }} >
                                                <View style={{ width: "3%" }}>
                                                    <Text family="GBold" size="large" style={{ color: theme.darktext }}>{'₹'}</Text>
                                                </View>
                                                <BottomSheetTextInput
                                                    style={{
                                                        width: "97%",
                                                        fontFamily: Fontfamily.GBold,
                                                        fontSize: Fontsize.large,
                                                    }}
                                                    keyboardType="numeric"
                                                    value={bidAmount}
                                                    onChangeText={setBidAmount}
                                                />
                                            </View>
                                            <Button
                                                title="Send Bid"
                                                loading={isLoading}
                                                buttonStyle={{ width: '100%', marginTop: "5%" }}
                                                onPress={() => handleSubmit()}
                                            />
                                        </View>
                                    )
                                }
                                {
                                    bidStatus === 'accept' && (
                                        <View style={{ flex: 1, paddingHorizontal: "5%", }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: windowwidth * 0.05, marginTop: "7.5%" }}>
                                                <Text family="GMedium" size="medium" style={{ flex: 1, color: theme.darktext }}>{`Your Bid Amount - ₹${bidAmount}`}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text family="GMedium" size="medium" style={{ color: theme.darktext }}>{'Status : '}</Text>
                                                    <Text family="GMedium" size="medium" style={{ color: '#389E0D' }}>{'Accepted'}</Text>
                                                </View>
                                            </View>
                                            <Button
                                                title="Done"
                                                buttonStyle={{ width: '100%' }}
                                                onPress={() => navigation?.navigate('ScrapDealerConfirmation', {
                                                    origin: 'MakeBid',
                                                    content: 'The customer has accepted your offer price.You can now proceed with the next steps.',
                                                    button: {
                                                        title: 'Accept pickup',
                                                        onButtonPress: () => navigation.navigate('PickupDetails', { vehicleScrapId: scrapper?.vehicleScrapId ?? postDetails?._id }),
                                                    }
                                                })}
                                            />
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    </Bottomsheet>
                )
            }

        </Mainview>
    )
}

export default MakeBid;
