import useCustomHooks, { useHardwareBackPress } from "../../../Actions/Hooks/customhook"
import Mainview from "../../../Components/mainview"
import { useSelector } from "react-redux"
import { helperSelector } from "../../../Slices/helper"
import Acceptorder from "../../Commoncarwash/Accept/accept"
import { useEffect, useMemo } from "react"
import Dailydashboard from "../Dailywash/dailydashboard"
import Mapscreen from "../../Commoncarwash/Map/map"
import Onetimedashboard from "../Onetime/onetimerequest"
import { askLocationPermission } from "../../../Utilities/permission"
import { BackHandler } from "react-native"
import TodaySelfieModal from "../../../Components/TodaySelfieModal"

const Home: React.FC = () => {
    const { theme, navigation, bottommodalref } = useCustomHooks()

    const { dailywashstate, servicetype, onetimewashstate } = useSelector(helperSelector)
    const headertitle = useMemo(() => {
        if (dailywashstate === "request" && servicetype === "dailywash") return "Daily Car Cleaning Service"
        else if (dailywashstate === "accept" || onetimewashstate === "accept") return "Job Accepted - Enroute"
        else if (onetimewashstate === "request" || onetimewashstate === "offine") return "Onetime Car Cleaning Service"
    }, [dailywashstate, servicetype, onetimewashstate]);

    useEffect(() => {
        (
            async () => {
                const granted = await askLocationPermission();
                if (!granted) {
                    console.warn("Location permission denied");
                    return;
                }
            }
        )()
    }, []);

    useHardwareBackPress({
        title: "Alert",
        des: "Are you sure want to quit Carigato vendor",
        yesfn: () => BackHandler.exitApp()
    })

    // useEffect(() => {
    //     bottommodalref.current?.present()

    // }, [])

    return (
        <Mainview
            isheader={false}
            ismenuheader={true}
            statusbarcolor={theme.btnColor}
            statusbarcontent="light"
            headertitle={headertitle}
            isscollable={false}
            onleftfn={() => navigation.openDrawer()}
            horizontalpadding={(headertitle === 'Job Accepted - Enroute' || headertitle === "Onetime Car Cleaning Service") ? 0 : "6%"}
        >

            
            {headertitle !== "Daily Car Cleaning Service" &&
                <Mapscreen />
            }
            <Dailydashboard display={headertitle === "Daily Car Cleaning Service" ? "flex" : "none"} />
            {headertitle === "Job Accepted - Enroute" &&
                <Acceptorder />
            }
            {headertitle === "Onetime Car Cleaning Service" &&
                <Onetimedashboard />
            }

            <TodaySelfieModal sheetref={bottommodalref} />
        </Mainview>
    )
}

export default Home