import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

interface UserInfo {
    name: string;
    age: number;
    // 頭像
    avatar: string;
}

interface useUserStores {
    info?: UserInfo;
    token?: string;
}
export const useuseUserStores = create<useUserStores>()(

    devtools(
        subscribeWithSelector(
            persist(
                () => (
                    {
                   
                    }
                )
                ,
                {
                    name: 'user',
                    version: 1,
                }
            )
        )
    )
);

export const setUserInfo = () => useuseUserStores.setState((state) => ({ info: state.info }));


