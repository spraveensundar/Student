// helper.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { apiResponse, cleaningState, dataofchecklist, getLeaveRequestQparams, getLeaveTypesQparams, getMyEarningsQparams, getNotificationQparams,vechilechecklist } from './types';
import { photosprops } from '../Actions/Types/phototypes';
import { encryptedBaseQuery } from '../Actions/Constants/encryption';
import { ENDPOINTS } from '../Actions/Constants/constant';
import { getItem } from '../Actions/Storage/localStorage';

export const initialState: cleaningState = {
    checklist: dataofchecklist,
    selectedservice: "",
    damage: []
};

interface updatechecklist {
    vechilevalue: photosprops[],
    index: number
}

const cleaning = createSlice({
    name: 'cleaning',
    initialState,
    reducers: {
        update_checklist: (state, action: PayloadAction<updatechecklist>) => {
            const { vechilevalue, index } = action.payload
            const local = [...state.checklist]
            local[index].value = vechilevalue
            state.checklist = local
        },

        setSelectedserivce: (state, action: PayloadAction) => {
            state.selectedservice = action.payload
        },
        setChecklist: (state, action: PayloadAction<vechilechecklist[]>) => {
            state.checklist = action.payload
        },
        update_damage: (state, action: PayloadAction<{ item: any, index: number }>) => {
            const res = [...state.damage]
            res[action.payload.index].photos[0].image = action.payload.item
            state.damage = res
        },
        setDamage: (state, action: PayloadAction<any>) => {
            state.damage = action.payload
        },
    }
});

export const {
    update_checklist,
    setSelectedserivce,
    setChecklist,
    update_damage,
    setDamage

} = cleaning.actions;

export const cleaningSelector = (state: { cleaning: cleaningState }) => state.cleaning;

export default cleaning.reducer;

