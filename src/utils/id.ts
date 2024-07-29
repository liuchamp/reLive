import * as CryptoJS from 'crypto-js';

export function genId(content = ""): string {
    return CryptoJS.MD5(content.trim()).toString(CryptoJS.enc.Hex);
}