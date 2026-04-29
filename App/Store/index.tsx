import { combineReducers } from '@reduxjs/toolkit';
import locationReducer, {
  initialState as locationInitial,
} from './Slices/LocationSlice';
import helperReducer from './Slices/HelperSlice';
import cleaningTypeReducer from './Slices/ServiceSlice';

const appReducer = combineReducers({
  locationSlice: locationReducer,
  HelperSlice: helperReducer,
  ServiceSlice: cleaningTypeReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any,
) => {
  if (action.type === 'persist/REHYDRATE') {
    if (state) {
      state.locationSlice = locationInitial;
    }
  }
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
