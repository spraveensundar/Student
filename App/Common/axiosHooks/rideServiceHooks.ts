import { apiEndPoints } from "../apiConstants";
import { appendData, useAxios } from "../commonFunction";



export const createRide = async( data: object ) => {
    try{
        let sendData = {
            url: apiEndPoints.createRide,
            method: "POST",
            data: data,
        }
        console.log('sendData',sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('createRide_error',error);
        return { status: false, message: "Error occured" };
    }
}

export const cancelRide = async( data: object ) => {
    try{
        let sendData = {
            url: apiEndPoints.cancelRide,
            method: "POST",
            data: data,
        }
        console.log('sendData',sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('cancelRide_error',error);
        return { status: false, message: "Error occured" };
    }
}

export const rescheduleRide = async( data: object ) => {
    try{
        let sendData = {
            url: apiEndPoints.rescheduleRide,
            method: "POST",
            data: data,
        }
        console.log('sendData',sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('rescheduleRide_error',error);
        return { status: false, message: "Error occured" };
    }
}

export const sendRideChatMessage = async ( data: object) => {
    try{
        let append = appendData(data);
        let sendData = {
            url: apiEndPoints.createRideMessage,
            method: "POST",
            data: append,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        console.log('sendData',sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('sendRideChatMessage_error',error);
        return { status: false, message: "Error occured" };
    }
}

export const ridePaid = async ( data: object) => {
    try{
        let sendData = {
            url: apiEndPoints.createRideMessage,
            method: "POST",
            data: data,
        }
        console.log('sendData',sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('ridePaid_error',error);
        return { status: false, message: "Error occured" };
    }
}