export const cleaningApi = createApi({
    reducerPath: 'cleaningApi',
    baseQuery: encryptedBaseQuery,
    endpoints: (builder) => ({
        cleaningRegister: builder.mutation<apiResponse, FormData>({
            query: (payload) => {

                console.log('RegisterPayload ==>', payload);
                console.log('RegisterURL ==>', ENDPOINTS.CleaningRegister);

                return ({
                    url: `${ENDPOINTS.CleaningRegister}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),
        aadharVerification: builder.mutation<apiResponse, FormData>({
            query: (payload) => {

                console.log('aadharVerificationPayload ==>', payload);
                console.log('aadharVerificationURL ==>', ENDPOINTS.UploadAadharInfo);

                return ({
                    url: `${ENDPOINTS.UploadAadharInfo}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),
        fetchMyServiceDetails: builder.query({
            query: () => {
                const token = getItem("token");
                console.log("CallTOkenApi==>", token)
                return {
                    url: ENDPOINTS.FetchMyServiceDetails,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    meta: {
                        isget: true
                    }
                };
            },
        }),
        serviceList: builder.query({
            query: (payload) => {
                const token = getItem("token");
                const queryParams = getQueryParamString(payload);
                console.log("CallTOkenApi==>", ENDPOINTS.FetchCustomerServiceList + queryParams)
                return {
                    url: ENDPOINTS.FetchCustomerServiceList + queryParams,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    meta: {
                        isget: true
                    }
                };
            },
        }),
        checkInAndOutAction: builder.mutation<apiResponse, FormData>({
            query: (payload) => {

                console.log('checkInAndOutActionPayload ==>', payload);
                console.log('checkInAndOutActionDetailsURL ==>', ENDPOINTS.CheckInAndOutFunc);

                return ({
                    url: `${ENDPOINTS.CheckInAndOutFunc}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),
        leaveAttendanceDetails: builder.mutation<apiResponse, FormData>({
            query: (payload) => {

                console.log('leaveAttendancePayload ==>', payload);
                console.log('leaveAttendanceDetailsURL ==>', ENDPOINTS.LeaveAttendance);

                return ({
                    url: `${ENDPOINTS.LeaveAttendance}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),
        fetchLeaveTypes: builder.mutation<apiResponse, getLeaveTypesQparams>({
            query: (payload) => {
                const token = getItem("token");
                const queryParams = getQueryParamString(payload);
                console.log("fetchLeaveTypesApi==>", ENDPOINTS.GetLeaveTypes + queryParams)
                return {
                    url: ENDPOINTS.GetLeaveTypes + queryParams,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    meta: {
                        isget: true
                    }
                };
            },
        }),
        leaveRequest: builder.mutation<apiResponse, FormData>({
            query: (payload) => {

                console.log('leaveRequestPayload ==>', payload);
                console.log('leaveRequestURL ==>', ENDPOINTS.RequestLeave);

                return ({
                    url: `${ENDPOINTS.RequestLeave}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),
        fetchLeaveRequest: builder.mutation<apiResponse, getLeaveRequestQparams>({
            query: (payload) => {
                const token = getItem("token");
                const queryParams = getQueryParamString(payload);
                console.log("fetchLeaveTypesApi==>", ENDPOINTS.GetServicemanLeaveRequest + queryParams)
                return {
                    url: ENDPOINTS.GetServicemanLeaveRequest + queryParams,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    meta: {
                        isget: true
                    }
                };
            },
        }),
        editLeaveRequest: builder.mutation<apiResponse, FormData>({
            query: (payload) => {

                console.log('editLeaveRequestPayload ==>', payload);
                console.log('editLeaveRequestURL ==>', ENDPOINTS.EditServicemanLeaveRequest);

                return ({
                    url: `${ENDPOINTS.EditServicemanLeaveRequest}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),
        cancelLeaveRequest: builder.mutation<apiResponse, FormData>({
            query: (payload) => {

                console.log('cancelLeaveRequestPayload ==>', payload);
                console.log('cancelLeaveRequestURL ==>', ENDPOINTS.CancelServicemanLeaveRequest);

                return ({
                    url: `${ENDPOINTS.CancelServicemanLeaveRequest}`,
                    method: 'POST',
                    body: payload,
                    meta: {
                        isform: true
                    }
                })
            }
        }),


        fetchMyEarnings: builder.mutation<apiResponse, getMyEarningsQparams | undefined>({
            query: (payload) => {
                const token = getItem("token");
                const queryParams = getQueryParamString(payload);
                console.log("fetchLeaveTypesApi==>", ENDPOINTS.FetchMyEarnings + queryParams)
                return {
                    url: ENDPOINTS.FetchMyEarnings + queryParams,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    meta: {
                        isget: true
                    }
                };
            },
        }),
        getNotifications: builder.mutation<apiResponse, getNotificationQparams>({
            query: (payload) => {
                const token = getItem("token");
                const queryParams = getQueryParamString(payload);
                console.log("fetchLeaveTypesApi==>", ENDPOINTS.GetNotifications + queryParams)
                return {
                    url: ENDPOINTS.GetNotifications + queryParams,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    meta: {
                        isget: true
                    }
                };
            },
        }),


        getMyEarnings: builder.query({
            query: (payload) => {
                const params = getQueryParamString(payload)

                return {
                    url: `${ENDPOINTS.getMyEarnings}` + params,
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
    useCleaningRegisterMutation,
    useAadharVerificationMutation,
    useFetchMyServiceDetailsQuery,
    useLazyServiceListQuery,
    useCheckInAndOutActionMutation,
    useLeaveAttendanceDetailsMutation,
    useFetchLeaveTypesMutation,
    useLeaveRequestMutation,
    useFetchLeaveRequestMutation,
    useEditLeaveRequestMutation,
    useCancelLeaveRequestMutation,
    useFetchMyEarningsMutation,
    useGetNotificationsMutation,
    useLazyGetMyEarningsQuery
} = cleaningApi;
// function getQueryParamString(payload: any) {
//     throw new Error('Function not implemented.');
// }

export const getQueryParamString = (params: any) => {
    const keys = Object.keys(params);
    return keys.length > 0 ? '?' + keys.map((_) => _ + '=' + params[_]).join('&') : '';
};