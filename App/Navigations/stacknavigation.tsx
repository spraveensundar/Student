import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "./navigationtypes";
import { BottomSheetTransition, MyTransition } from "../Utilities/navigationslide";
import Test from "../Screens/test";
import Login from "../Screens/Auth/Login";
import Signup from "../Screens/Auth/Signup";
import OTP from "../Screens/Auth/OTP";
import Bottomtab from "./bottomtab";
import AddMoneyHome from "../Screens/AddMoney/AddmoneyHome";
import Deposit from "../Screens/AddMoney/Deposit";
import Profile from "../Screens/Profile";
import MyAccount from "../Screens/Profile/MyAccount";
import AccountEdit from "../Screens/Profile/MyAccount/Edit";
import Preference from "../Screens/Profile/Preference";
import ColorPreference from "../Screens/Profile/Preference/ColorPreference";
import Currency from "../Screens/Profile/Preference/Currency";
import ConfirmMessage from "../Screens/Profile/Preference/ConfirmMessage";
import Pushnotification from "../Screens/Profile/Preference/Pushnotification";
import CreateWebhook from "../Screens/Profile/AlgoTrading/CreateWebhook";
import Webhook2FA from "../Screens/Profile/AlgoTrading/Webhook2FA";
import WebhookVerification from "../Screens/Profile/AlgoTrading/WebhookVerification";
import Reference from "../Screens/Profile/Others/Reference";
import BankDetails from "../Screens/Profile/Others/BankDetails";
import Support from "../Screens/Profile/Others/Support";
import Features from "../Screens/Profile/Others/Features";
import APIKeys from "../Screens/Profile/APIKeys";
import CreateAPIKey from "../Screens/Profile/APIKeys/Create";
import Security from "../Screens/Profile/Security";
import TwoFactor from "../Screens/Profile/Security/2FA";
import Email from "../Screens/Profile/Security/Email";
import BankList from "../Screens/AddMoney/BankList";
import AddBankDetail from "../Screens/AddMoney/AddBankDetail";
import UPIList from "../Screens/AddMoney/UPIList";
import AddUPIDetails from "../Screens/AddMoney/AddUPIDetails";
import Notification from "../Screens/Nofitication/Notification";
import QRcodeScanner from "../Screens/Qrscanner/QRcodeScanner";
import AccountActivity from "../Screens/Profile/Security/AccountActivity";
import PhoneNumber from "../Screens/Profile/Security/PhoneNumber";
import SubAccount from "../Screens/Profile/SubAccount";
import SubAccountDetails from "../Screens/Profile/SubAccount/Details";
import CreateBasket from "../Screens/Option/CreateBasket";
import TransactionLogs from "../Screens/Profile/TransactionLogs/Transactionlogs";
import PnlAnalytics from "../Screens/Profile/PnLAnalytics/PnlAnalytics";
import Market from "../Screens/Market/market";
import KYCVerification from "../Screens/Profile/MyAccount/KYC/KYCVerification";
import KYCPicture from "../Screens/Profile/MyAccount/KYC/KYCPicture";
import UnderReview from "../Screens/Profile/MyAccount/KYC/UnderReview";
import Withdraw from "../Screens/AddMoney/Withdraw";
import DepositDetails from "../Screens/AddMoney/DepositDetails";
import Buysell from "../Screens/Buysell/buysell";
import Copytrade from "../Screens/Copy/copytrade";
import MasterTrader from "../Screens/Copy/MasterTrader";
import Tradepairs from "../Screens/Copy/setup/tradepairs";
import Tradedetail from "../Screens/Copy/Detail/detail";
import Seeall from "../Screens/Home/seall";
import ForgotPassword from "../Screens/Auth/ForgotPassword";
import ForgotPass from "../Screens/Auth/ForgotPass";
import TwoFactorAuth from "../Screens/Auth/TwoFactorAuth";
import { getItem } from "../Actions/Storage/localstorage";
import UpdateName from "../Screens/Profile/Others/UpdateName";
import UpdatePassword from "../Screens/Profile/Others/UpdatePassword";
import useCustomHooks, { Deviceinfo } from "../Actions/Hooks/customhook";
import { useDispatch, useSelector } from "react-redux";
import UpdateEmail from "../Screens/Profile/Others/UpdateEmail";
import RegisterNumber from "../Screens/Profile/Security/RegisterNumber";
import ChangeNumber from "../Screens/Profile/Security/ChangeNumber";
import SubAccountCreate from "../Screens/Profile/SubAccount/Create";
import SubAccountManage from "../Screens/Profile/SubAccount/Manage";
import TransferFunds from "../Screens/Profile/SubAccount/TransferFunds";
import AffiliateRegister from "../Screens/Affiliate/Register";
import Overview from "../Screens/Affiliate/Overview";
import { helperSelector } from "../Slices/helper";
import { authSelector } from "../Slices/auth";
import SocketService from '../Actions/Socket/index'
import useSocket from "../Actions/Socket/sockethook";
import Referaldashboard from "../Screens/Profile/Others/Referaldashboard";
import { Globalsockethook } from "../Actions/Socket/customhooks";

const Stack = createNativeStackNavigator<Stacknavigationtypes>();


