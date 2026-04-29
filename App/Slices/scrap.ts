import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';

import { scrapState } from './types';
import { ENDPOINTS } from '../Actions/Constants/constant';
import { encryptedBaseQuery } from '../Actions/Constants/encryption';



export const initialState: scrapState = {
    scrapDetails: {}
};

const scrap = createSlice({
    name: 'scrap',
    initialState,
    reducers: {
        setScrapperDetails: (state, action: PayloadAction) => {
            state.scrapDetails = action.payload
        },
    }
});

export const {
    setScrapperDetails,
} = scrap.actions;

export const scrapSelector = (state: { scrap: scrapState }) => state.scrap;

export default scrap.reducer;

export const scrapApi = createApi({
    reducerPath: 'scrapApi',
    baseQuery: encryptedBaseQuery,
    endpoints: (builder) => ({

        getScrapperDetails: builder.query({
            query: () => {
                return {
                    url: `${ENDPOINTS.ScrapDealerDetails}`,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            }
        }),

        rvsfFileUpdate: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.rvscCertificateUpdate}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),

        scrapperEdit: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.ScrapDealerEdit}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),

        getAllVehicleScraps: builder.query({
            query: (params) => {
                return {
                    url: `${ENDPOINTS.getAllVehicleScraps}?page=${params.page}&limit=${params.limit}`,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            }
        }),

        viewPickupDetails: builder.query({
            query: (params) => {
                console.log(`${ENDPOINTS.viewPickupDetailsToScrapper}?vehicleScrapId=${params}}asfd`)
                return {
                    url: `${ENDPOINTS.viewPickupDetailsToScrapper}?vehicleScrapId=${params}`,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            }
        }),

        viewScrapDetails: builder.query({
            query: (params) => {
                return {
                    url: `${ENDPOINTS.viewScrapDetails}?vehicleScrapId=${params.id}`,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            }
        }),

        viewBidLists: builder.query({
            query: (params) => {
                return {
                    url: `${ENDPOINTS.viewBidLists}?vehicleScrapId=${params.id}&scrapperId=${params.scrappid}&page=${params.page}&limit=${params.limit}`,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            }
        }),

        scrapBidding: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.scrapBidding}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),

        myBidsBookingHistory: builder.query({
            query: (params) => {
                console.log(`${ENDPOINTS.myBidsBookingHistory}?page=${params.page}&limit=${params.limit}type=${params.type}`)
                return {
                    url: `${ENDPOINTS.myBidsBookingHistory}?page=${params.page}&limit=${params.limit}&type=${params.type}`,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            }
        }),

        getMyScrapBids: builder.query({
            query: (params) => {
                return {
                    url: `${ENDPOINTS.getMyScrapBids}?scrapperId=${params.id}`,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            }
        }),

        cancelBid: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.cancelBid}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),

        reschedulePickup: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.reschedulePickup}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),

        startPickup: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.startPickup}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),

        amountPayToAdmin: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.amountPayToAdmin}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),

        scrapRatings: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.scrapRatings}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),


        getMyScrapFeePaymentList: builder.query({
            query: () => {
                return {
                    url: `${ENDPOINTS.getMyScrapFee}`,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            }
        }),


    }),
});

export const {
    useLazyGetScrapperDetailsQuery,
    useRvsfFileUpdateMutation,
    useScrapperEditMutation,
    useLazyGetAllVehicleScrapsQuery,
    useLazyViewPickupDetailsQuery,
    useLazyViewScrapDetailsQuery,
    useLazyViewBidListsQuery,
    useScrapBiddingMutation,
    useLazyMyBidsBookingHistoryQuery,
    useLazyGetMyScrapBidsQuery,
    useCancelBidMutation,
    useReschedulePickupMutation,
    useStartPickupMutation,
    useAmountPayToAdminMutation,
    useScrapRatingsMutation,
    useLazyGetMyScrapFeePaymentListQuery
} = scrapApi;