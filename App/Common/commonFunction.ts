import CryptoJS, { AES, enc } from "react-native-crypto-js";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Toast from 'react-native-simple-toast';
import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";

import { axiosRequest } from "./interface";
import config from "./config";
import { getItem, removeItem } from "./localStorage";
import { constantData } from "./constant";
import { getCurrentLocation, requestLocationPermission } from "./geoLocationFuntion";
import { fetchLocationDetail } from "./axiosHooks/userHooks";

const internalAxios = axios.create({
  baseURL: config.USERBACKEND_URL,
});


export const isEmpty = (
  value: any
) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value === "0") ||
  (typeof value === "number" && value === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const useAxios = async (reqData: axiosRequest) => {
  try {
    let secretKey = getItem(constantData.secretKey) ?? config.SECRET_KEY;
    console.log('secretKeysecretKey', secretKey, reqData?.data);
    if (
      !isEmpty(reqData?.data) &&
      !(reqData?.data instanceof FormData)
    ) {
      let token = encryptData(
        reqData.data,
        secretKey
      );
      delete reqData?.data;
      reqData["data"] = { token: token };
    }
    if (reqData?.params) {
      let token = encryptData(
        reqData.params,
        secretKey
      );
      reqData["params"] = { token: token };
    }



    let jwtToken = getItem(constantData.jwtToken);
    if (jwtToken) {
      if (reqData.headers && typeof (reqData.headers) == 'object') {
        reqData.headers.Authorization = jwtToken;
      }
      else {
        reqData.headers = {
          'Authorization': jwtToken
        };
      }
    }

    console.log('reqDatareqData', reqData)

    const response = await internalAxios(reqData);
    if (!isEmpty(response)) {
      let respData = responseDecrypt(
        response?.data
      );
      return { ...response, data: respData };
    }
  }
  catch (error: any) {
    console.log("useAxios_error", error)
    if (error?.response?.data?.statusCode == 401) {
      // userLogout()
    }
    if (error?.response?.status == 429) {
      return { data: error?.response?.data };
    }
    let respData = responseDecrypt(
      error?.response?.data
    );
    return { status: false, message: "network error", data: respData };
  }
}

export const appendData = (data: object) => {
  let enckey = getItem(constantData.secretKey) ?? config.SECRET_KEY
  let formData = new FormData();
  let tokenData: any = {};
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if ((item?.fileSize || item?.type) && item?.uri) {
          const path = item?.path ?? item?.uri,
            fileName = item?.fileName ?? item?.filename,
            mime = item?.mime ?? item?.type;
          formData.append(
            key,
            {
              uri:
                Platform.OS === "android"
                  ? path
                  : path?.replace("file://", ""),
              name: fileName,
              type:
                mime === "image/jpg"
                  ? "image/jpeg"
                  : mime,
            }
          );
        }
        else {
          tokenData[key] = [...returnArrayOnly(tokenData?.[key]), item];
        }
      });
    }
    else {
      if ((value?.fileSize || value?.type) && value?.uri) {
        const path = value?.path ?? value?.uri,
          fileName = value?.fileName ?? value?.filename,
          mime = value?.mime ?? value?.type;
        formData.append(
          key,
          {
            uri:
              Platform.OS === "android"
                ? path
                : path?.replace("file://", ""),
            name: fileName,
            type:
              mime === "image/jpg"
                ? "image/jpeg"
                : mime,
          }
        );
      }
      else {
        tokenData[key] = value;
      }
    }
  });
  if (!isEmpty(tokenData)) {
    formData.append("token", encryptData(tokenData, enckey));
  }
  return formData;
}

export const externalAxios = async (reqData: axiosRequest) => {
  try {
    const response = await internalAxios(reqData);
    return response;
  }
  catch (error: any) {
    console.log('externalAxios_error', error);
    let respData = error?.response;
    return { ...respData, status: false, };
  }
}

export const responseDecrypt = (response: any) => {
  try {
    let secretKey = getItem(constantData.secretKey) ?? config.SECRET_KEY;
    console.log('secretKeysecretKey', secretKey)
    let resp = decryptData(response, secretKey);
    return resp ? resp : response;
  }
  catch (error) {
    console.log("responseDecrypt_error", error)
  }
}

export const encryptData = (encryptValue: any, key: string = config.SECRET_KEY) => {
  try {
    // console.log("encryptValue : ", encryptValue, "Secret key : ", SecretKey)
    const encJson = CryptoJS.AES.encrypt(
      JSON.stringify(encryptValue),
      key
    ).toString();
    const encData = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(encJson)
    );
    // console.log("encryptObjectencryptObject", encData);
    return encData;
  }
  catch (error) {
    console.log('encryptData_error', error)
    return "";
  }
};

