// helper.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewStyle } from 'react-native';

type systemBarsStyle = {
  statusBar: ViewStyle;
  navigationBar: ViewStyle;
};

type banktype = "add" | "edit"


export interface HelperState {
  sendfunction: string;
  systemBarProps: systemBarsStyle;
  futureparams: string;
  otpparams: {
    type: string
    values: any
  },
  bankparams: {
    type: banktype,
    value: any
  },
  kycparms: {
    type: string,
    kycType: string
  }
  phoneparams: {
    type: string
    values: any
  },
  subaccountparams: {
    type: string,
    value: any
  },
  sessionexpired: boolean,
  transactionlogdata: {
    startdate?: string,
    enddate?: string,
    transferType: "All" | "Deposit" | "Withdraw" | "Internal transfer",
    selectedType?: "All" | "Credit" | "Debit"
  }

}

export const initialState: HelperState = {
  sendfunction: 'hello world',
  systemBarProps: {
    statusBar: {},
    navigationBar: {},
  },
  futureparams: "",
  otpparams: {
    type: "login",
    values: ""
  },
  phoneparams: {
    type: "add",
    values: ""
  },
  bankparams: {
    type: "add",
    value: ""
  },
  kycparms: {
    type: "",
    kycType: ""
  },
  subaccountparams: {
    type: "transfer",
    value: ""
  },
  sessionexpired: false,
  transactionlogdata: {
    startdate: "",
    enddate: "",
    transferType: "All",
    selectedType: "All"
  }
};

const helper = createSlice({
  name: 'helper',
  initialState,
  reducers: {
    update_sendfunction: (state, action: PayloadAction<string>) => {
      state.sendfunction = action.payload;
    },
    update_statusBar: (state, action: PayloadAction<Partial<ViewStyle>>) => {
      Object.assign(state.systemBarProps.statusBar, action.payload);
    },
    update_navigationBar: (
      state,
      action: PayloadAction<Partial<ViewStyle>>,
    ) => {
      Object.assign(state.systemBarProps.navigationBar, action.payload);
    },
    SetFutureparams: (state, action: PayloadAction<string>) => {
      state.futureparams = action.payload;
    },
    setOtpparams: (state, action: PayloadAction<any>) => {
      state.otpparams = action.payload;
    },
    setBankparams: (state, action: PayloadAction<any>) => {
      state.bankparams = action.payload;
    },

    setKycparms: (state, action: PayloadAction<any>) => {
      state.kycparms = action.payload;
    },
    setPhoneparams: (state, action: PayloadAction<any>) => {
      state.phoneparams = action.payload;
    },
    setSubAccountparams: (state, action: PayloadAction<any>) => {
      state.subaccountparams = action.payload;
    },
    update_sessonstatus: (state, action: PayloadAction<boolean>) => {
      state.sessionexpired = action.payload;
    },

    update_transactionlogdata: (state, action: PayloadAction<any>) => {
      state.transactionlogdata = action.payload;
    },
  }
});

export const {
  update_sendfunction,
  update_statusBar,
  update_navigationBar,
  SetFutureparams,
  setOtpparams,
  setBankparams,
  setKycparms,
  setPhoneparams,
  setSubAccountparams,
  update_sessonstatus,
  update_transactionlogdata
} =
  helper.actions;

export const helperSelector = (state: { helper: HelperState }) => state.helper;

export default helper.reducer;