const Stacknavigator: React.FC = () => {

    const authToken = getItem("token")
    const dispatch = useDispatch<any>()
    const { failuretoast, cleardata } = useCustomHooks()
    useEffect(() => {
        // dispatch(Deviceinfo())
    }, [])
    const { sessionexpired } = useSelector(helperSelector)
    useEffect(() => {
        if (sessionexpired) {
            failuretoast("Expired!", "Your seesson has expired!")
            cleardata()
        }
    }, [sessionexpired])

    const { userData } = useSelector(authSelector)


    // useEffect(() => {
    //     SocketService.initializeSocket('https://stage-backend.greenexindia.com');
    //     return () => {
    //         SocketService.disconnect();
    //     };
    // }, []);

    // const { isConnected, emit } = useSocket({
    //     autoConnect: false
    // })

    // if (userData?.userId && isConnected) {
    //     emit("CREATE_ROOM", userData?.userId)
    // }

    const { isConnected } = Globalsockethook();


    return (
        <Stack.Navigator
            screenOptions={MyTransition}
            initialRouteName={authToken ? 'Dashboard' : 'Login'}
        // initialRouteName="Referaldashboard"
        >
            <Stack.Screen name={'Seeall'} component={Seeall} />
            <Stack.Screen name={"Tradepairs"} component={Tradepairs} />
            <Stack.Screen name={"Market"} component={Market} />
            <Stack.Screen name={"Copytrade"} component={Copytrade} />
            <Stack.Screen name={"Tradedetail"} component={Tradedetail} />

            <Stack.Screen options={{
                presentation: "card",
                animation: "slide_from_bottom",
                headerShown: false,
            }} name={"Buysell"} component={Buysell} />
            <Stack.Screen name={"Login"} component={Login} />
            <Stack.Screen name={"Signup"} component={Signup} />
            <Stack.Screen name={"OTP"} component={OTP} />
            <Stack.Screen name={'Test'} component={Test} />
            <Stack.Screen name={'Dashboard'} component={Bottomtab} />
            <Stack.Screen name={'AddMoneyHome'} component={AddMoneyHome} />
            <Stack.Screen name={'BankList'} component={BankList} />
            <Stack.Screen name={'UPIList'} component={UPIList} />
            <Stack.Screen name={'AddBankDetail'} component={AddBankDetail} />
            <Stack.Screen name={'AddUPIDetails'} component={AddUPIDetails} />
            <Stack.Screen name={'Deposit'} component={Deposit} />
            <Stack.Screen name={"Profile"} component={Profile} />
            <Stack.Screen name={"MyAccount"} component={MyAccount} />
            <Stack.Screen name={"AccountEdit"} component={AccountEdit} />
            <Stack.Screen name={"Preference"} component={Preference} />
            <Stack.Screen name={"ColorPreference"} component={ColorPreference} />
            <Stack.Screen name={"Currency"} component={Currency} />
            <Stack.Screen name={"ConfirmMessage"} component={ConfirmMessage} />
            <Stack.Screen name={"Pushnotification"} component={Pushnotification} />
            <Stack.Screen name={"CreateWebhook"} component={CreateWebhook} />
            <Stack.Screen name={"Webhook2FA"} component={Webhook2FA} />
            <Stack.Screen name={"WebhookVerification"} component={WebhookVerification} />
            <Stack.Screen name="Reference" component={Reference} />
            <Stack.Screen name={"BankDetails"} component={BankDetails} />
            <Stack.Screen name={"Support"} component={Support} />
            <Stack.Screen name={"Features"} component={Features} />
            <Stack.Screen name={"APIKeys"} component={APIKeys} />
            <Stack.Screen name={"CreateAPIKey"} component={CreateAPIKey} />
            <Stack.Screen name={"Security"} component={Security} />
            <Stack.Screen name={"TwoFactor"} component={TwoFactor} />
            <Stack.Screen name={"Email"} component={Email} />
            <Stack.Screen name={"Notification"} component={Notification} />
            <Stack.Screen name={"QRcodeScanner"} component={QRcodeScanner} />
            <Stack.Screen name={"AccountActivity"} component={AccountActivity} />
            <Stack.Screen name={"PhoneNumber"} component={PhoneNumber} />
            <Stack.Screen name={"ChangeNumber"} component={ChangeNumber} />
            <Stack.Screen name={"SubAccount"} component={SubAccount} />
            <Stack.Screen name={"SubAccountCreate"} component={SubAccountCreate} />
            <Stack.Screen name={"SubAccountDetails"} component={SubAccountDetails} />
            <Stack.Screen name={"CreateBasket"} component={CreateBasket} />
            <Stack.Screen name={"TransactionLogs"} component={TransactionLogs} />
            <Stack.Screen name={"PnlAnalytics"} component={PnlAnalytics} />
            <Stack.Screen name={"KYCVerification"} component={KYCVerification} />
            <Stack.Screen name={"KYCPicture"} component={KYCPicture} />
            <Stack.Screen name={"UnderReview"} component={UnderReview} />
            <Stack.Screen name={"Withdraw"} component={Withdraw} />
            <Stack.Screen name={"DepositDetails"} component={DepositDetails} />
            <Stack.Screen name={"MasterTrader"} component={MasterTrader} />
            <Stack.Screen name={"ForgotPassword"} component={ForgotPassword} />
            <Stack.Screen name={"ForgotPass"} component={ForgotPass} />
            <Stack.Screen name={"TwoFactorAuth"} component={TwoFactorAuth} />
            <Stack.Screen name={"UpdateName"} component={UpdateName} />
            <Stack.Screen name={"UpdatePassword"} component={UpdatePassword} />
            <Stack.Screen name={"UpdateEmail"} component={UpdateEmail} />
            <Stack.Screen name={"RegisterNumber"} component={RegisterNumber} />
            <Stack.Screen name={"SubAccountManage"} component={SubAccountManage} />
            <Stack.Screen name={"TransferFunds"} component={TransferFunds} />
            <Stack.Screen name={"AffiliateRegister"} component={AffiliateRegister} />
            <Stack.Screen name={"Overview"} component={Overview} />
            <Stack.Screen name={"Referaldashboard"} component={Referaldashboard} />
        </Stack.Navigator>
    )
}

export default Stacknavigator