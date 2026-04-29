export type Stacknavigationtypes = {
  Login: { redirectTo?: keyof Stacknavigationtypes } | undefined;
  OTP: { redirectTo?: keyof Stacknavigationtypes, mobileNo: string } | undefined;
  FetchLocation: undefined;
  UpdateLocation: {
    locationData?: any;
    redirectTo?: string;
    dataFrom?: string;
  } | undefined;
  Home: undefined;
  Bottomtab: { screen?: keyof BottomTabParamList; params?: any, noBack?: any } | undefined;
  CleaningService: undefined;
  VehicleType: undefined;
  VechicleBrand: undefined;
  VarientType: undefined;
  SelectVehicle: undefined;
  ServiceDetails: undefined;
  RTOService: undefined;
  RCTransfer: undefined;
  RCDocument: undefined;
  Subscription: undefined;
  Premium: undefined;
  TimeSlot: undefined;
  CustomerDetails?: { onTime: any };
  Payment?: { onTime: any };
  Coupon: undefined;
  PlaceOrder: undefined;
  Booking: { onTime: any };
  OrderHistory: { onTime: any };
  OrderDetails: { rescheduled: boolean, fromScreen: string, subscriptionId: string };
  TrackOrder: { serviceId?: string, subscriptionId?: string };
  Review: { serviceDetail?: any, from: string };
  OrderActivity: { subscriptionId: string };
  AddOns: { serviceId: string, subscriptionId: string };
  PayNow: undefined;
  WatchActivity: { serviceId: string };
  OnTimeClean: undefined;
  CarScrapping: undefined;
  ScrappingDetails: undefined;
  ScrappingPerson: undefined;
  ScrappingAddress: undefined;
  ScrappingPicture: undefined;
  ScrapStatus: {
    origin: string;
    content: string;
    button: {
      title: string;
      onButtonPress: () => void;
    };
    status: "success" | "info" | "error"
  };
  ScrapBookingHistory: undefined;
  ScrapNotifications: undefined;
  ScrapPostList: undefined;
  ScrapPostDetails: { post?: any } | undefined;
  BiddingRequest: { scrapId?: any };
  BiddingDetails: { vehicleScrapId?: any, requestId?: any };
  ScrapPickupScheldule: { bidId?: any, data?: any };
  Faq: undefined;
  DriverOnDemand?: { fromScreen?: string };
  TestScreen: undefined;
  OneWayRideScreen: undefined;
  SearchLocation?: { locationType?: string };
  RequestDriver: undefined;
  SubscriptionPlan: undefined;
  ContactUs: undefined;
  VehicleManage: { VehicleAdded: boolean };
  ServiceDetail: undefined;
  MyAddress: undefined;
  ReferEarn: undefined;
  MyProfile: undefined;
  CancelSubscription: { subscriptionId?: string };
  FeedbackRatings: undefined;
  RenewServices: undefined;
  UpgradePlan: undefined;
  DailyTracking: undefined;
  TrackingDetails: { data: any };
  CleanerAttendance: undefined;
  BookingSuccess?: { rideDetail?: object, };
  BookingDetail?: { rideDetail?: object, rideId?: string };
  RiderDetail?: { rideDetail?: object, rideId?: string };
  MyRide?: { noBack?: boolean };
  Notifications: undefined;
  RideDetail?: { rideDetail?: object, rideId?: string };
  RideChatBox?: { rideDetail?: any };
  AddVehicleType: undefined;
  Reschedule: undefined;
  CustomerDetail: undefined;
  RescheduleUpdate: undefined;
  HomeNotification: undefined;
  CleaningServiceDetails?: { planData?: any };
  ChatBox?: { serviceDetail?: any };
  LiveLocation: undefined;
  ChallanCqPayment: undefined;
  PaymentSummery: undefined;
  PaymentNow: undefined;
  challanID: undefined;
  FASTagProvider: undefined;
  VehicleForm: { provider: any };
  Recharge: { provider: any };
  RechargeDetails: { provider: any };
  FASTagStatus: {
    origin: string;
    content: string;
    button: {
      title: string;
      onButtonPress: () => void;
    };
    status: "success" | "info" | "error"
  };
  DrawerNavigator: undefined;
  AboutCarigato: undefined;
  ServiceQuery: undefined;
  Feedback: undefined;
  Warrenty: undefined;
  FileView: { imageUrls: any };
  UpdateCertificate: { data?: any }
};

export type BottomTabParamList = {
  Home: undefined;
  Orders: undefined;
  Profile: undefined;
  Support: undefined;
  Upgrade: undefined;
};

export type DrawerParamList = {
  root: Stacknavigationtypes;
}
