import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

import { encrypt, decrypt } from '../utils/crypto';

const secretKey = 'vx1tokendata';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let persistCfg: any = {
    name: 'user',
    version: 1,
}
if (process.env.NODE_ENV === 'production') {
    persistCfg = {
        name: 'user',
        version: 1,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        serialize: (state: any) => encrypt(secretKey, state),
        deserialize: (context: string) => decrypt(secretKey, context),
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


