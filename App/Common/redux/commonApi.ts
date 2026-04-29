import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import { getItem } from '../localStorage';
import { constantData } from '../constant';
import { encryptData, isEmpty, responseDecrypt } from '../commonFunction';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: config.USERBACKEND_URL,
  prepareHeaders: (headers, { }) => {
    const token = getItem(constantData.jwtToken);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const customBaseQuery = async (args: any, api: any, extraOptions: any) => {

  let { body, params } = args;

  let secretKey = getItem(constantData.secretKey) ?? config.SECRET_KEY;

  if (isEmpty(params)) {
    params = {
      token: encryptData(
        params,
        secretKey,
      )
    };
  }
  if (body && typeof body === 'object') {
    body = {
      token: encryptData(
        body,
        secretKey,
      )
    }
  }

  const result: any = await rawBaseQuery({ ...args, params, body }, api, extraOptions);

  if (result?.data) {
    let outData = responseDecrypt(result.data);
    result.data = outData;
  }

  if (result?.error?.data) {
    let outData = responseDecrypt(result.error.data);
    result.data = outData;
    delete result.error;
  }

  if (result?.error) {
    console.log("Global API Error:", result.error);
  }

  return result;
};

export const commonApi = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: ['user'],
  endpoints: () => ({}),
});
