import { useContext, useEffect, useRef, useState } from 'react';
import { BottomSheetModal, useGestureEventsHandlersDefault } from '@gorhom/bottom-sheet';
import ThemeContext from '../../Utilities/themecontext';
import { useDispatch, useSelector } from 'react-redux';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import Clipboard from '@react-native-clipboard/clipboard';
import { Toastfn } from '../../Utilities/helerfunction';
import { Alert, AppState, BackHandler } from 'react-native';
import { setAffiliateData, SetDeviceinfo, setUserData, useLazyUserDetailsQuery } from '../../Slices/auth';
import DeviceInfo from "react-native-device-info";
import PushNotification from 'react-native-push-notification';
import messaging from "@react-native-firebase/messaging";
import { destroyStorage, getItem, setItem } from '../Storage/localstorage';
import { update_currentaccount, update_getcurrencies, update_pricedetails, useLazyGetcurrencyQuery, useLazyPriceconversionQuery, walletSelector } from '../../Slices/wallet';
import { setSubaccounts, useLazySubAccountQuery } from '../../Slices/subAccount';
import { useLazyAffiliateDetailsQuery } from '../../Slices/affiliate';
import { setFuturePairData, setFutureTicker, setPositionOrders, setTradePairData, setUserBalance, useAvailableMarginMutation, useLazyPairDetailsQuery, useLazyPositionOrdersQuery } from '../../Slices/future';
import { isEmpty } from 'lodash';
const useCustomHooks = () => {
    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const bottomsheetref = useRef<BottomSheetModal>(null);
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();

    const openbottomsheet = (ref: React.RefObject<BottomSheetModal | null>) => {
        ref?.current?.present();
    };
    const closebottomsheet = (ref: React.RefObject<BottomSheetModal | null>) => {
        ref?.current?.close();
    };

    const successtoast = (title?: any, des?: any, duration?: number) => {
        showMessage({
            message: title,
            description: des,
            duration: duration ?? 2000,
            type: "success",
        });
    };

    const failuretoast = (title?: any, des?: any, duration?: number) => {
        showMessage({
            message: title,
            description: des,
            duration: duration ?? 2000,
            type: "danger",
            animated: true,
        });
    };


    const copyData = (data: any) => {
        Clipboard?.setString(data);
        Toastfn("Copied Successfully");
    };

    const cleardata = () => {
        destroyStorage()
        navigation.navigate("Login")
    }


    const { pricedetails } = useSelector(walletSelector)

    const convert = (amount: string | number = 0, pair: string = "USDINR") => {
        if (pricedetails?.length) {
            const findPair = pricedetails.find((e: any) => e?.pair === pair);
            const calculated = Number(findPair?.price) * Number(amount);
            return parseFloat(calculated.toFixed(2));
        }
        return amount;
    };

    return {
        theme,
        dispatch,
        navigation,
        isFocused,
        bottomsheetref,
        openbottomsheet,
        closebottomsheet,
        initialWindowMetrics,
        successtoast,
        failuretoast,
        copyData,
        cleardata,
        convert
    };
};

export default useCustomHooks;




export function Deviceinfo() {
    return async (dispatch?: any) => {
        try {
            console.log("enterssssssssssssssss");
            const fcmtoken = await messaging().getToken();
            const deviceId = await DeviceInfo.getUniqueId();
            const deviceName = await DeviceInfo.getDeviceName();
            const payload = { fcmtoken, deviceId, deviceName };
            dispatch(SetDeviceinfo(payload));
        } catch (error) { }
    };
}



interface Hardwarebackpress {
    title?: string,
    des?: string,
    yesfn?: () => void
}


