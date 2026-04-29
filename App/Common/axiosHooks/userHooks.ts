import { apiEndPoints } from "../apiConstants";
import { appendData, returnAddressFormat, useAxios } from "../commonFunction";
import { googleMapLatLngDetail } from "./thirdPartyHooks";


export const userLogin = async (data: object) => {
    try {
        let sendData = {
            url: apiEndPoints.login,
            method: "POST",
            data: data,
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('userLogin_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const userVerifyOtp = async (data: object) => {
    try {
        let sendData = {
            url: apiEndPoints.verifyOtp,
            method: "POST",
            data: data,
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('userVerifyOtp_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const userResendOtp = async (data: object) => {
    try {
        let sendData = {
            url: apiEndPoints.resendMobileOtp,
            method: "POST",
            data: data,
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('userResendOtp_error', error);
        return { status: false, message: "Error occured" };
    }
}

interface fetchLocationDetailParams {
    latitude: string;
    longitude: string;
}

export const fetchLocationDetail = async (data: fetchLocationDetailParams) => {
    try {
        let sendData = {
            url: apiEndPoints.fetchLocationDetail,
            method: "POST",
            data: data,
        }
        console.log('sendData', sendData)
        // let resp = await useAxios(sendData);
        // return resp?.data;
        let resp = await googleMapLatLngDetail(data?.latitude, data?.longitude);
        console.log('resultttt', resp?.results?.[0])
        let result = resp?.results?.[0];
        if (result) {
            result = returnAddressFormat(result);
            return { status: true, message: "location data fetched!", data: { addressData: result, address: result?.fullAddress, latitude: data?.latitude, longitude: data?.longitude } };
        }
        return resp?.data;
    }
    catch (error: any) {
        console.log('fetchLocationDetail_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const fetchLatLng = async (data: object) => {
    try {
        let sendData = {
            url: apiEndPoints.fetchLatLng,
            method: "POST",
            data: data,
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('fetchLatLng_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const addAddress = async (data: object) => {
    try {
        let sendData = {
            url: apiEndPoints.addAddress,
            method: "POST",
            data: data,
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('addAddress_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const editAddress = async (data: object) => {
    try {
        let sendData = {
            url: apiEndPoints.editAddress,
            method: "POST",
            data: data,
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('editAddress_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const deleteAddressAxios = async (data: object) => {
    try {
        let sendData = {
            url: apiEndPoints.deleteAddress,
            method: "POST",
            data: data,
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('deleteAddressAxios_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const userEditProfile = async (data: object) => {
    try {
        let append = appendData(data);
        console.log('appendappend', append)
        let sendData = {
            url: apiEndPoints.userEditProfile,
            method: "POST",
            data: append,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('userEditProfile_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const addUserVehicle = async (data: object) => {
    try {
        let append = appendData(data);
        console.log('appendappend', append)
        let sendData = {
            url: apiEndPoints.addVehicle,
            method: "POST",
            data: append,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('addUserVehicle_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const editUserVehicle = async (data: object) => {
    try {
        let append = appendData(data);
        console.log('appendappend', append)
        let sendData = {
            url: apiEndPoints.editVehicle,
            method: "POST",
            data: append,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('editUserVehicle_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const deleteUserVehicle = async (data: object) => {
    try {
        let append = appendData(data);
        console.log('appendappend', append)
        let sendData = {
            url: apiEndPoints.deleteVehicle,
            method: "POST",
            data: append,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('deleteUserVehicle_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const updateNotificationStatus = async (data: object) => {
    try {
        let sendData = {
            url: apiEndPoints.notificationEnableAndDisable,
            method: "POST",
            data: data,
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('updateNotificationStatus_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const addOnSubscriptionService = async (data: object) => {
    try {
        let sendData = {
            url: apiEndPoints.addOnSubscriptionService,
            method: "POST",
            data: data,
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('addOnSubscriptionService_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const addOnVerifyPayment = async (data: object) => {
    try {
        let sendData = {
            url: apiEndPoints.addOnVerifyPayment,
            method: "POST",
            data: data,
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('addOnVerifyPayment_error', error);
        return { status: false, message: "Error occured" };
    }
}


export const createScrapPost = async (data: object) => {
    try {
        let append = appendData(data);
        console.log('appendappend', append)
        let sendData = {
            url: apiEndPoints.addVehicleScrapDetails,
            method: "POST",
            data: append,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('addUserVehicle_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const acceptBid = async (data: object) => {
    try {
        let append = appendData(data);
        console.log('appendappend', append)
        let sendData = {
            url: apiEndPoints.acceptBid,
            method: "POST",
            data: append,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('addUserVehicle_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const updatePickupDetail = async (data: object) => {
    try {
        let append = appendData(data);
        console.log('appendappend', append)
        let sendData = {
            url: apiEndPoints.updatePickup,
            method: "POST",
            data: append,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('addUserVehicle_error', error);
        return { status: false, message: "Error occured" };
    }
}

export const scrapCertificate = async (data: object) => {
    try {
        let append = appendData(data);
        console.log('appendappend', append)
        let sendData = {
            url: apiEndPoints.scrapCertificate,
            method: "POST",
            data: append,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        console.log('sendData', sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch (error: any) {
        console.log('addUserVehicle_error', error);
        return { status: false, message: "Error occured" };
    }
}