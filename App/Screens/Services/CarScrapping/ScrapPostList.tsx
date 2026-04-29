import React, { useCallback, useEffect } from "react";
import { FlatList, Pressable, TextInput, View } from "react-native";
import { useSelector } from "react-redux";

import Text from "../../../Components/text";
import Nodata from "../../../Components/Nodata";
import { Button } from "../../../Components/Field";
import Mainview from "../../../Components/mainview";
import VectorIcons from "../../../Utilities/vectorIcons";
import Images, { icons } from "../../../Utilities/images";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Fontfamily, Fontsize } from "../../../Utilities/uiasset";
import { NavigationProp, stackNavProp } from "../../../Actions/types";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import { authSliceSelector } from "../../../Common/redux/authSliceReducer";
import { useFetchScrapPostMutation } from "../../../Common/redux/scrapService";
import { capitalizeFirstLetter, returnOriginalFile } from "../../../Common/commonFunction";

import styles from "./styles";

type Props = {
    navigation: NavigationProp;
    route: stackNavProp<'ScrapPostList'>['route'];
};

const ScrapPostList: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const { userDetail } = useSelector(authSliceSelector);

    const [searchText, setSearchText] = React.useState('');
    const [scrapPost, setScrapPost] = React.useState<any>([]);
    const [triggerGetMyScrapPost, { isLoading }] = useFetchScrapPostMutation();

    const fetchScrapPost = useCallback(async () => {
        try {
            const response: any = await triggerGetMyScrapPost({ customerId: userDetail?._id }).unwrap();
            if (response?.status) {
                setScrapPost(response?.data ?? []);
            }
        } catch (error) {
            console.error('fetchScrapPost error', error);
        }
    }, [triggerGetMyScrapPost, userDetail?._id]);

    const filteredPosts = scrapPost.filter((item: any) =>
        item?.vehicleModel?.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        fetchScrapPost();
    }, []);

    return (
        <Mainview
            isheader={false}
            ismenuheader={true}
            isscollable={false}
            ismainloading={isLoading}
            horizontalpadding={0}
            headertitle="Car Scrapping Service"
            statusbarcontent={"light"}
            statusbarcolor={theme.btnColor}
        >
            <View style={style.container}>
                <View style={{ paddingHorizontal: windowwidth * 0.05, marginBottom: windowwidth * 0.03 }}>
                    <Text size="xxmedium" family="GMedium">{'My Post'}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 5,
                    backgroundColor: '#F3F3F3',
                    paddingHorizontal: windowwidth * 0.03,
                    paddingVertical: windowwidth * 0.01,
                    marginHorizontal: windowwidth * 0.05,
                    marginBottom: windowwidth * 0.03
                }}>
                    <VectorIcons
                        family="Feather"
                        name={"search"}
                        size={windowwidth * 0.045}
                        iconcolor={'#A8A8A8'}
                    />
                    <TextInput
                        placeholder="Search post"
                        style={{
                            flex: 1,
                            fontFamily: Fontfamily.GMedium,
                            fontSize: Fontsize.medium,
                            paddingHorizontal: windowwidth * 0.03,
                        }}
                        onChangeText={(text) => setSearchText(text)}
                        value={searchText}
                        placeholderTextColor={'#A8A8A8'}
                    />
                </View>
                <View style={{ flex: 1, paddingHorizontal: windowwidth * 0.025, marginBottom: windowwidth * 0.05 }} >
                    <FlatList
                        data={filteredPosts}
                        style={{ flex: 1, }}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        renderItem={({ item }: any) => (
                            <Pressable
                                style={{
                                    width: windowwidth / 2 - windowwidth * 0.075,
                                    borderRadius: 5,
                                    margin: windowwidth * 0.025,
                                }}
                                onPress={() => navigation.navigate('ScrapPostDetails', { post: item })}
                            >
                                <View
                                    style={{
                                        position: 'relative',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: windowwidth / 2 - windowwidth * 0.075,
                                        height: windowwidth / 2 - windowwidth * 0.075,
                                        borderRadius: 5,
                                        overflow: 'hidden',
                                        marginBottom: windowwidth * 0.02,
                                    }}
                                >
                                    <Images
                                        source={{ uri: returnOriginalFile(item?.vehiclePicture[0]) }}
                                        type="image"
                                        width={'100%'}
                                        height={'100%'}
                                        resizeMode="cover"
                                        style={{
                                            borderRadius: 3
                                        }}
                                    />
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: windowwidth * 0.02,
                                            right: windowwidth * 0.02,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: windowwidth * 0.08,
                                            height: windowwidth * 0.08,
                                            marginBottom: windowwidth * 0.02,
                                        }}
                                    >
                                        <Images
                                            source={icons.logo}
                                            type="image"
                                            width={'100%'}
                                            height={'100%'}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text size="xmedium" family="GMedium">{capitalizeFirstLetter(item?.vehicleModel)}</Text>
                                        <Text size="semimedium" family="GRegular" color="#010859">{'Price on Req'}</Text>
                                    </View>
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
                                                fontFamily: Fontfamily.GRegular,
                                                fontSize: Fontsize.xsmall,
                                                color: '#010859'
                                            }}
                                            onPress={() => navigation.navigate('BiddingRequest', { scrapId: item?._id })}
                                        />
                                    </View>
                                </View>
                            </Pressable>
                        )}
                        ListEmptyComponent={<Nodata text="No post found " container={{ height: windowheight * 0.60 }} />}
                    />
                </View>
            </View>
        </Mainview>
    )
}

export default ScrapPostList;