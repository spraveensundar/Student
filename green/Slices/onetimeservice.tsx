import { createApi } from "@reduxjs/toolkit/query/react";
import { encryptedBaseQuery } from "../Actions/Constants/encryption";
import { ENDPOINTS } from "../Actions/Constants/constant";
import { getQueryParamString } from "../Utilities/helerfunction";


export const onetimeserviceApi = createApi({
    reducerPath: "onetimeserviceApi",
    baseQuery: encryptedBaseQuery,
    endpoints: (builder) => ({
        servicemanAcceptService: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.servicemanAcceptService}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isprimary: true
                    }
                })
            }
        }),

        servicemanRejectService: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.servicemanRejectService}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isprimary: true
                    }
                })
            }
        }),
    })
});

export const {
    useServicemanAcceptServiceMutation,
    useServicemanRejectServiceMutation
} = onetimeserviceApi
