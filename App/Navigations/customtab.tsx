
import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { windowheight, windowwidth } from '../Utilities/dimensions';
import useCustomHooks from '../Actions/Hooks/customhook';
import Images, { lotties } from '../Utilities/images';
import Text from '../Components/text';
import { Colors } from '../Utilities/uiasset';
import Lottie from '../Components/lottieview';
import { loginCheck, toastFn } from '../Common/commonFunction';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const insets = useSafeAreaInsets();
    const tabWidth = (windowwidth / state.routes.length);
    const translateX = useRef(new Animated.Value(0)).current;
    const { theme } = useCustomHooks()
    useEffect(() => {
        Animated.spring(translateX, {
            toValue: state.index * tabWidth,
            useNativeDriver: true,
        }).start();
    }, [state.index, tabWidth, translateX]);
    console.log("justtest", state);
    const tabs = [
        {
            iconName:
                <Images
                    type='svg'
                    name={"Home"}
                    width={windowwidth * 0.07}
                    height={windowwidth * 0.07}
                />,
            activeIconName: <Images
                type='svg'
                name={"Homeactive"}
                width={windowwidth * 0.07}
                height={windowwidth * 0.07} />,
        },
        {

            iconName:
                <Images
                    type='svg'
                    name={"Support"}
                    width={windowwidth * 0.07}
                    height={windowwidth * 0.07}
                />,
            activeIconName:
                <Images
                    type='svg'
                    name={"supportactive"}
                    width={windowwidth * 0.07}
                    height={windowwidth * 0.07} />,
        },
        {
            name: "Upgrade",

        },
        {

            iconName:
                <Images
                    type='svg'
                    name={"Orders"}
                    width={windowwidth * 0.07}
                    height={windowwidth * 0.07} />,
            activeIconName:
                <Images
                    type='svg'
                    name={"ordersactive"}
                    width={windowwidth * 0.07}
                    height={windowwidth * 0.07} />,
        },
        {

            iconName:
                <Images
                    type='svg'
                    name={"Profile"}
                    width={windowwidth * 0.06}
                    height={windowwidth * 0.06} />,
            activeIconName:
                <Images
                    type='svg'
                    name={"profileactive"}
                    width={windowwidth * 0.06}
                    height={windowwidth * 0.06} />,
        },

    ]

    const allowedRoutes = ["Home"];

    const noAccessRedirect = (navigateTo:string) => {
        if (navigateTo) {
            if (loginCheck() || (allowedRoutes.some((check) => check == navigateTo))) {
                return navigation.navigate(navigateTo);
            }
            toastFn("Login to view this");
            return navigation.navigate("Login", { redirectTo: {parent:"Bottomtab",tab:navigateTo} });
        }
    }

    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            height: windowheight * 0.075,
            shadowColor: "#000C5140",
            elevation: 3,
            width: "100%",
            bottom: insets.bottom

        }}>
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    height: 4,
                    width: tabWidth,
                    backgroundColor: '#000C51',
                    transform: [{ translateX }],
                    borderRadius: 100,
                }}
            />
            {state?.routes?.map((e: any, i: number) => {
                const isFocused = state.index === i;
                return (
                    i == 2 ?
                        <Pressable style={{ width: "20%", height: "100%", justifyContent: "flex-end", alignItems: "center" }}
                            onPress={() => {
                                noAccessRedirect(e?.name);
                            }}>
                            <Lottie
                                src={lotties.upgrade}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </Pressable> :
                        <Pressable onPress={() => {
                            noAccessRedirect(e?.name);
                            console.log(e, "elemets");

                        }} style={{ width: "20%", height: "100%", justifyContent: "flex-end", alignItems: "center" }} >
                            {isFocused ? tabs[i]?.activeIconName : tabs[i]?.iconName}
                            <Text size='small' top={"2.5%"} family={"GMedium"} color={isFocused ? theme.btnColor : "#55555F"} >{e?.name}</Text>
                        </Pressable>
                )
            })

            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#ddd',
        justifyContent: 'space-around',
        height: windowheight * 0.1
    },
    tabItem: {
        alignItems: 'center',
        flex: 1,
    },
    label: {
        fontSize: 12,
        marginTop: 4,
    },
});

export default CustomTabBar;