export const useHardwareBackPress = ({
    title,
    des,
    yesfn

}: Hardwarebackpress) => {
    const isfouced = useIsFocused()
    useEffect(() => {
        const onBackPress = () => {
            if (title) {
                Alert.alert(`${title}`, `${des}`, [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    {
                        text: 'YES',
                        onPress: yesfn,
                    },
                ]);
                return true;

            }
            else {
                yesfn?.()
                return true;

            }
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => backHandler.remove();
    }, [title, des, yesfn, isfouced]);
};




export const localnotification = (params?: any) => {


    PushNotification.createChannel(
        {
            channelId: "specialid", // (required)
            channelName: "Special messasge", // (required)
            channelDescription: "Notification for special message", // (optional) default: undefined.
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created?: any) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

    PushNotification.localNotification({
        importance: 'high',
        channelId: 'specialid',
        title: params.title,
        message: params.message,
    })

}


export const useIsForeground = () => {
    const [isForeground, setIsForeground] = useState<boolean>(true)

    useEffect(() => {
        const onChange = (state?: string) => {
            setIsForeground(state === 'active')
        }
        const listener = AppState.addEventListener('change', onChange)
        return () => listener.remove()
    }, [setIsForeground])

    return isForeground
}


interface commonalert {
    title: string,
    des: string,
    yes: () => void
}

export const Commonalert = ({
    title = "Alert!",
    des = "Alert for this",
    yes
}: commonalert) => {
    Alert.alert(`${title}`, `${des}`, [
        {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
        },
        {
            text: 'YES',
            onPress: yes,
        },
    ]);
}




export const useApihooks = () => {
    const dispatch = useDispatch();
    const { positionDetails, wallet } = useSelector((state: any) => state.future);
    const { marginMode } = useSelector((state: any) => state.auth.userData);


    const [getcurrency, { data: currency }] = useLazyGetcurrencyQuery()
    const [priceconversion, { data: price }] = useLazyPriceconversionQuery()
    const [subAccount] = useLazySubAccountQuery()
    const [userDetails] = useLazyUserDetailsQuery();
    const [affiliateDetails] = useLazyAffiliateDetailsQuery();
    const [pairDetails] = useLazyPairDetailsQuery();
    const [positionOrders] = useLazyPositionOrdersQuery();
    const [futureAvailableMargin] = useAvailableMarginMutation();

    const PositionDetails = useRef(positionDetails);
    const userWalletDetails = useRef(wallet);


    useEffect(() => {
        if (currency) {
            dispatch(update_getcurrencies(currency?.result?.data))
        }
    }, [currency])


    useEffect(() => {
        if (price) {
            dispatch(update_pricedetails(price?.result?.data))
        }
    }, [price])



    const Fetchcurrencies = () => {
        getcurrency(true)
        priceconversion(true)
    }

    const triggeruserdetails = async () => {
        const res = await userDetails(true)
        dispatch(setUserData(res?.data.result?.data))
        setItem("secretkey", res?.data?.result?.data?.secretKey)

    }

    const triggeraffiliate = async () => {
        const res = await affiliateDetails({ range: '1W' })
        dispatch(setAffiliateData(res?.data?.result))
    }

    const triggerswitchaccount = async () => {
        const res = await userDetails(true)
        const subres = await subAccount(true)
        const currentid = res?.data?.result?.data?.accountId
        const findacc = subres?.data?.result?.find((e: any) => e?.accountId == currentid)
        console.log("SELECTDACCOUBR", findacc);
        dispatch(update_currentaccount(findacc))
    }

    const Fetchsubaccounts = async () => {
        const subres = await subAccount(true)
        dispatch(setSubaccounts(subres?.data?.result))
    }


    const triggerPairDetails = async () => {
        const res = await pairDetails(true)
        const pairDetail = res?.data?.result?.data.filter((val: any) => { return val.status == 'active' });
        const result = getItem("futurespair")
        const pairToken = result ?? res?.data?.result?.data[0].tickerRoot;
        dispatch(setFuturePairData(pairDetail));
        if (pairDetail) {
            if (isEmpty(pairDetail)) return;
            let currency: any = pairToken;
            let pairDet = pairDetail.find((val: any) => val.tickerRoot === currency);
            if (!pairDet) {
                currency = pairDetail[0].tickerRoot;
                pairDet = pairDetail[0];
                setItem("futurespair", currency);
            }
            dispatch(setTradePairData(pairDet));
            dispatch(setFutureTicker(pairDet));
        }
    }


    const triggerAvailableMargin = async () => {
        const payload = {
            convertCurrency: "USDT",
        };
        const data = await futureAvailableMargin(payload).unwrap();
        console.log(data?.result, "datatata")
        dispatch(setUserBalance(data?.result));
    };


    const triggerpositionOrders = async () => {
        const params = {
            'pairId': 'all',
            'tradeMode': 'all'
        }
        const res = await positionOrders(params);
        console.log(res?.data?.result, "posaslkfjkasjfd")
        dispatch(setPositionOrders(res?.data?.result));
    }

    // const ArrangePositionOrder = (result: any) => {
    //     try {
    //         if (PositionDetails.current.length > 0) {
    //             let PositionData = [...PositionDetails.current]
    //             let index = PositionData.findIndex((el => el.pairName == result.tickerRoot))
    //             if (index != -1) {
    //                 let positionOrder = { ...PositionData[index] }
    //                 positionOrder['close_price'] = result.marketPrice
    //                 const { profit, percentage } = getPorfitCalculation(positionOrder?.entryPrice, positionOrder.close_price, positionOrder.positionFilled, positionOrder.positionSide)
    //                 positionOrder['pnl'] = profit
    //                 positionOrder['pnl_percen'] = percentage
    //                 PositionData[index] = positionOrder
    //                 dispatch(setPositionOrders(PositionData))
    //                 CalculateunRealizedPnL(PositionData)
    //             }
    //         }
    //     } catch (err) {
    //         console.log(err, 'ArrangePositionOrder__err')
    //     }
    // }

    // const CalculateunRealizedPnL = (PositionDetails: any) => {
    //     try {
    //         let unRealizedPnL = PositionDetails.reduce((UPNL: number, val: any) => {
    //             return UPNL + parseFloat(val.pnl)
    //         }, 0)
    //         console.log(unRealizedPnL, "CalculateunRealizedPnL")
    //         let wallet = { ...userWalletDetails.current }
    //         wallet.unRealizedPnL = parseFloat(unRealizedPnL)
    //         wallet.tradingBalance = parseFloat(wallet.walletBalance) + parseFloat(unRealizedPnL)
    //         if (marginMode == 'cross') {
    //             wallet.availableBalance = (wallet.walletBalance + wallet.unRealizedPnL) - (wallet.freezeBalance);
    //         }
    //         dispatch(setUserBalance({ wallet: wallet }))
    //     } catch (err) {
    //         console.log(err, "CalculateunRealizedPnL___err")
    //     }
    // }

    // useEffect(() => {
    //     PositionDetails.current = positionDetails
    // }, [positionDetails])


    return {
        Fetchcurrencies,
        triggeruserdetails,
        triggerswitchaccount,
        triggeraffiliate,
        Fetchsubaccounts,
        triggerPairDetails,
        triggerpositionOrders,
        triggerAvailableMargin,
    }

}


export const Fetchcurrencies = (effect: any) => {
    const dispatch = useDispatch()
    const [getcurrency, { data: currency }] = useLazyGetcurrencyQuery()
    const [priceconversion, { data: price }] = useLazyPriceconversionQuery()

    console.log("PRICECONVERSION", price);

    useEffect(() => {
        getcurrency(true)
        priceconversion(true)
    }, [effect])

    useEffect(() => {
        if (currency) {
            dispatch(update_getcurrencies(currency?.result?.data))
        }
    }, [currency])


    useEffect(() => {
        if (price) {
            dispatch(update_pricedetails(price?.result?.data))
        }
    }, [price])

    return null
}



export const Switchaccounts = (effect: any) => {
    const [subAccount, { data: suacc }] = useLazySubAccountQuery()
    const [userDetails, { data: profile }] = useLazyUserDetailsQuery();
    const dispatch = useDispatch()
    useEffect(() => {
        subAccount(true)
        userDetails(true)
    }, [effect])

    useEffect(() => {
        if (profile && suacc) {
            console.log(profile, "PROFILE");
            console.log(suacc, "SUBACCC");
            const currentid = profile?.result?.data?.accountId
            const findacc = suacc?.result?.find((e: any) => e?.accountId == currentid)
            console.log("SELECTDACCOUBR", findacc);
            dispatch(update_currentaccount(findacc))
        }
    }, [profile, suacc])

}


export const Priceconversion = (
    amount: string | number = 0,
    pair: string = "USDINR",
) => {

    const { pricedetails } = useSelector(walletSelector)

    const convert = (amount: string | number = 0, pair: string = "USDINR") => {
        if (pricedetails?.length) {
            const findPair = pricedetails.find((e: any) => e?.pair === pair);
            const calculated = Number(findPair?.price) * Number(amount);
            return parseFloat(calculated.toFixed(2));
        }
        return amount;
    };
    return { convert }
}


export const capitalizeFirst = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};
