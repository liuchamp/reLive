import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

import { encrypt, decrypt } from '../utils/crypto';
import { Item } from '../services/ov/pos';

const secretKey = 'vx1tokendatapvm';

const pstName = 'indent-list'
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


export interface IndentCfgStore {
    code: string;
    origin: string;
    list: Item[];
}
const initailCodeVaules: IndentCfgStore = {
    list: [],
    code: "",
    origin: "",
}
export const useIndentCfgStore = create<IndentCfgStore>()(
    devtools(
        subscribeWithSelector(
            persist(
                () => initailCodeVaules,
                persistCfg
            )
        ), {
        enabled: process.env.NODE_ENV !== 'production',
        name: 'indent-cfg',
    }
    )
);





export const setIndentCode = (code: string) => useIndentCfgStore.setState({ code });
export const setOriginCode = (origin: string) => useIndentCfgStore.setState({ origin });
export const setIndentCfg = (list: Item[]) => useIndentCfgStore.setState({ list });