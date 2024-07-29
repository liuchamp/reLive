export type Position = {
    x: number,
    y: number,
}

export interface ParserRespData {
    indents: string[],
    content: string,
}

export interface CoderResponse {
    code?: number;
    data?: ParserRespData;
    msg?: string;
}


export interface CoderBody {
    context: string;
    pos?: Position;
}

export interface ParserSet {
    id: string | number;
    pos: Position;
    code: string;
    func: string;// 函数名称
    chlidren?: ParserSet[];
    idents: IndentSet[];
}

export interface IndentSet {
    id: string | number;
    indent: string;
    aliase?: string;// 控制程序內的名稱
}