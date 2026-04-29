import { BASE_URL, CRYPTO_SECRET_KEY, IMAGE_PROFILE, GOOGLE_MAP_URL, FIND_ADDRESS, SOCKETURL } from "@env";

// const GOOGLE_MAP_URL = "https://maps.googleapis.com/maps/api/"
// const FIND_ADDRESS = "geocode/json?address="
// const FIND_LATLNG = "geocode/json?latlng="
// const SEARCH_KEY = "place/autocomplete/json?input="

// export const GET_ADDRESS = `${GOOGLE_MAP_URL}` + `${FIND_ADDRESS}`
export const GOOGLEAPIKEY = "AIzaSyCzLqsSvk3AoCTwaaEqpJ0UTVbbcR9yOxM"

// export const BASEURL = BASE_URL;
export const BASEURL = BASE_URL
export const PROFILEURL = IMAGE_PROFILE
export const SECRETKEY = CRYPTO_SECRET_KEY;
export const GET_ADDRESS = `${GOOGLE_MAP_URL}` + `${FIND_ADDRESS}`
export const SOCKET_URL = SOCKETURL

export const returnOriginalFile = (fileName: string) => {
    console.log("asdfasdf", `${IMAGE_PROFILE + fileName}`)
    return `${IMAGE_PROFILE + fileName}`;
}

export const ENDPOINTS = {
    Login: "/serviceman/login",
    MobileOTPVerify: "/serviceman/verificationMobileOtp",
    VerificationEmailOtp: "/serviceman/verificationEmailOtp",
    ServicemanDetails: "/serviceman/getServicemanDetails",
    LivenessCheck: "/serviceman/livenessCheck",
    CommonVerifiedStatus: "/serviceman/updateCommonVerfiedStatus",
    ResendMob_Otp: "/serviceman/resendMobileOtp",
    ResendOtp: "/serviceman/resendOtpfunction",
    ForgetPassword: "/serviceman/forgetPasswordfunction",
    ChangePassword: "/serviceman/changePasswordfunction",
    SendOTP: "/serviceman/sentEmailOrMobileOtp",
    LeaveAttendance: "/serviceman/leaveAttendance",
    CheckInAndOutFunc: "/serviceman/checkInAndCheckOutFunc",
    ServiceAvailable: "/serviceman/serviceAvailable",
    AcceptService: "/serviceman/servicemanAcceptService",
    RejectService: "/serviceman/servicemanRejectService",
    CleaningRegister: "/serviceman/servicemanEdit",
    UploadAadharInfo: "/serviceman/servicemanUploadAadhar",
    FetchMyServiceDetails: "/serviceman/getMyServiceDetails",
    CurrentServiceList: "/serviceman/getCurrentServiceListAndTotalService",
    FetchCustomerServiceList: "/serviceman/getAllCustomerServices",
    UpdateBank: "/serviceman/updateBankAccountDetails",
    GetLeaveTypes: "/serviceman/getLeaveTypes",
    RequestLeave: "/serviceman/servicemanLeaveRequest",
    GetServicemanLeaveRequest: "/serviceman/getServicemanLeaveRequest",
    EditServicemanLeaveRequest: "/serviceman/servicemanEditLeaveRequest",
    CancelServicemanLeaveRequest: "/serviceman/servicemanCancelLeaveRequest",
    FetchMyEarnings: "/serviceman/getMyEarnings",
    GetNotifications: "/serviceman/getServicemanNotifications",
    upcomingbookings: "/serviceman/getCurrentServiceListAndTotalService",
    faceCheckBeforeServiceStart: "/serviceman/faceCheckBeforeServiceStart",
    faceCheckAfterService: "/serviceman/faceCheckAfterService",
    serviceotpverify: "/serviceman/verificationVehicleServiceMobileOtp",
    resendVehicleServiceMobileOtp: "/serviceman/resendVehicleServiceMobileOtp",
    servicerAction: "/serviceman/servicerAction",



    serviceAddonAction: "/serviceman/serviceAddonAction",
    getServiceDetail: "/serviceman/getServiceDetail",
    serviceAddOnProofUpload: "/serviceman/serviceAddOnProofUpload",
    feedbackRatingToUser: "/serviceman/feedbackRatingToUser",
    getAllCustomerServices: "/serviceman/getAllCustomerServices",
    getServicemanNotifications: "/serviceman/getServicemanNotifications",
    getMyEarnings: "/serviceman/getMyEarnings",
    servicemanAcceptService: "/serviceman/servicemanAcceptService",
    servicemanRejectService: "/serviceman/servicemanRejectService",
    serviceAvailable: "/serviceman/serviceAvailable",
    cancelService: "/serviceman/cancelService",
    getMessages: "/serviceman/getMessages",
    createMessage: "/serviceman/createMessage",
    getRecurrences: "/serviceman/getRecurrences",
    getAppData: "/serviceman/getAppData",



    // scrapper //
    ScrapLogin: "scrapper/login",
    rvsfFileUpdate: "scrapper/rvsfFileUpdate",
    rvscCertificateUpdate: "scrapper/rvsfFileUpdate",
    ScrapVerificationOtp: "scrapper/verificationMobileOtp",
    ScrapResendOtp: "scrapper/resendMobileOtp",
    ScrapRegisterForm: "scrapper/rvscFormUpdate",
    ScrapDealerDetails: "scrapper/getScrapperDetails",
    ScrapDealerEdit: "scrapper/scrapperEdit",
    getAllVehicleScraps: "scrapper/getAllVehicleScraps",
    viewScrapDetails: "scrapper/viewScrapDetails",
    viewPickupDetailsToScrapper: "scrapper/viewPickupDetailsToScrapper",
    viewBidLists: "scrapper/getScrapBidLists",
    scrapBidding: "scrapper/scrapBidding",
    myBidsBookingHistory: "scrapper/getMyBidsBookingHistory",
    getMyScrapBids: "scrapper/getMyParticularScrapBids",
    cancelBid: "scrapper/cancelBid",
    reschedulePickup: "scrapper/reschedulePickup",
    startPickup: "scrapper/startPickup",
    amountPayToAdmin: "scrapper/scrapCommissionAmountPayToAdmin",
    scrapRatings: "scrapper/scrapRatingsAndFeedback",
    getMyScrapFee: "scrapper/getMyScrapFeePaymentList"

}

