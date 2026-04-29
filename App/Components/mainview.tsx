import React, { ReactNode, useEffect } from "react"
import { ActivityIndicator, Platform, Pressable, RefreshControl, ScrollView, ScrollViewComponent, ScrollViewProps, StatusBar, StyleProp, Text, TextProps, TextStyle, View } from "react-native"
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import useCustomHooks from "../Actions/Hooks/customhook";
import { RFvalue, windowheight, windowwidth } from "../Utilities/dimensions";
import VectorIcons from "../Utilities/vectoricons";
import { Fontfamily, Fontsize } from "../Utilities/uiasset";
import { KeyboardAvoidingView, KeyboardAwareScrollView } from "react-native-keyboard-controller";

interface Mainviewprops {
    isstatusbar?: boolean,
    statusbarcolor?: string,
    bottombarcolor?: string,
    backgroundcolor?: string,
    isheader?: boolean,
    headertitle?: string,
    lefticon?: React.ReactNode,
    righticon?: React.ReactNode,
    onleftfn?: () => void;
    onrightfn?: () => void;
    headertextprops?: TextProps,
    headerTextstyle?: StyleProp<TextStyle>
    customheader?: React.ReactNode,
    isscollable?: boolean,
    children?: React.ReactNode,
    ismainloading?: boolean,
    isnodata?: boolean,
    nodatacontent?: string,
    isoverlaploader?: boolean,
    horizontalpadding?: any,
    scrollprops?: ScrollViewProps,
    isbottomtab?: boolean
    bottomContent?: React.ReactNode,
    customnodata?: React.ReactNode,
    onreload?: () => void,
    isrefreshing?: boolean,
    isrefereshcontrol?: boolean

}


const Mainview: React.FC<Mainviewprops> = ({
    isstatusbar = true,
    statusbarcolor,
    bottombarcolor,
    backgroundcolor,
    isheader = true,
    headertitle,
    lefticon,
    righticon,
    onleftfn,
    onrightfn,
    headertextprops,
    headerTextstyle,
    customheader,
    isscollable = false,
    children,
    ismainloading = false,
    isnodata = false,
    nodatacontent = "No Data Found",
    isoverlaploader = false,
    horizontalpadding = "6%",
    scrollprops,
    isbottomtab = false,
    bottomContent,
    customnodata,
    onreload,
    isrefreshing = false,
    isrefereshcontrol = false


}) => {

    const { theme, initialWindowMetrics } = useCustomHooks()

    // useEffect(() => {
    //     if (theme.theme == "light") {
    //         StatusBar.setBarStyle("dark-content")
    //     }
    //     else {
    //         StatusBar.setBarStyle("light-content")
    //     }
    // }, [])

    return (
        <>
            {isstatusbar &&
                <View style={{ height: StatusBar.currentHeight, backgroundColor: statusbarcolor ?? theme.background }} />}
            <View style={{ flex: 1, backgroundColor: bottombarcolor ?? theme.background, }} >
                <View style={{ flex: 1, backgroundColor: backgroundcolor ?? theme.background, marginBottom: isbottomtab ? 0 : initialWindowMetrics?.insets.bottom }}  >
                    {isheader &&
                        <View style={{ height: windowheight * 0.1, justifyContent: "center", flexDirection: "row", alignItems: "center" }} >

                            <Pressable onPress={onleftfn} style={{ width: "15%", height: "100%", position: "absolute", left: 0, justifyContent: "center", alignItems: "center" }} >
                                {lefticon ?
                                    lefticon :
                                    <VectorIcons
                                        family="Ionicons"
                                        name="chevron-back"
                                    />}
                            </Pressable>
                            <Text {...headertextprops} style={[{ color: theme.primarytext, fontFamily: Fontfamily.medium, fontSize: RFvalue(16), width: "70%", textAlign: "center" }, headerTextstyle]} >{headertitle}</Text>
                            {righticon &&
                                <Pressable onPress={onrightfn} style={{ width: "15%", height: "100%", position: "absolute", right: 5, justifyContent: "center", alignItems: "center" }} >
                                    {righticon}
                                </Pressable>}
                        </View>
                    }
                    {customheader && customheader}
                    <View style={{ flex: 1, paddingHorizontal: horizontalpadding, }} >
                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{ flex: 1, marginBottom: isbottomtab ? "0.5%" : "2.5%" }}
                        >
                            {ismainloading ?
                                <View style={{ flex: 0.9, justifyContent: "center", alignItems: "center" }} >
                                    <ActivityIndicator size={"small"} color={theme.primarytext} />
                                </View> :

                                <>
                                    {isnodata ?
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                            {customnodata ?
                                                customnodata :
                                                <>
                                                    <Text style={{ color: theme.primarytext, fontFamily: Fontfamily.medium, fontSize: Fontsize.medium }} >{nodatacontent}</Text>
                                                </>}
                                        </View> :
                                        <>
                                            {!isscollable ?
                                                children :
                                                <>
                                                    {isrefereshcontrol ?
                                                        <KeyboardAwareScrollView
                                                            refreshControl={
                                                                <RefreshControl
                                                                    refreshing={isrefreshing}
                                                                    onRefresh={() => onreload?.()}
                                                                />
                                                            }
                                                            showsVerticalScrollIndicator={false}  {...scrollprops} >
                                                            {children}
                                                        </KeyboardAwareScrollView> :
                                                        <KeyboardAwareScrollView
                                                            showsVerticalScrollIndicator={false}  {...scrollprops} >
                                                            {children}
                                                        </KeyboardAwareScrollView>}
                                                </>

                                            }
                                        </>
                                    }
                                </>
                            }

                        </KeyboardAvoidingView>
                    </View>
                    {
                        bottomContent && (
                            bottomContent
                        )
                    }

                </View>

            </View>

            {isoverlaploader &&
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999, position: "absolute", left: 0, right: 0, top: 0, bottom: 0, justifyContent: "center", alignItems: "center" }} >
                    <ActivityIndicator size={"small"} color={"#fff"} />
                </View>}
        </>
    )

}

export default Mainview