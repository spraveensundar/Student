import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import ThemeContext from '../../Utilities/themecontext';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { NavigationProp } from '../types';
import RazorpayCheckout from 'react-native-razorpay';
import { constantData, RAZORPAYKEYID } from '../../Common/constant';
import { apiEndPoints } from '../../Common/apiConstants';
import { isEmpty, parseJson, toastFn, useAxios } from '../../Common/commonFunction';
import { useDispatch } from 'react-redux';
import DeviceInfo from "react-native-device-info";
import messaging, { getMessaging, getToken } from "@react-native-firebase/messaging";
import { store } from '../../Store/store';
import { setDeviceinfo } from '../../Common/redux/HelperSlice';
import { createRazorPayOrder, verifyRazorPayment } from '../../Common/axiosHooks/vehicleServiceHooks';
import { getItem, setItem } from '../../Common/localStorage';
import { useLazyUpdateFcmQuery } from '../../Common/redux/userHook';

const useCustomHooks = () => {

    const theme = useContext(ThemeContext);
    const navigation = useNavigation<NavigationProp>();

    return {
        theme,
        navigation,
        initialWindowMetrics,
    };
}

export default useCustomHooks;

interface paymentprops {
    amount?: number | undefined
    _id: string | undefined,
    email?: string | undefined,
    contact?: string | undefined,
    name?: string | undefined,
}

export async function UsePayment({
    amount,
    _id,
    email,
    contact,
    name

}: paymentprops) {
    const payload = {
        subscriptionData: {
            _id: _id
        },
    }

    
    let resp = await createRazorPayOrder(payload);
    console.log('createRazorPayOrder',JSON.stringify(resp?.data, null, 2));
    if (resp?.status) {
        if(resp?.data?._id && resp?.data?.userId){
            return {
                status: true,
                message: resp?.message??"Payment already completed",
                data: resp?.data,
            }
        }
        const { amount, id } = resp?.data
        // let options = {
        //     description: 'Credits towards consultation',
        //     image: require("../../Assets/images/logo.png"),
        //     currency: 'INR',
        //     key: RAZORPAYKEYID,
        //     amount: amount,
        //     name: 'Acme Corp',
        //     order_id: id,
        //     prefill: {
        //         email: email,
        //         contact: contact,
        //         name: name,
        //     },
        //     theme: { color: "#000C51" },
        // };

        let sendData = {
            amount: amount,
            id: id,
            email: email,
            contact: contact,
            name: name,
        };
        let data: any = await RazorPayRender(sendData);
        if (data?.status) {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = data.data;

            console.log(razorpay_payment_id, razorpay_order_id, razorpay_signature, "successresponse");
            const payload = {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature
            }
            console.log(payload, "successresponse");
            try {
                let resp = await verifyRazorPayment(payload);
                console.log("afterveriypayment", resp?.data);
                if (resp?.status) {
                    // toastFn("Payment verified successfully")
                    return {
                        status: true,
                        message: "Payment verified successfully",
                        data: resp?.data,
                    }
                }
                else {
                    // toastFn(resp?.data?.message)
                    return {
                        status: false,
                        message: resp?.message ?? "Try-again",
                    };
                }
            }
            catch (error) {
                console.log(error, 'error while verifypayment');
                return {
                    status: false,
                    message: "Try-again",
                };
            }
        }
        else {
            return data;
        }

        // return await RazorpayCheckout.open(options)
        //     .then(async (data) => {
        //         console.log(data, "DATA");
        //         const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = data

        //         console.log(razorpay_payment_id, razorpay_order_id, razorpay_signature, "successresponse");
        //         const payload = {
        //             razorpay_payment_id,
        //             razorpay_order_id,
        //             razorpay_signature
        //         }
        //         console.log(payload, "successresponse");
        //         try {
        //             let resp = await verifyRazorPayment(payload);
        //             console.log("afterveriypayment", resp?.data);
        //             if (resp?.status) {
        //                 // toastFn("Payment verified successfully")
        //                 return {
        //                     status: true,
        //                     message: "Payment verified successfully",
        //                     data: resp?.data,
        //                 }
        //             }
        //             else {
        //                 // toastFn(resp?.data?.message)
        //                 return {
        //                     status: false,
        //                     message: resp?.message ?? "Try-again",
        //                 };
        //             }
        //         }
        //         catch (error) {
        //             console.log(error, 'error while verifypayment');
        //             return {
        //                 status: false,
        //                 message: "Try-again",
        //             };
        //         }


        //     })
        //     .catch(error => {
        //         console.log(`Error: ${error.code} | ${error.description}`);
        //         console.log('Error: ',error,error?.error)
        //         return {
        //             status: false,
        //             message: error?.error?.description == "undefined"?"Payment cancelled.Try-again":(error?.error?.description??"Try-Again"),
        //         };
        //     });
    }
    else {
        return {
            status: false,
            message: resp?.message ?? "Try-again",
        };
    }
}

