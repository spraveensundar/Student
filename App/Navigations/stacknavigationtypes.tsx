export type Stacknavigationtypes = {
    Login: undefined,
    OTP: undefined,
    Termsandcondtions: undefined,
    Categories: undefined,
    CleaningResiter: undefined,
    SupportPartnerRegister: undefined,
    SupportPartnerConfirmation: undefined,
    ContactUs: undefined,
    ScrapDealerRegister: undefined,
    ScrapDealerConfirmation: undefined,
    CertificateUpload: undefined,
    ScrapDealerApproval: undefined,
    ScrapDealerEditProfile: undefined,
    ScrapDetails: undefined,
    PickupDetails: {
        vehicleScrapId?: any
    },
    PickupReschedule: {
        vehicleScrapId?: any
    },
    ScrapOrderHistory: undefined,
    MyBids: undefined,
    ScrapNotifications: undefined,
    Aadharverification: undefined,
    Takeselfie: undefined,
    Selfie: {
        params: string
    },
    UpdateLocation: undefined,
    FetchLocation: undefined,
    Successreg: undefined,
    Manualverification: undefined,
    Vendorhome: undefined,
    Servicerequest: undefined,
    JobDetails: undefined,
    Profile: undefined,
    Editprofile: undefined,
    Earnings: undefined,
    LeaveAttendance: { data?: any } | undefined,
    ApplyLeave: undefined,
    LeaveConfirmation: {
        origin: string;
        content: string;
        button: {
            title: string;
            onButtonPress: () => void;
        };
        status: "success" | "info" | "error"
    },
    Completejob: undefined,
    Reviews: undefined,
    Finalwash: undefined
    Servicedetail: undefined,
    Addonjobdetail: undefined,
    Addonservicedetail: undefined,
    Bookingdetail: undefined,
    Refferal: undefined,
    Notification: undefined,
    MakeBid: undefined,
    Chooselangugae: undefined,
    UpdateBank: undefined,
    Test: undefined,
    ChatBox: undefined
}


export type DrawerParamList = {
    Home: undefined,
    Mapscreen: undefined,
    Onetimewash: undefined
    Dailycarwash: undefined
    ScrapPostOverView: undefined
    MakeBid: undefined
}