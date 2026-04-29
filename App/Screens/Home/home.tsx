import React, { useCallback, useEffect, useRef, useState } from "react"
import Mainview from "../../Components/mainview"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../../Navigations/navigationtypes";
import Homeheader from "./homeheader";
import Homecard from "./homecard";
import Text from "../../Components/text";
import { borderradius, RFvalue, windowheight, windowwidth } from "../../Utilities/dimensions";
import Explore from "./explore";
import Flexcomponent from "../../Components/flexcomponent";
import Images, { image } from "../../Utilities/images";
import useCustomHooks, { Fetchcurrencies, localnotification, Switchaccounts, useApihooks } from "../../Actions/Hooks/customhook";
import Trade from "./trade";
import { Alert, ImageBackground, Pressable, View } from "react-native";
import { authSelector, setAffiliateData, setUserData, useLazyUserDetailsQuery } from "../../Slices/auth";
import { setItem } from "../../Actions/Storage/localstorage";
import { useSelector } from "react-redux";
import { useLazyAffiliateDetailsQuery } from "../../Slices/affiliate";
import { setUserBalance, useAvailableMarginMutation, useLazyPairDetailsQuery } from "../../Slices/future";
import { io } from "socket.io-client";
import useSocket from "../../Actions/Socket/sockethook";


type Props = NativeStackScreenProps<BottomTabParamList, 'Home'>;

const Home: React.FC<Props> = () => {
    const { navigation, dispatch, cleardata } = useCustomHooks()
    const normaltrade = [
        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },

        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },


        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },

        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },
    ]


    const populartrade = [
        {
            title: "SEI",
            des: "Sei",
            image: image.Sei,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "gain"
        },

        {
            title: "FUN",
            des: "fun",
            image: image.Fun,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "sold"

        },
        {
            title: "FUN",
            des: "fun",
            image: image.Fun,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "sold"

        },

        {
            title: "SEI",
            des: "Sei",
            image: image.Sei,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "gain"
        },

    ]

    const [isgainer, setIsgainer] = useState(false)

    const { Fetchcurrencies, triggerswitchaccount, triggeraffiliate, triggeruserdetails, Fetchsubaccounts, triggerPairDetails, triggerpositionOrders, triggerAvailableMargin } = useApihooks()
    useEffect(() => {
        apicalls()
    }, []);









    const apicalls = async () => {
        
        await triggerswitchaccount()
        await triggerPairDetails()
        await triggeruserdetails()
        await Fetchcurrencies()
        await triggeraffiliate()
        await triggerpositionOrders()
        await triggerAvailableMargin();
        await Fetchsubaccounts()

    }


    // useEffect(() => {
    //     const socket = getSocket();
    //     if (!socket) return;

    //     socket.on('USER_ACCOUNT_DETAILS', (result:any) => {
    //         console.log("USER_ACCOUNT_DETAILS", result)

    //     });

    //     return () => {
    //         socket.off("USER_ACCOUNT_DETAILS");
    //     };
    // }, []);

    // const socketEvents: any = {
    //     'FORCE_LOGOUT': useCallback((message: any) => {
    //         Alert.alert("alert")
    //     }, []),

    // }




    return (
        <Mainview
            isheader={false}
            isscollable={true}
            customheader={
                <Homeheader

                />
            }
            horizontalpadding={"4%"}
            isbottomtab={true}
            onreload={() => apicalls()}
            isrefereshcontrol={true}
        >

            <Homecard />
            <Text size="medium" family="medium" top={"5%"} >Explore More</Text>

            <Explore />

            <Images
                type="image"
                source={image.Bannner1}
                resizeMode="stretch"
                style={{ width: "100%", height: windowheight * 0.15, marginTop: "5%" }}
            />

            <Flexcomponent justifyContent="space-between" top={"5%"}  >
                <Text size="medium" family="medium"  >Most Traded On GreenEx</Text>
                <Pressable onPress={() => navigation.navigate("Seeall", { type: "mosttrade" })}>
                    <Text color="#9899A0" size="small" >See all</Text>
                </Pressable>
            </Flexcomponent>

            <Flexcomponent justifyContent="space-between" style={{ flexWrap: "wrap", marginTop: "2%", }} >
                {normaltrade?.map((e) => (
                    <Trade
                        type="normal"
                        image={e?.image}
                        price={e?.price}
                        change={e?.change}
                        change_percentage={e?.change_percentage}
                        title={e?.title}
                    />
                ))}
            </Flexcomponent>

            <Flexcomponent justifyContent="space-between" top={"5%"}>
                <Text size="medium" family="medium"  >Popular Traded</Text>
                <Pressable onPress={() => navigation.navigate("Seeall", { type: "populartrade" })} >
                    <Text color="#9899A0" size="small" >See all</Text>
                </Pressable>
            </Flexcomponent>


            <Flexcomponent justifyContent="space-between" style={{ flexWrap: "wrap", marginTop: "2%", }} >
                {populartrade?.map((e) => (
                    <Trade
                        type="popular"
                        image={e?.image}
                        price={e?.price}
                        change={e?.change}
                        change_percentage={e?.change_percentage}
                        title={e?.title}
                        des={e?.des}
                        status={e?.status}
                    />
                ))}
            </Flexcomponent>

            <Flexcomponent justifyContent="space-between" top={"5%"}>
                <Text size="medium" family="medium"  >Top Movers Today</Text>

                <Pressable onPress={() => navigation.navigate("Seeall", { type: "mosttrade" })}>
                    <Text color="#9899A0" size="small" >See all</Text>
                </Pressable>
            </Flexcomponent>
            <Flexcomponent justifyContent="flex-start" top={"5%"} >
                <Pressable onPress={() => setIsgainer(!isgainer && true)} style={{ width: "30%", paddingVertical: "2.5%", paddingHorizontal: "5%", borderRadius: borderradius * 3, backgroundColor: !isgainer ? "#fff" : "#202225" }} >
                    <Text family="medium" align="center" size="semimedium" color={isgainer ? "#fff" : "#202225"} >Gainers</Text>
                </Pressable>

                <Pressable onPress={() => setIsgainer(!isgainer && true)} style={{ width: "30%", paddingVertical: "2.5%", paddingHorizontal: "5%", borderRadius: borderradius * 3, backgroundColor: isgainer ? "#fff" : "#202225", marginLeft: "5%" }} >
                    <Text family="medium" align="center" size="semimedium" color={!isgainer ? "#fff" : "#202225"} >Losers</Text>
                </Pressable>
            </Flexcomponent>

            <Flexcomponent justifyContent="space-between" style={{ flexWrap: "wrap", marginTop: "2%", }} >
                {normaltrade?.map((e) => (
                    <Trade
                        type="normal"
                        image={e?.image}
                        price={e?.price}
                        change={e?.change}
                        change_percentage={e?.change_percentage}
                        title={e?.title}
                    />
                ))}
            </Flexcomponent>

            <Images
                type="image"
                source={image.Banner2}
                resizeMode="stretch"
                style={{ width: "100%", height: windowheight * 0.15, marginVertical: "5%" }}
            />

        </Mainview>
    )

}

export default Home