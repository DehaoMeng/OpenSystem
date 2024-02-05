// 定义接口返回数据类型，这里根据后端返回去定义

import type {CustomResponse} from "@/types/response";
import * as axios from 'axios'

declare module 'axios' {
    interface AxiosResponse extends CustomResponse<T>{}
}

export interface paginate{
    page: number
    size: number | null
}
