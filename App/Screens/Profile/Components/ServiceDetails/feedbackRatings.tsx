import React, { useCallback, useEffect, useState } from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import styles from "./styles";
import { Pressable, View } from "react-native";
import Text from "../../../../Components/text";
import VectorIcons from "../../../../Utilities/vectorIcons";
import Images, { icons } from "../../../../Utilities/images";
import { useFocusEffect } from "@react-navigation/native";
import { useLazyGetFeedbackAndRatingsQuery } from "../../../../Common/redux/vehicleServiceHook";
import { durationGone, numberChange, returnArrayOnly } from "../../../../Common/commonFunction";
import { FlatList } from "react-native-gesture-handler";


const defaultRatingsListData = {
    page: 1,
    limit: 10,
    data: [],
    isLoading: false,
    isLoadMore: false,
    initialLoading: false,
    isRefreshing: false,
    contentRendered: false,
    noDataContent: "No services",
    total: 0,
}

const FeedbackRatings: React.FC = () => {


    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const [trigger, { isLoading }] = useLazyGetFeedbackAndRatingsQuery(undefined);



    const [ ratingsList, setRatingsList ] = useState(defaultRatingsListData);
    const [ filterData, setFilterData ] = useState({ rating: 0 });


    useFocusEffect(
        useCallback(()=>{
            fetchDatas();
        },[])
    )

    const fetchDatas = async (isRefresh?: boolean, initialCall?: boolean,) => {

        if (initialCall) {
            setRatingsList({
                ...ratingsList,
                initialLoading: true,
            })
        }
        else if (isRefresh) {
            setRatingsList({
                ...ratingsList,
                isRefreshing: true,
            })
        }
        else {
            setRatingsList({
                ...ratingsList,
                isLoading: true,
            })
        }


        let page = isRefresh ? 1 : ratingsList?.page;

        let sendData: any = {
            page: page,
            limit: ratingsList?.limit,
        }
        if(filterData?.rating > 0){
            sendData.rating = filterData?.rating;
        }

        let resp = await trigger(sendData);

        console.log('respresprespa', resp)

        let response = { ...resp?.data };

        let setData: any = {
            page: page + 1,
            limit: sendData?.limit,
            data: [],
            isLoadMore: false,
            isLoading: false,
            initialLoading: false,
            isRefreshing: false,
            total: numberChange(response?.data?.total)
        }

        let data = [...returnArrayOnly(response?.data?.list)];
        if (sendData?.page == 1) {
            setData.data = data;
        }
        else {
            setData.data = [
                ...data,
                ...returnArrayOnly(ratingsList?.data),
            ];
        }
        setData.isLoadMore = returnArrayOnly(response?.data).length >= ratingsList?.limit ? true : false;


        setRatingsList({
            ...ratingsList,
            ...setData,
        });
    }

    const onRefresh = () => {
        if (
            !ratingsList.isLoading
        ) {
            fetchDatas(true)
        }
    }

    console.log('ratingsListratingsList', ratingsList,)

    const onEndReached = () => {
        if (
            !ratingsList.initialLoading
            &&
            ratingsList?.contentRendered
            &&
            !ratingsList.isLoading
            &&
            ratingsList?.isLoadMore
        ) {
            fetchDatas()
        }
    }

    const onContentSizeChange = (w: number, h: number) => {
        if (h > 1) {
            setRatingsList({
                ...ratingsList,
                contentRendered: true,
            });
        }
        else if (h < 1 && !ratingsList?.initialLoading) {
            setRatingsList({
                ...ratingsList,
                contentRendered: true,
            });
        }
    };

    const onChangeFilter = (value: any, id: string) => {
        let setData = { ...filterData };
        setData = {
            ...setData,
            [id]: value,
        }
        if(id == 'rating'){
            if (value == filterData?.rating) {
                setData = {
                    ...setData,
                    [id]: 0,
                }
            }
        }
        setFilterData({...setData});
    }

    useEffect(()=>{
        fetchDatas(true);
    },[filterData]);

    console.log('dkjsfhsd',ratingsList)

    const reviewCard = (data: any, index: any) => {
        console.log('reviewdataaa',data,)
        return (
            <View style={{ gap: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Images type="image" source={icons.Profilepic} />
                        <View>
                            <Text family="GBold" size="semilarge">
                                {data?.userDetail?.name}
                            </Text>
                            <View style={{ flexDirection: 'row', }}>
                                {[1, 2, 3, 4, 5].map((rating, index) => {
                                    console.log('rattttt',rating,numberChange(data?.rating),rating <= numberChange(data?.rating))
                                    return(
                                        <VectorIcons
                                        family="Ionicons"
                                        name={rating <= numberChange(data?.rating) ? 'star' : 'star-outline'}
                                        size={14}
                                        iconcolor={"#FB9506"}
                                        style={{ marginRight: 4, }}
                                    />
                                    )
                                }
                                )}
                                {
                                    numberChange(data?.feedBackTiming) > 0
                                    ?
                                    <Text family="GRegular" size="xmedium" style={{ marginLeft: 10 }}>
                                        {durationGone(numberChange(data?.feedBackTiming))}
                                    </Text>
                                    :
                                    <></>
                                }
                            </View>
                        </View>
                    </View>
                    <VectorIcons family="Entypo"
                        name="dots-three-vertical" />
                </View>
                <Text family="GRegular" size="semimedium" style={{ lineHeight: 18, }}>
                    {data?.feedback}
                </Text>
            </View>
        )
    }

    return (
        <Mainview
            isheader={true}
            headertitle="Feedback & Ratings"
            onleftfn={() => navigation.goBack()}
            ismainloading={ratingsList?.initialLoading ? true : false}
        >
            <View style={{ marginTop: "5%", gap: 20 }}>
                <Text family="GMedium" size="semilarge">Feedback & Ratings</Text>
                <Text family="GRegular" size="semimedium" style={{ lineHeight: 18, }}>Your opinion matters! Please take a moment to rate our service and share your
                    feedback — it helps us improve and serve you better.</Text>
                <View style={style.container}>
                    <View style={{ gap: 10, width: '50%' }}>
                        {[5, 4, 3, 2, 1].map((rating, index) => (
                            <Pressable
                                onPress={()=>onChangeFilter(rating,"rating")}
                                style={{ flexDirection: 'row', gap: 8, alignItems: 'center', alignContent: 'center' }}
                            >
                                <Text family="GMedium" size="xmedium" key={rating}>{rating}</Text>
                                <VectorIcons
                                    family="Ionicons"
                                    name={"star"}
                                    size={14}
                                    iconcolor="#FB9506"
                                    style={{ marginRight: 4, }}
                                />
                                <View
                                    style={{
                                        width: `${((5 - index) / 5) * 100}%`,
                                        height: 6,
                                        backgroundColor: '#006D60',
                                        borderRadius: 10,
                                    }}
                                />

                            </Pressable>
                        ))}
                    </View>
                    <View style={{ gap: 10 }}>
                        {
                            filterData?.rating > 0
                                ?
                                <>
                                    <Text family="GBold" size="xxxxlarge">{numberChange(filterData?.rating).toFixed(1)}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Pressable key={star} >
                                                <VectorIcons
                                                    family="Ionicons"
                                                    name={star <= filterData?.rating ? "star" : "star-outline"}
                                                    size={14}
                                                    iconcolor="#FB9506"
                                                    style={{ marginRight: 4 }}
                                                />
                                            </Pressable>
                                        ))}
                                    </View>
                                </>
                                :
                                <>
                                    <Text>All reviews</Text>
                                </>
                        }
                        
                        <Text family="GBold" size="xmedium">{ratingsList?.total} Reviews</Text>
                    </View>
                </View>
                {
                    <FlatList
                        onEndReachedThreshold={0.3}
                        data={ratingsList?.data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <>
                            {reviewCard(item, index)}
                            </>
                        )}
                        onEndReached={() => onEndReached()}
                        onRefresh={() => onRefresh()}
                        refreshing={ratingsList.isRefreshing}
                        onContentSizeChange={(w, h) => onContentSizeChange(w, h)}
                    />
                }
                
            </View>
        </Mainview >
    )
}

export default FeedbackRatings;