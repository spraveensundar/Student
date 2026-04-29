import React, { useCallback } from "react";
import {
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { BottomTabParamList, Stacknavigationtypes } from "./stacknavigationtypes";
import { windowheight, windowwidth } from "../Utilities/dimensions";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Fontfamily, Fontsize } from "../Utilities/uiasset";
import Home from '../Screens/Home/home';
import Images, { icons } from "../Utilities/images";
import Support from "../Screens/Support/support";
import Orders from "../Screens/Orders/orders";
import Profile from "../Screens/Profile/profile";
import FastImage from '@d11/react-native-fast-image';
import useCustomHooks from "../Actions/Hooks/customhook";
import CustomTabBar from "./customtab";
import UpgradePlan from "../Screens/Profile/upgradePlan";
import { useGetMyDetailQuery } from "../Common/redux/userHook";
import { CommonActions, useFocusEffect, useNavigation, useNavigationState } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { confirmAlert, isEmpty, loginCheck } from "../Common/commonFunction";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Bottomtab'>;

const Bottomtab: React.FC<Props> = ({ route }) => {


    const { data, isLoading } = useGetMyDetailQuery(undefined);
    const index = useNavigationState(state => state.index);
    const userData = useSelector((state: any)=>state?.userData)
    const navigation = useNavigation();


    
    const Tab = createBottomTabNavigator<BottomTabParamList>();
    const insets = useSafeAreaInsets();
    const { theme } = useCustomHooks()


    
    
    console.log('userDatauserData',route)

    useFocusEffect(
        useCallback(() => {
            const backAction = () => {

                const state: any = navigation.getState();
                const activeIndex = state?.routes?.[0]?.state?.index;
                
                
                // const routes = state.routes;
                console.log('activeIndexactiveIndex',activeIndex,state)
                if(route?.params?.noBack){
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "Bottomtab", params: { screen: "Home" } }],
                        })
                    );
                    return true;
                }
                if (activeIndex == 0||isEmpty(activeIndex)) {
                    confirmAlert(
                        "Do you want to exit app?",
                        () => BackHandler.exitApp(),
                        () => { },
                    )
                    return true;
                }

                // const parentState: any = navigation.getState(); // Stack state

                // const tabState: any = parentState.routes[0].state;
                // const checkIndex = tabState.index;

                // const previousRouteName = state?.routes?.[checkIndex - 1]?.name;
                // console.log('previousRouteNamepreviousRouteName', parentState,tabState,checkIndex,previousRouteName)
                // if(previousRouteName){
                //     navigation.navigate("Bottomtab", { screen: previousRouteName });
                // }
                
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        },[])
    )
    

    const tabs = [
        {
            name: "Home",
            component: Home,
            type: "svg",
            iconName: "Home",
            activeIconName: "Homeactive"

        },
        {
            name: "Support",
            component: Support,
            type: "svg",
            iconName: "Support",
            activeIconName: "supportactive"
        },
        {
            name: "Upgrade",
            component: UpgradePlan,
            type: "gif",
            icon: icons.Premium,
        },
        {
            name: "Orders",
            component: Orders,
            type: "svg",
            iconName: "Orders",
            activeIconName: "ordersactive"
        },
        {
            name: "Profile",
            component: Profile,
            type: "svg",
            iconName: "Profile",
            activeIconName: "profileactive"
        },

    ]

    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />} // 👈 Custom tab bar here
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: insets.bottom + windowheight * 0.08,
                    borderTopWidth: 0,
                },
                tabBarItemStyle: {
                    alignItems: "center",
                    flexDirection: "row",
                    backgroundColor: theme.background,
                    shadowColor: '#000C5140',

                },
                tabBarActiveTintColor: theme.theme === "light" ? theme.btnColor : "#FFFFFF",
                tabBarInactiveTintColor: theme.theme == "light" ? "#55555F" : "#A2A2A2",
                tabBarLabelStyle: {
                    fontFamily: Fontfamily.GMedium,
                    fontSize: Fontsize.semimedium,
                    marginTop: 5
                }
            }}
        >

            {tabs?.map((e: any) => (
                <Tab.Screen
                    name={e?.name}
                    component={e?.component}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            if (e.type === "svg") {
                                return focused ? e.activeicon : e.icon;
                            }
                            if (e.type === "gif") {
                                return <FastImage source={e.icon} style={{ width: windowwidth * 0.15, height: windowwidth * 0.1 }} />;
                            }
                            return null;
                        },
                        tabBarLabel: e.type === "gif" ? () => null : undefined,
                    }}
                />
            ))}
        </Tab.Navigator>
    )
}

export default Bottomtab;