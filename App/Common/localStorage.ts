import { MMKV } from 'react-native-mmkv';
import { parseJson } from './commonFunction';
import { updateUserDataInterface } from './interface';
import { constantData } from './constant';

export const storage = new MMKV({
  id: 'tailpark_2025',
  encryptionKey: 'petfolks_2025',
});

export const setItem = (key: string, value: string) => {
  storage.set(key, value);
  return Promise.resolve(true);
};

export const getItem = (key: string) => {
  const value = storage.getString(key);
  return parseJson(value);
};

export const removeItem = (key: string) => {
  const value = storage.delete(key);
  return Promise.resolve(value);
};

export const removeAllItems = (except?: any) => {
  const keys = storage.getAllKeys();
  keys.forEach((key) => {
    if (!except.includes(key)) {
      storage.delete(key);
    }
  });
  return true;
};

export const destroyStorage = () => {
  storage.clearAll();
  return true;
};

export const updateUserData = ( data: updateUserDataInterface) => {
  setItem(constantData.jwtToken, data?.token);
  setItem(constantData.userDetail, JSON.stringify(data?.userDetail));
  setItem(constantData.secretKey, data?.secretKey);
  return true;
}
