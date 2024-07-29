import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

import { encrypt, decrypt } from '../utils/crypto';
import { genId } from '../utils/id';
import { Position } from '../services/ov/pos';

const secretKey = 'vx1tokendatapvm';

const pstName = 'code-list'
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


export interface CodeInfo {
    id: string | number;
    code: string;
    pos: Position;
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
        ), {
        enabled: process.env.NODE_ENV !== 'production',
        name: 'code',
    }
    )
);

export const setCodeList = (code: string, pos: Position) => {
    const id = genId(code);
    const list = useCodeStores.getState().list;
    const exists = list.find((item) => item.id === id);
    if (exists) {
        const psv = list.map((item) => {
            if (item.id === id) {
                item.code = code;
                item.pos = pos;
            }
        });
        if (psv) {
            return;
        }
        useCodeStores.setState({ list: psv });
        return;
    }
    useCodeStores.setState((state) => {
        return {
            list: [
                ...state.list,
                {
                    id,
                    code,
                    pos,
                }
            ]
        }
    });
}
export const setCode = (code: string) => useCodeStores.setState({ code });

export const clearCode = () => useCodeStores.setState({ code: "", list: [] });