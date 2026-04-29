import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "userData",
  initialState: {
    userDetail: null,
    token: null,
    secretKey: null,
    currentAddress: {},
    newVehicle: {},
  },
  reducers: {
    setAuth: (state, action) => {
      state.userDetail = action.payload.userDetail;
      state.token = action.payload.token;
      state.secretKey = action.payload.secretKey;
    },
    setAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setNewVehicle: (state, action) => {
      state.newVehicle = action.payload;
    },
    removeNewVehicle: (state) => {
      state.newVehicle = {};
    },
    logout: (state) => {
      state.userDetail = null;
      state.token = null;
      state.secretKey = null;
      state.currentAddress = {};
      state.newVehicle = {};
    }
  },
});

export const { setAuth, setAddress, setNewVehicle, removeNewVehicle, logout } = authSlice.actions;
export const authSliceSelector = (state: any) => state.userData
export default authSlice.reducer;