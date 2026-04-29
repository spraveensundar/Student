import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi } from '@reduxjs/toolkit/query/react';
import { subAccountState } from "./type";
import { ENDPOINTS } from "../Actions/Constant/constant";
import { encryptedBaseQuery } from "../Actions/Constant/encryption";

export const initialState: subAccountState = {
    isloading: false,
    subaccounts: []
}

const subAccount = createSlice({
    name: 'subAccount',
    initialState,
    reducers: {
        setSubaccounts: (state, action: any) => {
            state.subaccounts = action.payload;
        },
    },
});

export const { setSubaccounts } = subAccount.actions;

export default subAccount.reducer;
export const subAccountSelector = (state: { subAccount: subAccountState }) => state.subAccount;

export const subAccountApi = createApi({
    reducerPath: 'subAccounttapi',
    baseQuery: encryptedBaseQuery,
    endpoints: (builder) => ({
        subAccount: builder.query({
            query: () => ({
                url: `${ENDPOINTS.subAccount}`,
                method: 'GET',
                meta: {
                    isgetsecondary: true
                }
            }),
        }),
        subAccountCreate: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.subAccount}`,
                method: 'POST',
                body: payload
            }),
        }),
        subAccountEdit: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.subAccount}`,
                method: 'PUT',
                body: payload
            }),
        }),
        subAccountMargin: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.subAccountMargin}`,
                method: 'PUT',
                body: payload
            }),
        }),
        subAccountPreferences: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.subAccountUpdate}`,
                method: 'POST',
                body: payload
            }),
        }),
        subAccountSwitch: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.subAccountSwitch}`,
                method: 'POST',
                body: payload
            }),
        }),
    })
})

export const {
    useLazySubAccountQuery,
    useSubAccountCreateMutation,
    useSubAccountEditMutation,
    useSubAccountMarginMutation,
    useSubAccountPreferencesMutation,
    useSubAccountSwitchMutation
} = subAccountApi;