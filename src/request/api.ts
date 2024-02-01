import service from "@/request/index";
import type {LoginData} from "@/types/request";

export const login = (data: LoginData, manager: string) => {
    if (manager == 'teacher') {
        // 教师登陆
        return service({
            url: '/teacher/login',
            method: 'post',
            data: data
        })
    } else {
        // 学生登陆
        return service({
            url: '/student/login',
            method: 'post',
            data: data
        })
    }

}
