import React, { useEffect, useRef, useState } from "react";
import { borderradius, windowheight, windowwidth } from "../../Utilities/dimensions";
import { View } from "react-native";
import PagerView from "react-native-pager-view";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Flexcomponent from "../../Components/flexcomponent";
import Images, { icons } from "../../Utilities/images";
import Text from "../../Components/text";
import { Colors } from "../../Utilities/uiasset";
import { isEmpty, returnArrayOnly, returnOriginalFile } from "../../Common/commonFunction";
import { useGetFeedbackAndRatingsQuery } from "../../Common/redux/vehicleServiceHook";


type ReviewsProps = {
    planId?: string;
}

const Reviews: React.FC<ReviewsProps> = ({ planId = "" }) => {



    const { theme } = useCustomHooks()


    const { data, refetch, isLoading, } = useGetFeedbackAndRatingsQuery({ limit: 10, page: 1, planId: (isEmpty(planId) ? null : planId) });

    console.log('datadatadata', data, { planId: planId })
    const [reviews, setReviews] = useState(returnArrayOnly(data?.data?.list));
    // const reviews = [
    //     {
    //         name: "Nilesh Pawar",
    //         reviews: "“I recently got my car cleaned and I’m really impressed with the service. The team did a thorough job—interior and exterior both look spotless. Seats, dashboard, and carpets were cleaned perfectly, and even the hard-to-reach areas were taken care of. The exterior has a nice shine, almost like new!"

    //     },
    //     {
    //         name: "Rahul Verma",
    //         reviews:
    //             "I booked a full car cleaning service last week and the results were excellent. The team paid close attention to every corner—floormats, door panels, and even the tiny gaps near the gear console were cleaned properly. The exterior polishing was done smoothly, giving the car a fresh and shiny look similar to when it was brand new!",
    //     },
    //     {
    //         name: "Sneha Kulkarni",
    //         reviews:
    //             "I tried their cleaning service for the first time and it exceeded my expectations. The interior was thoroughly vacuumed, stains were removed from the seats, and the dashboard looked perfectly polished. Even the exterior wash was done with great care, leaving the car looking bright, clean, and almost showroom-ready!",
    //     },
    // ];
    const [currentpage, setCurrentpage] = useState(0)
    const pagerRef = useRef<any>(null);



    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentpage(prev => {
                let next = prev + 1;

                if (next >= reviews.length) next = 0;

                pagerRef.current?.setPage(next);

                return next;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        refetch();
    }, [planId]);

    useEffect(() => {
        setReviews(returnArrayOnly(data?.data?.list))
    }, [data?.data?.list])


    return (
        <View style={{ width: "100%", height: windowheight * 0.2, marginTop: "5%", }} >
            {
                reviews?.length > 0
                    ?
                    <>
                        <PagerView
                            ref={pagerRef}
                            style={{ height: "85%", }}
                            initialPage={0}
                            onPageSelected={(e) => setCurrentpage(e?.nativeEvent?.position)}
                        >
                            {
                                reviews?.length > 0
                                    ?

                                    reviews?.map((value: any, i: number) => (
                                        <View style={{ width: "100%", padding: "2.5%", backgroundColor: theme.cardbg, borderRadius: borderradius * 0.5, paddingHorizontal: "4%" }} >
                                            <Flexcomponent justifyContent="flex-start" >
                                                <Images
                                                    type="image"
                                                    source={value?.userDetail?.profile ? { uri: returnOriginalFile(value?.userDetail?.profile) } : icons.User}
                                                    width={windowwidth * 0.075}
                                                    height={windowwidth * 0.075}
                                                />
                                                <Text style={{ marginLeft: "2.5%" }} size="medium" family="GRegular" >{value?.userDetail?.name ?? value?.userDetail?.mobileNo}</Text>

                                            </Flexcomponent>
                                            <Text numoflines={6} top={"2.5%"} size="semimedium" family="GRegular" >{value?.feedback}</Text>
                                        </View>)
                                    )
                                    :
                                    <></>
                            }
                        </PagerView>

                        <Flexcomponent style={{ height: "15%", alignItems: "center", gap: 3 }}  >
                            {
                                reviews?.length > 0
                                    ?
                                    reviews.map((_: any, index: number) => <View key={index} style={{ width: currentpage == index ? windowwidth * 0.05 : windowwidth * 0.03, height: 5, backgroundColor: currentpage === index ? theme.btnColor : "#000C5133", borderRadius: borderradius * 2 }} />)
                                    :
                                    <></>
                            }

                        </Flexcomponent>
                    </>
                    :
                    <>
                        <View style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                            <Text family="GMedium" size="semilarge">No Reviews yet</Text>
                        </View>

                    </>
            }
        </View>
    )
}

export default Reviews