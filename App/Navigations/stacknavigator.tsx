import React, { useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Stacknavigationtypes } from './stacknavigationtypes';
import FetchLocation from '../Screens/Location/fetchLocation';
import UpdateLocation from '../Screens/Location/updateLocation';
import Login from '../Screens/Auth/login';
import OTP from '../Screens/Auth/OTP';
import { FadeTransition } from '../Utilities/navigationslide';
import Home from '../Screens/Home/home';
import Bottomtab from './bottomtab';
import RTOService from '../Screens/Services/RTO';
import RCTransfer from '../Screens/Services/RTO/RCTransfer';
import RCDocument from '../Screens/Services/RTO/RCDocument';
import CleaningService from '../Screens/Services/CleaningService/cleaningService';
// import SelectVehicle from '../Screens/Services/CleaningService/selectVehicle';
import Subscription from '../Screens/Subscription/subscription';
import Premium from '../Screens/Subscription/premium';
import TimeSlot from '../Screens/Subscription/timeSlot';
import CustomerDetails from '../Screens/Subscription/customerDetails';
import Payment from '../Screens/Payment/payment';
import Coupon from '../Screens/Payment/coupon';
import PlaceOrder from '../Screens/Payment/placeOrder';
import CarScrapping from '../Screens/Services/CarScrapping';
import ScrappingDetails from '../Screens/Services/CarScrapping/Details/Vehicle';
import ScrappingPerson from '../Screens/Services/CarScrapping/Details/Person';
import ScrappingAddress from '../Screens/Services/CarScrapping/Details/Address';
import ScrappingPicture from '../Screens/Services/CarScrapping/Details/Pictures';
import ScrapStatus from '../Screens/Services/CarScrapping/ScrapStatus';
import Faq from '../Screens/Faq/faq';
import Booking from '../Screens/Booking/Booking/booking';
import OrderHistory from '../Screens/Booking/Booking/orderHistory';
import OrderDetails from '../Screens/Booking/ViewDetails/orderDetails';
import TrackOrder from '../Screens/Booking/ViewDetails/trackOrder';
import Review from '../Screens/Booking/ViewDetails/review';
import OrderActivity from '../Screens/Booking/WatchActivity/orderActivity';
import AddOns from '../Screens/Booking/WatchActivity/addOns';
import PayNow from '../Screens/Booking/WatchActivity/payNow';
import WatchActivity from '../Screens/Booking/WatchActivity/watchActivity';
import OnTimeClean from '../Screens/Services/CleaningService/onTimeClean';
import DriverOnDemand from '../Screens/DriverOnDemand/DriverOnDemand';
import TestScreen from '../Screens/TestScreen';
import OneWayRideScreen from '../Screens/DriverOnDemand/OneWayRideScreen';
import SearchLocation from '../Screens/DriverOnDemand/SearchLocation';
import RequestDriver from '../Screens/DriverOnDemand/RequestDriver';
import SubscriptionPlan from '../Screens/Profile/Components/SubscriprionPlan/subscriptionPlan';
import ContactUs from '../Screens/Profile/Components/ContactUs/contactUs';
import VehicleManage from '../Screens/Profile/Components/VehicleManage/vehicleManage';
import ServiceDetails from '../Screens/Profile/Components/ServiceDetails/serviceDetails';
import MyAddress from '../Screens/Profile/Components/MyAddress/myAddress';
import ReferEarn from '../Screens/Profile/Components/ReferEarn/referEarn';
import MyProfile from '../Screens/Profile/Components/MyProfile/myProfile';
import CancelSubscription from '../Screens/Profile/Components/SubscriprionPlan/cancelSubscription';
import FeedbackRatings from '../Screens/Profile/Components/ServiceDetails/feedbackRatings';
import RenewServices from '../Screens/Profile/Components/ServiceDetails/renewServices';
import UpgradePlan from '../Screens/Profile/upgradePlan';
import DailyTracking from '../Screens/Profile/Components/ServiceDetails/dailyTracking';
import TrackingDetails from '../Screens/Profile/Components/ServiceDetails/trackingDetails';
import CleanerAttendance from '../Screens/Profile/Components/ServiceDetails/cleanerAttendance';
import BookingSuccess from '../Screens/DriverOnDemand/Components/BookingSuccess';
import BookingDetail from '../Screens/DriverOnDemand/BookingDetail';
import RiderDetail from '../Screens/DriverOnDemand/RiderDetail';
import MyRide from '../Screens/DriverOnDemand/MyRide';
import Notifications from '../Screens/DriverOnDemand/Notifications';
import RideDetail from '../Screens/DriverOnDemand/RideDetail';
import AddVehicleType from '../Screens/Profile/Components/VehicleManage/addVehicleType';
import CustomerDetail from '../Screens/DriverOnDemand/CustomerDetail';
import Reschedule from '../Screens/DriverOnDemand/Reschedule';
import RescheduleUpdate from '../Screens/Booking/ViewDetails/rescheduleUpdate';
import HomeNotification from '../Screens/Notification/homeNotification';
import CleaningServiceDetails from '../Screens/Subscription/cleaningServiceDetails';
import ChatBox from '../Screens/Booking/chatBox';
import LiveLocation from '../Screens/Profile/Components/MyAddress/liveLocation';
import ChallanCqPayment from '../Screens/ChallanCqPayment/challanCqPayment';
import PaymentSummery from '../Screens/ChallanCqPayment/paymentSummery';
import PaymentNow from '../Screens/ChallanCqPayment/paymentNow';
import challanID from '../Screens/ChallanCqPayment/challanID';
import DrawerNavigator from './drawernavigation';
import ScrapBookingHistory from '../Screens/Services/CarScrapping/ScrapBookingHistory';
import ScrapNotifications from '../Screens/Services/CarScrapping/ScrapNotifications';
import ScrapPostList from '../Screens/Services/CarScrapping/ScrapPostList';
import ScrapPostDetails from '../Screens/Services/CarScrapping/ScrapPostDetails';
import BiddingDetails from '../Screens/Services/CarScrapping/BiddingDetails';
import ScrapPickupScheldule from '../Screens/Services/CarScrapping/ScrapPickupSchedule';
import FASTagProvider from '../Screens/Services/FASTag/FASTagProvider';
import VehicleForm from '../Screens/Services/FASTag/VehicleForm';
import Recharge from '../Screens/Services/FASTag/Recharge';
import RechargeDetails from '../Screens/Services/FASTag/RechargeDetails';
import FASTagStatus from '../Screens/Services/FASTag/FASTagStatus';
import BiddingRequest from '../Screens/Services/CarScrapping/BiddingRequest';
import { useFocusEffect } from '@react-navigation/native';
import { loginCheck } from '../Common/commonFunction';
import AboutCarigato from '../Screens/Faq/Components/AboutCarigato/aboutCarigato';
import ServiceQuery from '../Screens/Faq/Components/ServiceQuery/serviceQuery';
import Feedback from '../Screens/Faq/Components/Feedback/feedback';
import Warrenty from '../Screens/Faq/Components/Warrenty/warrenty';
import RideChatBox from '../Screens/DriverOnDemand/RideChatBox';
import UpdateCertificate from '../Screens/Services/CarScrapping/UpdateCertificate';

