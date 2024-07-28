import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

import { encrypt, decrypt } from '../utils/crypto';

const secretKey = 'vx1tokendatapvm';

const pstName  = 'code-list'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let persistCfg: any = {
    name: pstName,
    version: 1,
}
if (process.env.NODE_ENV === 'production') {
    persistCfg = {
        name: pstName,
        version: 1,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        serialize: (state: any) => encrypt(secretKey, state),
        deserialize: (context: string) => decrypt(secretKey, context),
    }
}

export interface CodeInfo  {
    id : string;
    code: string;
}
export interface CodeStores {
    list: CodeInfo[];
    code: string;
}
const initailCodeVaules: CodeStores = {
    list: [],
    code: "",
}
export const useCodeStores = create<CodeStores>()(
    devtools(
        subscribeWithSelector(
            persist(
                () => initailCodeVaules,
                persistCfg
            )
        )
        ,{
            enabled: process.env.NODE_ENV !== 'production',
            name: 'code',
        }
    )
);

export const setCodeList = (code: string) => {
     useCodeStores.setState((state) => {
        return {
            list: [
                ...state.list,
                {
                    id: new Date().getTime().toString(),
                    code,
                }
            ]
        }
     });
}
export const setCode = (code: string) => useCodeStores.setState({ code });