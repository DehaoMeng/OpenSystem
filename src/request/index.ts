import axios from "axios";
import type {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import type {CustomResponse} from "@/types/response";

const service = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
})
// 请求拦截 所有请求携带token
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')) {
        config.headers['authorization'] = localStorage.getItem('token') || ""
    }
    return config
})


// 响应拦截
service.interceptors.response.use((res: AxiosResponse) => {
    const code: number = res.status
    if (code != 200) {
        return Promise.reject(res)
    }
    return res.data
}, (err: AxiosError) => {
    return err.message
})

export default service

