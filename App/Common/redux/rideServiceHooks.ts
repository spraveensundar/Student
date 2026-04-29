
import { apiEndPoints } from "../apiConstants";
import { commonApi } from "./commonApi";




export const vehicleServiceApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({

        getMyRidesList: builder.query({
            query: (data) => {
                console.log('datadata', data)
                return {
                    url: apiEndPoints.getMyRides,
                    method: 'GET',
                    params: data,
                };
            },
        }),
        getRideDetail: builder.query({
            query: (data) => {
                console.log('datadata', data)
                return {
                    url: apiEndPoints.getRideDetail,
                    method: 'GET',
                    params: data,
                };
            },
        }),
        getRideMessages: builder.query({
            query: (data) => {
                console.log('datadata', data)
                return {
                    url: apiEndPoints.getRideMessages,
                    method: 'GET',
                    params: data,
                };
            },
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetMyRidesListQuery,
    useLazyGetMyRidesListQuery,
    useGetRideDetailQuery,
    useLazyGetRideDetailQuery,
    useGetRideMessagesQuery,
    useLazyGetRideMessagesQuery,
} = vehicleServiceApi;

