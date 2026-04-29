import CryptoJS from 'react-native-crypto-js';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getItem } from '../Storage/localStorage';
import { BASEURL, SECRETKEY } from './constant';

export const encrypt_primary = (payload: any): string => {

    const secretKey = getItem("KeyAcc");
    let accessKey;
    if (!secretKey) {
        accessKey = SECRETKEY;       // use default
    } else {
        accessKey = secretKey;       // use stored key
    }

    try {
        console.log('SECRETKEYSECRETKEY', payload, accessKey)
        console.log('kdjsfghjsdfsd', decrpt_primary("U2FsdGVkX19hFZ4J9Ifks1tHqWpvV2XMYQRr7HtpSqKX59CSOEmJ2C7+pH91fvc0jfLR3ks1h57MYdkpsa6WMA=="))
        console.log('sjdfdsjfdsfsd', accessKey.length, JSON.stringify(accessKey))
        // let encData = CryptoJS.AES.encrypt(JSON.stringify(payload), SECRETKEY).toString();
        const encJson = CryptoJS.AES.encrypt(
            JSON.stringify(payload),
            accessKey
        ).toString();
        const encData = CryptoJS.enc.Base64.stringify(
            CryptoJS.enc.Utf8.parse(encJson)
        );
        console.log('encDataencData', encData, decrpt_primary(encData), payload, accessKey, JSON.stringify(payload))
        return encData
    }
    catch (error: any) {
        console.log('encrypt_primary_error', error);
        return payload
    }
};

export const encrypt_secondary = (payload: any): string => {
    const secretKey: any = getItem("secretkey");
    console.log(secretKey, "testgal");

    // let encData = CryptoJS.AES.encrypt(JSON.stringify(payload), secretKey).toString();


    const encJson = CryptoJS.AES.encrypt(
        JSON.stringify(payload),
        secretKey
    ).toString();
    const encData = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(encJson)
    );


    return encData
};

export const decrpt_primary = (data: string): any => {
    const secretKey = getItem("KeyAcc");
    let accessKey;
    if (!secretKey) {
        accessKey = SECRETKEY;       // use default
    } else {
        accessKey = secretKey;       // use stored key
    }

    console.log('secretKey', accessKey);

    try {
        // let bytes = CryptoJS.AES.decrypt(data, SECRETKEY);
        // console.log(bytes, 'decryptObject')
        // let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        const decData = CryptoJS.enc.Base64.parse(data)?.toString(
            CryptoJS.enc.Utf8
        );

        const bytes = CryptoJS.AES.decrypt(decData, accessKey).toString(
            CryptoJS.enc.Utf8
        );
        const decryptedData = JSON.parse(bytes);

        return decryptedData
    }
    catch (error: any) {
        console.log('decrpt_primary_error', error)
    }
};

export const decrpt_secondary = (data: string): any => {
    const secretKey: any = getItem("KeyAcc");
    // let bytes = CryptoJS.AES.decrypt(data, secretKey);
    // console.log(bytes, 'decryptObject')
    // let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const decData = CryptoJS.enc.Base64.parse(data)?.toString(
        CryptoJS.enc.Utf8
    );
    const bytes = CryptoJS.AES.decrypt(decData, secretKey).toString(
        CryptoJS.enc.Utf8
    );
    const decryptedData = JSON.parse(bytes);
    return decryptedData
};

const rawBaseQuery = fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders: (headers) => {
        const token = getItem("token");
        console.log(token, "authtoken");
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});

const rawFormQuery = fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders: (headers) => {
        const token = getItem("token");
        console.log(token, "authtoken-form");

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'multipart/form-data');
        return headers;
    },
});

export const delay = (ms?: number) => new Promise((resolve: any) => setTimeout(resolve, ms));

export const encryptedBaseQuery: BaseQueryFn<any, unknown, unknown> = async (args, api, extraOptions) => {
    try {
        let { body, meta, ...rest } = args;
        console.log(body, "bodyyyy", meta, rest);

        const isform = meta?.isform ?? undefined
        const isprimary = meta?.isprimary ?? undefined
        const isget = meta?.isget ?? undefined
        let result: any

        if (isform) {
            console.log("isform");
            result = await rawFormQuery({ ...rest, body: body }, api, extraOptions)
            if (result.error) {
                const error: any = result.error?.data ? result.error?.data : result.error
                console.log("result.error", error);

                const decryptedError = decrpt_primary(error) ? decrpt_primary(error) : error;
                console.log(decryptedError, "error");

                return {
                    error: {
                        ...result.error,
                        data: decryptedError,
                    },
                };
            }
            if (result.data) {
                const res: any = result.data ?? ""
                const decryptedData = decrpt_primary(res) ? decrpt_primary(res) : res;
                return { data: decryptedData };
            }
        }

        else if (isprimary) {
            console.log("isprimaryaaaaa", body, encrypt_primary(body));

            result = await rawBaseQuery({
                ...rest, body: {
                    token: encrypt_primary(body)
                }
            }, api, extraOptions)
            if (result.error) {
                const error: any = result.error?.data ? result.error?.data : result.error
                console.log("result.error", error);

                const decryptedError = decrpt_primary(error) ? decrpt_primary(error) : error;
                console.log(decryptedError, "error");

                return {
                    error: {
                        ...result.error,
                        data: decryptedError,
                    },
                };
            }
            if (result.data) {
                const res: any = result.data ?? "";
                console.log('resres', res)
                const decryptedData = decrpt_primary(res) ? decrpt_primary(res) : res;
                return { data: decryptedData };
            }
        }

        else if (isget) {
            console.log("isget");

            result = await rawBaseQuery({ ...rest }, api, extraOptions)
            if (result.error) {
                const error: any = result.error?.data ? result.error?.data : result.error
                console.log("result.error", error);

                const decryptedError =  typeof error === "string" ? decrpt_primary(error) : error;
                console.log(decryptedError, "error");

                return {
                    error: {
                        ...result.error,
                        data: decryptedError,
                    },
                };
            }
            if (result.data) {
                const res: any = result.data ?? ""
                const decryptedData = typeof res === "string" ? decrpt_primary(res) : res;
                return { data: decryptedData };
            }
        }

        else {
            console.log("secondary");

            result = await rawBaseQuery({
                ...rest, body: {
                    token: encrypt_secondary(body)
                }
            }, api, extraOptions)
            if (result.error) {
                const error: any = result.error?.data ? result.error?.data : result.error
                console.log("result.error", error);

                const decryptedError = decrpt_secondary(error) ? decrpt_secondary(error) : error;
                console.log(decryptedError, "error");

                return {
                    error: {
                        ...result.error,
                        data: decryptedError,
                    },
                };
            }
            if (result.data) {
                const res: any = result.data ?? ""
                const decryptedData = decrpt_secondary(res) ? decrpt_secondary(res) : res;
                return { data: decryptedData };
            }
        }
        return result
    } catch (error) {
        console.log('encryptedBaseQuery_error', error);

    }
};