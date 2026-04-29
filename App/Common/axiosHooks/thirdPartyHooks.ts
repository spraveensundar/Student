import { apiEndPoints } from "../apiConstants";
import { externalAxios } from "../commonFunction";
import config from "../config";


export const googleMapAutoComplete = async (searchText: string) => {
    try{
        
        let data = {
            input: searchText,
            key: config.GOOGLE_API_KEY,
            components: "country:in",
        }
        console.log('appendappend',data)
        let sendData = {
            url: apiEndPoints.googleMapAutoComplete,
            method: "GET",
            params: data,
        }
        console.log('sendData',sendData)
        let resp = await externalAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('googleMapAutoComplete_error',error);
        return { status: false, message: "Error occured" };
    }
}

export const googleMapPlaceIdFetch = async (placeId: string) => {
    try{
        
        let data = {
            place_id: placeId,
            key: config.GOOGLE_API_KEY,
        }
        console.log('appendappend',data)
        let sendData = {
            url: apiEndPoints.googleMapPlaceIdFetch,
            method: "GET",
            params: data,
        }
        console.log('sendData',sendData,apiEndPoints.googleMapPlaceIdFetch)
        let resp = await externalAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('googleMapPlaceIdFetch_error',error);
        return { status: false, message: "Error occured" };
    }
}

export const googleMapLatLngDetail = async (latitude: string, longitude: string) => {
    try{
        
        let data = {
            latlng: `${latitude},${longitude}`,
            key: config.GOOGLE_API_KEY,
        }
        console.log('appendappend',data)
        let sendData = {
            url: apiEndPoints.googleMapLatLngDetailFetch,
            method: "GET",
            params: data,
        }
        console.log('sendData',sendData)
        let resp = await externalAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('googleMapLatLngDetail_error',error);
        return { status: false, message: "Error occured" };
    }
}

export const googleMapManualAddressDetail = async (address: string) => {
    try{
        let data = {
            address: address,
            key: config.GOOGLE_API_KEY,
        }
        console.log('appendappend',data)
        let sendData = {
            url: apiEndPoints.googleMapLatLngDetailFetch,
            method: "GET",
            params: data,
        }
        console.log('sendData',sendData)
        let resp = await externalAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('googleMapLatLngDetail_error',error);
        return { status: false, message: "Error occured" };
    }
}

