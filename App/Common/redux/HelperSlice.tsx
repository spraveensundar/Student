import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ServiceType = 'oneway' | 'roundtrip' | 'outstation';
export type ServiceCategories = 'dailyCarCleaning' | 'oneTimeCleaning' | 'driverOnDemand' | 'RTO' | 'scrapping';

export type deviceinfo = {
  fcm: string | undefined,
  devicename: string | undefined,
  deviceid: string | undefined,
  currentversion: number | undefined,

}
interface HelperState {
  serviceType: ServiceType;
  serviceCategory: ServiceCategories;
  deviceinfo: deviceinfo | null
}

const initialState: HelperState = {
  serviceType: 'oneway',
  serviceCategory: 'dailyCarCleaning',
  deviceinfo: {
    fcm: "",
    deviceid: "",
    devicename: "",
    currentversion: 0
  }
};

const HelperSlice = createSlice({
  name: 'helper',
  initialState,
  reducers: {
    setServiceType(state, action: PayloadAction<ServiceType>) {
      state.serviceType = action.payload;
    },
    setServiceCategory(state, action: PayloadAction<ServiceCategories>) {
      state.serviceCategory = action.payload;
    },
    setDeviceinfo(state, action: PayloadAction<deviceinfo>) {
      state.deviceinfo = action.payload;
    },
  },
});

export const { setServiceType, setServiceCategory, setDeviceinfo } = HelperSlice.actions;
export const helperSelector = (state: { helper: HelperState }) => state.helper
export default HelperSlice.reducer;