const Stack = createNativeStackNavigator<Stacknavigationtypes>();

const Stacknavigator: React.FC = () => {



  return (
    <Stack.Navigator
      screenOptions={FadeTransition}
      // initialRouteName='TestScreen'
      initialRouteName={loginCheck() ? "Bottomtab" : 'Login'}
    >
      <Stack.Group>
        <Stack.Screen name={'Bottomtab'} component={Bottomtab} />
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'OTP'} component={OTP} />
        <Stack.Screen name={'FetchLocation'} component={FetchLocation} />
        <Stack.Screen name={'UpdateLocation'} component={UpdateLocation} />
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'CleaningService'} component={CleaningService} />
        {/* <Stack.Screen name={'SelectVehicle'} component={SelectVehicle} /> */}
        <Stack.Screen name={'RTOService'} component={RTOService} />
        <Stack.Screen name={'RCTransfer'} component={RCTransfer} />
        <Stack.Screen name={'RCDocument'} component={RCDocument} />
        <Stack.Screen name={'Subscription'} component={Subscription} />
        <Stack.Screen name={'Premium'} component={Premium} />
        <Stack.Screen name={'TimeSlot'} component={TimeSlot} />
        <Stack.Screen name={'CustomerDetails'} component={CustomerDetails} />
        <Stack.Screen name={'Payment'} component={Payment} />
        <Stack.Screen name={'Coupon'} component={Coupon} />
        <Stack.Screen name={'PlaceOrder'} component={PlaceOrder} />
        <Stack.Screen name={'Booking'} component={Booking} />
        <Stack.Screen name={'OrderHistory'} component={OrderHistory} />
        <Stack.Screen name={'OrderDetails'} component={OrderDetails} />
        <Stack.Screen name={'TrackOrder'} component={TrackOrder} />
        <Stack.Screen name={'Review'} component={Review} />
        <Stack.Screen name={'OrderActivity'} component={OrderActivity} />
        <Stack.Screen name={'AddOns'} component={AddOns} />
        <Stack.Screen name={'PayNow'} component={PayNow} />
        <Stack.Screen name={'WatchActivity'} component={WatchActivity} />
        <Stack.Screen name={'OnTimeClean'} component={OnTimeClean} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={'BiddingRequest'} component={BiddingRequest} />
        <Stack.Screen name={'BiddingDetails'} component={BiddingDetails} />
        <Stack.Screen name={'CarScrapping'} component={CarScrapping} />
        <Stack.Screen name={'ScrappingDetails'} component={ScrappingDetails} />
        <Stack.Screen name={'ScrapStatus'} component={ScrapStatus} />
        <Stack.Screen name={'Faq'} component={Faq} />
        <Stack.Screen name={'DriverOnDemand'} component={DriverOnDemand} />
        <Stack.Screen name={'TestScreen'} component={TestScreen} />
        <Stack.Screen name={'OneWayRideScreen'} component={OneWayRideScreen} />
        <Stack.Screen name={'SearchLocation'} component={SearchLocation} />
        <Stack.Screen name={'RequestDriver'} component={RequestDriver} />
        <Stack.Screen name={'ScrapBookingHistory'} component={ScrapBookingHistory} />
        <Stack.Screen name={'ScrapNotifications'} component={ScrapNotifications} />
        <Stack.Screen name={'ScrapPostList'} component={ScrapPostList} />
        <Stack.Screen name={'ScrapPostDetails'} component={ScrapPostDetails} />
        <Stack.Screen name={'ScrapPickupScheldule'} component={ScrapPickupScheldule} />
        <Stack.Screen name={'UpdateCertificate'} component={UpdateCertificate} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={'SubscriptionPlan'} component={SubscriptionPlan} />
        <Stack.Screen name={'ContactUs'} component={ContactUs} />
        <Stack.Screen name={'VehicleManage'} component={VehicleManage} />
        <Stack.Screen name={'ServiceDetail'} component={ServiceDetails} />
        <Stack.Screen name={'MyAddress'} component={MyAddress} />
        <Stack.Screen name={'ReferEarn'} component={ReferEarn} />
        <Stack.Screen name={'MyProfile'} component={MyProfile} />
        <Stack.Screen
          name={'CancelSubscription'}
          component={CancelSubscription}
        />
        <Stack.Screen name={'FeedbackRatings'} component={FeedbackRatings} />
        <Stack.Screen name={'RenewServices'} component={RenewServices} />
        <Stack.Screen name={'UpgradePlan'} component={UpgradePlan} />
        <Stack.Screen name={'DailyTracking'} component={DailyTracking} />
        <Stack.Screen name={'TrackingDetails'} component={TrackingDetails} />
        <Stack.Screen name={'CleanerAttendance'} component={CleanerAttendance} />
        <Stack.Screen name={'BookingSuccess'} component={BookingSuccess} />
        <Stack.Screen name={'BookingDetail'} component={BookingDetail} />
        <Stack.Screen name={'RiderDetail'} component={RiderDetail} />
        <Stack.Screen name={'MyRide'} component={MyRide} />
        <Stack.Screen name={'Notifications'} component={Notifications} />
        <Stack.Screen name={'RideDetail'} component={RideDetail} />
        <Stack.Screen name={'RideChatBox'} component={RideChatBox} />
        <Stack.Screen name={'AddVehicleType'} component={AddVehicleType} />
        <Stack.Screen name={'Reschedule'} component={Reschedule} />
        <Stack.Screen name={'CustomerDetail'} component={CustomerDetail} />
        <Stack.Screen name={'RescheduleUpdate'} component={RescheduleUpdate} />
        <Stack.Screen name={'HomeNotification'} component={HomeNotification} />
        <Stack.Screen name={'CleaningServiceDetails'} component={CleaningServiceDetails} />
        <Stack.Screen name={'ChatBox'} component={ChatBox} />
        <Stack.Screen name={'LiveLocation'} component={LiveLocation} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={'FASTagProvider'} component={FASTagProvider} />
        <Stack.Screen name={'VehicleForm'} component={VehicleForm} />
        <Stack.Screen name={'Recharge'} component={Recharge} />
        <Stack.Screen name={'RechargeDetails'} component={RechargeDetails} />
        <Stack.Screen name={'FASTagStatus'} component={FASTagStatus} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={'AboutCarigato'} component={AboutCarigato} />
        <Stack.Screen name={'ServiceQuery'} component={ServiceQuery} />
        <Stack.Screen name={'Feedback'} component={Feedback} />
        <Stack.Screen name={'Warrenty'} component={Warrenty} />
      </Stack.Group>
      <Stack.Screen name={'DrawerNavigator'} component={DrawerNavigator} />
      <Stack.Screen name={'ChallanCqPayment'} component={ChallanCqPayment} />
      <Stack.Screen name={'PaymentSummery'} component={PaymentSummery} />
      <Stack.Screen name={'PaymentNow'} component={PaymentNow} />
      <Stack.Screen name={'challanID'} component={challanID} />
    </Stack.Navigator>
  );
};

export default Stacknavigator;
