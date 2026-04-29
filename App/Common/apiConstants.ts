
export const apiEndPoints = Object.freeze({

    // internal api's

    login: "/login",
    verifyOtp: "/verificationMobileOtp",
    resendMobileOtp: "/resendMobileOtp",
    getMyDetail: "/getMyDetail",
    fetchLocationDetail: "/fetchLocationDetail",
    fetchLatLng: "/fetchLatLng",
    addAddress: "/addAddress",
    editAddress: "/editAddress",
    deleteAddress: "/deleteAddress",
    userEditProfile: "/userEditProfile",
    getMyVehicles: "/getVehicles",
    getVehicleType: "/getVehicleType",
    getBrands: "/getBrands",
    getBrandsVehicle: "/getBrandsVehicle",
    addVehicle: "/addVehicle",
    editVehicle: "/editVehicle",
    deleteVehicle: "/deleteVehicle",
    getPackages: "/getPackages",
    getPackageDetail: "/getPackageDetail",
    getPlans: "/getPlans",
    getTimeSlots: "/getTimeSlots",
    razorpaycreateorder: "/create-order",
    razorpayverifyPayment: "/verify-payment",
    subscription: "/subscription",
    oneTimePurchase: "/oneTimeService",
    deleteSubscription: "/deleteSubscription",
    getMySubscriptionPackages: "/getMySubscriptionPackages",
    getMySubscriptionDetail: "/getMySubscriptionDetail",
    getMySubscriptionServiceForCalendar: "/getMySubscriptionServiceForCalendar",
    getMySubscriptionServiceDetail: "/getMySubscriptionServiceDetail",
    cancelSubscription: "/cancelSubscription",
    notificationEnableAndDisable: "/notificationEnableAndDisable",
    getMyNotifications: "/getUserNotifications",
    getFees: "/getFees",
    getServiceChatMessages: "/getServiceChatMessages",
    sendServiceChatMessage: "/sendServiceChatMessage",
    getAddOnServices: "/getAddOnServices",
    addOnSubscriptionService: "/addOnSubscriptionService",
    addOnVerifyPayment: "/addOnVerifyPayment",
    getMyService: "/getMyService",
    getAssignedServiceMan: "/getAssignedServiceMan",
    userRatingAndFeedback: "/userRatingAndFeedback",
    getServiceFeedbackAndRatings: "/getServiceFeedbackAndRatings",
    updateFcm: "/updateFcm",
    getAppData: "/getAppData",
    getCmsContent: "/getCmsContent",
    getCityList: "/getCityList",
    getApartmentList: "/getApartmentList",
    createRide: "/createRide",
    getMyRides: "/getMyRides",
    getRideDetail: "/getRideDetail",
    cancelRide: "/cancelRide",
    rescheduleRide: "/rescheduleRide",
    getRideMessages: "/getRideMessages",
    createRideMessage: "/createRideMessage",
    ridePaid: "/ridePaid",

    getMyScrapPosts: "/getMyScrapPosts",
    addVehicleScrapDetails: "/addVehicleScrapDetails",
    cancelVehicleScrapPost: "/cancelVehicleScrap",
    acceptBid: "/acceptBid",
    getMyVehicleScrapBids: "/getMyVehicleScrapBids",
    vehicleScrapUpdateBidCompleted: "/vehicleScrapUpdateBidCompleted",
    getAcceptBids: "/getAcceptBids",
    vehicleScrapDetails: "/viewVehicleScrapDetails",
    updatePickup: "/updatePickupDetail",
    viewPickupDetails: "/viewPickupDetailsToUser",
    scrapCertificate: "/scrapCertificateAndStatusUpdated",



    // internal api's



    // thirdparty api's

    googleMapAutoComplete: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
    googleMapPlaceIdFetch: "https://maps.googleapis.com/maps/api/place/details/json",
    googleMapLatLngDetailFetch: "https://maps.googleapis.com/maps/api/geocode/json"

    // thirdparty api's




});


