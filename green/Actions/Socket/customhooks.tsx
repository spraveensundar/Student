import { useCallback, useEffect, useRef } from "react"
import useSocket from "./sockethook"
import useCustomHooks from "../Hooks/customhook"
import { BASEURL, SOCKETURL } from "../Constant/constant"
import { useDispatch, useSelector } from "react-redux"
import { futureSelector, setFuturePairData, setFutureTicker, setPositionOrders, setUserBalance } from "../../Slices/future"
import { getItem } from "../Storage/localstorage"
import { store } from "../../Slices"
import { authSelector } from "../../Slices/auth"


export const socketevents = {
    forcelogout: "FORCE_LOGOUT",
    createroom: "CREATE_ROOM",
    priceconversion: "PRICE_CONVERSION_LIST"
}

// export const Globalsockethook = () => {

//     const { navigation, cleardata, failuretoast, dispatch } = useCustomHooks()
//     const isMountedRef = useRef(true);
//     const { futurePairData } = useSelector(futureSelector)
//     const events: any = {
//         "FORCE_LOGOUT": useCallback(() => {
//             navigation.navigate("Login")
//             cleardata
//             failuretoast("Expired!", "Your seesson has expired!")
//         }, []),
//         "FututresPrice": useCallback((data: any) => {
//             let temmp = [...futurePairData]
//             let pairindex = temmp?.findIndex((e: any) => e?.tickerRoot == data?.tickerRoot)

//             if (pairindex !== -1) {
//                 temmp[pairindex] = { ...temmp[pairindex], ...data };
//                 dispatch(setFuturePairData(temmp))
//             }

//             const result: any = getItem("futurespair")
//             console.log(result,"ressssssssssssss");
            
//             if (result == data?.tickerRoot) {
//                 dispatch(setFutureTicker(data));
//             }

//         }, [dispatch, futurePairData])
//     }
//     const { isConnected, } = useSocket({
//         events: events,
//         autoConnect: true,
//         url: SOCKETURL
//     })



//     return { isConnected }

// }



