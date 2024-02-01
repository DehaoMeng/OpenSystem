import type {student} from "@/types/student";

export interface address {
    country: string | null // 国家
    prov: string | null // 省份
    city: string | null // 城市
    lsp: string | null  // 运营商
}

export interface token {
    token: string
}


export interface CustomResponse {
    code: number
    msg: string
    data: token | null | student
}

