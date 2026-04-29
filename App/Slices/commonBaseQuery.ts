import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { BASE_URL } from "@env";
import { getItem } from "../Actions/Storage/localStorage";

export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers, api) {
        console.log('api', api);
        const token = getItem('token');
        if (token) {
            headers.set('authorization', token);
        }
        return headers;
    }
});

export const commonBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    // if (result?.data) {
    //     result.data = decryptObject((result?.data as any)?.data ?? result?.data);
    // }
    // if (result?.error?.data) {
    //     result.error.data = decryptObject(result?.error?.data);
    // }

    return result;
};