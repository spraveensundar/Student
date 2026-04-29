export type Override<T, O extends { [F in keyof Partial<T>]: unknown }> = Omit<
  T,
  keyof O
> &
  O;

export interface validationRules {
  required?: boolean;
  password?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  url?: boolean;
  time?: boolean;
  date?: boolean;
  number?: boolean;
  alpha?: boolean;
  equalTo?: any;
  fileSize?: number;
  fileType?: string[];
}

export interface validationMessages {
  required?: string;
  password?: string;
  minLength?: string;
  maxLength?: string;
  email?: string;
  url?: string;
  time?: string;
  date?: string;
  number?: string;
  alpha?: string;
  equalTo?: string;
  fileSize?: string;
  fileType?: string;
}

export interface fieldProps {
  value?: any;
  rules?: validationRules;
  messages?: validationMessages;
  isValid?: boolean;
  errorMessage?: string;
}

export interface authDataProps {
  mobileNumber?: fieldProps;
  apartmentName?: fieldProps;
  locality?: fieldProps;
  houseNum?: fieldProps;
  cityName?: fieldProps;
  firstName?: fieldProps;
  email?: fieldProps;
  dob?: fieldProps;
  gender?: fieldProps;
  latitude?: fieldProps;
  longitude?: fieldProps;
  city?: fieldProps;
  sector?: fieldProps;
  lastName?: fieldProps
}

export interface bankDataProps {
  bankName?: fieldProps;
  bankAccountNumber?: fieldProps;
  ifscCode?: fieldProps;
  confirmIfscCode?: fieldProps;
}

export interface aadharProofProps {
  aadharNo: fieldProps;
  frontAadhar: fieldProps;
  backAadhar: fieldProps;
};

export interface leaveRequestDataProps {
  leaveType?: fieldProps;
  startDate?: Override<fieldProps, { value?: Date }>;
  startTime?: Override<fieldProps, { value?: Date }>;
  endDate?: Override<fieldProps, { value?: Date }>;
  endTime?: Override<fieldProps, { value?: Date }>;
  reason?: fieldProps;
}

export interface scrapRegFormProps {
  companyName?: fieldProps;
  dealerName?: fieldProps;
  address?: fieldProps;
}
