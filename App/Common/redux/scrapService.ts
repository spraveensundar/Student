
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiEndPoints } from "../apiConstants";
import { commonApi } from "./commonApi";

interface ScrapServiceState {
    scrapData: any;
}

const initialState: ScrapServiceState = {
    scrapData: {},
};

const scrapServiceSlice = createSlice({
    name: 'scrapService',
    initialState,
    reducers: {
        setScrapData(state, action: PayloadAction<any>) {
            state.scrapData = {
                ...state.scrapData,
                ...action.payload,
            }
        },
        setResetScrapData(state) {
            state.scrapData = {};
        }

    },
});

export const { setScrapData, setResetScrapData } = scrapServiceSlice.actions;

export const scrapSelector = (state: any) => state.scrapService;

export default scrapServiceSlice.reducer;



export const scrapService = commonApi.injectEndpoints({
    endpoints: (builder) => ({

        fetchScrapPost: builder.mutation({
            query(payload) {
                return {
                    url: apiEndPoints.getMyScrapPosts,
                    method: 'GET',
                    params: payload,
                };
            },
        }),

        fetchMyVehicleScrapBids: builder.query({
            query(params) {
                return {
                    url: apiEndPoints.getMyVehicleScrapBids,
                    method: 'GET',
                    params: params
                };
            },
        }),

        vehicleScrapDetails: builder.query({
            query(params) {
                return {
                    url: apiEndPoints.vehicleScrapDetails,
                    method: 'GET',
                    params: params
                };
            },
        }),


        viewPickupDetails: builder.query({
            query(params) {
                return {
                    url: apiEndPoints.viewPickupDetails,
                    method: 'GET',
                    params: params
                };
            },
        }),

        // ?vehicleScrapId=69242a36eee1d261319965e3















        cancelVehicleScrapPost: builder.mutation({
            query(payload) {
                return {
                    url: apiEndPoints.cancelVehicleScrapPost,
                    method: 'POST',
                    body: payload,
                };
            },
        }),
        vehicleScrapUpdateBidCompleted: builder.mutation({
            query(payload) {
                return {
                    url: apiEndPoints.vehicleScrapUpdateBidCompleted,
                    method: 'POST',
                    body: payload,
                };
            }
        }),
        getAcceptBids: builder.mutation({
            query(payload) {
                return {
                    url: apiEndPoints.getAcceptBids,
                    method: 'GET',
                    params: payload,
                };
            }
        }),
    }),
    overrideExisting: true,
});

export const {
    useLazyFetchMyVehicleScrapBidsQuery,
    useLazyVehicleScrapDetailsQuery,
    useLazyViewPickupDetailsQuery,

    useFetchScrapPostMutation,
    useCancelVehicleScrapPostMutation,
    useVehicleScrapUpdateBidCompletedMutation,
    useGetAcceptBidsMutation,
} = scrapService;

