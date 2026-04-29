import { createApi } from "@reduxjs/toolkit/query/react";
import { encryptedBaseQuery } from "../Actions/Constants/encryption";
import { ENDPOINTS } from "../Actions/Constants/constant";
import { getQueryParamString } from "../Utilities/helerfunction";


export const serviceApi = createApi({
    reducerPath: "serviceApi",
    baseQuery: encryptedBaseQuery,
    endpoints: (builder) => ({
        getpendingservice: builder.query({
            query: (payload) => {
                const params = getQueryParamString(payload)
                return {
                    url: `${ENDPOINTS.upcomingbookings}` + params,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            }
        }),
        faceverificationbeforecheck: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.faceCheckBeforeServiceStart}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),
        faceverificationaftercheck: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.faceCheckAfterService}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),
        serviceotpverify: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.serviceotpverify}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isprimary: true
                    }
                })
            }
        }),

        servicerAction: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.servicerAction}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),


        getservicedetail: builder.query({
            query: (payload) => {
                const params = getQueryParamString(payload)
                return {
                    url: `${ENDPOINTS.getServiceDetail}` + params,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            }
        }),

        serviceAddonAction: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.serviceAddonAction}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isprimary: true
                    }
                })
            }
        }),

        serviceAddOnProofUpload: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.serviceAddOnProofUpload}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),


        feedbackRatingToUser: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.feedbackRatingToUser}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isprimary: true
                    }
                })
            }
        }),

        getAllCustomerServices: builder.query({
            query: (payload) => {
                const params = getQueryParamString(payload)

                return {
                    url: `${ENDPOINTS.getAllCustomerServices}` + params,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            }
        }),


        getServicemanNotifications: builder.query({
            query: (payload) => {
                const params = getQueryParamString(payload)

                return {
                    url: `${ENDPOINTS.getServicemanNotifications}` + params,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            }
        }),


        serviceAvailable: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.serviceAvailable}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),

        cancelService: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.cancelService}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isprimary: true
                    }
                })
            }
        }),

        getRecurrences: builder.query({
            query: (payload) => {
                const params = getQueryParamString(payload)
                return {
                    url: `${ENDPOINTS.getRecurrences}` + params,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            }
        }),

        getappdata: builder.query({
            query: (payload) => {
                const params = getQueryParamString(payload)
                return {
                    url: `${ENDPOINTS.getAppData}` + params,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            }
        }),


    })

})

export const {
    useLazyGetpendingserviceQuery,
    useFaceverificationaftercheckMutation,
    useFaceverificationbeforecheckMutation,
    useServiceotpverifyMutation,
    useServicerActionMutation,
    useLazyGetservicedetailQuery,
    useServiceAddonActionMutation,
    useServiceAddOnProofUploadMutation,
    useFeedbackRatingToUserMutation,
    useLazyGetAllCustomerServicesQuery,
    useLazyGetServicemanNotificationsQuery,
    useServiceAvailableMutation,
    useCancelServiceMutation,
    useLazyGetRecurrencesQuery,
    useLazyGetappdataQuery
} = serviceApi