
import { configureStore } from '@reduxjs/toolkit';
import { commonApi } from './commonApi';
import authSliceReducer from "./authSliceReducer";
import serviceSliceReducer from "./serviceReducer"
import HelperSliceReducer from "./HelperSlice"
import scrapServiceReducer from './scrapService';

export const store = configureStore({
  reducer: {
    [commonApi.reducerPath]: commonApi.reducer,
    userData: authSliceReducer,
    serviceData: serviceSliceReducer,
    scrapService: scrapServiceReducer,
    helper: HelperSliceReducer,
  },
  middleware: (getDefault) => getDefault().concat(commonApi.middleware),
});
