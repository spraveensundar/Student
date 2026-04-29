import React from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import styles from "./styles";
import Listcomponent from "../../../../Components/listcomponent";
import { icons } from "../../../../Utilities/images";

const ServiceDetails: React.FC = () => {
    const { theme, navigation } = useCustomHooks();
    return (
        <Mainview
            isheader={true}
            headertitle="Service Details"
            onleftfn={() => navigation.goBack()}
        >
            <Listcomponent onpress={() => navigation.navigate('DailyTracking')}
                src={icons.Tracking}
                title="Daily Tracking"
            />
            <Listcomponent onpress={() => navigation.navigate('FeedbackRatings')}
                src={icons.FeedbackRatings}
                title="Feedback & Ratings"
            />
            <Listcomponent onpress={() => navigation.navigate('CleanerAttendance')}
                src={icons.Group}
                title="Cleaner Attendance"
            />
            <Listcomponent onpress={() => navigation.navigate('UpgradePlan')}
                src={icons.UpArrow}
                title="Plan Upgrades"
            />
            <Listcomponent onpress={() => navigation.navigate('RenewServices')}
                src={icons.Energy}
                title="Renew Services"
            />
            {/* <Listcomponent onpress={() => navigation.navigate('CancelSubscription')}
                src={icons.Cancel}
                title="Cancel Subscriptions"
            /> */}
        </Mainview>
    )
}

export default ServiceDetails;