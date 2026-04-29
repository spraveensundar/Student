import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi } from '@reduxjs/toolkit/query/react';
import { authState } from "./type";
import { ENDPOINTS } from "../Actions/Constant/constant";
import { getQueryParamString } from "../Utilities/helerfunction";
import { encryptedBaseQuery } from "../Actions/Constant/encryption";



export const initialState: authState = {
    authToken: "",
    userData: {},
    deviceinfo: {
        fcmtoken: "",
        deviceId: "",
        deviceName: "",
    },
    affiliateData: {}

}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action: any) => {
            state.userData = action.payload;
        },
        SetDeviceinfo: (state, action: PayloadAction<any>) => {
            state.deviceinfo = action.payload;
        },
        setAffiliateData: (state, action: any) => {
            state.affiliateData = action.payload;
        },
    },
});


export const { setUserData, SetDeviceinfo, setAffiliateData } = auth.actions;

export const authSelector = (state: { auth: authState }) => state.auth;

export default auth.reducer;

export const authApi = createApi({
    reducerPath: 'authapi',
    baseQuery: encryptedBaseQuery,
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.register}`,
                method: 'POST',
                body: payload,
                meta: {
                    isprimary: true
                }
            }),
        }),
        login: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.login}`,
                method: 'POST',
                body: payload,
                meta: {
                    isprimary: true
                }
            }),
        }),
        loginVerify: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.loginVerify}`,
                method: 'POST',
                body: payload,
                meta: {
                    isprimary: true
                }
            }),
        }),
        forgotPassword: builder.mutation({
            query(payload) {
                const queryParams = getQueryParamString(payload);
                return {
                    url: ENDPOINTS.forgotPassword + queryParams,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }

            },
        }),
        changeforgotPass: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.forgotPassword}`,
                method: 'POST',
                body: payload,
                meta: {
                    isprimary: true
                }

            }),
        }),
        resendCode: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.resend}`,
                method: 'POST',
                body: payload,
                meta: {
                    isprimary: true
                }
            }),
        }),
        userDetails: builder.query({
            query: () => ({
                url: `${ENDPOINTS.userDetails}`,
                method: 'GET',
                meta: {
                    isget: true
                }
            }),
        }),
        updateSettings: builder.mutation({
            query(payload) {
                const formData = payload;
                console.log(formData, "userrrr")
                return {
                    url: ENDPOINTS.updateSettings,
                    body: formData,
                    formData: true,
                    method: 'POST',
                    meta: {
                        isform: true
                    },
                    redirect: "follow",

                }
            },
        }),
        changeEmail: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.changeEmail}`,
                method: 'POST',
                body: payload
            }),
        }),
        changePasswrod: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.changePassword}`,
                method: 'POST',
                body: payload,
            }),
        }),
        verifyNumber: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.verifyMobile}`,
                method: 'POST',
                body: payload,
            }),
        }),
        registerNumber: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.changeMobileNum}`,
                method: 'PATCH',
                body: payload,
            }),
        }),

        internalkyc: builder.mutation({
            query(payload) {
                const formData = payload;
                console.log(formData, "userrrr")
                return {
                    url: ENDPOINTS.internalkyc,
                    body: formData,
                    formData: true,
                    method: 'POST',
                    meta: {
                        isform: true
                    },
                    redirect: "follow",

                }
            },
        }),


        changeOldMobileNumber: builder.query({
            query: () => ({
                url: `${ENDPOINTS.changeMobileNum}`,
                method: 'GET',
                meta: {
                    isget: true
                }
            }),
        }),
        verifyOldMobile: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.changeMobileNum}`,
                method: 'POST',
                body: payload,
            }),
        }),
        verifyNewMobile: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.changeMobileNum}`,
                method: 'PUT',
                body: payload,
            }),
        }),

        twofactorauthsetup: builder.query({
            query: () => ({
                url: `${ENDPOINTS.twofa}`,
                method: 'GET',
                meta: {
                    isgetsecondary: true
                }
            }),
        }),

        enabletwofa: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.twofa}`,
                method: 'PUT',
                body: payload,
            }),
        }),

        disabletwofa: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.twofa}`,
                method: 'PATCH',
                body: payload,
            }),
        }),

        logout: builder.query({
            query: () => ({
                url: `${ENDPOINTS.logout}`,
                method: 'GET',
                meta: {
                    isget: true
                }
            }),
        }),


        updateTwofaType: builder.query({
            query(payload) {
                const queryParams = getQueryParamString(payload);
                console.log(ENDPOINTS.twofatype + queryParams)
                return {
                    url: ENDPOINTS.twofatype + queryParams,
                    method: 'GET',
                    meta: {
                        isgetsecondary: true
                    }
                }

            },
        }),
        recoveryUser: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.recoverUser}`,
                method: 'POST',
                body: payload,
                meta: {
                    isprimary: true
                }
            }),
        }),
        recoveryUserLogin: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.recoverUser}`,
                method: 'PATCH',
                body: payload,
                meta: {
                    isprimary: true
                }
            }),
        }),
        recoveryUserOTP: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.recoverUser}`,
                method: 'PUT',
                body: payload,
                meta: {
                    isprimary: true
                }
            }),
        }),

        cashfreekyc: builder.mutation({
            query: (payload) => ({
                url: `${ENDPOINTS.cashfree}`,
                method: 'POST',
            }),
        }),

        cashfreestatus: builder.query({
            query(payload) {
                return {
                    url: ENDPOINTS.cashfreestatus,
                    method: 'GET',
                    meta: {
                        isget: true
                    }
                }

            },
        }),


        referaldetails: builder.query({
            query() {
                return {
                    url: ENDPOINTS.referaldetails,
                    method: 'GET',
                    meta: {
                        isgetsecondary: true
                    }
                }

            },
        }),



        referalhistory: builder.query({
            query(payload) {
                const queryParams = getQueryParamString(payload);
                console.log(ENDPOINTS.twofatype + queryParams)
                return {
                    url: ENDPOINTS.referalhistory + queryParams,
                    method: 'GET',
                    meta: {
                        isgetsecondary: true
                    }
                }

            },
        }),
    })
});
export const {
    useRegisterMutation,
    useLoginMutation,
    useLoginVerifyMutation,
    useForgotPasswordMutation,
    useChangeforgotPassMutation,
    useResendCodeMutation,
    useLazyUserDetailsQuery,
    useUpdateSettingsMutation,
    useChangeEmailMutation,
    useChangePasswrodMutation,
    useVerifyNumberMutation,
    useInternalkycMutation,
    useRegisterNumberMutation,
    useLazyChangeOldMobileNumberQuery,
    useVerifyOldMobileMutation,
    useVerifyNewMobileMutation,
    useLazyTwofactorauthsetupQuery,
    useEnabletwofaMutation,
    useDisabletwofaMutation,
    useLazyLogoutQuery,
    useLazyUpdateTwofaTypeQuery,
    useRecoveryUserMutation,
    useRecoveryUserLoginMutation,
    useRecoveryUserOTPMutation,
    useCashfreekycMutation,
    useLazyCashfreestatusQuery,
    useLazyReferaldetailsQuery,
    useLazyReferalhistoryQuery

} = authApi;