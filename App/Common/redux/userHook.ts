
import { apiEndPoints } from "../apiConstants";
import { commonApi } from "./commonApi";
import { logout, setAddress, setAuth } from "./authSliceReducer";
import { getItem, setItem } from "../localStorage";
import { constantData } from "../constant";
import { addAddress } from "../axiosHooks/userHooks";
import { logOutFunction, parseJson } from "../commonFunction";
import { CommonActions, useNavigation } from "@react-navigation/native";




export const userApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyDetail: builder.query({
            query: (data) => {
                console.log('datattaa',data,apiEndPoints.getMyDetail)
                return {
                    url: apiEndPoints.getMyDetail,
                    method: 'GET',
                };
            },

            // transformResponse: (resp: any) => {
            //     console.log('resppppp',resp);
            //     if(resp?.status){
            //         dispatch(
            //             setAuth({
            //                 token: getItem(constantData.jwtToken),
            //                 userDetail: resp?.data,
            //                 secretKey: getItem(constantData.secretKey)
            //             })
            //         );
            //     }
            //     return resp;
            // },

            transformResponse: (resp: any) => {
                return resp; // return as-is
            },

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    
                    let getCurrentAddress = getItem(constantData.currentAddress);
                    if (getCurrentAddress) {
                        dispatch(setAddress(getCurrentAddress));
                    }
                    console.log('getCurrentAddress',getCurrentAddress)

                    const { data: resp } = await queryFulfilled;
                    console.log('respresp',resp)
                    
                    if (resp?.status) {
                        if(!getCurrentAddress?._id&&getCurrentAddress){
                            let sendData: any = {
                                addressType: "Home",
                                sector: getCurrentAddress?.sector,
                                flatNo: getCurrentAddress?.flatNo,
                                city: getCurrentAddress?.city,
                                state: getCurrentAddress?.state,
                                country: getCurrentAddress?.country,
                                latitude: getCurrentAddress?.location?.[0],
                                longitude: getCurrentAddress?.location?.[1],
                                isDisplay: getCurrentAddress?.isDisplay,
                                address: getCurrentAddress?.fullAddress,
                                addressData: getCurrentAddress?.addressData,
                            };
                            let addressResp = await addAddress(sendData)
                            console.log('addressRespaddressResp',addressResp)
                            if (addressResp?.status) {
                                console.log('getCurrentAddress_addaddress_resp', addressResp)
                                dispatch(setAddress(addressResp?.data));
                                setItem( constantData.currentAddress, JSON.stringify(addressResp?.data) );
                            }
                            else {
                                console.log('getShowLocationgetShowLocationcheckkk',resp?.data?.location?.length)
                                if (resp?.data?.location?.length > 0) {
                                    let getShowLocation = resp?.data?.location?.find((val:any) => val?.isDisplay == true);
                                    console.log('getShowLocationgetShowLocation',getShowLocation)
                                    if (!getShowLocation) {
                                        getShowLocation = resp?.data?.location?.[0];
                                    }
                                    console.log('getShowLocationgetShowLocation22',getShowLocation)
                                    getShowLocation.addressData = parseJson(getShowLocation.addressData);
                                    dispatch(setAddress(getShowLocation));
                                    setItem(constantData.currentAddress, JSON.stringify(getShowLocation));
                                }
                                else {
                                    
                                }
                            }
                        }
                        else if (!getCurrentAddress) {
                            if (resp?.data?.location?.length > 0) {
                                let getShowLocation = resp?.data?.location?.find((val: any) => val?.isDisplay == true);
                                console.log('getShowLocationgetShowLocation', getShowLocation)
                                if (!getShowLocation) {
                                    getShowLocation = resp?.data?.location?.[0];
                                }
                                console.log('getShowLocationgetShowLocation22', getShowLocation)
                                getShowLocation.addressData = parseJson(getShowLocation.addressData);
                                dispatch(setAddress(getShowLocation));
                                setItem(constantData.currentAddress, JSON.stringify(getShowLocation));
                            }
                        }
                        dispatch(
                            setAuth({
                                token: getItem(constantData.jwtToken),
                                userDetail: resp?.data,
                                secretKey: getItem(constantData.secretKey),
                            })
                        );
                    }
                    else {
                        let jwtToken = getItem(constantData.jwtToken), secretKey = getItem(constantData.secretKey), userDetail = getItem(constantData.userDetail);
                        if (jwtToken || secretKey || userDetail?._id) {
                            logOutFunction();
                            dispatch(userApi.util.resetApiState());
                            dispatch(logout());
                        }
                    }
                }
                catch (err) {
                    console.log("Error in getMyDetail:", err);
                    
                }
            },

            providesTags: ['user'],
        }),
        getMyVehicles: builder.query({
            query: (data) => {
                console.log('datadata',data)
                return {
                    url: apiEndPoints.getMyVehicles,
                    method: 'GET',
                    params: data,
                };
            },
        }),
        getMyNotifications: builder.query({
            query: (data) => {
                console.log('datadata',data)
                return {
                    url: apiEndPoints.getMyNotifications,
                    method: 'GET',
                    params: data,
                };
            },
        }),
        getFees: builder.query({
            query: (data) => {
                console.log('datadata',data,apiEndPoints.getFees)
                return {
                    url: apiEndPoints.getFees,
                    method: 'GET',
                    params: data,
                };
            },
        }),
        updateFcm: builder.query({
            query: (data) => {
                console.log('datadata',data,apiEndPoints.getFees)
                return {
                    url: apiEndPoints.updateFcm,
                    method: 'GET',
                    params: data,
                };
            },
        }),
        getAppData: builder.query({
            query: (data) => {
                console.log('datadata',data,apiEndPoints.getAppData)
                return {
                    url: apiEndPoints.getAppData,
                    method: 'GET',
                    params: data,
                };
            },
        }),
        getCmsContent: builder.query({
            query: (data) => {
                console.log('datadata',data,apiEndPoints.getAppData)
                return {
                    url: apiEndPoints.getCmsContent,
                    method: 'GET',
                    params: data,
                };
            },
        }),
        getCityList: builder.query({
            query: (data) => {
                console.log('datadata',data,apiEndPoints.getAppData)
                return {
                    url: apiEndPoints.getCityList,
                    method: 'GET',
                    params: data,
                };
            },
        }),
        getApartmentList: builder.query({
            query: (data) => {
                console.log('datadata',data,apiEndPoints.getAppData)
                return {
                    url: apiEndPoints.getApartmentList,
                    method: 'GET',
                    params: data,
                };
            },
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetMyVehiclesQuery,
    useLazyGetMyVehiclesQuery,
    useGetMyDetailQuery,
    useGetMyNotificationsQuery,
    useLazyGetMyNotificationsQuery,
    useGetFeesQuery,
    useLazyUpdateFcmQuery,
    useGetAppDataQuery,
    useGetCmsContentQuery,
    useGetCityListQuery,
    useGetApartmentListQuery,
    useLazyGetApartmentListQuery,
} = userApi;
