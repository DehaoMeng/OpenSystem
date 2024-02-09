import service from "@/request/index";
import type {LoginData} from "@/types/request";
import type {updateStudent} from "@/types/student";
import type {updateTeacher} from "@/types/teacher";
import type {paginate} from "@/types/axios";

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


export const GetMessage = async (manager: string) => {
    if (manager == 'teacher') {
        return service({
            url: '/teacher/info',
            method: 'get'
        })
    } else {
        return service({
            url: '/student/info',
            method: 'get'
        })
    }
}


export const UpdateMessage = async (manager: string, data: updateStudent | updateTeacher) => {
    if (manager == 'teacher') {
        return service({
            url: '/teacher/info',
            method: 'post',
            data
        })
    } else {
        return service({
            url: '/student/info',
            method: 'post',
            data
        })
    }
}


// 学生查看选课信息
export const CourseInfo = async (data: paginate) => {
    return service({
        url: 'course/course',
        method: "get",
        params: data
    })
}


export const CurriculaVariable = async (data: { id: number, selected: boolean }) => {
    return service({
        url: 'course/student-course',
        method: "post",
        data
    })
}

