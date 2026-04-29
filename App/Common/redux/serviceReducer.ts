import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { constantData } from '../constant';

export type cleaningType = 'subscribe' | 'ots' | '';

interface ServiceState {
    cleaningType: cleaningType;
    newCleaningService: object;
    newRideService: object;
}

const initialState: ServiceState = {
    cleaningType: 'subscribe',
    newCleaningService: {},
    newRideService: {
        rideType: constantData.rideType.single,
    },
};

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        setCleaningType(state, action: PayloadAction<any>) {
            state.cleaningType = action.payload;
        },
        setNewCleaningService( state: any, action ) {
            console.log('actionnnnn',action)
            state.newCleaningService = {
                ...state.newCleaningService,
                ...action.payload,
            }
        },
        removeNewCleaningService( state: any) {
            state.newCleaningService = {}
        },
        setNewRideService( state: any, action ) {
            console.log('actionnnnn',action)
            state.newRideService = {
                ...state.newRideService,
                ...action.payload,
            }
        },
        removeNewRideService( state: any) {
            state.newRideService = {
                rideType: constantData.rideType.single,
            };
        }
    },
});

export const { setCleaningType, setNewCleaningService, removeNewCleaningService, setNewRideService, removeNewRideService, } = serviceSlice.actions;
export default serviceSlice.reducer;