// rootReducer.ts
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import helperReducer from './helper'
import authReducer, { authApi } from './auth';
import walletReducer, { walletApi } from './wallet';
import subAccountReducer, { subAccountApi } from './subAccount';
import affiliateReducer, { affiliateApi } from './affiliate';
import futureReducer, { futureApi } from './future';

const appReducer = combineReducers({
  helper: helperReducer,
  auth: authReducer,
  wallet: walletReducer,
  subAccount: subAccountReducer,
  affiliate: affiliateReducer,
  future: futureReducer,

  [authApi.reducerPath]: authApi.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
  [subAccountApi.reducerPath]: subAccountApi.reducer,
  [affiliateApi.reducerPath]: affiliateApi.reducer,
  [futureApi.reducerPath]: futureApi.reducer,

});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any,
) => {
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, walletApi.middleware, subAccountApi.middleware, affiliateApi.middleware, futureApi.middleware),
});