export const decryptData = (decryptValue: string, key: string = config.SECRET_KEY) => {
  try {
    // console.log("decryptValue" , decryptValue)
    const decData = CryptoJS.enc.Base64.parse(decryptValue)?.toString(
      CryptoJS.enc.Utf8
    );
    const bytes = CryptoJS.AES.decrypt(decData, key).toString(
      CryptoJS.enc.Utf8
    );
    // console.log("decryptValue===============>", JSON.parse(bytes))

    return JSON.parse(bytes);
  } catch (error) {
    console.log("decryptData_error", error);
    return "";
  }
};

export const parseJson = (data: any) => {
  try {
    if (typeof data === "string") {
      return JSON.parse(data);
    }
    return data;
  } catch (e) {
    console.log('parseJson_error---->', e);
    return data;
  }
}

export const jwtDecodeData = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    console.log("decodedjwt", decoded);
    return decoded;
  }
  catch (error) {
    console.log("jwtDecodeData_error", error);
    return "";
  }
}

export const loginCheck = () => {
  console.log('checkkkk', constantData.jwtToken)
  if (!isEmpty(getItem(constantData.jwtToken))) {
    return true;
  }
  return false;
}

export const confirmAlert = (
  alertMessage = "Do you want to proceed?",
  confirmFunc = () => { },
  cancelFunc = () => { }
) => {
  try {
    Alert.alert("Hold on!", alertMessage, [
      {
        text: "Cancel",
        onPress: () => {
          cancelFunc();
        },
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => confirmFunc(),
      },
    ]);
  } catch (err) {
    console.log("confirmAlert_error", err);
  }
};

export const logOutFunction = () => {
  try {
    removeItem(constantData.jwtToken);
    removeItem(constantData.userDetail);
    removeItem(constantData.secretKey);
    removeItem(constantData.currentAddress);
    return true;
  }
  catch (error) {
    console.log('logOut_error', error);
    return false;
  }
}

export const getSecretKey = (key: string) => {
  return key;
}

export const toastFn = (value: any): void => {
  if (isEmpty(value)) {
    Toast.show('Something went wrong...!', Toast.SHORT);
  } else {
    Toast.show(String(value), Toast.SHORT);
  }
};

export const returnArrayOnly = (data: any) => {
  try {
    return (Array.isArray(data) ? data : []);
  }
  catch (err) {
    console.error('returnArrayOnly_error', err);
    return [];
  }
}

export const returnAsArray = (data: any) => {
  try {
    return (Array.isArray(data) ? data : isEmpty(data) ? [] : [data]);
  }
  catch (err) {
    console.error('returnArrayOnly_error', err);
    return [];
  }
}

export function remove_extra_space(string: string) {
  return string ? string?.replace(/\s+/g, " ") : string;
}

export function replaceText(text: string) {
  // return text?.toLowerCase()?.replace(/[^A-Z0-9]+/ig, "");
  var txt = text?.trim()
  txt = remove_extra_space(txt)
  txt = txt?.replace(/ /g, "-")
  txt = txt?.toLowerCase()?.replace(/[^a-zA-Z0-9-]/ig, "")
  return txt
}

export const returnAddressFormat = (addressData: any) => {
  let add: any = {};
  let data = addressData?.address_components.map((it: any) => {
    const types = it.types;

    if (types.includes("street_number") || types.includes("plus_code")) {
      add.doorNumber = it.long_name;
    }

    if (types.includes("route")) {
      add.street = it.long_name;
    }

    // Apartment / Building
    if (types.includes("premise") || types.includes("subpremise")) {
      add.apartment = it.long_name;
    }

    // Area / locality
    if (
      types.includes("sublocality") ||
      types.includes("sublocality_level_1") ||
      types.includes("neighborhood")
    ) {
      add.area = it.long_name;
    }

    // City (global safe)
    if (
      types.includes("locality") ||
      types.includes("postal_town")
    ) {
      add.city = it.long_name;
    }

    if (!add.city && types.includes("administrative_area_level_3")) {
      add.city = it.long_name;
    }

    // State
    if (types.includes("administrative_area_level_1")) {
      add.state = it.long_name;
    }

    // Country
    if (types.includes("country")) {
      add.country = it.long_name;
      add.countryCode = it.short_name;
    }

    // Zip / Pincode
    if (types.includes("postal_code")) {
      add.zipcode = it.long_name;
    }
    return add;
  });
  add.fullAddress = addressData?.formatted_address;
  add.latlng = [addressData?.geometry?.location?.lat, addressData?.geometry?.location?.lng]
  return add;
}

export const isValidEmail = (email: string) => {
  try {
    if (config.EMAIL_REGEX.test(email)) {
      return true;
    }
    return false;
  }
  catch (error) {
    console.log("isValidEmail_error", error);
    return false;
  }
}