export const Globalsockethook = () => {
    const { navigation, cleardata, failuretoast,  } = useCustomHooks()
    const isMountedRef = useRef(true);
    const { futurePairData,positionDetails,wallet } = useSelector(futureSelector)
    const dispatch = useDispatch()
    // Use refs to avoid dependency changes
    const futurePairDataRef = useRef<any>(futurePairData);
    const dispatchRef = useRef<any>(dispatch);

    // Update refs when dependencies change
    useEffect(() => {
        futurePairDataRef.current = futurePairData;
    }, [futurePairData]);

    useEffect(() => {
        dispatchRef.current = dispatch;
    }, [dispatch]);

    // Debounce implementation
    const useDebounce = (callback: Function, delay: number) => {
        const timeoutRef = useRef<NodeJS.Timeout>(null);

        return useCallback((...args: any[]) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        }, [callback, delay]);
    };

    const events: any = {
        "FORCE_LOGOUT": useCallback(() => {
            if (!isMountedRef.current) return;
            navigation.navigate("Login")
            cleardata()
            failuretoast("Expired!", "Your session has expired!")
        }, [navigation, cleardata, failuretoast]),

        "FututresPrice": useDebounce((data: any) => {            
            if (!isMountedRef.current) return;
            const currentFutureData = futurePairDataRef.current;
            let temp = [...currentFutureData];
            let pairIndex = temp?.findIndex((e: any) => e?.tickerRoot == data?.tickerRoot);

            if (pairIndex !== -1) {
                // Only update if data actually changed
                if (JSON.stringify(temp[pairIndex]) !== JSON.stringify({ ...temp[pairIndex], ...data })) {
                    temp[pairIndex] = { ...temp[pairIndex], ...data };
                    dispatchRef.current(setFuturePairData(temp));
                    ArrangePositionOrder(data)

                }
            }

            const result: any = getItem("futurespair");
            if (result == data?.tickerRoot) {
                dispatchRef.current(setFutureTicker(data));
            }
        }, 500) 
    }

    const { isConnected } = useSocket({
        events: events,
        autoConnect: true,
        url: SOCKETURL
    })

    // Cleanup
    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

   
   const PositionDetails = useRef(positionDetails?.data)
    const ArrangePositionOrder = (result:any) => {
        console.log(PositionDetails.current,"PositionDetailsPositionDetailsPositionDetails");
        
        try {
                 if (PositionDetails.current.length > 0) {
                let PositionData = [...PositionDetails.current]
                let index = PositionData.findIndex((el => el.pairName == result.tickerRoot))
                // console.log(index, 'ArrangePositionOrder')
                if (index != -1) {
                    let positionOrder = { ...PositionData[index] }
                    // console.log(index, 'ArrangePositionOrder', positionOrder)
                    positionOrder['close_price'] = result.marketPrice
                    const { profit, percentage } = getPorfitCalculation(positionOrder?.entryPrice, positionOrder.close_price, positionOrder.positionFilled, positionOrder.positionSide)
                    positionOrder['pnl'] = profit
                    positionOrder['pnl_percen'] = percentage
                    PositionData[index] = positionOrder
                    console.log(PositionData,"aftercalculationssssssssss");
                    
                    dispatch(setPositionOrders({ positionDetails: PositionData }))
                    CalculateunRealizedPnL(PositionData)
                }
            }
        } catch (err) {
            console.log(err, 'ArrangePositionOrder__err')
        }        
    }
   const {userData} = useSelector(authSelector)
   const userdetails = useRef(userData)
   const userWalletDetails = useRef(wallet)
    const CalculateunRealizedPnL = (PositionDetails:any) => {
        try {
         
            let unRealizedPnL = PositionDetails.reduce((UPNL:any = 0, val:any) => {
                UPNL = parseFloat(UPNL) + parseFloat(val.pnl)
                return UPNL
            }, 0)
            console.log(unRealizedPnL, "CalculateunRealizedPnL")
            let wallet = { ...userWalletDetails.current }
            wallet.unRealizedPnL = parseFloat(unRealizedPnL)
            wallet.tradingBalance = parseFloat(wallet.walletBalance) + parseFloat(unRealizedPnL)
            if (userdetails.current.marginMode == 'cross') {
                wallet.availableBalance = (wallet.walletBalance + wallet.unRealizedPnL) - (wallet.freezeBalance);
            }
            dispatch(setUserBalance({ wallet: wallet }))
        } catch (err) {
            console.log(err, "CalculateunRealizedPnL___err")
        }
    }
    return { isConnected }
}





    export const getPorfitCalculation = (entryPrice:any, closePrice:any, quantity:any, positionSide:any) => {
    try {
        let profit = 0
        let percentage = 0
        if (positionSide == 'short') {
            profit = (parseFloat(entryPrice) - parseFloat(closePrice)) * quantity
            percentage = (parseFloat(entryPrice) - parseFloat(closePrice)) / entryPrice
        } else {
            profit = (parseFloat(closePrice) - parseFloat(entryPrice)) * quantity
            percentage = (parseFloat(closePrice) - parseFloat(entryPrice)) / entryPrice
        }
        return { profit: profit, percentage: percentage }
    } catch (err) {
        console.log("getPorfitCalculation_err", err)
        return { profit: 0, percentage: 0 }
    }
}


    


// export const Useorderbooksockets = () => {

//     const { navigation, cleardata, failuretoast, dispatch } = useCustomHooks()
//     const isMountedRef = useRef(true);
//     const { futurePairData } = useSelector(futureSelector)
//     const events: any = {
//         "FORCE_LOGOUT": useCallback(() => {
//             navigation.navigate("Login")
//             cleardata
//             failuretoast("Expired!", "Your seesson has expired!")
//         }, []),
//         "FututresPrice": useCallback((data: any) => {            
//             let temmp = [...futurePairData]
//             let pairindex = temmp?.findIndex((e: any) => e?.tickerRoot == data?.tickerRoot)

//             if (pairindex !== -1) {
//                 temmp[pairindex] = { ...temmp[pairindex], ...data };
//                 dispatch(setFuturePairData(temmp))
//             }

//             const result: any = getItem("futurespair")
//             console.log(result,"ressssssssssssss");
            
//             if (result == data?.tickerRoot) {
//                 dispatch(setFutureTicker(data));
//             }

//         }, [dispatch, futurePairData])
//     }
//     const { isConnected, } = useSocket({
//         events: events,
//         autoConnect: true,
//         url: SOCKETURL
//     })



//     return { isConnected }

// }