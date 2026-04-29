import { Photos, photosprops } from "../Actions/Types/phototypes"

// Slice API types
export type apiResponse = {
    status?: boolean;
    data?: any;
    message?: string;
};

export type otpbackparams = {
    params: any
    from: string
}
export type servicetype = "dailywash" | "onetimewash" | "rto" | "scrapdealer" | "none"
export type dailywashstates = "request" | "accept"
export type onetimewashstates = "offine" | "request" | "accept"

export type coordinates = {
    accuracy: number,
    altitude: number,
    heading: number,
    latitude: number,
    longitude: number,
    speed: number
}
export interface currentlocation {
    coordinates: coordinates,
    labeladdress: string
}

export interface HelperState {
    otpbackparams?: otpbackparams,
    cleaningstatus?: "pending" | "complted",
    servicetype?: servicetype,
    dailywashstate?: dailywashstates,
    onetimewashstate?: onetimewashstates,
    currentlocation?: currentlocation,
    emailverify: boolean,
    mobileNumber?: string,
    updateTeam?: boolean,
    updateuserData?: any,
    servicecheck: {
        before: boolean,
        after: boolean
    }
}

export interface vechilechecklist {
    title: string,
    value: photosprops[]
}

export interface cleaningState {

    checklist: vechilechecklist[]
    selectedservice: any,
    damage: any[]

}

export interface authState {
    isloading?: Boolean;
    authToken?: string;
    userData?: any;
    deviceinfo?: {
        deviceId?: String,
        deviceName?: String,
        fcmtoken?: String
    };
    serviceMan?: any;
    scrapMan?: any;
}


export const dataofchecklist: vechilechecklist[] = [
    {
        title: "Glass & Mirror",
        value: Photos
    },
    {
        title: "Tyres & Rims",
        value: Photos
    },
    {
        title: "Wheel Arches & Mudguards",
        value: Photos
    },
    {
        title: "Interior Vacuuming",
        value: Photos
    },
    {
        title: "Dashboard & Console",
        value: Photos
    },
    {
        title: "Door Panels & Handles",
        value: Photos
    },
    {
        title: "Underbody Cleaning",
        value: Photos
    },
]

export interface cleaningRegisterPayload {
    name: string;
    email: string;
    gender: string;
    mobileNo: string;
    dob: string;
    latitude: number;
    longitude: number;
    city: string;
    sector: string;
    locality: string;
}

export interface sendOTPPayload {
    email?: string;
    mobileNo?: string;
    otpType: 'email' | 'mobileNo';
}

export interface getLeaveTypesQparams {
    page?: number;
    limit?: number;
}

export interface getLeaveRequestQparams {
    servicemanId?: string;
}

export interface getMyEarningsQparams {
    startDate?: string;
    endDate?: string;
}

export interface getNotificationQparams {
    page?: number;
    limit?: number;
}
export interface photos {
    title?: string,
    image?: any,
}
export interface Persistortype {
    serviceinprogress: any,
    beforewashpics: photos[],
    afterwashpics: photos[],
    persistservice?: servicetype,
    isaddonservice: boolean,
    addonpics?: photos[],
    damagepics?: any
    scrapstatus?: any,
    scrapservice?: any

}


export interface scrapState {
    scrapDetails?: any
}
