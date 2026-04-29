import React, { useCallback, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "./stacknavigationtypes";
import Login from "../Screens/Auth/login";
import { FadeTransition } from "../Utilities/navigationslide";
import OTP from "../Screens/Auth/OTP";
import Termsandcondtions from "../Screens/Auth/terms";
import Categories from "../Screens/Category/categories";
import CleaningResiter from "../Screens/Auth/cleaningRegister/register";
import Aadharverification from "../Screens/Auth/cleaningRegister/aadharverification";
import Selfie from "../Screens/Auth/cleaningRegister/selfie";
import UpdateLocation from "../Screens/Others/Location/updateLocation";
import FetchLocation from "../Screens/Others/Location/fetchLocation";
import Successreg from "../Screens/Auth/cleaningRegister/successreg";
import Manualverification from "../Screens/Auth/cleaningRegister/manualverification";
import Vendorhome from "./drawernavigation";
import Servicerequest from "../Screens/Commoncarwash/Servicerequest/servicerequest";
import Profile from "../Screens/Commoncarwash/Myprofile/profile";
import Editprofile from "../Screens/Commoncarwash/Myprofile/editprofile";
import Earnings from "../Screens/Commoncarwash/Earnings/earnings";
import SupportPartnerRegister from "../Screens/Category/RTO/SupportPartnerRegister";
import SupportPartnerConfirmation from "../Screens/Category/RTO/SupportPartnerConfirmation";
import ContactUs from "../Screens/Category/RTO/ContactUs";
import JobDetails from "../Screens/Commoncarwash/Jobdetail/JobDetails";
import Servicedetail from "../Screens/Commoncarwash/Servicedetails/servicedetails";
import Completejob from "../Screens/Commoncarwash/Completejob/complete";
import Reviews from "../Screens/Commoncarwash/Completejob/reviews";
import Finalwash from "../Screens/Commoncarwash/Completejob/finalwash";
import ScrapDealerRegister from "../Screens/Category/Scrap/ScrapDealerRegister";
import ScrapDealerConfirmation from "../Screens/Category/Scrap/ScrapDealerConfirmation";
import CertificateUpload from "../Screens/Category/Scrap/CertificatesUpload";
import ScrapDealerApproval from "../Screens/Category/Scrap/ScrapDealerApproval";
import ScrapDealerEditProfile from "../Screens/Category/Scrap/ScrapDealerEditProfile";
import PickupDetails from "../Screens/Category/Scrap/PickupDetails";
import PickupReschedule from "../Screens/Category/Scrap/PickupReschedule";
import ScrapOrderHistory from "../Screens/Category/Scrap/ScrapOrderHistory";
import MyBids from "../Screens/Category/Scrap/MyBids";
import ScrapNotifications from "../Screens/Category/Scrap/ScrapNotifications";
import ScrapDetails from "../Screens/Category/Scrap/ScrapDetails";
import Addonjobdetail from "../Screens/Commoncarwash/Addon/addonjobdetail";
import Addonservicedetail from "../Screens/Commoncarwash/Addon/addonservicedetail";
import Bookingdetail from "../Screens/Commoncarwash/Bookings/bookingdetail";
import Refferal from "../Screens/Commoncarwash/Reffer/refferal";
import Notification from "../Screens/Commoncarwash/Notification/notification";
import Chooselangugae from "../Screens/Others/Common/chooselanguage";
import LeaveAttendance from "../Screens/Commoncarwash/LeaveAttendance/LeaveAttendance";
import ApplyLeave from "../Screens/Commoncarwash/LeaveAttendance/ApplyLeave";
import LeaveConfirmation from "../Screens/Commoncarwash/LeaveAttendance/LeaveConfirmation";
import { askLocationPermission } from "../Utilities/permission";
import { Getaddressdetail, getCurrentLocation } from "../Actions/location/location";
import useCustomHooks, {
    // Deviceinfo
} from "../Actions/Hooks/customhook";

import { setCurrentlocation, update_onetimewashstate, update_servicestype } from "../Slices/helper";
import UpdateBank from "../Screens/Auth/BankDetails/UpdateBank";
import { useSelector } from "react-redux";
import { clearservice, persistorSelector, update_serviceinprogress } from "../Slices/persistor";
import { destroyStorage, getItem } from "../Actions/Storage/localStorage";
import { setSelectedserivce } from "../Slices/cleaning";
import Test from "../Screens/Test/test";
import { useLazyGetservicedetailQuery } from "../Slices/services";
import ChatBox from "../Screens/Commoncarwash/chatBox/chatBox";
import { setScrapperDetails, useLazyGetScrapperDetailsQuery } from "../Slices/scrap";

const Stack = createNativeStackNavigator<Stacknavigationtypes>();

const Stacknavigator: React.FC = () => {

    const { dispatch, navigation } = useCustomHooks();

    const [initialroute, setInitialroute] = useState<any>("")
    const getlivelocation = useCallback(async () => {
        try {
            const granted = await askLocationPermission();
            if (!granted) {
                console.warn("Location permission denied");
                return;
            }

            const coords: any = await getCurrentLocation();

            const label = await Getaddressdetail(coords.latitude, coords?.longitude)

            const payload = {
                coordinates: coords,
                labeladdress: label?.formatedaddress
            }
            dispatch(setCurrentlocation(payload))
        } catch (err) {
            console.warn("Location error:", err);
        }
    }, [dispatch]);

    useEffect(() => {
        getlivelocation();
    }, [getlivelocation])

    const { serviceinprogress, persistservice, isaddonservice } = useSelector(persistorSelector)

    const [getservicedetail] = useLazyGetservicedetailQuery()
    const [scrapUserDetails] = useLazyGetScrapperDetailsQuery();

    const checkroutes = useCallback(async () => {
        try {
            const token = await getItem("token");

            if (!token) {
                setInitialroute("Chooselangugae");
                return;
            }

            const response = serviceinprogress?._id ? await getservicedetail({ serviceId: serviceinprogress._id }) : null;

            try {
                const scrapRes = await scrapUserDetails(0).unwrap();

                dispatch(setScrapperDetails(scrapRes?.data))

                if (scrapRes?.status) {
                    const verification = scrapRes?.data?.verificationStatus;

                    if (verification?.information === "pending") {
                        setInitialroute("ScrapDealerRegister");
                        return;
                    }

                    if (verification?.facilityFiles === "pending") {
                        setInitialroute("CertificateUpload");
                        return;
                    }

                    if (verification?.information === "submitted" && verification?.facilityFiles === "submitted") {
                        setInitialroute("ScrapDealerApproval");
                        return;
                    }
                    if (scrapRes?.data?.isVerified === true) {
                        setInitialroute("Vendorhome")
                        return
                    }
                }
            } catch (err) {
                console.log("Scrap user not found, continue normal flow");
            }

            const service = response?.data?.data;

            if (isaddonservice && token) {
                setInitialroute("Addonservicedetail")
            }
            else if (persistservice === "onetimewash" && service?.status == "pending" && token) {
                setInitialroute("Vendorhome")
                dispatch(update_servicestype(persistservice))
                dispatch(update_onetimewashstate("accept"))
                dispatch(setSelectedserivce(service))
                dispatch(update_serviceinprogress(service))

            }
            else if (service?.status == "started" && token) {
                setInitialroute("Servicedetail")
                dispatch(setSelectedserivce(service))
                dispatch(update_serviceinprogress(service))
                dispatch(update_servicestype(persistservice ?? "dailywash"))
            }

            else if (token && (persistservice != "none")) {
                dispatch(update_servicestype(persistservice ?? "dailywash"))
                setInitialroute("Vendorhome")
            }
            else {
                setInitialroute("Chooselangugae")
            }
        } catch (error) {
        }
    }, [isaddonservice, serviceinprogress, persistservice])

    useEffect(() => {
        checkroutes()
    }, [checkroutes])

    if (!initialroute) {
        return null
    }

    console.log("initialroute", initialroute)



    return (
        <Stack.Navigator
            screenOptions={FadeTransition}
            initialRouteName={initialroute}
        // initialRouteName="ChatBox"
        >
            <Stack.Screen name={"Test"} component={Test} />
            <Stack.Screen name={"Chooselangugae"} component={Chooselangugae} />
            <Stack.Screen name={"Login"} component={Login} />
            <Stack.Screen name={"OTP"} component={OTP} />
            <Stack.Screen name={"Termsandcondtions"} component={Termsandcondtions} />
            <Stack.Screen name={"Categories"} component={Categories} />
            <Stack.Screen name={"CleaningResiter"} component={CleaningResiter} />
            <Stack.Screen name={"SupportPartnerRegister"} component={SupportPartnerRegister} />
            <Stack.Screen name={"SupportPartnerConfirmation"} component={SupportPartnerConfirmation} />
            <Stack.Screen name={"ContactUs"} component={ContactUs} />
            <Stack.Screen name={"ScrapDealerRegister"} component={ScrapDealerRegister} />
            <Stack.Screen name={"ScrapDealerConfirmation"} component={ScrapDealerConfirmation} />
            <Stack.Screen name={"CertificateUpload"} component={CertificateUpload} />
            <Stack.Screen name={"ScrapDealerApproval"} component={ScrapDealerApproval} />
            <Stack.Screen name={"ScrapDealerEditProfile"} component={ScrapDealerEditProfile} />
            <Stack.Screen name={"ScrapDetails"} component={ScrapDetails} />
            <Stack.Screen name={"PickupDetails"} component={PickupDetails} />
            <Stack.Screen name={"PickupReschedule"} component={PickupReschedule} />
            <Stack.Screen name={"ScrapOrderHistory"} component={ScrapOrderHistory} />
            <Stack.Screen name={"MyBids"} component={MyBids} />
            <Stack.Screen name={"ScrapNotifications"} component={ScrapNotifications} />
            <Stack.Screen name={"Aadharverification"} component={Aadharverification} />
            <Stack.Screen name={"Selfie"} component={Selfie} />
            <Stack.Screen name={"UpdateLocation"} component={UpdateLocation} />
            <Stack.Screen name={"FetchLocation"} component={FetchLocation} />
            <Stack.Screen name={"Successreg"} component={Successreg} />
            <Stack.Screen name={"Manualverification"} component={Manualverification} />
            <Stack.Screen name={"Vendorhome"} component={Vendorhome} />
            <Stack.Screen name={"Servicerequest"} component={Servicerequest} />
            <Stack.Screen name={"JobDetails"} component={JobDetails} />
            <Stack.Screen name={"Profile"} component={Profile} />
            <Stack.Screen name={"Editprofile"} component={Editprofile} />
            <Stack.Screen name={"Earnings"} component={Earnings} />
            <Stack.Screen name={"LeaveAttendance"} component={LeaveAttendance} />
            <Stack.Screen name={"ApplyLeave"} component={ApplyLeave} />
            <Stack.Screen name={"LeaveConfirmation"} component={LeaveConfirmation} />
            <Stack.Screen name={"Servicedetail"} component={Servicedetail} />
            <Stack.Screen name={"Reviews"} component={Reviews} />
            <Stack.Screen name={"Completejob"} component={Completejob} />
            <Stack.Screen name={"Finalwash"} component={Finalwash} />
            <Stack.Screen name={"Addonjobdetail"} component={Addonjobdetail} />
            <Stack.Screen name={"Addonservicedetail"} component={Addonservicedetail} />
            <Stack.Screen name={"Bookingdetail"} component={Bookingdetail} />
            <Stack.Screen name={"Refferal"} component={Refferal} />
            <Stack.Screen name={"Notification"} component={Notification} />
            <Stack.Screen name={"UpdateBank"} component={UpdateBank} />
            <Stack.Screen name={"ChatBox"} component={ChatBox} />

        </Stack.Navigator>
    )
}

export default Stacknavigator;