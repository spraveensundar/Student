
import React, { useEffect } from 'react';
import {
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './navigationtypes';
import Home from '../Screens/Home/home';
import VectorIcons from '../Utilities/vectoricons';
import Future from '../Screens/Future/future';
import Images from '../Utilities/images';
import { RFvalue, windowheight, windowwidth } from '../Utilities/dimensions';
import useCustomHooks from '../Actions/Hooks/customhook';
import { Fontfamily, Fontsize } from '../Utilities/uiasset';
import Portfolio from '../Screens/Portfolio/portfolio';
import Orders from '../Screens/Orders/orders';
import Option from '../Screens/Option';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getItem } from '../Actions/Storage/localstorage';
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const Bottomtab: React.FC = () => {
    const { theme } = useCustomHooks()
    const tabs = [
        {
            name: "Home",
            component: Home,
            icon: <Images
                type='svg'
                name={theme.theme == "dark" ? 'Home' : "Homelight"}
                width={windowwidth * 0.065}
                height={windowwidth * 0.065}
            />,
            activeicon: <Images
                type='svg'
                name={theme.theme == "dark" ? 'Homeactive' : "HomelightActive"}
                width={windowwidth * 0.065}
                height={windowwidth * 0.065}

            />,
        },
        {
            name: "Future",
            component: Future,
            icon: <Images
                type='svg'
                name={theme.theme == "dark" ? 'Future' : "Futurelight"}
                width={windowwidth * 0.0575}
                height={windowwidth * 0.0575}
            />,
            activeicon: <Images
                type='svg'
                name={theme.theme == "dark" ? 'Futureactive' : "FuturelightActive"}
                width={windowwidth * 0.0575}
                height={windowwidth * 0.0575}
            />,
        },

        {
            name: "Portfolio",
            component: Portfolio,
            icon: <Images
                type='svg'
                name={theme.theme == "dark" ? 'Portfolio' : "Portfoliolight"}
                width={windowwidth * 0.0575}
                height={windowwidth * 0.0575}
            />,
            activeicon: <Images
                type='svg'
                name={theme.theme == "dark" ? 'Portfolioactive' : "PortfoliolightActive"}
                width={windowwidth * 0.0575}
                height={windowwidth * 0.0575}
            />,
        },

        {
            name: "Option",
            component: Option,
            icon: <Images
                type='svg'
                name={theme.theme == "dark" ? 'Option' : "Optionlight"}
                width={windowwidth * 0.0575}
                height={windowwidth * 0.0575}
            />,
            activeicon: <Images
                type='svg'
                name={theme.theme == "dark" ? 'Optionactive' : "OptionlightActive"}
                width={windowwidth * 0.0575}
                height={windowwidth * 0.0575}
            />,
        },


        {
            name: "Orders",
            component: Orders,
            icon: <Images
                type='svg'
                name={theme.theme == "dark" ? 'Orders' : "Orderslight"}
                width={windowwidth * 0.0575}
                height={windowwidth * 0.0575}
            />,
            activeicon: <Images
                type='svg'
                name={theme.theme == "dark" ? 'Ordersactive' : "OrderslightActive"}
                width={windowwidth * 0.0575}
                height={windowwidth * 0.0575}
            />,
        },
    ]
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    backgroundColor: theme.background,
                    height: insets.bottom + windowheight * 0.08,
                    borderTopWidth: 0,
                },
                tabBarItemStyle: {
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop:10
                },
                tabBarActiveTintColor: theme.theme == "light" ? "#000C51" : "#FFFFFF",
                tabBarInactiveTintColor: theme.theme == "dark" ? "#55555F" : "#A2A2A2",
                tabBarLabelStyle: {
                    fontFamily: Fontfamily.regular,
                    fontSize: RFvalue(12),
                    marginTop: 5
                }
            }}


        // tabBar={(props: any) => Object.keys(userData).length > 0 ? <TabBar {...props} /> : null}
        >
            {tabs?.map((e: any) => (
                <Tab.Screen
                    name={e?.name}
                    component={e?.component}
                    options={{
                        tabBarIcon: ({ focused }: any) => {
                            return focused ? e?.activeicon : e?.icon
                        },
                    }}
                />
            ))}



        </Tab.Navigator>
    )

}
export default Bottomtab
