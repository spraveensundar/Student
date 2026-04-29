import { createApi } from "@reduxjs/toolkit/query/react";
import { encryptedBaseQuery } from "../Actions/Constants/encryption";
import { ENDPOINTS } from "../Actions/Constants/constant";
import { getQueryParamString } from "../Utilities/helerfunction";

export const chatApi = createApi({
    reducerPath: "chatApi",
    baseQuery: encryptedBaseQuery,
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (payload) => {
                const params = getQueryParamString(payload)
                return {
                    url: `${ENDPOINTS.getMessages}` + params,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }
            }
        }),
        createMessage: builder.mutation({
            query: (payload) => {
                return ({
                    url: `${ENDPOINTS.createMessage}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),
    })
})

export const {
    useLazyGetMessagesQuery,
    useCreateMessageMutation
} = chatApi
