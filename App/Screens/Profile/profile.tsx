import React, { useCallback, useState } from "react";
import { Pressable, View } from 'react-native';
import Mainview from "../../Components/mainview";
import Card from "../../Components/Card";
import { Colors } from "../../Utilities/uiasset";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { borderradius } from "../../Utilities/dimensions";
import Images, { icons } from "../../Utilities/images";
import Text from "../../Components/text";
import LinearGradient from "react-native-linear-gradient";
import Listcomponent from "../../Components/listcomponent";
import Switch from "../../Components/Field/switch/swtich";
import { ScrollView } from "react-native-gesture-handler";
import { confirmAlert, logOutFunction, returnOriginalFile } from "../../Common/commonFunction";
import { useDispatch } from "react-redux";
import { useGetMyDetailQuery, userApi } from "../../Common/redux/userHook";
import { logout } from "../../Common/redux/authSliceReducer";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import config from "../../Common/config";
import { updateNotificationStatus } from "../../Common/axiosHooks/userHooks";

const Profile: React.FC = () => {



    const { data, isLoading, refetch } = useGetMyDetailQuery(undefined);



    const { theme, navigation } = useCustomHooks()
    const dispatch = useDispatch();



    const userData = data?.data;
    const [notification, setNotification] = useState<any>(false)
    const [disableStatus, setDisableStatus] = useState(false);


    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    )

    const logOutClick = () => {
        confirmAlert(
            "Do you want to logout?",
            () => {
                logOutFunction();
                dispatch(userApi.util.resetApiState());
                dispatch(logout());
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                    })
                );
            },
            () => { }
        )
    }

    const onChangeNotification = async () => {
        if (!disableStatus) {
            setDisableStatus(true)
            let sendData = {
                action: !userData?.pushNotification
            }
            let resp = await updateNotificationStatus(sendData)
            console.log('resprespresp', resp);
            await refetch();
            setDisableStatus(false)
        }
    }

    console.log('userDatauserData', userData)

    return (
        <Mainview
            headertitle="Profile"
            lefticon={<></>}
            horizontalpadding={"4%"}
            ismainloading={isLoading}
            isoverlaploader={disableStatus}
            onleftfn={()=>{}}
        >
            <Card containerStyle={{ width: "100%", paddingHorizontal: "2.5%", paddingVertical: "5%", borderRadius: borderradius * 0.5, backgroundColor: theme.btnColor, marginTop: "5%", flexDirection: "row", alignItems: "center" }} >
                <View style={{ width: "15%", justifyContent: "center", alignItems: "center" }} >
                    <Images
                        type="image"
                        source={
                            userData?.profile
                                ?
                                { uri: returnOriginalFile(userData?.profile) }
                                :
                                icons.Man
                        }
                    />
                </View>
                <View style={{ width: "50%", justifyContent: "center", paddingHorizontal: "2.5%" }} >
                    <Text family="GMedium" size="medium" color="#fff" >Hello, {userData?.name ? userData?.name : "Customer"}</Text>
                    <Text top={"1%"} family="GRegular" size="medium" color="#fff" >{userData?.mobileNo ? userData?.mobileNo : ""}</Text>
                </View>
                <View style={{ width: "35%", }} >
                    <Pressable onPress={() => navigation.navigate('UpgradePlan')}>
                        <LinearGradient style={{ width: "100%", paddingVertical: "10%", borderTopRightRadius: borderradius * 2, borderBottomRightRadius: borderradius * 2, borderTopLeftRadius: borderradius * 2, alignItems: "center" }} start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }} colors={["#DF0946", "#CE6700"]} >
                            <Text size="semimedium" color="#fff" >Upgrade plan</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
            </Card>
            <ScrollView>

                <Listcomponent onpress={() => navigation.navigate("SubscriptionPlan")}
                    src={icons.Diamond}
                    title="My Subscription Plan"
                />


                <Listcomponent onpress={() => navigation.navigate("MyProfile")}
                    src={icons.Myprofile}
                    title="My Profile"
                />

                <Listcomponent onpress={() => navigation.navigate("ReferEarn")}
                    src={icons.Reffer}
                    title="Refer & Earn"
                />


                <Listcomponent onpress={() => navigation.navigate("MyAddress")}
                    src={icons.Profileloc}
                    title="My Address"
                />

                <Listcomponent onpress={() => navigation.navigate("ServiceDetail")}
                    src={icons.Profileservice}
                    title="Service Details"
                />

                <Listcomponent onpress={() => navigation.navigate("VehicleManage", { VehicleAdded: false })}
                    src={icons.Profilecar}
                    title="Manage Your Vehicle"
                />

                <Listcomponent
                    src={icons.Bell}
                    title="Notifications"
                    righticon={
                        <Switch
                            value={userData?.pushNotification}
                            onPress={() => {
                                onChangeNotification()
                            }}
                        />
                    }
                />

                <Listcomponent onpress={() => navigation.navigate("ContactUs")}
                    src={icons.Profilephone}
                    title="Contact Us"
                />

                <Listcomponent
                    src={icons.Logout}
                    title="Logout"
                    onpress={() => logOutClick()}
                    righticon={<></>}
                />

            </ScrollView>

        </Mainview>

    )
}

export default Profile;