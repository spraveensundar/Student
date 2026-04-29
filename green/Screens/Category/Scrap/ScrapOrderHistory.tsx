import { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

import Line from "../../../Components/line";
import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import Loader from "../../../Components/loader";
import Nodata from "../../../Components/nodata";
import Toptabs from "../../../Components/toptabs";
import Mainview from "../../../Components/mainview";
import { Fontsize } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectorIcons";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { useLazyMyBidsBookingHistoryQuery } from "../../../Slices/scrap";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import { capitalizeFirstLetter } from "../../../Actions/Hooks/helperfn";


const ScrapOrderHistory: React.FC = () => {
    const { navigation } = useCustomHooks();
    const [currentindex, setCurrentindex] = useState(0);
    const statusTypes = ["pending", "completed", "cancel"];

    const [mybidsBooking, { isFetching, isLoading }] = useLazyMyBidsBookingHistoryQuery();
    const [page, setPage] = useState(1);
    const [myBids, setMyBids] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const handelMyBids = async (pageNumber: number) => {
        try {
            const response = await mybidsBooking({ page: pageNumber, limit: 10, type: statusTypes[currentindex] }).unwrap();
            console.log("response", response)
            const newData = response?.data || [];
            if (pageNumber === 1) {
                setMyBids(newData);
            } else {
                setMyBids(prev => [...prev, ...newData]);
            }
            setHasMore(newData.length === 10);
        } catch (error) {
            console.log("Vehicle fetch error:", error);
        }
    };

    useEffect(() => {
        handelMyBids(page);
    }, [page, currentindex]);

    useEffect(() => {
        setPage(1);
        setHasMore(true);
    }, [currentindex]);

    const handleNextPage = () => {
        if (!isLoading && hasMore) {
            setPage(prev => prev + 1);
        }
    };

    return (
        <Mainview
            isheader
            headertitle="Scrap Order History"
            isscollable={false}
        >
            <View style={{ flex: 1 }} >
                <Toptabs
                    tabs={["Pending", "Completed", "Cancelled"]}
                    activeindex={currentindex}
                    onchange={setCurrentindex}
                    width={100}
                    textStyle={{ fontSize: Fontsize.semimedium }}
                    containerstyle={{ paddingVertical: windowwidth * 0.05 }}
                    paddingvertical={"3%"}
                />
                <Line width={windowwidth} conatainerstyle={{ alignSelf: "center" }} />
                {
                    isFetching ? (
                        <Loader isloading={true} />
                    ) : (
                        <View style={{ flex: 1, marginTop: 10 }} >
                            <FlatList
                                data={myBids}
                                style={{ flex: 1, }}
                                showsVerticalScrollIndicator={false}
                                onEndReached={() => {
                                    if (myBids.length >= 10) {
                                        handleNextPage();
                                    }
                                }}
                                onEndReachedThreshold={0.5}
                                renderItem={({ item }: any) => (
                                    <Pressable style={{ borderRadius: 10, margin: 5, boxShadow: '0px 0px 5px rgba(0,0,0,0.2)' }} onPress={() => navigation.navigate("ScrapDetails", { details: item, screen: "order" })}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: windowwidth * 0.03,
                                            margin: windowwidth * 0.03,
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
                                                    source={require('../../../Assets/images/scrap-car.png')}
                                                    type="image"
                                                    width={'100%'}
                                                    height={'100%'}
                                                    resizeMode="cover"
                                                />
                                            </View>
                                            <View style={{ flex: 1, marginLeft: windowwidth * 0.03 }}>
                                                <Text size="medium" family="GBold" color="#12110D" >{item?.vehicleScrapId?.vehicleOwnerName}</Text>
                                                <Text size="medium" family="GMedium" color="#12110D" top={'2.5%'} >{`Booking ID : ${item?.vehicleScrapId?.blockNo}`}</Text>
                                            </View>
                                            <View style={{ marginLeft: windowwidth * 0.03 }}>
                                                <Text size="medium" family="GBold" color="#12110D" >{`₹${item?.price}`}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginHorizontal: windowwidth * 0.03, marginVertical: windowwidth * 0.05, alignItems: "center" }}>
                                            <View>
                                                <VectorIcons
                                                    family={"MaterialIcons"}
                                                    name={"location-on"}
                                                    iconcolor={'#000C51'}
                                                    size={windowwidth * 0.08}
                                                />
                                            </View>
                                            <View style={{ flex: 1, paddingHorizontal: windowwidth * 0.02 }}>
                                                <Text family={'GMedium'} size={'medium'} style={{ flexShrink: 1 }}>{capitalizeFirstLetter(item?.vehicleScrapId?.sector)}, {capitalizeFirstLetter(item?.vehicleScrapId?.city)}, {capitalizeFirstLetter(item?.vehicleScrapId?.state)}</Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            borderTopWidth: 1,
                                            borderTopColor: '#CFCFCF',
                                            paddingVertical: windowwidth * 0.05,
                                            paddingHorizontal: windowwidth * 0.03,
                                        }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text family="GMedium" size="medium" style={{ color: '#000000' }}>{'Status : '}</Text>
                                                <Text family="GMedium" size="medium" style={{ color: item?.bidStatus === 'pending' ? '#BF5600' : item?.status === 'completed' ? '#389E0D' : '#DC2020' }}>{capitalizeFirstLetter(item?.bidStatus)}</Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                )}
                                ListFooterComponent={(page > 1 && isLoading) ?
                                    <Loader isloading={true} /> : null
                                }
                                ListEmptyComponent={<Nodata text="No Orders found " container={{ height: windowheight * 0.75 }} />}
                            />
                        </View>
                    )
                }
            </View>
        </Mainview>
    )

}

export default ScrapOrderHistory;