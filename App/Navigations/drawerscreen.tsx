import useCustomHooks from "../Actions/Hooks/customhook"
import Mainview from "../Components/mainview"
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import Listcomponent from '../Components/listcomponent';
import { ReactNode, useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { helperSelector } from "../Common/redux/HelperSlice";

const DrawerScreen: React.FC<DrawerContentComponentProps> = (props) => {
    const { theme, navigation } = useCustomHooks();
    const { serviceCategory } = useSelector(helperSelector)

    const [screenProperties, setScreenProperties] = useState<{ title: string, component: ReactNode } | null>(null);

    const ScrapSettings = useCallback(() => {
        return (
            <View style={{ flex: 1 }}>
                <Listcomponent
                    title='Sell Post'
                    src={"Post"}
                    imagetype="svg"
                    onpress={() => navigation.navigate("ScrappingDetails")}
                />
                {/* <Listcomponent
                    title='Bidding Request'
                    src={"Picture"}
                    imagetype="svg"
                    onpress={() => navigation.navigate("BiddingRequest")}
                /> */}
                <Listcomponent
                    title='My Booking History'
                    src={"CalendarIcon"}
                    imagetype="svg"
                    onpress={() => navigation.navigate("ScrapBookingHistory")}
                />
                <Listcomponent
                    title='Notifications'
                    src={"Notifications"}
                    imagetype="svg"
                    onpress={() => navigation.navigate("ScrapNotifications")}
                />
            </View>
        );
    }, [navigation]);

    useEffect(() => {
        switch (serviceCategory) {
            case 'dailyCarCleaning':
                setScreenProperties({ title: 'Settings', component: <></> })
                break;
            case 'scrapping':
                setScreenProperties({ title: 'Settings', component: <ScrapSettings /> })
                break;
            default:
                setScreenProperties({ title: 'Settings', component: <></> })
                break;
        }
    }, [serviceCategory, ScrapSettings]);

    if (!screenProperties) return;

    return (
        <Mainview
            isheader={false}
            ismenuheader={true}
            statusbarcolor={theme.btnColor}
            statusbarcontent="light"
            onleftfn={() => props.navigation.closeDrawer()}
            isrighticon={false}
            headertitle={screenProperties.title}
        >
            {screenProperties.component}
        </Mainview>
    )
}

export default DrawerScreen