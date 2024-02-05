export interface address {
    country: string | null // 国家
    prov: string | null // 省份
    city: string | null // 城市
    lsp: string | null  // 运营商
}

export interface token {
    token: string
}


export interface CustomResponse<T>{
    code: number
    msg: string
    data: T
    num: number | null
}