export const numberChange = (data: any, decimal: number = 0) => {
  try {
    let n = (isNaN(Number(data)) ? 0 : Number(data))
    if (decimal > 0) {
      n = Number(n.toFixed(decimal));
    }

    return n;
  }
  catch (err) {
    console.log('numberChange_error', err)
    return 0;
  }
}

export const minuteHourFormat = (data: any) => {
  return ((numberChange(isEmpty(data) ? 0 : data) < 10 ? '0' : '') + data)
}

export const dateTimeForm = (date?: any, datealone?: any, timealone?: any, ampm?: any, month?: any) => {

  try {
    if (datealone) {
      return `${minuteHourFormat(new Date(date)?.getDate())}-${minuteHourFormat(new Date(date)?.getMonth() + 1)}-${minuteHourFormat(new Date(date)?.getFullYear())}`
    }
    else if (timealone) {
      if (ampm) {
        return `${minuteHourFormat(new Date(date)?.getHours() > 12 ? new Date(date)?.getHours() - 12 : new Date(date)?.getHours())}:${minuteHourFormat(new Date(date)?.getMinutes())} ${new Date(date)?.getHours() >= 12 ? 'p.m' : 'a.m'}`
      }
      else {
        return `${minuteHourFormat(new Date(date)?.getHours())}:${minuteHourFormat(new Date(date)?.getMinutes())} `
      }
    }
    else if (ampm) {
      return `${minuteHourFormat(new Date(date)?.getDate())}/${minuteHourFormat(new Date(date)?.getMonth() + 1)}/${minuteHourFormat(new Date(date)?.getFullYear())}, ${new Date(date)?.getHours()}:${new Date(date)?.getMinutes()} ${new Date(date)?.getHours() >= 12 ? 'p.m' : 'a.m'} `
    }
    else if (month) {
      const dates = new Date(date);  // 2009-11-10
      const month = dates.toLocaleString('default', { month: 'long' });
      return `${minuteHourFormat(new Date(date)?.getDate())} ${month} ${minuteHourFormat(new Date(date)?.getFullYear())}`


    }
    return `${minuteHourFormat(new Date(date)?.getDate())}-${minuteHourFormat(new Date(date)?.getMonth() + 1)}-${minuteHourFormat(new Date(date)?.getFullYear())}, ${minuteHourFormat(new Date(date)?.getHours())}:${minuteHourFormat(new Date(date)?.getMinutes())} `
  }
  catch (error: any) {
    console.log('dateTimeForm_error', error)
    return "No Date"
  }
}

export const returnOriginalFile = (fileName: string) => {
  return `${config.ORIGINAL_FILE_URL}${fileName}`;
}

export const returnCompressedFile = (fileName: string) => {
  return `${config.COMPRESSED_FILE_URL}${fileName}`;
}

export const getMyLocationCommonFunction = async (withLocationDetail?: boolean) => {
  let finalLatLng: any = {}
  const locationPermission = await requestLocationPermission();
  console.log('locationPermissionlocationPermission', locationPermission)
  if (locationPermission != PermissionsAndroid.RESULTS.GRANTED) {
    if (locationPermission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Linking.openSettings();
      toastFn("Enable location access to fetch live location");
    }
    else {
      toastFn("Cannot fetch live location");
    }
    return;
  }

  let position: any;
  // console.log('useeefffectttt')
  try {
    position = await getCurrentLocation();
  }
  catch (err) {
    console.log('getCurrentLocationDetail_error', err);
  }

  if (position?.error) {
    return toastFn(position?.error?.message ?? "Cannot fetch live location");
  }
  else {
    finalLatLng = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
  }

  let sendData = {
    latitude: String(finalLatLng.lat),
    longitude: String(finalLatLng.lng),
  }
  let resp: any = {};
  if (withLocationDetail) {
    resp = await fetchLocationDetail(sendData);
  }
  resp.position = position;
  return resp;
}

export const capitalizeFirstLetter = (string: string) => {
  try {
    return string && string.charAt(0).toUpperCase() + string.substring(1);
  }
  catch (error) {
    console.log('capitalizeFirstLetter_error', error);
    return "";
  }
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

export const returnDay = (dayIndex: number) => {
  return days?.[dayIndex];
}

export const getNextDatesWithDay = (noOfDays: number = 5, isSkipDay: boolean, skipDay?: number) => {
  try {
    let outDays: any = [];
    noOfDays = numberChange(noOfDays);
    for (let i = 0; outDays?.length < noOfDays; i++) {
      let newDate: any = new Date().getTime();
      newDate = new Date(new Date(newDate).setDate(new Date(newDate).getDate() + i));
      if (isSkipDay) {
        console.log('newDatenewDate', newDate.getDate(), new Date(newDate).getDay(), skipDay)
        if (skipDay != new Date(newDate).getDay()) {
          outDays.push({
            date: newDate,
            day: returnDay(new Date(newDate).getDay()),
            display: dateToDateMonth(newDate),
          });
        }
      }
      else {
        outDays.push({
          date: newDate,
          day: returnDay(new Date(newDate).getDay()),
          display: dateToDateMonth(newDate),
        });
      }
    }
    return outDays;
  }
  catch (error) {
    console.log('getNextDatesWithDay_error', error);
    return [];
  }
}

export const validateVehicleNo = (text: string) => {
  const regex = config.VEHICLE_NUMBER_REGEX;
  return regex.test(text.toUpperCase());
};

export const dateToMonthDate = (date: any) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return formattedDate;
}

