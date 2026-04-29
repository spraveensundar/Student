import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi } from '@reduxjs/toolkit/query/react';

import { futureState, walletState } from "./type";
import { ENDPOINTS } from "../Actions/Constant/constant";
import { encryptedBaseQuery } from "../Actions/Constant/encryption";
import { getQueryParamString } from "../Utilities/helerfunction";

export const initialState: futureState = {
    isloading: false,
    futurePairData: [],
    futureTradePair: [],
    wallet: {
        walletBalance: 0,
        availableBalance: 0,
        freezeBalance: 0,
        totalMargin: 0,
        totalMaintainMargin: 0,
        unRealizedPnL: 0
    },
    futureTicker: [],
    positionDetails: []

}

const future = createSlice({
    name: 'future',
    initialState,
    reducers: {
        setFuturePairData: (state, action: PayloadAction<any>) => {
            state.futurePairData = action.payload;
        },
        setUserBalance: (state, action: PayloadAction<any>) => {
            state.wallet = action.payload;
        },
        setFutureTicker: (state, action: PayloadAction<any>) => {
            state.futureTicker = action.payload;
        },
        setTradePairData: (state, action: PayloadAction<any>) => {
            state.futureTradePair = action.payload;
        },
        setPositionOrders: (state, action: PayloadAction<any>) => {
            state.positionDetails = action.payload;
        }

    },
});

export const { setFuturePairData, setUserBalance, setFutureTicker, setTradePairData, setPositionOrders } = future.actions;

export default future.reducer;

export const futureSelector = (state: { future: futureState }) => state.future;

export const futureApi = createApi({
    reducerPath: 'futureApi',
    baseQuery: encryptedBaseQuery,
    endpoints: (builder) => ({
        pairDetails: builder.query({
            query: () => ({
                url: `${ENDPOINTS.pairDetails}`,
                method: 'GET',
                meta: {
                    isget: true
                }
            }),
        }),
        availableMargin: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.availableMargin}`,
                method: 'POST',
                body: payload
            }),
        }),

        positionOrders: builder.query({
            query(params) {
                console.log("asdfasdfasdfasdf", params)
                return {
                    url: `${ENDPOINTS.positionOrders}/${params.pairId}/${params.tradeMode}`,
                    method: 'GET',
                    meta: {
                        isgetsecondary: true
                    }
                }
            },
        }),

        addFavouritePair: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.addFavouritePair}`,
                method: 'POST',
                body: payload
            }),
        }),

        futureOrderBook: builder.query({
            query(params) {
                console.log("params", params)
                return {
                    url: `${ENDPOINTS.orderBook}/${params}`,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            },
        }),

        futureRecentTrade: builder.query({
            query(params) {
                console.log("params", params)
                return {
                    url: `${ENDPOINTS.recentTrade}/${params}`,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            },
        }),

        futurefilledHistory: builder.query({
            query(params) {
                console.log("params", params)
                return {
                    url: `${ENDPOINTS.filledHistory}/${params.pairId}/${params.tradeMode}?page=${params.page}&limit=${params.limit}`,
                    method: 'GET',
                    meta: {
                        isgetsecondary: true
                    }
                }
            },
        }),

        futureOrderHistory: builder.query({
            query(params) {
                console.log("params", params)
                return {
                    url: `${ENDPOINTS.orderHistory}/${params.pairId}/${params.tradeMode}?page=${params.page}&limit=${params.limit}`,
                    method: 'GET',
                    meta: {
                        isgetsecondary: true
                    }
                }
            },
        }),

        futureCloseOrder: builder.query({
            query(params) {
                console.log("params", params)
                return {
                    url: `${ENDPOINTS.futureClosedOrders}/${params.pairId}/${params.tradeMode}?page=${params.page}&limit=${params.limit}`,
                    method: 'GET',
                    meta: {
                        isgetsecondary: true
                    }
                }
            },
        }),


        futureOpenOrders: builder.query({
            query(params) {
                console.log("params", params)
                return {
                    url: `${ENDPOINTS.futureOpenOrders}/${params.pairId}/${params.tradeMode}?page=${params.page}&limit=${params.limit}`,
                    method: 'GET',
                    meta: {
                        isgetsecondary: true
                    }
                }
            },
        }),

        stopOrders: builder.query({
            query(params) {
                console.log("params", params)
                return {
                    url: `${ENDPOINTS.stopOrders}/${params.pairId}/${params.tradeMode}?page=${params.page}&limit=${params.limit}`,
                    method: 'GET',
                    meta: {
                        isgetsecondary: true
                    }
                }
            },
        }),


        updateBracket: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.updateBracket}`,
                method: 'POST',
                body: payload
            }),
        }),

        deleteBracket: builder.mutation({
            query: (data) => ({
                url: `${ENDPOINTS.updateBracket}`,
                method: 'DELETE',
                body: data
            }),
        }),

        futureOrderPlacing: builder.mutation({
            query(payload) {
                return {
                    url: ENDPOINTS.orderPlaceing,
                    body: payload,
                    method: 'POST'
                }
            },
        }),


        futureLeverage: builder.mutation({
            query(payload) {
                console.log("payload", payload)
                return {
                    url: ENDPOINTS.leverage,
                    body: payload,
                    method: 'POST'
                }
            },
        }),

        futureCloseOrders: builder.mutation({
            query(payload) {
                console.log("payload", payload)
                return {
                    url: ENDPOINTS.futureClose,
                    body: payload,
                    method: 'POST'
                }
            }
        }),

        removeBracket: builder.query({
            query(orderId) {
                console.log("params", orderId)
                return {
                    url: `${ENDPOINTS.removeBracket}/${orderId}`,
                    method: 'GET',
                    meta: {
                        isgetsecondary: true
                    }
                }
            },
        }),

        cancelBracket: builder.query({
            query(orderId) {
                console.log("params", orderId)
                return {
                    url: `${ENDPOINTS.cancelOrder}/${orderId}`,
                    method: 'GET',
                    meta: {
                        isgetsecondary: true
                    }
                }
            },
        }),


        editOpenOrders: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.editOpenOrder}`,
                method: 'POST',
                body: payload
            }),
        }),

    })
})


export const {
    useLazyPairDetailsQuery,
    useAvailableMarginMutation,
    useLazyPositionOrdersQuery,
    useAddFavouritePairMutation,
    useLazyFutureOrderBookQuery,
    useLazyFutureRecentTradeQuery,
    useLazyFuturefilledHistoryQuery,
    useLazyFutureOrderHistoryQuery,
    useUpdateBracketMutation,
    useDeleteBracketMutation,
    useFutureOrderPlacingMutation,
    useFutureLeverageMutation,
    useFutureCloseOrdersMutation,
    useLazyFutureCloseOrderQuery,
    useLazyFutureOpenOrdersQuery,
    useLazyRemoveBracketQuery,
    useLazyCancelBracketQuery,
    useEditOpenOrdersMutation,
    useLazyStopOrdersQuery,

} = futureApi;