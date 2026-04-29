export interface authState {
    isloading?: Boolean;
    authToken?: string;
    userData?: any;
    deviceinfo?: {
        deviceId?: String,
        deviceName?: String,
        fcmtoken?: String
    };
    affiliateData?: any
}


export interface walletState {
    isloading?: Boolean;
    getcurrencies?: any,
    currentaccount?: any,
    pricedetails?: any

}


export interface subAccountState {
    isloading?: Boolean;
    subaccounts?: any
}

export interface affiliateState {
    isloading?: Boolean;
}

export interface futureState {
    isloading?: Boolean;
    futurePairData?: any;
    wallet?: any;
    futureTicker?: any;
    futureTradePair?: any;
    positionDetails?: any
}