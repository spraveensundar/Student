import { apiEndPoints } from "../apiConstants";
import { appendData, useAxios } from "../commonFunction";




export const createRazorPayOrder = async (data: object) => {
    try{
        let sendData = {
            url: apiEndPoints.razorpaycreateorder,
            method: "POST",
            data: data,
        }
        console.log('sendData',sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('createRazorPayOrder_error',error);
        return { status: false, message: "Error occured" };
    }
}

export const verifyRazorPayment = async (data: object) => {
    try{
        let sendData = {
            url: apiEndPoints.razorpayverifyPayment,
            method: "POST",
            data: data,
        }
        console.log('sendData',sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('verifyRazorPayment_error',error);
        return { status: false, message: "Error occured" };
    }
}

export const deletePackageSubscription = async ( data: object ) => {
    try{
        let sendData = {
            url: apiEndPoints.deleteSubscription,
            method: "POST",
            data: data,
        }
        console.log('deletePackageSubscriptionsendData',sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('deletePackageSubscription_error',error);
        return { status: false, message: "Error occured" };
    }
}

export const oneTimePurchase = async ( data: object ) => {
    try{
        let sendData = {
            url: apiEndPoints.oneTimePurchase,
            method: "POST",
            data: data,
        }
        console.log('oneTimePurchasesendData',sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('oneTimePurchase_error',error);
        return { status: false, message: "Error occured" };
    }
}

export const packageSubscription = async (data: object) => {
    try{
        let sendData = {
            url: apiEndPoints.subscription,
            method: "POST",
            data: data,
        }
        console.log('sendData',sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('packageSubscription_error',error);
        return { status: false, message: "Error occured" };
    }
}

export const cancelSubscriptionFunc = async ( data: object) => {
    try{
        let sendData = {
            url: apiEndPoints.cancelSubscription,
            method: "POST",
            data: data,
        }
        console.log('sendData',sendData)
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('cancelSubscriptionFunc_error',error);
        return { status: false, message: "Error occured" };
    }
}

export const sendServiceChatMessage = async ( data: object) => {
    try{
        let append = appendData(data);
        let sendData = {
            url: apiEndPoints.sendServiceChatMessage,
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
        console.log('sendServiceChatMessage_error',error);
        return { status: false, message: "Error occured" };
    }
}

export const cleanerServiceRatingFeedback = async ( data: object) => {
    try{
        let sendData = {
            url: apiEndPoints.userRatingAndFeedback,
            method: "POST",
            data: data,
        }
        let resp = await useAxios(sendData);
        return resp?.data;
    }
    catch(error: any){
        console.log('cleanerServiceRatingFeedback_error',error);
        return { status: false, message: "Error occured" };
    }
}
