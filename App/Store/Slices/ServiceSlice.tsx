import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type cleaningType = 'dailyCarCleaning' | 'onetimeCarCleaning';

interface ServiceState {
    cleaningType: cleaningType;
}

const initialState: ServiceState = {
    cleaningType: 'dailyCarCleaning',
};

const ServiceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        setCleaningType(state, action: PayloadAction<any>) {
            console.log(action.payload)
            state.cleaningType = action.payload;
        },
    },
});

export const { setCleaningType } = ServiceSlice.actions;
export default ServiceSlice.reducer;