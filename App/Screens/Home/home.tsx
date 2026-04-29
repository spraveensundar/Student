import React, { useCallback, useEffect } from "react";
import Mainview from "../../Components/mainview";
import HomeHeader from "./homeHeader";
import { Colors } from "../../Utilities/uiasset";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../../Navigations/stacknavigationtypes";
import Flexcomponent from "../../Components/flexcomponent";
import Text from "../../Components/text";
import { Pressable, StatusBar, View } from "react-native"
import ServiceCategories from "./serviceCategories";
import Otherservice from "./otherservice";
import Offers from "./offers";
import Banner from "./banner";
import Recommended from "./recommended";
import Images, { icons } from "../../Utilities/images";
import { borderradius, RFvalue, windowheight, windowwidth } from "../../Utilities/dimensions";
import LinearGradient from "react-native-linear-gradient";
import VectorIcons from "../../Utilities/vectorIcons";
import Reviews from "./Reviews";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { useFocusEffect } from "@react-navigation/native";
import useSocket from "../../Actions/Sockets/sockethook";
import { constantData, delay } from "../../Common/constant";
import { useGetMyDetailQuery } from "../../Common/redux/userHook";
import { copyToClipboard } from "../../Common/commonFunction";
import { useSelector } from "react-redux";
import { getItem } from "../../Common/localStorage";

type Props = NativeStackScreenProps<BottomTabParamList, 'Home'>;

const Home: React.FC<Props> = () => {


    const { data, isLoading, refetch } = useGetMyDetailQuery(undefined);
    

    const userData = data?.data;



    interface titleprops {
        title: string,
        viewall?: () => void,
        top?: any,
        showViewAll?: boolean,
    }
    const Titlecomponent = ({
        title,
        top = 0,
        viewall,
        showViewAll = false,
    }: titleprops) => {
        return (
            <Flexcomponent justifyContent="space-between" top={top}  >
                <Text size="medium" family="bold"  >{title}</Text>
                {
                    showViewAll
                        ?
                        <Pressable onPress={viewall} style={{ flexDirection: "row", alignItems: "center" }} >
                            <Text style={{ fontSize: RFvalue(11.5) }} family="GMedium" >View all</Text>
                            <VectorIcons
                                family="Feather"
                                name={"chevron-right"}
                                size={windowwidth * 0.04}
                            />
                        </Pressable>
                        :
                        <></>
                }
            </Flexcomponent>
        )
    }

    const { theme } = useCustomHooks()

    console.log('userDatauserData',userData, userData?.userDetail?.referralCode,getItem(constantData.fcmData))

    return (
        <Mainview
            isbottomtab={true}
            statusbarcolor={theme.btnColor}
            statusbarcontent="light"
            isheader={false}
            isscollable={true}

            customheader={
                <HomeHeader />
            }
            horizontalpadding={"6%"}
        // isnodata
        // isoverlaploader
        // ismainloading
        >

            <Titlecomponent title="Service categories" top={"5%"} />
            <Flexcomponent justifyContent="space-between" style={{ flexWrap: "wrap", marginTop: "5%", }} >
                <ServiceCategories />
            </Flexcomponent>

            <Text size="medium" family="bold" top={"2.5%"}  >Other Services</Text>
            <Otherservice />

            <Titlecomponent title="Carigato Offers" top={"2.5%"} />

            <Offers />

            <Banner />


            <Titlecomponent title="Recommended Services" top={"5%"} />

            <Recommended />

            <Titlecomponent title="Customer Reviews" top={"5%"} />

            <Reviews />

            <Text size="medium" family="bold" top={"2.5%"}  >Refer and Earn Benefits</Text>
            <Images
                type="image"
                source={icons.Refferal}
                style={{ width: "100%", height: windowheight * 0.25, marginTop: "5%" }}
                resizeMode="stretch"
            />

            <Text size="medium" family="bold" top={"2.5%"}  >Referral Link</Text>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#C86DD7", "#7A2BE2"]}
                style={{ flex: 1, paddingVertical: "3%", paddingHorizontal: "5%", borderRadius: borderradius * 0.5, flexDirection: "row", alignItems: "center", marginTop: "2.5%", marginBottom: "5%" }} >
                <View style={{ width: "90%", }} >
                    <Text top={5} size="semimedium" family="GBold" color="#fff" >
                        {userData?.referralCode}
                    </Text>
                </View>
                <Pressable
                    style={{ width: "10%", alignItems: "flex-end" }}
                    onPress={()=>copyToClipboard(userData?.referralCode)}
                >
                    <VectorIcons
                        family="Ionicons"
                        name={"copy-outline"}
                        iconcolor={"#fff"}
                        size={windowwidth * 0.05}
                    />
                </Pressable>
            </LinearGradient>
            {/* <Flexcomponent justifyContent="space-between" top={"5%"}  >
                <Text size="medium" family="bold"  >Customer Reviews</Text>
                <Pressable>
                    <Text size="xsmall" family="GMedium" >View all</Text>
                </Pressable>
            </Flexcomponent> */}


        </Mainview>
    )
}

export default Home;