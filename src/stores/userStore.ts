import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

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
                {
                    name: 'user',
                    version: 1,
                }
            )
        )
    )
);

export const setUserInfo = () => useUserStores.setState((state) => ({ info: state.info }));


