import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DropLocation {
  city: string;
  place: string;
  address: string;
}

export type ServiceTypes = 'oneway' | 'roundtrip' | 'outstation';

interface LocationState {
  pickup: string;
  drop: string;
  droplocation: DropLocation | null;
  mode: 'pickup' | 'drop' | null;
  reschedule: boolean;
  selectedService: ServiceTypes;
}

const initialState: LocationState = {
  pickup: '',
  drop: '',
  droplocation: null,
  mode: null,
  reschedule: false,
  selectedService: 'oneway',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setServiceType(state, action: PayloadAction<ServiceTypes>) {
      state.selectedService = action.payload;
    },
    setPickup(state, action: PayloadAction<string>) {
      state.pickup = action.payload;
    },
    setDrop(state, action: PayloadAction<string>) {
      state.drop = action.payload;
    },
    setDropLocation(state, action: PayloadAction<DropLocation>) {
      state.droplocation = action.payload;
    },
    setMode(state, action: PayloadAction<'pickup' | 'drop'>) {
      state.mode = action.payload;
    },
    setReschedule(state, action: PayloadAction<boolean>) {
      state.reschedule = action.payload;
    },
    clearLocations(state) {
      state.pickup = '';
      state.drop = '';
      state.droplocation = null;
      state.mode = null;
    },
  },
});

export const {
  setPickup,
  setDrop,
  setMode,
  clearLocations,
  setDropLocation,
  setReschedule,
  setServiceType,
} = locationSlice.actions;
export default locationSlice.reducer;
export { initialState };
