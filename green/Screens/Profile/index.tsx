import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SwitchToggle from "react-native-switch-toggle";

import ListItem from "./ListItem";
import Text from "../../Components/text";
import Mainview from "../../Components/mainview";
import { Colors } from "../../Utilities/uiasset";
import VectorIcons from "../../Utilities/vectoricons";
import Images, { icons, image } from "../../Utilities/images";
import useCustomHooks, { Commonalert } from "../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";

import { styles } from "./styles";
import { getItem, setItem } from "../../Actions/Storage/localstorage";
import { EventRegister } from "react-native-event-listeners";
import { SetFutureparams } from "../../Slices/helper";
import { windowwidth } from "../../Utilities/dimensions";
import { useLazyLogoutQuery } from "../../Slices/auth";
import { useSelector } from "react-redux";
import WebviewModal from "../../Components/DialogBox/Web";
import { SUPPORTURL } from "../../Actions/Constant/constant";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Profile'>;

const Profile: React.FC<Props> = () => {
    const { theme, navigation, dispatch, cleardata } = useCustomHooks();
    const style = styles(theme);
    const mobiletheme = getItem("mobiletheme")
    console.log(mobiletheme, "yesp");
    const { status } = useSelector((state: any) => state.auth.affiliateData);

    const [isEnabled, setIsEnabled] = useState(mobiletheme == "light" ? true : false);

    const onthemechange = () => {
        setIsEnabled(!isEnabled)
        setItem("mobiletheme", isEnabled ? "dark" : "light")
        EventRegister.emit("mobiletheme", isEnabled ? "dark" : "light")

    }

    const [logout] = useLazyLogoutQuery()
    const logoutfn = async () => {
        cleardata()
        // const res = await logout(true)
        // console.log(res,"responseeeeeeeeeeee");
    }



    const { wallet } = useSelector((state: any) => state.future);

    console.log(wallet.walletBalance, "statusstatusstatus")

    console.log(status, "statusstatusstatus")
    const [support, setSupport] = useState(false)
    return (
        <Mainview
            isheader={false}
            isscollable={true}
            customheader={
                <View style={style.headerContainer}>
                    <Pressable style={style.leftContent} onPress={() => navigation.goBack()}>
                        <VectorIcons
                            family="Ionicons"
                            name="chevron-back"
                        />
                    </Pressable>
                    <Text style={style.header}>Profile</Text>
                    <Pressable style={style.rightContent} onPress={() => Commonalert({
                        title: "Logout!",
                        des: "Are you sure want to logout",
                        yes: () => logoutfn()
                    })}>
                        <Images
                            type="image"
                            source={icons.Exit}
                            width={windowwidth * 0.065}
                            height={windowwidth * 0.065}
                        />
                    </Pressable>
                </View>
            }>
            <View style={style.container}>
                <ListItem icon={icons.Profile} title="My Account" onPress={() => navigation.navigate("MyAccount")} />
                <ListItem
                    icon={icons.DarkMode}
                    onPress={() => onthemechange()}
                    title="Theme"
                    rightContent={
                        <View style={style.buttonDark}>
                            <SwitchToggle
                                switchOn={isEnabled}
                                onPress={() => onthemechange()}
                                backgroundColorOn={theme.theme == "dark" ? Colors.darkgray : Colors.white}
                                backgroundColorOff={theme.theme == "dark" ? Colors.darkgray : Colors.white}
                                circleColorOn={theme.theme == "dark" ? Colors.darkgray : Colors.white}
                                circleColorOff={theme.theme == "dark" ? Colors.darkgray : Colors.white}
                                containerStyle={style.circleContainer}
                                circleStyle={style.circle}
                            />
                            <View style={style.icon} >
                                <VectorIcons
                                    family="Feather"
                                    name="sun"
                                    size={15}
                                    iconcolor={isEnabled ? "#FF6501" : "#535962"}
                                />
                            </View>
                            <View style={style.iconRight}>
                                <VectorIcons
                                    family="Feather"
                                    name="moon"
                                    size={15}
                                    iconcolor={!isEnabled ? "#FF6501" : "#535962"}
                                />
                            </View>
                        </View>
                    }
                />

                <ListItem icon={icons.Preference} title="Preference" onPress={() => navigation.navigate("Preference")} />

                {/* <ListItem icon={icons.Demo} title="Demo Trading" onPress={() => {dispatch(SetFutureparams("trade")),navigation.navigate('Dashboard', { screen: 'Future' })}} /> */}

                <ListItem icon={icons.Trading} title="Algo Trading" onPress={() => navigation.navigate("CreateWebhook")} />

                <ListItem icon={icons.Refer} title="Refer & Earn" onPress={() => navigation.navigate("Referaldashboard")} />

                <ListItem icon={icons.Bank} title="Bank Details" onPress={() => navigation.navigate("BankDetails")} />

                <ListItem icon={icons.Analytics} title="PnL Analytics" onPress={() => navigation.navigate("PnlAnalytics")} />

                <ListItem icon={icons.Moneytransfer} title="Transaction logs" onPress={() => navigation.navigate("TransactionLogs")} />

                <ListItem icon={icons.SubAccount} title="Sub Accounts" onPress={() => navigation.navigate("SubAccount")} />

                <ListItem icon={icons.Security} title="Security" onPress={() => navigation.navigate("Security")} />

                <ListItem icon={icons.Gear} title="API Keys" onPress={() => navigation.navigate("APIKeys")} />

                <ListItem icon={image.Affiliate} title="Affiliate" onPress={() => {
                    if (status === "approved") {
                        navigation.navigate('Overview');
                    } else {
                        navigation.navigate('AffiliateRegister');
                    }
                }} />

                <ListItem icon={icons.CustomerService} title="Support" onPress={() => setSupport(true)} />

                <ListItem icon={icons.Badge} title="Features" onPress={() => navigation.navigate("Features")} />

            </View>

            {support &&
                <WebviewModal
                    title="Support"
                    url={SUPPORTURL}
                    onCloseHandler={() => setSupport(false)}
                />

            }
        </Mainview>
    )

}

export default Profile;