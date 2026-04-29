import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi } from '@reduxjs/toolkit/query/react';
import { authState, walletState } from "./type";
import { ENDPOINTS } from "../Actions/Constant/constant";
import { getQueryParamString } from "../Utilities/helerfunction";
import { encryptedBaseQuery } from "../Actions/Constant/encryption";


export const initialState: walletState = {
    isloading: false,
    getcurrencies: [],
    currentaccount: "",
    pricedetails: ""
}


const wallet = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        update_getcurrencies: (state, action: PayloadAction<any>) => {
            state.getcurrencies = action.payload;
        },

        update_currentaccount: (state, action: PayloadAction<any>) => {
            state.currentaccount = action.payload;
        },

        update_pricedetails: (state, action: PayloadAction<any>) => {
            state.pricedetails = action.payload;
        },
    },
});

export const {
    update_getcurrencies,
    update_currentaccount,
    update_pricedetails
} = wallet.actions;

export default wallet.reducer;
export const walletSelector = (state: { wallet: walletState }) => state.wallet;

export const walletApi = createApi({
    reducerPath: 'walletapi',
    baseQuery: encryptedBaseQuery,
    endpoints: (builder) => ({

        addbank: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.addbank}`,
                method: 'POST',
                body: payload,

            }),
        }),


        updatebank: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.updatebank}`,
                method: 'POST',
                body: payload,

            }),
        }),

        deletebank: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.deletebank}`,
                method: 'POST',
                body: payload,

            }),
        }),

        getcurrency: builder.query({
            query: () => ({
                url: `${ENDPOINTS.getcurrency}`,
                method: 'GET',
                meta: {
                    isgetsecondary: true
                }
            }),
        }),

        internalfiat: builder.mutation({
            query(payload) {
                const formData = payload;
                console.log(formData, "userrrr")
                return {
                    url: ENDPOINTS.internalfiat,
                    body: formData,
                    formData: true,
                    method: 'POST',
                    meta: {
                        isform: true
                    },
                    redirect: "follow",

                }
            },
        }),


        walletTansfer: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.walletTransfer}`,
                method: 'POST',
                body: payload,

            })
        }),

        withdrawcode: builder.query({
            query: () => ({
                url: `${ENDPOINTS.withdrawcode}`,
                method: 'GET',
                meta: {
                    isgetsecondary: true
                }
            }),
        }),

        withdrawfiat: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.fiatwithdraw}`,
                method: 'POST',
                body: payload,

            })
        }),

        priceconversion: builder.query({
            query: () => ({
                url: `${ENDPOINTS.priceconversion}`,
                method: 'GET',
                meta: {
                    isget: true
                }
            }),
        }),



        transactionhistory: builder.mutation({
            query(payload) {
                const formData = payload;
                console.log(formData, "userrrr")
                return {
                    url: ENDPOINTS.transactionhistory,
                    body: formData,
                    formData: true,
                    method: 'POST',
                    meta: {
                        isform: true
                    },
                    redirect: "follow",

                }
            },
        }),


        getpassbook: builder.mutation({
            query(payload) {
                const formData = payload;
                console.log(formData, "userrrr")
                return {
                    url: ENDPOINTS.getpassbook,
                    body: formData,
                    formData: true,
                    method: 'POST',
                    meta: {
                        isform: true
                    },
                    redirect: "follow",

                }
            },
        }),
      
    })
})


export const {
    useAddbankMutation,
    useDeletebankMutation,
    useUpdatebankMutation,
    useInternalfiatMutation,
    useWalletTansferMutation,
    useLazyGetcurrencyQuery,
    useLazyWithdrawcodeQuery,
    useLazyPriceconversionQuery,
    useWithdrawfiatMutation,
    useTransactionhistoryMutation,
    useGetpassbookMutation
} = walletApi;