interface razorpayrenderprops {
    amount: number
    id: string,
    email?: string | undefined,
    contact?: string | undefined,
    name?: string | undefined,
}

export async function RazorPayRender({
    amount,
    id,
    email,
    contact,
    name,
}: razorpayrenderprops) {
    let options = {
        description: 'Credits towards consultation',
        image: require("../../Assets/images/logo.png"),
        currency: 'INR',
        key: RAZORPAYKEYID,
        amount: amount,
        name: 'Acme Corp',
        order_id: id,
        prefill: {
            email: email,
            contact: contact,
            name: name,
        },
        theme: { color: "#000C51" },
    };
    return await RazorpayCheckout.open(options)
        .then(async (data) => {
            console.log(data, "DATA");
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = data
            return {
                status: true,
                message: "Payment verified",
                data: { razorpay_payment_id, razorpay_order_id, razorpay_signature }
            }
        })
        .catch(error => {
            console.log(`RazorPayRender_Error: ${error.code} | ${error.description}`);
            console.log('Error: ', error, error?.error)
            return {
                status: false,
                message: error?.error?.description == "undefined" ? "Payment cancelled.Try-again" : (error?.error?.description ?? "Try-Again"),
            };
        });
}


export function useGetdeviceinfo(navigationRef: any) {
    
    const dispatch = useDispatch();
    const [trigger, { isLoading }] = useLazyUpdateFcmQuery()
    
    useEffect(() => {
        console.log('getFcmDatauseefeect')
        getdeviceinfo()

        // const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
        //     console.log('remoteMessageremoteMessage',remoteMessage)
        // });

        

        // const inAppClick = messaging().onMessage(async remoteMessage => {
        //     // Optional: show in-app alert
        //     console.log('Foreground message:', remoteMessage.data);
        // });

        // unsubscribe();
        // inAppClick();

        // // return {
        // //     unsubscribe,
        // //     inAppClick
        // // };
    }, [])

    useEffect(() => {

        messaging()
            .getInitialNotification()
            .then((message: any) => {
                console.log('initiallmessagemessage', message);
                let getMessageId = getItem(constantData.viewedNotificationId);
                if (message?.data?.screen && navigationRef && getMessageId != message?.messageId) {
                    navigationRef.current?.navigate(message?.data?.screen, parseJson(message?.data?.params) ?? undefined);
                    setItem(constantData.viewedNotificationId,message?.messageId)
                }
            });

        messaging().onMessage((message) => {
            console.log('messagemessage', message)
        })

        const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('backgroundmessagemessage', remoteMessage)
        });

        return unsubscribe;
    }, [navigationRef]);


    const getdeviceinfo = async () => {
        try{
            let getFcmData = getItem(constantData.fcmData);
            console.log('getdeviceinfodayttaaa',getFcmData)
        const messagingInstance = getMessaging();
        console.log('getdeviceinfomessagingInstance',messagingInstance)
        const fcm = await getToken(messagingInstance);
        console.log('fcmmmmgetdeviceinfo',fcm)
        const deviceid = await DeviceInfo.getUniqueId();
        console.log('getdeviceinfodeviceid',deviceid)
        const devicename = await DeviceInfo.getDeviceName();

        console.log('getdeviceinfodevicename',devicename)
        const currentversion = await DeviceInfo.getVersion();
        console.log('getdeviceinfocurrentversion',currentversion)
        let payload;
        console.log('getFcmDatagetFcmData',getFcmData)
        if (getFcmData?.fcm != fcm) {
            payload = { fcm: fcm, devicename: devicename, deviceid: deviceid, currentversion: Number(currentversion) };
        }
        else {
            payload = getFcmData;
        }
        dispatch(setDeviceinfo(payload));
        setItem(constantData.fcmData, JSON.stringify(payload));
        if (getFcmData?.fcm) {
            let sendData = {
                previousFcmToken: getFcmData?.fcm,
                newFcmToken: payload.fcm,
            }
            let resp = await trigger(sendData);
            console.log('updatefcmresp',resp)
        }
        }
        catch(error){
            console.log('getdeviceinfo_error',error)
        }
    }
    return null
}