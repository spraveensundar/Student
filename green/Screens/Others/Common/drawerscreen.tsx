import useCustomHooks from "../../../Actions/Hooks/customhook"
import Mainview from "../../../Components/mainview"
import VectorIcons from "../../../Utilities/vectorIcons"
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import Listcomponent from '../../../Components/listcomponent';
import Images, { icons } from '../../../Utilities/images';
import { useSelector } from "react-redux";
import { helperSelector, update_servicestype } from "../../../Slices/helper";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { windowwidth } from "../../../Utilities/dimensions";
import Text from "../../../Components/text";
import { Button } from "../../../Components/Field";
import LinearGradient from "react-native-linear-gradient";
import { destroyStorage, removeItem } from "../../../Actions/Storage/localStorage";
import { scrapSelector } from "../../../Slices/scrap";

const DrawerScreen: React.FC<DrawerContentComponentProps> = (props) => {
    const { theme, navigation, dispatch } = useCustomHooks();
    const { servicetype } = useSelector(helperSelector);
    const { scrapDetails } = useSelector(scrapSelector);

    const [screenProperties, setScreenProperties] = useState<{ title: string, component: ReactNode } | null>(null);

    const DailyWash = useCallback(() => {
        return (
            <>
                <Listcomponent
                    title='My Profile'
                    src={icons.Myprofile}
                    onpress={() => navigation.navigate("Profile")}
                />

                <Listcomponent
                    title='My Services'
                    src={icons.Myservice}
                    onpress={() => navigation.navigate("Servicerequest")}

                />
                {servicetype === 'dailywash' &&
                    <Listcomponent
                        title='Attendance'
                        src={icons.Myleave}
                        onpress={() => navigation.navigate("LeaveAttendance")}
                    />}

                <Listcomponent
                    title='My Earnings'
                    src={icons.Myearnings}
                    onpress={() => navigation.navigate("Earnings")}
                />

                <Listcomponent
                    title='Bank Account Details'
                    src={icons.Banking}
                    onpress={() => navigation.navigate("UpdateBank")}

                />

                <Listcomponent
                    title='Refer & Earn'
                    src={icons.Myrefer}
                    onpress={() => navigation?.navigate("Refferal")}

                />

                <Listcomponent
                    title='Notifications'
                    src={icons.Mynoti}
                    onpress={() => navigation?.navigate("Notification")}

                />

                <Listcomponent
                    title='Logout'
                    src={icons.Mylogout}
                    onpress={() => {
                        removeItem("KeyAcc");
                        removeItem("token");
                        navigation?.navigate("Categories");
                    }}
                />
            </>
        );
    }, [navigation]);

    const Scrap = useCallback(() => {
        return (
            <>
                <View
                    style={{
                        marginTop: windowwidth * 0.05,
                        marginBottom: windowwidth * 0.03,
                    }}
                >
                    <Pressable
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: windowwidth * 0.05,
                            borderRadius: 10,
                            backgroundColor: '#010B50'
                        }}
                        onPress={() => navigation.navigate("ScrapDealerEditProfile")}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: windowwidth * 0.12,
                                height: windowwidth * 0.12,
                                borderRadius: windowwidth * 0.15,
                                overflow: 'hidden',
                            }}
                        >
                            <Images
                                source={require('../../../Assets/images/profile.png')}
                                type="image"
                                width={'100%'}
                                height={'100%'}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                marginLeft: windowwidth * 0.03
                            }}
                        >
                            <Text size="medium" family="GBold" color="#FFFFFF" >{`Hello, ${scrapDetails?.firstName ? scrapDetails?.firstName : "Customer"}`}</Text>
                            <Text size="medium" family="GMedium" color="#FFFFFF" top={'2.5%'} >{scrapDetails?.mobileNo}</Text>
                        </View>
                        <View
                            style={{
                                marginLeft: windowwidth * 0.03
                            }}
                        >
                            <LinearGradient
                                colors={['#FFA300', '#CE6700']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    borderRadius: 10,
                                    overflow: 'hidden',
                                }}
                            >
                                <Button
                                    title={'Vendor'}
                                    style={{
                                        paddingVertical: windowwidth * 0.02,
                                        paddingHorizontal: windowwidth * 0.03,
                                        backgroundColor: 'transparent'
                                    }}
                                    onPress={() => navigation.navigate("ScrapDealerEditProfile")}
                                />
                            </LinearGradient>
                        </View>
                    </Pressable>
                </View>
                <View style={{ flex: 1 }}>
                    <Listcomponent
                        title='My Booking History'
                        src={icons.Event}
                        onpress={() => navigation.navigate("ScrapOrderHistory")}
                    />

                    <Listcomponent
                        title='My Bids'
                        src={icons.MyBid}
                        onpress={() => navigation.navigate("MyBids")}
                    />

                    <Listcomponent
                        title='Notifications'
                        src={icons.Notification}
                        onpress={() => navigation.navigate("ScrapNotifications")}
                    />
                </View>

                <Listcomponent
                    title='Logout'
                    src={icons.Mylogout}
                    onpress={() => {
                        // dispatch(update_servicestype("dailywash"));
                        destroyStorage()
                        dispatch({ type: "RESET_STATE" })
                        navigation?.navigate("Categories");
                    }}
                />
            </>
        );
    }, [navigation, dispatch]);

    useEffect(() => {
        switch (servicetype) {
            case 'dailywash':
                setScreenProperties({ title: 'Cleaner Profile', component: <DailyWash /> })
                break;
            case 'onetimewash':
                setScreenProperties({ title: 'Cleaner Profile', component: <DailyWash /> })
                break;
            case 'scrapdealer':
                setScreenProperties({ title: 'My Profile', component: <Scrap /> })
                break;
            default:
                setScreenProperties({ title: 'My Profile', component: <Scrap /> })
                break;
        }
    }, [servicetype, DailyWash, Scrap]);

    if (!screenProperties) return;

    return (
        <Mainview
            isheader={false}
            ismenuheader={true}
            statusbarcolor={theme.btnColor}
            statusbarcontent="light"
            lefticon={
                <VectorIcons
                    family="Ionicons"
                    name="chevron-back"
                    iconcolor={theme.white}
                />
            }
            onleftfn={() => props.navigation.closeDrawer()}
            headertitle={screenProperties.title}
        >
            {screenProperties.component}
        </Mainview>
    )
}

export default DrawerScreen