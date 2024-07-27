import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

import CryptoJS from 'crypto-js';

const secretKey = 'vx1tokendata';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const encrypt = (data: any) => CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
const decrypt = (cipherText: string) => JSON.parse(CryptoJS.AES.decrypt(cipherText, secretKey).toString(CryptoJS.enc.Utf8));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let persistCfg: any = {
    name: 'user',
    version: 1,
}
if (process.env.NODE_ENV === 'production') {
    persistCfg = {
        name: 'user',
        version: 1,
        serialize: encrypt,
        deserialize: decrypt,
    }
}

interface UserInfo {
    name: string;
    age: number;
    // 頭像
    avatar: string;
}

export interface UserStores {
    info?: UserInfo;
    token?: string;
}
const initailUserVaules = {
    info: {
        name: "",
        avatar: "",
    },
    token: '',
}
export const useUserStores = create<typeof initailUserVaules>()(

    devtools(
        subscribeWithSelector(
            persist(
                () => initailUserVaules,
                persistCfg
            )
        )
    )
);

export const setUserInfo = () => useUserStores.setState((state) => ({ info: state.info }));


