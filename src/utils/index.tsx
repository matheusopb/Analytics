import CryptoJS from 'crypto-js';
import { cryptokey } from '../settings/env';

const SECRET_KEY = cryptokey;

const encryptData = (data: any) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

const decryptData = (data: any) => {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export { encryptData, decryptData }