import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
    id: 'carigato_2025',
    encryptionKey: 'carigato_2025',
});

export const setItem = (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve(true);
};

export const getItem = (key: string) => {
    const value = storage.getString(key);
    return value;
};