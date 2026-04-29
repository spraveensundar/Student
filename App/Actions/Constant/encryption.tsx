import CryptoJS from 'react-native-crypto-js';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL, SECRETKEY } from './constant';
import { getItem } from '../Storage/localstorage';
import { update_sessonstatus } from '../../Slices/helper';

export const encrypt_primary = (payload: any): string => {

    let encData = CryptoJS.AES.encrypt(JSON.stringify(payload), SECRETKEY).toString();
    return encData
};

export const encrypt_secondary = (payload: any): string => {
    const secretKey: any = getItem("secretkey");
    console.log(secretKey, "testgal");

    let encData = CryptoJS.AES.encrypt(JSON.stringify(payload), secretKey).toString();
    return encData
};
export const decrpt_primary = (data: string): any => {
    let bytes = CryptoJS.AES.decrypt(data, SECRETKEY);
    console.log(bytes, 'decryptObject')
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
};

export const decrpt_secondary = (data: string): any => {
    const secretKey: any = getItem("secretkey");
    let bytes = CryptoJS.AES.decrypt(data, secretKey);
    console.log(bytes, 'decryptObject')
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
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
        console.log(token, "authtoken");

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'multipart/form-data');
        return headers;
    },
});

export const delay = (ms?: number) => new Promise((resolve: any) => setTimeout(resolve, ms));

export const encryptedBaseQuery: BaseQueryFn<any, unknown, unknown> = async (args, api, extraOptions) => {
    let { body, meta, ...rest } = args;
    console.log(body, "bodyyyy");

    const isform = meta?.isform ?? undefined
    const isprimary = meta?.isprimary ?? undefined
    const isget = meta?.isget ?? undefined
    const isgetsecondary = meta?.isgetsecondary ?? undefined
    let result: any

    if (isform) {
        console.log("isform");

        result = await rawFormQuery({ ...rest, body: body }, api, extraOptions)
        if (result.error) {
            const error: any = result.error?.data ? result.error?.data : result.error
            console.log("result.error", error);

            if (error?.statusCode == "401") {
                api.dispatch(update_sessonstatus(true))
            }
            else {
                const decryptedError = decrpt_secondary(error)
                console.log(decryptedError, "error");

                return {
                    error: {
                        ...result.error,
                        data: decryptedError,
                    },
                };
            }
        }
        if (result.data) {
            const res: any = result.data ?? ""
            const decryptedData = decrpt_secondary(res)
            return { data: decryptedData };
        }
    }

    else if (isprimary) {
        console.log("isprimary");

        result = await rawBaseQuery({
            ...rest, body: {
                token: encrypt_primary(body)
            }
        }, api, extraOptions)
        if (result.error) {
            const error: any = result.error?.data ? result.error?.data : result.error
            console.log("result.error", error);
            if (error?.statusCode == "401") {
                api.dispatch(update_sessonstatus(true))
            }
            else {
                const decryptedError = decrpt_primary(error)
                console.log(decryptedError, "error");

                return {
                    error: {
                        ...result.error,
                        data: decryptedError,
                    },
                };
            }
        }
        if (result.data) {
            const res: any = result.data ?? ""
            const decryptedData = decrpt_primary(res)
            return { data: decryptedData };
        }
    }

    else if (isgetsecondary) {
        console.log("isgetsecondary");

        result = await rawBaseQuery({ ...rest }, api, extraOptions)
        if (result.error) {
            const error: any = result.error?.data ? result.error?.data : result.error
            console.log("result.error", error);
            if (error?.statusCode == "401") {
                api.dispatch(update_sessonstatus(true))
            }
            else {
                const decryptedError = decrpt_secondary(error)
                console.log(decryptedError, "error");

                return {
                    error: {
                        ...result.error,
                        data: decryptedError,
                    },
                };
            }
        }
        if (result.data) {
            const res: any = result.data ?? ""
            const decryptedData = decrpt_secondary(res)
            return { data: decryptedData };
        }
    }
    else if (isget) {
        console.log("isget");

        result = await rawBaseQuery({ ...rest }, api, extraOptions)
        if (result.error) {
            const error: any = result.error?.data ? result.error?.data : result.error
            console.log("result.error", error);
            if (error?.statusCode == "401") {
                api.dispatch(update_sessonstatus(true))
            }
            else {
                const decryptedError = decrpt_primary(error)
                console.log(decryptedError, "error");

                return {
                    error: {
                        ...result.error,
                        data: decryptedError,
                    },
                };
            }
        }
        if (result.data) {
            const res: any = result.data ?? ""
            const decryptedData = decrpt_primary(res)
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

            if (error?.statusCode == "401") {
                api.dispatch(update_sessonstatus(true))
            }
            else {
                const decryptedError = decrpt_secondary(error)
                console.log(decryptedError, "error");

                return {
                    error: {
                        ...result.error,
                        data: decryptedError,
                    },
                };
            }

        }

        if (result.data) {
            const res: any = result.data ?? ""
            const decryptedData = decrpt_secondary(res)
            return { data: decryptedData };
        }
        return result
    }
};