
import { apiEndPoints } from "../apiConstants";
import { commonApi } from "./commonApi";




export const vehicleServiceApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({

        getVehicleTypeList: builder.query({
            query: (data) => {
                console.log('datadata', data)
                return {
                    url: apiEndPoints.getVehicleType,
                    method: 'GET',
                    params: data,
                };
            },
        }),
        getBrandsList: builder.query({
            query: (data) => {
                console.log('datadata', data)
                return {
                    url: apiEndPoints.getBrands,
                    method: 'GET',
                    params: data,
                };
            },
        }),
        getBrandsVehicleList: builder.query({
            query: (data) => {
                console.log('datadata', data)
                return {
                    url: apiEndPoints.getBrandsVehicle,
                    method: 'GET',
                    params: data,
                };
            },
        }),
        getPackageList: builder.query({
            query: (data) => {
                console.log('datadata', data)
                return {
                    url: apiEndPoints.getPackages,
                    method: 'GET',
                    params: data,
                };
            },
        }),
        getPackageDetail: builder.query({
            query: (data) => {
                console.log('datadata', data)
                return {
                    url: apiEndPoints.getPackageDetail,
                    method: 'GET',
                    params: data,
                };
            },
        }),
        getPlansList: builder.query({
            query: (data) => {
                console.log('datadata', data)
                return {
                    url: apiEndPoints.getPlans,
                    method: 'GET',
                    params: data,
                };
            },
        }),
        getTimeSlotsList: builder.query({
            query: (data) => {
                return {
                    url: apiEndPoints.getTimeSlots,
                    method: "GET",
                    params: data,
                }
            }
        }),
        getMySubscriptionPackagesList: builder.query({
            query: (data) => {
                return {
                    url: apiEndPoints.getMySubscriptionPackages,
                    method: "GET",
                    params: data,
                }
            }
        }),
        getMySubscriptionDetail: builder.query({
            query: (data) => {
                return {
                    url: apiEndPoints.getMySubscriptionDetail,
                    method: "GET",
                    params: data,
                }
            }
        }),
        getMySubscriptionServiceForCalendar: builder.query({
            query: (data) => {
                return {
                    url: apiEndPoints.getMySubscriptionServiceForCalendar,
                    method: "GET",
                    params: data,
                }
            }
        }),
        getMySubscriptionServiceDetail: builder.query({
            query: (data) => {
                return {
                    url: apiEndPoints.getMySubscriptionServiceDetail,
                    method: "GET",
                    params: data,
                }
            }
        }),
        getServiceChatMessages: builder.query({
            query: (data) => {
                return {
                    url: apiEndPoints.getServiceChatMessages,
                    method: "GET",
                    params: data,
                }
            }
        }),
        getAddOnServices: builder.query({
            query: (data) => {
                return {
                    url: apiEndPoints.getAddOnServices,
                    method: "GET",
                    params: data,
                }
            }
        }),
        getMyService: builder.query({
            query: (data) => {
                return {
                    url: apiEndPoints.getMyService,
                    method: "GET",
                    params: data,
                }
            }
        }),
        getAssignedServiceMan: builder.query({
            query: (data) => {
                return {
                    url: apiEndPoints.getAssignedServiceMan,
                    method: "GET",
                    params: data,
                }
            }
        }),
        getFeedbackAndRatings: builder.query({
            query: (data) => {
                return {
                    url: apiEndPoints.getServiceFeedbackAndRatings,
                    method: "GET",
                    params: data,
                }
            }
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetVehicleTypeListQuery,
    useGetBrandsListQuery,
    useGetBrandsVehicleListQuery,
    useGetPackageListQuery,
    useGetPackageDetailQuery,
    useGetPlansListQuery,
    useGetTimeSlotsListQuery,
    useGetMySubscriptionPackagesListQuery,
    useLazyGetMySubscriptionPackagesListQuery,
    useGetMySubscriptionDetailQuery,
    useGetMySubscriptionServiceForCalendarQuery,
    useGetMySubscriptionServiceDetailQuery,
    useGetServiceChatMessagesQuery,
    useLazyGetServiceChatMessagesQuery,
    useGetAddOnServicesQuery,
    useGetMyServiceQuery,
    useLazyGetMyServiceQuery,
    useGetAssignedServiceManQuery,
    useLazyGetAssignedServiceManQuery,
    useGetFeedbackAndRatingsQuery,
    useLazyGetFeedbackAndRatingsQuery,
} = vehicleServiceApi;

