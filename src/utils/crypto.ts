import CryptoJS from 'crypto-js';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encrypt = (secretKey: string, data: any) => CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
export const decrypt = (secretKey: string, cipherText: string) => JSON.parse(CryptoJS.AES.decrypt(cipherText, secretKey).toString(CryptoJS.enc.Utf8));
