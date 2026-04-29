import { useEffect, useState } from "react";
import { BackHandler, FlatList, View } from "react-native";

import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import Loader from "../../../Components/loader";
import { Button } from "../../../Components/Field";
import Mainview from "../../../Components/mainview";
import VectorIcons from "../../../Utilities/vectorIcons";
import { useLazyGetAllVehicleScrapsQuery } from "../../../Slices/scrap";
import { RFvalue, windowheight, windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks, { useApihooks, useHardwareBackPress } from "../../../Actions/Hooks/customhook";
import { capitalizeFirstLetter } from "../../../Actions/Hooks/helperfn";
import { returnOriginalFile } from "../../../Actions/Constants/constant";

const ScrapPostOverView: React.FC = () => {
    const { theme, navigation } = useCustomHooks();
    const { triggerScrapperDetails } = useApihooks();

    const apicalls = async () => {
        await triggerScrapperDetails();
    }

    useHardwareBackPress({
        title: "Alert",
        des: "Are you sure want to quit Carigato vendor",
        yesfn: () => BackHandler.exitApp()
    })

    const [getVechicles, { isLoading }] = useLazyGetAllVehicleScrapsQuery();
    const [page, setPage] = useState(1);
    const [verchicles, setVechicles] = useState<any[]>([]);

    const handelVehicles = async (pageNumber: number) => {
        try {
            const response = await getVechicles({ page: pageNumber, limit: 10 }).unwrap();
            const newData = response?.data || [];
            if (pageNumber === 1) {
                setVechicles(newData);
            } else {
                setVechicles(prev => [...prev, ...newData]);
            }
        } catch (error) {
            console.log("Vehicle fetch error:", error);
        }
    };

    useEffect(() => {
        handelVehicles(page);
    }, [page]);

    const handleNextPage = () => {
        if (!isLoading) {
            setPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        apicalls()
    }, []);

    console.log("verchicles", verchicles)

    return (
        <Mainview
            isheader={false}
            ismenuheader={true}
            statusbarcolor={theme.btnColor}
            statusbarcontent="light"
            headertitle="Scrap Dealer RVSF"
            isscollable={false}
            onleftfn={() => navigation.openDrawer()}
            scrollprops={{ keyboardShouldPersistTaps: 'always' }}
        >
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: windowwidth * 0.05 }}>
                    <Text style={{ flex: 1 }} family={"GBold"} size={"semilarge"}>{'Scrap Post'}</Text>
                </View>
                <FlatList
                    data={verchicles}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ marginTop: 20 }}
                    showsVerticalScrollIndicator={false}
                    onEndReached={() => handleNextPage()}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => {
                        return (
                            <View style={{
                                padding: windowwidth * 0.03,
                                borderRadius: 10,
                                margin: 5,
                                boxShadow: '0px 0px 5px rgba(0,0,0,0.2)',
                            }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: windowwidth * 0.03,
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
                                            source={{ uri: returnOriginalFile(item?.vehiclePicture[0]) }}
                                            type="image"
                                            width={'100%'}
                                            height={'100%'}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View style={{ flex: 1, marginLeft: windowwidth * 0.03 }}>
                                        <Text size="medium" family="GBold" color="#12110D" >{item?.vehicleOwnerName}</Text>
                                        <Text size="medium" family="GMedium" color="#12110D" top={'2.5%'} >{`Booking ID : ${item?.blockNo}`}</Text>
                                    </View>
                                    <View style={{ marginLeft: windowwidth * 0.03 }}>
                                        <Text size="medium" family="GBold" color="#12110D" >{`₹${item?.lastBidPrice}`}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: windowwidth * 0.05, alignItems: "center" }}>
                                    <View>
                                        <VectorIcons
                                            family={"MaterialIcons"}
                                            name={"location-on"}
                                            iconcolor={'#000C51'}
                                            size={windowwidth * 0.08}
                                        />
                                    </View>
                                    <View style={{ flex: 1, paddingHorizontal: windowwidth * 0.02 }}>
                                        <Text family={'GMedium'} style={{ flexShrink: 1, fontSize: RFvalue(13) }}>{capitalizeFirstLetter(item?.sector)}, {capitalizeFirstLetter(item?.city)}, {capitalizeFirstLetter(item?.state)}</Text>
                                    </View>
                                    {/* <View>
                                        <View
                                            style={{
                                                marginLeft: windowwidth * 0.03,
                                                paddingVertical: windowwidth * 0.01,
                                                paddingHorizontal: windowwidth * 0.03,
                                                borderWidth: 0.5,
                                                borderColor: '#38C274',
                                                borderRadius: 5,
                                                backgroundColor: '#38C2741A',
                                            }}
                                        >
                                            <Text family={'GRegular'} size={'semimedium'} color={'#389E0D'} style={{ lineHeight: Fontsize.medium }} >{item?.tag}</Text>
                                        </View>
                                    </View> */}
                                </View>
                                {
                                    // item?.bidPickupStatus === "pickupconfirmed" ?
                                    //     (
                                    //         <View
                                    //             style={{
                                    //                 flexDirection: 'row',
                                    //                 alignItems: 'center',
                                    //                 borderTopWidth: 0.5,
                                    //                 borderTopColor: '#CFCFCF',
                                    //                 paddingHorizontal: windowwidth * 0.03,
                                    //                 paddingVertical: windowwidth * 0.03
                                    //             }}>
                                    //             <Text size="medium" family="GMedium" color="#12110D" >
                                    //                 {`Status : `}
                                    //             </Text>
                                    //             <Text size="medium" family="GMedium" color={'#389E0D'} >
                                    //                 Completed
                                    //             </Text>
                                    //         </View>
                                    //     ) :
                                    (
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Button
                                                title="View Details"
                                                buttonStyle={{
                                                    flex: 1,
                                                    backgroundColor: '#EFF0F1',
                                                    height: windowheight * 0.055
                                                }}
                                                textStyle={{
                                                    color: '#12110D'
                                                }}
                                                onPress={() => navigation.navigate("ScrapDetails", { details: item })}
                                            />
                                            <Button
                                                title="Make bid"
                                                buttonStyle={{
                                                    flex: 1,
                                                    marginLeft: windowwidth * 0.05,
                                                    height: windowheight * 0.055
                                                }}
                                                onPress={() => navigation.navigate("MakeBid", { post: item })}
                                            />
                                        </View>
                                    )
                                }
                            </View>
                        )
                    }}
                    ListFooterComponent={(page > 1 && isLoading) ?
                        <Loader isloading={true} /> : null
                    }
                    ListEmptyComponent={() => (
                        <View style={{ height: windowheight * 0.8, justifyContent: "center", alignItems: "center", }} >
                            <Text family="medium" size="small" style={{ marginTop: 10 }} >No Data Found</Text>
                        </View>
                    )}
                />
            </View>
        </Mainview>
    )

}

export default ScrapPostOverView;