export const dateToMonthDateWithTime = (date: any) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedDate;
}

export const dateToTimeAlone = (date: any) => {
  const formattedDate = new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedDate;
}

export const dateToYDM = (date: any) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const day = d.toLocaleString("en-US", { day: "2-digit" });
  const month = d.toLocaleString("en-US", { month: "2-digit" });

  return `${year}-${month}-${day}`;
};

export const formatDateWithDay = (date = new Date()) => {
  const day = date.getDate();
  const year = date.getFullYear();

  const month = date.toLocaleString("en-US", { month: "short" });
  const weekday = date.toLocaleString("en-US", { weekday: "long" });

  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
      day % 10 === 2 && day !== 12 ? "nd" :
        day % 10 === 3 && day !== 13 ? "rd" :
          "th";

  return `${day}${suffix} ${month} ${year}, ${weekday}`;
}

export const formatDate = (date = new Date()) => {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

export const formatDateMonthAlone = (date = new Date()) => {
  const monthName = new Date().toLocaleString("en-US", {
    month: "long",
  });

  return monthName;
}

export const dateToDateMonth = (date: any) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });
  return formattedDate;
}

export const dateToMonthDateYear = (date: any) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US");
  return formattedDate;
}

// returns feb 13, 1:04 PM - like this

export const dateToDateTime = (date: any) => {
  const formattedDate = new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  return formattedDate;
}

// returns 27 Sep 2025 | 02:00 PM - like this

export const dateToDateYearTime = (date: any) => {
  const formattedDate = new Date(date).toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace(',', ' |');
  return formattedDate;
}

// retuns Thu, Oct 16, 11:15 AM

export const formatDayDateTime = (dateInput = new Date()) => {
  const date = new Date(dateInput);

  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const returnServiceStatusDisplay = (data: any) => {
  if (isEmpty(data)) {
    return "Not valid"
  }
  if (data?.isSkiped) {
    return "Skipped"
  }
  else if (data?.isCancelled) {
    return "Cancelled"
  }
  else {
    return capitalizeFirstLetter(data?.status);
  }
}

export const getPlanTypeValue = (plan: string) => {
  if (plan.toLowerCase() == constantData.planType.standard) {
    return 1;
  }
  else if (plan.toLowerCase() == constantData.planType.premium) {
    return 2;
  }
  else if (plan.toLowerCase() == constantData.planType.elite) {
    return 3;
  }
  return 0;
}

export const durationGone = (dateString: any) => {
  if (!dateString) return "";

  const date: any = new Date(dateString);
  const now: any = new Date();
  const diffMs = now - date;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return `just now`;
};

export const copyToClipboard = (text?: string) => {
  if (text) {
    Clipboard.setString(text);
    toastFn("Copied!")
    return true;
  }
}

export const roundToNext = (number: number, divisibleNumber: number) => {
  return Math.ceil(number / divisibleNumber) * divisibleNumber;
}

export const isSameDay = (dateOne: any, dateTwo: any) => {
  dateOne = new Date(dateOne);
  dateTwo = new Date(dateTwo);
  return (
    dateOne.getDate() == dateTwo.getDate() &&
    dateOne.getMonth() == dateTwo.getMonth() &&
    dateOne.getFullYear() == dateTwo.getFullYear()
  )
}

// Tomorrow @ 06:15 PM | Today @ 06:15 PM | 13/09/2023 @ 06:15 PM like this

export const formatSmartDateTime = (inputDate: any) => {
  const date = new Date(inputDate);
  const now = new Date();

  // remove time for comparison
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const targetDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  // format time
  const time = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (targetDay.getTime() === today.getTime()) {
    return `Today @ ${time}`;
  }

  if (targetDay.getTime() === tomorrow.getTime()) {
    return `Tomorrow @ ${time}`;
  }

  // default format
  const formattedDate = date.toLocaleDateString("en-GB"); // DD/MM/YYYY

  return `${formattedDate} @ ${time}`;
};

export const openPhone = (mobileNo: string) => {
  if(mobileNo){
    return Linking.openURL(`tel:${mobileNo}`)
  }
  return "";
}

export const openMessage = (mobileNo: string) => {
  if(mobileNo){
    return Linking.openURL(`sms:${mobileNo}`)
  }
  return "";
}
