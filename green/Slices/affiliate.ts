import { createSlice } from "@reduxjs/toolkit";
import { createApi } from '@reduxjs/toolkit/query/react';

import { affiliateState } from "./type";
import { ENDPOINTS } from "../Actions/Constant/constant";
import { encryptedBaseQuery } from "../Actions/Constant/encryption";
import { getQueryParamString } from "../Utilities/helerfunction";

export const initialState: affiliateState = {
    isloading: false
}

const affiliate = createSlice({
    name: 'affiliate',
    initialState,
    reducers: {

    },
});

export const { } = affiliate.actions;

export default affiliate.reducer;

export const affiliateApi = createApi({
    reducerPath: 'affiliateapi',
    baseQuery: encryptedBaseQuery,
    endpoints: (builder) => ({

        affiliateRegister: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.affiliateRegister}`,
                method: 'POST',
                body: payload
            }),
        }),
        affiliateDetails: builder.query({
            query: (params) => ({
                url: `${ENDPOINTS.affiliateDetails}`,
                method: 'GET',
                params,
                meta: {
                    isget: true
                }
            }),
        }),
        affiliateManageClicks: builder.query({
            query: () => ({
                url: `${ENDPOINTS.manageClicks}`,
                method: 'GET',
                meta: {
                    isgetsecondary: true
                }
            }),
        }),
        affiliateSummary: builder.query({
            query(queryString) {
                console.log(ENDPOINTS.affiliateSummary + queryString)
                return {
                    url: `${ENDPOINTS.affiliateSummary}/${queryString}`,
                    method: 'GET',
                    meta: {
                        isgetsecondary: true
                    }
                }
            },
        }),
        affiliateCommission: builder.query({
            query: () => ({
                url: `${ENDPOINTS.affiliateCommission}`,
                method: 'GET',
                meta: {
                    isgetsecondary: true
                }
            }),
        }),
        affiliateClaimReward: builder.query({
            query: () => ({
                url: `${ENDPOINTS.claimReward}`,
                method: 'GET',
                meta: {
                    isgetsecondary: true
                }
            }),
        }),
    })
})

export const {
    useAffiliateRegisterMutation,
    useLazyAffiliateDetailsQuery,
    useLazyAffiliateSummaryQuery,
    useLazyAffiliateManageClicksQuery,
    useLazyAffiliateCommissionQuery,
    useLazyAffiliateClaimRewardQuery,
} = affiliateApi;